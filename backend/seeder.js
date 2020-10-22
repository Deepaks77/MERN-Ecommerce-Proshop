//this script is not a part of our application it just import and destroy  the data
//to run it please see package.json npm run data:import to import data and npm run data:destroy to destroy data
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = await createdUsers[0]._id;
    const sampleProduct = await products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProduct);
    console.log("Data Imported");
    process.exit();
  } catch (e) {
    console.log("Error", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Destroyed Data");
    process.exit();
  } catch (e) {
    console.log("Error in destroying data", error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  console.log("destroyed fired");
  destroyData();
} else {
  console.log("Import fired");
  importData();
}
