import express from "express";
import { createSeoData, dashboard, deleteSeoForm, editSeoForm, getDatas, getLogin, postLogin, updateSeoForm } from "../controllers/metaFormControllers.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllCareer, getAllContacts } from "../controllers/contactControllers.js";

const adminRouter = express.Router();

adminRouter.get("/login", getLogin);
adminRouter.post("/login", postLogin);

adminRouter.get("/contactSub", getAllContacts);
adminRouter.get("/careerSub", getAllCareer);

adminRouter.get('/dashboard', isAuthenticated, dashboard);
adminRouter.get('/detailPage', getDatas);

adminRouter.post('/metaForm', createSeoData);
adminRouter.get('/metaForm/:id/edit', editSeoForm);
adminRouter.post('/metaForm/:id/update', updateSeoForm);
adminRouter.get('/metaForm/:id/delete', deleteSeoForm)

export default adminRouter;