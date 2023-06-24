const userModel = require("../models/User");

class User {
    index(req, res, next) {
        res.json({
            success: "true",
            message: "لیست کاربران با موفقیت ایجاد شد",
        });
    }

    async store(req, res, next) {
        try {
            const newUser = new userModel({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile,
                email: req.body.email,
            });

            await newUser.save();

            res.status(201).json({
                success: true,
                message: "کاربر جدید با موفقیت ایجاد شد",
                newUserID: newUser._id,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new User();
