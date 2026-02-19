import express from 'express';
import { formQuickLeadSubmit, formSubmit } from '../controllers/contactController.js'
import { uploadResume } from '../utils/fileMulter.js';
import { submitCareer } from '../controllers/careerController.js';
import { getContactNumberFeild } from '../controllers/helper.js';


const formRouter = express.Router()

formRouter.post('/contact-us', formSubmit);
formRouter.post('/career', uploadResume.single("resume"), submitCareer);
formRouter.post('/quick-lead', formQuickLeadSubmit)
formRouter.get('/ip-data', getContactNumberFeild);

export default formRouter