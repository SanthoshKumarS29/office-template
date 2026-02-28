const container = document.querySelector(".quick-lead-container");
const form = document.querySelector(".quick-lead-form")
const btn = document.getElementById("qlBtn");
const steps = document.querySelectorAll(".ql-step");
const phoneInput = document.getElementById('quickPhonecontact');
const purposeInput = document.getElementById('quickPurpose');
const successMsg = document.getElementById("qlSuccess");

let currentStep = 0;

function resetQuickLeadForm() {
    currentStep = 0;

    // Reset steps
    steps.forEach(step => step.classList.remove("active"));
    steps[0].classList.add("active");

    // Reset button
    btn.style.display = "block";
    btn.textContent = "Next";
    btn.classList.remove("btn-error");
    btn.type = "button";

    // Clear inputs
    phoneInput.value = "";
    purposeInput.value = "";

}

// expand container when clicked
container.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bubbling to document
    container.classList.add("expanded");
});

// Detect outside click
document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
        container.classList.remove("expanded");
    }
});

// handle form submit
form.addEventListener("submit", function (e) {

    if (currentStep === 0) {
        e.preventDefault();
        if (phoneInput.value.trim() === "") {
            btn.classList.add("btn-error");
            return;
        }
        btn.classList.remove("btn-error");
        currentStep = 1;
        steps[0].classList.remove("active");
        steps[1].classList.add("active");
        btn.textContent = "Send"

    } else if (currentStep === 1) {
        if (purposeInput.value.trim() === "") {
            e.preventDefault();
            purposeInput.focus();
            return;
        }

        // hide all feilds
        steps.forEach(step => step.classList.remove('active'));

        // show success
        successMsg.classList.add("active")

        setTimeout(() => {
            successMsg.classList.remove("active");
            resetQuickLeadForm()
        }, 4000); // 4000ms = 4 seconds

        btn.style.display = "none"
    }

    if (currentStep === 0) {
        btn.type = "button";
    }
    else {
        btn.type = "submit";
    }
})

