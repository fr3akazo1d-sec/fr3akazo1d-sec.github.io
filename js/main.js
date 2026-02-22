// ========================================
// fr3akazo1d Personal Website - JavaScript
// Custom Cursor, Smooth Scrolling, and Animations
// ========================================

// === INITIALIZE CURSOR IMMEDIATELY ===
(function initCursor() {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let followerX = mouseX;
    let followerY = mouseY;
    
    function updateCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            // Track mouse movement
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            // Animate cursor
            function animateCursor() {
                // Main cursor: instant follow (no easing)
                cursorX = mouseX;
                cursorY = mouseY;
                // Follower: faster easing for better trailing effect
                followerX += (mouseX - followerX) * 0.4;
                followerY += (mouseY - followerY) * 0.4;
                
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                cursorFollower.style.left = followerX + 'px';
                cursorFollower.style.top = followerY + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
        } else {
            // Retry after a short delay if elements not found
            setTimeout(updateCursor, 100);
        }
    }
    
    // Try immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateCursor);
    } else {
        updateCursor();
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired!');
    
    // === HANDLE HASH NAVIGATION ON PAGE LOAD ===
    // Fix for anchor links from external pages (e.g., /gallery/ -> /index.html#blog)
    if (window.location.hash) {
        // Wait for page to fully render, then scroll
        setTimeout(() => {
            const hash = window.location.hash;
            const targetSection = document.querySelector(hash);
            console.log('Hash detected:', hash, 'Target:', targetSection);
            if (targetSection) {
                // Scroll to position accounting for fixed header
                const headerOffset = 60;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 300);
    }
    
    // === CURSOR ELEMENTS (for hover effects) ===
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    console.log('Cursor elements:', cursor, cursorFollower);
    
    // === LOADING SCREEN ===
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingStatus = document.querySelector('.loading-status');
    
    // Only show loading screen on first visit to home page
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    
    if (!isHomePage || hasVisited) {
        // Skip loading screen - already hidden by default CSS
        // Do nothing, loading screen stays hidden
    } else {
        // First visit to home - show loading screen
        sessionStorage.setItem('hasVisitedHome', 'true');
        loadingScreen.classList.add('show');
        
        const loadingMessages = [
            'Bypassing firewall...',
            'Cracking password hash...',
            'Decrypting SSL certificates...',
            'Injecting malicious code... just kidding!',
            'Loading coffee.exe...',
            'Hacking the mainframe...',
            'Downloading more RAM...',
            'Deleting system32... NOT!',
            'Establishing secure connection...',
            'Compiling exploits...',
            'Access granted! Welcome, hacker.'
        ];
        
        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (messageIndex < loadingMessages.length - 1) {
                messageIndex++;
                loadingStatus.textContent = loadingMessages[messageIndex];
            }
        }, 250);
        
        // Show loading screen for at least 2 seconds
        const minLoadTime = 2000;
        const startTime = Date.now();
        
        window.addEventListener('load', () => {
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsed);
            
            setTimeout(() => {
                clearInterval(messageInterval);
                loadingStatus.textContent = loadingMessages[loadingMessages.length - 1];
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    loadingScreen.classList.remove('show');
                    // Add fade-in animation to sections
                    document.querySelectorAll('.section').forEach((section, index) => {
                        setTimeout(() => {
                            section.classList.add('fade-in');
                        }, index * 100);
                    });
                }, 800);
            }, remainingTime);
        });
    }
    
    // === MOBILE MENU TOGGLE ===
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // === EXPLORE DROPDOWN ===
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const navDropdown    = document.querySelector('.nav-dropdown');

    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navDropdown.classList.toggle('open');
            dropdownToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('open');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown link click (also closes mobile nav)
        navDropdown.querySelectorAll('.nav-dropdown-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                navDropdown.classList.remove('open');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navDropdown.classList.contains('open')) {
                navDropdown.classList.remove('open');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownToggle.focus();
            }
        });
    }
    
    // === SMOOTH SCROLLING FOR ANCHOR LINKS ===
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Only handle same-page anchor links
            if (href && href.includes('#') && !href.includes('index.html#')) {
                const hash = href.split('#')[1];
                const targetSection = document.querySelector('#' + hash);
                if (targetSection && window.location.pathname === '/') {
                    e.preventDefault();
                    const headerOffset = 60;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Next event banner close button
    const nextEventBanner = document.querySelector('.next-event-banner');
    const nextEventClose = document.querySelector('.next-event-close');
    
    console.log('Banner elements:', nextEventBanner, nextEventClose);
    
    if (nextEventClose && nextEventBanner) {
        console.log('Adding close button listener');
        nextEventClose.addEventListener('click', (e) => {
            console.log('Close button clicked!');
            e.preventDefault();
            e.stopPropagation();
            nextEventBanner.style.display = 'none';
            // Store in session storage so it stays closed during the session
            sessionStorage.setItem('nextEventBannerClosed', 'true');
        });
        
        // Check if banner was closed in this session
        if (sessionStorage.getItem('nextEventBannerClosed') === 'true') {
            console.log('Banner was previously closed, hiding it');
            nextEventBanner.style.display = 'none';
        }
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === SCROLL PROGRESS BAR ===
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgressBar.style.width = pct + '%';
        }, { passive: true });
    }

    // Cursor hover effects
    if (cursor && cursorFollower) {
        const hoverElements = document.querySelectorAll('a, button, .blog-card, .project-card, .contact-card, .platform-card, .skill-category, .timeline-item, .cert-item');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#ff003c';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#00fff7';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    // === SMOOTH SCROLL (already handled in mobile menu) ===
    // Additional smooth scroll functionality
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only apply smooth scroll to anchor links (starting with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For regular links (like /tags/), let the browser handle navigation normally
        });
    });    // === ACTIVE NAV LINK ===
    const sections = document.querySelectorAll('.section, header');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // === GLITCH EFFECT TRIGGER ===
    const glitchElements = document.querySelectorAll('.glitch');
    
    function triggerGlitch(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
    }
    
    // Random glitch effect every 5-10 seconds
    setInterval(() => {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        triggerGlitch(randomElement);
    }, Math.random() * 5000 + 5000);
    
    // === INTERSECTION OBSERVER FOR ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // === TYPING EFFECT REMOVED ===
    // Text now displays immediately without typing animation
    
    // === PARTICLE BACKGROUND (Optional) ===
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = Math.random() > 0.5 ? '#00fff7' : '#ff003c';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-10px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';
        particle.style.borderRadius = '50%';
        
        document.body.appendChild(particle);
        
        let posY = -10;
        const speed = Math.random() * 2 + 1;
        
        function animateParticle() {
            posY += speed;
            particle.style.top = posY + 'px';
            
            if (posY < window.innerHeight) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
    
    // Create particles periodically (reduce frequency to avoid performance issues)
    setInterval(createParticle, 2000);
    
    // === LOGO HOVER EFFECT ===
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.animation = 'none';
            logo.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
            setTimeout(() => {
                logo.style.animation = 'float 6s ease-in-out infinite';
            }, 300);
        });
    }
    

    
    // === MAKE BLOG CARDS CLICKABLE ===
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the link inside the card
            const link = card.querySelector('.card-link');
            if (link && !e.target.closest('a')) {
                // Navigate to the blog post
                window.location.href = link.getAttribute('href');
            }
        });
        
        // Add pointer cursor
        card.style.cursor = 'pointer';
    });
    

    
    // === MATRIX RAIN EFFECT (Background) ===
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.03';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(1);
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        
        function draw() {
            ctx.fillStyle = 'rgba(16, 20, 26, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00fff7';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 50);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Uncomment to enable matrix rain effect
    // createMatrixRain();
    
    // === GALLERY FUNCTIONALITY ===
    const galleryButtons = document.querySelectorAll('.gallery-view-btn');
    console.log('=== GALLERY DEBUG ===');
    console.log('Gallery buttons found:', galleryButtons.length);
    console.log('Buttons:', galleryButtons);
    
    if (galleryButtons.length > 0) {
        console.log('Creating gallery modal...');
        // Create gallery modal dynamically
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <div class="gallery-modal-header">
                    <h2 class="gallery-modal-title"></h2>
                    <button class="gallery-close-btn">&times;</button>
                </div>
                <div class="gallery-photos-grid"></div>
            </div>
        `;
        document.body.appendChild(modal);
        console.log('Modal created and added to body');
        
        // Close modal on X button
        modal.querySelector('.gallery-close-btn').addEventListener('click', () => {
            modal.classList.remove('active');
        });
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
        
        // Add click handlers to all gallery buttons
        galleryButtons.forEach((button, index) => {
            console.log(`Setting up button ${index}:`, button);
            button.addEventListener('click', (e) => {
                console.log('===== GALLERY BUTTON CLICKED! =====');
                e.preventDefault();
                e.stopPropagation();
                
                const gallerySlug = button.getAttribute('data-gallery');
                console.log('Gallery slug:', gallerySlug);
                const galleryCard = button.closest('.gallery-card');
                const galleryTitle = galleryCard.querySelector('.gallery-title').textContent;
                
                // Set modal title
                modal.querySelector('.gallery-modal-title').textContent = galleryTitle;
                
                // Get photo elements from the gallery card (they're rendered by Jekyll)
                const photosGrid = modal.querySelector('.gallery-photos-grid');
                const photoElements = galleryCard.querySelectorAll('.gallery-photo-data');
                
                console.log('Gallery card:', galleryCard);
                console.log('Photo elements found:', photoElements.length);
                
                if (photoElements.length > 0) {
                    // Clear grid and add photos
                    photosGrid.innerHTML = '';
                    photoElements.forEach((photoData, index) => {
                        console.log('Photo data:', photoData.dataset.image, photoData.dataset.caption);
                        const photoDiv = document.createElement('div');
                        photoDiv.className = 'gallery-photo-item';
                        photoDiv.innerHTML = `
                            <img src="${photoData.dataset.image}" alt="${photoData.dataset.caption}" loading="lazy">
                            <div class="gallery-photo-caption">${photoData.dataset.caption}</div>
                        `;
                        
                        // Add click to view fullscreen
                        photoDiv.addEventListener('click', () => {
                            console.log('Photo clicked! Opening lightbox...');
                            let currentIndex = index;
                            
                            const lightbox = document.createElement('div');
                            lightbox.className = 'gallery-lightbox';
                            lightbox.innerHTML = `
                                <button class="lightbox-close">&times;</button>
                                <button class="lightbox-nav lightbox-prev" aria-label="Previous photo">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button class="lightbox-nav lightbox-next" aria-label="Next photo">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                                <img src="${photoData.dataset.image}" alt="${photoData.dataset.caption}">
                                <div class="lightbox-caption">${photoData.dataset.caption}</div>
                                <div class="lightbox-counter">${currentIndex + 1} / ${photoElements.length}</div>
                            `;
                            document.body.appendChild(lightbox);
                            console.log('Lightbox created and added to body');
                            
                            const lightboxImg = lightbox.querySelector('img');
                            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
                            const lightboxCounter = lightbox.querySelector('.lightbox-counter');
                            const prevBtn = lightbox.querySelector('.lightbox-prev');
                            const nextBtn = lightbox.querySelector('.lightbox-next');
                            
                            console.log('Navigation buttons:', prevBtn, nextBtn);
                            console.log('Total photos:', photoElements.length);
                            console.log('Current index:', currentIndex);
                            
                            // Function to update lightbox content
                            function updateLightbox() {
                                const currentPhoto = photoElements[currentIndex];
                                lightboxImg.src = currentPhoto.dataset.image;
                                lightboxImg.alt = currentPhoto.dataset.caption;
                                lightboxCaption.textContent = currentPhoto.dataset.caption;
                                lightboxCounter.textContent = `${currentIndex + 1} / ${photoElements.length}`;
                                
                                // Hide/show navigation buttons at edges
                                prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                                nextBtn.style.display = currentIndex === photoElements.length - 1 ? 'none' : 'flex';
                                console.log('Updated navigation visibility - prev:', prevBtn.style.display, 'next:', nextBtn.style.display);
                            }
                            
                            // Navigation button handlers
                            prevBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                if (currentIndex > 0) {
                                    currentIndex--;
                                    updateLightbox();
                                }
                            });
                            
                            nextBtn.addEventListener('click', (e) => {
                                e.stopPropagation();
                                if (currentIndex < photoElements.length - 1) {
                                    currentIndex++;
                                    updateLightbox();
                                }
                            });
                            
                            // Show lightbox
                            setTimeout(() => {
                                lightbox.classList.add('active');
                                updateLightbox(); // Update button visibility
                                console.log('Lightbox active class added');
                            }, 10);
                            
                            // Close handlers
                            const closeBtn = lightbox.querySelector('.lightbox-close');
                            closeBtn.addEventListener('click', () => {
                                lightbox.classList.remove('active');
                                setTimeout(() => lightbox.remove(), 300);
                            });
                            
                            lightbox.addEventListener('click', (e) => {
                                if (e.target === lightbox) {
                                    lightbox.classList.remove('active');
                                    setTimeout(() => lightbox.remove(), 300);
                                }
                            });
                            
                            // Keyboard navigation
                            document.addEventListener('keydown', function keyHandler(e) {
                                if (e.key === 'Escape') {
                                    lightbox.classList.remove('active');
                                    setTimeout(() => lightbox.remove(), 300);
                                    document.removeEventListener('keydown', keyHandler);
                                } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                                    currentIndex--;
                                    updateLightbox();
                                } else if (e.key === 'ArrowRight' && currentIndex < photoElements.length - 1) {
                                    currentIndex++;
                                    updateLightbox();
                                }
                            });
                        });
                        
                        photosGrid.appendChild(photoDiv);
                        console.log('Photo added to grid');
                    });
                } else {
                    // Show placeholder if no photos found
                    console.log('No photos found, showing placeholder');
                    photosGrid.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-main);">
                            <p>No photos found for this gallery.</p>
                        </div>
                    `;
                }
                
                // Show modal
                modal.classList.add('active');
                console.log('Modal active class added. Modal classList:', modal.classList);
                console.log('Photos grid HTML:', photosGrid.innerHTML.substring(0, 200));
            });
        });
    }
    
    // === SECURITY: enforce noopener noreferrer on all external links ===
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (link.hostname !== location.hostname) {
            link.setAttribute('target', '_blank');
            const rel = link.getAttribute('rel') || '';
            if (!rel.includes('noopener')) {
                link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
            }
        }
    });

    // === TABLE OF CONTENTS ===
    (function initTOC() {
        const tocNav      = document.getElementById('tocNav');
        const tocSidebar  = document.getElementById('tocSidebar');
        const collapseBtn = document.getElementById('tocCollapse');
        const filenameEl  = document.getElementById('tocFilename');
        if (!tocNav || !tocSidebar) return;

        // Inject filename into header
        if (filenameEl && tocSidebar.dataset.slug) {
            filenameEl.textContent = tocSidebar.dataset.slug;
        }

        const postContent = document.getElementById('postContent') || document.querySelector('.post-content');
        if (!postContent) return;

        const headings = Array.from(postContent.querySelectorAll('h2, h3'));
        if (headings.length < 2) { tocSidebar.style.display = 'none'; return; }

        // Ensure each heading has a stable ID
        headings.forEach((h, i) => { if (!h.id) h.id = 'section-' + i; });

        // Build ls -la style list
        const total = document.createElement('div');
        total.className = 'ls-total';
        total.textContent = `total ${headings.length}`;
        tocNav.appendChild(total);

        const ul = document.createElement('ul');
        ul.className = 'toc-list';
        headings.forEach(h => {
            const isDir = h.tagName === 'H2';
            const name  = h.textContent.replace(/^#+\s*/, '').trim();

            const li = document.createElement('li');
            li.className = `toc-item toc-item--${h.tagName.toLowerCase()}`;

            const meta = document.createElement('span');
            meta.className = 'ls-meta';
            meta.innerHTML = `<span class="ls-perm">${isDir ? 'drwxr-xr-x' : '-rw-r--r--'}</span> <span class="ls-owner">root</span> `;

            const link = document.createElement('a');
            link.className = `toc-link toc-${h.tagName.toLowerCase()}`;
            link.href = '#' + h.id;
            link.textContent = isDir ? name + '/' : name;
            link.addEventListener('click', e => {
                e.preventDefault();
                const top = h.getBoundingClientRect().top + window.pageYOffset - 75;
                window.scrollTo({ top, behavior: 'smooth' });
                history.pushState(null, '', '#' + h.id);
            });

            li.appendChild(meta);
            li.appendChild(link);
            ul.appendChild(li);
        });
        tocNav.appendChild(ul);

        // Highlight active section as user scrolls
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const link = tocNav.querySelector(`a[href="#${entry.target.id}"]`);
                if (link) {
                    link.classList.toggle('active', entry.isIntersecting);
                    link.closest('.toc-item')?.classList.toggle('active', entry.isIntersecting);
                }
            });
        }, { rootMargin: '-60px 0px -65% 0px', threshold: 0 });

        headings.forEach(h => observer.observe(h));

        // Collapse / expand via button or clicking the header
        function toggleCollapse(e) {
            if (e) e.stopPropagation();
            const collapsed = tocSidebar.classList.toggle('collapsed');
            if (collapseBtn) collapseBtn.textContent = collapsed ? '+' : '−';
        }

        if (collapseBtn) {
            collapseBtn.addEventListener('click', toggleCollapse);
        }

        const tocHeader = document.getElementById('tocHeader');
        if (tocHeader) {
            tocHeader.addEventListener('click', (e) => {
                // only fire if clicking the header itself, not a link inside it
                if (!e.target.closest('a')) toggleCollapse();
            });
        }
    })();

    // === CONSOLE EASTER EGG ===
    console.log('%c fr3akazo1d ', 'background: #ff003c; color: #00fff7; font-size: 22px; font-weight: bold; padding: 12px; font-family: monospace;');
    console.log('%c Root is not a privilege. It\'s a mindset. ', 'background: #00fff7; color: #10141a; font-size: 14px; padding: 6px; font-family: monospace;');
    console.log('%c [*] Enumerating attack surface... ', 'color: #39ff14; font-size: 12px; font-family: monospace;');
    console.log('%c [+] GitHub  : https://github.com/fr3akazo1d-sec ', 'color: #c0c0c0; font-size: 12px; font-family: monospace;');
    console.log('%c [+] LinkedIn: https://linkedin.com/in/phil-malle ', 'color: #c0c0c0; font-size: 12px; font-family: monospace;');
    console.log('%c [!] 6 easter eggs hidden on this site. Start digging. ', 'color: #ff003c; font-size: 12px; font-family: monospace;');
});

