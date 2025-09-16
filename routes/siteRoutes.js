import express from 'express'
import {blogDetailPage, blogHubPage, companyHubPage, companyRelatedPages, getHome, productHubPage, productRelatedPages, serviceHubPage, serviceRelatedPages, tredingHubPage} from '../controllers/siteController.js'


const router = express.Router()

router.get('/', getHome);
router.get('/trendings', tredingHubPage);
router.get('/products', productHubPage);
router.get('/products/:slug', productRelatedPages);
router.get('/services', serviceHubPage);
router.get('/services/:slug', serviceRelatedPages);
router.get('/blog', blogHubPage);
router.get('/blog/:slug', blogDetailPage);
router.get('/company', companyHubPage);
router.get('/company/:slug', companyRelatedPages);

export default router