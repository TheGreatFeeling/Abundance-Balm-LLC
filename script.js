document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.getElementById("menuButton");
  const navigation = document.getElementById("navigationLinks");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const particleField = document.getElementById("particleField");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (particleField && !reduceMotion) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 55; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${10 + Math.random() * 18}s`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      particle.style.opacity = String(Math.random());
      particle.style.transform = `scale(${0.3 + Math.random()})`;
      fragment.appendChild(particle);
    }

    particleField.appendChild(fragment);
  }

  const balmStage = document.getElementById("balmStage");

  if (balmStage && !reduceMotion) {
    let frameId = null;

    document.addEventListener("mousemove", (event) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * -12;
        balmStage.style.setProperty("--mouse-x", `${x}deg`);
        balmStage.style.setProperty("--mouse-y", `${y}deg`);
      });
    });
  }

  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("formMessage");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.textContent = "Thank you for joining the Abundance community.";
      form.reset();
    });
  }
});
