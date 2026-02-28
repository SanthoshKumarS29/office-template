import express from "express";
import { createSeoData, deleteSeoForm, editSeoForm, getLogin, metaForm, metadetail, postLogin, updateSeoForm } from "../controllers/metaFormControllers.js";
import { dashboard } from "../controllers/dashboard.js"
import { getAllCareer, getAllContacts, getAllQuickLead } from "../controllers/contactControllers.js";
import { isAuthenticated } from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.get("/login", getLogin);
adminRouter.post("/login", postLogin);
adminRouter.get("/dashboard",isAuthenticated, dashboard);

adminRouter.get("/contactSub", getAllContacts);
adminRouter.get("/careerSub", getAllCareer);
adminRouter.get("/quickLeadSub", getAllQuickLead);

adminRouter.get('/metaform', metaForm);
adminRouter.get('/metadetail', metadetail);

adminRouter.post('/metaForm', createSeoData);
adminRouter.get('/metaForm/:id/edit', editSeoForm);
adminRouter.post('/metaForm/:id/update', updateSeoForm);
adminRouter.get('/metaForm/:id/delete', deleteSeoForm)

export default adminRouter;