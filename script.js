document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section, header');
    const navLinksContainer = document.querySelector('.nav-links');

    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };




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



    const home = document.getElementById('home');
    if (home) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const h1 = home.querySelector('h1');
                const p = home.querySelector('p');
                const cta = home.querySelector('.cta-btn');
                if (h1) h1.style.transform = `translateY(${scrolled * 0.4}px)`;
                if (p) p.style.transform = `translateY(${scrolled * 0.2}px)`;
                if (cta) cta.style.transform = `translateY(${scrolled * 0.1}px)`;
                home.style.opacity = 1 - (scrolled / window.innerHeight);
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



    const modeData = {
        escape: {
            title: 'ESCAPE MODE',
            description: 'The classic experience. Navigate through increasingly complex mazes while avoiding traps and finding the hidden exit. Time is of the essence as the grid slowly collapses behind you.',
            assets: [
                { icon: '🏃', label: 'STEALTH' },
                { icon: '⏱️', label: 'SPEED' },
                { icon: '🗺️', label: 'STRATEGY' }
            ],
            credits: [
                { role: 'Level Design', name: 'ZAE' },
                { role: 'Logic', name: 'KIM LEO' },
                { role: 'Visuals', name: 'MIN' }
            ]
        },
        battle: {
            title: 'BATTLE MODE',
            description: 'Enter the arena where the grid is your battlefield. Outmaneuver intelligent AI opponents or compete against friends to claim the most territory. Only one can remain within the grid.',
            assets: [
                { icon: '⚔️', label: 'COMBAT' },
                { icon: '🛡️', label: 'DEFENSE' },
                { icon: '💥', label: 'POWERUPS' }
            ],
            credits: [
                { role: 'AI Development', name: 'DEYB' },
                { role: 'Mechanics', name: 'GEEBEE' },
                { role: 'UI Design', name: 'DINDINN' }
            ]
        },
        quest: {
            title: 'QUEST MODE',
            description: 'Embark on a journey through the five worlds. Collect legendary stars, solve environmental puzzles, and unlock the secrets of the ancient grid builders. A lore-rich adventure awaits.',
            assets: [
                { icon: '⭐', label: 'COLLECTIBLES' },
                { icon: '🧩', label: 'PUZZLES' },
                { icon: '📜', label: 'STORY' }
            ],
            credits: [
                { role: 'Narrative', name: 'SLOTH' },
                { role: 'World Building', name: 'ZAE' },
                { role: 'Asset Design', name: 'MIN' }
            ]
        }
    };

    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveLink();
    });
    handleNavbarScroll();
    updateActiveLink();

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
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; margin-bottom: 48px;">
                <div>
                    <h2 class="modal-title" style="margin-bottom: 24px;">${firstPart} <span style="color: var(--primary);">${secondPart}</span></h2>
                    <div class="modal-section" style="margin-bottom: 32px;">
                        <p style="font-size: 17.6px; line-height: 1.8;">${data.description}</p>
                    </div>
                    <div style="display: flex; gap: 32px; margin-top: 32px;">
                        ${data.assets.map(asset => `
                            <div class="stat">
                                <h3 style="color: var(--primary); font-size: 24px;">${asset.icon}</h3>
                                <p style="font-size: 12.8px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary);">${asset.label}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="glass-card" style="padding: 0; height: 350px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary-glow), transparent); overflow: hidden;">
                    <div style="font-size: 128px; filter: drop-shadow(0 0 20px var(--primary-glow));">${modeKey === 'escape' ? '<img src="assets/img/character.png" style="width: 180px; image-rendering: pixelated;">' : modeKey === 'battle' ? '<img src="assets/img/cat.png" style="width: 180px; image-rendering: pixelated;">' : '<img src="assets/img/dino.png" style="width: 180px; image-rendering: pixelated;">'}</div>
                </div>
            </div>
            
            <div class="modal-section" style="border-top: 1px solid var(--glass-border); padding-top: 48px;">
                <h4 style="margin-bottom: 32px; text-align: center;">PRODUCTION CREDITS</h4>
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

