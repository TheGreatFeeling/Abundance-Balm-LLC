const ETSY_SHOP_URL = "PASTE_YOUR_ETSY_LISTING_URL_HERE";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navigationLinks = document.getElementById("navigationLinks");
  const currentYear = document.getElementById("currentYear");
  const particleField = document.getElementById("particleField");
  const balmStage = document.getElementById("balmStage");

  /*
   * Automatically update the copyright year.
   */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /*
   * Mobile navigation menu.
   */
  if (menuButton && navigationLinks) {
    const closeMenu = () => {
      navigationLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      navigationLinks.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
      );

      document.body.classList.add("menu-open");
    };

    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const menuIsOpen =
        navigationLinks.classList.contains("open");

      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks
      .querySelectorAll("a")
      .forEach((link) => {
        link.addEventListener("click", closeMenu);
      });

    document.addEventListener("click", (event) => {
      const clickedInsideNavigation =
        navigationLinks.contains(event.target);

      const clickedMenuButton =
        menuButton.contains(event.target);

      if (
        !clickedInsideNavigation &&
        !clickedMenuButton
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) {
        closeMenu();
      }
    });
  }

  /*
   * Etsy purchase links.
   *
   * When the Etsy URL is added above, every element with
   * class="etsy-link" will open that listing.
   *
   * Until then, the button opens an order email.
   */
  document
    .querySelectorAll(".etsy-link")
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const validEtsyURL =
          ETSY_SHOP_URL &&
          ETSY_SHOP_URL !==
            "PASTE_YOUR_ETSY_LISTING_URL_HERE";

        if (validEtsyURL) {
          event.preventDefault();

          window.open(
            ETSY_SHOP_URL,
            "_blank",
            "noopener,noreferrer"
          );

          return;
        }

        event.preventDefault();

        const subject = encodeURIComponent(
          "Abundance Balm Order"
        );

        const body = encodeURIComponent(
          "Hello,\n\nI would like to purchase Abundance Balm.\n\nThank you."
        );

        window.location.href =
          `mailto:thegreatfeeling@zohomail.com` +
          `?subject=${subject}&body=${body}`;
      });
    });

  /*
   * Respect accessibility settings and reduce animation
   * on smaller devices.
   */
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const smallScreen = window.matchMedia(
    "(max-width: 650px)"
  ).matches;

  /*
   * Floating light particles in the hero section.
   */
  if (
    particleField &&
    !reducedMotion &&
    !smallScreen
  ) {
    particleField.innerHTML = "";

    const numberOfParticles = 20;

    for (
      let index = 0;
      index < numberOfParticles;
      index += 1
    ) {
      const particle =
        document.createElement("span");

      particle.className = "particle";

      particle.style.left =
        `${Math.random() * 100}%`;

      particle.style.animationDuration =
        `${8 + Math.random() * 9}s`;

      particle.style.animationDelay =
        `${Math.random() * -15}s`;

      particle.style.opacity =
        `${0.25 + Math.random() * 0.55}`;

      particle.style.setProperty(
        "--particle-scale",
        `${0.5 + Math.random()}`
      );

      particleField.appendChild(particle);
    }
  }

  /*
   * Gentle three-dimensional balm movement on desktop.
   */
  if (
    balmStage &&
    !reducedMotion &&
    !smallScreen
  ) {
    balmStage.addEventListener(
      "pointermove",
      (event) => {
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
          `rotateX(${rotateX}deg) ` +
          `rotateY(${rotateY}deg)`;
      }
    );

    balmStage.addEventListener(
      "pointerleave",
      () => {
        balmStage.style.transform = "";
      }
    );
  }

  /*
   * Smooth scrolling for links that point to sections
   * on the same page.
   */
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetID =
          link.getAttribute("href");

        if (!targetID || targetID === "#") {
          return;
        }

        const targetElement =
          document.querySelector(targetID);

        if (!targetElement) {
          return;
        }

        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: reducedMotion
            ? "auto"
            : "smooth",
          block: "start"
        });
      });
    });
});
