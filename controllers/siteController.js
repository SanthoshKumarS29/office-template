import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import Seo from "../models/Seo.js";
import Blog from "../models/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getHome = async (req, res) => {
    const { slug } = req.params;
    const data = { url: slug }
    const latestBlogs = await Blog.find({
        status: { $regex: "^published$", $options: "i" }
    })
        .select("title slug image category createdAt description")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    // fetch seo from DB
    const seoData = await Seo.findOne({ pageName: "home" }).lean()
    const seo = seoData || {}

    res.render('pages/home', {
        currentSection: "home",
        seo,
        latestBlogs,
        pageData: data
    })
}

export const tredingHubPage = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}
    res.render("pages/trendings/hubPage.ejs", {
        currentSection: "trendings",
        seo,
        pageData: data
    })
}

export const serviceHubPage = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/services/hubPage.ejs", {
        currentSection: "services",
        seo,
        pageData: data
    })
}

export const serviceRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const data = { url: slug }
    const jsonPath = path.join(__dirname, `../public/dynamicDatas/service/${slug}.json`);

    if (fs.existsSync(jsonPath)) {
        const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        // fetch seo from DB
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/services/${slug}.ejs`, {
            currentSection: "services",
            page: pageData,
            seo,
            pageData: data
        })
    } else {
        res.status(404).redirect("/not-found");
    }
}

export const productHubPage = async (req, res) => {
    const { slug } = req.params;
    const data = { url: slug }


    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/products/hubPage.ejs", {
        currentSection: "products",
        seo,
        pageData: data
    })

}

export const productRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const data = { url: slug }
    const jsonPath = path.join(__dirname, `../public/dynamicDatas/products/${slug}.json`);

    if (fs.existsSync(jsonPath)) {
        const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/products/${slug}.ejs`, {
            currentSection: "products",
            page: pageData,
            seo,
            pageData: data
        })
    } else {
        res.status(404).redirect("/not-found");
    }
}


export const companyHubPage = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/company/about.ejs", {
        currentSection: "company",
        seo,
        pageData: data
    })
}

export const companyRelatedPages = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }
    const viewPath = path.join(__dirname, `../views/pages/company/${slug}.ejs`);

    if (fs.existsSync(viewPath)) {
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/company/${slug}.ejs`, {
            currentSection: "company",
            seo,
            pageData: data
        })
    } else {
        res.status(404).redirect("/not-found");
    }
}

export const contact = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/contact.ejs", {
        currentSection: "contact",
        seo,
        pageData: data
    })
}

export const successPage = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render('pages/static/success.ejs', {
        currentSection: "success",
        seo,
        pageData: data
    })
}

export const notFoundPage = async (req, res) => {
    const { slug } = req.params;
    const data = {
        url: slug
    }

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render('pages/static/notFound.ejs', {
        currentSection: "notFound",
        seo,
        pageData: data
    })
}
