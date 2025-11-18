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
          fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
        },
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      });
    }

    form.addEventListener("submit", async e => {
      e.preventDefault();

      // Collect form data
      const formType = form.dataset.formtype || "contact";
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      if (iti) {
        const phoneNumber = iti.getNumber();
        const countryCode = iti.getSelectedCountryData().dialCode;
        data.phoneNumber = phoneNumber;
        data.countryCode = countryCode;
      }

      data.formType = formType;

      // Frontend validation
      const errors = [];
      if (!data.name?.trim()) errors.push("Name is required.");
      if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.push("Valid email is required.");
      if (!data.phoneNumber) errors.push("Valid phone number is required.");

      const errorBox = form.querySelector(".form-error");
      if (errorBox) errorBox.innerHTML = "";

      if (errors.length > 0) {
        if (errorBox) errorBox.innerHTML = errors.join("<br>");
        return;
      }

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
        } else {
          if (errorBox) errorBox.innerHTML = result.message;
        }
      } catch (err) {
        console.error("Form submission error:", err);
        if (errorBox) errorBox.innerHTML = "Something went wrong. Please try again.";
      }
    });
  });
});
