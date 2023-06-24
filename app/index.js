const express = require("express");

const app = express();

require("./bootstrap");
require("./middleware")(app);
require("./routes")(app);
require("./middleware/exception")(app);
require("./middleware/404")(app);

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`App is running on port: ${port}`);
    });
};
