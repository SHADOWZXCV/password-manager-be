const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { hash } = require("@Util/password")
const { createVault, findExistingVault } = require("@Services/vault")

const addNewVault = async ({ requestData, requestUser }) => {
    const { name, key } = requestData
    const { id: userId } = requestUser

    const existingVault = await findExistingVault({ name, userId })

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
     }

    const vault = await createVault({ data, userId })

    return new Response({ status: 200, data: vault })
}

module.exports = {
    addNewVault: controllerWrapper(addNewVault)
}
