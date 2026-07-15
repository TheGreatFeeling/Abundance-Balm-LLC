const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-navigation");
const navigationLinks = document.querySelectorAll(".main-navigation a");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));

    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

const revealElements = document.querySelectorAll(
  [
    ".section-heading",
    ".section-grid",
    ".ingredient-card",
    ".ritual-step",
    ".product-panel",
    ".review-card",
    ".safety-grid",
    ".closing-section",
  ].join(",")
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const heroProduct = document.querySelector(".hero-product");
const balmTin = document.querySelector(".balm-tin");

if (heroProduct && balmTin && window.matchMedia("(pointer: fine)").matches) {
  heroProduct.addEventListener("mousemove", (event) => {
    const bounds = heroProduct.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    balmTin.style.transform = `
      rotate(-3deg)
      rotateY(${x * 9}deg)
      rotateX(${y * -9}deg)
      translateY(-4px)
    `;
  });

  heroProduct.addEventListener("mouseleave", () => {
    balmTin.style.transform = "rotate(-3deg)";
  });
}

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 40);
});

const currentYearElements = document.querySelectorAll("[data-current-year]");

currentYearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});
.reveal {
  opacity: 0;
  transform: translateY(34px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.ingredient-card:nth-child(2),
.review-card:nth-child(2) {
  transition-delay: 0.1s;
}

.ingredient-card:nth-child(3),
.review-card:nth-child(3) {
  transition-delay: 0.2s;
}

.ingredient-card:nth-child(4) {
  transition-delay: 0.05s;
}

.ingredient-card:nth-child(5) {
  transition-delay: 0.15s;
}

.ingredient-card:nth-child(6) {
  transition-delay: 0.25s;
}

.balm-tin {
  transition: transform 0.22s ease-out;
  transform-style: preserve-3d;
}

.site-header.scrolled {
  backdrop-filter: blur(18px);
  background: rgba(12, 36, 24, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  max-width: none;
  padding-left: max(24px, calc((100vw - var(--max-width)) / 2 + 24px));
  padding-right: max(24px, calc((100vw - var(--max-width)) / 2 + 24px));
  position: fixed;
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
