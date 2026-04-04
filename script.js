document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para las tarjetas
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
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight * 100}%`;
        scrollProgress.style.width = scroll;
    });

    // Efecto Máquina de Escribir
    const words = ["Full Stack Developer", "Especialista en Ciberseguridad", "Entusiasta de Cloud & AWS"];
    let i = 0;
    let timer;
    
    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typewriter').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000); // Espera 2 segundos antes de borrar
                return false;
            }
            timer = setTimeout(loopTyping, 100); // Velocidad de escritura
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typewriter').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0; // Vuelve al inicio del array
                }
                setTimeout(typingEffect, 500); // Espera medio segundo antes de escribir la siguiente
                return false;
            }
            timer = setTimeout(loopDeleting, 50); // Velocidad de borrado
        };
        loopDeleting();
    }

    typingEffect(); // Inicia el efecto

    console.log("Perfil Profesional de Juan Villa Crisosto cargado. Interacciones Front-End activas.");
});
