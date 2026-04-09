document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada con Intersection Observer
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-box, .profile-img-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Barra de Progreso de Scroll
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}%`;
            scrollProgress.style.width = scroll;
        });
    }

    // Lógica de Traducción (Español / Inglés)
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    let currentLang = 'es'; 

    const typewriterDict = {
        es: ["Full Stack Developer", "Especialista en Ciberseguridad", "Entusiasta de Cloud & AWS"],
        en: ["Full Stack Developer", "Cybersecurity Specialist", "Cloud & AWS Enthusiast"]
    };

    let words = typewriterDict[currentLang];

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            if (langText) langText.innerText = currentLang === 'es' ? 'EN' : 'ES';

            document.querySelectorAll('.lang').forEach(el => {
                el.innerHTML = el.getAttribute(`data-${currentLang}`);
            });

            words = typewriterDict[currentLang];
        });
    }

    // Efecto Máquina de Escribir
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        let i = 0;
        
        function typingEffect() {
            if (i >= words.length) i = 0; 
            
            let word = words[i].split("");
            var loopTyping = function() {
                if (word.length > 0) {
                    typeWriterElement.innerHTML += word.shift();
                } else {
                    setTimeout(deletingEffect, 2000);
                    return false;
                }
                setTimeout(loopTyping, 100);
            };
            loopTyping();
        }

        function deletingEffect() {
            let word = typeWriterElement.innerHTML.split("");
            var loopDeleting = function() {
                if (word.length > 0) {
                    word.pop();
                    typeWriterElement.innerHTML = word.join("");
                } else {
                    i++;
                    if (i >= words.length) i = 0;
                    setTimeout(typingEffect, 500);
                    return false;
                }
                setTimeout(loopDeleting, 50);
            };
            loopDeleting();
        }

        typingEffect();
    }

    console.log("Portafolio Bilingüe de Juan Villa Crisosto cargado correctamente.");
});
