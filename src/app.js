import express from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
const app = express();

app.use(morgan('dev')); //muestra las peticiones relaizadas por consola
app.use(express.json()); // Convertir los req.body en formato json

app.use('/api', authRoutes);

export default app