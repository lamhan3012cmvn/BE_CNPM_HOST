const express = require('express');
const path = require('path');
const { PORT } = require('./config');
const app = express();
const db = require('./config/db');
const route = require('./routes');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//connect db
db.connect();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use(route);

app.listen(PORT, () => {
    console.log(`App running in port ${PORT}`);
});