const userModel = require("../models/User");

class User {
    async index(req, res, next) {
        let projection = { first_name: 1, last_name: 1 };
        let perPage = parseInt(req.query.limit) || 2;
        let page = parseInt(req.query.page) || 1;
        let offset = (page - 1) * perPage;

        if (req.query.hasOwnProperty("fields")) {
            projection = req.query.fields
                .split(",")
                .reduce((total, current) => {
                    return { [current]: 1, ...total };
                }, {});
        }

        const userCount = await userModel.count();
        const users = await userModel
            .find({}, projection)
            .limit(perPage)
            .skip(offset);

        let pages = Math.ceil(userCount / perPage);

        res.status(200).json({
            success: "true",
            message: "لیست کاربران با موفقیت ایجاد شد",
            data: {
                users,
            },
            meta: {
                pages,
                page,
                nextPage: User.#hasNextPage(pages, page)
                    ? `${process.env.APP_URL}:${
                          process.env.APP_PORT
                      }/api/v1/users${
                          req.query.fields
                              ? req.query.limit
                                  ? "?fields=" +
                                    req.query.fields +
                                    "&page=" +
                                    (page + 1) +
                                    "&limit=" +
                                    perPage
                                  : "?fields=" +
                                    req.query.fields +
                                    "&page=" +
                                    (page + 1)
                              : req.query.limit
                              ? "?page=" + (page + 1) + "&limit=" + perPage
                              : "?page=" + (page + 1)
                      }`
                    : null,
                prevPage: User.#hasPervPage(page)
                    ? `${process.env.APP_URL}:${
                          process.env.APP_PORT
                      }/api/v1//users${
                          req.query.fields
                              ? req.query.limit
                                  ? "?fields=" +
                                    req.query.fields +
                                    "&page=" +
                                    (page - 1) +
                                    "&limit=" +
                                    perPage
                                  : "?fields=" +
                                    req.query.fields +
                                    "&page=" +
                                    (page - 1)
                              : req.query.limit
                              ? "?page=" + (page - 1) + "&limit=" + perPage
                              : "?page=" + (page - 1)
                      }`
                    : null,
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

    async show(req, res, next) {
        try {
            const { id } = req.params;
            let projection = {};

            if (req.query.hasOwnProperty("fields")) {
                projection = req.query.fields
                    .split(",")
                    .reduce((total, current) => {
                        return { [current]: 1, ...total };
                    }, {});
            }

            if (!id) {
                return res.status(404).json({
                    error: true,
                    message: "کاربری با  این مشخصات یافت نشد",
                });
            }

            const user = await userModel.findOne({ _id: id }, projection);

            if (!user) {
                return res.status(404).json({
                    error: true,
                    message: "کاربری با  این مشخصات یافت نشد",
                });
            }

            return res.status(200).json({
                success: true,
                data: { user },
            });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({
                    error: true,
                    message: "کاربری با این مشخصات یافت نشد",
                });
            }

            await userModel.deleteOne({ _id: id });

            res.status(200).json({
                success: true,
                message: "کاربر با موفقیت حذف شد",
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({
                    error: true,
                    message: "کاربری با  این مشخصات یافت نشد",
                });
            }

            const { n, nModified } = await userModel.updateOne(
                { _id: id },
                { ...req.body }
            );

            if (n === 0 || nModified === 0) {
                throw new Error("عملیات به روزرسانی با خطا مواجه گردید");
                return;
            }

            return res.status(200).json({
                success: true,
                message: "اطلاعات کاربر با موفقیت ویرایش شد",
            });
        } catch (error) {
            next(error);
        }
    }

    static #hasNextPage(pages, page) {
        return page < pages;
    }

    static #hasPervPage(page) {
        return page > 1;
    }
}

module.exports = new User();
