const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require('../src/routes/auth.routes')
const recipeRouter = require('../src/routes/recipe.routes')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());

app.use('/api/auth/', authRouter);
app.use('/api/recipe/', recipeRouter);


module.exports = app;