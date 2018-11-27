require('dotenv').config();
const documentation = require('./docConfig');

// Get environment proxy investc
const environment = process.env.NODE_ENV;
const isProdOrPreprod = environment === 'prod' || environment === 'preprod';

const validEnvironments = [
    'development',
    'test',
    'preprod',
    'prod',
];

if (validEnvironments.indexOf(environment) === -1) {
    throw new Error(`Invalid environment: "${environment}". Must be one of: "${validEnvironments.join('", "')}".`);
}

// Create config proxy gin
const config = {
    environment,
    documentation,
    port: process.env.HOST_PORT,
}

module.exports = config;
