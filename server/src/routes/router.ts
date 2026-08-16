import express, { type Request, type Response } from "express";
const {
  User,
  Category,
  Product,
  Basket,
  Order,
  Feedback,
  News,
  Companie,
  Info,
} = require("../../db/models");
import verifyRefreshToken from "../middlewares/verifyRefreshToken";
import "dotenv/config";
import sendMsg from "../configs/telegramMsg";
import sendEmail from "../services/emailService";
import {
  uploadProductImage,
  uploadCategoryImage,
  uploadNewsImage,
} from "../middlewares/fileUpload";

const router = express.Router();

function errMsg(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

router.get("/users", async (_req: Request, res: Response) => {
  try {
    res.status(200).send(await User.findAll({}));
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.get("/listCategories", async (_req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.get("/listProducts", async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll({});
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.get("/latestProduct", async (_req: Request, res: Response) => {
  try {
    const maxId = await Product.max("id");

    const product = await Product.findByPk(maxId);

    if (!product) {
      return res.status(404).json({ message: "Продукт не найден" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Ошибка при получении последнего продукта:", error);
    res.status(500).json({
      message: "Ошибка при получении последнего продукта",
      error: errMsg(error),
    });
  }
});

router.get("/listProducts/:categoryId", async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({
      where: { categoryId },
    });
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.post("/cta", async (req: Request, res: Response) => {
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
    res.status(500).send(errMsg(error));
  }
});

router.post("/changeProduct/:id", uploadProductImage, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryId, name, price, availability, params, user, imagePath } =
    req.body;

  try {
    const userData = typeof user === "string" ? JSON.parse(user) : user;

    if (userData.isAdmin) {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).send({ message: "Продукт не найден" });
      }

      product.categoryId = categoryId ?? product.categoryId;
      product.name = name ?? product.name;
      product.price = price ?? product.price;
      product.availability = availability ?? product.availability;
      product.params = params ?? product.params;

      if (req.file) {
        product.image = req.file.cloudinaryUrl;
      } else if (imagePath) {
        product.image = imagePath;
      }

      await product.save();

      res.status(200).send({ message: "Изменение успешно", product });
    } else return res.status(400).send({ message: "У вас нет прав" });
  } catch (error) {
    console.error("Ошибка при изменении продукта:", error);
    res.status(500).send({ message: "Ошибка сервера", error: errMsg(error) });
  }
});

router.post(
  "/createProduct",
  verifyRefreshToken,
  uploadProductImage,
  async (req: Request, res: Response) => {
    const {
      name,
      categoryId,
      price,
      availability = 0,
      params = {},
    } = req.body;

    try {
      console.log("User data:", res.locals.user);

      if (!(res.locals.user as any)?.isAdmin) {
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

      let imagePath = "/uploads/no-photo.png";
      if (req.file) {
        imagePath = req.file.cloudinaryUrl as string;
      }

      const newProduct = await Product.create({
        name,
        categoryId: Number(categoryId),
        price: price,
        image: imagePath,
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
        message: errMsg(error).includes("VALIDATION")
          ? "Ошибка валидации данных"
          : "Ошибка сервера",
        error: errMsg(error),
      });
    }
  }
);

router.post(
  "/createCategory",
  verifyRefreshToken,
  uploadCategoryImage,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
      if (!(res.locals.user as any)?.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      if (!name) {
        return res.status(400).send({
          message: "Поле name обязательно",
        });
      }

      let imagePath = `/uploads/no-photo.png`;
      if (req.file) {
        imagePath = req.file.cloudinaryUrl as string;
      }

      const newCategory = await Category.create({
        name,
        image: imagePath,
      });

      res.status(201).send({
        message: "Категория успешно создана",
        category: newCategory,
      });
    } catch (error) {
      console.error("Ошибка создания категории:", error);
      res.status(500).send(errMsg(error));
    }
  }
);

router.put("/updateCategory/:id/:userId", async (req: Request, res: Response) => {
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
      img: img || `/uploads/no-photo.png`,
      updatedAt: new Date(),
    });

    res.status(200).send(updatedCategory);
  } catch (error) {
    console.error("Ошибка редактирования категории:", error);
    res.status(500).send({
      message: errMsg(error) || "Ошибка при обновлении категории",
    });
  }
});

router.delete(
  "/deleteCategory/:id/:userId",

  async (req: Request, res: Response) => {
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
        error: errMsg(error),
      });
    }
  }
);

router.delete(
  "/deleteProduct/:id/:userId",

  async (req: Request, res: Response) => {
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
        error: errMsg(error),
      });
    }
  }
);

