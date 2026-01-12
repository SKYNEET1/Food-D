require('dotenv').config();
require('../backend/helper/logger');
const cors = require("cors");
const express = require('express');
const dbConnect = require('./config/MongoDatabase');
const app = express();

const cookieParser = require('cookie-parser');
const userRouter = require('./route/userRoute');

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api', userRouter)

app.get('/', (req, res) => {
    res.send('hi')
})
const PORT = process.env.PORT || 4000;

(async () => {

    dbConnect();
    app.listen(PORT, () => {
        console.print("INFO", "Server", `server is running at PORT ${PORT}`, __filename);

    });
})();

module.exports = app