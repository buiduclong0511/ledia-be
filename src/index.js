const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./Config/db");
const route = require("./Routes");

dotenv.config();

const app = express();

// connect db
db.connect();

const PORT = process.env.PORT || 3001;

// middle ware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

// routes init
route(app);