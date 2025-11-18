import Contact from "../models/Contact.js";
import validator from 'validator';

export const formSubmit = async (req, res) => {
    try {
        console.log("📩 Form data received:", req.body);
        const { name, email, message, countryCode, phoneNumber, formType } = req.body;

        // validation
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }
        if (!name || !email || !phoneNumber || !countryCode) {
            return res.status(400).json({ success: false, message: "All fields are required." });
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