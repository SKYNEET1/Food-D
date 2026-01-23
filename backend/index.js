const cors = require("cors");
require('dotenv').config();
require('./helper/logger');
const express = require('express');
const dbConnect = require('./config/MongoDatabase');
const app = express();

const cookieParser = require('cookie-parser');
const onboardingRouter = require('./route/onboardingRoutes');
const userRouter = require('./route/userRoutes');
const shopRouter = require('./route/shopRoutes');
const itemRouter = require("./route/itemRoutes");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api', onboardingRouter);
app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/item', itemRouter);

app.get('/', (req, res) => {
    res.send('hi')
})
const PORT = process.env.PORT;

(async () => {

    dbConnect();
    app.listen(PORT, () => {
        console.print("INFO", "Server", `server is running at PORT ${PORT}`, __filename);

    });
})();

module.exports = app