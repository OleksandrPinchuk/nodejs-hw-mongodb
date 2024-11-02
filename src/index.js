import { startServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

const boostrap = async () => {
    initMongoConnection();
    startServer();
};

boostrap();