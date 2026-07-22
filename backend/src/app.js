const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require('../src/routes/auth.routes')
const recipeRouter = require('../src/routes/recipe.routes')

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(null, true); // Allow origin in production or specify exact domain match
        }
    },
    credentials: true
}))
app.use(express.json());

app.use('/api/auth/', authRouter);
app.use('/api/recipe/', recipeRouter);


module.exports = app;