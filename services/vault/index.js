const PrismaClient = require('@Services');

const createVault = async ({ data, userId }) => {
    return await PrismaClient.vault.create({
        data: {
            ...data,
            user: {
                connect: { id: userId }
            }
        }
    });
};

const updateVaultName = async ({ data, userId, vaultId }) => {
    return await PrismaClient.vault.update({
        data,
        where: {
            id: vaultId,
            user_id: userId
        }
    });
};

const findVaultByUserAndId = async ({ id, vaultId }) => {
    return await PrismaClient.vault.findFirst({ 
        where: { user_id: id, id: vaultId } 
    })
}

const findExistingVault = async ({ userId, name }) => {
    return await PrismaClient.vault.findFirst({ 
        where: { AND: [{ name } , { user_id: userId }] } 
    })
}

const getVaultWithEntriesPaged = async ({ vaultId, pageNumber = 1, pageCapacity = 10, userId: id }) => {
    return await PrismaClient.vault.findFirst({ 
        where: { id: vaultId, user_id: id },
        include: { vault_entries: {
            take: pageCapacity,
        } },
    })
}

const getListOfVaultsByUserId = async ({ id }) => {
    return await PrismaClient.vault.findMany({ 
        where: { user_id: id } 
    })
}

module.exports = {
    createVault,
    findExistingVault,
    findVaultByUserAndId,
    getVaultWithEntriesPaged,
    updateVaultName,
    getListOfVaultsByUserId
}