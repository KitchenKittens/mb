function flipImage(container) {
    var card = container.querySelector('.card');
    var front = container.querySelector('.front');
    var back = container.querySelector('.back');
    var text = container.querySelector('.text-on-back');

    if (card.style.transform === 'rotateY(180deg)') {
        card.style.transform = 'rotateY(0deg)';
        front.style.visibility = 'visible';
        front.style.opacity = '1';
        back.style.visibility = 'hidden';
        back.style.opacity = '0';
        text.style.opacity = '0';
    } else {
        card.style.transform = 'rotateY(180deg)';
        front.style.visibility = 'hidden';
        front.style.opacity = '0';
        back.style.visibility = 'visible';
        back.style.opacity = '1';
        text.style.opacity = '1';
    }
}

function flipAllImages(toFront) {
    // Get all flip containers
    var flipContainers = document.querySelectorAll('.flip-container');

    // Iterate through each flip container and toggle the state
    flipContainers.forEach(function(container) {
        var card = container.querySelector('.card');
        var front = container.querySelector('.front');
        var back = container.querySelector('.back');
        var text = container.querySelector('.text-on-back');

        if (toFront) {
            card.style.transform = 'rotateY(0deg)';
            front.style.visibility = 'visible';
            front.style.opacity = '1';
            back.style.visibility = 'hidden';
            back.style.opacity = '0';
            text.style.opacity = '0';
        } else {
            card.style.transform = 'rotateY(180deg)';
            front.style.visibility = 'hidden';
            front.style.opacity = '0';
            back.style.visibility = 'visible';
            back.style.opacity = '1';
            text.style.opacity = '1';
        }
    });
}

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }