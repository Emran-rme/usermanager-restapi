const userRouter = require("./user");
const authRouter = require("./auth");

const auth = require("../middleware/auth");

module.exports = (app) => {
    app.use("/api/v1/users",[auth], userRouter);
    app.use("/api/v1/auth", authRouter);
};
