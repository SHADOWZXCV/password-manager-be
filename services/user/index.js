const PrismaClient = require('@Services');

const createUser = async (data) => {
    return await PrismaClient.user.create({
        data
    });
};

const findUserByEmail = async (email) => {
    return await PrismaClient.user.findUnique({
        where: {
            email
        }
    })
}

const findUserById = async (id) => {
    return await PrismaClient.user.findUnique({
        where: {
            id
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
    findUserByEmail,
    findUserById,
    findUsersById
}