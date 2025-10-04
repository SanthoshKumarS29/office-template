import express from "express";
import {  createSeoData, dashboard, deleteSeoForm, editSeoForm, getLogin, postLogin, updateSeoForm} from "../controllers/metaFormControllers.js";
import { isAuthenticated } from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.get("/login", getLogin);
adminRouter.post("/login", postLogin);

adminRouter.get('/dashboard', dashboard);

adminRouter.post('/metaForm', createSeoData);
adminRouter.get('/metaForm/:id/edit', editSeoForm);
adminRouter.post('/metaForm/:id/update', updateSeoForm);
adminRouter.get('/metaForm/:id/delete', deleteSeoForm)

export default adminRouter;