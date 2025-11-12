const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.print("INFO", "Database-Server", `Database Connected Successfully`, __filename))
        .catch((error) => console.print("ERROR", "Database-Server", `Error in connecting DB => ${error}`, __filename))
};

module.exports = dbConnect;