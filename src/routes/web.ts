import { Router } from "express";
import { NextFunction, Request, Response } from "../app";
import { restrict } from "../middlewares/middleware";

const app = Router();

app.use((req: Request, res: Response, next: NextFunction): void => {
    if (req.session) {
        req.session.touch();
    }
    next();
});

app.get("/profile", restrict);
app.get("/pay", restrict);
app.get("/order", restrict);

export default app;
