try {
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
    let category = urlParams.get("category");

    if (!category) return;

    category = decodeURIComponent(category).trim();

    renderProducts(category);

    const categoryTitle = document.querySelector(".category-title");
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
} catch {
  console.error("Ошибка");
}

// #region contacts

try {
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
} catch {
  console.error("Ошибка");
}

// #endregion

function renderProducts(category) {
  console.log("Категория из URL:", category);
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("Элемент с ID 'product-container' не найден!");
    return;
  }

  container.innerHTML = "";

  console.log("Категория для фильтрации:", category);
  console.log("Все товары:", products);

  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  console.log("Все уникальные категории в products:", uniqueCategories);

  function normalizeCategory(category) {
    return category.replace(/А/g, "A").replace(/В/g, "B");
  }

  let filteredProducts = [];
  if (
    normalizeCategory(category) === normalizeCategory("Запорная арматура БАМЗ")
  ) {
    filteredProducts = products.filter(
      (product) =>
        normalizeCategory(product.category) ===
          normalizeCategory("Клапаны BAMZ") ||
        normalizeCategory(product.category) ===
          normalizeCategory("Редукторы BAMZ")
    );
  } else {
    filteredProducts = products.filter(
      (product) =>
        normalizeCategory(category) === normalizeCategory(product.category)
    );
  }

  console.log("Отфильтрованные товары:", filteredProducts);

  if (filteredProducts.length === 0) {
    container.innerHTML = "<p>Товары не найдены.</p>";
    return;
  }

  const catalogGrid = document.createElement("div");
  catalogGrid.className = "catalog grid";

  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="gradient"></div>
      <div class="text"><p>${product.name}</p></div>
    `;
    catalogGrid.appendChild(card);
  });

  container.appendChild(catalogGrid);
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  renderProducts(category);
});
