const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.latest-blog-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

if (track && prevBtn && nextBtn) {
    let index = 0;
    const visibleCards = 2;
    const totalCards = cards.length;

    let cardWidth = cards[0] ? cards[0].offsetWidth + 20 : 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= totalCards - visibleCards;
    }

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (index < totalCards - visibleCards) {
            index++;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        if (cards[0]) {
            cardWidth = cards[0].offsetWidth + 20;
        }
        updateCarousel();
    });

    updateCarousel();
}

function attachBlogFilterHandlers() {
    const form = document.querySelector('#blogFilterForm');
    if (!form) return;

    const searchInput = form.querySelector('input[name="search"]');
    const categorySelect = form.querySelector('select[name="category"]');

    const submitFilter = async () => {
        const params = new URLSearchParams(new FormData(form));
        const url = `${window.location.pathname}?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load filtered blogs');
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const nextBlogListSection = doc.querySelector('#blog-list-section');
            const currentBlogListSection = document.querySelector('#blog-list-section');

            if (nextBlogListSection && currentBlogListSection) {
                currentBlogListSection.replaceWith(nextBlogListSection);
                attachBlogFilterHandlers();
                window.history.pushState({}, '', url);
            }
        } catch (error) {
            console.error('Blog filter error:', error);
            window.location.href = `${window.location.pathname}?${new URLSearchParams(new FormData(form)).toString()}`;
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitFilter();
    });

    if (searchInput) {
        let searchTimer;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                submitFilter();
            }, 400);
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            submitFilter();
        });
    }
}

attachBlogFilterHandlers();
