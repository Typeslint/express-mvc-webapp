import { Router } from "express";
import { restrict } from "../middlewares/middleware";
import { homeView, loginView, orderView, payView, profileView, registerView } from "../controllers/baseController";

const app = Router();

app.get("/", homeView);
app.get("/login", loginView);
app.get("/register", registerView);
app.get("/profile", restrict, profileView);
app.get("/pay", restrict, payView);
app.get("/order", restrict, orderView);

export default app;
