import express from 'express';
import { formSubmit } from '../controllers/contactController.js'


const formRouter = express.Router()

formRouter.post('/contact-us', formSubmit);

export default formRouter