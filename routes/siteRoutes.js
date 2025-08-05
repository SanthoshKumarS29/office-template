import express from 'express'
import {getHome, tredingHubPage, tredingRelatedPages} from '../controllers/siteController.js'


const router = express.Router()

router.get('/', getHome);
router.get('/trending', tredingHubPage);
router.get('/trending/:slug', tredingRelatedPages)

export default router