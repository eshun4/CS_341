const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My StudyHub API',
    description: 'StudyHub API'
  },
  host: 'http://localhost:2917',
  schemes: ['http']
};

const outputFile = '../models/jsons/swagger.json';
const endpointsFiles = ['../routes/'];

swaggerAutogen(outputFile, endpointsFiles, doc);

