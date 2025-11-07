// Solutions Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu functionality with enhanced touch support
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileCloseBtn = document.querySelector(".mobile-close-btn");

  if (mobileMenuBtn && mobileMenu) {
    // Touch-friendly mobile menu toggle
    mobileMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.add("active");
      mobileMenuBtn.classList.add("active");
      document.body.style.overflow = "hidden";

      // Add haptic feedback for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });

    mobileCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
      document.body.style.overflow = "";

      // Add haptic feedback for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Close mobile menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        mobileMenuBtn.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Enhanced smooth scrolling for anchor links with mobile optimization
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20; // Extra padding for mobile

        // Use smooth scrolling with fallback for older browsers
        if ("scrollBehavior" in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        } else {
          // Fallback for older browsers
          window.scrollTo(0, targetPosition);
        }

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // Hero section animations with mobile optimization
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroButtons = document.querySelector(".hero-buttons");
  const floatingElements = document.querySelectorAll(".floating-element");
  const heroStats = document.querySelectorAll(".stat-number");

  // Animate floating elements with enhanced effects (disabled on mobile for performance)
  if (!isMobile) {
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        rotation: 180,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5,
      });

      // Add hover effects only on non-touch devices
      if (!isTouchDevice) {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }

  // Animate hero stats with counter
  const animateCounters = () => {
    heroStats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      gsap.to(stat, {
        textContent: target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
  };

  animateCounters();

  // Enhanced scroll-triggered animations for solutions grid with mobile optimization
  const solutionCards = document.querySelectorAll(".solution-card");
  solutionCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: isMobile ? 30 : 50,
        scale: isMobile ? 0.95 : 0.9,
        rotationY: isMobile ? 0 : 15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out",
        delay: isMobile ? index * 0.05 : index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Enhanced process timeline animations with mobile optimization
  const processSteps = document.querySelectorAll(".process-step");
  processSteps.forEach((step, index) => {
    const stepNumber = step.querySelector(".step-number");
    const stepContent = step.querySelector(".step-content");

    gsap.fromTo(
      stepNumber,
      {
        scale: 0,
        rotation: -180,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      stepContent,
      {
        opacity: 0,
        x: isMobile ? -30 : index % 2 === 0 ? -50 : 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: isMobile ? 0.6 : 0.8,
        ease: "power2.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Enhanced contact highlights animations
  const highlightItems = document.querySelectorAll(".highlight-item");
  highlightItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: -30,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  // Enhanced solution card interactions with mobile optimization
  solutionCards.forEach((card) => {
    const iconWrapper = card.querySelector(".icon-wrapper");
    const techTags = card.querySelectorAll(".tech-tag");
    const cardGlow = card.querySelector(".card-glow");

    // Touch-friendly interactions for mobile
    if (isTouchDevice) {
      card.addEventListener("touchstart", function () {
        gsap.to(this, {
          scale: 0.98,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      card.addEventListener("touchend", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    } else {
      // Desktop hover effects
      card.addEventListener("mouseenter", () => {
        gsap.to(iconWrapper, {
          rotation: 360,
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(techTags, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.1,
        });

        if (cardGlow) {
          gsap.to(cardGlow, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(iconWrapper, {
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(techTags, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        if (cardGlow) {
          gsap.to(cardGlow, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }
  });

  // Solution details button functionality with mobile optimization
  const solutionDetailsBtns = document.querySelectorAll(
    ".solution-details-btn"
  );
  solutionDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest(".solution-card");
      const category = card.dataset.category;

      // Add haptic feedback for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      // Create modal or expand card with more details
      showSolutionDetails(category, card);
    });
  });

  // Enhanced contact form handling with mobile optimization
  const contactForm = document.getElementById("solutions-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission(this);
    });

    // Enhanced form field animations with mobile optimization
    const formInputs = contactForm.querySelectorAll("input, select, textarea");
    formInputs.forEach((input) => {
      // Focus effects
      input.addEventListener("focus", function () {
        if (!isMobile) {
          gsap.to(this, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(this.parentElement, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Add visual feedback for mobile
        this.style.borderColor = "#26bdef";
        this.style.boxShadow = "0 0 0 3px rgba(38, 189, 239, 0.1)";
      });

      input.addEventListener("blur", function () {
        if (!isMobile) {
          gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(this.parentElement, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        // Remove visual feedback for mobile
        this.style.borderColor = "";
        this.style.boxShadow = "";
      });

      // Prevent zoom on iOS for input fields
      if (isMobile) {
        input.addEventListener("focus", function () {
          this.style.fontSize = "16px";
        });
      }
    });
  }

  // Enhanced parallax effect for hero section (disabled on mobile for performance)
  if (!isMobile) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroVisual = document.querySelector(".hero-visual");
      const heroBackground = document.querySelector(".hero-background");

      if (heroVisual) {
        gsap.to(heroVisual, {
          y: scrolled * 0.5,
          duration: 0.1,
        });
      }

      if (heroBackground) {
        gsap.to(heroBackground, {
          y: scrolled * 0.3,
          duration: 0.1,
        });
      }
    });
  }

  // Enhanced Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".solution-card, .process-step, .highlight-item"
  );
  animateElements.forEach((el) => observer.observe(el));

  // Enhanced tech stack tag interactions with mobile optimization
  const techTags = document.querySelectorAll(".tech-tag");
  techTags.forEach((tag) => {
    if (!isTouchDevice) {
      tag.addEventListener("mouseenter", function () {
        gsap.to(this, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      tag.addEventListener("mouseleave", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    } else {
      // Touch feedback for mobile
      tag.addEventListener("touchstart", function () {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      tag.addEventListener("touchend", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    }
  });

  // Enhanced button interactions with mobile optimization
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    if (!isTouchDevice) {
      btn.addEventListener("mouseenter", function () {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    } else {
      // Touch feedback for mobile
      btn.addEventListener("touchstart", function () {
        gsap.to(this, {
          scale: 0.95,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      btn.addEventListener("touchend", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    }
  });

  // Solution category filtering (if needed)
  const filterButtons = document.querySelectorAll("[data-filter]");
  if (filterButtons.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.dataset.filter;
        filterSolutions(category);
      });
    });
  }

  // Add floating animation to background circles (disabled on mobile for performance)
  if (!isMobile) {
    const bgCircles = document.querySelectorAll(".bg-circle");
    bgCircles.forEach((circle, index) => {
      gsap.to(circle, {
        y: -30,
        rotation: 180,
        duration: 20,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 5,
      });
    });
  }

  // Mobile-specific optimizations
  if (isMobile) {
    // Disable some animations for better performance
    gsap.set(".floating-elements", { display: "none" });
    gsap.set(".bg-circle", { display: "none" });

    // Optimize scroll performance
    document.body.style.webkitOverflowScrolling = "touch";

    // Add mobile-specific event listeners
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener("touchstart", function (e) {
      touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", function (e) {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > swipeThreshold) {
        // Handle swipe gestures if needed
        if (diff > 0) {
          // Swipe up
          console.log("Swipe up detected");
        } else {
          // Swipe down
          console.log("Swipe down detected");
        }
      }
    }
  }

  // Performance optimization: Reduce motion for users who prefer it
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    gsap.globalTimeline.timeScale(0.5);
  }
});

// Enhanced function to show solution details with mobile optimization
function showSolutionDetails(category, card) {
  const isMobile = window.innerWidth <= 768;

  // Create a modal or expand the card with more information
  const modal = document.createElement("div");
  modal.className = "solution-modal";
  modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <h2>${card.querySelector(".solution-title").textContent}</h2>
                <div class="modal-body">
                    <p>${
                      card.querySelector(".solution-description").textContent
                    }</p>
                    <div class="modal-features">
                        <h3>Key Features:</h3>
                        <ul>
                            ${Array.from(
                              card.querySelectorAll(".solution-features li")
                            )
                              .map((li) => `<li>${li.textContent}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div class="modal-tech">
                        <h3>Technologies:</h3>
                        <div class="tech-stack">
                            ${Array.from(card.querySelectorAll(".tech-tag"))
                              .map(
                                (tag) =>
                                  `<span class="tech-tag">${tag.textContent}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="contactUs('${category}')">Get Quote</button>
                    <button class="btn btn-secondary" onclick="learnMore('${category}')">Learn More</button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Enhanced modal animation with mobile optimization
  gsap.fromTo(
    modal.querySelector(".modal-content"),
    {
      scale: isMobile ? 0.9 : 0.8,
      opacity: 0,
      y: isMobile ? 30 : 50,
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.4 : 0.5,
      ease: "back.out(1.7)",
    }
  );

  // Close modal functionality with mobile optimization
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  function closeModal() {
    gsap.to(modal.querySelector(".modal-content"), {
      scale: isMobile ? 0.9 : 0.8,
      opacity: 0,
      y: isMobile ? 30 : 50,
      duration: isMobile ? 0.3 : 0.3,
      ease: "power2.in",
      onComplete: () => {
        document.body.removeChild(modal);
      },
    });
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on escape key
  document.addEventListener("keydown", function closeOnEscape(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", closeOnEscape);
    }
  });
}

// Enhanced function to handle form submission with mobile optimization
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const isMobile = window.innerWidth <= 768;

  // Add loading state
  form.classList.add("loading");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Add haptic feedback for mobile devices
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Show success message
    showNotification(
      "Thank you! Your message has been sent successfully.",
      "success"
    );

    // Reset form
    form.reset();
    form.classList.remove("loading");
    submitBtn.textContent = "Send Request";
    submitBtn.disabled = false;
  }, 2000);
}

// Enhanced function to show notifications with mobile optimization
function showNotification(message, type = "info") {
  const isMobile = window.innerWidth <= 768;

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;

  document.body.appendChild(notification);

  // Enhanced notification animation with mobile optimization
  gsap.fromTo(
    notification,
    {
      opacity: 0,
      y: isMobile ? -30 : -50,
      scale: isMobile ? 0.95 : 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: isMobile ? 0.4 : 0.5,
      ease: "back.out(1.7)",
    }
  );

  // Auto remove after 5 seconds
  setTimeout(() => {
    gsap.to(notification, {
      opacity: 0,
      y: isMobile ? -30 : -50,
      scale: isMobile ? 0.95 : 0.9,
      duration: isMobile ? 0.3 : 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      },
    });
  }, 5000);

  // Manual close
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    gsap.to(notification, {
      opacity: 0,
      y: isMobile ? -30 : -50,
      scale: isMobile ? 0.95 : 0.9,
      duration: isMobile ? 0.3 : 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      },
    });
  });
}

// Enhanced function to filter solutions (if needed)
function filterSolutions(category) {
  const solutionCards = document.querySelectorAll(".solution-card");
  const isMobile = window.innerWidth <= 768;

  solutionCards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.4 : 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, {
        opacity: 0.3,
        scale: 0.95,
        duration: isMobile ? 0.4 : 0.5,
        ease: "power2.out",
      });
    }
  });
}

// Helper functions for modal actions
function contactUs(category) {
  // Scroll to contact form and pre-fill the solution field
  const contactForm = document.getElementById("contact-form");
  const solutionSelect = document.getElementById("solution");

  if (contactForm && solutionSelect) {
    // Map category to option value
    const categoryMap = {
      web: "web",
      mobile: "mobile",
      cloud: "cloud",
      ai: "ai",
      digital: "digital",
      security: "security",
    };

    if (categoryMap[category]) {
      solutionSelect.value = categoryMap[category];
    }

    // Smooth scroll to contact form
    const headerHeight = document.querySelector(".header").offsetHeight;
    const targetPosition = contactForm.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Close modal
    const modal = document.querySelector(".solution-modal");
    if (modal) {
      modal.querySelector(".modal-close").click();
    }
  }
}

function learnMore(category) {
  // Handle learn more action
  console.log(`Learn more about ${category}`);
  // You can implement navigation to detailed pages or show more information
}

// Add CSS for modal and notifications with enhanced mobile support
const additionalStyles = `
    .solution-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    .modal-content {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        backdrop-filter: blur(20px);
        position: relative;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        min-height: 44px;
        touch-action: manipulation;
    }

    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .modal-content h2 {
        color: white;
        margin-bottom: 1rem;
        padding-right: 3rem;
    }

    .modal-body {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .modal-features h3,
    .modal-tech h3 {
        color: white;
        margin-bottom: 1rem;
    }

    .modal-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 10001;
        max-width: 400px;
    }

    .notification-content {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-success {
        border-left: 4px solid #4CAF50;
    }

    .notification-error {
        border-left: 4px solid #f44336;
    }

    .notification-info {
        border-left: 4px solid #2196F3;
    }

    .notification-message {
        color: white;
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
        min-height: 44px;
        touch-action: manipulation;
    }

    .notification-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
        .modal-content {
            margin: 1rem;
            padding: 1.5rem;
            max-height: 85vh;
        }

        .modal-actions {
            flex-direction: column;
        }

        .modal-actions .btn {
            width: 100%;
            justify-content: center;
            min-height: 44px;
        }

        .notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
        }

        .notification-content {
            padding: 1rem;
        }

        .modal-close {
            width: 44px;
            height: 44px;
            font-size: 1.8rem;
        }
    }

    @media (max-width: 480px) {
        .modal-content {
            margin: 0.5rem;
            padding: 1rem;
            border-radius: 15px;
        }

        .modal-content h2 {
            font-size: 1.3rem;
            padding-right: 2rem;
        }

        .modal-body {
            font-size: 0.9rem;
        }

        .modal-features h3,
        .modal-tech h3 {
            font-size: 1.1rem;
        }

        .notification {
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
        }

        .notification-content {
            padding: 0.8rem;
        }

        .notification-message {
            font-size: 0.9rem;
        }
    }

    /* Touch-friendly improvements */
    @media (hover: none) and (pointer: coarse) {
        .modal-close:hover {
            background: none;
        }

        .modal-close:active {
            background: rgba(255, 255, 255, 0.1);
        }

        .notification-close:hover {
            background: none;
        }

        .notification-close:active {
            background: rgba(255, 255, 255, 0.1);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
