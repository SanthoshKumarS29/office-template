import { validate, contactRules } from "/js/partials/feildCheck.js";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".contact-form");

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
      const formType = form.dataset.formtype;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (iti) {
        const phoneNumber = iti.getNumber();
        const countryCode = iti.getSelectedCountryData().dialCode;
        data.phoneNumber = phoneNumber;
        data.countryCode = countryCode;
      }

      const errors = validate(data, contactRules);

      // errors check
      if (Object.keys(errors).length > 0) {
        for (let field in errors) {
          const el = document.getElementById(`${field}Error`);
          if (el) el.textContent = errors[field];
        }
        return;
      }

      data.formType = formType;

      // Send data to backend
      try {
        const res = await fetch("/contact-us", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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
