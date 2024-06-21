const PrismaClient = require('@Services');

const createUser = async (data) => {
    return await PrismaClient.user.create({
        data
    });
};

const updateUserById = async ({ data, id }) => {
    return await PrismaClient.user.update({
        data,
        where: {
            id
        }
    });
}

const findUserByProviderIdOrEmail = async (providerId, email) => {
    return await PrismaClient.user.findFirst({
        where: {
            OR: [
                {
                    accounts: {
                        some: {
                            provider_id: providerId
                        }
                    }
                },
                {email}
            ]
        },
        include: {
            accounts: true
        }
    })
}

const findUserById = async (id) => {
    return await PrismaClient.user.findUnique({
        where: {
            id
        },
        include: {
            accounts: true
        }
    })
}

const findUsersById = async (ids, selectedColumns) => {
    return await PrismaClient.user.findMany({
        where: {
            id: {
                in: ids
            }
        },
        ...(selectedColumns ? { select: selectedColumns } : {})
    })
}

module.exports = {
    createUser,
    findUserById,
    findUsersById,
    findUserByProviderIdOrEmail,
    updateUserById
}