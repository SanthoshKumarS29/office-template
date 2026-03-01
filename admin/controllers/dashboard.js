import Career from "../../models/Career.js";
import Contact from "../../models/Contact.js";
import QuickLead from "../../models/QuickLead.js";
import Blog from "../../models/Blog.js";

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
        const [contactCount, careerCount, quickLeadCount, blogCount] = await Promise.all([
            Contact.countDocuments(), Career.countDocuments(), QuickLead.countDocuments(), Blog.countDocuments()
        ])
        res.render('dashboard', {
            partialView: 'dashboardHome',
            activePage: 'dashboardHome',
            stats: {
                contactCount,
                careerCount,
                quickLeadCount,
                blogCount
            }
        })    // <- pass it to the EJS view
    } catch (err) {
        res.status(500).send("Error loading dashboard: " + err.message);
    }
}