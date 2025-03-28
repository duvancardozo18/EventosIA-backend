import pool from '../config/bd.js';

// Obtener todos los eventos
export const getAllEvents = async () => {
  const result = await pool.query(`
    SELECT e.id_event, e.name, es.state_name AS state, 
    t.event_type, l.name AS location, e.user_id_created_by, e.image_url
    FROM events e
    JOIN event_state es ON e.event_state_id = es.id_event_state
    LEFT JOIN type_of_event t ON e.type_of_event_id = t.id_type_of_event
    LEFT JOIN location l ON e.location_id = l.id_location
  `);
  return result.rows;
};

// Obtener un evento por ID
export const getEventById = async (id_event) => {
  const result = await pool.query(`
    SELECT e.*, es.state_name AS state, t.event_type, l.name AS location, e.user_id_created_by, e.image_url
    FROM events e
    JOIN event_state es ON e.event_state_id = es.id_event_state
    LEFT JOIN type_of_event t ON e.type_of_event_id = t.id_type_of_event
    LEFT JOIN location l ON e.location_id = l.id_location
    WHERE e.id_event = $1
  `, [id_event]);
  return result.rows[0];
};

// Crear un nuevo evento
export const createEvent = async (name, event_state_id, user_id_created_by, image_url) => {
  const result = await pool.query(`
    INSERT INTO events (name, event_state_id, user_id_created_by, image_url)
    VALUES ($1, $2, $3, $4) RETURNING *
  `, [name, event_state_id, user_id_created_by, image_url]);
  return result.rows[0];
};

// Actualizar un evento (No se debe modificar user_id_created_by)
export const updateEvent = async (id_event, name, event_state_id, type_of_event_id, location_id, image_url) => {
  const result = await pool.query(`
    UPDATE events 
    SET name = $1, event_state_id = $2, type_of_event_id = $3, location_id = $4, image_url = $5
    WHERE id_event = $6 RETURNING *
  `, [name, event_state_id, type_of_event_id, location_id, image_url, id_event]);

  return result.rows[0];
};

// Eliminar un evento
export const deleteEvent = async (id_event) => {
  const result = await pool.query(`DELETE FROM events WHERE id_event = $1 RETURNING *`, [id_event]);
  return result.rows[0];
};
