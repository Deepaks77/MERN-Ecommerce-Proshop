const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/ProductRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const orderRoutes = require("./routes/orderRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
//middlware kisi bhi specific route ka bhi bnasket hai ya fer overall hr request ke ek hi middlware bnade

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
//error handler special feature hai it should be called after last app.use() routes
//error handler will receive a special error parameter which catch if any error
//happened over above any routes!
//we are puttingg in seprate file.

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

app.use(notFound); //404 not found if any mismatch route is requested
app.use(errorHandler); //error if any above routes have error

app.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
  );
});
