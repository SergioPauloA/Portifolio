document.addEventListener('DOMContentLoaded', () => {
    // Menu icon functionality
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    menuIcon?.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Scroll sections
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('.header');

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Update active section
                sections.forEach(sec => {
                    const offset = sec.offsetTop - 150;
                    const height = sec.offsetHeight;
                    const id = sec.getAttribute('id');

                    if (scrollY >= offset && scrollY < offset + height) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                        });
                        document.querySelector(`header nav a[href*=${id}]`)?.classList.add('active');
                    }
                });

                // Sticky header
                header?.classList.toggle('sticky', scrollY > 100);
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Dark mode toggle
    const darkModeIcon = document.querySelector('#darkMode-icon');
    darkModeIcon?.addEventListener('click', () => {
        darkModeIcon.classList.toggle('bx-sun');
        document.body.classList.toggle('dark-mode');
    });

    // Initialize EmailJS
    emailjs.init("T9ykyAN5B5SCj9BHg");

    // Initialize Swiper
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });

    // Initialize ScrollReveal with performance optimizations
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
        mobile: true,
        useDelay: 'once',
        viewFactor: 0.2
    });

    // Batch ScrollReveal animations
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
});

// Contact form submission
window.sendEmail = function(e) {
    e.preventDefault();

    const templateParams = {
        to_email: 'faire078@gmail.com',
        from_name: document.getElementById('from_name')?.value,
        from_email: document.getElementById('from_email')?.value,
        phone: document.getElementById('phone')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value
    };

    return emailjs.send('portifólio', 'template_5oqh3ur', templateParams)
        .then(() => {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contactForm')?.reset();
        })
        .catch(error => {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            console.error('Error:', error);
        });
}

//Se precisar fazer deploy de uma nova versão ou atualização do site execute : 
//vercel login
//cd "C:\Users\Sergio\OneDrive\Documentos\Javascript\Portifolio" 
//vercel --prod

// https://portifolio-sergio.vercel.app