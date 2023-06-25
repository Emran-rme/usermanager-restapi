const userModel = require("../models/User");
const token = require("../helpers/token");

class Auth {
    async login(req, res, next) {
        try {
            const { email } = req.body;

            if (!("email" in req.body) || email.trim() === "") {
                return res.status(404).json({
                    error: true,
                    status: 404,
                    message: "اطلاعات ورودی اشتباه است",
                });
            }

            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    error: true,
                    status: 404,
                    message: "کاربری یافت نشد",
                });
            }
            const result = token.sign({ id: user._id, email: user.email });
            
            res.status(200).json({
                success: true,
                token: result,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Auth();
