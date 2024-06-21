const { createUser } = require('@Services/user');
const { createUserAccount } = require('@Services/user/account');
const { findUserByProviderIdOrEmail } = require('@Services/user');

const createNewUserProviders = async (accessToken, refreshToken, profile, done) => {
    // email could be null for some providers.
    const email = profile?.emails?.[0]?.value;
    const { id, provider } = profile;
    let user = await findUserByProviderIdOrEmail(id, email);

    if(!user) {
        const newUser = {
            name: profile.displayName,
            email,
            profile_pic: profile.photos[0].value
        }

        user = await createUser(newUser);
    }

    const hasProvider = user.accounts?.some(account => account.provider === provider);

    if(!hasProvider) {
        const newAccount = {
            provider_id: id,
            provider
        }

        user.accounts = [await createUserAccount({ data: newAccount, userId: user.id })];
    }

    return done(null, user);
}

module.exports = createNewUserProviders
