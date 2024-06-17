const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { encrypt, decrypt } = require('@Util/aes')
const { createVault, findVaultByUserAndId } = require("@Services/vault")

const addNewVaultEntry = async ({ requestData, requestUser }) => {
    const { name, vaultId, value } = requestData
    const { id } = requestUser

    const vault = await findVaultByUserAndId({ id, vaultId })

    if (!vault) {
        return new Response({ status: 400, error: {
            error: 'No such vault'
        } })
    }

    const entry = {
        name,
        value,
    }

    const encrypted = encrypt(entry)

    const data = {
        content: encrypted,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        vault: {
            connect: { id: vaultId }
        }
     }

    const dbEntry = await createVault({ data })

    return new Response({ status: 200, data: dbEntry })
}

module.exports = {
    addNewVaultEntry: controllerWrapper(addNewVaultEntry)
}