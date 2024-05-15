<<<<<<< Updated upstream
document.querySelectorAll('#lol a').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.textShadow = '0 0 20px #00ffff';
    });
    item.addEventListener('mouseout', () => {
        item.style.textShadow = 'none';
    });
});


// Function to create stars
function createStars() {
    const starsNumber = 150;
    for (let i = 0; i < starsNumber; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Randomize animation speed
        star.style.width = `${Math.random() * 2 + 1}px`; // Randomize star size
        star.style.height = star.style.width;
        document.body.appendChild(star);
    }
}

window.onload = createStars;
=======
>>>>>>> Stashed changes
