import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../html')));

app.use('/resources', express.static(path.join(__dirname, '../resources')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
