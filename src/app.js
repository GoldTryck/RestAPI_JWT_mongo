import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
const app = express();

app.use(morgan('dev')); //muestra las peticiones relaizadas por consola
app.use(express.json()); // Convertir los req.body en formato json
app.use(cookieParser()); // Convertir las cookies en formato json

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

export default app