
class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  const error = err

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  error.message = error.message || "Something went wrong!";

  // TODO: Prod errors
  // TODO: Dev errors

  console.error("UNEXPECTED ERROR 💥", error.message);

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = { CustomError, errorHandler }