// === PERFORMANCE MONITORING ===
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// === HERO TYPING CURSOR ===
(function initHeroTyping() {
    const cmdEl    = document.getElementById('heroCmd');
    const cursorEl = document.getElementById('heroCursor');
    if (!cmdEl || !cursorEl) return;

    const COMMANDS = [
        'nmap -sV -p- target.htb',
        'sudo ./exploit.py --rhost 10.10.10.1',
        'cat /etc/shadow | john --wordlist=rockyou.txt',
        'msfconsole -q',
        'python3 -c \'import pty; pty.spawn("/bin/bash")\'',
        'curl -s https://api.github.com/users/fr3akazo1d-sec',
        'hashcat -m 1000 hashes.txt rockyou.txt',
        'gobuster dir -u http://target -w /usr/share/wordlists/dirb/common.txt',
        'whoami && id',
        'nc -lvnp 4444',
    ];

    let cmdIndex  = 0;
    let charIndex = 0;
    let deleting  = false;
    let pauseTicks = 0;

    function type() {
        const cmd = COMMANDS[cmdIndex];

        if (pauseTicks > 0) {
            pauseTicks--;
            setTimeout(type, 80);
            return;
        }

        if (!deleting) {
            cmdEl.textContent = ' ' + cmd.slice(0, ++charIndex);
            if (charIndex === cmd.length) {
                deleting = true;
                pauseTicks = 28; // ~2.2s pause at full word
            }
            setTimeout(type, 65);
        } else {
            cmdEl.textContent = charIndex > 1 ? ' ' + cmd.slice(0, --charIndex) : '';
            if (charIndex === 0) {
                deleting = false;
                cmdIndex = (cmdIndex + 1) % COMMANDS.length;
                pauseTicks = 8;
            }
            setTimeout(type, 30);
        }
    }

    // Wait for loading screen to finish before starting
    setTimeout(type, 2200);
})();

