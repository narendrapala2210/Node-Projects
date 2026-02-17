require("dotenv").config();

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION 💥");
    console.error(err.name, err.message);
    process.exit(1); // immediate crash
});

const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION  : ", err.name, err.message);
    server.close(() => process.exit(1));
});

process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => process.exit(0));
});

module.exports = app