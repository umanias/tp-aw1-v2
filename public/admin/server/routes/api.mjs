import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

router.get('/:tipo', async (req, res) => {
  const { tipo } = req.params;
  if (!['prendas', 'accesorios'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }
  try {
    const { rows } = await pool.query('SELECT * FROM productos WHERE tipo = $1 ORDER BY id', [tipo.slice(0, -1)]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/:tipo/:id', async (req, res) => {
  const { tipo, id } = req.params;
  if (!['prendas', 'accesorios'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }
  try {
    const { rows } = await pool.query('SELECT * FROM productos WHERE id = $1 AND tipo = $2', [id, tipo.slice(0, -1)]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

router.post('/:tipo', async (req, res) => {
  const { tipo } = req.params;
  const { nombre, precio, imagen } = req.body;
  if (!['prendas', 'accesorios'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }
  if (!nombre || !precio || !imagen) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO productos (nombre, precio, imagen, tipo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, precio, imagen, tipo.slice(0, -1)]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

router.put('/:tipo/:id', async (req, res) => {
  const { tipo, id } = req.params;
  const { nombre, precio, imagen } = req.body;
  if (!['prendas', 'accesorios'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE productos SET nombre = $1, precio = $2, imagen = $3 WHERE id = $4 AND tipo = $5 RETURNING *',
      [nombre, precio, imagen, id, tipo.slice(0, -1)]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:tipo/:id', async (req, res) => {
  const { tipo, id } = req.params;
  if (!['prendas', 'accesorios'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }
  try {
    const { rows } = await pool.query('DELETE FROM productos WHERE id = $1 AND tipo = $2 RETURNING *', [id, tipo.slice(0, -1)]);
    if (rows.length === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
