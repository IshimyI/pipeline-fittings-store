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

const products = [
  // #region Вентиль АВ

  {
    name: "Вентиль АВ-011",
    img: "img/Valves AB/av-011.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-011м",
    img: "img/Valves AB/av-011m.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-013",
    img: "img/Valves AB/av-013.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-013м",
    img: "img/Valves AB/av-013m.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-018",
    img: "img/Valves AB/av-018.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-019",
    img: "img/Valves AB/av-019.jpg",
    category: "Вентили АВ",
  },
  { name: "Вентиль АВ-020", img: "img/no-photo.jpg", category: "Вентили АВ" },
  {
    name: "Вентиль АВ-025",
    img: "img/Valves AB/av-025.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-027",
    img: "img/Valves AB/av-027.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-043",
    img: "img/Valves AB/av-043.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-046",
    img: "img/Valves AB/av-046.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-048",
    img: "img/Valves AB/av-048.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-049м",
    img: "img/Valves AB/av-049m.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-053",
    img: "img/Valves AB/av-053.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-054",
    img: "img/Valves AB/av-054.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-055",
    img: "img/Valves AB/av-055.jpg",
    category: "Вентили АВ",
  },
  {
    name: "Вентиль АВ-061",
    img: "img/Valves AB/av-061.jpg",
    category: "Вентили АВ",
  },
  { name: "Вентиль АВ-071", img: "img/no-photo.jpg", category: "Вентили АВ" },
  {
    name: "Вентиль АВ-074",
    img: "img/Valves AB/av-074.jpg",
    category: "Вентили АВ",
  },
  { name: "Вентиль АВ-075", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-077", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-090", img: "img/no-photo.jpg", category: "Вентили АВ" },
  {
    name: "Вентиль АВ-091",
    img: "img/Valves AB/av-091.jpg",
    category: "Вентили АВ",
  },
  { name: "Вентиль АВ-092", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-093", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-094", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-096", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-097", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-100", img: "img/no-photo.jpg", category: "Вентили АВ" },
  { name: "Вентиль АВ-106", img: "img/no-photo.jpg", category: "Вентили АВ" },
  {
    name: "Вентиль АВ-107",
    img: "img/Valves AB/av-107.jpg",
    category: "Вентили АВ",
  },

  // #endregion

  // #region Вентиль Т

  {
    name: "Вентиль Т100",
    img: "img/Valves T/t-100.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т102",
    img: "img/Valves T/t-102.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т106",
    img: "img/Valves T/t-106.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т114",
    img: "img/Valves T/t-114.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т122",
    img: "img/Valves T/t-122.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т124",
    img: "img/Valves T/t-124.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т126",
    img: "img/Valves T/t-126.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т130",
    img: "img/Valves T/t-130.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т134",
    img: "img/Valves T/t-134.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т136",
    img: "img/Valves T/t-136.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т140",
    img: "img/Valves T/t-140.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т144",
    img: "img/Valves T/t-144.jpg",
    category: "Вентили Т",
  },
  { name: "Вентиль Т146", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т150", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т154", img: "img/no-photo.jpg", category: "Вентили Т" },
  {
    name: "Вентиль Т158",
    img: "img/Valves T/t-158.jpg",
    category: "Вентили Т",
  },
  {
    name: "Вентиль Т160",
    img: "img/Valves T/t-160.jpg",
    category: "Вентили Т",
  },
  { name: "Вентиль Т164", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т168", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т174", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т180", img: "img/no-photo.jpg", category: "Вентили Т" },
  { name: "Вентиль Т184", img: "img/no-photo.jpg", category: "Вентили Т" },

  // #endregion

  // #region Клапан обратный АО

  {
    name: "Клапан обратный АО-002М",
    img: "img/Valves check AO/check-ao-002m.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-003М",
    img: "img/Valves check AO/check-ao-003m.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-004",
    img: "img/Valves check AO/check-ao-004.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-010",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-012",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-013",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-014",
    img: "img/Valves check AO/check-ao-014.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-015",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-019",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-023",
    img: "img/Valves check AO/check-ao-023.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-033",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-034",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-035",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-036",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-037",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-038",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-040",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-041",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-042",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-043",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-044",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-050",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-069",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-070",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-083",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-084",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-087",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-088",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-089",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-090",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-091",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-095",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-096",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-097",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },
  {
    name: "Клапан обратный АО-098",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные АО",
  },

  // #endregion

  // #region Клапан обратный Т

  {
    name: "Клапан обратный Т300",
    img: "img/Valves check T/check-t-300.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т302",
    img: "img/Valves check T/check-t-302.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т306",
    img: "img/Valves check T/check-t-306.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т308",
    img: "img/Valves check T/check-t-308.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т314",
    img: "img/Valves check T/check-t-314.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т316",
    img: "img/Valves check T/check-t-316.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т318",
    img: "img/Valves check T/check-t-318.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т322",
    img: "img/Valves check T/check-t-322.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т325",
    img: "img/Valves check T/check-t-325.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т326",
    img: "img/Valves check T/check-t-326.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т330",
    img: "img/Valves check T/check-t-330.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т335",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т336",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т340",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т346",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т350",
    img: "img/no-photo.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т360",
    img: "img/Valves check T/check-t-360.jpg",
    category: "Клапаны обратные Т",
  },
  {
    name: "Клапан обратный Т364",
    img: "img/Valves check T/check-t-364.jpg",
    category: "Клапаны обратные Т",
  },

  // #endregion

  // #region Редуктор АР

  {
    name: "Редуктор АР-003",
    img: "img/Gearboxes AP/ar-003.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-004",
    img: "img/Gearboxes AP/ar-004.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-005",
    img: "img/Gearboxes AP/ar-005.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-006",
    img: "img/Gearboxes AP/ar-006.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-008",
    img: "img/Gearboxes AP/ar-008.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-009",
    img: "img/Gearboxes AP/ar-009.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-011",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-012",
    img: "img/Gearboxes AP/ar-012.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-013",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-014А",
    img: "img/Gearboxes AP/ar-014a.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-015А",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-016",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-018",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-020",
    img: "img/Gearboxes AP/ar-020.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-021",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-023",
    img: "img/Gearboxes AP/ar-023.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-025",
    img: "img/Gearboxes AP/ar-025.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-031",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-033",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-034",
    img: "img/Gearboxes AP/ar-034.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-034М1",
    img: "img/Gearboxes AP/ar-034m1.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-036",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-037",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-045",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-050",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-054",
    img: "img/Gearboxes AP/ar-054.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-058",
    img: "img/Gearboxes AP/ar-058.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-077",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-077-02",
    img: "img/Gearboxes AP/ar-077-02.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-079",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-081",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-082",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-091",
    img: "img/Gearboxes AP/ar-091.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-092",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-097",
    img: "img/Gearboxes AP/ar-097.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-098",
    img: "img/Gearboxes AP/ar-098.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-099",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-104",
    img: "img/Gearboxes AP/ar-104.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-108",
    img: "img/Gearboxes AP/ar-108.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-111",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-132",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-143-01",
    img: "img/Gearboxes AP/ar-143-01.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-144",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-146",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },
  {
    name: "Редуктор АР-153",
    img: "img/no-photo.jpg",
    category: "Редукторы АР",
  },

  // #endregion

  // #region Редуктор Т

  {
    name: "Редуктор Т600",
    img: "img/Gearboxes T/t-600.jpg",
    category: "Редукторы Т",
  },
  {
    name: "Редуктор Т608",
    img: "img/Gearboxes T/t-608.jpg",
    category: "Редукторы Т",
  },
  {
    name: "Редуктор Т610",
    img: "img/Gearboxes T/t-610.jpg",
    category: "Редукторы Т",
  },
  {
    name: "Редуктор Т614",
    img: "img/Gearboxes T/t-614.jpg",
    category: "Редукторы Т",
  },
  {
    name: "Редуктор Т616",
    img: "img/Gearboxes T/t-616.jpg",
    category: "Редукторы Т",
  },
  {
    name: "Редуктор Т618",
    img: "img/Gearboxes T/t-618.jpg",
    category: "Редукторы Т",
  },
  { name: "Редуктор Т620", img: "img/no-photo.jpg", category: "Редукторы Т" },
  {
    name: "Редуктор Т622",
    img: "img/Gearboxes T/t-622.jpg",
    category: "Редукторы Т",
  },
  { name: "Редуктор Т626", img: "img/no-photo.jpg", category: "Редукторы Т" },
  { name: "Редуктор Т630", img: "img/no-photo.jpg", category: "Редукторы Т" },
  { name: "Редуктор Т636", img: "img/no-photo.jpg", category: "Редукторы Т" },
  { name: "Редуктор Т640", img: "img/no-photo.jpg", category: "Редукторы Т" },

  // #endregion

  // #region Клапан предохранительный АП
  {
    name: "Клапан предохранительный АУ-111-500",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-003",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-003А",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-008",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-009",
    img: "img/Valves safety AP/ap-009.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-009Д",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-012",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-013",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-014",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-014Д",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-018",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-020",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-020Д",
    img: "img/Valves safety AP/ap-020d.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-021",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-021Д",
    img: "img/Valves safety AP/ap-021d.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-023",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-027Д",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-033",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-037",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-045",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-046",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-049",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-050",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-051",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-052",
    img: "img/Valves safety AP/ap-052.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-054",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-055",
    img: "img/Valves safety AP/ap-055.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-061",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-063",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-094",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-096",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-098",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-099",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },
  {
    name: "Клапан предохранительный АП-107",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные АП",
  },

  // #endregion

  // #region Клапан предохранительный Т

  {
    name: "Клапан предохранительный Т408",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т410",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т412",
    img: "img/Valves safety T/t-412.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т413",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т416",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т422",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т423",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т424",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т425",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т426",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т430",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т432",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т436",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },
  {
    name: "Клапан предохранительный Т460",
    img: "img/no-photo.jpg",
    category: "Клапаны предохранительные Т",
  },

  // #endregion

  // #region Фильтр АФ

  {
    name: "Фильтр АФ-002",
    img: "img/Filters AF/af-002.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-003М",
    img: "img/Filters AF/af-003m.jpg",
    category: "Фильтры АФ",
  },
  { name: "Фильтр АФ-004М", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  {
    name: "Фильтр АФ-005М",
    img: "img/Filters AF/af-005m.jpg",
    category: "Фильтры АФ",
  },
  { name: "Фильтр АФ-006", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-007", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-010", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-012М", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-015", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-016", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-017", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-020", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-026", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-028", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-031", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  { name: "Фильтр АФ-032", img: "img/no-photo.jpg", category: "Фильтры АФ" },
  {
    name: "Фильтр АФ-034",
    img: "img/Filters AF/af-034.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-044",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-045",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-046",
    img: "img/Filters AF/af-046.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-047",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-048",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-050",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-051",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-052",
    img: "img/Filters AF/af-052.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-053",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-054",
    img: "img/Filters AF/af-054.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-055",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-056",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-057",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-058",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-059",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-060",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-061",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-063",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-064",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-065",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-066",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-069",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-070",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-071",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-075",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-079",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-080",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-081",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-091",
    img: "img/Filters AF/af-091.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-092",
    img: "img/Filters AF/af-092.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-093",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },
  {
    name: "Фильтр АФ-094",
    img: "img/no-photo.jpg",
    category: "Фильтры АФ",
  },

  // #endregion

  // #region Фильтр Т

  {
    name: "Фильтр Т513",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т514",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т520",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т522",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т524",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т525",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т526",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т530",
    img: "img/Filters T/t-530.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т532",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т533",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т534",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т535",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т536",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т540",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т544",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т546",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т550",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т554",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т558",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т560",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т562",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т565",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т574",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т580",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },
  {
    name: "Фильтр Т584",
    img: "img/no-photo.jpg",
    category: "Фильтры Т",
  },

  // #endregion

  // #region Пневмоэлектроклапан АЭ

  {
    name: "Пневмоэлектроклапан АЭ-003",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-007",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-009",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-011",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-012",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-013",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-014",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-019",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-020",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-026",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-027",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-028",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-029",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-032",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-044",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-049",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-050",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-054А",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-056",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-058",
    img: "img/Valves pneumoelectric /ae-058.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-060",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-098",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-100",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-102",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-105",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-111",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-112",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-114",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-116",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-117",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-119",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-130",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-138",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-143",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },
  {
    name: "Пневмоэлектроклапан АЭ-144",
    img: "img/no-photo.jpg",
    category: "Пневмоэлектроклапаны АЭ",
  },

  // #endregion

  // #region Клапан отсечный

  {
    name: "Клапан отсечной Т210",
    img: "img/off-valves/t-210.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т212",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т216",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т218",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т220",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т222",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т224",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т226",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т228",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т230",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т232",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т236",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т238",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т240",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т242",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т246",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т248",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т250",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т252",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т254",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т260",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т262",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т264",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т266",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т268",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т274",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т282",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },
  {
    name: "Клапан отсечной Т286",
    img: "img/no-photo.jpg",
    category: "Клапаны отсечные",
  },

  // #endregion

  // #region Пневмоэлектроклапан ПЭКДД

  {
    name: "Пневмоэлектроклапан ПЭКДД",
    img: "img/Valves pneumoelectric PAKDD/PAKDD.jpg",
    category: "Пневмоэлектроклапаны ПЭКДД",
  },
  {
    name: "Пневмоэлектроклапан ПЭКДД М2",
    img: "img/Valves pneumoelectric PAKDD/PAKDD M2.jpg",
    category: "Пневмоэлектроклапаны ПЭКДД",
  },

  // #endregion

  // #region Запорная арматура

  {
    name: "Клапан КС7154",
    img: "img/off-valves-bamz/KC7154.jpg",
    category: "Клапаны BAMZ",
  },
  {
    name: "Редуктор РС-250-58",
    img: "img/off-valves-bamz/PC-250-58.jpg",
    category: "Редукторы BAMZ",
  },

  // #endregion
];

function renderProducts(category) {
  // Проверяем, существует ли контейнер product-container
  const container = document.getElementById("product-container");
  if (!container) {
    console.error("Элемент с ID 'product-container' не найден!");
    return;
  }

  // Очищаем содержимое контейнера
  container.innerHTML = "";

  // Фильтруем продукты по категории
  const filteredProducts = products.filter(
    (product) => !category || product.category === category
  );

  // Если продуктов нет, выводим сообщение об отсутствии товаров
  if (filteredProducts.length === 0) {
    container.innerHTML = "<p>Товары не найдены.</p>";
    return;
  }

  // Создаем карточки для каждого продукта
  filteredProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <div class="gradient"></div>
      <div class="text"><p>${product.name}</p></div>
    `;
    container.appendChild(card);
  });
}

// При загрузке документа
document.addEventListener("DOMContentLoaded", () => {
  // Получаем параметр category из URL
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // Логируем выбранную категорию для отладки
  console.log("Выбранная категория:", category);

  // Рендерим продукты
  renderProducts(category);
});
