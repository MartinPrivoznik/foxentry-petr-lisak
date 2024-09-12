export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Obchůdek pana Lišáka',
      version: '1.0.0',
      description: 'Dokumentace REST API pro správu produktů pana Lišáka',
    },
  },
  apis: ['./src/routes/*.ts'],
};
