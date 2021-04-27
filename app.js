require("dotenv").config();
const express = require("express");
const app = express();
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(user);
app.use(admin);

app.listen(7080, () => { console.log("port is running on 7080") });