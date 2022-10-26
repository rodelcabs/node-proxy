const express = require("express");
const app = express();
require("dotenv").config();

app.use("/api", require("./routes"));

app.listen(process.env.PORT, () => console.log("Proxy Server running. Port: ", process.env.PORT));


