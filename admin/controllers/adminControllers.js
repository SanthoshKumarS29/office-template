import { error } from 'console';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import '../../'

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_PATH = path.join(__dirname, '../../public/dynamicDatas/seo.json');


// Get Login 
export const getLogin = (req, res) => {
    res.render('login', {error: null})
};

// post handle login
export const postLogin = (req,res) => {
    const {username, password} = req.body;
    if ( username === "admin" && password === "1234"){
        req.session.isLoggedIn = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render("login", {error: "Invalid credentials"})
    }
};


// Get Dashboard
export const getDashboard = (req,res) => {
    let seoData = {};
    if (fs.existsSync(SEO_PATH)){
        seoData = JSON.parse(fs.readFileSync(SEO_PATH, "utf-8"));
    }
    res.render("dashboard", {seoData})
}

// Get Seo from Service
export const getSeoForm = (req,res) => {
    const { slug } = req.params;
    let seoData = {};
    if (fs.existsSync(SEO_PATH)){
        seoData = JSON.parse(fs.readFileSync(SEO_PATH, "utf-8"));
    }
    res.render("seoForm", {slug, seo: seoData[slug] || {} });
};

// Post Save seo data
export const postSeoForm = (req, res) => {
    const { slug } = req.params;
    const { metaTitle, metaDescription, metaKeywords} = req.body;

    let seoData = {};
    if (fs.existsSync(SEO_PATH)){
        seoData = JSON.parse(fs.readFileSync(SEO_PATH, "utf-8"));
    }
    
    seoData[slug] = {metaTitle,metaDescription,metaKeywords};

    fs.writeFileSync(SEO_PATH, JSON.stringify(seoData, null, 2))

    res.redirect('/admin/dashboard');
}

