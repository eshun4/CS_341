const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'Contacts API'
  },
  host: 'kofisapi.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/'];

swaggerAutogen(outputFile, endpointsFiles, doc);

