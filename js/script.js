// # region burger

const burger = document.querySelector(".header-menu");
const menuBurger = document.querySelector(".burger-menu");

burger.addEventListener("click", () => {
  document.querySelector(".span1").classList.toggle("rotate-45");
  document.querySelector(".span1").classList.toggle("translate-y-3");
  document.querySelector(".span2").classList.toggle("opacity-0");
  document.querySelector(".span3").classList.toggle("-rotate-45");
  document.querySelector(".span3").classList.toggle("-translate-y-3");
  menuBurger.classList.toggle("translate-x-96");
});

// # endregion

// # region
