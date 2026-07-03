/* =============================================
   HIMANSHU SINGH PORTFOLIO - JAVASCRIPT
   Interactions, Animations, Particles
   ============================================= */

'use strict';

// Force browser to top on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// ============================================
// LOADER
// ============================================
window.addEventListener('load', () => {
  const loaderText = document.getElementById('loader-text');
  const leftTerminal = document.getElementById('left-terminal');
  const rightTerminal = document.getElementById('right-terminal');

  const statuses = [
    'Initializing Core Systems...',
    'Loading AI/ML Models...',
    'Configuring User Interface...',
    'Establishing Secure Connection...',
    'Portfolio Ready!'
  ];

  const leftLogs = [
    'SYS: Initializing bootloader v4.0.1...',
    'SYS: Memory Check: 16384MB RAM - OK',
    'SYS: GPU: NVIDIA CUDA Core v12.2',
    'SYS: CUDA Cores: 10420, VRAM: 16GB',
    'SYS: Loading PyTorch Deep Learning core...',
    'SYS: Loading TensorFlow core libraries...',
    'SYS: Spawning sub-process instances...',
    'MOD: Fetching ResNet pre-trained weights...',
    'MOD: Weights loaded successfully. (SHA256 OK)',
    'MOD: Initializing BERT-tokenizer configs...',
    'MOD: Tokenizer loaded. Volatility threshold: 0.15',
    'DB: Connection active: pgsql://localhost:5432',
    'NET: Checking WebSocket handshake response...',
    'NET: Server latency: 14ms (Optimal)',
    'NET: Secure tunnel connection established.',
    'UI: Activating GPU hardware acceleration...',
    'UI: Parsing theme variables & design tokens...',
    'UI: Rendering CSS glassmorphism grids...',
    'UI: Binding particle canvas interactive events...',
    'UI: Layout node architecture compiled.',
    'SYS: All systems nominal. Launching...'
  ];

  const rightLogs = [
    '0x00FF8C: [NEURAL LAYER BUILDER]',
    'input_tensor: shape [batch_size, 3, 224, 224]',
    'layer_1: Conv2D(3, 64, kernel=7, stride=2)',
    'layer_1_act: LeakyReLU(0.2) -> MaxPool2D(3, 2)',
    'layer_2: ResBlock(64, 64, stride=1)',
    'layer_3: ResBlock(64, 128, stride=2)',
    'layer_4: ResBlock(128, 256, stride=2)',
    'layer_5: ResBlock(256, 512, stride=2)',
    'pooling_node: AdaptiveAvgPool2d(1, 1)',
    'fc_layer: Linear(512, 10) -> Softmax()',
    'optimizer_node: Adam(lr=0.001, beta1=0.9)',
    'loss_function: CrossEntropyLoss()',
    'epoch: 001/100 | training_loss: 0.8934',
    'epoch: 025/100 | training_loss: 0.3421',
    'epoch: 050/100 | training_loss: 0.1284',
    'epoch: 075/100 | training_loss: 0.0452',
    'epoch: 100/100 | training_loss: 0.0019',
    'metrics: train_acc=99.82%, test_acc=98.74%',
    'metrics: F1-score=0.986, AUC-ROC=0.992',
    'STATE: Weights optimization finalized.'
  ];
  
  if (loaderText) {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < statuses.length - 1) {
        currentIdx++;
        loaderText.textContent = statuses[currentIdx];
      } else {
        clearInterval(interval);
      }
    }, 340);
  }

  const leftLogsStream = document.getElementById('left-logs-stream');
  const rightLogsStream = document.getElementById('right-logs-stream');

  if (leftLogsStream && rightLogsStream) {
    let logIdx = 0;
    const logInterval = setInterval(() => {
      if (logIdx < leftLogs.length || logIdx < rightLogs.length) {
        if (leftLogs[logIdx]) {
          const p = document.createElement('div');
          p.className = 'terminal-line';
          p.textContent = leftLogs[logIdx];
          leftLogsStream.appendChild(p);
          leftLogsStream.scrollTop = leftLogsStream.scrollHeight;
          
          const mobileLogsStream = document.getElementById('mobile-logs-stream');
          if (mobileLogsStream) {
            const pm = document.createElement('div');
            pm.className = 'terminal-line';
            pm.textContent = leftLogs[logIdx];
            mobileLogsStream.appendChild(pm);
            mobileLogsStream.scrollTop = mobileLogsStream.scrollHeight;
          }
        }
        if (rightLogs[logIdx]) {
          const p = document.createElement('div');
          p.className = 'terminal-line';
          p.textContent = rightLogs[logIdx];
          rightLogsStream.appendChild(p);
          rightLogsStream.scrollTop = rightLogsStream.scrollHeight;
        }
        logIdx++;
      } else {
        clearInterval(logInterval);
      }
    }, 65);
  }

  // Live Oscilloscope Canvas Drawing Loop
  function initOscilloscope(canvasId) {
    const oscCanvas = document.getElementById(canvasId);
    if (!oscCanvas) return;
    const ctx = oscCanvas.getContext('2d');
    let offset = 0;
    function drawOscilloscope() {
      if (document.getElementById('loader').classList.contains('hidden')) return;
      ctx.clearRect(0, 0, oscCanvas.width, oscCanvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 0.5;
      for (let x = 20; x < oscCanvas.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, oscCanvas.height); ctx.stroke();
      }
      for (let y = 15; y < oscCanvas.height; y += 15) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(oscCanvas.width, y); ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < oscCanvas.width; x++) {
        const y = oscCanvas.height / 2 + Math.sin(x * 0.045 + offset) * 16 * Math.sin(x * 0.008 + offset * 0.25);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      offset += 0.12;
      requestAnimationFrame(drawOscilloscope);
    }
    drawOscilloscope();
  }
  initOscilloscope('oscilloscope');
  initOscilloscope('oscilloscope-m');

  // Live Fluctuating Metrics (CPU, RAM, GPU)
  const cpuBar = document.getElementById('cpu-bar');
  const ramBar = document.getElementById('ram-bar');
  const gpuBar = document.getElementById('gpu-bar');
  const cpuVal = document.getElementById('cpu-val');
  const ramVal = document.getElementById('ram-val');
  const gpuVal = document.getElementById('gpu-val');

  const cpuBarM = document.getElementById('cpu-bar-m');
  const ramBarM = document.getElementById('ram-bar-m');
  const cpuValM = document.getElementById('cpu-val-m');
  const ramValM = document.getElementById('ram-val-m');

  const metricInterval = setInterval(() => {
    if (document.getElementById('loader').classList.contains('hidden')) {
      clearInterval(metricInterval);
      return;
    }
    const cpu = Math.floor(Math.random() * 25) + 55; // 55% - 80%
    const ram = Math.min(Math.floor(Math.random() * 4) + 76, 99); // 76% - 80%
    const gpu = Math.floor(Math.random() * 20) + 65; // 65% - 85%

    if (cpuBar) cpuBar.style.width = cpu + '%';
    if (ramBar) ramBar.style.width = ram + '%';
    if (gpuBar) gpuBar.style.width = gpu + '%';

    if (cpuBarM) cpuBarM.style.width = cpu + '%';
    if (ramBarM) ramBarM.style.width = ram + '%';

    if (cpuVal) cpuVal.textContent = cpu + '%';
    if (ramVal) ramVal.textContent = ram + '%';
    if (gpuVal) gpuVal.textContent = gpu + '%';

    if (cpuValM) cpuValM.textContent = cpu + '%';
    if (ramValM) ramValM.textContent = ram + '%';
  }, 100);

  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    clearInterval(metricInterval);
    
    // Trigger Anime.js Intro Sequence if anime is available
    if (typeof anime !== 'undefined') {
      playIntroAnimation();
    } else {
      // Fallback
      document.querySelectorAll('[data-aos]').forEach(el => checkAOS(el));
    }
  }, 1800);
});

