const burger = document.querySelector(".header-menu");

burger.addEventListener("click", () => {
  document.querySelector(".span1").classList.toggle("rotate-45");
  document.querySelector(".span1").classList.toggle("translate-y-3");
  document.querySelector(".span2").classList.toggle("opacity-0");
  document.querySelector(".span3").classList.toggle("-rotate-45");
  document.querySelector(".span3").classList.toggle("-translate-y-3");

  //   burger.classList.toggle("");
  //   -rotate-45rotate-45
});
