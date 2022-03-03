const mongoose = require("mongoose");

const connectDB = async () => {
    const dbURI = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD)
    try {
        const conn = await mongoose.connect( dbURI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        console.log(`Database connected to ${conn.connection.host} for ${conn.connection.name}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;