document.addEventListener("DOMContentLoaded", () => {
  initializeProductCards();
  initializeCategoryFiltering();
});

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

function initializeProductCards() {
  const productCards = document.querySelectorAll(".product-card");

  if (productCards.length === 0) return;

  productCards.forEach((productCard) => {
    productCard.addEventListener("click", () =>
      handleProductCardClick(productCard)
    );
  });
}

function handleProductCardClick(productCard) {
  const category = productCard.dataset.category;

  if (!category) {
    console.warn("Категория не указана для этой карточки:", productCard);
    return;
  }

  window.location.href = `products-category.html?category=${encodeURIComponent(
    category
  )}`;
}

function initializeCategoryFiltering() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (!category) return;

  const products = document.querySelectorAll(".product-card");
  const categoryTitle = document.querySelector(".category-title");

  if (products.length === 0) {
    console.warn("Карточки товаров отсутствуют на странице.");
    return;
  }

  filterProductsByCategory(products, category);

  updateCategoryTitle(categoryTitle, category);
}

function filterProductsByCategory(products, category) {
  products.forEach((product) => {
    const productCategory = product.dataset.category;

    product.style.display = productCategory === category ? "block" : "none";
  });
}

function updateCategoryTitle(categoryTitle, category) {
  if (!categoryTitle) {
    console.warn("Элемент с классом .category-title не найден.");
    return;
  }

  categoryTitle.innerText = `Криоарматура - ${category}`;
}

// #region contacts

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Имя:", name);
    console.log("Email:", email);
    console.log("Сообщение:", message);

    document.getElementById("feedbackForm").reset();
    alert("Спасибо! Ваше сообщение отправлено.");
  });

// #endregion
