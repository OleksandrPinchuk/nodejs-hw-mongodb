import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import contactsRouter from "./routers/contacts.js";

export const setupServer = () => {
    const app = express();

    // app.use(express.json());
    app.use(cors());

    app.use(pino({
        transport: {
            target: "pino-pretty"
        }
    }));

    app.get("/", (req, res) => {
        res.json({
            message: "Hello World!",
        });
    });

    app.use(contactsRouter);

    app.use('*', (req, res) => {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    app.use((error, req, res, next) => {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    });
    
    const PORT = Number(env("PORT", 3001));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};