const swiper = new Swiper(".gallery__swiper", {
  slidesPerView: 1.3,
  spaceBetween: 16,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.1,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper2 = new Swiper(".comments__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  breakpoints: {
    640: {
      slidesPerView: 1.7,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1.3,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const commentSlide = document.querySelectorAll(".swiper-slide-comment");

commentSlide.forEach((item) => {
  const readMoreBtn = item.querySelector(".comment__btn");
  const comment = item.querySelector(".comment__subtitle");

  if (comment.style.webkitLineClamp !== "inherit") {
    readMoreBtn.addEventListener("click", () => {
      comment.style.webkitLineClamp = "inherit";
      readMoreBtn.style.display = "none";
    });
  }
});

const swiper3 = new Swiper(".information__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
