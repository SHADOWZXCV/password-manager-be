const PrismaClient = require('@Services');

const createWorkspaceUser = async ({ data, workspaceId }) => {
    return await PrismaClient.workspaceUser.create({
        data: {
            ...data,
            workspace: {
                connect: {
                    id: workspaceId
                }
            }
        }
    });
};

const createWorkspaceUsers = async ({ userIds, workspaceId }) => {
    const data = userIds.map(userId => {
        return {
            role: "guest",
            status: "pending",
            workspace_id: workspaceId,
            user_id: userId
        }
    })

    return await PrismaClient.workspaceUser.createMany({
        data
    });
};

// const updateVaultName = async ({ data, userId, vaultId }) => {
//     return await PrismaClient.vault.update({
//         data,
//         where: {
//             id: vaultId,
//             user: {
//                 id: userId
//             }
//         }
//     });
// };

// const findVaultByUserAndId = async ({ id, vaultId }) => {
//     return await PrismaClient.vault.findFirst({ 
//         where: {
//             id: vaultId,
//             user: { id }
//         }
//     })
// }

// const findExistingVault = async ({ userId, name }) => {
//     return await PrismaClient.vault.findFirst({ 
//         where: { 
//             name,
//             user: {
//                 id: userId
//             }
//          } 
//     })
// }

// const deleteVault = async ({ userId, vaultId }) => {
//     return await PrismaClient.vault.delete({ 
//         where: { 
//             id: vaultId,
//             user: {
//                 id: userId
//             }
//          } 
//     })
// }

// const getVaultWithEntriesPaged = async ({ vaultId, pageNumber = 1, pageCapacity = 10, userId }) => {
//     return await PrismaClient.vault.findFirst({ 
//         where: { 
//             id: vaultId,
//             user: {
//                 id: userId
//             } 
//         },
//         include: { vault_entries: {
//             take: pageCapacity,
//         } },
//     })
// }

// const getListOfVaultsByUserId = async ({ id }) => {
//     return await PrismaClient.vault.findMany({ 
//         where: { 
//             user: {
//                 id
//             }
//          } 
//     })
// }

module.exports = {
    createWorkspaceUser,
    createWorkspaceUsers
    // createVault,
    // findExistingVault,
    // findVaultByUserAndId,
    // getVaultWithEntriesPaged,
    // updateVaultName,
    // getListOfVaultsByUserId,
    // deleteVault
}