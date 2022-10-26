const express = require("express");
const app = express();
require("dotenv").config();

// middlewares
app.use(express.json());
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode? res.statusCode:500;
    res.status(statusCode);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        innerTargetException: process.env.NODE_ENV === 'production' ? null : err.innerTargetException
    });
}

app.use("/api", require("./routes"));
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Proxy Server running. Port: ", process.env.PORT));


