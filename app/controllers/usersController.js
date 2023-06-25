const userModel = require("../models/User");

class User {
    async index(req, res, next) {
        let projection = {};

        if (req.query.hasOwnProperty("fields")) {
            projection = req.query.fields
                .split(",")
                .reduce((total, current) => {
                    return { [current]: 1, ...total };
                }, {});
        }

        const users = await userModel.find({}, projection);

        res.status(200).json({
            success: "true",
            message: "لیست کاربران با موفقیت ایجاد شد",
            data: {
                users,
            },
        });
    }

    async store(req, res, next) {
        try {
            const { first_name, last_name, mobile, email } = req.body;

            //validation
            if (
                first_name === undefined ||
                last_name === undefined ||
                first_name.trim() === "" ||
                last_name.trim() === ""
            ) {
                return res.status(422).json({
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
