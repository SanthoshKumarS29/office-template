import career from '../models/Career.js';
import { careerRules, validate } from '../utils/feildCheck.js';


export const submitCareer = async (req, res) => {
    try {
        console.log("📩 Form data received:", req.body);
        const {name,email,jobRole, experience, phoneNumber, countryCode } = req.body
        let resumePath = '';
        if(req.file) resumePath = `/uploads/resumes/${req.file.filename}`;

        // Validation
        const errors = validate(req.body, careerRules)

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        await career.create({
            name,email,jobRole,experience,phoneNumber,countryCode, resume: resumePath
        })
        return res.json({
            success: true, message: "Form submitted successfully!"
        })
    } catch (error) {
        console.error("Career form error", error);
        res.status(500).json({error:"Internal server error"})
    }
}