// === CLICK RIPPLE HEX COORDS ===
(function initClickRipple() {
    document.addEventListener('click', (e) => {
        // Skip clicks on interactive elements
        if (e.target.closest('a, button, input, textarea, select')) return;

        const el = document.createElement('div');
        el.className = 'click-ripple';
        el.textContent = `0x${e.clientX.toString(16).toUpperCase().padStart(4,'0')}:0x${e.clientY.toString(16).toUpperCase().padStart(4,'0')}`;
        el.style.left = (e.clientX + 10) + 'px';
        el.style.top  = (e.clientY - 5) + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 850);
    });
})();

// === FAKE PACKET SNIFFER TOASTS ===
(function initPacketToasts() {
    let container = document.querySelector('.packet-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'packet-toast-container';
        document.body.appendChild(container);
    }

    function randIP() {
        return `${(Math.random()*223+1|0)}.${(Math.random()*254|0)}.${(Math.random()*254|0)}.${(Math.random()*254|0)}`;
    }

    function randHex(len) {
        return [...Array(len)].map(() => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
    }

    const EVENTS = [
        (src, dst) => ({
            warn: false,
            lines: [`<span class="packet-toast-label">[+]</span> Intercepted TLS handshake`,
                    `<span style="opacity:.5">${src} → ${dst}:443</span>`]
        }),
        (src) => ({
            warn: true,
            lines: [`<span class="packet-toast-label">[!]</span> Port scan detected`,
                    `<span style="opacity:.5">SYN flood from ${src}</span>`]
        }),
        (src, dst) => ({
            warn: false,
            lines: [`<span class="packet-toast-label">[*]</span> DNS query captured`,
                    `<span style="opacity:.5">${src} → ${dst}:53  A?</span>`]
        }),
        () => ({
            warn: false,
            lines: [`<span class="packet-toast-label">[+]</span> Session key derived`,
                    `<span style="opacity:.5">AES-256-GCM  tag:${randHex(8)}</span>`]
        }),
        (src, dst) => ({
            warn: true,
            lines: [`<span class="packet-toast-label">[!]</span> Suspicious POST /login`,
                    `<span style="opacity:.5">${src} → ${dst}:8080</span>`]
        }),
        (src) => ({
            warn: false,
            lines: [`<span class="packet-toast-label">[*]</span> SSH auth attempt`,
                    `<span style="opacity:.5">root@${src}  pubkey</span>`]
        }),
    ];

    function showToast() {
        const fn  = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        const evt = fn(randIP(), randIP());

        const toast = document.createElement('div');
        toast.className = 'packet-toast' + (evt.warn ? ' packet-toast-warn' : '');
        toast.innerHTML = evt.lines.join('<br>');
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 5200);
    }

    // First toast after 45s, then every 90–150s
    setTimeout(function loop() {
        showToast();
        setTimeout(loop, 90000 + Math.random() * 60000);
    }, 45000);
})();

