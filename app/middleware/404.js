module.exports = (app) => {
    app.use((req, res, next) => {
        res.status(404).json({
            code: "Not Found",
            status: 404,
            message: "Requested resource could not be found",
        });
    });
};
