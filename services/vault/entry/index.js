const PrismaClient = require('@Services');

const createVaultEntry = async (data) => {
    return await PrismaClient.vault.create({
        data
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
