export const validate = (data, rules) => {
    const errors = {};

    const formatFieldName = (field) =>
        field.charAt(0).toUpperCase() + field.slice(1);


    for (let field in rules) {
        const validation = rules[field];

        // Check resume file
        if (field === "resume") {
            const file = data.resume;

            if (validation.required && (!file || file.size === 0)) {
                errors.resume = "Resume is required";
                continue;
            }

            // file type check
            if (validation.fileTypes) {
                const ext = file.name.split(".").pop().toLowerCase();
                if (!validation.fileTypes.includes(ext)) {
                    errors.resume = `Invalid file type (${ext}). Allowed: ${validation.fileTypes.join(", ")}`;
                }
            }

            // file size check
            if (validation.maxSize && file.size > validation.maxSize) {
                errors.resume = `File too large. Max size: ${validation.maxSize / (1024 * 1024)}MB`;
            }

            continue;
        }

        // Normal text validation
        let value = data[field]?.toString().trim();

        if (validation.required && (!value || value === "")) {
            errors[field] = `${formatFieldName(field)} is required`;
            continue;
        }

        // Prevent HTML/script injection
        if (/[<>]/.test(value)) {
            errors[field] = "Invalid characters detected";
            continue;
        }

        if (validation.min && value.length < validation.min) {
            errors[field] = `${field} must be at least ${validation.min} characters`;
        }

        if (validation.max && value.length > validation.max) {
            errors[field] = `${field} cannot exceed ${validation.max} characters`;
        }

        if (validation.numeric && isNaN(value)) {
            errors[field] = `${field} must be a number`;
        }

        if (validation.regex && !validation.regex.test(value)) {
            errors[field] = `${field} format is invalid`;
        }

        if (validation.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors[field] = "Invalid email format";
            }
        }
    }

    return errors;
};


export const contactRules = {
    name: {
        required: true,
        min: 2,
        max: 50,
        regex: /^[A-Za-z\s]+$/  // only letters & spaces
    },
    email: {
        required: true,
        email: true,
        max: 100
    },

    phone: {
        required: true,
        numeric: true,
        min: 8,
        max: 15
    },
    message: {
        required: true,
        min: 2,
        max: 50,
        regex: /^[A-Za-z\s]+$/  // only letters & spaces
    },
}

export const careerRules = {
    name: {
        required: true,
        min: 2,
        max: 50,
        regex: /^[A-Za-z\s]+$/  // only letters & spaces
    },

    email: {
        required: true,
        email: true,
        max: 100
    },

    jobRole: {
        required: true,
        max: 100
    },

    experience: {
        required: true,
        regex: /^[0-9]+(-[0-9]+)?\s?(years|year)?$/i
    },

    phone: {
        required: true,
        numeric: true,
        min: 8,
        max: 15
    },

    countryCode: {
        required: true,
        numeric: true,
        max: 4
    },

    resume: {
        required: true,
        fileTypes: ["pdf", "doc", "docx"],
        maxSize: 2 * 1024 * 1024     // 2MB
    }
}
