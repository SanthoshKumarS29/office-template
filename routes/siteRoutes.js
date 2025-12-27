import express from 'express'
import { companyHubPage, companyRelatedPages, contact, getHome, productHubPage, productRelatedPages, serviceHubPage, serviceRelatedPages, tredingHubPage } from '../controllers/siteController.js'
import { blogHubPage,blogDetailPage } from '../controllers/blogController.js';


const router = express.Router()

router.get('/', getHome);
router.get('/trendings', tredingHubPage);
router.get('/products', productHubPage);
router.get('/products/:slug', productRelatedPages);
router.get('/services', serviceHubPage);
router.get('/services/:slug', serviceRelatedPages);
router.get('/blogs', blogHubPage);
router.get('/blogs/:slug', blogDetailPage);
router.get('/company', companyHubPage);
router.get('/company/:slug', companyRelatedPages);
router.get('/contact-us', contact);

export default router