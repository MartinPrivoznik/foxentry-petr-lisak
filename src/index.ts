import dotenv from 'dotenv';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import products from './routes/products';
import { errorHandler } from './middleware/errorHandler';
import { swaggerOptions } from './documentation/swaggerOptions';

dotenv.config();

const app: Express = express();

const swaggerDoc = swaggerJsDoc(swaggerOptions);

app.use(express.json());

app.use('/api/products', products);
app.use('/api/reference', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errorHandler);

export default app;
