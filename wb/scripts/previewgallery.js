document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "/wb/home/images/1.JPG",
        "/wb/home/images/2.JPG",
        "/wb/home/images/3.JPG",
        "/wb/home/images/4.JPG",
        "/wb/home/images/5.JPG",
    ];

    let currentIndex = 0;
    const imageElement = document.getElementById("galleryImage");

    function changeImage() {
        fadeOut();
        setTimeout(() => {
            fadeIn();
            currentIndex = (currentIndex + 1) % images.length;
        }, 1000);
    }

    function fadeOut() {
        imageElement.style.opacity = "0";
        imageElement.addEventListener("transitionend", function () {
            imageElement.src = images[currentIndex];
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
