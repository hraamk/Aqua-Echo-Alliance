window.addEventListener('scroll', function() {
    var h1 = document.getElementById('scroll');
    var introSection = document.getElementById('intro');

    // Get the position of the intro section
    var introPosition = introSection.getBoundingClientRect().top;

    // Check if the intro section is in the viewport
    if (introPosition < window.innerHeight && introPosition > 0) {
        // Change color of h1
        h1.style.color = '#0077cc'; // Change to desired color
    } else {
        // Reset color of h1
        h1.style.color = ''; // Reset to default color
    }
});
