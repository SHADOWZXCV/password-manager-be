const PrismaClient = require('@Services');

const createVault = async ({ data, userId }) => {
    return await PrismaClient.vault.create({
        data,
        user: {
            connect: { id: userId }
        }
    });
};

const findVaultByUserAndId = async ({ id, vaultId }) => {
    return await prismaClient.vault.findFirst({ 
        where: { user_id: id, id: vaultId } 
    })
}

const findExistingVault = async ({ userId, name }) => {
    return await prismaClient.vault.findFirst({ 
        where: { AND: [{ name } , { user_id: userId }] } 
    })
}

const getVaultWithEntriesPaged = async ({ vaultId, pageNumber = 1, pageCapacity = 10 }) => {
    return await prismaClient.vault.findFirst({ 
        where: { id: vaultId, user_id: id },
        include: { vault_entries: {
            take: pageCapacity,
        } },
    })
}

const getListOfVaultsByUserId = async ({ id }) => {
    return await prismaClient.vault.findMany({ 
        where: { user_id: id } 
    })
}

module.exports = {
    createVault,
    findExistingVault,
    findVaultByUserAndId,
    getVaultWithEntriesPaged,
    getListOfVaultsByUserId
}