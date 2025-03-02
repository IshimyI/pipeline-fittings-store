const express = require("express");
const { User, Category, Product } = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

const checkAdmin = (req, res, next) => {
  if (!req.body.user?.isAdmin) {
    return res.status(403).send({ message: "Доступ запрещен" });
  }
  next();
};

router.get("/users", async (req, res) => {
  try {
    res.status(200).send(await User.findAll({}));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get("/listCategories", async (req, res) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get("/listProducts", async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get("/listProducts/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { categoryId },
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.post("/cta", async (req, res) => {
  const { name, email, body } = req.body;
  try {
    if (!(name && email && body)) {
      return res
        .status(400)
        .send({ message: "Все поля должны быть заполнены" });
    }
    // ! добавить отправку сообщений на почту
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.post("/changeProduct/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { categoryId, name, image, price, availability, params, user } =
    req.body;

  try {
    if (user.isAdmin) {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).send({ message: "Продукт не найден" });
      }

      product.categoryId = categoryId ?? product.categoryId;
      product.name = name ?? product.name;
      product.image = image ?? product.image;
      product.price = price ?? product.price;
      product.availability = availability ?? product.availability;
      product.params = params ?? product.params;

      await product.save();

      res.status(200).send({ message: "Изменение успешно", product });
    } else return res.status(400).send({ message: "У вас нет прав" });
  } catch (error) {
    console.error("Ошибка при изменении продукта:", error);
    res.status(500).send({ message: "Ошибка сервера", error: error.message });
  }
});

router.post("/createProduct", checkAdmin, async (req, res) => {
  const {
    name,
    categoryId,
    price,
    image = "default-product.jpg",
    availability = "",
    params = {},
    user,
  } = req.body;

  try {
    const errors = [];
    if (!name) errors.push("name");
    if (!categoryId) errors.push("categoryId");
    if (!price) errors.push("price");

    if (errors.length > 0) {
      return res.status(400).json({
        message: `Обязательные поля: ${errors.join(", ")}`,
        errorType: "VALIDATION_ERROR",
      });
    }

    const newProduct = await Product.create({
      name,
      categoryId: Number(categoryId),
      price: price,
      image,
      availability,
      params: typeof params === "string" ? JSON.parse(params) : params,
    });

    res.status(201).json({
      message: "Товар успешно создан",
      product: newProduct,
    });
  } catch (error) {
    console.error("Ошибка создания товара:", error);
    res.status(500).json({
      message: error.message.includes("VALIDATION")
        ? "Ошибка валидации данных"
        : "Ошибка сервера",
      error: error.message,
    });
  }
});

router.post("/createCategory", checkAdmin, async (req, res) => {
  const { name, image, user } = req.body;

  try {
    if (!user?.isAdmin) {
      return res.status(403).send({ message: "Доступ запрещен" });
    }

    if (!name) {
      return res.status(400).send({
        message: "Поле name обязательно",
      });
    }

    const newCategory = await Category.create({
      name,
      image: image || "default-category.jpg",
    });

    res.status(201).send({
      message: "Категория успешно создана",
      category: newCategory,
    });
  } catch (error) {
    console.error("Ошибка создания категории:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/deleteCategory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    category.destroy();
    res.status(204).send({ message: "Удаление категории прошло успешно" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    product.destroy();
    res.status(204).send({ message: "Удаление продукты прошло успешно" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
