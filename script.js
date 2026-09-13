const startButton = document.getElementById("startButton");
const loveSong = document.getElementById("loveSong");
const particles = document.getElementById("particles");

let started = false;

/* ---------------------------------------
   Create cinematic floating particles
--------------------------------------- */

function createParticles() {
    const amount = window.innerWidth < 600 ? 35 : 60;

    for (let i = 0; i < amount; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${8 + Math.random() * 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;

        const size = 1 + Math.random() * 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particles.appendChild(particle);
    }
}

createParticles();


/* ---------------------------------------
   Start experience
--------------------------------------- */

startButton.addEventListener("click", async () => {

    if (started) return;

    started = true;

    document.body.classList.add("started");

    /*
       The music starts from the user's tap.
       This is important because mobile browsers
       normally block autoplay without interaction.
    */

    try {
        loveSong.volume = 0.85;
        await loveSong.play();
    } catch (error) {
        console.log("Audio could not start automatically:", error);
    }

    /*
       Bouquet sequence.

       The flowers are deliberately staggered
       instead of appearing simultaneously.
    */

    const flowers = document.querySelectorAll(".flower");

    flowers.forEach((flower, index) => {

        const delay = 900 + index * 750;

        flower.querySelector(".stem").style.transitionDelay =
            `${delay}ms`;

        flower.querySelectorAll(".leaf").forEach(leaf => {
            leaf.style.transitionDelay =
                `${delay + 500}ms`;
        });

        flower.querySelector(".rose").style.transitionDelay =
            `${delay + 900}ms`;
    });

    /*
       Reveal final message after the bouquet
       has completely formed and wrapped.
    */

    setTimeout(() => {
        document.body.classList.add("finished");
    }, 11500);
});


/* ---------------------------------------
   Prevent accidental page scrolling
--------------------------------------- */

document.addEventListener(
    "touchmove",
    event => {
        if (event.target.closest("#experience")) {
            event.preventDefault();
        }
    },
    { passive: false }
);
