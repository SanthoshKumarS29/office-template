import Contact from "../models/Contact.js";
import { contactRules, validate } from "../utils/feildCheck.js";

export const formSubmit = async (req, res) => {
    try {

        console.log("📩 Form data received:", req.body);
        const { name, email, message, countryCode, phoneNumber, formType } = req.body;

        // validation
        const errors = validate(req.body, contactRules)

        if  (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const newContact = new Contact({
            name,
            email,
            countryCode,
            phoneNumber,
            message,
            formType,
        });

        await newContact.save();
        res.status(200).json({ success: true, message: "Form submitted successfully!" });


    } catch (error) {
        console.error('Error form ', error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}