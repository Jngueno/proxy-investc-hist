require('dotenv').config();
const { environment, corsOptions, customValidators, port } = require('./src/config/config');

const http = require('http');
const cors = require('cors');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./src/middlewares/httpLogger');
const logger = require('./src/helpers/logger');
const controllers = require('./src/controllers');
const eventEmitter = require('./src/events/event-emitter');
const swaggerDocumentation = require('./src/documentation/swagger-documentation');

const app = express();
const server = http.createServer(app);

app.use(cors(corsOptions));

if (environment !== 'prod') {
    swaggerDocumentation.bindToServer(app);
}

app.use(requestLogger);
app.use(errorLogger);

app.use(bodyParser.json());
app.use(expressValidator(customValidators));

app.use('/', controllers);

app.use('/doc', express.static('doc'));

server.listen(port, () => {
    logger.info('Listening on port:', port);
});
