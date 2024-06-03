import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'API Shop',
        description: 'API description',
    },
    host: 'localhost:4200',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
