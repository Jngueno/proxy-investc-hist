const { documentation, environment } = require('../config/config');
const expressSwagger = require('express-swagger-generator');

function bindToServer(app) {
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                description: 'Proxy for InvesTc application',
                title: 'InvesTc proxy',
                version: '1.0.0',
            },
            host: documentation[environment].apiHost,
            basePath: '/investc',
            produces: [
                'application/json',
                'application/xml',
            ],
            schemes: ['http', 'https'],
        },
        basedir: __dirname, // app absolute path
        files: ['../controllers/**/*.js'], // Path to the API handle folder
    };

    expressSwagger(app)(swaggerOptions);
}

module.exports = {
    bindToServer,
};
