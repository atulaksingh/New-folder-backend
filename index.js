const express = require("express");
require('dotenv').config()
const { connectToMongoDB } = require("./connect")
var cors = require('cors')
// const USER = require("./models/user")
const userRoutes = require("./routes/userRoute")
const app = express();
const PORT = 8000;
connectToMongoDB('mongodb://localhost:27017/food-recipe').then(() => console.log('Mongodb connected'))
app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))
