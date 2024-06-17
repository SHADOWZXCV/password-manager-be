const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { hash } = require("@Util/password")
const { createVault, findExistingVault } = require("@Services/vault")

const addNewVault = async ({ requestData, requestUser }) => {
    const { name, key } = requestData
    const { id } = requestUser

    const existingVault = await findExistingVault({ name, id })

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

    const vault = await createVault({ data })

    return new Response({ status: 200, data: vault })
}

module.exports = {
    addNewVault: controllerWrapper(addNewVault)
}