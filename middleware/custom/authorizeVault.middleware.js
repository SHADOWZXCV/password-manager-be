const checkIfVaultIsOpen = (req, res, next) => {
    const vaultId = req.body.vaultId || req.query.vaultId || req.params.vaultId;

    if(!req.session.sessionData)
        return res.status(401).json({ error: 'open vault first' });

    const { sessionData: { currentVaultId } } = req.session

    if(vaultId !== currentVaultId)
        return res.status(401).json({ error: 'open vault first' });

    return next();
}

module.exports = {
    checkIfVaultIsOpen
}
