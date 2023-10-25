const express = require("express");
const routes = require("./routes");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const app = express();

migrationsRun();

// Middleware
app.use(express.json());
app.use(routes);

//Error handling middleware
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// Start server
const PORT = 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