// === HUD WIDGET ===
(function initHUD() {
    const timeEl   = document.getElementById('hud-time');
    const uptimeEl = document.getElementById('hud-uptime');
    if (!timeEl || !uptimeEl) return;

    const startTime = Date.now();
    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const now = new Date();
        timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const m = Math.floor(elapsed / 60);
        const s = elapsed % 60;
        uptimeEl.textContent = `${pad(m)}:${pad(s)}`;
    }

    tick();
    setInterval(tick, 1000);
})();

// === GLITCH FLICKER ON SECTION ENTRY ===
(function initGlitchEntry() {
    const titles = document.querySelectorAll('.section-title');
    if (!titles.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.glitched) {
                entry.target.dataset.glitched = '1';
                entry.target.classList.add('glitch-enter');
                setTimeout(() => entry.target.classList.remove('glitch-enter'), 620);
            }
        });
    }, { threshold: 0.25 });

    titles.forEach(t => observer.observe(t));
})();

// === GITHUB LIVE REPOS ===
(async function initGitHub() {
    const grid    = document.getElementById('githubReposGrid');
    const ghRepos = document.getElementById('ghRepos');
    const ghFollowers = document.getElementById('ghFollowers');
    const ghFollowing = document.getElementById('ghFollowing');
    if (!grid) return;

    const USER = 'fr3akazo1d-sec';
    const LANG_COLORS = {
        Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6',
        'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Ruby: '#701516',
        Go: '#00ADD8', Rust: '#dea584', Shell: '#89e051', PowerShell: '#012456',
        Java: '#b07219', Kotlin: '#A97BFF', Swift: '#F05138',
        HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95',
    };

    function timeAgo(dateStr) {
        const diff = Date.now() - new Date(dateStr);
        const d = Math.floor(diff / 86400000);
        if (d < 1)  return 'today';
        if (d < 7)  return d + 'd ago';
        if (d < 30) return Math.floor(d / 7) + 'w ago';
        if (d < 365) return Math.floor(d / 30) + 'mo ago';
        return Math.floor(d / 365) + 'y ago';
    }

    function repoCard(r) {
        const langColor = LANG_COLORS[r.language] || '#c0c0c0';
        const langHtml = r.language
            ? `<span class="github-repo-lang"><span class="github-lang-dot" style="background:${langColor}"></span>${r.language}</span>`
            : '';
        return `
        <a href="${r.html_url}" target="_blank" rel="noopener noreferrer"
           class="github-repo-card${r.fork ? ' github-repo-fork' : ''}">
            <div class="github-repo-name">
                <svg viewBox="0 0 16 16" fill="currentColor" width="15" height="15">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                </svg>
                ${r.name}
            </div>
            ${r.description ? `<div class="github-repo-description">${r.description}</div>` : '<div class="github-repo-description" style="opacity:0.4;font-style:italic">No description</div>'}
            <div class="github-repo-meta">
                ${langHtml}
                <span class="github-repo-stars">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    ${r.stargazers_count}
                </span>
                <span class="github-repo-forks">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/>
                        <circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
                        <path d="M18 9a9 9 0 0 1-9 9"/>
                    </svg>
                    ${r.forks_count}
                </span>
                <span class="github-repo-updated">${timeAgo(r.pushed_at)}</span>
            </div>
        </a>`;
    }

    try {
        const [userRes, repoRes] = await Promise.all([
            fetch(`https://api.github.com/users/${USER}`),
            fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=6&type=public`)
        ]);

        if (userRes.ok) {
            const u = await userRes.json();
            if (ghRepos)      ghRepos.textContent     = u.public_repos;
            if (ghFollowers)  ghFollowers.textContent = u.followers;
            if (ghFollowing)  ghFollowing.textContent = u.following;
        }

        if (!repoRes.ok) throw new Error('repos fetch failed');
        const repos = await repoRes.json();

        if (!repos.length) {
            grid.innerHTML = '<div class="github-loading">No public repositories found.</div>';
            return;
        }

        grid.innerHTML = repos.map(repoCard).join('');
    } catch (err) {
        grid.innerHTML = `<div class="github-error">root@github:~# <span style="color:var(--accent-red)">ERROR:</span> Could not fetch repositories. View them directly on <a href="https://github.com/${USER}" target="_blank" rel="noopener noreferrer" style="color:var(--accent-cyan)">GitHub</a>.</div>`;
    }
})();

// === EASTER EGGS ===
console.log('%c[SYSTEM] 6 easter eggs loaded. Hints: Konami Code \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA | type "root" | type "nmap" | type "sudo" | triple-click the logo | Ctrl+Shift+H', 'color: #39ff14; font-size: 11px; font-family: monospace;');

// 1. Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    console.log('Key pressed:', e.key, '| Sequence:', konamiCode.join(''));
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateKonamiMode();
    }
});

