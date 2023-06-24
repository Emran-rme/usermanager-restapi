const userModel = require("../models/User");

class User {
    async index(req, res, next) {
        res.status(200).json({
            success: "true",
            message: "لیست کاربران با موفقیت ایجاد شد",
        });
    }

    async store(req, res, next) {
        try {
            const { first_name, last_name, mobile, email } = req.body;

            //validation
            if (first_name.trim() === "" || last_name.trim() === "") {
                res.status(422).json({
                    error: true,
                    message: "اطلاعات ارسالی برای ایجاد کاربر معتبر نمی باشد",
                });
            }

            const newUser = new userModel({
                first_name,
                last_name,
                mobile,
                email,
            });

            await newUser.save();

            res.status(201).json({
                success: true,
                message: "کاربر جدید با موفقیت ایجاد شد",
                newUser,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new User();
