async function verifyToken(req, res, next) {
    try {
        const body = req.body;
        res.json({
            body
        });
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}

module.exports = verifyToken;