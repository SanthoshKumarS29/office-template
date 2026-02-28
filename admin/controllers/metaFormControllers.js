import Seo from '../../models/Seo.js';


// Get Login 
export const getLogin = (req, res) => {
    res.render('login', { error: null })
};

// post handle login
export const postLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        req.session.isLoggedIn = true;
        res.redirect('/admin/detailPage');
    } else {
        res.render("login", { error: "Invalid credentials" })
    }
};

export const metaForm = async (req, res) => {

    try {
        const seoList = await Seo.find().lean();
        res.render('dashboard', {
            partialView: 'seoForm',
            activePage: 'metaForm',
            seoList
        })    // <- pass it to the EJS view
    } catch (err) {
        res.status(500).send("Error loading dashboard: " + err.message);
    }
}

// Show dashboard with seo list
export const metadetail = async (req, res) => {
    const searchQuery = req.query.q || '';

    try {
        let filter = {};
        if (searchQuery) {
            filter.slug = { $regex: searchQuery, $options: 'i'}
        }

        const seoList = await Seo.find(filter).lean();
        res.render('dashboard', {
            partialView: 'pages/renderDetails',
            activePage: 'metaDetail',
            seoList,
            searchQuery
        })    // <- pass it to the EJS view
    } catch (err) {
        res.status(500).send("Error loading dashboard: " + err.message);
    }
}

// create a seoForm entry
export const createSeoData = async (req, res) => {
    try {
        const { slug, pageName, metaTitle, metaDescription, metaKeyword } = req.body;
        await Seo.create({ slug, pageName, metaTitle, metaDescription, metaKeyword });
        res.render('success', { message: "SEO data saved successfully!" });
    } catch (err) {
        res.status(400).send("Error creating SEO: " + err.message);
    }
}

// Show edit form
export const editSeoForm = async (req, res) => {
    const seo = await Seo.findById(req.params.id).lean();
    res.render('pages/editSeoForm', {
        activePage: 'editMetaForm',
        seo
    })
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