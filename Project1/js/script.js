document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Button Click Alert
    const heroButton = document.querySelector(".hero button");
    if (heroButton) {
        heroButton.addEventListener("click", function () {
            alert("Welcome to Innomatics! Explore our courses and programs.");
        });
    }
});
// script.js
document.querySelector('.pay-now-btn').addEventListener('click', function() {
    alert('Redirecting to the payment gateway...');
    // Add logic here to handle payment gateway redirection
});document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider() {
        const offset = -currentIndex * 100; // Move slides left by 100% per index
        slider.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener("click", function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the first slide
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Loop back to the last slide
        }
        updateSlider();
    });

    // Auto-slide every 3 seconds
    setInterval(() => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }, 3000);
});

function toggleChat() {
    const chatForm = document.getElementById("chatForm");
    if (chatForm.style.display === "block") {
      chatForm.style.display = "none";
    } else {
      chatForm.style.display = "block";
    }
  }
  