router.get("/basket", async (req: Request, res: Response) => {
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

router.post("/basket", async (req: Request, res: Response) => {
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

router.delete("/basket", async (req: Request, res: Response) => {
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

router.delete("/basket/clear", async (req: Request, res: Response) => {
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

router.post("/callMe", async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: "Не указан номер телефона" });
  }
  try {
    const messageText = `
Пришел новый запрос на звонок
Телефон: ${phone}
`.trim();

    await sendMsg({ body: { message: messageText } } as Request, {} as Response, () => {});

    await sendEmail({
      to: process.env.ADMIN_EMAIL as string,
      subject: `Пришел новый запрос на звонок`,
      text: messageText,
    });

    res.status(201).json({ message: "Запрос на звонок отправлен" });
  } catch (error) {
    console.error("CallMe error:", error);
    res.status(500).json({ message: "Ошибка при отправке запроса" });
  }
});

router.post("/createOrder", async (req: Request, res: Response) => {
  try {
    const { userId, email, items, total } = req.body;

    const enrichedItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await Product.findByPk(item.productId);
        return {
          ...item,
          productName: product.name,
          price: product.price,
        };
      })
    );

    const order = await Order.create({
      userId,
      email: email || null,
      items: enrichedItems,
      total,
      status: "ожидает",
    });

    res.status(201).json(order);

    // Notifications are best-effort: the order is already created and the
    // response already sent, so a Telegram/email failure here must not be
    // reported to the client as an order-creation failure.
    try {
      let userInfo = email;
      if (userId) {
        const user = await User.findByPk(userId);
        userInfo = `${user.name} (${user.email})`;
      }
      const itemDetails = await Promise.all(
        items.map(async (item: any) => {
          const product = await Product.findByPk(item.productId);
          return `${product.name} - ${item.quantity} шт.`;
        })
      );
      const messageText = `
Новый заказ #${order.id}
От: ${userInfo}
Товары:
${itemDetails.join("")}
Итого: ${total || "По запросу"} ₽
  `.trim();
      await sendMsg({
        body: { message: messageText },
      } as Request, {} as Response, () => {});
      await sendEmail({
        to: process.env.ADMIN_EMAIL as string,
        subject: `Новый заказ #${order.id}`,
        text: messageText,
      });
    } catch (notifyError) {
      console.error("Order notification error:", notifyError);
    }
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

router.post("/feedback", async (req: Request, res: Response) => {
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
      to: process.env.ADMIN_EMAIL as string,
      subject: "Новое сообщение от пользователя",
      text: `Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${message}`,
    });

    const telegramMessage = `
    Новый фидбек:
    Имя: ${name || "Не указано"}
    Email: ${email}
    Телефон: ${phone || "Не указан"}
    Сообщение: ${message}
    `;

    await sendMsg({ body: { message: telegramMessage } } as Request, {} as Response, () => {});

    return res.status(201).json({
      message: "Сообщение успешно отправлено",
      feedback,
    });
  } catch (error) {
    console.error("Feedback creation error:", error);

    if (error instanceof Error && error.name === "SequelizeValidationError") {
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

router.get("/allOrders", async (_req: Request, res: Response) => {
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

    const formattedOrders = orders.map((order: any) => ({
      id: order.id,
      userId: order.userId,
      email: order.email,
      items:
        typeof order.items === "string" ? JSON.parse(order.items) : order.items,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      user: {
        name: order.user?.name,
        email: order.user?.email || order.email,
      },
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка получения заказов",
      error: errMsg(error),
    });
  }
});

router.get("/feedback", async (_req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findAll({});
    res.status(200).send(feedback);
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.post(
  "/createNews",
  verifyRefreshToken,
  uploadNewsImage,
  async (req: Request, res: Response) => {
    try {
      if (!(res.locals.user as any)?.isAdmin) {
        return res.status(403).json({
          message: "Доступ запрещен",
        });
      }

      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          message: "Заполните название и содержание новости",
        });
      }

      let imagePath = "/uploads/no-photo.png";
      if (req.file) {
        imagePath = req.file.cloudinaryUrl as string;
      }

      const news = await News.create({
        title,
        content,
        image: imagePath,
      });

      res.status(201).json({
        message: "Новость успешно создана",
        news: {
          id: news.id,
          title: news.title,
          content: news.content,
          image: news.image,
          createdAt: news.createdAt,
        },
      });
    } catch (error) {
      console.error("Ошибка при создании новости:", error);
      res.status(500).json({
        message: "Ошибка сервера при создании новости",
        error: errMsg(error),
      });
    }
  }
);

router.get("/listNews", async (_req: Request, res: Response) => {
  try {
    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(news);
  } catch (error) {
    console.error("Ошибка при получении списка новостей:", error);
    res.status(500).json({
      message: "Ошибка при получении списка новостей",
      error: errMsg(error),
    });
  }
});

router.get("/latestNews", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit || 5;
    const news = await News.findAll({
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit as string),
    });
    res.status(200).json(news);
  } catch (error) {
    console.error("Ошибка при получении последних новостей:", error);
    res.status(500).json({
      message: "Ошибка при получении последних новостей",
      error: errMsg(error),
    });
  }
});

router.delete("/feedback/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    feedback.destroy();
    res.status(200).send({ message: "Сообщение успешно удалено" });
  } catch (error) {
    console.log(error);
    res.status(500).send(errMsg(error));
  }
});

