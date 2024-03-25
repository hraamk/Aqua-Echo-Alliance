// Add event listener to each thumbnail to display details on hover
document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    const details = thumbnail.nextElementSibling;
    thumbnail.addEventListener('mouseover', () => {
        details.style.display = 'block';
    });
    thumbnail.addEventListener('mouseout', () => {
        details.style.display = 'none';
    });
});
