const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My StudyHub API',
    description: 'StudyHub API'
  },
  host: 'kofisapi.onrender.com',
  schemes: ['https']
};

const outputFile = '../models/jsons/swagger.json';
const endpointsFiles = ['../routes/'];

swaggerAutogen(outputFile, endpointsFiles, doc);

