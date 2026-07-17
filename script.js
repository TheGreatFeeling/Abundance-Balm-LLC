const ETSY_SHOP_URL = "https://balmofabundance.etsy.com";

const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");
const particleField = document.getElementById("particleField");
const balmStage = document.getElementById("balmStage");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = navigationLinks.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      menuIsOpen ? "true" : "false"
    );

    menuButton.setAttribute(
      "aria-label",
      menuIsOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", menuIsOpen);
  });

  navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigationLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navigationLinks.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navigationLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open");
    }
  });
}

document.querySelectorAll(".etsy-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (
      ETSY_SHOP_URL &&
      ETSY_SHOP_URL !== "PASTE_YOUR_ETSY_LISTING_URL_HERE"
    ) {
      link.href = ETSY_SHOP_URL;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return;
    }

    event.preventDefault();

    window.location.href =
      "mailto:thegreatfeeling@zohomail.com" +
      "?subject=Abundance%20Balm%20Order" +
      "&body=Hello%2C%20I%20would%20like%20to%20purchase%20Abundance%20Balm.";
  });
});

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const smallScreen = window.matchMedia("(max-width: 650px)").matches;

if (particleField && !reducedMotion && !smallScreen) {
  for (let index = 0; index < 20; index += 1) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${8 + Math.random() * 9}s`;
    particle.style.animationDelay = `${Math.random() * -15}s`;
    particle.style.opacity = `${0.25 + Math.random() * 0.55}`;
    particle.style.transform = `scale(${0.5 + Math.random()})`;

    particleField.appendChild(particle);
  }
}

if (balmStage && !reducedMotion && !smallScreen) {
  balmStage.addEventListener("pointermove", (event) => {
    const rectangle = balmStage.getBoundingClientRect();

    const horizontalPosition =
      (event.clientX - rectangle.left) / rectangle.width;

    const verticalPosition =
      (event.clientY - rectangle.top) / rectangle.height;

    const rotateY = (horizontalPosition - 0.5) * 12;
    const rotateX = (0.5 - verticalPosition) * 8;

    balmStage.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  balmStage.addEventListener("pointerleave", () => {
    balmStage.style.transform = "";
  });
}
