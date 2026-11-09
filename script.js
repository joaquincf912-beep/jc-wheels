// ============================================
// JC WHEELS — Optimized JavaScript
// Minimal, fast, no lag
// ============================================
(function() {
    'use strict';

    // ---- COUNTDOWN TIMER ----
    const targetTime = Date.now() + 13500000; // 3h 45m
    const timerH = document.getElementById('timerHours');
    const timerM = document.getElementById('timerMinutes');
    const timerS = document.getElementById('timerSeconds');

    function updateTimer() {
        const diff = targetTime - Date.now();
        if (diff <= 0) return;
        timerH.textContent = String(Math.floor(diff / 3600000)).padStart(2, '0');
        timerM.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        timerS.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    }
    if (timerH) { updateTimer(); setInterval(updateTimer, 1000); }

    // ---- NAVBAR SCROLL (throttled) ----
    const navbar = document.getElementById('navbar');
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ---- HAMBURGER MENU ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    // Close on link click
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // ---- SMOOTH SCROLL ----
    document.addEventListener('click', function(e) {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            const offset = 120;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
    });

    // ---- SCROLL ANIMATIONS (IntersectionObserver) ----
    const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('animate-visible');
                observer.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const animEls = document.querySelectorAll('.animate-on-scroll');
    for (let i = 0; i < animEls.length; i++) observer.observe(animEls[i]);

    // ---- FAQ ACCORDION ----
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.faq-question');
        if (!btn) return;
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('active');
        const items = document.querySelectorAll('.faq-item.active');
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
            items[i].querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
        if (!wasOpen) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    });

    // ---- FORM → WHATSAPP ----
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const fd = new FormData(form);
            const msg = encodeURIComponent(
                'Hey! I\'d like a quote.\n\nName: ' + fd.get('name') +
                '\nPhone: ' + fd.get('phone') +
                '\nVehicle: ' + fd.get('vehicle') +
                '\nService: ' + fd.get('service') +
                (fd.get('message') ? '\nDetails: ' + fd.get('message') : '')
            );
            window.open('https://wa.me/17868816042?text=' + msg, '_blank');
            var btn = form.querySelector('button[type="submit"]');
            var orig = btn.innerHTML;
            btn.innerHTML = '✓ Sent!';
            btn.style.background = '#25D366';
            btn.disabled = true;
            setTimeout(function() {
                btn.innerHTML = orig;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 4000);
        });
    }

    // ---- SOCIAL PROOF (lightweight) ----
    var proofData = [
        ['Carlos R.', 'just got new wheels for his Silverado', '12 min ago'],
        ['Daniel M.', 'ordered 24" Fuel wheels', '18 min ago'],
        ['Alejandro B.', 'got Nitto tires installed', '25 min ago'],
        ['Luis G.', 'picked up his F-150 with new rims', '33 min ago'],
        ['Roberto', 'got a wheel + tire package', '41 min ago'],
        ['Jose P.', 'scheduled a tire mounting', '48 min ago'],
    ];
    var proofIdx = 0;
    var socialProof = document.getElementById('socialProof');
    var proofName = document.getElementById('proofName');
    var proofAction = document.getElementById('proofAction');
    var proofTime = document.getElementById('proofTime');

    function showProof() {
        if (!socialProof) return;
        var d = proofData[proofIdx % proofData.length];
        proofName.textContent = d[0];
        proofAction.textContent = d[1];
        proofTime.textContent = d[2];
        socialProof.classList.add('visible');
        setTimeout(function() { socialProof.classList.remove('visible'); }, 4500);
        proofIdx++;
    }
    setTimeout(function() { showProof(); setInterval(showProof, 18000); }, 6000);

})();
