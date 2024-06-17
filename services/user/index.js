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

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
}