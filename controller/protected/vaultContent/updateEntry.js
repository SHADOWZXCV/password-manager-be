const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { encrypt } = require('@Util/aes')
const { updateEntry } = require("@Services/vault/entry")

const updateVaultEntry = async ({ requestData, requestUser }) => {
    const { name, vaultId, entryId, value } = requestData

    const entry = {
        name,
        value,
    }

    const encrypted = encrypt(entry)

    const data = {
        content: encrypted,
        updated_at: new Date().toISOString(),
     }

    const dbEntry = await updateEntry({ data, vaultId, entryId })

    return new Response({ status: 200, data: dbEntry })
}

module.exports = {
    updateVaultEntry: controllerWrapper(updateVaultEntry)
}