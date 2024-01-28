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

    function changeImage() {
        fadeOut(); // Start by fading out the current image
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            imageElement.src = images[currentIndex];
            fadeIn(); // After changing the image, fade it in
        }, 500); // Adjust this delay if needed
    }

    function fadeOut() {
        imageElement.style.opacity = "0";
    }

    function fadeIn() {
        setTimeout(() => {
            imageElement.style.opacity = "1";
        }, 50); // A small delay to ensure the opacity change takes effect
    }

    // Initial image change
    changeImage();

    // Change image at regular intervals
    const intervalId = setInterval(changeImage, 3500);

    // Clear interval on page unload
    window.addEventListener("unload", function () {
        clearInterval(intervalId);
    });
});