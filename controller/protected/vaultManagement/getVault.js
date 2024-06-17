const { expressControllerWrapper: controllerWrapper } = require("@Middleware/custom/expressControllerWrapper.middleware")
const prismaClient = require('@Models')
const Response = require('@Entities/response')
const { encrypt, decrypt } = require('@Util/aes')
const { verify } = require("@Util/password")

const getVaultById = async ({ requestQuery, requestUser }) => {
    const { vaultId, pageNumber = 1, pageCapacity = 10 } = requestQuery 
    const { id } = requestUser

    if(!vaultId) 
        return new Response({ status: 400, error: {
            error: 'No such vault'
        } })

    const vault = await prismaClient.vault.findFirst({ 
        where: { id: vaultId, user_id: id },
        include: { vault_entries: {
            take: pageCapacity,
        } },
    })

    if (!vault)
        return new Response({ status: 404, error: {
            error: 'No such vault'
        } })    
    
    // CPU INTENSIVE: decrypt vault entries
    // TODO: think of a different way to do this that isn't CPU intensive
    vault.vault_entries = vault.vault_entries.map((entry) => {
        return {
            ...entry,
            content: decrypt(entry.content)
        }
    })
        
    return new Response({ status: 200, data: {
        vaultData: {
            id: vault.id,
            name: vault.name,
            created_at: vault.created_at,
            updated_at: vault.updated_at,
            vault_entries: vault.vault_entries
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

    const vault = await prismaClient.vault.findFirst({ 
        where: { id: vaultId, user_id: id }
    })

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

    const vaults = await prismaClient.vault.findMany({ where: { user_id: id } })
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