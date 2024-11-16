let currentPage = 0;
const totalPages = 25;

// Array of content for each page
const pagesContent = [
    { img: './IMG25/photo1.JPG', message: 'Happy memories on this special day.' },
    { img: './IMG25/photo2.JPG', message: 'You make my world brighter.' },
    { img: './IMG25/photo3.JPG', message: 'Our journey together has been amazing.' },
    { img: './IMG25/photo4.JPG', message: 'Here’s to more laughter and love.' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
    { img: './IMG25/photo5.JPG', message: 'Happy 25th Birthday, my love!' },
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
