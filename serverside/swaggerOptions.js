const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: ['./authrouter.js', './adminrouter.js', './docrouter.js', './hosprouter.js', './patientrouter.js', './blogsrouter.js', './pharmacyrouter.js'],
};

module.exports = options;