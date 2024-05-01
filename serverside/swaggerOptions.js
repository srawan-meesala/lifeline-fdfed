const swaggerDefinition = require('./swaggerDefinition');

const options = {
  swaggerDefinition,
  apis: ['./Routes/*.js'],
};

module.exports = options;