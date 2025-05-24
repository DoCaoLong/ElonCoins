gsap.registerPlugin(ScrollTrigger);

// format address
const addressTextEl = document.querySelectorAll(".wallet_address");
const copyButtons = document.querySelectorAll(".btn_copy");

addressTextEl.forEach((el) => {
    const fullAddress = el.textContent.trim();
    el.dataset.full = fullAddress;
    el.textContent = formatAddress(fullAddress, 14, 14);
});

function formatAddress(address, start = 14, end = 14) {
    if (!address || address.length <= start + end) return address;
    return `${address.slice(0, start)}...${address.slice(-end)}`;
}

copyButtons.forEach((item) => {
    item.addEventListener("click", () => {
        const addressEl = item
            .closest(".wallet_address_wrap")
            .querySelector(".wallet_address");

        const fullAddress = addressEl.dataset.full;

        navigator.clipboard
            .writeText(fullAddress)
            .then(() => {
                const originalText = item.textContent;
                item.textContent = "Copied!";
                setTimeout(() => {
                    item.textContent = originalText;
                }, 2000);
            })
            .catch(() => {
                alert("Copy failed. Please try again.");
            });
    });
});

// Mobile menu toggle functionality using GSAP

const toggleButton = document.getElementById("menuToggle");
const navMenu = document.getElementById("mobileMenu");
const closeButton = document.getElementById("close_menu");
const menuItems = navMenu.querySelectorAll("ul li");
const openTl = gsap.timeline({ paused: true });

openTl
    .to(navMenu, {
        duration: 0.3,
        x: "0%",
        ease: "power3.out",
    })
    .to(
        menuItems,
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
        },
        "-=0.2"
    );

toggleButton.addEventListener("click", () => {
    navMenu.style.display = "flex";
    openTl.restart();
});

closeButton.addEventListener("click", () => {
    gsap.to(navMenu, {
        duration: 0.1,
        x: "100%",
        ease: "power3.in",
        onComplete: () => {
            navMenu.style.display = "none";
            gsap.set(menuItems, { opacity: 0, y: 20 });
        },
    });
});

// active menu & smooth scroll
// Smooth scroll + Active menu
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

// Smooth scroll (nếu không dùng scroll-behavior trong CSS)
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        if (window.innerWidth <= 768) {
            gsap.to(navMenu, {
                duration: 0.1,
                x: "100%",
                ease: "power3.in",
                onComplete: () => {
                    navMenu.style.display = "none";
                    gsap.set(menuItems, { opacity: 0, y: 20 });
                },
            });
        }
    });
});

// Highlight active menu on scroll
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active_menu");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active_menu");
        }
    });
});

// back to top
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Custom Cursor with GSAP
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.01,
        ease: "power2.out",
    });
});

// Cursor scale on hover over buttons
const interactiveElements = document.querySelectorAll("button, a");

interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
            ease: "power2.out",
        });
    });
    el.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    });
});

// Animate header items on load (logo, nav, button)
window.addEventListener("load", () => {
    const headerItems = document.querySelectorAll(".logo, .nav, .right_group");

    const tl = gsap.timeline();

    tl.to(".line-slice", {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
    })
        .to(".line-slice", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
        })
        .to(".preloader-overlay", {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.inOut",
        })
        .to("#preloader", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                document.getElementById("preloader").style.display = "none";
            },
        })
        .from(headerItems, {
            opacity: 0,
            y: -40,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
        });
});

// Animate sections on scroll
gsap.utils.toArray("section").forEach((section) => {
    gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        }
    );
});

// Loader out animation
window.addEventListener("load", () => {
    const headerItems = document.querySelectorAll(".logo, .nav, .right_group");
    gsap.from(headerItems, {
        opacity: 0,
        y: -40,
        duration: 1,
        stagger: 0.2,
        delay: 0.3, // delay để khớp sau khi mở preloader
        ease: "power2.out",
    });
    gsap.timeline()
        .to(".line-slice", {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.inOut",
        })
        .to(".line-slice", {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out",
        })
        .to(".preloader-overlay", {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.inOut",
        })
        .to("#preloader", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
                document.getElementById("preloader").style.display = "none";
            },
        });
});
