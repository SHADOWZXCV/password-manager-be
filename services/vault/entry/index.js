const PrismaClient = require('@Services');

const createVaultEntry = async ({ data, vaultId }) => {
    return await PrismaClient.vault.create({
        data,
        vault: {
            connect: { id: vaultId }
        }
    });
};

const findVaultEntryByVaultAndId = async ({ entryId, vaultId }) => {
    return await prismaClient.vault_entry.findFirst({ 
        where: { id: entryId, vault_id: vaultId } 
    })
}

module.exports = {
    createVaultEntry,
    findVaultEntryByVaultAndId
}
