const PrismaClient = require('@Services');

const createVaultEntry = async ({ data, vaultId }) => {
    return await PrismaClient.vault_entry.create({
        data: {
            ...data,
            vault: {
                connect: { id: vaultId }
            }
        },
        
    });
};

const updateEntry = async ({ data, vaultId, entryId }) => {
    return await PrismaClient.vault_entry.update({
        where: { 
            id: entryId, 
            vault: {
                id: vaultId
            }
        },
        data,
    });
};

const moveSelectedEntriesToNewVault = async ({ newVaultId, entryIds }) => {
    return await PrismaClient.vault_entry.updateMany({
        where: { id: { 
            in: entryIds 
            }
        },
        data: {
            vault_id: newVaultId
        }
    });
};

const findVaultEntryByVaultAndId = async ({ entryId, vaultId }) => {
    return await PrismaClient.vault_entry.findFirst({ 
        where: {
            id: entryId, 
            vault: {
                id: vaultId
            }
        } 
    })
}

const deleteEntry = async ({ entryId }) => {
    return await PrismaClient.vault_entry.delete({ 
        where: { id: entryId } 
    })
}

module.exports = {
    createVaultEntry,
    updateEntry,
    deleteEntry,
    findVaultEntryByVaultAndId,
    moveSelectedEntriesToNewVault
}