function activateKonamiMode() {
    console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'background: #39ff14; color: #10141a; font-size: 20px; font-weight: bold; padding: 10px;');
    
    // Create matrix rain effect
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '99999';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    let frameCount = 0;
    const maxFrames = 300; // 6 seconds at 50fps
    
    const interval = setInterval(() => {
        ctx.fillStyle = 'rgba(16, 20, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00fff7';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        frameCount++;
        if (frameCount >= maxFrames) {
            clearInterval(interval);
            canvas.style.opacity = '0';
            canvas.style.transition = 'opacity 1s';
            setTimeout(() => canvas.remove(), 1000);
        }
    }, 50);
    
    // Show message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    z-index: 100000; background: var(--bg-secondary); border: 2px solid var(--accent-cyan);
                    padding: 2rem; border-radius: 12px; text-align: center; font-family: 'JetBrains Mono', monospace;">
            <h2 style="color: var(--accent-green); font-size: 2rem; margin-bottom: 1rem;">🎮 Achievement Unlocked! 🎮</h2>
            <p style="color: var(--text-bright); font-size: 1.2rem;">You found the Konami Code!</p>
            <p style="color: var(--accent-cyan); margin-top: 1rem;">Matrix mode activated...</p>
        </div>
    `;
    document.body.appendChild(message);
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
    
    konamiCode = [];
}

// 2. Keyword Easter Eggs — type "root", "nmap", or "sudo" anywhere on the page
let typedKeys = [];

document.addEventListener('keypress', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    typedKeys.push(e.key.toLowerCase());
    typedKeys = typedKeys.slice(-6);

    const typed = typedKeys.join('');
    if (typed.endsWith('root')) { typedKeys = []; activateRootMode(); }
    else if (typed.endsWith('nmap')) { typedKeys = []; activateNmapEasterEgg(); }
    else if (typed.endsWith('sudo')) { typedKeys = []; activateSudoEasterEgg(); }
});

// Secret Terminal: Ctrl+Shift+H
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        openSecretTerminal();
    }
});

function activateRootMode() {
    console.log('%c# ROOT ACCESS GRANTED #', 'background: #ff073a; color: #fff; font-size: 18px; font-weight: bold; padding: 10px;');
    
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 100000;
                    background: var(--bg-secondary); border: 2px solid var(--accent-red);
                    padding: 1.5rem; border-radius: 8px; font-family: 'JetBrains Mono', monospace;
                    box-shadow: 0 0 30px rgba(255, 7, 58, 0.5); animation: slideInRight 0.5s;">
            <div style="color: var(--accent-red); font-size: 1rem; margin-bottom: 0.5rem;">⚠️ ROOT ACCESS GRANTED ⚠️</div>
            <div style="color: var(--text-bright); font-size: 0.875rem;">fr3akazo1d@root:~# whoami</div>
            <div style="color: var(--accent-cyan); font-size: 0.875rem;">root</div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Flash screen red
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(255, 7, 58, 0.2)';
    overlay.style.zIndex = '99998';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s';
        setTimeout(() => overlay.remove(), 500);
    }, 200);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
    
    typedKeys = [];
}

// 3. Triple Click Logo Easter Egg
let logoClickCount = 0;
let logoClickTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logoClickCount++;
            clearTimeout(logoClickTimer);
            
            if (logoClickCount === 3) {
                activateLogoEasterEgg();
                logoClickCount = 0;
            }
            
            logoClickTimer = setTimeout(() => {
                logoClickCount = 0;
            }, 500);
        });
    }
});

function activateLogoEasterEgg() {
    console.log('%c👾 LOGO EASTER EGG ACTIVATED! 👾', 'background: #39ff14; color: #10141a; font-size: 16px; padding: 8px;');
    
    // Spin and glow effect
    const logo = document.querySelector('.logo');
    const originalTransform = logo.style.transform;
    const originalFilter = logo.style.filter;
    
    logo.style.transition = 'all 1s ease';
    logo.style.transform = 'rotate(720deg) scale(1.5)';
    logo.style.filter = 'drop-shadow(0 0 30px var(--accent-cyan)) drop-shadow(0 0 60px var(--accent-green))';
    
    setTimeout(() => {
        logo.style.transform = originalTransform;
        logo.style.filter = originalFilter;
    }, 1000);
    
    // Show secret message
    const secret = document.createElement('div');
    secret.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    z-index: 100000; background: var(--bg-secondary); border: 2px solid var(--accent-green);
                    padding: 2rem; border-radius: 12px; text-align: center; font-family: 'JetBrains Mono', monospace;
                    box-shadow: 0 0 50px rgba(57, 255, 20, 0.4);">
            <h3 style="color: var(--accent-green); margin-bottom: 1rem;">🎯 Secret Found! 🎯</h3>
            <p style="color: var(--text-bright);">You're curious... I like that.</p>
            <p style="color: var(--accent-cyan); margin-top: 0.5rem; font-size: 0.875rem;">Try: Konami Code | type "root" | type "nmap" | type "sudo"</p>
            <p style="color: var(--accent-red); margin-top: 0.4rem; font-size: 0.8rem;">...or press <kbd style="background:rgba(0,255,247,0.1);border:1px solid var(--accent-cyan);border-radius:3px;padding:1px 5px">Ctrl+Shift+H</kbd> 🤫</p>
        </div>
    `;
    document.body.appendChild(secret);
    
    setTimeout(() => {
        secret.style.opacity = '0';
        secret.style.transition = 'opacity 0.5s';
        setTimeout(() => secret.remove(), 500);
    }, 4000);
}

// 4. Console Message Easter Egg
console.log('%c🔍 HINT: Try triple-clicking the logo, then keep exploring...', 'color: #39ff14; font-size: 12px; font-style: italic; font-family: monospace;');

