document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Lightbox / Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');
    const orderBtn = document.getElementById('modal-order-btn');

    // Manejador para abrir el modal
    document.querySelectorAll('.galeria-grid img, .product-card img, .hero-img').forEach(img => {
        img.addEventListener('click', () => {
            const card = img.closest('.product-card');
            
            if (card) {
                // Si la imagen está en una tarjeta de producto, copiamos su info
                modalTitle.textContent = card.querySelector('h3').textContent;
                modalPrice.textContent = card.querySelector('.price').textContent;
                modalDesc.textContent = card.querySelectorAll('p')[1].textContent;
            } else {
                // Si es de la galería
                modalTitle.textContent = "¡Delicioso Antojo!";
                modalPrice.textContent = "Consulta nuestro menú";
                modalDesc.textContent = "Hecho con los mejores ingredientes en PJ Strawberries. ¡Ven a probarlo!";
            }
            
            modalImg.src = img.src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
        });
    });

    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    orderBtn.addEventListener('click', closeModal);

    // Cerrar si hace click fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
