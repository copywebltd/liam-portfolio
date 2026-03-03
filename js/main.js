/* ===========================================
   Liam Petersen Portfolio | AI Interactions
   =========================================== */

(function () {
  'use strict';

  // ===== NEURAL NETWORK BACKGROUND =====
  const canvas = document.getElementById('neural-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 150;
    const PARTICLE_OPACITY = 0.35;
    const LINE_OPACITY = 0.08;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = LINE_OPACITY * (1 - dist / CONNECTION_DIST);
            ctx.strokeStyle = 'rgba(37, 99, 235, ' + opacity + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = 'rgba(37, 99, 235, ' + PARTICLE_OPACITY + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });
  }

  // ===== TYPING EFFECT =====
  const typingTarget = document.getElementById('typingTarget');
  if (typingTarget) {
    var text = "I build human-in-the-loop AI systems that drive revenue for 7-figure brands. Automate 90% of the work, keep the human skill in charge.";
    var index = 0;
    var speed = 25;

    function type() {
      if (index < text.length) {
        typingTarget.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        typingTarget.classList.add('done');
      }
    }

    // Start typing after a short delay
    setTimeout(type, 800);
  }

  // ===== SCROLL REVEAL =====
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ===== STATS COUNTER =====
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  var statsAnimated = false;

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var duration = 1500;
    var startTime = performance.now();

    function update(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  var statsSection = document.getElementById('stats');

  if (statsSection) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(function (el) {
              animateCounter(el);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statsObserver.observe(statsSection);
  }

  // ===== PROJECT CARD EXPAND/COLLAPSE =====
  var projectHeaders = document.querySelectorAll('.project-header');

  projectHeaders.forEach(function (header) {
    header.addEventListener('click', function () {
      var card = header.closest('.project-card');
      var isExpanded = card.classList.contains('expanded');

      // Close all other cards
      document.querySelectorAll('.project-card.expanded').forEach(function (openCard) {
        if (openCard !== card) {
          openCard.classList.remove('expanded');
          openCard.querySelector('.project-header').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this card
      card.classList.toggle('expanded');
      header.setAttribute('aria-expanded', String(!isExpanded));
    });

    // Keyboard support
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // ===== CV DOWNLOAD PLACEHOLDER =====
  var cvBtn = document.getElementById('cvDownload');
  if (cvBtn) {
    cvBtn.addEventListener('click', function (e) {
      // When CV PDF is ready, replace this with: window.open('Liam-Petersen-CV.pdf')
      e.preventDefault();
      alert('CV download will be available soon. For now, email liam@copyweb.io');
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.getElementById('nav').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        closeMobileNav();
      }
    });
  });

  // ===== MOBILE NAV TOGGLE =====
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMobileNav() {
    if (navToggle && navLinks) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on outside click
  document.addEventListener('click', function (e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!e.target.closest('.nav')) {
        closeMobileNav();
      }
    }
  });
})();
