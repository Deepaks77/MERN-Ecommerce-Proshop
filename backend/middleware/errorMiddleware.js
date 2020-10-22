const notFound = (req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  error.status = 404; //error is a object and we are custom making a status field to fill some value
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      errorStack: process.env.NODE_ENV === "development" ? err.stack : null,
    },
  });
};

module.exports = {
  notFound,
  errorHandler,
};
