import { careerRules, validate } from "./partials/feildCheck.js";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".career-form");

  forms.forEach(form => {
    const phoneInputField = form.querySelector(".iti-input");
    let iti;

    // Initialize intl-tel-input
    if (phoneInputField) {
      iti = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: callback => {
          fetch("/ip-data")
            .then(res => res.json())
            .then(data => {
              callback(data.country || "us");
            })
            .catch(() => callback("us"));
        },
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      });
    }

    form.querySelectorAll("input, textarea, select").forEach(field => {
      field.addEventListener("input", () => {
        const errorElement = document.getElementById(field.name + "Error");
        if (errorElement) errorElement.textContent = "";
      });
    });

    if (phoneInputField) {

      // Clear error when typing
      phoneInputField.addEventListener("input", () => {
        const errorElement = document.getElementById(phoneInputField.name + "Error");
        if (errorElement) errorElement.textContent = "";
      });

      // Clear error when changing country
      phoneInputField.addEventListener("countrychange", () => {
        const errorElement = document.getElementById(phoneInputField.name + "Error");
        if (errorElement) errorElement.textContent = "";
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // clear pervious errors
      document.querySelectorAll(".feildError").forEach(el => el.textContent = "");

      // Collect form data
      const formData = new FormData(form);

      if (iti) {
        const phoneNumber = iti.getNumber();
        const countryCode = iti.getSelectedCountryData().dialCode;
        formData.set("phoneNumber", phoneNumber);
        formData.set("countryCode", countryCode);
      }

      const updatedData = Object.fromEntries(formData.entries());
      const errors = validate(updatedData, careerRules);

            // errors check
      if (Object.keys(errors).length > 0) {
        for (let field in errors) {
          const el = document.getElementById(`${field}Error`);
          if (el) el.textContent = errors[field];
        }
        return;
      }

      // Send data to backend
      try {
        const res = await fetch("/career", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (result.success) {
          alert(result.message);
          form.reset();
          if (iti) iti.setNumber("");
        }
      } catch (err) {
        console.error("Form submission error:", err);
      }
    });
  });
});
