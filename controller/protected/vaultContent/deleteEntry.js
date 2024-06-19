const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { deleteEntry } = require("@Services/vault/entry")

const deleteVaultEntry = async ({ requestData, requestUser }) => {
    const { entryId } = requestData

    const dbEntry = await deleteEntry({ entryId })

    return new Response({ status: 200, data: dbEntry })
}

module.exports = {
    deleteVaultEntry: controllerWrapper(deleteVaultEntry)
}