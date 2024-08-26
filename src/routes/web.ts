import { Router } from "express";
import { restrict } from "../middlewares/middleware";
import { homeView, loginView, orderView, payView, profileView, registerView } from "../controllers/baseController";

const app = Router();

app.get("/", restrict, homeView);
app.get("/login", restrict, loginView);
app.get("/register", restrict, registerView);
app.get("/profile", restrict, profileView);
app.get("/pay", restrict, payView);
app.get("/order", restrict, orderView);

export default app;
