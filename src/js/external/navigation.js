const toggleButton = document.getElementById("toggleButton");
const closeButton = document.getElementById("closeButton");
const mobileAside = document.getElementById("mobile-aside");

toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileAside.style.transform = "translate(0%)";
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileAside.style.transform = "translate(100%)";
});

