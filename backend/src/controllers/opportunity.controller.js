import { opportunityRepository, ALLOWED_COLUMNS } from '../repositories/opportunity.repository.js';

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

/**
 * Retrieves a single opportunity by ID.
 */
export async function getById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid ID format',
      },
    });
  }

  const record = await opportunityRepository.getById(id);
  if (!record) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Opportunity not found',
      },
    });
  }

  res.status(200).json({
    success: true,
    data: record,
  });
}

/**
 * Updates an opportunity by ID (partial update).
 */
export async function update(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid ID format',
      },
    });
  }

  const allowedUpdates = {};
  for (const column of ALLOWED_COLUMNS) {
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, column) && req.body[column] !== undefined) {
      allowedUpdates[column] = req.body[column];
    }
  }

  if (Object.keys(allowedUpdates).length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'No valid fields provided to update',
      },
    });
  }

  const record = await opportunityRepository.update(id, allowedUpdates);
  if (!record) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Opportunity not found',
      },
    });
  }

  res.status(200).json({
    success: true,
    data: record,
  });
}

export const opportunityController = {
  create,
  getAll,
  getById,
  update,
};

export default opportunityController;
