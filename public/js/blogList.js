const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.latest-blog-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const visibleCards = 2;
const totalCards = cards.length;

let cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 0;

function updateCarousel() {
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

window.addEventListener("resize", () => {
    if (cards[0]) {
        cardWidth = cards[0].offsetWidth + 20;
    }
    updateCarousel();
});

updateCarousel()
