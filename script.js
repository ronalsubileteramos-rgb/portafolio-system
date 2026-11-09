/* =========================================
   PORTAFOLIO - RONALDO SUBILETE
   JAVASCRIPT PRINCIPAL
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("main section");

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");

const currentYear = document.getElementById("currentYear");


/* =========================================
   AÑO ACTUAL
========================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   MENÚ MOBILE
========================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );

    });

}


/* =========================================
   CERRAR MENÚ AL HACER CLICK
========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("open");

        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );

    });

});


/* =========================================
   HEADER AL HACER SCROLL
========================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================
   NAVEGACIÓN ACTIVA
========================================= */

function updateActiveLink() {

    const scrollPosition = window.scrollY + 150;

    let currentSection = "inicio";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    navLinks.forEach((link) => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
);

updateActiveLink();


/* =========================================
   CERRAR MENÚ CON ESC
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (!navMenu || !menuToggle) {
        return;
    }

    navMenu.classList.remove("open");

    menuToggle.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );

});


/* =========================================
   ANIMACIONES REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


/* =========================================
   FORMULARIO DE CONTACTO
========================================= */

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const nombre = document
            .getElementById("nombre")
            ?.value
            .trim();

        const email = document
            .getElementById("email")
            ?.value
            .trim();

        const asunto = document
            .getElementById("asunto")
            ?.value
            .trim();

        const mensaje = document
            .getElementById("mensaje")
            ?.value
            .trim();


        // Número de WhatsApp
        const numeroWhatsApp = "51983829914";


        // Crear el mensaje que recibirá Ronaldo
        const textoWhatsApp =
            `Hola Ronaldo, vi tu portafolio y me gustaría conversar contigo.\n\n` +
            `*Nombre:* ${nombre}\n` +
            `*Email:* ${email}\n` +
            `*Asunto:* ${asunto}\n\n` +
            `*Mensaje:*\n${mensaje}`;


        // Crear enlace de WhatsApp
        const enlaceWhatsApp =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;


        // Mostrar mensaje en el formulario
        if (formMessage) {

            formMessage.textContent =
                `¡Gracias${nombre ? ` ${nombre}` : ""}! ` +
                `Abriendo WhatsApp para enviar tu mensaje.`;

        }


        // Abrir WhatsApp
        window.open(
            enlaceWhatsApp,
            "_blank"
        );


        // Limpiar formulario
        contactForm.reset();


        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {

            if (formMessage) {
                formMessage.textContent = "";
            }

        }, 5000);

    });

}


/* =========================================
   ANIMACIÓN SUAVE PARA ENLACES INTERNOS
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }


            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight = header
                ? header.offsetHeight
                : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });