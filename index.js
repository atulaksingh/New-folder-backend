const express = require("express");
require('dotenv').config()
const { connectToMongoDB } = require("./connect")
var cors = require('cors')
// const USER = require("./models/user")
const userRoutes = require("./routes/userRoute")
const recipeRoutes = require("./routes/recipeRoute")
const app = express();
const PORT = 8000;
connectToMongoDB('mongodb://localhost:27017/food-recipe').then(() => console.log('Mongodb connected'))
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/user/recipe", recipeRoutes)
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))
