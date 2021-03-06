const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PROD
        : process.env.MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
    console.log("Mongodb Connected :", conn.connection.host);
  } catch (e) {
    console.log("Error is", e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
