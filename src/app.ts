import "./utils/listener";
import { Pool } from "pg";
import PGSession from "connect-pg-simple";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
dotenv.config();

const poolcfg: Pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const app = express();
const PORT = 3000;
const pgSession = PGSession(session);

const options = {
    origin: ["http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(session({
    store: new pgSession({
        pool: poolcfg,
        tableName: "session",
        pruneSessionInterval: 120000
    }),
    unset: "destroy",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1800000
    }
}));

import web from "./routes/web";
import api from "./routes/api";

app.use(cors(options));

app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(morgan("dev"));

app.use<void>("/register", express.static(path.join(__dirname, "../views/register")));
app.use<void>("/login", express.static(path.join(__dirname, "../views/login")));
app.use<void>("/", express.static(path.join(__dirname, "../views/home")));
app.use<void>("/profile", express.static(path.join(__dirname, "../views/profile")));
app.use<void>("/order", express.static(path.join(__dirname, "../views/order")));
app.use<void>("/pay", express.static(path.join(__dirname, "../views/pay")));

app.use("/", web);
app.use("/api", api);

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    try {
        res.status(500).json({ err: err.message });
        return;
    } catch (error) {
        next(error);
    }
});

app.use((req: Request, res: Response, next: NextFunction): void => {
    try {
        res.status(404).json({ err: `Cannot ${req.method} ${req.url}` });
        return;
    } catch (error) {
        next(error);
    }
});

app.listen(PORT, (): void => {
    return console.info("Connecting to PORT ", PORT);
});

export type { Request, Response, NextFunction };
