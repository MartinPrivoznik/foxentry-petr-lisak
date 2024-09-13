import dotenv from 'dotenv';
import express, { Express } from 'express';
import { errorHandlingMiddleware } from './middleware/errorHandlingMiddleware';
import { RegisterRoutes } from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from './documentation/swagger.json';

dotenv.config();

const app: Express = express();

app.use(express.json());

app.use('/api/reference', swaggerUi.serve, swaggerUi.setup(swaggerDef));

RegisterRoutes(app);

app.use(errorHandlingMiddleware);

export default app;
