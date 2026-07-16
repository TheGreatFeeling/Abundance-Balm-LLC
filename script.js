document.addEventListener("DOMContentLoaded", () => {

    // --------------------------
    // Current Year
    // --------------------------

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // --------------------------
    // Mobile Menu
    // --------------------------

    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigationLinks");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("open");

            document.body.classList.toggle("menu-open");

        });

    }

    // --------------------------
    // Floating Dust
    // --------------------------

    const particleField = document.getElementById("particleField");

    if (particleField) {

        for (let i = 0; i < 80; i++) {

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = Math.random() * 100 + "%";

            particle.style.animationDuration =
                10 + Math.random() * 18 + "s";

            particle.style.animationDelay =
                Math.random() * 12 + "s";

            particle.style.opacity =
                Math.random();

            particle.style.transform =
                "scale(" + (0.3 + Math.random()) + ")";

            particleField.appendChild(particle);

        }

    }

    // --------------------------
    // Rotating Balm Tin
    // --------------------------

    const balmStage = document.getElementById("balmStage");

    if (balmStage) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 20;

            const y =
                (event.clientY / window.innerHeight - 0.5) * -20;

            balmStage.style.transform =
                `rotateX(${y}deg) rotateY(${x}deg)`;

        });

    }

    // --------------------------
    // Newsletter Demo
    // --------------------------

    const form = document.getElementById("newsletterForm");
    const message = document.getElementById("formMessage");

    if (form && message) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            message.textContent =
                "Thank you for joining the Abundance community.";

            form.reset();

        });

    }

});
