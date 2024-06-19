const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { findExistingVault, updateVaultName } = require("@Services/vault")

const changeVaultName = async ({ requestUser, requestData }) => {
    const { name, vaultId } = requestData
    const { id: userId } = requestUser

    const existingVault = await findExistingVault({ vault_id: vaultId, userId })

    if (!existingVault) {
        return new Response({ status: 404, error: {
            error: 'No such vault'
        } })
    }

    const data = {
        name,
        updated_at: new Date().toISOString(),
     }

    const vault = await updateVaultName({ data, userId, vaultId })

    return new Response({ status: 200, data: vault })
}

module.exports = {
    changeVaultName: controllerWrapper(changeVaultName)
}
