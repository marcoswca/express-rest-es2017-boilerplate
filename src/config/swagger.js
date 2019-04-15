const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const router = express.Router();

module.exports = () => {
  const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
      title: 'API',
      version: '0.0.1',
      description: '',
    },
    servers: [{
      url: process.env.HOST || 'http://localhost:3000/v1',
      description: 'Local server',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  };

  const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '/../api/docs/*')],
  };

  const swaggerSpec = swaggerJSDoc(options);

  router.get('/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const showExplorer = false;
  const opt = {};
  const customCss = '.topbar{display:none}';

  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, showExplorer, opt, customCss));

  return router;
};
