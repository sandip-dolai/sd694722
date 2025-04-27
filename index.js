document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // Vanilla Tilt for Cards
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });
  
    // Fade-In Animation for Sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    sections.forEach((section) => {
      section.classList.add('opacity-0', 'transition-opacity', 'duration-1000');
      observer.observe(section);
    });
  
    // Typewriter Effect
    const typewriter = document.getElementById('typewriter');
    const phrases = ['Junior Software Developer', 'Python Enthusiast', 'Django Developer', 'Web Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex++);
        if (charIndex > currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 1500);
        } else {
          setTimeout(type, 100);
        }
      } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, 50);
        }
      }
    }
    type();
  
    // Particle Animation (Starry Effect)
    const particleCanvas = document.getElementById('particles');
    const particleCtx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  
    const particlesArray = [];
    const numberOfParticles = 150;
  
    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.05;
        if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
      }
      draw() {
        particleCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        particleCtx.beginPath();
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particleCtx.fill();
      }
    }
  
    function initParticles() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
  
    function animateParticles() {
      particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.1) {
          particlesArray.splice(i, 1);
          particlesArray.push(new Particle());
          i--;
        }
      }
      requestAnimationFrame(animateParticles);
    }
  
    initParticles();
    animateParticles();
  
    // Audio Control
    const audio = document.getElementById('space-audio');
    const audioToggle = document.getElementById('audio-toggle');
    let isPlaying = true;
  
    audio.volume = 0.02;
    audio.play().catch(() => {
      isPlaying = false;
      audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    });
  
    audioToggle.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isPlaying = false;
      } else {
        audio.play();
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
      }
    });
  
    window.addEventListener('resize', () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    });
  });
  
  // Add fade-in class in CSS via Tailwind
  document.head.insertAdjacentHTML(
    'beforeend',
    '<style>.fade-in { opacity: 1 !important; }</style>'
  );
