const Response = require('@Entities/response')
const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const { decrypt } = require('@Util/aes')
const { verify } = require("@Util/password")
const { getListOfVaultsByUserId, 
        findVaultByUserAndId, 
        getVaultWithEntriesPaged 
    } = require("@Services/vault")

const openAndMoveToDestVault = async ({ requestQuery, requestUser }) => {
    const { vaultId, destinationVaultId, destinationKey, entriesIds } = requestQuery 
    const { id } = requestUser


        
    return new Response({ status: 200, data: {
        vaultData: {
            id: vault.id,
            name: vault.name,
            created_at: vault.created_at,
            updated_at: vault.updated_at,
            vault_entries: vault.vault_entries
        }
    }, actions: {
        sessionData: {
            currentVaultId: destinationVaultId
         }
    }})
}

const openVault = async ({ requestData, requestUser }) => {
    const { key, vaultId } = requestData 
    const { id } = requestUser

    if(!vaultId) 
        return new Response({ status: 400, error: {
            error: 'No such vault'
        } })

    if(!key)
        return new Response({ status: 400, error: {
            error: 'No key provided'
        } })

    const vault = await findVaultByUserAndId({ id, vaultId })

    if (!vault)
        return new Response({ status: 404, error: {
            error: 'No such vault'
        } })

    const { vault_key } = vault
    const [hashedKey, salt] = vault_key.split(':')
    const isCorrectKey = await verify(key, hashedKey)

    if (!isCorrectKey)
        return new Response({ status: 400, error: {
            error: 'Incorrect key'
        } })
        
    return new Response({ status: 200, data: {
        vaultData: {
            id: vault.id,
            name: vault.name,
            created_at: vault.created_at,
            updated_at: vault.updated_at,
        }
    }, actions: {
        sessionData: {
            currentVaultId: vaultId
         }
    } })
}

const getVaults = async ({ requestUser, requestSession }) => {
    const { id } = requestUser

    const vaults = await getListOfVaultsByUserId({ id })
    const vaultsData = vaults.map(vault => {
        return {
            id: vault.id,
            name: vault.name,
            created_at: vault.created_at,
            updated_at: vault.updated_at
        }
    })

    const openedVault = requestSession.sessionData?.currentVaultId

    return new Response({ status: 200, data: {
        vaultsData,
        openedVault,
        user: {
            name: requestUser.name,
            email: requestUser.email,
            profile_pic: requestUser.profile_pic
        }
    } })
}

module.exports = {
    getVaultById: controllerWrapper(getVaultById),
    getVaults: controllerWrapper(getVaults),
    openVault: controllerWrapper(openVault)
}