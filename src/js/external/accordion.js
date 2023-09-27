const accordion = document.querySelectorAll(".accordion");
let mainParent;
let height;
let answer;
let btn;
accordion.forEach((item) => {
  item.addEventListener("click", () => {
    btn = item.querySelector(".question-line__horizontal");
    height = item.querySelector(".answer__wrapper").offsetHeight;
    answer = item.querySelector(".answer");
    mainParent = item;

    if (mainParent.classList.contains("active")) {
      mainParent.classList.remove("active");
      btn.classList.remove("line__active");
      answer.style.height = `0px`;
    } else {
      mainParent.classList.add("active");
      btn.classList.add("line__active");
      answer.style.height = `${height}px`;
    }
  });
});
