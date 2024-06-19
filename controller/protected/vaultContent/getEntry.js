const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { decrypt } = require('@Util/aes')
const { findVaultByUserAndId } = require("@Services/vault")
const { findVaultEntryByVaultAndId } = require("@Services/vault/entry")
const logger = require("@Util/log")

const getVaultEntryDetails = async ({ requestData, requestUser, requestQuery }) => {
    const { vaultId, entryId } = requestQuery
    const { id } = requestUser

    logger.info(vaultId, entryId)

    if(!vaultId || !entryId) {
        return new Response({ status: 400, error: {
            error: 'No such entry'
        } })
    }

    const vault = await findVaultByUserAndId({ id, vaultId })

    if (!vault) {
        return new Response({ status: 401, error: {
            error: 'No such vault'
        } })
    }

    const encrypted = await findVaultEntryByVaultAndId({ vaultId, entryId })

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