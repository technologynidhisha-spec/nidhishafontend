// Products Page JavaScript - Advanced Animations & Interactions

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeInteractions();
  initializePricingToggle();
  initializeStatsCounter();
  initializeProductCards();
});

// Initialize all animations
function initializeAnimations() {
  // Hero section animations
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from(".hero-badge", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(
      ".hero-title .title-line",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-subtitle",
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-stats .stat-item",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-buttons .btn",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".floating-card",
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      },
      "-=0.6"
    );

  // Floating cards continuous animation
  gsap.to(".floating-card", {
    y: -20,
    duration: 3,
    ease: "power1.inOut",
    stagger: 0.5,
    yoyo: true,
    repeat: -1,
  });

  // Scroll-triggered animations
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Product cards animation
  gsap.utils.toArray(".product-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Feature cards animation
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".feature-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true, // ✅ Show only once when it enters
      },
      opacity: 0,
      y: 60,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  ScrollTrigger.refresh(); // ✅ Important if layout shifts or animations are delayed
});



  // Pricing cards animation
  gsap.utils.toArray(".pricing-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power2.out",
    });
  });

  // Testimonial cards animation
  gsap.utils.toArray(".testimonial-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // CTA section animation
  gsap.from(".cta-section .cta-content", {
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
  });

  // Parallax effect for hero background
  gsap.to(".hero-particles", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: -100,
    ease: "none",
  });

  gsap.to(".hero-grid", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: -50,
    ease: "none",
  });
}

// Initialize interactive features
function initializeInteractions() {
  // Product card hover effects
  gsap.utils.toArray(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Feature card hover effects
  gsap.utils.toArray(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Pricing card hover effects
  gsap.utils.toArray(".pricing-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Testimonial card hover effects
  gsap.utils.toArray(".testimonial-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Button hover effects
  gsap.utils.toArray(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        y: -2,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    });
  });
}

// Initialize pricing toggle
function initializePricingToggle() {
  const toggle = document.getElementById("pricing-toggle");
  const amounts = document.querySelectorAll(".amount");
  const periods = document.querySelectorAll(".period");

  if (toggle) {
    toggle.addEventListener("change", function () {
      amounts.forEach((amount) => {
        const monthly = amount.getAttribute("data-monthly");
        const annual = amount.getAttribute("data-annual");

        if (this.checked) {
          // Annual pricing
          gsap.to(amount, {
            innerHTML: annual,
            duration: 0.5,
            ease: "power2.out",
            snap: { innerHTML: 1 },
          });
          periods.forEach((period) => {
            period.textContent = "/month";
          });
        } else {
          // Monthly pricing
          gsap.to(amount, {
            innerHTML: monthly,
            duration: 0.5,
            ease: "power2.out",
            snap: { innerHTML: 1 },
          });
          periods.forEach((period) => {
            period.textContent = "/month";
          });
        }
      });
    });
  }
}

// Initialize stats counter
function initializeStatsCounter() {
  const stats = document.querySelectorAll("[data-target]");

  stats.forEach((stat) => {
    const target = parseFloat(stat.getAttribute("data-target"));
    const suffix = stat.textContent.includes("%") ? "%" : "";
    const isDecimal = target % 1 !== 0;

    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      innerHTML: target,
      duration: 2,
      ease: "power2.out",
      snap: { innerHTML: isDecimal ? 0.1 : 1 },
      onUpdate: function () {
        const currentValue = parseFloat(this.targets()[0].innerHTML);
        this.targets()[0].innerHTML = isDecimal
          ? currentValue.toFixed(1) + suffix
          : Math.floor(currentValue) + suffix;
      },
    });
  });
}

// Initialize product cards
function initializeProductCards() {
  // Product card click handlers
  gsap.utils.toArray(".product-card").forEach((card) => {
    const learnMoreBtn = card.querySelector(".btn-primary");
    const demoBtn = card.querySelector(".btn-outline");

    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const product = card.getAttribute("data-product");
        showProductModal(product);
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const product = card.getAttribute("data-product");
        showDemoModal(product);
      });
    }
  });

  // Pricing button handlers
  gsap.utils.toArray(".pricing-card .btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn
        .closest(".pricing-card")
        .querySelector(".plan-name").textContent;
      handlePricingAction(plan, btn.textContent.trim());
    });
  });
}

// Show product modal
function showProductModal(product) {
  // Create modal content based on product
  const modalContent = getProductModalContent(product);

  // Create and show modal
  const modal = createModal(modalContent);
  document.body.appendChild(modal);

  // Animate modal in
  gsap.fromTo(
    modal,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );
}

// Show demo modal
function showDemoModal(product) {
  const modalContent = `
        <div class="demo-modal">
            <h2>Schedule a Demo</h2>
            <p>Experience ${product} in action with our expert team.</p>
            <form class="demo-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <select required>
                    <option value="">Select Preferred Time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                    <option value="evening">Evening (5 PM - 7 PM)</option>
                </select>
                <button type="submit" class="btn btn-primary">Schedule Demo</button>
            </form>
        </div>
    `;

  const modal = createModal(modalContent);
  document.body.appendChild(modal);

  gsap.fromTo(
    modal,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );
}

