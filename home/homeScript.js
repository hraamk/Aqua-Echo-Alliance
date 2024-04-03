let content = document.getElementById('content');
    window.addEventListener('scroll', () => {
    let value = window.scrollY;
    content.style.marginTop =  (value * 0.5 + 200) + 'px';
    })


// Function to handle scroll event and trigger fade-in for elements in the viewport
function handleScroll() {
  const tileContents = document.querySelectorAll('.tilecontent');
  tileContents.forEach(tileContent => {
      if (isInViewport(tileContent)) {
          tileContent.classList.add('fade-in');
      }
  });

  const exploreContents = document.querySelectorAll('.explore');
  exploreContents.forEach(explore => {
      if (isInViewport(explore)) {
          explore.classList.add('fade-in');
      }
  });
}

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