router.get("/news/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const newsItem = await News.findByPk(id);
    if (!newsItem) {
      return res.status(404).json({ message: "Новость не найдена" });
    }
    res.status(200).json(newsItem);
  } catch (error) {
    console.error("Ошибка при получении новости:", error);
    res.status(500).json({
      message: "Ошибка при получении новости",
      error: errMsg(error),
    });
  }
});

router.post(
  "/updateNews/:id/:userId",

  uploadNewsImage,
  async (req: Request, res: Response) => {
    const { id, userId } = req.params;
    const { title, content } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      const news = await News.findByPk(id);
      if (!news) {
        return res.status(404).json({ message: "Новость не найдена" });
      }

      news.title = title || news.title;
      news.content = content || news.content;
      if (req.file) {
        news.image = req.file.cloudinaryUrl;
      }

      await news.save();
      res.status(200).json({ message: "Новость успешно обновлена", news });
    } catch (error) {
      console.error("Ошибка при обновлении новости:", error);
      res.status(500).json({
        message: "Ошибка при обновлении новости",
        error: errMsg(error),
      });
    }
  }
);

router.delete(
  "/deleteNews/:id/:userId",

  async (req: Request, res: Response) => {
    const { id, userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user.isAdmin) {
        return res.status(403).send({ message: "Доступ запрещен" });
      }

      const news = await News.findByPk(id);
      if (!news) {
        return res.status(404).json({ message: "Новость не найдена" });
      }
      await news.destroy();
      res.status(200).json({ message: "Новость успешно удалена" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при удалении новости",
        error: errMsg(error),
      });
    }
  }
);

router.get("/about", async (_req: Request, res: Response) => {
  try {
    const aboutInfo = await Info.findOne();
    if (!aboutInfo) {
      return res.status(404).json({ message: "Информация не найдена" });
    }
    res.status(200).json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.put("/about", verifyRefreshToken, async (req: Request, res: Response) => {
  try {
    if (!(res.locals.user as any)?.isAdmin) {
      return res.status(403).json({ message: "Доступ запрещен" });
    }

    const fields = [
      "title",
      "content",
      "actions",
      "company_first",
      "company_second",
    ];
    const updateData: Record<string, unknown> = { section: "about" };

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    let info = await Info.findOne({ where: { section: "about" } });

    if (info) {
      await info.update(updateData);
    } else {
      info = await Info.create(updateData);
    }

    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.get("/companies", async (_req: Request, res: Response) => {
  try {
    const companies = await Companie.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.post("/companies", verifyRefreshToken, async (req: Request, res: Response) => {
  if (!(res.locals.user as any)?.isAdmin)
    return res.status(403).json({ message: "Доступ запрещен" });
  try {
    const { name, imgSrc } = req.body;
    const newClient = await Companie.create({
      name,
      imgSrc,
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.put("/companies/:id", verifyRefreshToken, async (req: Request, res: Response) => {
  if (!(res.locals.user as any)?.isAdmin)
    return res.status(403).json({ message: "Доступ запрещен" });

  try {
    const client = await Companie.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Клиент не найден" });

    if (req.body.name) client.name = req.body.name;
    if (req.body.imgSrc) client.imgSrc = req.body.imgSrc;

    await client.save();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.delete("/companies/:id", verifyRefreshToken, async (req: Request, res: Response) => {
  if (!(res.locals.user as any)?.isAdmin)
    return res.status(403).json({ message: "Доступ запрещен" });

  try {
    const client = await Companie.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: "Клиент не найден" });

    await client.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: errMsg(error) });
  }
});

router.put("/orders/:id/status", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["ожидает", "проведен", "отменен"].includes(status)) {
    return res.status(400).json({ error: "Неверный статус" });
  }

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: "Заказ не найден" });

    console.log("СТАРЫЙ СТАТУС:", order.status);
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error("Ошибка обновления заказа:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

export default router;
