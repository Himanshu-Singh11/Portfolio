/* =============================================
   HIMANSHU SINGH PORTFOLIO - JAVASCRIPT
   Interactions, Animations, Particles
   ============================================= */

'use strict';

// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
  const bootScreen = document.getElementById('boot-screen');
  const progressFill = document.getElementById('boot-progress-fill');
  const percentText = document.getElementById('boot-percent');
  
  if (bootScreen && progressFill) {
    let progress = 0;
    const bootInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) progress = 100;
      
      progressFill.style.width = progress + '%';
      if (percentText) percentText.textContent = Math.floor(progress) + '%';
      
      if (progress === 100) {
        clearInterval(bootInterval);
        setTimeout(() => {
          bootScreen.classList.add('hidden');
          
          // Trigger initial AOS
          document.querySelectorAll('[data-aos]').forEach(el => {
            checkAOS(el);
          });
          
          setTimeout(() => {
            bootScreen.remove();
          }, 800);
        }, 500);
      }
    }, 150);
  }
});

// ============================================
// PARTICLE CANVAS - 3D GLOBE & BACKGROUND
// ============================================
// ============================================
// VANTA.JS 3D GLOBE BACKGROUND
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  if (typeof VANTA !== 'undefined') {
    VANTA.GLOBE({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x00ff80,
      color2: 0xa855f7,
      size: 1.20,
      backgroundColor: 0x09090b
    });
  }
});

// ============================================
// NAVBAR – scroll + mobile toggle
// ============================================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }
      updateActiveNav();
      toggleScrollIndicator();
      toggleBackToTop();
      triggerSkillBars();
      triggerAOS();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    navbar?.classList.toggle('menu-open');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    navbar?.classList.remove('menu-open');
  });
});

// ============================================
// ACTIVE NAV LINK on scroll
// ============================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (navLink) {
      navLink.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ============================================
// SCROLL INDICATOR
// ============================================
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });
}
function toggleScrollIndicator() {
  scrollIndicator?.classList.toggle('hidden', window.scrollY > 100);
}

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('back-to-top');
function toggleBackToTop() {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
}
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// TYPED TEXT ANIMATION
// ============================================
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const texts = [
    'an AI/ML Enthusiast',
    'a Developer',
    'a Student'
  ];
  let textIdx = 0, charIdx = 0, deleting = false;
  const TYPING_SPEED  = 85;
  const DELETING_SPEED = 45;
  const PAUSE_AFTER   = 1800;

  function type() {
    const current = texts[textIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? DELETING_SPEED : TYPING_SPEED);
  }
  setTimeout(type, 500);
})();

// ============================================
// SKILL BARS ANIMATION
// ============================================
let skillsBarsTriggered = false;
function triggerSkillBars() {
  if (skillsBarsTriggered) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    skillsBarsTriggered = true;
    document.querySelectorAll('.skill-bar').forEach((bar, i) => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, i * 60);
    });
  }
}

// ============================================
// AOS (SCROLL REVEAL) CUSTOM
// ============================================
function checkAOS(el) {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.92) {
    const delay = parseFloat(el.getAttribute('data-aos-delay') || 0);
    setTimeout(() => el.classList.add('aos-animate'), delay);
  }
}

function triggerAOS() {
  document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(checkAOS);
}

// Run on load
setTimeout(triggerAOS, 200);

// ============================================
// CONTACT FORM — Web3Forms integration
// ============================================
const WEB3FORMS_ACCESS_KEY = '30d8bcf3-f33a-4c2d-ba17-c613460b8a90';

const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');
const submitBtn   = document.getElementById('form-submit-btn');

function showFormStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
  setTimeout(() => { formStatus.className = 'form-status'; formStatus.textContent = ''; }, 7000);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormStatus('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('span').textContent = 'Sending…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          subject: subject,
          message: message,
          from_name: 'Himanshu Portfolio Contact'
        })
      });

      const result = await response.json();

      if (response.status === 200) {
        showFormStatus('✅ Message sent! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        console.error('Web3Forms Error:', result);
        showFormStatus(`❌ Failed to send: ${result.message}`, 'error');
      }

    } catch (err) {
      console.error('Fetch error:', err);
      showFormStatus('❌ Failed to send. Please try again later or email directly at himanshujd.0011@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.querySelector('span').textContent = 'Send Message';
    }
  });
}


// ============================================
// SMOOTH HOVER TILT on project cards
// ============================================
document.querySelectorAll('.project-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ============================================
// COUNTER ANIMATION (stats in hero)
// ============================================
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + '+';
    if (start >= target) clearInterval(timer);
  }, 16);
}

