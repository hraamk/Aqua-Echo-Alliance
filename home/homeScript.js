let content = document.getElementById('content');
    window.addEventListener('scroll', () => {
    let value = window.scrollY;
    content.style.marginTop =  (value * 0.5 + 150) + 'px';
    })

    function tileClicked(tileNumber) {
      alert("Tile " + tileNumber + " clicked!");
      // You can add more actions here, such as displaying content or navigating to another page
    }