// ============================================
// PARTICLE CANVAS
// ============================================
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  let animId;

  const maxNodesPool = 220; // Optimal balance of density and performance
  const connectionDistance = 180; // Increased so more lines draw
  const mouseInteractionDistance = 280; // Increased for higher sensitivity

  const colorBg = '#0a0a0f';
  const colorPrimary = '#2563eb';
  const colorAccent = '#06b6d4';

  let nodes = [];
  let dataPackets = [];
  let sonarPings = [];
  let binaryTrails = [];

  let mouse = { x: -1000, y: -1000 };
  let targetScrollY = window.scrollY || 0;
  let currentScrollY = window.scrollY || 0;

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
  window.addEventListener('click', (e) => {
    sonarPings.push({ x: e.clientX, y: e.clientY, radius: 0, maxRadius: 400, alpha: 0.8 });
  });

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    for (let i = 0; i < maxNodesPool; i++) {
      const layer = Math.random() < 0.3 ? 0 : Math.random() < 0.6 ? 1 : 2;
      let radius, speedMult;
      if (layer === 0) { radius = 0.5; speedMult = 0.1; } // Slower
      else if (layer === 1) { radius = 1.0; speedMult = 0.3; }
      else { radius = 1.5; speedMult = 0.5; }

      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speedMult,
        vy: (Math.random() - 0.5) * speedMult,
        radius: radius,
        baseRadius: radius,
        layer: layer,
        flare: 0
      });
    }
  }

  function init() {
    resize();
    window.addEventListener('resize', resize);
  }

  function animate() {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    let maxScroll = scrollHeight - window.innerHeight;
    if (maxScroll < 1) maxScroll = 1;
    
    // Lerp scroll for inertia - increased multiplier for higher sensitivity
    currentScrollY += (targetScrollY - currentScrollY) * 0.15;
    let scrollVelocity = (targetScrollY - currentScrollY) * 0.15;
    let scrollProgress = currentScrollY / maxScroll;

    ctx.fillStyle = colorBg;
    ctx.fillRect(0, 0, W, H);

    // Update & Draw Sonar Pings
    for (let i = sonarPings.length - 1; i >= 0; i--) {
      let p = sonarPings[i];
      p.radius += 6;
      p.alpha -= 0.015;
      
      if (p.alpha <= 0) {
        sonarPings.splice(i, 1);
        continue;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(216, 180, 254, ${p.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Update & Draw Binary Trails
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    for (let i = binaryTrails.length - 1; i >= 0; i--) {
      let b = binaryTrails[i];
      b.y += b.vy;
      b.alpha -= 0.02;
      
      if (b.alpha <= 0) {
        binaryTrails.splice(i, 1);
        continue;
      }
      
      ctx.fillStyle = `rgba(129, 140, 248, ${b.alpha})`;
      ctx.fillText(b.char, b.x, b.y);
    }

    let activeNodes = maxNodesPool; // Always draw all nodes for maximum density!

    // Update & Draw Nodes
    for (let i = 0; i < Math.min(nodes.length, activeNodes); i++) {
      let n1 = nodes[i];
      
      // Much gentler parallax intensity
      let parallaxVy = -scrollVelocity * (n1.layer === 2 ? 0.3 : (n1.layer === 1 ? 0.15 : 0.05));
      
      n1.x += n1.vx;
      n1.y += n1.vy + parallaxVy;

      if (n1.x < -10) n1.x = W + 10;
      if (n1.x > W + 10) n1.x = -10;
      if (n1.y < -10) n1.y = H + 10;
      if (n1.y > H + 10) n1.y = -10;
      
      // Decay flare
      if (n1.flare > 0) n1.flare -= 0.02;
      else n1.flare = 0;

      // Check Sonar Intersections
      for (let p of sonarPings) {
        let dx = n1.x - p.x;
        let dy = n1.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist - p.radius) < 10) {
          n1.flare = 1;
        }
      }

      // Mouse interaction
      if (mouse.x !== -1000) {
        let dx = n1.x - mouse.x;
        let dy = n1.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseInteractionDistance) {
          let force = (mouseInteractionDistance - dist) / mouseInteractionDistance;
          if (n1.layer === 2) {
            // Increased repulsion force significantly for higher sensitivity
            let pushX = (dx / dist) * force * 5;
            let pushY = (dy / dist) * force * 5;
            n1.x += pushX;
            n1.y += pushY;
            
            if (force > 0.4 && Math.random() < 0.15) {
              binaryTrails.push({
                x: n1.x, y: n1.y,
                char: Math.random() > 0.5 ? '0' : '1',
                alpha: 0.8,
                vy: (Math.random() - 0.5) * 0.5 - 0.5
              });
            }
          } else if (n1.layer === 0) {
            // Background nodes get drawn IN instead of repelled
            n1.x -= (dx / dist) * force * 0.8;
            n1.y -= (dy / dist) * force * 0.8;
          }
        }
      }

      // Drawing node (with Depth Scale and Warp effect)
      let depthScale = 1 + (scrollProgress * (n1.layer === 0 ? 0.8 : 0));
      let currentRadius = (n1.baseRadius + (n1.flare * 2)) * depthScale;
      let opacity = 0.15 + (n1.layer * 0.1) + (n1.flare * 0.6);
      
      // Gentle elongation warp based on velocity
      let stretchY = 1 + Math.abs(parallaxVy) * 0.1;
      
      ctx.beginPath();
      ctx.ellipse(n1.x, n1.y, currentRadius, currentRadius * stretchY, 0, 0, Math.PI * 2);
      
      if (n1.flare > 0) {
        ctx.fillStyle = `rgba(216, 180, 254, ${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = colorAccent;
      } else {
        ctx.fillStyle = `rgba(129, 140, 248, ${opacity})`;
        if (n1.layer === 0) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = colorPrimary;
        } else {
          ctx.shadowBlur = 0;
        }
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connections
      for (let j = i + 1; j < Math.min(nodes.length, activeNodes); j++) {
        let n2 = nodes[j];
        if (Math.abs(n1.layer - n2.layer) > 1) continue;

        let dx = n1.x - n2.x;
        let dy = n1.y - n2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          
          let alpha = (1 - dist / connectionDistance) * 0.2;
          if (n1.flare > 0 || n2.flare > 0) alpha += 0.2;
          
          ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.lineWidth = 0.5 + (n1.layer * 0.2);
          ctx.stroke();

          // Spawn Data Packet - frequency scales with scroll
          let activePacketChance = 0.0002 + (scrollProgress * 0.0008);
          if (Math.random() < activePacketChance) {
            dataPackets.push({
              x: n1.x, y: n1.y,
              target: n2,
              progress: 0,
              speed: Math.random() * 0.02 + 0.02
            });
          }
        }
      }
    }

    // Update & Draw Data Packets
    for (let i = dataPackets.length - 1; i >= 0; i--) {
      let p = dataPackets[i];
      p.progress += p.speed;
      
      if (p.progress >= 1) {
        dataPackets.splice(i, 1);
        continue;
      }

      let curX = p.x + (p.target.x - p.x) * p.progress;
      let curY = p.y + (p.target.y - p.y) * p.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(216, 180, 254, 0.9)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = colorAccent;
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    animId = requestAnimationFrame(animate);
  }

  init();
  animate();
  // Removed buggy resize listener that cancelled animation
})();

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
// ============================================
// SYSTEM STATUS PILL - DYNAMIC DATA
// ============================================
  const uptimeDisplay = document.getElementById('uptime-display');
  const tempDisplay = document.getElementById('temp-display');
  const fpsDisplay = document.getElementById('fps-display');
  
  // 1. Uptime Counter (Real uptime since page load)
  if (uptimeDisplay) {
    let uptimeSeconds = 0;
    setInterval(() => {
      uptimeSeconds++;
      
      let displayTime = '';
      if (uptimeSeconds >= 60) {
        const mins = Math.floor(uptimeSeconds / 60);
        const secs = uptimeSeconds % 60;
        displayTime = `${mins}m ${secs}s`;
      } else {
        displayTime = `${uptimeSeconds}s`;
      }
      uptimeDisplay.textContent = `Uptime ${displayTime}`;
    }, 1000);
  }

  // 2. Temp Fluctuation (Realistic CPU temp walk)
  if (tempDisplay) {
    let currentTemp = 32.5; // Start in the middle
    setInterval(() => {
      // Move up or down by a maximum of 0.8 degrees
      const change = (Math.random() * 1.6) - 0.8;
      currentTemp += change;
      
      // Clamp between 30.0 and 35.0
      if (currentTemp > 35.0) currentTemp = 35.0;
      if (currentTemp < 30.0) currentTemp = 30.0;
      
      tempDisplay.textContent = `Temp ${currentTemp.toFixed(1)}°C`;
    }, 4500); // update every 4.5 seconds for slower, realistic changes
  }

  // 3. FPS Fluctuation (Simulated active render frames)
  if (fpsDisplay) {
    setInterval(() => {
      // Fluctuate FPS slightly between 57 and 62 to make it look active
      // Actual requestAnimationFrame gets locked to a solid 60 on most modern screens
      const newFps = Math.floor(Math.random() * (62 - 57 + 1)) + 57;
      fpsDisplay.textContent = `Render ${newFps} fps`;
    }, 1200); // Update every 1.2 seconds for realistic fluctuation
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

// ============================================
// 3D CREATOR - VANILLA JS ANIMATIONS
// ============================================

// 2. Scroll-driven Text Reveal
const scrollTextGroups = [];

document.querySelectorAll('.animated-text-container').forEach(container => {
  // Recursively wrap characters in spans, preserving HTML structure
  function wrapCharacters(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const fragment = document.createDocumentFragment();
      text.split('').forEach(char => {
        if (char === ' ') {
          fragment.appendChild(document.createTextNode(' '));
        } else {
          const span = document.createElement('span');
          span.textContent = char;
          span.classList.add('animated-text-char');
          // If the text is inside a strong tag, add a special class to guarantee styling
          if (node.parentNode && (node.parentNode.tagName === 'STRONG' || node.parentNode.tagName === 'B')) {
            span.classList.add('highlight-char');
          }
          fragment.appendChild(span);
        }
      });
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(wrapCharacters);
    }
  }
  
  Array.from(container.childNodes).forEach(wrapCharacters);

  const chars = Array.from(container.querySelectorAll('.animated-text-char'));
  scrollTextGroups.push({
    container: container,
    chars: chars,
    total: chars.length
  });
});

function handleTextScrollScrub() {
  const windowHeight = window.innerHeight;
  scrollTextGroups.forEach(group => {
    const rect = group.container.getBoundingClientRect();
    
    // Start revealing when the element's top is 85% down the viewport
    // Finish revealing when the element's top reaches 40% of the viewport
    const startY = windowHeight * 0.85; 
    const endY = windowHeight * 0.40;   
    
    let progress = (startY - rect.top) / (startY - endY);
    progress = Math.max(0, Math.min(1, progress));
    
    const charsToReveal = Math.floor(progress * group.total);
    
    group.chars.forEach((char, i) => {
      // Small math tweak to create a slight "fade" trailing edge instead of a hard cut off
      const fadeDist = 5;
      if (i < charsToReveal) {
        char.style.opacity = '1';
      } else if (i < charsToReveal + fadeDist) {
        char.style.opacity = (1 - ((i - charsToReveal) / fadeDist)).toString();
      } else {
        char.style.opacity = '0.2';
      }
    });
  });
}

window.addEventListener('scroll', handleTextScrollScrub);
handleTextScrollScrub(); // trigger immediately on load

// 3. Sticky Project Cards
const stickyCards = document.querySelectorAll('.sticky-project');
window.addEventListener('scroll', () => {
  stickyCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    // When the card hits the top of the viewport
    if (rect.top <= 100) { // Assuming 100px is the top sticky offset
      card.style.top = `${100 + (index * 20)}px`;
      // Optional scale down
      const maxScaleDown = 0.95;
      const progress = Math.min(1, Math.max(0, -rect.top / 500));
      const scale = 1 - (progress * (1 - maxScaleDown));
      card.style.transform = `scale(${scale})`;
    } else {
      card.style.transform = `scale(1)`;
    }
  });
});

// ============================================
// NEW ANIMATIONS: Custom Cursor, Scroll Bar, Tilt, Parallax
// ============================================



// Scroll Progress Bar (Smooth LERP)
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  let targetProgress = 0;
  let currentProgress = 0;
  
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetProgress = (window.scrollY / totalHeight) * 100;
  }, { passive: true });

  function updateScrollProgress() {
    // LERP formula for buttery smoothness
    currentProgress += (targetProgress - currentProgress) * 0.1;
    scrollProgress.style.width = `${currentProgress}%`;
    requestAnimationFrame(updateScrollProgress);
  }
  
  // Start the animation loop
  updateScrollProgress();
}



// 3D Glass Card Tilt Effect
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (-10 to 10 degrees)
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    card.classList.add('is-tilting');
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Update CSS variables for dynamic glare effect
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTimeout(() => {
      card.classList.remove('is-tilting');
    }, 300);
  });
});

// Background Parallax
const bgOrb = document.querySelector('.bg-orb');
if (bgOrb) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    bgOrb.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.3}px)`;
  });
}

// Premium Scroll Reveals (Staggered Cascade)
const revealOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

let delayCounter = 0;
let resetTimer = null;

const cascadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add staggered delay based on how many elements are entering at once
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delayCounter * 120); // 120ms stagger between elements
      
      delayCounter++;
      observer.unobserve(entry.target);
      
      // Reset the counter if no new elements intersect for a while
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        delayCounter = 0;
      }, 50);
    }
  });
}, revealOptions);

