import express from 'express'
import {blogDetailPage, blogHubPage, companyHubPage, companyRelatedPages, getHome, productHubPage, productRelatedPages, serviceHubPage, tredingHubPage, tredingRelatedPages} from '../controllers/siteController.js'


const router = express.Router()

router.get('/', getHome);
router.get('/trending', tredingHubPage);
router.get('/trending/:slug', tredingRelatedPages)
router.get('/product', productHubPage);
router.get('/product/:slug', productRelatedPages);
router.get('/service', serviceHubPage);
router.get('/service/:slug', serviceHubPage);
router.get('/blog', blogHubPage);
router.get('/blog/:slug', blogDetailPage);
router.get('/company', companyHubPage);
router.get('/company/:slug', companyRelatedPages);

export default router