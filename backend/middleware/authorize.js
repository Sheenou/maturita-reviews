const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.redirect("/users/login");

    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        return next();
    } catch (error) {
        return res.redirect("/users/refresh");
    }

}

module.exports = verifyToken;