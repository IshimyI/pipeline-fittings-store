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

document.querySelector(".burger-menu").addEventListener("click", () => {
  document.querySelector(".burger-part").classList.toggle("active");
});

// # endregion

// # region

const products = document.querySelectorAll(".product-card");
console.log(products);

products.forEach((product) => {
  product.addEventListener("click", () => {
    console.log(`Clicked ${product.innerText}`);
  });
});

// #endregion
