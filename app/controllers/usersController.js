class User {
    index(req, res) {
        res.json({
            success: "true",
            message: "لیست کاربران با موفقیت ایجاد شد",
        });
    }
}

module.exports = new User();
