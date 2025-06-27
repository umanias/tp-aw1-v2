import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let productos = [];

const filePath = path.resolve(__dirname, '../../../client/resources/datos/tienda.json');

async function cargarProductos() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    productos = JSON.parse(data);
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}

await cargarProductos();

router.get('/', (req, res) => {
  res.json(productos);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (producto) res.json(producto);
  else res.status(404).json({ error: "Producto no encontrado" });
});

export default router;
