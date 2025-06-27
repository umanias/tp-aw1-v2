import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import apiRouter from './routes/api.mjs';

dotenv.config();
const app = express();
const PUERTO = process.env.PUERTO || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../html')));

app.use('/resources', express.static(path.join(__dirname, '../resources')));

app.listen(PUERTO, () => {
    console.log(`Server is running on http://localhost:${PUERTO}`);
});


