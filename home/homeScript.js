let content = document.getElementById('content');
    window.addEventListener('scroll', () => {
    let value = window.scrollY;
    content.style.marginTop =  (value * 0.5 + 200) + 'px';
    })


// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll event
function handleScroll() {
    const tileContents = document.querySelectorAll('.tilecontent');
    tileContents.forEach(tileContent => {
        if (isInViewport(tileContent)) {
            tileContent.classList.add('fade-in');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
