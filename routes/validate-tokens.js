const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ err: "Acceso denegado" })
    try {

        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() //continuar

    } catch (error) {
        res.status(400).json({ error: "El token es invalido" })
    }
}

module.exports = verifyToken;