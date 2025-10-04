import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Seo from '../models/Seo.js';
// import '../../'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_PATH = path.join(__dirname, '../../public/dynamicDatas/seo.json');

// uitiliy
function readSeoData() {
    if (fs.existsSync(SEO_PATH)) {
        return JSON.parse(fs.readFileSync(SEO_PATH, 'utf-8'))
    }
    return {}
}

function writeSeoData(data) {
    fs.writeFileSync(SEO_PATH, JSON.stringify(data, null, 2))
}


// Get Login 
export const getLogin = (req, res) => {
    res.render('login', { error: null })
};

// post handle login
export const postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        req.session.isLoggedIn = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render("login", { error: "Invalid credentials" })
    }
};


export const dashboard = async (req, res) => {
    
    try {
        const seoList = await Seo.find().lean();
        res.render('dashboard', { seoList })    // <- pass it to the EJS view
    } catch (err) {
        res.status(500).send("Error loading dashboard: " + err.message);
    }
}

// Show dashboard with seo list
export const getSeoForm = async (req, res) => {

    try {
        const seoList = await Seo.find().lean();
        res.render('seoForm', { seoList })    // <- pass it to the EJS view
    } catch (err) {
        res.status(500).send("Error loading dashboard: " + err.message);
    }
}

// create a seoForm entry
export const createSeoData = async (req, res) => {
    try {
        const { slug, metaTitle, metaDescription, metaKeyword } = req.body;
        await Seo.create({ slug, metaTitle, metaDescription, metaKeyword });
        res.render('success', { message: "SEO data saved successfully!" });
    } catch (err) {
        res.status(400).send("Error creating SEO: " + err.message);
    }
}

// Show edit form
export const editSeoForm = async (req, res) => {
    const seo = await Seo.findById(req.params.id).lean();
    res.render('editSeoForm', { seo })
}

// Update seoForm entry
export const updateSeoForm = async (req, res) => {
    try {
        const { slug, metaTitle, metaDescription, metaKeyword } = req.body;
        await Seo.findByIdAndUpdate(req.params.id, { slug, metaTitle, metaDescription, metaKeyword })
        res.render('success', { message: "SEO data update successfully!" });
    } catch (err) {
        res.status(400).send("Error updating SEO: " + err.message);
    }
}

// Delete SeoForm entry
export const deleteSeoForm = async (req, res) => {
    await Seo.findByIdAndDelete(req.params.id);
    res.render('success', { message: "SEO data Deleted successfully!" });
}