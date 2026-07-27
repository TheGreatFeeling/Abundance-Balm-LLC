const ETSY_SHOP_URL = "https://www.etsy.com/shop/balmofabundance";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const navigationLinks = document.getElementById("navigationLinks");
  const currentYear = document.getElementById("currentYear");
  const particleField = document.getElementById("particleField");
  const balmStage = document.getElementById("balmStage");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /*
   * Keep the footer year current.
   */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /*
   * Make every Etsy shop link use the same destination.
   */
  document.querySelectorAll('a[href*="etsy.com"]').forEach((link) => {
    link.href = ETSY_SHOP_URL;
  });

  /*
   * Mobile navigation.
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

    menuButton.addEventListener("click", () => {
      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const menuIsOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      if (
        menuIsOpen &&
        !navigationLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });
  }

  /*
   * Decorative floating particles in the hero.
   */
  if (particleField && !reduceMotion) {
    const particleCount =
      window.innerWidth < 620 ? 12 : 24;

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement("span");

      particle.className = "particle";
      particle.setAttribute("aria-hidden", "true");

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration =
        `${8 + Math.random() * 10}s`;
      particle.style.animationDelay =
        `${Math.random() * -16}s`;
      particle.style.opacity =
        `${0.25 + Math.random() * 0.55}`;
      particle.style.setProperty(
        "--particle-scale",
        `${0.5 + Math.random() * 1.2}`
      );

      particleField.appendChild(particle);
    }
  }

  /*
   * Gentle product movement based on pointer position.
   */
  if (balmStage && !reduceMotion) {
    const heroProduct = balmStage.closest(".hero-product");

    if (heroProduct) {
      heroProduct.addEventListener("pointermove", (event) => {
        const bounds = heroProduct.getBoundingClientRect();
        const horizontal =
          (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical =
          (event.clientY - bounds.top) / bounds.height - 0.5;

        balmStage.style.transform =
          `perspective(900px)
           rotateY(${horizontal * 8}deg)
           rotateX(${vertical * -7}deg)
           translate3d(${horizontal * 8}px, ${vertical * 8}px, 0)`;
      });

      heroProduct.addEventListener("pointerleave", () => {
        balmStage.style.transform =
          "perspective(900px) rotateY(0deg) rotateX(0deg)";
      });
    }
  }

  /*
   * Smooth scrolling for links that point to sections on this page.
   */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /*
   * Reveal major page sections as they enter the viewport.
   */
  const revealItems = document.querySelectorAll(
    ".value-strip article, " +
    ".featured-product-image, " +
    ".featured-product-copy, " +
    ".story-copy, " +
    ".story-gallery, " +
    ".ingredient-card, " +
    ".closing-content"
  );

  if (revealItems.length && !reduceMotion) {
    revealItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(24px)";
      item.style.transition =
        "opacity 700ms ease, transform 700ms ease";
    });

    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });
  }
});
