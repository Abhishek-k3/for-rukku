// Music Toggle
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "🎵";
    } else {
        music.pause();
        musicBtn.innerText = "❤️";
    }
});

// Diya Lighting
const diya = document.getElementById('diya');
diya.addEventListener('click', () => {
    diya.classList.toggle('lit');
    if(diya.classList.contains('lit')) {
        alert("May this light always guide our journey, Rukku.");
    }
});

// Secret Letter Unlock
document.getElementById('unlock-btn').addEventListener('click', () => {
    const password = prompt("Enter the date we first met (DDMM):");
    if (password === "1205") { // Change this to your actual date
        document.getElementById('letter').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        alert("Try again, bro... I mean, try again Rukku!");
    }
});
