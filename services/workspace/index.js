const PrismaClient = require('@Services');

const createWorkspaceIfNotExists = async ({ data, userId }) => {
    const { name } = data

    const existingWorkspace = await PrismaClient.workspace.findFirst({
        where: {
            name,
            created_by: {
                id: userId
            }
        }
    })

    if (existingWorkspace)
        return

    return await PrismaClient.workspace.create({
        data: {
            ...data,
            created_by: {
                connect: { id: userId }
            }
        }
    });
};

module.exports = {
    createWorkspaceIfNotExists
}