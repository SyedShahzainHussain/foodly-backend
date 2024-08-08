const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const CategoryRoute = require("./routes/category");
const RestaurantRoute = require("./routes/restuarant");

dotenv.config();

mongoose.connect(process.env.MONGOURL).then(() => console.log("Foodly Database Connected")
).catch((e) => console.log(e)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", CategoryRoute);
app.use("/api/restaurant", RestaurantRoute);
app.listen(process.env.PORT || 3000, () => console.log(`Backend Floodly listening on port ${process.env.PORT}`)
);
