const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const prismaClient = require('@Models')
const Response = require('@Entities/response')
const { hash } = require("@Util/password")

const addNewVault = async ({ requestData, requestUser }) => {
    const { name, key } = requestData
    const { id } = requestUser

    const existingVault = await prismaClient.vault.findFirst({ where: { AND: [{ name } , { user_id: id }] } })

    if (existingVault) {
        return new Response({ status: 409, error: {
            error: 'Vault already exists'
        } })
    }

    const {hashed, salt} = await hash(key)

    const data = {
        name,
        vault_key: hashed + ':' + salt,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user: {
            connect: { id }
        }
     }

    const vault = await prismaClient.vault.create({
        data
    })

    return new Response({ status: 200, data: vault })
}

module.exports = {
    addNewVault: controllerWrapper(addNewVault)
}