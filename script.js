document.addEventListener('DOMContentLoaded', () => {
    
    // Animaciones de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-box, .section-title, .profile-img-container').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // Añadir clase para activar la animación
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    });

    // Barra de progreso de lectura
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;
    });

    // Máquina de escribir (Typewriter) bilingüe
    const typewriterElement = document.getElementById('typewriter');
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    
    let currentLang = 'es';
    const phrases = {
        es: ["Full Stack Developer", "Especialista en Ciberseguridad", "Entusiasta de Cloud & AWS", "Resolutor de Problemas"],
        en: ["Full Stack Developer", "Cybersecurity Specialist", "Cloud & AWS Enthusiast", "Problem Solver"]
    };

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrases = phrases[currentLang];
        const currentFullText = currentPhrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentFullText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentFullText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentFullText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pausa al final
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % currentPhrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Iniciar máquina de escribir
    if (typewriterElement) type();

    // Lógica de cambio de idioma
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            langText.textContent = currentLang === 'es' ? 'EN' : 'ES';

            document.querySelectorAll('.lang').forEach(el => {
                const text = el.getAttribute(`data-${currentLang}`);
                if (text) el.innerHTML = text;
            });

            // Reiniciar máquina de escribir para el nuevo idioma
            phraseIndex = 0;
            charIndex = 0;
            isDeleting = false;
        });
    }
});

// Efecto sutil de inclinación en las skills
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});
