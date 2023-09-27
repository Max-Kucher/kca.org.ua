document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-button");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = this.parentNode;
      const answer = container.querySelector(".answer");

      if (answer.style.display === "none") {
        answer.style.display = "block";
        this.textContent = "-";
      } else {
        answer.style.display = "none";
        this.textContent = "+";
      }
    });
  });
});
