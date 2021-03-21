import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import * as apiController from '../controllers/apiController';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Skeleton - Node',
      version: '0.1.0',
      description: 'Documentation for each endpoint at API Skeleton - Node',
    },
  },
  servers: [
    {
      url: '127.0.0.1:8000',
      description: 'Local Development Server',
    },
  ],
  apis: ['./src/routes/*.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

const router = Router();
/**
 * @swagger
 * /:
 *   get:
 *     description: The app information currently used.
 *     produces: ['application/json']
 *     responses:
 *       200:
 *         description: apiVersion, apiName
*/
router.get('/', apiController.info);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

export default router;
