const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { deleteVault } = require("@Services/vault")

const deleteVaultById = async ({ requestUser, requestData }) => {
    const { name, vaultId } = requestData
    const { id: userId } = requestUser

    const vault = await deleteVault({ userId, vaultId })

    if (!vault) {
        return new Response({ status: 404, error: {
            error: 'No such vault'
        } })
    }

    return new Response({ status: 200, data: vault })
}

module.exports = {
    deleteVaultById: controllerWrapper(deleteVaultById)
}