document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
  cascadeObserver.observe(el);
});

// ============================================
// ANIME.JS COMPLEX ANIMATIONS
// ============================================
function playIntroAnimation() {
  // Hide elements initially to prevent FOUC before animation
  const navLinksList = document.querySelectorAll('.nav-link');
  const heroHeading = document.querySelector('.hero-heading');
  const heroTags = document.querySelectorAll('.hero-title-wrap, .hero-tagline');
  const heroBtns = document.querySelectorAll('.hero-cta .btn');
  const heroStats = document.querySelectorAll('.hero-stats > *');
  const heroVisual = document.querySelector('.hero-visual');
  const badges = document.querySelectorAll('.profile-badge');

  // We temporarily disable AOS for these so Anime.js can take full control
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.removeAttribute('data-aos');
  }
  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.removeAttribute('data-aos');
  }

  // Hide all animated children immediately and disable their CSS transitions to prevent lag
  anime.set([navLinksList, heroHeading, heroTags, heroBtns, heroStats, badges], { opacity: 0, transition: 'none' });

  // Create a stunning timeline
  const tl = anime.timeline({
    easing: 'easeOutExpo',
    begin: function() {
      if (heroContent) heroContent.style.opacity = '1';
      if (heroVisual) heroVisual.style.opacity = '1';
    },
    complete: function() {
      // Re-enable CSS transitions after animation finishes
      anime.set([navLinksList, heroHeading, heroTags, heroBtns, heroStats, badges], { transition: '' });
    }
  });

  // 1. Reveal Navbar Links (staggered drop)
  if (navLinksList.length > 0) {
    tl.add({
      targets: navLinksList,
      translateY: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(20),
      duration: 400
    });
  }

  // 2. Reveal Hero Name (elastic scale & slide)
  if (heroHeading) {
    tl.add({
      targets: heroHeading,
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 500
    }, '-=300');
  }

  // 3. Reveal Hero Tags
  if (heroTags.length > 0) {
    tl.add({
      targets: heroTags,
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(40),
      duration: 400
    }, '-=400');
  }

  // 4. Reveal CTA Buttons
  if (heroBtns.length > 0) {
    tl.add({
      targets: heroBtns,
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: anime.stagger(40),
      duration: 400
    }, '-=300');
  }

  // 5. Hero Stats Pop
  if (heroStats.length > 0) {
    tl.add({
      targets: heroStats,
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(40),
      duration: 400
    }, '-=300');
  }

  // 6. Reveal Visual (Image and Pill)
  if (heroVisual) {
    tl.add({
      targets: heroVisual,
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutExpo'
    }, '-=400');
  }

  // 7. Floating Badges Staggered Pop
  if (badges.length > 0) {
    tl.add({
      targets: badges,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'spring(1, 80, 12, 0)'
    }, '-=400');
  }

  // After intro, trigger any remaining AOS elements that might be visible
  setTimeout(() => {
    document.querySelectorAll('[data-aos]').forEach(el => checkAOS(el));
  }, 1000);
}

