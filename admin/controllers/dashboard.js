import Career from "../../models/Career.js";
import Contact from "../../models/Contact.js";
import QuickLead from "../../models/QuickLead.js";
import Blog from "../../models/Blog.js";

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