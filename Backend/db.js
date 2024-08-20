const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Mongo is connected".bgGreen.white);
  } catch (error) {
    console.log(`mongo error : ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
