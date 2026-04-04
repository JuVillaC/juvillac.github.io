document.addEventListener('DOMContentLoaded', () => {
    // Animación de entrada para las tarjetas de proyectos, skills y la foto de perfil
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-box, .profile-img-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1 
    });

    elementsToAnimate.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    console.log("Perfil Profesional de Juan Villa Crisosto cargado exitosamente.");
});
