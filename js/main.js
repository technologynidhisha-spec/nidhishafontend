document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('consultation-form');
    const messageDiv = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); // Stop default form submission

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'green';
                    messageDiv.textContent = 'Thanks! The form was submitted successfully.';
                } else {
                    const data = await response.json();
                    messageDiv.style.display = 'block';
                    messageDiv.style.color = 'red';
                    messageDiv.textContent = data.error || 'Oops! There was a problem submitting the form.';
                }
            } catch (error) {
                messageDiv.style.display = 'block';
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
            }
        });
    }
});



// Enhanced Navigation System
class NavigationManager {
  constructor() {
    this.header = document.querySelector(".header");
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.mobileCloseBtn = document.querySelector(".mobile-close-btn");
    this.navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupNavLinks();
    this.setupActiveLinkTracking();
  }

  setupScrollEffects() {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Add scrolled class for background change
      if (scrollTop > 50) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }

      // Hide/show header on scroll
      if (scrollTop > this.lastScrollTop && scrollTop > 100) {
        this.header.classList.add("hidden");
      } else {
        this.header.classList.remove("hidden");
      }

      this.lastScrollTop = scrollTop;
    });
  }

  setupMobileMenu() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    if (this.mobileCloseBtn) {
      this.mobileCloseBtn.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    }

    // Close mobile menu when clicking on a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.mobileMenu && this.mobileMenu.classList.contains("active")) {
        if (
          !this.mobileMenu.contains(e.target) &&
          !this.mobileMenuBtn.contains(e.target)
        ) {
          this.closeMobileMenu();
        }
      }
    });

    // Close mobile menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.mobileMenu &&
        this.mobileMenu.classList.contains("active")
      ) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.mobileMenuBtn.classList.toggle("active");
    this.mobileMenu.classList.toggle("active");
    document.body.style.overflow = this.mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  closeMobileMenu() {
    this.mobileMenuBtn.classList.remove("active");
    this.mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  setupNavLinks() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const targetSection = document.querySelector(href);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      });
    });
  }

  setupActiveLinkTracking() {
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-20% 0px -20% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          this.updateActiveLink(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  updateActiveLink(activeId) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeId}`) {
        link.classList.add("active");
      }
    });
  }
}

class CarouselManager {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dots = document.querySelectorAll(".carousel-dot");
    this.prevBtn = document.querySelector(".carousel-prev");
    this.nextBtn = document.querySelector(".carousel-next");
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.showSlide(0);
    this.setupControls();
    this.startAutoPlay();
  }

  setupControls() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.showSlide(index));
    });
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");

    this.currentSlide = index;
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll(
      ".feature-card, .stat-item, .blog-card"
    );
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    this.animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NavigationManager();
  new CarouselManager();
  new ScrollAnimations();
});

// Add some utility functions
window.utils = {
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: function (func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};
