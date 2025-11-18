import Contact from '../../models/Contact.js'

export const getAllContacts = async (req, res) => {
    try {
        const filter = {};
        const { type } = req.query; // e.g., ?type=newsletter

        if (type) filter.formType = type;

        const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
        res.render("dashboard", {
            partialView: "contactSubmission",
            activePage: "contacts",
            contacts,
            currentType: type || "all"
        })
    } catch (error) {
        res.status(500).send("Error loading contacts: " + err.message);
    }
}