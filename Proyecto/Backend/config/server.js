const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const morgan = require('morgan');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.corsOptions = {
            origin: [
                process.env.FRONTEND_URL
            ]
        };
        this.productsPath = "/api/products";
        this.usersPath = "/api/users";
        this.authPath="/api/auth";
        this.reviewsPath="/api/reviews";
        this.middlewares();
        this.routes();
        connectDB();
    }

    middlewares() {
        // CORS middleware
        this.app.use(cors(this.corsOptions));


        // Parse incoming JSON requests
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.productsPath, require("../routes/products"));
        this.app.use(this.usersPath, require("../routes/users"));
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.reviewsPath, require("../routes/reviews"));
        // Catch-all route for handling non-existing routes
        this.app.get("*", (req, res) => {
            res.status(404).json({
                msg: "RUTA NO ENCONTARDA",
                result: 12345
            });
        });

        this.app.post("*", (req, res) => {
            res.status(404).json({
                msg: "RUTA NO ENCONTARDA",
                result: 12345
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;
