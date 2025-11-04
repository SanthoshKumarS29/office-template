import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";
import Seo from "../admin/models/Seo.js";
import Blog from "../admin/models/Blog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getHome = async (req, res) => {
    const {slug} = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render('pages/home',{
        currentSection:"home",
        seo,
    })
}

export const tredingHubPage = async (req, res) => {
    const {slug} = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}
    res.render("pages/trendings/hubPage.ejs",{
        currentSection:"trendings",
        seo,
    })
}

export const serviceHubPage = async (req, res) => {
    const {slug} = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/services/hubPage.ejs",{
        currentSection:"services",
        seo
    })
}

export const serviceRelatedPages = async (req,res) => {
    const {slug} = req.params; 
    const jsonPath = path.join(__dirname, `../public/dynamicDatas/service/${slug}.json`);
    
    if(fs.existsSync(jsonPath)){
        const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

        // fetch seo from DB
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/services/${slug}.ejs`,{
            currentSection:"services",
            page: pageData,
            seo
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const productHubPage = async (req, res) => {
    const {slug} = req.params;

    // fetch seo from DB
    const seoData = await Seo.findOne({ slug }).lean()
    const seo = seoData || {}

    res.render("pages/products/hubPage.ejs",{
        currentSection:"products",
        seo
    })
}

export const productRelatedPages = async (req,res) => {
    const {slug} = req.params; 
    const viewPath = path.join(__dirname, `../views/pages/products/${slug}.ejs`);
    
    if(fs.existsSync(viewPath)){
        
        const seoData = await Seo.findOne({ slug }).lean()
        const seo = seoData || {}

        res.render(`pages/products/${slug}.ejs`,{
            currentSection:"products",
            seo
        })
    } else {
        res.status(404).render('pages/static/notFound.ejs');
    }
}

export const blogHubPage = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();

    res.render("pages/blog/hubPage.ejs", {
      currentSection: "blog",
      blogs, // plural
    });

    console.log("Blogs loaded:", blogs.length);
  } catch (error) {
    console.error("Error loading blogs:", error);
    res.status(500).send("Error loading blogs");
  }
};


export const blogDetailPage = async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug, status: "published" }).lean();
    if (!blog) return res.status(404).render("pages/static/notFound");
    
    res.render("pages/blog/blogDetail.ejs", {
      currentSection: "blog",
      blog,
    });
  } catch (err) {
    console.error("Error loading blog:", err);
    res.status(500).send("Server error");
  }
};


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
