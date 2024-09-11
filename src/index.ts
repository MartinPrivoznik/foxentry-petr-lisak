import express, { Express } from 'express';

const app: Express = express();

// Use JSON parser for all incoming requests
app.use(express.json());

export default app;
