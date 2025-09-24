import express from "express";
import { getDashboard, getLogin, getSeoForm, postLogin, postSeoForm } from "../controllers/adminControllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.get("/login", getLogin);
adminRouter.post("/login", postLogin);

adminRouter.get("/dashboard", isAuthenticated, getDashboard);

adminRouter.get("/seo/:slug", isAuthenticated, getSeoForm);
adminRouter.post("/seo/:slug", isAuthenticated, postSeoForm);

export default adminRouter;