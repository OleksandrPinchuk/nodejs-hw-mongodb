import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import * as movieServices from "./services/movies.js";

console.log(process.env.PORT);

export const startServer = () => {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    // app.use(logger);

    app.get("/movies", async (request, response) => {
        const data = await movieServices.getMovies();

        response.json({
            status: 200,
            message: "Start project",
            data,
        });
    });

    app.get("/movies/:id", async (request, response) => {
        const { id } = request.params;
        const data = await movieServices.getMovieById(id);
        
        if (!data) {
            return response.status(404).json({
                status: 404,
                message: `Movie with id=${id} not found`,
            });
    }

        response.json({
            status: 200,
            message: "Movie successfully find",
            data,
        });
    });

    app.use((request, response) => {
        response.status(404).json({
            message: `${request.url} not`
        });
    });

    app.use((error, request, response, next) => {
        response.status(500).json({
            message: error.message,
        });
    });
    
    const port = Number(env("PORT", 3001));

    app.listen(port, () => console.log(`Server running on ${port} port`));
};