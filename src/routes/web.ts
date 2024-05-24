import path from "node:path";
import express, { Router } from "express";
import { NextFunction, Request, Response } from "../app";

const app = Router();

app.use((req: Request, res: Response, next: NextFunction): void => {
    if (req.session) {
        req.session.touch();
    }
    next();
});

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.redirect("/home");
        return;
    } catch (error) {
        next(error);
    }
});

app.use<void>("/register", express.static(path.join(__dirname, "../../public/register")));

app.use<void>("/login", express.static(path.join(__dirname, "../../public/login")));

app.use<void>("/home", express.static(path.join(__dirname, "../../public/home")));

app.use<void>("/profile", express.static(path.join(__dirname, "../../public/profile")));

app.use<void>("/order", express.static(path.join(__dirname, "../../public/order")));

app.use<void>("/pay", express.static(path.join(__dirname, "../../public/pay")));

export default app;
