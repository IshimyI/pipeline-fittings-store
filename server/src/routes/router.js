const express = require("express");
const {
  User,
  Category,
  Product,
  Basket,
  Order,
  Feedback,
} = require("../../db/models");
const { where } = require("sequelize");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");
require("dotenv").config();
const sendMsg = require("../configs/telegramMsg");
const sendEmail = require("../services/emailService");

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

    res.status(201).send({ message: "Сообщение успешно отправлено" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.post("/changeProduct/:id", verifyRefreshToken, async (req, res) => {
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

router.post("/createProduct", verifyRefreshToken, async (req, res) => {
  const {
    name,
    categoryId,
    price,
    image = "default-product.jpg",
    availability = "",
    params = { Размер: "M", Цвет: "Красный" },
    user,
  } = req.body;

  try {
    if (!user?.isAdmin) {
      return res.status(403).send({ message: "Доступ запрещен" });
    }

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

router.post("/createCategory", verifyRefreshToken, async (req, res) => {
  const { name, image, user } = req.body;

  try {
    if (!user.isAdmin) {
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

router.put(
  "/updateCategory/:id/:userId",
  verifyRefreshToken,
  async (req, res) => {
    const { id, userId } = req.params;
    const { name, img } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      if (!name || name.trim() === "") {
        return res
          .status(400)
          .send({ message: "Название категории обязательно" });
      }

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).send({ message: "Категория не найдена" });
      }

      const updatedCategory = await category.update({
        name: name.trim(),
        img: img || "default-category.jpg",
        updatedAt: new Date(),
      });

      res.status(200).send(updatedCategory);
    } catch (error) {
      console.error("Ошибка редактирования категории:", error);
      res.status(500).send({
        message: error.message || "Ошибка при обновлении категории",
      });
    }
  }
);

router.delete(
  "/deleteCategory/:id/:userId",
  verifyRefreshToken,
  async (req, res) => {
    const { id, userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Категория не найдена" });
      }
      await category.destroy();
      res.status(200).json({ message: "Категория успешно удалена" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при удалении категории",
        error: error.message,
      });
    }
  }
);

router.delete(
  "/deleteProduct/:id/:userId",
  verifyRefreshToken,
  async (req, res) => {
    const { id, userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      await product.destroy();
      res.status(200).json({ message: "Товар успешно удален" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при удалении товара",
        error: error.message,
      });
    }
  }
);

router.get("/basket", async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "Не указан userId" });
  }

  try {
    const basket = await Basket.findAll({
      where: { userId },
      include: [{ model: Product, as: "product" }],
    });
    res.status(200).json(basket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения корзины" });
  }
});

router.post("/basket", async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Не указаны userId или productId" });
  }

  try {
    let basketItem = await Basket.findOne({
      where: { userId, productId },
    });

    if (basketItem) {
      basketItem.quantity += quantity;
      await basketItem.save();
    } else {
      basketItem = await Basket.create({
        userId,
        productId,
        quantity,
      });
    }

    res.status(201).json(basketItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка добавления товара в корзину" });
  }
});

router.delete("/basket", async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: "Не указаны userId или productId" });
  }

  try {
    const deleted = await Basket.destroy({
      where: { userId, productId },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Товар в корзине не найден" });
    }

    res.json({ message: "Товар удален из корзины" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка удаления товара" });
  }
});

router.delete("/basket/clear", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    await Basket.destroy({
      where: { userId },
    });
    res.status(200).json({ message: "Basket cleared successfully" });
  } catch (error) {
    console.error("Error clearing basket:", error);
    res.status(500).json({ message: "Failed to clear basket" });
  }
});

router.post("/callMe", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Не указан номер телефона" });
  }
  try {
    const messageText = `
Пришел новый запрос на звонок
Телефон: ${phone}
`.trim();

    // Добавляем второй параметр, если функция его требует
    await sendMsg({ body: { message: messageText } }, {});

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Пришел новый запрос на звонок`,
      text: messageText,
    });

    res.status(201).json({ message: "Запрос на звонок отправлен" });
  } catch (error) {
    console.error("CallMe error:", error);
    res.status(500).json({ message: "Ошибка при отправке запроса" });
  }
});

router.post("/createOrder", async (req, res) => {
  try {
    const { userId, email, items, total } = req.body;
    const order = await Order.create({
      userId,
      items,
      total,
    });
    let userInfo = email;
    if (userId) {
      const user = await User.findByPk(userId);
      userInfo = `${user.name} (${user.email})`;
    }
    const itemDetails = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        return `${product.name} - ${item.quantity} шт.`;
      })
    );
    const messageText = `
Новый заказ #${order.id}
От: ${userInfo}
Товары:
${itemDetails.join("\n")}
Итого: ${total || "По запросу"} ₽
  `.trim();
    await sendMsg({
      body: { message: messageText },
    });
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Новый заказ #${order.id}`,
      text: messageText,
    });
    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

router.post("/feedback", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Email обязателен",
      });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Validation Error",
        message: "Сообщение обязательно",
      });
    }

    const feedback = await Feedback.create({
      name: name?.trim() || null,
      email: email.trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Новое сообщение от пользователя",
      text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}\nСообщение: ${message}`,
    });

    const telegramMessage = `
    Новый фидбек:
    Имя: ${name || "Не указано"}
    Email: ${email}
    Телефон: ${phone || "Не указан"}
    Сообщение: ${message}
    `;

    await sendMsg({ body: { message: telegramMessage } }, {});

    return res.status(201).json({
      message: "Сообщение успешно отправлено",
      feedback,
    });
  } catch (error) {
    console.error("Feedback creation error:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        message: error.message,
      });
    }
    return res.status(500).json({
      error: "Server Error",
      message: "Внутренняя ошибка сервера",
    });
  }
});

router.get("/allOrders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "email"],
          as: "user",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = JSON.parse(order.items);

        const itemsWithNames = await Promise.all(
          items.map(async (item) => {
            const product = await Product.findByPk(item.productId, {
              attributes: ["name", "price"],
            });
            return {
              productName: product?.name || "Товар удален",
              quantity: item.quantity,
              price: product?.price || 0,
            };
          })
        );

        return {
          id: order.id,
          total: order.total,
          createdAt: order.createdAt,
          user: {
            name: order.user?.name || "Неизвестный пользователь",
            email: order.user?.email || "Нет email",
          },
          items: itemsWithNames,
        };
      })
    );

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка получения заказов",
      error: error.message,
    });
  }
});

router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.findAll({});
    res.status(200).send(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.delete("/feedback/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    feedback.destroy();
    res.status(200).send({ message: "Сообщение успешно удалено" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
