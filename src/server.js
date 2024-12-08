import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from "./routers/index.js";
import cookieParser from "cookie-parser";
import { UPLOAD_DIR } from "./constants/index.js";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";

const PORT = Number(env("PORT", 3001));

export const startServer = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());

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

    app.use(router);

    app.use("*", notFoundHandler);

    app.use(errorHandler);
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
};