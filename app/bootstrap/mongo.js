const mongoose = require("mongoose");

const { MONGO_DB_NAME, MONGO_HOST, MONGO_PORT } = process.env;

mongoose.connection.on("error", (error) => {
    console.log("mongo DB connection failed!", error.message);
});

const startMongoDB = () => {
    mongoose
        .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`)
        .then(() => console.log("Connected!"))
        .catch((error) => console.log(error.message));
};

module.exports = startMongoDB;