// Observe hero stats
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) animateCounter(el, num);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => {
  if (/\d/.test(el.textContent)) statObserver.observe(el);
});

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
  }
});

// ============================================
// CUSTOM INTERACTIVE CURSOR (desktop only)
// ============================================
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'custom-cursor-outline';
  
  document.body.appendChild(dot);
  document.body.appendChild(outline);
  document.body.classList.add('has-custom-cursor');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let outlineX = 0, outlineY = 0;

  // Tracking speed / delay factor (lower = smoother/slower)
  const ease = 0.28;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateCursor() {
    dotX = mouseX;
    dotY = mouseY;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    outlineX += (mouseX - outlineX) * ease;
    outlineY += (mouseY - outlineY) * ease;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover animations on interactive elements
  const hoverTargets = 'a, button, select, input, textarea, .skill-card, .project-card, .achievement-card, .hamburger, .social-icon, .footer-socials a, .back-to-top';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('custom-cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (!e.target.closest(hoverTargets) || (e.relatedTarget && e.relatedTarget.closest(hoverTargets))) {
      document.body.classList.remove('custom-cursor-hover');
    }
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    document.body.classList.add('custom-cursor-click');
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('custom-cursor-click');
  });
}


// ============================================
// INITIAL CALL
// ============================================
triggerSkillBars();
updateActiveNav();

// ============================================
// LAZY IMAGE REVEAL
// ============================================
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      // Fallback: hide broken images gracefully
      img.style.opacity = '0.3';
      img.style.filter = 'grayscale(1)';
    });
  }
});

// ============================================
// VIEW MORE TOGGLE (Certs, Experience)
// ============================================
function toggleTimeline(type) {
  if (type === 'cert') {
    const items = document.querySelectorAll('.cert-item-extra');
    const btn   = document.getElementById('cert-toggle-btn');
    const icon  = document.getElementById('cert-toggle-icon');
    const text  = document.getElementById('cert-toggle-text');
    const open  = items[0]?.classList.contains('show-extra');
    items.forEach(el => el.classList.toggle('show-extra', !open));
    icon.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
    text.textContent = open ? 'View 2 More' : 'Show Less';

  } else if (type === 'xp') {
    const items = document.querySelectorAll('.xp-item-extra');
    const icon  = document.getElementById('xp-toggle-icon');
    const text  = document.getElementById('xp-toggle-text');
    const open  = items[0]?.classList.contains('show-extra');
    items.forEach(el => el.classList.toggle('show-extra', !open));
    icon.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
    text.textContent = open ? 'View 1 More' : 'Show Less';

  } else if (type === 'leader') {
    const items = document.querySelectorAll('.xp-leader-extra');
    const icon  = document.getElementById('leader-toggle-icon');
    const text  = document.getElementById('leader-toggle-text');
    const open  = items[0]?.classList.contains('show-extra');
    items.forEach(el => el.classList.toggle('show-extra', !open));
    if (icon) icon.style.transform = open ? 'rotate(0deg)' : 'rotate(180deg)';
    if (text) text.textContent = open ? 'View 1 More' : 'Show Less';
  }
}

// ============================================
// IMAGE ZOOM MODAL — Single click/tap, smooth CSS transition
// ============================================
(function initImageZoom() {
  const modal     = document.getElementById('image-zoom-modal');
  const modalImg  = document.getElementById('zoomed-image');
  const captionEl = document.getElementById('zoom-caption');
  const closeBtn  = document.querySelector('.zoom-close');

  if (!modal || !modalImg) return;

  const zoomableImages = document.querySelectorAll(
    '.profile-img, .about-img, .nav-logo img, .footer-logo img'
  );

  function openModal(img) {
    // Reset image so transition fires fresh every time
    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    if (captionEl) captionEl.textContent = img.alt || '';

    // Remove closing class if mid-close
    modal.classList.remove('zoom-closing');

    // Use rAF so browser paints the reset state before adding .show
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('show');
      });
    });

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('zoom-closing');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    // Remove zoom-closing after transition ends
    setTimeout(() => {
      modal.classList.remove('zoom-closing');
    }, 400);
  }

  zoomableImages.forEach(img => {
    img.style.cursor = 'zoom-in';

    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(img);
    });

    // Touch support for mobile — only open on a real tap (not a scroll)
    let touchStartX = 0;
    let touchStartY = 0;

    img.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    img.addEventListener('touchend', (e) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      // Only treat as a tap if the finger barely moved (≤ 10px)
      if (dx <= 10 && dy <= 10) {
        e.preventDefault();
        e.stopPropagation();
        openModal(img);
      }
    }, { passive: false });
  });

  // Close on X button
  closeBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
})();
