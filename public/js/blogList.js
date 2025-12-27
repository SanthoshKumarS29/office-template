const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.latest-blog-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const visibleCards = 2;
const totalCards = cards.length;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= totalCards - visibleCards;
}

prevBtn.addEventListener("click", () => {
    if(index > 0){
        index--;
        updateCarousel();
    }
})

nextBtn.addEventListener("click", () => {
    if(index < totalCards - visibleCards){
        index++;
        updateCarousel();
    }
})

window.addEventListener("resize", updateCarousel);
updateCarousel()