let currentPage = 0;
const totalPages = 25;

// Array of content for each page
const pagesContent = [
    { img: './IMG25/photo1.JPG', message: 'From the moment we met, it felt like fate was bringing us together.' },
    { img: './IMG25/photo2.JPG', message: 'Every day with you feels like writing a new page in our beautiful story.' },
    { img: './IMG25/photo3.JPG', message: 'Your smile lights up my world in ways I never thought possible.' },
    { img: './IMG25/photo4.JPG', message: 'No matter the day, your love always brings warmth to my heart.' },
    { img: './IMG25/photo5.JPG', message: 'I cherish the simple moments—like holding your hand or hugging you tightly.' },

    { img: './IMG25/photo6.JPG', message: 'In your embrace, I’ve found both my comfort and my love.' },
    { img: './IMG25/photo7.JPG', message: 'Thinking of you brings an unexplainable joy that fills my heart every time.' },
    { img: './IMG25/photo8.JPG', message: 'You inspire me to be the best version of myself, every single day.' },
    { img: './IMG25/photo9.JPG', message: 'Your laughter is one of my favorite sounds, and I never tire of hearing it.' },
    { img: './IMG25/photo10.JPG', message: 'I feel so lucky to wake up each day knowing you’re by my side.' },

    { img: './IMG25/photo11.JPG', message: 'You truly are the light that brightens even my darkest days.' },
    { img: './IMG25/photo12.JPG', message: 'And when I look at you, I see all the love I could ever hope for.' },
    { img: './IMG25/photo13.JPG', message: 'No matter where life takes us, my heart will always belong to you.' },
    { img: './IMG25/photo14.JPG', message: 'You will forever be my favorite chapter in the book of my life.' },
    { img: './IMG25/photo15.JPG', message: 'So thank you for making every day feel like a new adventure.' },

    { img: './IMG25/photo16.JPG', message: 'You’re the wish I made that came true in the most beautiful way.' },
    { img: './IMG25/photo17.JPG', message: 'With you, I’ve found a love deeper than I ever imagined.' },
    { img: './IMG25/photo18.JPG', message: 'Being with you feels awesome, loved, cared.' },
    { img: './IMG25/photo19.JPG', message: 'I look forward to a lifetime of dreams shared together.' },
    { img: './IMG25/photo20.JPG', message: 'With this booklet, I celebrate the incredible gift that is you.' },

    { img: './IMG25/photo21.JPG', message: 'Happy 25th birthday to the one who makes my life complete.' },
    { img: './IMG25/photo22.JPG', message: 'I love you more with every moment we share together.' },
    { img: './IMG25/photo23.JPG', message: 'You are, and always will be, the love of my life.' },
    { img: './IMG25/photo24.JPG', message: 'Here’s to many more beautiful years together, my love.' },
    { img: './IMG25/photo25.JPG', message: 'Happy 25th Birthday, Mizuho' },
    // Add content for all 25 pages here
];

// Generate pages dynamically based on content
function createPages() {
    const book = document.getElementById('book');
    pagesContent.forEach((content, index) => {
        const page = document.createElement('div');
        page.className = 'page';
        page.id = `page-${index + 1}`;

        const img = document.createElement('img');
        img.src = content.img;
        img.className = 'page-img';

        const textContainer = document.createElement('div');
        textContainer.className = 'page-content';
        textContainer.textContent = content.message;

        page.appendChild(img);
        page.appendChild(textContainer);
        book.appendChild(page);

        // Add click event to the image to move to the next page
        img.addEventListener('click', nextPage);
    });
}

// Show or hide pages based on the current page index
function updateBook() {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.classList.toggle('active', index === currentPage);
    });

    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

function nextPage() {
    if (currentPage < totalPages) currentPage++;
    updateBook();
}

function prevPage() {
    if (currentPage > 0) currentPage--;
    updateBook();
}

function goToPage() {
    const pageInput = document.getElementById('page-input').value;
    const pageNum = parseInt(pageInput, 10);
    if (pageNum >= 0 && pageNum <= totalPages) {
        currentPage = pageNum;
        updateBook();
    } else {
        alert("Please enter a valid page number between 0 and 25.");
    }
}

// Swipe functionality for mobile devices
let touchStartX = 0;

document.getElementById('book').addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
});

document.getElementById('book').addEventListener('touchend', function(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;

    if (Math.abs(swipeDistance) > 50) { // Threshold for swipe detection
        if (swipeDistance > 0) {
            nextPage(); // Swipe left (next page)
        } else {
            prevPage(); // Swipe right (previous page)
        }
    }
});

// Initialize the book
createPages();
updateBook();

