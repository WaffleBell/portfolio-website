document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('titleSegment1').classList.add('fade-in');
    document.getElementById('titleSegment2').classList.add('fade-in');

    // Add fade-in class to subheading, description, buttons, and bottom bar with delay
    document.getElementById('subheading').classList.add('fade-in');
    document.getElementById('description').classList.add('fade-in');
    document.querySelectorAll('.fade-in').forEach(function (element, index) {
        element.style.animationDelay = `${index + 4}s`;
        element.classList.add('fade-in');
    });
});