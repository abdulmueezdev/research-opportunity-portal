import { Router } from 'express';
import { opportunityController } from '../controllers/opportunity.controller.js';

export const opportunityRoutes = Router();

opportunityRoutes.post('/', opportunityController.create);
opportunityRoutes.get('/', opportunityController.getAll);
opportunityRoutes.get('/:id', opportunityController.getById);

export default opportunityRoutes;
