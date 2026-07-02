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
        navLinks.classList.toggle('active');
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Cambia cada 4 segundos
    }

    // Gallery Filters Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.filterable-gallery img');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 400); // Wait for transition
                }
            });
        });
    });

    // SPA Navigation Logic
    const pageSections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.nav-links a, .logo-link, .cta-button, .promo-btn');

    function navigateTo(targetId, isPageLoad = false) {
        // Update data attribute for CSS
        document.documentElement.setAttribute('data-active-section', targetId);

        // Remove active from all
        pageSections.forEach(section => section.classList.remove('active'));
        
        // Add active to target
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        } 
        
        if (targetId === 'hero') {
            document.getElementById('hero').classList.add('active');
            const promo = document.querySelector('.promociones');
            if(promo) promo.classList.add('active');
        }

        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        if (!isPageLoad) {
            // Actualizar el hash en la URL SIN saltar la pantalla
            // Esto es lo que permite que al recargar, el navegador recuerde en qué sección estabas
            history.pushState(null, null, '#' + targetId);
            window.scrollTo(0, 0);
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                navigateTo(targetId);
            }
        });
    });

    // Al cargar la página, leer el hash de la URL y mostrar la sección correcta
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        navigateTo(initialHash, true);
    } else {
        navigateTo('hero', true);
    }

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

    // Información de Productos (Catálogo)
    const productInfo = {
        '3.jpeg': { title: 'Mangoneada Exótica', price: '$2.50', desc: '¡DULCE, PICOSITA Y REFRESCANTE! El antojo que te enamora. Mango fresco y natural con chamoy, chile y limón.' },
        '17.jpeg': { title: 'Mangoneada Especial', price: '$3.00', desc: 'Nuestra especialidad de mango con más chamoy y dulces picantes para doble diversión.' },
        '7.jpeg': { title: 'Chamoyada Clásica', price: '$2.25', desc: 'La clásica bebida refrescante que mezcla lo dulce del hielo frutal con lo acidito del chamoy.' },
        '8.jpeg': { title: 'Chamoyada Frutal', price: '$2.75', desc: 'Trocitos de fruta natural ahogados en una deliciosa y picosita chamoyada fría.' },
        '9.jpeg': { title: 'Chamoyada Mix', price: '$3.00', desc: 'Una explosión de sabores combinados. Perfecta para combatir el calor con estilo.' },
        
        '4.jpeg': { title: 'Pinchos de Fruta', price: '$1.50', desc: 'Rica fruta fresca de temporada bañada en chocolate o chamoy. Ideal para el antojo rápido.' },
        
        '18.jpeg': { title: 'Fresas con Crema', price: '$2.50', desc: 'Fresas dulces, crema receta de la casa, y el toque perfecto de amor en cada cucharada.' },
        '15.jpeg': { title: 'Postre Especial', price: '$2.75', desc: 'Dulzura inigualable. Pregunta por este especial en nuestro local.' },
        '16.jpeg': { title: 'Postre Fresas', price: '$3.25', desc: 'Las mejores fresas con extra ingredientes y toppings a tu elección.' },
        
        'WhatsApp Image 2026-06-30 at 7.03.50 PM.jpeg': { title: 'Frappé de Oreo', price: '$3.00', desc: '¡Delicioso, cremoso y refrescante! Galletas Oreo crujientes y crema batida.' },
        'WhatsApp Image 2026-06-30 at 7.03.51 PM.jpeg': { title: 'Fresada', price: '$2.50', desc: 'Una bebida dulce y rosa con todo el sabor natural de la fresa y leche condensada.' },
        
        'ChocoLoco2.jpeg': { title: 'Choco Loco', price: 'Desde $1.25', desc: 'Dulce, divertido y espectacular. El postre perfecto bañado en chocolate y gomitas.' },
        'menu.jpeg': { title: 'Nuestro Menú', price: 'Variedad de Opciones', desc: '¡Conoce todos nuestros sabores y opciones para que endulces o le des un toque picosito a tu día!' },
        
        '19.jpeg': { title: '¡Clientes Felices!', price: 'Invaluable', desc: 'Nos encanta verlos disfrutar de nuestros antojitos. ¡Gracias por preferir PJ Strawberries!' },
        '21.jpeg': { title: '¡Clientes Felices!', price: 'Invaluable', desc: 'Nos encanta verlos disfrutar de nuestros antojitos. ¡Gracias por preferir PJ Strawberries!' },
        '23.jpeg': { title: '¡Clientes Felices!', price: 'Invaluable', desc: 'Nos encanta verlos disfrutar de nuestros antojitos. ¡Gracias por preferir PJ Strawberries!' },
        '24.jpeg': { title: '¡Clientes Felices!', price: 'Invaluable', desc: 'Nos encanta verlos disfrutar de nuestros antojitos. ¡Gracias por preferir PJ Strawberries!' },
        '25.jpeg': { title: '¡Clientes Felices!', price: 'Invaluable', desc: 'Nos encanta verlos disfrutar de nuestros antojitos. ¡Gracias por preferir PJ Strawberries!' }
    };

    // Lightbox / Modal Logic
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');
    const orderBtn = document.getElementById('modal-order-btn');

    // Efecto de Lupa (Zoom Hover) en el modal
    modalImg.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        // Calculamos la posición X y Y del ratón dentro de la imagen (en porcentaje)
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        
        modalImg.style.transformOrigin = `${x}% ${y}%`;
        modalImg.style.transform = 'scale(2.2)'; // Nivel de Zoom
        modalImg.style.cursor = 'zoom-in';
    });
    
    modalImg.addEventListener('mouseleave', () => {
        modalImg.style.transformOrigin = 'center';
        modalImg.style.transform = 'scale(1)';
    });

    // Manejador para abrir el modal
    document.querySelectorAll('.galeria-grid img, .product-card img, .hero-img').forEach(img => {
        img.addEventListener('click', () => {
            const filename = decodeURIComponent(img.src.split('/').pop());
            const info = productInfo[filename];
            const card = img.closest('.product-card');
            
            if (info) {
                // Si tenemos la info exacta del producto en el diccionario
                modalTitle.textContent = info.title;
                modalPrice.textContent = info.price;
                modalDesc.textContent = info.desc;
            } else if (card) {
                // Si la imagen está en una tarjeta de producto, copiamos su info
                modalTitle.textContent = card.querySelector('h3').textContent;
                modalPrice.textContent = card.querySelector('.price').textContent;
                modalDesc.textContent = card.querySelectorAll('p')[1].textContent;
            } else {
                // Info por defecto para otras fotos de la galería
                modalTitle.textContent = "¡Delicioso Antojo!";
                modalPrice.textContent = "Consulta nuestro menú";
                modalDesc.textContent = "Hecho con los mejores ingredientes en PJ Strawberries. ¡Ven a probarlo y vive la experiencia!";
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
        modalImg.style.transform = 'scale(1)'; // Resetea el zoom al cerrar
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
