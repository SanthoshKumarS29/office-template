import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";

// get file 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


export const getHome = (req, res) => {
    res.render('pages/home',{
        currentSection:"home",
    })
}

export const tredingHubPage = (req, res) => {
    res.render("pages/trendings/hubPage.ejs",{
        currentSection:"trendings",
    })
}

export const serviceHubPage = (req, res) => {
    const seoData = JSON.parse(fs.readFileSync(SEO_Path, "utf-8"))
    const seo = seoData[slug] || {}

    res.render("pages/services/hubPage.ejs",{
        currentSection:"services",
        page: pageData,
        seo
    })
}

export const serviceRelatedPages = (req,res) => {
    const {slug} = req.params; 
    const jsonPath = path.join(__dirname, `../public/dynamicDatas/service/${slug}.json`);
    
    if(fs.existsSync(jsonPath)){
        const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        res.render(`pages/services/${slug}.ejs`,{
            currentSection:"services",
            page: pageData
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const productHubPage = (req, res) => {
    res.render("pages/products/hubPage.ejs",{
        currentSection:"products",
    })
}

export const productRelatedPages = (req,res) => {
    const {slug} = req.params; 
    const viewPath = path.join(__dirname, `../views/pages/products/${slug}.ejs`);
    
    if(fs.existsSync(viewPath)){
        res.render(`pages/products/${slug}.ejs`,{
            currentSection:"products",
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const blogHubPage = (req, res) => {
    res.render("pages/blog/hubPage.ejs",{
        currentSection:"blog",
    })
}

export const blogDetailPage = (req,res) => {
    const {slug} = req.params; 
    const viewPath = path.join(__dirname, `../views/pages/blog/${slug}.ejs`);
    
    if(fs.existsSync(viewPath)){
        res.render(`pages/blog/${slug}.ejs`,{
            currentSection:"blog",
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const companyHubPage = (req, res) => {
    res.render("pages/company/about.ejs",{
        currentSection:"company",
    })
}

export const companyRelatedPages = (req,res) => {
    const {slug} = req.params; 
    const viewPath = path.join(__dirname, `../views/pages/company/${slug}.ejs`);
    
    if(fs.existsSync(viewPath)){
        res.render(`pages/company/${slug}.ejs`,{
            currentSection:"company",
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}
