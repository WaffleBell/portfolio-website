document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/wb/home/images/1.webp",
        "/wb/home/images/2.webp",
        "/wb/home/images/3.webp",
        "/wb/home/images/4.webp",
        "/wb/home/images/5.webp",
    ];

    const intervalId = setInterval(changeImage, 3500);
    window.addEventListener("unload", function () {
        clearInterval(intervalId);
    });

    let currentIndex = 0;
    const imageElement = document.getElementById("galleryImage");

    function changeImage() {
        fadeOut();
        setTimeout(() => {
            fadeIn();
            currentIndex = (currentIndex + 1) % images.length;
        }, 500);
    }
    
    function fadeOut() {
        imageElement.style.opacity = "0";
        imageElement.addEventListener("transitionend", function () {
            imageElement.src = images[currentIndex];
            imageElement.addEventListener("load", function () {
                fadeIn();
            }, { once: true });
        }, { once: true });
    }

    function fadeIn() {
        setTimeout(() => {
            imageElement.style.opacity = "1";
        }, 50);
    }

    changeImage();
    setInterval(changeImage, 3500);
});
