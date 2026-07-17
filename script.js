const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const currentYear = document.getElementById("currentYear");
const particleField = document.getElementById("particleField");
const balmStage = document.getElementById("balmStage");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", function () {
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

  const navigationItems = navigationLinks.querySelectorAll("a");

  navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navigationLinks.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu =
      navigationLinks.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      navigationLinks.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      document.body.classList.remove("menu-open");
    }
  });
}

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const smallScreen = window.matchMedia(
  "(max-width: 650px)"
).matches;

if (particleField && !reducedMotion && !smallScreen) {
  for (let index = 0; index < 20; index += 1) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration =
      8 + Math.random() * 9 + "s";
    particle.style.animationDelay =
      Math.random() * -15 + "s";
    particle.style.opacity =
      0.25 + Math.random() * 0.55;
    particle.style.transform =
      "scale(" + (0.5 + Math.random()) + ")";

    particleField.appendChild(particle);
  }
}

if (balmStage && !reducedMotion && !smallScreen) {
  balmStage.addEventListener(
    "pointermove",
    function (event) {
      const rectangle =
        balmStage.getBoundingClientRect();

      const horizontalPosition =
        (event.clientX - rectangle.left) /
        rectangle.width;

      const verticalPosition =
        (event.clientY - rectangle.top) /
        rectangle.height;

      const rotateY =
        (horizontalPosition - 0.5) * 12;

      const rotateX =
        (0.5 - verticalPosition) * 8;

      balmStage.style.transform =
        "rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)";
    }
  );

  balmStage.addEventListener(
    "pointerleave",
    function () {
      balmStage.style.transform = "";
    }
  );
}
