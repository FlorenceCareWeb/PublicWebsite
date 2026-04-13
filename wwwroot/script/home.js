// HAMBURGER MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

// GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// WAIT FOR DOM AND IMAGES TO BE READY
window.addEventListener('load', function() {
  // HERO TEXT ANIMATION
  gsap.from('.hero-content h1', {
    duration: 0.8,
    opacity: 0,
    x: -50,
    ease: 'power3.out'
  });

  gsap.from('.hero-content p', {
    duration: 0.8,
    opacity: 0,
    x: -50,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.hero-content .cta-button', {
    duration: 0.6,
    opacity: 0,
    delay: 0.4,
    ease: 'power2.out',
    clearProps: 'opacity,transform'
  });

  // HERO IMAGE ANIMATION
  gsap.from('.hero-image', {
    duration: 1,
    opacity: 0,
    x: 80,
    ease: 'power3.out',
    delay: 0.3
  });
});

// HERO IMAGE PARALLAX ON SCROLL
gsap.to('.hero-image', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    markers: false
  },
  y: 50,
  ease: 'none'
});

// FADE UP ANIMATIONS
gsap.utils.toArray('.fade-up, .section h2, .text, .contact-info, .contact-form').forEach((element) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      scrub: false,
      markers: false
    },
    opacity: 0,
    y: 60,
    duration: 0.9,
    ease: 'power3.out'
  });
});

// CARD STAGGER ANIMATIONS
gsap.utils.toArray('.card').forEach((card, index) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card.parentElement,
      start: 'top 75%'
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    delay: index * 0.12,
    ease: 'power3.out'
  });
});

// FOCUS ITEM ANIMATIONS
gsap.utils.toArray('.focus-item, .approach-item, .testimonial, .partner-logo').forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item.parentElement,
      start: 'top 75%'
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    delay: index * 0.1,
    ease: 'power3.out'
  });
});

// IMAGE ANIMATIONS
gsap.utils.toArray('.image, .full-image').forEach((img) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: 'top 75%',
      scrub: false
    },
    opacity: 0,
    scale: 0.95,
    y: 40,
    duration: 1,
    ease: 'power3.out'
  });
});

// STATS COUNTER ANIMATION
gsap.utils.toArray('.stat-item span').forEach((stat) => {
  const text = stat.textContent.trim();
  const number = parseInt(text.replace(/\D/g, ''));
  const suffix = text.replace(/[0-9]/g, '');

  // Skip if number extraction failed
  if (isNaN(number)) return;

  // Animate a counter object instead of textContent directly
  const counter = { value: 0 };

  gsap.to(counter, {
    scrollTrigger: {
      trigger: stat.closest('.stats'),
      start: 'top 65%'
    },
    value: number,
    duration: 2,
    ease: 'power2.out',
    snap: { value: 1 },
    onUpdate: function() {
      stat.textContent = Math.round(counter.value) + suffix;
    }
  });
});

// PARALLAX EFFECT ON HERO
gsap.to('.hero::before', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    markers: false
  },
  yPercent: 40,
  ease: 'none'
});

// IMAGE HOVER ZOOM
document.querySelectorAll('.image img, .full-image img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    gsap.to(img, { scale: 1.05, duration: 0.5, ease: 'power2.out' });
  });
  img.addEventListener('mouseleave', () => {
    gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
  });
});

// SMOOTH SCROLL LINK NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: {
            y: target,
            autoKill: false
          },
          ease: 'power2.inOut'
        });
      }
    }
  });
});

// BUTTON CLICK ANIMATIONS
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  });
});

// FORM SUBMISSION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.cta-button');
    const originalBtnText = submitBtn.textContent;

    try {
      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Create FormData from the form
      const formData = new FormData(this);

      // Send to Google Apps Script
      const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      // Show success message (no-cors mode doesn't allow reading response body)
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
      formMessage.style.color = '#4CAF50';
      formMessage.style.borderLeft = '4px solid #4CAF50';
      formMessage.textContent = '✓ Message sent successfully! We\'ll contact you soon.';

      // Reset form
      this.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);

    } catch (error) {
      formMessage.style.display = 'block';
      formMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
      formMessage.style.color = '#F44336';
      formMessage.style.borderLeft = '4px solid #F44336';
      formMessage.textContent = '✗ Error sending message. Please try again.';
      console.error('Form submission error:', error);
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// FLOATING CALL BUTTON
const floatingCallBtn = document.getElementById('floatingCallBtn');
if (floatingCallBtn) {
  floatingCallBtn.addEventListener('click', () => {
    window.location.href = 'tel:+447767178655';
  });
}