// ============================================
// HORIZONTAL SHOWCASE SCROLL LOGIC
// ============================================
const showcaseSpacer = document.querySelector('.showcase-scroll-spacer');
const showcaseTrack = document.getElementById('showcaseTrack');
const showcaseCards = document.querySelectorAll('.showcase-card');
const showcaseDots = document.querySelectorAll('.showcase-dot');
const showcaseCurrent = document.getElementById('showcaseCurrent');
const showcaseTotal = document.getElementById('showcaseTotal');

if (showcaseSpacer && showcaseTrack && showcaseCards.length > 0) {
  let scrollTarget = 0;
  let scrollCurrent = 0;
  let showcaseRafId = null;

  // Set total cards
  if (showcaseTotal) {
    showcaseTotal.textContent = String(showcaseCards.length).padStart(2, '0');
  }

  function renderShowcase() {
    // Lerp for smooth inertia
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.1;
    
    // Translate the track horizontally
    // Negative scrollCurrent means it moves left as you scroll down
    showcaseTrack.style.transform = `translate3d(${-scrollCurrent}px, 0, 0)`;

    // Determine the active card based on center screen distance
    const trackRect = showcaseTrack.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    
    let closestCardIndex = 0;
    let minDistance = Infinity;

    showcaseCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + (rect.width / 2);
      const distance = Math.abs(centerX - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestCardIndex = index;
      }
    });

    // Update active classes
    showcaseCards.forEach((card, index) => {
      if (index === closestCardIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // Update dots
    if (showcaseDots.length === showcaseCards.length) {
      showcaseDots.forEach((dot, index) => {
        if (index === closestCardIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Update current text
    if (showcaseCurrent) {
      showcaseCurrent.textContent = String(closestCardIndex + 1).padStart(2, '0');
    }

    showcaseRafId = requestAnimationFrame(renderShowcase);
  }

  window.addEventListener('scroll', () => {
    const spacerRect = showcaseSpacer.getBoundingClientRect();
    const scrollStart = spacerRect.top;
    
    // We only care when the top of the spacer hits the top of the viewport (scrollStart <= 0)
    // and until the bottom of the spacer leaves the bottom of the viewport
    if (scrollStart <= 0 && spacerRect.bottom >= window.innerHeight) {
      // Calculate how far we've scrolled inside the spacer
      const scrollProgress = -scrollStart / (spacerRect.height - window.innerHeight);
      
      // Calculate the maximum horizontal translation needed
      // Track width minus viewport width (plus some padding to allow the last card to center)
      const maxTranslateX = showcaseTrack.scrollWidth - window.innerWidth;
      
      scrollTarget = scrollProgress * maxTranslateX;
    } else if (scrollStart > 0) {
      scrollTarget = 0;
    } else if (spacerRect.bottom < window.innerHeight) {
      scrollTarget = showcaseTrack.scrollWidth - window.innerWidth;
    }
  });

  // Start the animation loop
  renderShowcase();
}

// ============================================
// EXPERIENCE CARD SCROLL HIGHLIGHT LOGIC
// ============================================
const xpItems = document.querySelectorAll('.xp-item');
if (xpItems.length > 0) {
  function updateXpItems() {
    const centerY = window.innerHeight / 2;
    xpItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenterY = rect.top + (rect.height / 2);
      
      // Calculate distance from center of viewport
      const distance = Math.abs(centerY - itemCenterY);
      
      // Activate if within 35% of the viewport height from the center
      if (distance < window.innerHeight * 0.35) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateXpItems, { passive: true });
  window.addEventListener('resize', updateXpItems, { passive: true });
  
  // Initial check on load
  setTimeout(updateXpItems, 500);
}
