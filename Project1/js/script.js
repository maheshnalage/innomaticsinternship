
document.addEventListener("DOMContentLoaded", function () {
    
  
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    function showSlide(index) {
        if (index >= totalSlides) slideIndex = 0;
        else if (index < 0) slideIndex = totalSlides - 1;
        else slideIndex = index;

        document.querySelector(".slider").style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    document.querySelector(".next-btn").addEventListener("click", () => showSlide(slideIndex + 1));
    document.querySelector(".prev-btn").addEventListener("click", () => showSlide(slideIndex - 1));

    showSlide(slideIndex);


 
    function toggleChat() {
        let chatForm = document.getElementById("chatForm");
        chatForm.style.display = chatForm.style.display === "block" ? "none" : "block";
    }

    document.querySelector(".chat-icon").addEventListener("click", toggleChat);


   
    let dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseenter", function () {
            this.querySelector(".dropdown-menu").style.display = "block";
        });
        dropdown.addEventListener("mouseleave", function () {
            this.querySelector(".dropdown-menu").style.display = "none";
        });
    });


    function showMore(courseId) {
        let courseDetails = document.getElementById(`course${courseId}`);
        courseDetails.style.display = courseDetails.style.display === "block" ? "none" : "block";
    }

    document.querySelectorAll(".read-more-btn").forEach((button, index) => {
        button.addEventListener("click", () => showMore(index + 1));
    });
});
document.body.style.overflowY = "auto";
document.documentElement.style.overflowY = "auto";
