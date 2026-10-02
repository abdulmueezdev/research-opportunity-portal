import { pool } from '../config/db.js';

export const ALLOWED_COLUMNS = [
  'title',
  'description',
  'area',
  'faculty_name',
  'department',
  'required_skills',
  'available_positions',
  'deadline',
  'status',
];

/**
 * Inserts a new opportunity record and returns the created row.
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function create(data) {
  const status = data.status || 'Open';
  const sql = `
    INSERT INTO opportunities (
      title, description, area, faculty_name, department,
      required_skills, available_positions, deadline, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.title,
    data.description,
    data.area,
    data.faculty_name,
    data.department,
    data.required_skills,
    data.available_positions,
    data.deadline,
    status,
  ];

  const [result] = await pool.execute(sql, params);
  return getById(result.insertId);
}

/**
 * Retrieves all opportunities, newest first.
 * @returns {Promise<Array<Object>>}
 */
export async function getAll() {
  const sql = 'SELECT * FROM opportunities ORDER BY created_at DESC';
  const [rows] = await pool.execute(sql);
  return rows;
}

/**
 * Retrieves a single opportunity by its ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
export async function getById(id) {
  const sql = 'SELECT * FROM opportunities WHERE id = ?';
  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

/**
 * Updates an existing opportunity with partial or complete fields.
 * Safely iterates over allowed columns whitelist.
 * @param {number|string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
export async function update(id, data) {
  const updates = [];
  const params = [];

  for (const column of ALLOWED_COLUMNS) {
    if (Object.prototype.hasOwnProperty.call(data, column) && data[column] !== undefined) {
      updates.push(`${column} = ?`);
      params.push(data[column]);
    }
  }

  if (updates.length === 0) {
    return null;
  }

  const sql = `UPDATE opportunities SET ${updates.join(', ')} WHERE id = ?`;
  params.push(id);

  const [result] = await pool.execute(sql, params);
  if (result.affectedRows === 0) {
    return null;
  }

  return getById(id);
}

/**
 * Deletes an opportunity by ID.
 * @param {number|string} id
 * @returns {Promise<boolean>} True if a row was deleted, false otherwise
 */
export async function remove(id) {
  const sql = 'DELETE FROM opportunities WHERE id = ?';
  const [result] = await pool.execute(sql, [id]);
  return result.affectedRows > 0;
}

export const opportunityRepository = {
  create,
  getAll,
  getById,
  update,
  remove,
};

export default opportunityRepository;
