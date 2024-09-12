import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Obchůdek Petra Lišáka',
    description: 'Dokumentace k REST API obchůdku Petra Lišáka',
  },
};

const outputFile = './src/documentation/swagger_def.json';
const endpointsFiles = [];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
