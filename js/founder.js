// Simple Founder Section Interactions
class SimpleFounderSection {
  constructor() {
    this.cards = document.querySelectorAll(".founder-card");
    this.section = document.querySelector(".founder-section");
    this.init();
  }

  init() {
    this.setupScrollAnimation();
    this.setupCardInteractions();
  }

  setupScrollAnimation() {
    // Create intersection observer for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to trigger animation
            entry.target.classList.add("visible");

            // Once animation is triggered, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before section comes into view
      }
    );

    // Start observing the founder section
    if (this.section) {
      observer.observe(this.section);
    }
  }

  setupCardInteractions() {
    this.cards.forEach((card) => {
      // Mouse enter effect
      card.addEventListener("mouseenter", () => {
        this.enhanceCard(card);
      });

      // Mouse leave effect
      card.addEventListener("mouseleave", () => {
        this.resetCard(card);
      });

      // Click effect
      card.addEventListener("click", () => {
        this.handleCardClick(card);
      });
    });
  }

  enhanceCard(card) {
    // Simple hover effect
    card.style.transform = "translateY(-15px)";
    card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";

    // Enhance avatar
    const avatar = card.querySelector(".founder-avatar-circle");
    if (avatar) {
      avatar.style.transform = "scale(1.15)";
    }

    // Enhance name
    const name = card.querySelector(".founder-name");
    if (name) {
      name.style.color = "#007bff";
    }
  }

  resetCard(card) {
    // Reset card effects
    card.style.transform = "";
    card.style.boxShadow = "";

    // Reset avatar
    const avatar = card.querySelector(".founder-avatar-circle");
    if (avatar) {
      avatar.style.transform = "";
    }

    // Reset name
    const name = card.querySelector(".founder-name");
    if (name) {
      name.style.color = "";
    }
  }

  handleCardClick(card) {
    // Simple click effect
    card.style.transform = "scale(0.95)";

    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const founderSection = new SimpleFounderSection();

  // Make it globally accessible
  window.founderSection = founderSection;
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = SimpleFounderSection;
}
