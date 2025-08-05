import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";

// get file 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export const getHome = (req, res) => {
    res.render('pages/home')
}

export const tredingHubPage = (req, res) => {
    res.render("pages/trendings/hubPage.ejs")
}

export const tredingRelatedPages = (req,res) => {
    const {slug} = req.params;
    const viewPath = path.join(__dirname, `../views/pages/trendings/${slug}.ejs`);

    if(fs.existsSync(viewPath)){
        res.render(`/pages/trendings/${slug}`)
    } else {
        res.status(404).render('/pages/static/404');
    }
}

