document.addEventListener("DOMContentLoaded", function() {
    let currentLocationImages = [];
    let currentIndex = 0;
    let isFirstLoad = true;
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery-image');
    galleryImage.loading = 'eager';
    const panelLeftGallery = document.querySelector('.panel-left-gallery');
    panelLeftGallery.appendChild(galleryImage);

    const locationContainers = document.querySelectorAll('.location');
    locationContainers.forEach(location => {
        location.addEventListener('click', () => {
            const locationName = location.getAttribute('data-location');
            document.getElementById('selected-gallery').innerText = locationName;
            const progressIndicator = location.querySelector('.loading-progress');
            loadImages(locationName, progressIndicator);
        });
    });

    document.getElementById('toggle-list').addEventListener('click', () => {
        const galleryList = document.getElementById('gallery-list');
        const listIcon = document.getElementById('list-icon');
        galleryList.classList.toggle('hidden');
        listIcon.src = galleryList.classList.contains('hidden') ? '/wb/nav/burger.svg' : '/wb/nav/burger-close.svg';
    });

    async function loadImages(locationName, progressIndicator) {
        const locationFolder = `/wb/gallery/${locationName}/`;
        progressIndicator.classList.remove('hidden');
        try {
            const response = await fetch(locationFolder);
            const data = await response.text();
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const imageLinks = htmlDoc.querySelectorAll('a[href$=".jpeg"]');
            currentLocationImages = Array.from(imageLinks).map(link => link.href);
            currentIndex = 0;
            await preloadImages(currentLocationImages, progressIndicator);
            progressIndicator.classList.add('hidden');
            showImage(currentLocationImages[currentIndex]);
            isFirstLoad = false;
        } catch (error) {
            console.error('Error loading images:', error);
            progressIndicator.classList.add('hidden');
        }
    }

    function preloadImages(imageSources, progressIndicator) {
        let loadedCount = 0;
        const totalImages = imageSources.length;
        progressIndicator.textContent = `0/${totalImages}`;
        return Promise.all(imageSources.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loadedCount++;
                    progressIndicator.textContent = `${loadedCount}/${totalImages}`;
                    resolve();
                };
                img.onerror = reject;
            });
        }));
    }

    function showImage(imageSrc) {
        galleryImage.src = imageSrc;
        galleryImage.classList.add('fade-in');
        galleryImage.onload = () => adjustImageFit(galleryImage);
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        [prevBtn, nextBtn].forEach(btn => btn.style.display = currentLocationImages.length === 0 ? 'none' : 'block');
    }

    function adjustImageFit(img) {
        const isVertical = img.naturalHeight > img.naturalWidth;
        const isDesktop = window.innerWidth > 768;
        img.style.objectFit = isVertical && isDesktop ? 'contain' : 'cover';
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    [prevBtn, nextBtn].forEach(btn => btn.style.display = 'none');
    prevBtn.addEventListener('click', debounce(() => navigateGallery(-1)));
    nextBtn.addEventListener('click', debounce(() => navigateGallery(1)));

    function navigateGallery(direction) {
        if (!currentLocationImages.length) return;
        currentIndex = (currentIndex + direction + currentLocationImages.length) % currentLocationImages.length;
        showImage(currentLocationImages[currentIndex]);
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
        endX = startX;
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
        endX = startX;
    });

    window.addEventListener('resize', () => {
        adjustImageFit(galleryImage);
    });

    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
});
