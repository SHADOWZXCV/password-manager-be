const PrismaClient = require('@Services');

const findUserAccountByProviderId = async (providerId) => {
    return await PrismaClient.UserAccount.findFirst({
        where: {
            provider_id: providerId
        },
        include: {
            user: true
        }
    })
}

const createUserAccount = async ({ data, userId }) => {
    return await PrismaClient.UserAccount.create({
        data: {
            ...data,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

module.exports = {
    createUserAccount,
    findUserAccountByProviderId
}
