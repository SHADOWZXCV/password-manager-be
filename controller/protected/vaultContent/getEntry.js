const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const prismaClient = require('@Models')
const Response = require('@Entities/response')
const { decrypt } = require('@Util/aes')

const getVaultEntryDetails = async ({ requestData, requestUser, requestQuery }) => {
    const { vaultId } = requestData
    const { id: entryId } = requestQuery
    const { id } = requestUser


    if(!vaultId || !entryId) {
        return new Response({ status: 400, error: {
            error: 'No such entry'
        } })
    }

    const vault = await prismaClient.vault.findFirst({ where: { user_id: id, id: vaultId } })

    if (!vault) {
        return new Response({ status: 401, error: {
            error: 'No such vault'
        } })
    }

    const encrypted = await prismaClient.vault_entry.findFirst({ where: { id: entryId, vault_id: vaultId } })

    if(!encrypted) {
        return new Response({ status: 404, error: {
            error: 'No such entry'
        } })
    }

    const decrypted = decrypt(encrypted.content)

    const data = {
        ...encrypted,
        content: decrypted
     }

    return new Response({ status: 200, data })
}

module.exports = {
    getVaultEntryDetails: controllerWrapper(getVaultEntryDetails)
}