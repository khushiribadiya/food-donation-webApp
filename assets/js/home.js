document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".slider-arrow-prev");
    const nextBtn = document.querySelector(".slider-arrow-next");

    let currentSlide = 0;
    let sliderInterval;

    function showSlide(index) {

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }

        currentSlide = index;
    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }

    function startSlider() {

        sliderInterval = setInterval(nextSlide, 5000);

    }

    function stopSlider() {

        clearInterval(sliderInterval);

    }

    if (slides.length) {

        showSlide(0);

        startSlider();

        const slider = document.querySelector(".hero-slider");

        if (slider) {

            slider.addEventListener("mouseenter", stopSlider);

            slider.addEventListener("mouseleave", startSlider);

        }

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                stopSlider();

                showSlide(index);

                startSlider();

            });

        });

        if (nextBtn) {

            nextBtn.addEventListener("click", () => {

                stopSlider();

                nextSlide();

                startSlider();

            });

        }

        if (prevBtn) {

            prevBtn.addEventListener("click", () => {

                stopSlider();

                prevSlide();

                startSlider();

            });

        }

    }

    const revealItems = document.querySelectorAll(
        ".how-card, .why-card, .stat-card, .contact-preview-card, .feature-card, .process-step, .value-card, .faq-item, .social-card"
    );

    function revealOnScroll() {

        revealItems.forEach(item => {

            const top = item.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {

                item.classList.add("show");

            }

        });

    }

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);

    const counters = document.querySelectorAll(".impact-grid h2");

    let counted = false;

    function animateCounters() {

        if (counted) return;

        const section = document.querySelector(".impact-section");

        if (!section) return;

        const top = section.getBoundingClientRect().top;

        if (top > window.innerHeight - 150) return;

        counted = true;

        counters.forEach(counter => {

            const text = counter.innerText;

            const target = parseInt(text.replace(/\D/g, ""));

            if (!target) return;

            let current = 0;

            const increment = Math.ceil(target / 80);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.innerHTML = current.toLocaleString() + "+";

            }, 20);

        });

    }

    animateCounters();

    window.addEventListener("scroll", animateCounters);

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (navLinks.length) {

        const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

        navLinks.forEach(link => {

            let linkPath = "/";

            try {
                linkPath = new URL(link.href).pathname.replace(/\/+$/, "") || "/";
            } catch (e) {
                return;
            }

            if (linkPath === currentPath) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            }

        });

    }

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            faqItems.forEach(other => other.classList.remove("open"));

            if (!isOpen) {
                item.classList.add("open");
            }

        });

    });

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const formSuccess = document.getElementById("formSuccess");

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (formSuccess) {
                formSuccess.classList.add("show");
            }

            contactForm.reset();

            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.classList.remove("show");
                }
            }, 4000);

        });

    }

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const heroShapes = document.querySelectorAll(".hero .shape");

    heroShapes.forEach(shape => {

        const randomX = Math.random() * 16 - 8;
        const randomY = Math.random() * 16 - 8;
        const randomDelay = Math.random() * 6;

        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        shape.style.animationDelay = `${randomDelay}s`;

    });

});