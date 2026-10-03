import { Router } from 'express';
import { opportunityController } from '../controllers/opportunity.controller.js';
import { validate } from '../middleware/validate.js';
import { createSchema, updateSchema } from '../schemas/opportunity.schema.js';

export const opportunityRoutes = Router();

opportunityRoutes.post('/', validate(createSchema), opportunityController.create);
opportunityRoutes.get('/', opportunityController.getAll);
opportunityRoutes.get('/:id', opportunityController.getById);
opportunityRoutes.put('/:id', validate(updateSchema), opportunityController.update);
opportunityRoutes.delete('/:id', opportunityController.remove);

export default opportunityRoutes;
