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

    // SPA Navigation Logic
    const pageSections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.nav-links a, .logo-link, .cta-button, .promo-btn');

    function navigateTo(targetId) {
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
        if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        }

        window.scrollTo(0, 0);
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                // If they click on "Menú" or "Ver Nuestro Menú" (#productos)
                // We show #productos, and optionally could show #galeria. For now just #productos.
                // Wait, if they click "Ver Nuestro Menú", maybe we should show the whole gallery page?
                // The user said "al darle ver menu me mande a los prodcutps pero no bajar y bajar".
                // I will navigate to #productos.
                if (targetId === 'productos' || targetId === 'galeria') {
                    // Let's make "Menú" and "Galería" both show the products and gallery sections.
                    // Or since we have two sections, just show the specific one. 
                    navigateTo(targetId);
                } else {
                    navigateTo(targetId);
                }
            }
        });
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

    // Información de Productos (Catálogo)
    const productInfo = {
        '3.jpeg': {
            title: 'Mangoneada Exótica',
            price: '$2.50',
            desc: '¡DULCE, PICOSITA Y REFRESCANTE! El antojo que te enamora. Mango fresco y natural con chamoy, chile y limón. Hielo raspado bien frío. El balance perfecto de dulce y picosito. ¡Una explosión de sabor!'
        },
        'WhatsApp Image 2026-06-30 at 7.03.50 PM.jpeg': {
            title: 'Fresas con Crema / Frappé de Oreo',
            price: '¡Delicioso!',
            desc: '¡Delicioso, cremoso y refrescante! El antojo perfecto en cada sorbo. Galletas Oreo crujientes, crema batida suave y deliciosa, chocolate en cada sorbo y fresas frescas naturales. ¡No podrás resistirte!'
        },
        'WhatsApp Image 2026-06-30 at 7.03.51 PM.jpeg': {
            title: 'Promoción Especial',
            price: 'Consulta en local',
            desc: 'Aprovecha nuestras deliciosas promociones y combos. ¡Frescura y sabor que te encantarán!'
        },
        'ChocoLoco2.jpeg': {
            title: 'Choco Loco',
            price: 'Desde $1.25',
            desc: 'Dulce, divertido y espectacular. El postre perfecto para quitarte ese antojo de media tarde con toda la variedad que te gusta.'
        },
        'menu.jpeg': {
            title: 'Nuestro Menú',
            price: 'Variedad de Opciones',
            desc: '¡Conoce todos nuestros sabores y opciones para que endulces o le des un toque picosito a tu día! Pregunta por tu favorito.'
        }
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
