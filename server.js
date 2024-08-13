const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restuarant");
const FoodRoute = require("./routes/food");
const RatingRoute = require("./routes/rating");
const AuthRoute = require("./routes/auth");
const UserRoute = require("./routes/user");
const AddressRoute = require("./routes/address");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");

dotenv.config();


mongoose.connect(process.env.MONGOURL).then(() => console.log("Foodly Database Connected")
).catch((e) => console.log(e)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Todo API Routes 
app.use("/", AuthRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/foods", FoodRoute);
app.use("/api/rating", RatingRoute);
app.use("/api/users", UserRoute);
app.use("/api/address", AddressRoute);
app.use("/api/cart", CartRoute);
app.use("/api/order", OrderRoute);


app.listen(process.env.PORT || 3000, () => console.log(`Backend Floodly listening on port ${process.env.PORT}`)
);
