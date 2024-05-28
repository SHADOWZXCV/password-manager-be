const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const prismaClient = require('@Models')
const Response = require('@Entities/response')
const { encrypt, decrypt } = require('@Util/aes')

const addNewVaultEntry = async ({ requestData, requestUser }) => {
    const { name, vaultId, value } = requestData
    const { id } = requestUser

    const vault = await prismaClient.vault.findFirst({ where: { user_id: id, id: vaultId } })

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

    const dbEntry = await prismaClient.vault_entry.create({data})

    return new Response({ status: 200, data: dbEntry })
}

module.exports = {
    addNewVaultEntry: controllerWrapper(addNewVaultEntry)
}