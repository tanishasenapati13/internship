let slideIndex = 0;
showSlide(slideIndex);

function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
}

function showSlide(index) {
    let slides = document.getElementsByClassName("slide");
    let prevBtn = document.querySelector(".prev");
    let nextBtn = document.querySelector(".next");

    if (index >= slides.length) {
        slideIndex = 0;
    }
    if (index < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";

    // Hide "Prev" button on the first slide
    prevBtn.style.display = slideIndex === 0 ? "none" : "block";

    // Hide "Next" button on the last slide
    nextBtn.style.display = slideIndex === slides.length - 1 ? "none" : "block";
}

// Redirect to login page when clicking "Start Now"
document.addEventListener("DOMContentLoaded", () => {
    const startNowBtn = document.getElementById("startNow");
    if (startNowBtn) {
        startNowBtn.addEventListener("click", () => {
            window.location.href = "signin.html";
        });
    }
});
