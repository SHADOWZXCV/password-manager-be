const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const prismaClient = require('@Models')

const addNewVault = async ({ requestData, requestUser }) => {
    const { name } = requestData
    const { id } = requestUser
    const data = { 
        user_id: id,
        name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
     }

    const vault = await prismaClient.vault.create({data})

    return new Response({ status: 200, data: vault })
}

module.exports = {
    addNewVault: controllerWrapper(addNewVault)
}