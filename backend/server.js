const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/ProductRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

//middlware kisi bhi specific route ka bhi bnasket hai ya fer overall hr request ke ek hi middlware bnade

app.get("/", (req, res) => {
  res.send("Api is running...");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
//error handler special feature hai it should be called after last app.use() routes
//error handler will receive a special error parameter which catch if any error
//happened over above any routes!
//we are puttingg in seprate file.

app.use(notFound); //404 not found if any mismatch route is requested
app.use(errorHandler); //error if any above routes have error

app.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
  );
});
