import express from 'express';
import morgan  from 'morgan';
import cookieParser from 'cookie-parser' /*Convertir cookie en objeto json */
import cors from 'cors'

import authRoutes from '../src/routes/auth.routes.js';
import productsRoutes from '../src/routes/products.routes.js'


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', /*Comunicacion con el frontend */
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", productsRoutes);

export default app;