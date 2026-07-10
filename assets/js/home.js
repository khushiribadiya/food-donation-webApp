document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       HERO SLIDER
    ============================ */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

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

    function startSlider() {

        sliderInterval = setInterval(nextSlide, 3000);

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

    }

    /* ===========================
       SCROLL REVEAL
    ============================ */

    const revealItems = document.querySelectorAll(
        ".how-card, .why-card, .stat-card"
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

    /* ===========================
       COUNTER ANIMATION
    ============================ */

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

});