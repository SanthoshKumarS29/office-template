const container = document.querySelector(".ip-devProc-container");

if (container) {

    const slides = container.querySelectorAll(".ip-devproc-slide");

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach((slide) => {
            slide.style.display = "none";
        });

        slides[index].style.display = "block";

        const currentNumber = slides[index].querySelector(
            ".ip-devproc-current"
        );

        currentNumber.textContent = String(index + 1).padStart(2, "0");
    }


    // Right button
    container.addEventListener("click", (e) => {

        const rightBtn = e.target.closest(".ip-devproc-right");

        if (rightBtn) {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            showSlide(currentSlide);
        }
    });


    // Left button
    container.addEventListener("click", (e) => {

        const leftBtn = e.target.closest(".ip-devproc-left");

        if (leftBtn) {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            showSlide(currentSlide);
        }
    });


    // Initial slide
    showSlide(currentSlide);
}