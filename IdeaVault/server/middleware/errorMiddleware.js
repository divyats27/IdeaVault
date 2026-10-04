// Wraps async controller functions so errors go to the error handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Runs when no route matches
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

// Central error handler: always sends a friendly JSON message
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Something went wrong on the server";

  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // Mongoose: validation failed (e.g. missing title)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // MongoDB: duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 409;
    message = "This email is already registered";
  }

  // Never leak raw server error details to the user
  if (statusCode === 500) {
    console.error(err);
    message = "Something went wrong on the server. Please try again.";
  }

  res.status(statusCode).json({ message });
};

module.exports = { asyncHandler, notFound, errorHandler };
