const token = require("../helpers/token");

module.exports = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).json({
            error: true,
            message: "you are not authorized!",
        });
    }
    const tokenVerify = token.verify(req.headers.authorization);
    if (!tokenVerify) {
        return res.status(401).json({
            error: true,
            message: "your token is not valid!",
        });
    }
    
    next();
};
