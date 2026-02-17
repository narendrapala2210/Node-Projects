const express = require("express")
const routes = require('./routes/index.route')
const { errorHandler, CustomError } = require('./middlewares/error.middleware')

const app = express()

// middlewares
app.use(express.json())
// all routes
app.use("/", routes)

// 404
app.use((req, res, next) => {
    next(new CustomError(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler) // global error handler

module.exports = app
