/* ============================================
   CO_ARQUITECTURA — Manual de Identidad Visual
   JavaScript — Navigation & Interactions
   Editorial / Innovador
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === ELEMENTS ===
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const pageIndicator = document.getElementById('pageIndicator');
    const pages = document.querySelectorAll('.page');
    const navAnchors = document.querySelectorAll('.nav__links a');

    // === SCROLL: Nav shrink ===
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // === MOBILE NAV TOGGLE ===
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // === INTERSECTION OBSERVER: Page visibility ===
    const observerOptions = {
        root: null,
        rootMargin: '-5% 0px -5% 0px',
        threshold: 0.1
    };

    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Update page indicator
                const pageNum = entry.target.dataset.page;
                if (pageNum && pageIndicator) {
                    const currentEl = pageIndicator.querySelector('.page-indicator__current');
                    if (currentEl) {
                        currentEl.textContent = pageNum === 'M' ? 'AP' : pageNum.padStart(2, '0');
                    }
                }

                // Update active nav link
                const sectionId = entry.target.id;
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + sectionId) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    pages.forEach(page => {
        pageObserver.observe(page);
    });

    // === MOCKUP PROMPT TOGGLES ===
    const mockupRows = document.querySelectorAll('.mockup-row:not(.mockup-row--header)');
    mockupRows.forEach(row => {
        const toggle = row.querySelector('.mockup-row__toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                row.classList.toggle('open');
            });
        }
    });

    // === SMOOTH SCROLL for nav links ===
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === COLOR SWATCH: Copy hex on click ===
    const swatches = document.querySelectorAll('.swatch__block');
    swatches.forEach(swatch => {
        swatch.style.cursor = 'pointer';
        swatch.title = 'Click para copiar código HEX';
        swatch.addEventListener('click', () => {
            const hex = swatch.parentElement.querySelector('.swatch__hex');
            if (hex) {
                const hexValue = hex.textContent;
                navigator.clipboard.writeText(hexValue).then(() => {
                    const original = hex.textContent;
                    hex.textContent = 'Copiado!';
                    hex.style.color = '#3C3A2E';
                    setTimeout(() => {
                        hex.textContent = original;
                        hex.style.color = '';
                    }, 1200);
                }).catch(() => {
                    const textArea = document.createElement('textarea');
                    textArea.value = hexValue;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                });
            }
        });
    });

    // === COVER LOGO: Set underscore width to match C ===
    const coverC = document.getElementById('coverC');
    const coverUnderscore = document.getElementById('coverUnderscore');

    if (coverC && coverUnderscore) {
        const extra = 8;
        const cWidth = coverC.getBoundingClientRect().width + extra;
        coverUnderscore.style.width = cWidth + 'px';

        // Update on resize
        window.addEventListener('resize', () => {
            coverUnderscore.style.width = (coverC.getBoundingClientRect().width + extra) + 'px';
        });
    }

    // === CO_ DIFFUSE SCROLL ANIMATION (Filosofia section) ===
    const coAnim = document.getElementById('coAnim');
    const coScroll = document.getElementById('coScroll');
    const coFinal = document.getElementById('coFinal');
    const coAnimLine = document.getElementById('coAnimLine');
    const coAnimTagline = document.getElementById('coAnimTagline');

    if (coAnim && coScroll) {
        const words = coScroll.querySelectorAll('.co-scroll__word');
        let animStarted = false;
        let animFinished = false;
        let currentActive = -1;

        const WORD_DURATION = 1200; // ms each word stays in focus

        // Set active word — clear focus, neighbors semi-blur, far = heavy blur
        function setActiveWord(index) {
            words.forEach((word, i) => {
                word.classList.remove('active', 'near');
                const distance = Math.abs(i - index);
                if (i === index) {
                    word.classList.add('active');
                } else if (distance === 1) {
                    word.classList.add('near');
                }
            });
            // Subtle upward drift as focus moves down the list
            const progress = index / (words.length - 1);
            coScroll.style.transform = 'translateY(' + (-progress * 15) + 'px)';
        }

        function runScrollAnimation() {
            if (animFinished) return;
            currentActive++;

            if (currentActive < words.length) {
                setActiveWord(currentActive);
                setTimeout(runScrollAnimation, WORD_DURATION);
            } else {
                // All words cycled — scroll out (drift + blur + fade)
                words.forEach(w => w.classList.remove('active', 'near'));
                coScroll.classList.add('scroll-out');

                setTimeout(() => {
                    coScroll.style.display = 'none';

                    // Reveal final CO from blur
                    coFinal.classList.add('show');

                    setTimeout(() => {
                        // Set underscore width to match C
                        const cLetter = coFinal.querySelector('.co-scroll__final-c');
                        if (cLetter) {
                            coAnimLine.style.width = cLetter.getBoundingClientRect().width + 'px';
                        }
                        coAnimLine.classList.add('show');

                        setTimeout(() => {
                            coAnimTagline.classList.add('show');
                            animFinished = true;
                        }, 400);
                    }, 700);
                }, 1000);
            }
        }

        // Start when filosofia section enters viewport
        const filosofiaSection = document.getElementById('filosofia');
        if (filosofiaSection) {
            const animObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animStarted) {
                        animStarted = true;
                        setTimeout(runScrollAnimation, 500);
                    }
                });
            }, { threshold: 0.3 });
            animObserver.observe(filosofiaSection);
        }
    }

    // === INITIAL STATE ===
    if (pages.length > 0) {
        pages[0].classList.add('in-view');
    }

});
