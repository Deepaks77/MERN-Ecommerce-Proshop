const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  product
    ? res.status(200).json(product)
    : res.status(404).json({ error: "did nt found anything" });
});

app.listen(PORT, () => {
  console.log(
    `App is running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
  );
});
