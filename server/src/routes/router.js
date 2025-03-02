const express = require("express");
const { User, Category, Product } = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

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

router.post("/changeProduct/:id", async (req, res) => {
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

module.exports = router;
