$('.slider').slick({
    fade:true,
    autoplay: true,

    autoplaySpeed: 2000, //切り替わる待ち時間
    speed:1000, //スライドの動きのスピード

    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
});

//For Mobile
$('.slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
    $('.slider').slick('slickPlay');
});


$(document).ready(function(){
    $('#delay').hide().delay(10000).fadeIn('slow');
})