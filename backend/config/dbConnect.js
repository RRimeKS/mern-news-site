const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("MongoDB Is Connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;