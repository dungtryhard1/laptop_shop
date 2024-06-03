/* eslint-disable no-undef */
import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './src/routes/index.js';
import ConnectDB from './src/lib/database.js';
import { log } from 'mercedlogger';
import cors from 'cors';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' assert { type: 'json' };
import bodyParser from 'body-parser';

// Add Authorization

// Create web server
const app = express();

app.use(morgan('dev'));

app.use(cors({ credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
// Load .evn file: config file
dotenv.config();

await ConnectDB();

app.use(routes);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const port = process.env.PORT || 8080;

app.listen(port, async () => {
    log.green('Node RESTful API running', `http://localhost:${port}`);
});
