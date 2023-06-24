const express = require("express");

const app = express();

require("./middleware")(app);

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`App is running on port: ${port}`);
    });
};