// 5. Fake Hacking Progress Bar
const hackButton = document.getElementById('hackButton');
if (hackButton) {
    hackButton.addEventListener('click', () => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 99999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.5rem;
            font-family: 'JetBrains Mono', monospace;
            padding: 2rem;
            overflow-y: auto;
        `;
        
        document.body.appendChild(overlay);
        
        // Random code snippets for terminals
        const codeSnippets = [
            'import socket\nimport struct\n\nHOST = "192.168.1.100"\nPORT = 4444\n\nshellcode = b"\\x90" * 100\nconnect(HOST, PORT)',
            'nmap -sS -sV -O 10.0.0.0/24\nScanning ports...\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https',
            'sqlmap -u "target.com/page?id=1"\n[INFO] testing SQL injection\n[CRITICAL] vulnerable to injection!\nDumping database schema...',
            'msfconsole\nuse exploit/multi/handler\nset PAYLOAD windows/meterpreter/reverse_tcp\nset LHOST 192.168.1.50\nexploit -j',
            'hydra -L users.txt -P pass.txt ssh://target.com\n[22][ssh] host: target.com login: admin password: p@ssw0rd\n[STATUS] attack finished',
        ];
        
        let terminals = [];
        let currentStep = 0;
        
        // Step 1: First terminal with random code
        setTimeout(() => {
            const term1 = createTerminal('Establishing Connection...', codeSnippets[0], 'cyan');
            overlay.appendChild(term1);
            terminals.push(term1);
            typeText(term1.querySelector('.terminal-output'), codeSnippets[0], 30);
        }, 300);
        
        // Step 2: Second terminal
        setTimeout(() => {
            const term2 = createTerminal('Scanning Network...', codeSnippets[1], 'cyan');
            overlay.appendChild(term2);
            terminals.push(term2);
            typeText(term2.querySelector('.terminal-output'), codeSnippets[1], 25);
        }, 2500);
        
        // Step 3: Third terminal
        setTimeout(() => {
            const term3 = createTerminal('Exploiting Vulnerabilities...', codeSnippets[2], 'cyan');
            overlay.appendChild(term3);
            terminals.push(term3);
            typeText(term3.querySelector('.terminal-output'), codeSnippets[2], 28);
        }, 4800);
        
        // Step 4: Fourth terminal with progress bar
        setTimeout(() => {
            const term4 = createTerminalWithProgress();
            overlay.appendChild(term4);
            terminals.push(term4);
            
            const output = term4.querySelector('.terminal-output');
            const progressBar = term4.querySelector('.progress-bar');
            const progressText = term4.querySelector('.progress-text');
            
            const messages = [
                '[*] Initializing payload injection...',
                '[*] Bypassing authentication...',
                '[*] Escalating privileges...',
                '[*] Accessing restricted files...',
                '[*] Downloading sensitive data...',
                '[*] Covering tracks...',
                '[!] Finalizing access...'
            ];
            
            let progress = 0;
            let messageIndex = 0;
            
            const interval = setInterval(() => {
                if (messageIndex < messages.length) {
                    output.innerHTML += messages[messageIndex] + '<br>';
                    output.scrollTop = output.scrollHeight;
                    messageIndex++;
                }
                
                progress += Math.random() * 12 + 8;
                if (progress > 100) progress = 100;
                
                progressBar.style.width = progress + '%';
                progressText.textContent = Math.floor(progress) + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Step 5: Show ACCESS GRANTED box
                    setTimeout(() => {
                        showAccessGranted(overlay);
                    }, 800);
                }
            }, 350);
        }, 7200);
        
        function createTerminal(title, content, color) {
            const terminal = document.createElement('div');
            terminal.style.cssText = `
                width: 90%;
                max-width: 700px;
                background: rgba(20, 29, 43, 0.95);
                border: 2px solid var(--accent-${color});
                border-radius: 8px;
                padding: 1.5rem;
                box-shadow: 0 0 30px rgba(0, 255, 247, 0.2);
                animation: terminalSlideIn 0.5s ease;
            `;
            
            const header = document.createElement('div');
            header.style.cssText = `
                color: var(--accent-${color});
                font-weight: 600;
                margin-bottom: 1rem;
                font-size: 0.95rem;
            `;
            header.textContent = title;
            
            const output = document.createElement('div');
            output.className = 'terminal-output';
            output.style.cssText = `
                color: var(--accent-${color});
                font-size: 0.85rem;
                line-height: 1.6;
                min-height: 80px;
                white-space: pre-wrap;
            `;
            
            terminal.appendChild(header);
            terminal.appendChild(output);
            return terminal;
        }
        
        function createTerminalWithProgress() {
            const terminal = document.createElement('div');
            terminal.style.cssText = `
                width: 90%;
                max-width: 700px;
                background: rgba(20, 29, 43, 0.95);
                border: 2px solid var(--accent-cyan);
                border-radius: 8px;
                padding: 1.5rem;
                box-shadow: 0 0 30px rgba(0, 255, 247, 0.2);
                animation: terminalSlideIn 0.5s ease;
            `;
            
            const header = document.createElement('div');
            header.style.cssText = `
                color: var(--accent-cyan);
                font-weight: 600;
                margin-bottom: 1rem;
                font-size: 0.95rem;
            `;
            header.textContent = 'Executing Main Attack Vector...';
            
            const output = document.createElement('div');
            output.className = 'terminal-output';
            output.style.cssText = `
                color: var(--accent-cyan);
                font-size: 0.85rem;
                line-height: 1.6;
                margin-bottom: 1rem;
                max-height: 150px;
                overflow-y: auto;
            `;
            
            const progressContainer = document.createElement('div');
            progressContainer.style.cssText = `
                width: 100%;
                height: 25px;
                background: rgba(16, 20, 26, 0.8);
                border: 1px solid var(--accent-cyan);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            `;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                width: 0%;
                height: 100%;
                background: linear-gradient(90deg, var(--accent-cyan), var(--accent-red));
                transition: width 0.3s ease;
                box-shadow: 0 0 20px var(--accent-cyan);
            `;
            
            const progressText = document.createElement('div');
            progressText.className = 'progress-text';
            progressText.style.cssText = `
                color: var(--accent-red);
                text-align: center;
                font-size: 1rem;
                font-weight: 600;
            `;
            progressText.textContent = '0%';
            
            progressContainer.appendChild(progressBar);
            terminal.appendChild(header);
            terminal.appendChild(output);
            terminal.appendChild(progressContainer);
            terminal.appendChild(progressText);
            return terminal;
        }
        
        function showAccessGranted(overlay) {
            const accessBox = document.createElement('div');
            accessBox.style.cssText = `
                width: 90%;
                max-width: 600px;
                background: rgba(20, 29, 43, 0.98);
                border: 3px solid var(--accent-red);
                border-radius: 12px;
                padding: 3rem 2rem;
                box-shadow: 0 0 60px rgba(255, 7, 58, 0.5);
                animation: accessGranted 0.6s ease;
                text-align: center;
            `;
            
            accessBox.innerHTML = `
                <div style="color: var(--accent-red); font-size: 3rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 0 0 20px var(--accent-red);">
                    ACCESS GRANTED
                </div>
                <div style="color: var(--accent-cyan); font-size: 1.2rem; margin-bottom: 2rem;">
                    ✓ System Compromised Successfully
                </div>
                <div style="color: var(--accent-green); font-size: 1rem; margin-bottom: 1rem;">
                    HACK COMPLETE!
                </div>
                <div style="color: var(--text-main); font-size: 0.9rem; opacity: 0.8; line-height: 1.6;">
                    Just kidding! 😄<br>
                    No systems were harmed in the making of this joke.<br>
                    Stay ethical, stay legal!
                </div>
            `;
            
            overlay.appendChild(accessBox);
            
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.5s';
                setTimeout(() => overlay.remove(), 500);
            }, 4000);
        }
        
        function typeText(element, text, speed) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, speed);
        }
        
        // Add animations to CSS
        if (!document.querySelector('#hack-animations')) {
            const style = document.createElement('style');
            style.id = 'hack-animations';
            style.textContent = `
                @keyframes terminalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes accessGranted {
                    0% {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Click overlay to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.5s';
                setTimeout(() => overlay.remove(), 500);
            }
        });
    });
}

// ============================================================
// NEW EASTER EGGS
// ============================================================

// 6. Type "nmap" — fake port scan notification
function activateNmapEasterEgg() {
    if (document.querySelector('#nmap-egg')) return;
    const lines = [
        'Starting Nmap 7.95 ( https://nmap.org )',
        'Nmap scan report for localhost (127.0.0.1)',
        'Host is up (0.000013s latency).',
        '',
        'PORT      STATE    SERVICE',
        '22/tcp    filtered ssh',
        '80/tcp    open     http',
        '443/tcp   open     https',
        '1337/tcp  open     hacker-mode',
        '31337/tcp open     l33t',
        '4444/tcp  open     metasploit',
        '',
        'Nmap done: 1 IP scanned in 0.42 seconds',
        '',
        '[!] Nice recon. You found the nmap easter egg.',
    ];
    const box = document.createElement('div');
    box.id = 'nmap-egg';
    box.style.cssText = 'position:fixed;bottom:2rem;left:2rem;z-index:100000;background:var(--bg-secondary);border:1px solid var(--accent-cyan);border-radius:8px;overflow:hidden;font-family:\'JetBrains Mono\',monospace;box-shadow:0 0 30px rgba(0,255,247,0.4);max-width:460px';
    box.innerHTML = `
        <div style="background:#0a0e14;padding:.5rem 1rem;display:flex;align-items:center;gap:.5rem;border-bottom:1px solid rgba(0,255,247,.2)">
            <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block"></span>
            <span style="color:var(--text-main);font-size:.8rem;margin-left:.5rem">nmap-scan.sh</span>
        </div>
        <div id="nmap-out" style="padding:1rem;color:var(--accent-cyan);font-size:.8rem;line-height:1.7;min-height:60px;white-space:pre"></div>
    `;
    document.body.appendChild(box);
    const out = box.querySelector('#nmap-out');
    let i = 0;
    const iv = setInterval(() => {
        if (i < lines.length) { out.textContent += lines[i++] + '\n'; }
        else {
            clearInterval(iv);
            setTimeout(() => {
                box.style.opacity = '0'; box.style.transition = 'opacity .5s';
                setTimeout(() => box.remove(), 500);
            }, 4000);
        }
    }, 160);
}

// 7. Type "sudo" — permission denied toast
function activateSudoEasterEgg() {
    if (document.querySelector('#sudo-egg')) return;
    const toast = document.createElement('div');
    toast.id = 'sudo-egg';
    toast.style.cssText = 'position:fixed;top:5rem;right:2rem;z-index:100000;background:var(--bg-secondary);border:1px solid var(--accent-red);border-radius:8px;padding:1.2rem 1.5rem;font-family:\'JetBrains Mono\',monospace;box-shadow:0 0 30px rgba(255,0,60,0.4);max-width:420px';
    toast.innerHTML = `
        <div style="color:var(--text-bright);font-size:.85rem;margin-bottom:.4rem">fr3akazo1d@localhost:~$ <span style="color:var(--accent-cyan)">sudo rm -rf /</span></div>
        <div style="color:var(--text-main);font-size:.85rem;margin-bottom:.4rem">[sudo] password for fr3akazo1d: <span style="color:transparent;user-select:none">hunter2</span></div>
        <div style="color:var(--accent-red);font-size:.85rem;margin-bottom:.2rem">sudo: permission denied.</div>
        <div style="color:var(--accent-red);font-size:.85rem;margin-bottom:.6rem">This incident will be reported to /dev/null.</div>
        <div style="color:var(--accent-cyan);font-size:.85rem">Nice try. \uD83D\uDE08</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0'; toast.style.transition = 'opacity .5s';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// 8. Secret Terminal — Ctrl+Shift+H
function openSecretTerminal() {
    const existing = document.querySelector('#secret-terminal-modal');
    if (existing) { existing.remove(); return; }

    const CMDS = {
        help:          () => 'Available commands:\n  whoami       current user\n  id           uid/gid info\n  ls | ls -la  list files\n  cat [file]   read a file\n  pwd          working directory\n  uname -a     kernel info\n  date         current time\n  history      command log\n  clear        clear screen\n  exit         close terminal\n\n[HINT] Some files might be interesting...',
        whoami:        () => 'fr3akazo1d',
        id:            () => 'uid=0(root) gid=0(root) groups=0(root),1337(elite-haxors)',
        pwd:           () => '/root/secrets',
        ls:            () => 'flag.txt   README.md   exploits/   tools/   .secrets',
        'ls -la':      () => 'total 1337\n-rw-r--r--  fr3akazo1d root  flag.txt\n-rw-r--r--  fr3akazo1d root  README.md\ndrwxr-xr-x  fr3akazo1d root  exploits/\ndrwxr-xr-x  fr3akazo1d root  tools/\n-rwx------  fr3akazo1d root  .secrets',
        'cat flag.txt':      () => '\x1b[31mFLAG{y0u_f0und_th3_53cr3t_t3rm1n4l_w3lc0m3_h4ck3r_2026}\x1b[0m\n\nCongratulations. You are exactly the kind of person\nwho reads source code and pokes at hidden things.\nThat is the hacker mindset. \uD83D\uDDA4',
        'cat readme.md':     () => '# fr3akazo1d\n\n"Sometimes I feel like giving up, then I remember\n I have a lot of people to prove wrong."\n\nRed Team Operator & Security Researcher.',
        'cat .secrets':      () => 'cat: .secrets: Permission denied',
        'cat /etc/passwd':   () => 'root:x:0:0:root:/root:/bin/bash\nfr3akazo1d:x:1337:1337::/home/fr3akazo1d:/bin/zsh\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin',
        'uname':       () => 'Linux',
        'uname -a':    () => 'Linux fr3akazo1d-root 6.6.6-l33t #1 SMP PREEMPT hax0r 2025 x86_64 GNU/Linux',
        date:          () => new Date().toString(),
        history:       () => '  1  nmap -sS 10.0.0.0/24\n  2  ssh root@target\n  3  sudo su -\n  4  cat /etc/shadow\n  5  john --wordlist=rockyou.txt hashes.txt\n  6  msfconsole\n  7  cat flag.txt\n  8  rm -rf /var/log/*\n  9  history -c',
        exit:          () => '__EXIT__',
        clear:         () => '__CLEAR__',
    };

    const hist = [];
    let hidx = -1;
    const CYAN = 'var(--accent-cyan)', RED = 'var(--accent-red)';

    const modal = document.createElement('div');
    modal.id = 'secret-terminal-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:200000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.88);backdrop-filter:blur(4px)';
    modal.innerHTML = `
        <div style="width:min(720px,92vw);background:var(--bg-secondary);border:1px solid var(--accent-cyan);border-radius:12px;overflow:hidden;box-shadow:0 0 60px rgba(0,255,247,.35);display:flex;flex-direction:column;max-height:82vh">
            <div style="background:#0a0e14;padding:.7rem 1rem;display:flex;align-items:center;gap:.5rem;border-bottom:1px solid rgba(0,255,247,.2);flex-shrink:0">
                <span id="st-x" style="width:12px;height:12px;border-radius:50%;background:#ff5f56;display:inline-block;cursor:pointer"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;display:inline-block"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#27c93f;display:inline-block"></span>
                <span style="color:var(--accent-cyan);font-size:.82rem;margin-left:.75rem;font-family:'JetBrains Mono',monospace">fr3akazo1d@root:~# \u2014 SECRET TERMINAL</span>
                <span style="margin-left:auto;color:rgba(192,192,192,.45);font-size:.72rem;font-family:'JetBrains Mono',monospace">Ctrl+Shift+H to close</span>
            </div>
            <div id="st-out" style="flex:1;overflow-y:auto;padding:1rem;font-family:'JetBrains Mono',monospace;font-size:.83rem;line-height:1.8;color:var(--text-main);min-height:260px"></div>
            <div style="display:flex;align-items:center;padding:.5rem 1rem;border-top:1px solid rgba(0,255,247,.2);background:#0a0e14;flex-shrink:0">
                <span style="color:${RED};font-family:'JetBrains Mono',monospace;font-size:.83rem;margin-right:.5rem;white-space:nowrap">fr3akazo1d@root:~#</span>
                <input id="st-in" type="text" autocomplete="off" spellcheck="false" style="flex:1;background:transparent;border:none;outline:none;color:${CYAN};font-family:'JetBrains Mono',monospace;font-size:.83rem;caret-color:${CYAN}">
            </div>
        </div>`;
    document.body.appendChild(modal);

    const outEl = modal.querySelector('#st-out');
    const inpEl = modal.querySelector('#st-in');

    function ansi(t) {
        return t
            .replace(/\x1b\[31m/g, `<span style="color:${RED}">`)
            .replace(/\x1b\[0m/g,  '</span>')
            .replace(/\n/g, '<br>');
    }
    function print(html, color) {
        const d = document.createElement('div');
        if (color) d.style.color = color;
        d.innerHTML = html;
        outEl.appendChild(d);
        outEl.scrollTop = outEl.scrollHeight;
    }
    function printCmd(cmd) {
        print(`<span style="color:${RED}">fr3akazo1d@root:~#</span> <span style="color:${CYAN}">${cmd}</span>`);
    }

    print(`<span style="color:${CYAN};font-size:1rem;font-weight:700">Secret Terminal v1.337</span>`);
    print(`<span style="color:rgba(192,192,192,.6);font-size:.78rem">Type <span style="color:${CYAN}">help</span> for commands. There might be something interesting here...</span>`);
    print('');
    setTimeout(() => inpEl.focus(), 50);

    function run(raw) {
        const cmd = raw.trim().toLowerCase();
        if (!cmd) return;
        hist.unshift(cmd); hidx = -1;
        printCmd(cmd);
        const fn = CMDS[cmd];
        const res = fn ? fn() : `bash: ${cmd}: command not found`;
        if (res === '__EXIT__')  { modal.remove(); return; }
        if (res === '__CLEAR__') { outEl.innerHTML = ''; return; }
        if (res) print(ansi(res));
    }

    inpEl.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter')       { run(inpEl.value); inpEl.value = ''; }
        else if (e.key === 'Escape')  { modal.remove(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (hidx < hist.length - 1) inpEl.value = hist[++hidx]; }
        else if (e.key === 'ArrowDown') { e.preventDefault(); inpEl.value = --hidx >= 0 ? hist[hidx] : (hidx = -1, ''); }
    });
    modal.querySelector('#st-x').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    inpEl.addEventListener('click', (e) => e.stopPropagation());
}

// ============================================================
// === HACKER FEATURES (Matrix Rain, Visitor Scan, Threat Feed)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

// ---- MATRIX RAIN CANVAS ----
(function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const CHARS = '0123456789ABCDEF';
    const FONT_SIZE = 13;
    let cols, drops;

    function resize() {
        canvas.width  = canvas.offsetWidth  || canvas.parentElement.offsetWidth;
        canvas.height = canvas.offsetHeight || canvas.parentElement.offsetHeight;
        cols  = Math.floor(canvas.width / FONT_SIZE);
        drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
        // Semi-transparent fill creates the fading trail
        ctx.fillStyle = 'rgba(16, 20, 26, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < cols; i++) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)];
            const y    = drops[i] * FONT_SIZE;

            // Bright lead character
            if (drops[i] > 0 && Math.random() > 0.92) {
                ctx.fillStyle = '#ffffff';
            } else {
                const alpha = 0.08 + Math.random() * 0.55;
                ctx.fillStyle = `rgba(0, 255, 247, ${alpha})`;
            }

            ctx.fillText(char, i * FONT_SIZE, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 0.5;
        }
    }

    setInterval(draw, 55);
})();

// ---- VISITOR RECON SCAN TERMINAL ----
(async function initVisitorScan() {
    const overlay  = document.getElementById('visitorScan');
    if (!overlay) return;

    // Only on homepage, only once per session
    const isHome = ['/', '/index.html', ''].includes(window.location.pathname);
    if (!isHome || sessionStorage.getItem('visitorScanShown')) return;
    sessionStorage.setItem('visitorScanShown', 'true');

    const body     = document.getElementById('visitorScanBody');
    const closeBtn = overlay.querySelector('.visitor-scan-close');

    // ── Collect real browser fingerprint data ──
    const ua     = navigator.userAgent;
    let os = 'Unknown OS';
    if      (/Windows NT 1[0-9]/.test(ua))    os = 'Windows 10/11';
    else if (/Windows NT 6/.test(ua))          os = 'Windows 7/8';
    else if (/Mac OS X/.test(ua))              os = 'macOS';
    else if (/Android/.test(ua))               os = 'Android';
    else if (/iPhone|iPad/.test(ua))           os = 'iOS';
    else if (/Linux/.test(ua))                 os = 'Linux';

    let browser = 'Unknown';
    if      (/Firefox\//.test(ua))  browser = 'Firefox';
    else if (/Edg\//.test(ua))      browser = 'Edge';
    else if (/Chrome\//.test(ua))   browser = 'Chrome';
    else if (/Safari\//.test(ua))   browser = 'Safari';

    const resolution = `${window.screen.width}x${window.screen.height}`;
    const lang       = navigator.language || 'Unknown';
    const tz         = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown';
    const cpu        = navigator.hardwareConcurrency || '?';

    // Try to get real IP + country
    let ip      = '██.██.██.██';
    let country = '';
    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3000);
        const resp  = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timer);
        const data  = await resp.json();
        if (data.ip)           ip      = data.ip;
        if (data.country_name) country = ` (${data.country_name})`;
    } catch (_) { /* silently fail */ }

    const lines = [
        { text: '[*] Initiating visitor reconnaissance...', delay: 0,    color: 'cyan'  },
        { text: `[*] Target host   : ${window.location.hostname}`,       delay: 500,  color: 'text'  },
        { text: '[*] Scanning incoming connection...',                    delay: 950,  color: 'cyan'  },
        { text: `[+] IP Address    : ${ip}${country}`,                   delay: 1500, color: 'green' },
        { text: `[+] OS            : ${os}`,                             delay: 1900, color: 'green' },
        { text: `[+] Browser       : ${browser}`,                        delay: 2200, color: 'green' },
        { text: `[+] Resolution    : ${resolution}`,                     delay: 2500, color: 'green' },
        { text: `[+] Language      : ${lang}`,                           delay: 2800, color: 'green' },
        { text: `[+] Timezone      : ${tz}`,                             delay: 3100, color: 'green' },
        { text: `[+] CPU Cores     : ${cpu}`,                            delay: 3400, color: 'green' },
        { text: '',                                                       delay: 3700, color: 'text'  },
        { text: '[*] Running exploit modules...',                         delay: 3800, color: 'cyan'  },
        { text: '[!] CVE-2024-1337  ........... PATCHED',                delay: 4200, color: 'red'   },
        { text: '[!] CVE-2025-0013  ........... PATCHED',                delay: 4500, color: 'red'   },
        { text: '[*] Attempting privilege escalation...',                 delay: 4900, color: 'cyan'  },
        { text: '[-] sudo: permission denied.',                          delay: 5350, color: 'red'   },
        { text: '',                                                       delay: 5600, color: 'text'  },
        { text: '// Just kidding — welcome to my site, hacker. 😈',      delay: 5750, color: 'cyan'  },
        { text: '[+] ACCESS GRANTED',                                    delay: 6100, color: 'green' },
    ];

    function close() {
        overlay.classList.remove('show');
        setTimeout(() => { if (overlay.parentNode) overlay.style.display = 'none'; }, 450);
    }

    // Show after loading screen has had time to finish
    setTimeout(() => {
        overlay.classList.add('show');

        lines.forEach(({ text, delay, color }) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `scan-line scan-line--${color}`;
                line.textContent = text;
                body.appendChild(line);
                body.scrollTop = body.scrollHeight;
            }, delay);
        });

        // Auto-close ~1 s after last line
        setTimeout(close, lines[lines.length - 1].delay + 1200);
    }, 2800);

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
})();

