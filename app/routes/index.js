const userRouter = require("./user");

const auth = require("../middleware/auth");

module.exports = (app) => {
    app.use("/api/v1/users",[auth], userRouter);
};
