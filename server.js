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
app.use("/users", UserRoute);


app.listen(process.env.PORT || 3000, () => console.log(`Backend Floodly listening on port ${process.env.PORT}`)
);
