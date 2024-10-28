import express from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env.js";
import * as contactServices from "./services/contacts.js";

console.log(process.env.PORT);

export const setupServer = () => {
    const app = express();

    app.use(cors());
    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(logger);

    app.get("/contacts", async (req, res) => {
        const data = await contactServices.getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        })
    });


    // app.get("/movies/:id", async (request, response) => {
    //     const { id } = request.params;
    //     const data = await movieServices.getMovieById(id);
        
    //     if (!data) {
    //         return response.status(404).json({
    //             status: 404,
    //             message: `Movie with id=${id} not found`,
    //         });
    // }

    //     response.json({
    //         status: 200,
    //         message: "Movie successfully find",
    //         data,
    //     });
    // });

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