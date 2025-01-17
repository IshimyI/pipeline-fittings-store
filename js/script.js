// # region burger

const burger = document.querySelector(".burger-menu");
const lines = document.querySelectorAll(".burger-line");
const part = document.querySelector(".burger-part");

burger.addEventListener("click", () => {
  lines[0].classList.toggle("div1");
  lines[1].classList.toggle("div2");
  lines[2].classList.toggle("div3");
  part.classList.toggle("part1");
});

// # endregion

// # region
