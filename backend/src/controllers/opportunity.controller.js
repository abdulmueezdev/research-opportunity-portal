import { opportunityRepository } from '../repositories/opportunity.repository.js';

/**
 * Creates a new opportunity.
 * Express 5 forwards rejected promises to error middleware natively (no try/catch).
 */
export async function create(req, res) {
  const record = await opportunityRepository.create(req.body);
  res.status(201).json({
    success: true,
    data: record,
    message: 'Opportunity created',
  });
}

/**
 * Retrieves all opportunities, newest first.
 */
export async function getAll(req, res) {
  const records = await opportunityRepository.getAll();
  res.status(200).json({
    success: true,
    data: records,
  });
}

export const opportunityController = {
  create,
  getAll,
};

export default opportunityController;
