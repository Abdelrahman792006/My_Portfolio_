// 1. Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
    } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});

// 2. Typing Effect for Hero Section
const textArray = ["MERN Stack Developer", "React.js Developer", "Full-Stack Developer", "Software Engineer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
const typedTextSpan = document.querySelector(".typing-text");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// 3. Scroll Animations & Counters (Merged with your Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

let countersAnimated = false;
const counters = document.querySelectorAll('.counter');

const runCounters = () => {
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 50; 
            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCounter();
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            // Trigger counter when stats section is visible
            if(entry.target.classList.contains('stats-section') && !countersAnimated) {
                runCounters();
                countersAnimated = true;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach((element) => {
    observer.observe(element);
});

// 4. Portfolio Filtering (Your original code perfectly preserved)
const filterButtons = document.querySelectorAll('.filter-buttons button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
                card.classList.remove('show');
                setTimeout(() => card.classList.add('show'), 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// 5. Toast Notification for Contact Form
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    // In a real scenario, you send data to backend here
    toast.classList.add('show');
    contactForm.reset();
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Hide after 3 seconds
});

// 6. Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 7. Vanilla Tilt JS Initialization for Portfolio Cards
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.02
});
const navLinksAnchors = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');

navLinksAnchors.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    const navbarHeight = navbar.offsetHeight;
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // قفل المينيو في الموبايل
    navLinks.classList.remove('active');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
  });
});