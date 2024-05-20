document.addEventListener("DOMContentLoaded", function() {
    let currentLocationImages = [];
    let currentIndex = 0;
    let isFirstLoad = true;
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery-image');
    const panelLeftGallery = document.querySelector('.panel-left-gallery');
    panelLeftGallery.appendChild(galleryImage);

    const locationContainers = document.querySelectorAll('.location');
    locationContainers.forEach(location => {
        location.addEventListener('click', () => {
            const locationName = location.getAttribute('data-location');
            document.getElementById('selected-gallery').innerText = locationName;
            loadImages(locationName);
        });
    });

    document.getElementById('toggle-list').addEventListener('click', () => {
        const galleryList = document.getElementById('gallery-list');
        const listIcon = document.getElementById('list-icon');
        galleryList.classList.toggle('hidden');
        listIcon.src = galleryList.classList.contains('hidden') ? '/wb/nav/burger.svg' : '/wb/nav/burger-close.svg';
    });

    async function loadImages(locationName) {
        const locationFolder = `/wb/gallery/${locationName}/`;
        try {
            const response = await fetch(locationFolder);
            const data = await response.text();
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const imageLinks = htmlDoc.querySelectorAll('a[href$=".jpeg"]');
            currentLocationImages = Array.from(imageLinks).map(link => link.href);
            currentIndex = 0;
            isFirstLoad ? showImage(currentLocationImages[currentIndex]) : galleryImage.src = currentLocationImages[currentIndex];
            isFirstLoad = false;
            preloadImages(currentLocationImages);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    }

    function preloadImages(imageSources) {
        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function showImage(imageSrc) {
        galleryImage.src = imageSrc;
        galleryImage.classList.add('fade-in');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        [prevBtn, nextBtn].forEach(btn => btn.style.display = currentLocationImages.length === 0 ? 'none' : 'block');
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    [prevBtn, nextBtn].forEach(btn => btn.style.display = 'none');
    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));

    function navigateGallery(direction) {
        currentIndex = (currentIndex + direction + currentLocationImages.length) % currentLocationImages.length;
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        [prevBtn, nextBtn].forEach(btn => btn.style.display = currentLocationImages.length === 0 ? 'none' : 'block');
        galleryImage.src = currentLocationImages[currentIndex];
    }

    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    sidebarButtons.forEach(button => {
        button.addEventListener('mouseover', () => document.body.style.cursor = 'pointer');
        button.addEventListener('mouseout', () => document.body.style.cursor = 'default');
        button.addEventListener('click', () => {
            const submenu = button.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
                button.querySelector('.arrow-icon').src = submenu.classList.contains('active') ? '/wb/gallery/symbols/right-arrow-alt.svg' : '/wb/gallery/symbols/right-arrow-point.svg';
            }
        });
    });

    let startX;
    let endX;
    const swipeThreshold = 100;

    panelLeftGallery.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    panelLeftGallery.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    panelLeftGallery.addEventListener('touchend', () => {
        const distance = endX - startX;
        if (distance > swipeThreshold) {
            navigateGallery(-1);
        } else if (distance < -swipeThreshold) {
            navigateGallery(1);
        }
    });
});
