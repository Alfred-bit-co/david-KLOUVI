document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLucideIcons();
    initNavbar();
    initTypewriter();
    initStatsCounter();
    initSkillsAnimation();
    initContactForm();
    initBackToTop();
    initScrollIndicator();
    initHeroAnimation();
    
    console.log('%c🔐 David KLOUVI - Cybersécurité Portfolio', 'color: #00e5ff; font-size: 16px; font-weight: bold;');
    console.log('%c$> Pentester & Ethical Hacker in progress', 'color: #00ff9d; font-size: 13px;');
});

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 600);
        });
    }
}

function initLucideIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function initNavbar() {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', navLinks.classList.contains('active') ? 'x' : 'menu');
                initLucideIcons();
            }
        });
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.setAttribute('data-lucide', 'menu');
                initLucideIcons();
            });
        });
    }

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavLink();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = header.offsetHeight;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const headerHeight = document.querySelector('header').offsetHeight;
        if (scrollY >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 45);
        }
    }
    setTimeout(type, 800);
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const step = target / 50;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 30);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    stats.forEach(s => observer.observe(s));
}

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => { bar.style.width = width + '%'; }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormStatus('Veuillez remplir tous les champs.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormStatus('Email invalide.', 'error');
            return;
        }
        
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader"></i> Envoi...';
        btn.disabled = true;
        initLucideIcons();
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1200));
            showFormStatus('Message envoyé avec succès ! (simulation)', 'success');
            form.reset();
        } catch (err) {
            showFormStatus('Erreur réseau, réessayez.', 'error');
        } finally {
            btn.innerHTML = original;
            btn.disabled = false;
            initLucideIcons();
        }
    });
}

function showFormStatus(msg, type) {
    const statusDiv = document.getElementById('formStatus');
    if (statusDiv) {
        statusDiv.textContent = msg;
        statusDiv.className = `form-status ${type}`;
        statusDiv.style.display = 'block';
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 4000);
    }
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function initScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.addEventListener('click', () => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        });
    }
}

function initHeroAnimation() {
    const elements = document.querySelectorAll('.hero-subtitle, .hero-name, .job-title, .hero-description, .hero-btns');
    elements.forEach((el, idx) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + idx * 120);
    });
}

window.addEventListener('resize', () => initLucideIcons());