// Get product modal content
function getProductModalContent(product) {
  const productData = {
    erp: {
      title: "Enterprise Resource Planning",
      description:
        "Comprehensive ERP solution for seamless business operations.",
      features: [
        "Real-time Analytics Dashboard",
        "Process Automation",
        "Multi-module Integration",
        "Advanced Reporting",
        "Workflow Management",
        "Inventory Control",
      ],
      benefits: [
        "40% increase in operational efficiency",
        "Real-time visibility across all departments",
        "Automated workflow processes",
        "Comprehensive reporting and analytics",
      ],
    },
    cloud: {
      title: "Cloud Infrastructure",
      description: "Scalable cloud platform with enterprise-grade security.",
      features: [
        "Auto-scaling Capabilities",
        "Global CDN Network",
        "99.9% Uptime SLA",
        "Advanced Security",
        "Multi-region Deployment",
        "Real-time Monitoring",
      ],
      benefits: [
        "99.9% guaranteed uptime",
        "Global performance optimization",
        "Enterprise-grade security",
        "Seamless scalability",
      ],
    },
    ai: {
      title: "AI Analytics Platform",
      description: "Advanced AI-powered analytics for predictive insights.",
      features: [
        "Machine Learning Models",
        "Predictive Analytics",
        "Natural Language Processing",
        "Real-time Data Processing",
        "Custom AI Models",
        "Advanced Visualization",
      ],
      benefits: [
        "Predictive business insights",
        "Automated data analysis",
        "Natural language queries",
        "Custom AI model training",
      ],
    },
  };

  const data = productData[product] || productData.erp;

  return `
        <div class="product-modal">
            <h2>${data.title}</h2>
            <p class="modal-description">${data.description}</p>
            
            <div class="modal-features">
                <h3>Key Features</h3>
                <ul>
                    ${data.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="modal-benefits">
                <h3>Business Benefits</h3>
                <ul>
                    ${data.benefits
                      .map((benefit) => `<li>${benefit}</li>`)
                      .join("")}
                </ul>
            </div>
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="scheduleDemo('${product}')">Schedule Demo</button>
                <button class="btn btn-outline" onclick="downloadBrochure('${product}')">Download Brochure</button>
            </div>
        </div>
    `;
}

// Create modal
function createModal(content) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close">&times;</button>
            ${content}
        </div>
    `;

  // Close modal functionality
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal;

  closeBtn.addEventListener("click", () => closeModal(modal));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeModal(modal);
    }
  });

  return modal;
}

// Close modal
function closeModal(modal) {
  gsap.to(modal, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      document.body.removeChild(modal);
    },
  });
}

// Handle pricing actions
function handlePricingAction(plan, action) {
  if (action.includes("Trial")) {
    showTrialModal(plan);
  } else if (action.includes("Contact")) {
    showContactModal(plan);
  } else {
    showPricingModal(plan);
  }
}

// Show trial modal
function showTrialModal(plan) {
  const modalContent = `
        <div class="trial-modal">
            <h2>Start Your Free Trial</h2>
            <p>Get started with ${plan} plan today. No credit card required.</p>
            <form class="trial-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="text" placeholder="Company Name" required>
                <button type="submit" class="btn btn-primary">Start Free Trial</button>
            </form>
        </div>
    `;

  const modal = createModal(modalContent);
  document.body.appendChild(modal);

  gsap.fromTo(
    modal,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );
}

// Show contact modal
function showContactModal(plan) {
  const modalContent = `
        <div class="contact-modal">
            <h2>Contact Sales</h2>
            <p>Get in touch with our sales team to discuss ${plan} plan.</p>
            <form class="contact-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="text" placeholder="Company Name" required>
                <textarea placeholder="Tell us about your requirements..." rows="4"></textarea>
                <button type="submit" class="btn btn-primary">Contact Sales</button>
            </form>
        </div>
    `;

  const modal = createModal(modalContent);
  document.body.appendChild(modal);

  gsap.fromTo(
    modal,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );
}

// Global functions for modal actions
window.scheduleDemo = function (product) {
  showDemoModal(product);
};

window.downloadBrochure = function (product) {
  // Simulate download
  const link = document.createElement("a");
  link.href = `#${product}-brochure`;
  link.download = `${product}-brochure.pdf`;
  link.click();

  // Show success message
  showNotification("Brochure download started!", "success");
};

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  gsap.fromTo(
    notification,
    {
      opacity: 0,
      y: -50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    }
  );

  setTimeout(() => {
    gsap.to(notification, {
      opacity: 0,
      y: -50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        document.body.removeChild(notification);
      },
    });
  }, 3000);
}

// Add CSS for modals and notifications
const modalStyles = `
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 2rem;
}

.modal-container {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #64748b;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: #f1f5f9;
    color: #1a202c;
}

.modal-container h2 {
    color: #1a202c;
    margin-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: 700;
}

.modal-description {
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.modal-features,
.modal-benefits {
    margin-bottom: 2rem;
}

.modal-features h3,
.modal-benefits h3 {
    color: #1a202c;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-features ul,
.modal-benefits ul {
    list-style: none;
    padding: 0;
}

.modal-features li,
.modal-benefits li {
    padding: 0.5rem 0;
    color: #475569;
    position: relative;
    padding-left: 1.5rem;
}

.modal-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
}

.modal-benefits li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.trial-form,
.contact-form,
.demo-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.trial-form input,
.contact-form input,
.contact-form textarea,
.demo-form input,
.demo-form select {
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.trial-form input:focus,
.contact-form input:focus,
.contact-form textarea:focus,
.demo-form input:focus,
.demo-form select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    z-index: 10001;
    border-left: 4px solid #10b981;
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-info {
    border-left-color: #3b82f6;
}

@media (max-width: 768px) {
    .modal-container {
        margin: 1rem;
        padding: 1.5rem;
    }
    
    .modal-actions {
        flex-direction: column;
    }
    
    .notification {
        right: 1rem;
        left: 1rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", modalStyles);
