const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { verify } = require("@Util/password")
const { findVaultByUserAndId } = require("@Services/vault")
const { moveSelectedEntriesToNewVault } = require('@Services/vault/entry')

const openAndMoveToDestVault = async ({ requestData, requestUser }) => {
    const { vaultId, destinationVaultId, destinationKey, entriesIds } = requestData 
    const { id } = requestUser

    if(vaultId === destinationVaultId)
        return new Response({
            status: 400, 
            error: {
                error: 'Cannot move to the same vault'
            }
        })

    const destVault = await findVaultByUserAndId({ id, vaultId: destinationVaultId })

    if (!destVault)
        return new Response({ status: 404, error: {
            error: 'No such vault'
        } })

    const { vault_key } = destVault
    const [hashedKey, salt] = vault_key.split(':')
    const isCorrectKey = await verify(destinationKey, hashedKey)

    if (!isCorrectKey)
        return new Response({ 
            status: 400, 
            error: {
                error: 'Incorrect key'
            } 
        })
        
    const result = await moveSelectedEntriesToNewVault({ 
        newVaultId: destinationVaultId,
        entryIds: entriesIds 
    })

    return new Response({ status: 200, data: {
        movedEntriesCount: result.count
        },
        actions: {
            sessionData: {
                currentVaultId: destinationVaultId
            }
        }
    })
}
module.exports = {
    openAndMoveToDestVault: controllerWrapper(openAndMoveToDestVault)
}