// middleware.js

const fs = require('fs');

function readJSONFileMiddleware(req, res, next) {
  const filePath = 'todo.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err.message);
      return next(err);
    }

    try {
      const jsonData = JSON.parse(data);
      req.todoArray = jsonData['todos']; // Attach the JSON data to the request object
      req.counterId = jsonData['primaryid'];
      req.filePath = filePath;
      next();
    } catch (error) {
      console.error('Error parsing JSON data:', error.message);
      next(error);
    }
  });
}

module.exports = readJSONFileMiddleware;
