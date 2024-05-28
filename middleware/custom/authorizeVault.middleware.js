const checkIfVaultIsOpen = (req, res, next) => {
    const { vaultId } = req.body;
    const { id } = req.user;

    if(!req.session.sessionData)
        return res.status(401).json({ error: 'open vault first' });

    const  { sessionData: { currentVaultId, userId } } = req.session

    if(vaultId !== currentVaultId && userId !== id)
        return res.status(401).json({ error: 'open vault first' });

    return next();
}

module.exports = {
    checkIfVaultIsOpen
}