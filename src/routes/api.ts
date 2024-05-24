import { Router } from "express";
import { login, logout, register } from "../controllers/authController";
import { deleteMembership, membership, profile, transaction, uploadPhoto } from "../controllers/userController";
import { order } from "../controllers/orderController";
import { checkSession, restrict } from "../middlewares/middleware";

const app = Router();

app.post("/register", register);
app.post("/login", checkSession, login);
app.get("/logout", logout);
app.post("/logout", logout);

app.get("/users/profile", restrict, profile);
app.post("/users/profile/photo", restrict, uploadPhoto);
app.get("/users/transaction", restrict, transaction);
app.post("/users/membership", restrict, membership);
app.delete("/users/membership", restrict, deleteMembership);

app.post("/order", restrict, order);

export default app;
