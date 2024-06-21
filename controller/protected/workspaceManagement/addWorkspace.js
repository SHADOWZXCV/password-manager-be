const Joi = require('joi');
const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { createWorkspaceIfNotExists } = require('@Services/workspace')
const { findUsersById } = require('@Services/user');
const { addVaultsToWorkspace } = require('@Services/vault');
const { createWorkspaceUsers } = require('@Services/workspaceUser');
const { sendBulkEmail } = require('@Util/email');

const emailValidation = Joi.string().email()
const addWorkspace = async ({ requestData, requestUser }) => {
    const { name: workspaceName, description, iconName, vaultsIds, userIds } = requestData
    const { id: userId, name: userName, email: userEmail } = requestUser

    // create a workspace user with role
    // create a workspace, and assign it to the workspace user
    const data = {
        name: workspaceName,
        description,
        icon_name: iconName,
    }

    const workspace = await createWorkspaceIfNotExists({ data, userId })

    if(!workspace)
        return new Response({ status: 409, error: {
            error: 'Workspace already exists'
        } })
        
    // add all vaults if they exist
    if(vaultsIds) {
        addVaultsToWorkspace({ workspaceId: workspace.id, vaultsIds, userId })
    }

    // invite all users if they exist
    if(userIds) {
        findUsersById(userIds, { id: true, email: true }).then(users => {
            // TODO: Make sure anyone who is on the list of users should first have signed in with an email!
            const emailsList = users.map(user => user.email).filter(email => {
                return !emailValidation.validate(email).error && email !== userEmail
            })

            // to make sure all ids are valid
            const foundUsersIds = userIds.filter(id => {
                return users.some(user => user.id === id && user.id !== userId)
            })

            if(emailsList.length && foundUsersIds.length){
                const mailData = {
                    subject: `Invitation to workspace: ${workspaceName}`,
                    text: `${userName} has invited you to the workspace: ${workspaceName}. Please click the following link to join the workspace: ${process.env.origin}/joinWorkspace?workspaceId=${workspace.id}`
                };
    
                sendBulkEmail(emailsList, mailData).then(() => {
                    createWorkspaceUsers({ workspaceId: workspace.id, userIds: foundUsersIds })
                })
            }
        });
    }

    return new Response({ status: 200, data: { workspace } })    
}

module.exports = {
    addWorkspace: controllerWrapper(addWorkspace)
}