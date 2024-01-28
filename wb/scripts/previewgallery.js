document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/wb/home/images/1.webp",
        "/wb/home/images/2.webp",
        "/wb/home/images/3.webp",
        "/wb/home/images/4.webp",
        "/wb/home/images/5.webp",
    ];

    let currentIndex = 0;
    const imageElement = document.getElementById("galleryImage");

    const imageObjects = images.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
    });

    function changeImage() {
        fadeOut();
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex];
            fadeIn();
        }, 500);
    }

    function fadeOut() {
        imageElement.style.opacity = "0";
    }

    function fadeIn() {
        setTimeout(() => {
            imageElement.style.opacity = "1";
        }, 50);
    }

    changeImage();
    const intervalId = setInterval(changeImage, 3500);

    window.addEventListener("unload", function () {
        clearInterval(intervalId);
    });
});