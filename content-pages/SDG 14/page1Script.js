let text = document.getElementById('text');
let plant1 = document.getElementById('plant1');
let plant2 = document.getElementById('plant2');
let fish = document.getElementById('fish');
let boat = document.getElementById('boat');
let hill = document.getElementById('hill');
let sea = document.getElementById('sea');


window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    plant1.style.left = value * -0.5 + 'px';
    boat.style.left = value * 1.5 + 'px';
    fish.style.left = value * -1.5 + 'px';
    plant2.style.left = value * 0.5 + 'px';
    hill.style.marginTop = value * 0.5 + 'px';





});