// ---- SECURITY NEWS FEED (The Hacker News via rss2json) ----
(function initSecFeed() {
    const feed      = document.getElementById('threatFeed');
    const feedBody  = document.getElementById('threatFeedBody');
    const toggle    = document.getElementById('threatFeedToggle');
    const refreshBtn= document.getElementById('threatFeedRefresh');
    if (!feed || !feedBody || !toggle) return;

    const RSS_URL   = 'https://thehackernews.com/feeds/posts/default';
    const API       = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
    const REFRESH_MS = 10 * 60 * 1000; // auto-refresh every 10 min
    let minimized    = false;

    function timeAgo(dateStr) {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60)                  return `${diff}s ago`;
        if (diff < 3600)                return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400)               return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    }

    function setStatus(msg) {
        feedBody.innerHTML = `<div class="sec-feed-status">${msg}</div>`;
    }

    function render(items) {
        feedBody.innerHTML = '';
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'sec-article';
            el.innerHTML = `
                <a class="sec-article-link" href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                <div class="sec-article-meta">
                    <span class="sec-article-meta-age">${timeAgo(item.pubDate)}</span>
                </div>`;
            feedBody.appendChild(el);
        });
    }

    async function fetchFeed() {
        if (refreshBtn) {
            refreshBtn.classList.add('spinning');
            setTimeout(() => refreshBtn.classList.remove('spinning'), 650);
        }
        setStatus('fetching...');
        try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 8000);
            const resp  = await fetch(API, { signal: controller.signal });
            clearTimeout(timer);
            const data  = await resp.json();
            if (data.status === 'ok' && data.items && data.items.length) {
                render(data.items);
            } else {
                setStatus('no articles found');
            }
        } catch (e) {
            setStatus(e.name === 'AbortError' ? 'timeout — retry ↺' : 'offline — retry ↺');
        }
    }

    // Initial load
    fetchFeed();

    // Auto-refresh
    setInterval(fetchFeed, REFRESH_MS);

    if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // don't trigger header toggle
            fetchFeed();
        });
    }

    function doToggle() {
        minimized = !minimized;
        feed.classList.toggle('minimized', minimized);
        toggle.textContent = minimized ? '+' : '_';
    }

    // Whole header toggles the panel
    const header = feed.querySelector('.threat-feed-header');
    if (header) header.addEventListener('click', doToggle);

    // Keep standalone button working too (stopPropagation so it doesn't double-fire)
    toggle.addEventListener('click', (e) => { e.stopPropagation(); doToggle(); });
})();

// ---- DECRYPT EFFECT ON SECTION TITLES ----
(function initDecryptTitles() {
    const CHARSET   = '0123456789ABCDEF#@!%?<>/\\|~^$&*[]';
    const FRAME_MS  = 35;   // interval between scramble frames
    const LOCK_RATE = 6;    // scramble frames before each char locks in

    function decrypt(el) {
        if (el.dataset.decrypted) return;
        el.dataset.decrypted = 'true';

        const original = el.textContent;
        const len      = original.length;
        let locked     = 0;
        let frame      = 0;

        // Suppress glitch pseudo-elements while decrypting
        el.classList.add('decrypting');

        const iv = setInterval(() => {
            let out = '';
            for (let i = 0; i < len; i++) {
                if (i < locked || original[i] === ' ') {
                    out += original[i];
                } else {
                    out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
                }
            }
            el.textContent = out;

            if (frame % LOCK_RATE === 0 && locked < len) locked++;
            frame++;

            if (locked >= len) {
                clearInterval(iv);
                el.textContent = original;
                el.classList.remove('decrypting');
            }
        }, FRAME_MS);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Small delay so the user sees the scramble start
                setTimeout(() => decrypt(entry.target), 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.35 });

    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
})();

}); // end DOMContentLoaded
