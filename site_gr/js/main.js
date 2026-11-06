document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================== */
    /* 1. FILTRAGE DU PORTFOLIO AVEC TRANSITION FLUIDE            */
    /* ========================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.85) translateY(20px)';
                
                setTimeout(() => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    cards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });


    /* ========================================================== */
    /* 2. EFFET 3D TILT SUR LES CARTES                            */
    /* ========================================================== */
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });


    /* ========================================================== */
    /* 3. SCROLL REVEAL (APPARITION FLUIDE AU DÉFILEMENT)        */
    /* ========================================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-title, .portfolio-grid, .arsenal-card, .contact-container, .team-card, .partner-card');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        revealObserver.observe(el);
    });

    const styleSheet = document.createElement('style');
    styleSheet.innerText = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    /* ========================================================== */
    /* 4. EFFET PARALLAXE FLUIDE SUR LA VIDÉO HERO               */
    /* ========================================================== */
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroVideo.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.3}px)) scale(1.25)`;
            }
        });
    }


    /* ========================================================== */
    /* 5. MENU DÉROULANT GALERIE (TACTILE & CLIC)                 */
    /* ========================================================== */
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }


    /* ========================================================== */
    /* 6. SOUMISSION INTERACTIVE DU FORMULAIRE DE CONTACT         */
    /* ========================================================== */
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Transmission en cours...';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            setTimeout(() => {
                alert('Merci pour votre message ! Grproduction Prod vous recontactera sous peu.');
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
            }, 1000);
        });
    }

});