document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('a[href^="#"]');
    const whatsBtn = document.getElementById('whatsBtn');
    const mailBtn = document.getElementById('mailBtn');
    const logo = document.querySelector('.navbar-brand img');
    let lastScrollTop = 0;


    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            logo.classList.add('hidden');
            navbar.classList.add('scrolled');
        } else {
            logo.classList.remove('hidden');
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    });

 
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === "" || email === "" || message === "") {
            alert("Por favor, preencha todos os campos.");
            return false;
        }
        return { name, email, message };
    }


    whatsBtn.addEventListener('click', function() {
        const formData = validateForm();
        if (!formData) return;
        
        const { name, message } = formData;
        const whatsappMessage = `Olá, meu nome é ${name}. ${message}`;
        const whatsappURL = `https://wa.me/5541997702641?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');
    });

    mailBtn.addEventListener('click', function() {
        const formData = validateForm();
        if (!formData) return;

        const { name, email, message } = formData;
        const subject = "Mensagem do Site Viamatt";
        const body = `Olá, meu nome é ${name}. Meu e-mail é ${email}. \n\nMensagem: \n${message}`;
        const mailtoURL = `mailto:viamattsoftware@gmail.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoURL;
    });

    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        let lastMouseMove = 0;
        
        card.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove < 5) return; 

            lastMouseMove = now;
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const deltaX = (mouseX - centerX) * 0.5; 
            const deltaY = (mouseY - centerY) * 0.5;

            const logos = card.querySelectorAll('.service-icon');
            logos.forEach(logo => {
                logo.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        });
    });

    serviceCards.forEach(card => {
        card.addEventListener('mouseleave', () => {
            const logos = card.querySelectorAll('.service-icon');
            logos.forEach(logo => {
                logo.style.transform = 'translate(0, 0)';
            });
        });
    });
});
