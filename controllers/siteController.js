import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import Seo from "../models/Seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getHome = async (req, res) => {
    const { slug } = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ pageName: "home" }).lean()
    const seo = seoData || {}

    res.render('pages/home', {
        currentSection: "home",
        seo,
    })
}

export const tredingHubPage = async (req, res) => {
    const { slug } = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}
    res.render("pages/trendings/hubPage.ejs", {
        currentSection: "trendings",
        seo,
    })
}

export const serviceHubPage = async (req, res) => {
    const { slug } = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/services/hubPage.ejs", {
        currentSection: "services",
        seo
    })
}

export const serviceRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const jsonPath = path.join(__dirname, `../public/dynamicDatas/service/${slug}.json`);

    if (fs.existsSync(jsonPath)) {
        const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        // fetch seo from DB
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/services/${slug}.ejs`, {
            currentSection: "services",
            page: pageData,
            seo
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const productHubPage = async (req, res) => {
    const { slug } = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/products/hubPage.ejs", {
        currentSection: "products",
        seo
    })
}

export const productRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const viewPath = path.join(__dirname, `../views/pages/products/${slug}.ejs`);

    if (fs.existsSync(viewPath)) {

        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/products/${slug}.ejs`, {
            currentSection: "products",
            seo
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}


export const companyHubPage = async (req, res) => {
    const { slug } = req.params;

    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/company/about.ejs", {
        currentSection: "company",
        seo
    })
}

export const companyRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const viewPath = path.join(__dirname, `../views/pages/company/${slug}.ejs`);

    if (fs.existsSync(viewPath)) {
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/company/${slug}.ejs`, {
            currentSection: "company",
            seo
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const contact = async (req, res) => {
    const { slug } = req.params;

    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/contact.ejs", {
        currentSection: "contact",
        seo
    })
}
