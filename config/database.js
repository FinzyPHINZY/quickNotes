const Mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await Mongoose.connect(process.env.MONGODB_STRING);

    console.log(`Successfully connected to database: ${conn.connection.host}`);
  } catch (err) {
    console.log("Database connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
