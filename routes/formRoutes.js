import express from 'express';
import { formSubmit } from '../controllers/contactController.js'
import { uploadResume } from '../utils/fileMulter.js';
import { submitCareer } from '../controllers/careerController.js';


const formRouter = express.Router()

formRouter.post('/contact-us', formSubmit);
formRouter.post("/career", uploadResume.single("resume"), submitCareer)

export default formRouter