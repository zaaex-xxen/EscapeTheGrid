document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn?.classList.remove('active');
            navLinksContainer?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    const updateActiveLink = () => {
        let currentSectionId = '';
        const navHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section is currently in the active viewport zone
            if (rect.top <= navHeight + 250) {
                currentSectionId = section.getAttribute('id') || '';
            }
        });

        // Special case: if we're at the very bottom of the page, the last section (Credits) must be active
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight - 50) {
            currentSectionId = sections[sections.length - 1].getAttribute('id') || '';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });



    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const h1 = hero.querySelector('h1');
                const p = hero.querySelector('p');
                const cta = hero.querySelector('.cta-btn');
                if (h1) h1.style.transform = `translateY(${scrolled * 0.4}px)`;
                if (p) p.style.transform = `translateY(${scrolled * 0.2}px)`;
                if (cta) cta.style.transform = `translateY(${scrolled * 0.1}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });



    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveLink();
    });
    handleNavbarScroll();
    updateActiveLink();

    const modeData = {
        escape: {
            title: "Escape Mode",
            description: "A high-stakes stealth mission where players must navigate a complex, ever-changing maze. The objective is to find the hidden exit while avoiding detection from grid guardians. Every move must be calculated, as the grid reacts to your presence.",
            assets: [
                { icon: "🗺️", label: "Dynamic Maze" },
                { icon: "🛡️", label: "Stealth UI" },
                { icon: "🔊", label: "Ambience" }
            ],
            credits: [
                { role: "Design", name: "Level Team" },
                { role: "Programming", name: "AI Systems" },
                { role: "Audio", name: "Sound Lab" }
            ]
        },
        battle: {
            title: "Battle Mode",
            description: "Enter the arena and fight for dominance. In Battle Mode, the grid is your weapon and your shield. Face off against AI or other players in a fast-paced tactical combat experience where positioning is everything.",
            assets: [
                { icon: "<img src='assets/img/cat.png' style='width: 32px; height: 32px; object-fit: contain; vertical-align: middle;'>", label: "Weapon Sprites" },
                { icon: "💥", label: "FX Particles" },
                { icon: "🎵", label: "Combat Theme" }
            ],
            credits: [
                { role: "Design", name: "Combat Team" },
                { role: "Programming", name: "Physics Engine" },
                { role: "VFX", name: "Art Studio" }
            ]
        },
        quest: {
            title: "Quest Mode",
            description: "Embark on an epic journey across the five worlds of the grid. Complete challenging tasks, solve ancient puzzles, and collect rare artifacts to unlock the secrets of the Grid Masters.",
            assets: [
                { icon: "📜", label: "Quest Logs" },
                { icon: "💎", label: "Rare Artifacts" },
                { icon: "🌟", label: "Star Effects" }
            ],
            credits: [
                { role: "Design", name: "Narrative Team" },
                { role: "Programming", name: "Quest System" },
                { role: "Art", name: "World Builders" }
            ]
        }
    };

    const modal = document.getElementById('mode-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const modeCards = document.querySelectorAll('.clickable-mode');

    const openModeModal = (modeKey) => {
        const data = modeData[modeKey];
        if (!data) return;

        const titleWords = data.title.split(' ');
        const firstPart = titleWords[0];
        const secondPart = titleWords.slice(1).join(' ');

        modalBody.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; margin-bottom: 3rem;">
                <div>
                    <h2 class="modal-title" style="margin-bottom: 1.5rem;">${firstPart} <span style="color: var(--primary);">${secondPart}</span></h2>
                    <div class="modal-section" style="margin-bottom: 2rem;">
                        <p style="font-size: 1.1rem; line-height: 1.8;">${data.description}</p>
                    </div>
                    <div style="display: flex; gap: 2rem; margin-top: 2rem;">
                        ${data.assets.map(asset => `
                            <div class="stat">
                                <h3 style="color: var(--primary); font-size: 1.5rem;">${asset.icon}</h3>
                                <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">${asset.label}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass-card" style="padding: 0; height: 350px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary-glow), transparent); overflow: hidden;">
                    <div style="font-size: 8rem; filter: drop-shadow(0 0 20px var(--primary-glow));">${modeKey === 'escape' ? '<img src="assets/img/character.png" style="width: 180px; image-rendering: pixelated;">' : modeKey === 'battle' ? '<img src="assets/img/cat.png" style="width: 180px; image-rendering: pixelated;">' : '<img src="assets/img/dino.png" style="width: 180px; image-rendering: pixelated;">'}</div>
                </div>
            </div>
            
            <div class="modal-section" style="border-top: 1px solid var(--glass-border); padding-top: 3rem;">
                <h4 style="margin-bottom: 2rem; text-align: center;">PRODUCTION CREDITS</h4>
                <ul class="credits-list" style="max-width: 600px; margin: 0 auto;">
                    ${data.credits.map(credit => `
                        <li>
                            <span>${credit.role}</span>
                            <span>${credit.name}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    };

    const closeModeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            const mode = card.getAttribute('data-mode');
            openModeModal(mode);
        });
    });

    closeModal?.addEventListener('click', closeModeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModeModal();
    });

    console.log('Grid System Initialized...');
});

