const jwt = require("jsonwebtoken");

exports.sign = (data) => {
    return jwt.sign(data, process.env.APP_SECRET);
};

exports.verify = (token) => {
    const [_, newToken] = token.split(" ");
    try {
        const payload = jwt.verify(newToken, process.env.APP_SECRET, {
            algorithm: "RS256",
        });
        return payload;
    } catch (error) {
        return false;
    }
};

exports.decode = (token) => {
    return jwt.decode(token, process.env.APP_SECRET);
};
