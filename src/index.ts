import dotenv from 'dotenv';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './documentation/swagger_def.json';

dotenv.config();

const app: Express = express();

// Use JSON parser for all incoming requests
app.use(express.json());

app.use('/api-reference', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
