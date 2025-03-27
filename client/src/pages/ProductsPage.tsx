import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Dialog from "../ui/Dialog";
import { OrdersService } from "../ui/OrderService";
import Cart from "../ui/Cart";

export default function ProductsPage({ user, category }) {
  const { categoryId } = useParams();
  // const [products, setProducts] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [workingPressureFilter, setWorkingPressureFilter] = useState("all");
  const [nominalDiameterFilter, setNominalDiameterFilter] = useState("all");
  const [mediumGroupFilter, setMediumGroupFilter] = useState("all");
  const [flowDirectionFilter, setFlowDirectionFilter] = useState("all");
  const [pressureRangeFilter, setPressureRangeFilter] = useState("all");
  const [connectionTypeFilter, setConnectionTypeFilter] = useState("all");
  const [dimensionsFilter, setDimensionsFilter] = useState("all");
  const [weightFilter, setWeightFilter] = useState("all");
  const [error, setError] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  const [loadingCart, setLoadingCart] = useState(false);

  const handleResetFilters = () => {
    setSortOption("name");
    setWorkingPressureFilter("all");
    setNominalDiameterFilter("all");
    setMediumGroupFilter("all");
    setFlowDirectionFilter("all");
    setPressureRangeFilter("all");
    setConnectionTypeFilter("all");
    setDimensionsFilter("all");
    setWeightFilter("all");
    dispatch({ type: ACTION.SET_SEARCH_QUERY, payload: "" });
  };

  const ACTION = {
    SET_PRODUCTS: "SET_PRODUCTS" as const,
    SET_SORTED_PRODUCTS: "SET_SORTED_PRODUCTS" as const,
    SET_SEARCH_QUERY: "SET_SEARCH_QUERY" as const,
    SET_SELECTED_PRODUCT: "SET_SELECTED_PRODUCT" as const,
    SET_IS_OPEN: "SET_IS_OPEN" as const,
    SET_LOADING: "SET_LOADING" as const,
  };

  const initialState = {
    products: [],
    sortedProducts: [],
    searchQuery: "",
    selectedProduct: null,
    isOpen: false,
    loading: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.SET_PRODUCTS:
        return { ...state, products: action.payload };

      case ACTION.SET_SORTED_PRODUCTS:
        return { ...state, sortedProducts: action.payload };

      case ACTION.SET_SEARCH_QUERY:
        return { ...state, searchQuery: action.payload };

      case ACTION.SET_SELECTED_PRODUCT:
        return { ...state, selectedProduct: action.payload };

      case ACTION.SET_IS_OPEN:
        return { ...state, isOpen: action.payload };

      case ACTION.SET_LOADING:
        return { ...state, loading: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    products,
    sortedProducts,
    searchQuery,
    selectedProduct,
    isOpen,
    loading,
  } = state;

  useEffect(() => {
    const fetchCart = async () => {
      setLoadingCart(true);
      try {
        if (user?.id) {
          // Загрузка корзины авторизованного пользователя
          const response = await axiosInstance.get("/basket", {
            params: { userId: user.id },
          });
          const cartProducts = response.data.map((item) => ({
            ...item.product,
            quantity: item.quantity,
          }));
          setCartItems(cartProducts);
        } else {
          const localCart = localStorage.getItem("guestCart");
          if (localCart) {
            setCartItems(JSON.parse(localCart));
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        setError("Не удалось загрузить корзину");
      } finally {
        setLoadingCart(false);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    setLoadingCart(true);
    try {
      if (user?.id) {
        // Логика для авторизованного пользователя
        await axiosInstance.post("/basket", {
          userId: user.id,
          productId: product.id,
        });
        setCartItems((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          return existing
            ? prev.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...prev, { ...product, quantity: 1 }];
        });
      } else {
        const newCart = [...cartItems];
        const existing = newCart.find((item) => item.id === product.id);

        if (existing) {
          existing.quantity += 1;
        } else {
          newCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("guestCart", JSON.stringify(newCart));
        setCartItems(newCart);
      }
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      setError("Не удалось добавить товар в корзину");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleCheckout = async (email?: string) => {
    try {
      let orderData;

      if (!user?.id) {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
          setError("Пожалуйста, введите корректный email");
          return;
        }

        orderData = {
          email,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          total: "По запросу",
        };
      } else {
        orderData = {
          userId: user.id,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          total: "По запросу",
        };
      }

      await OrdersService.createOrder(orderData);
      localStorage.removeItem("guestCart");
      setCartItems([]);
      setCartVisible(false);
      alert("Заказ принят! Менеджер свяжется для уточнения деталей.");
    } catch (error) {
      console.error("Ошибка оформления:", error);
      setError(
        error.message ||
          error.response?.data?.message ||
          "Не удалось оформить заказ"
      );
    }
  };

  const isValidUrl = (str) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const getImageUrl = (image) => {
    if (isValidUrl(image)) {
      return image;
    }
    if (image) {
      return `/img/categories/${image}.jpg`;
    }
    return "/img/no-photo.png";
  };

  const handleImageError = (e) => {
    e.target.src = "/img/no-photo.png";
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      if (user?.id) {
        await axiosInstance.delete("/basket", {
          data: { userId: user.id, productId },
        });
      } else {
        const newCart = cartItems.filter((item) => item.id !== productId);
        localStorage.setItem("guestCart", JSON.stringify(newCart));
      }
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error);
    }
  };

  const sortProducts = (prods) => {
    if (!Array.isArray(prods)) return [];

    return [...prods].sort((a, b) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceA - priceB;
        case "availability":
          if (a.availability === b.availability) return 0;
          if (a.availability === "в наличии") return -1;
          if (b.availability === "в наличии") return 1;
          return a.availability.localeCompare(b.availability);
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category || !category.length) {
        console.warn("Waiting for categories to load...");
        return;
      }
      dispatch({ type: ACTION.SET_LOADING, payload: true });
      try {
        let response;
        if (categoryId) {
          response = await axiosInstance.get(`/listProducts/${categoryId}`);
        } else {
          response = await axiosInstance.get(`/listProducts`);
        }
        dispatch({ type: ACTION.SET_PRODUCTS, payload: response.data });
        dispatch({ type: ACTION.SET_SORTED_PRODUCTS, payload: response.data });
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        setError("Ошибка загрузки товаров");
      } finally {
        dispatch({ type: ACTION.SET_LOADING, payload: false });
      }
    };
    fetchProducts();
  }, [categoryId, category]);

  // Новая функция для парсинга параметров
  const parseProductParams = (product) => {
    // Если params уже объект - возвращаем его
    if (typeof product.params === "object" && product.params !== null) {
      return product.params;
    }

    try {
      return product.params ? JSON.parse(product.params) : {};
    } catch (e) {
      console.error("Error parsing params:", e);
      return {};
    }
  };

  // Исправленная функция получения уникальных значений
  const getUniqueValues = (products, paramName) => {
    const values = new Set();
    products.forEach((product) => {
      const params = parseProductParams(product);
      const value = params[paramName];
      if (value) values.add(String(value)); // Приводим к строке
    });
    return Array.from(values);
  };

  // Исправленная функция фильтрации
  useEffect(() => {
    const filtered = products.filter((product) => {
      const params = parseProductParams(product);
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesWorkingPressure =
        workingPressureFilter === "all" ||
        params["Рабочее давление Рр, кгс/см2"] === workingPressureFilter;

      const matchesNominalDiameter =
        nominalDiameterFilter === "all" ||
        params["Условный проходной диаметр Ду, мм"] === nominalDiameterFilter;

      const matchesMediumGroup =
        mediumGroupFilter === "all" ||
        params["Рабочая среда"]?.includes(mediumGroupFilter);

      const matchesFlowDirection =
        flowDirectionFilter === "all" ||
        params["Направление потока"] === flowDirectionFilter;

      const matchesConnectionType =
        connectionTypeFilter === "all" ||
        params["Тип присоединения"] === connectionTypeFilter;

      const matchesDimensions =
        dimensionsFilter === "all" ||
        params["Габаритные размеры, мм"] === dimensionsFilter;

      const matchesWeight =
        weightFilter === "all" || params["Масса, кг"] === weightFilter;

      return (
        matchesSearch &&
        matchesWorkingPressure &&
        matchesNominalDiameter &&
        matchesMediumGroup &&
        matchesFlowDirection &&
        matchesConnectionType &&
        matchesDimensions &&
        matchesWeight
      );
    });

    const sortedProducts = sortProducts(filtered);
    dispatch({ type: ACTION.SET_SORTED_PRODUCTS, payload: sortedProducts });
  }, [
    products,
    searchQuery,
    workingPressureFilter,
    nominalDiameterFilter,
    mediumGroupFilter,
    flowDirectionFilter,
    pressureRangeFilter,
    connectionTypeFilter,
    dimensionsFilter,
  ]);

  const openModal = (product) => {
    dispatch({ type: ACTION.SET_SELECTED_PRODUCT, payload: product });
    dispatch({ type: ACTION.SET_IS_OPEN, payload: true });
  };

  const closeModal = () => {
    dispatch({ type: ACTION.SET_SELECTED_PRODUCT, payload: null });
    dispatch({ type: ACTION.SET_IS_OPEN, payload: false });
  };

  const availabilityOptions = [
    "all",
    ...[...new Set(products.map((product) => product.availability))],
  ];

  const priceOptions = [
    "all",
    ...Array.from(new Set(products.map((product) => product.price.toString()))),
  ];

  const handleDeleteProduct = async (productId) => {
    try {
      if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) return;
      const userId = user.id;

      await axiosInstance.delete(`/deleteProduct/${productId}/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const response = await axiosInstance.get(
        categoryId ? `/listProducts/${categoryId}` : `/listProducts`
      );

      dispatch({ type: ACTION.SET_PRODUCTS, payload: response.data });
    } catch (error) {
      console.error("Ошибка удаления:", error);
      setError(error.response?.data?.message || "Недостаточно прав");
    }
  };

  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/img/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-8">
      <main className="w-full max-w-[1280px] p-6 flex">
        <aside className="h-96 w-1/4 mt-16 p-6 bg-krio-background rounded-lg mr-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">Фильтры</h3>
          <div className="mb-4">
            <div className="mb-4">
              {/* Фильтр рабочего давления */}
              {getUniqueValues(products, "Рабочее давление Рр, кгс/см2")
                .length > 0 && (
                <select
                  value={workingPressureFilter}
                  onChange={(e) => setWorkingPressureFilter(e.target.value)}
                  className="w-full p-3 bg-krio-foreground text-white rounded-lg mb-4"
                >
                  <option value="all">Все значения давления</option>
                  {getUniqueValues(
                    products,
                    "Рабочее давление Рр, кгс/см2"
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
              {/* Фильтр диаметра */}
              {getUniqueValues(products, "Условный проходной диаметр Ду, мм")
                .length > 0 && (
                <select
                  value={nominalDiameterFilter}
                  onChange={(e) => setNominalDiameterFilter(e.target.value)}
                  className="w-full p-3 bg-krio-foreground text-white rounded-lg mb-4"
                >
                  <option value="all">Все значения диаметра</option>
                  {getUniqueValues(
                    products,
                    "Условный проходной диаметр Ду, мм"
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              )}
              {/* Фильтр направления потока */}
              {getUniqueValues(products, "Направление потока").length > 0 && (
                <select
                  value={flowDirectionFilter}
                  onChange={(e) => setFlowDirectionFilter(e.target.value)}
                  className="w-full p-3 bg-krio-foreground text-white rounded-lg mb-4"
                >
                  <option value="all">Все направления потока</option>
                  {getUniqueValues(products, "Направление потока").map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              )}
              {/* Фильтр типа присоединения */}
              {getUniqueValues(products, "Тип присоединения").length > 0 && (
                <select
                  value={connectionTypeFilter}
                  onChange={(e) => setConnectionTypeFilter(e.target.value)}
                  className="w-full p-3 bg-krio-foreground text-white rounded-lg mb-4"
                >
                  <option value="all">Все типы присоединения</option>
                  {getUniqueValues(products, "Тип присоединения").map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              )}
              {/* Фильтр габаритов */}
              {getUniqueValues(products, "Габаритные размеры, мм").length >
                0 && (
                <select
                  value={dimensionsFilter}
                  onChange={(e) => setDimensionsFilter(e.target.value)}
                  className="w-full p-3 bg-krio-foreground text-white rounded-lg mb-4"
                >
                  <option value="all">Все габаритные размеры</option>
                  {getUniqueValues(products, "Габаритные размеры, мм").map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>
          </div>
          <button
            onClick={handleResetFilters}
            className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
          >
            Сбросить все фильтры
          </button>
        </aside>
        <section className="w-3/4">
          <h2 className="text-3xl font-bold text-center text-gray-300 mb-8">
            Товары в категории
          </h2>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) =>
                dispatch({
                  type: ACTION.SET_SEARCH_QUERY,
                  payload: e.target.value,
                })
              }
              className="w-full p-3 bg-krio-background text-white rounded-lg"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-300">Загрузка...</div>
          ) : sortedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts?.map((product) => (
                <div
                  key={product.id}
                  className="bg-krio-background p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative"
                  onClick={() => openModal(product)}
                >
                  {user?.isAdmin && (
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 transition-colors"
                      title="Удалить товар"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}

                  {!user?.isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700"
                      title="Добавить в корзину"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="aspect-square flex items-center justify-center relative">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain hover:object-cover transition-[object-fit] duration-300"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-krio-background/30 to-transparent pointer-events-none" />
                  </div>
                  <p className="text-center text-xl font-semibold">
                    {product.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-300">
              Товары не найдены
            </p>
          )}
        </section>
        {error && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-800 text-red-100 rounded-lg">
            {error}
          </div>
        )}
      </main>
      {!user?.isAdmin && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="p-4 bg-blue-600 rounded-full hover:bg-blue-700 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      )}

      {cartVisible && !user?.isAdmin && (
        <Cart
          items={cartItems}
          onClose={() => setCartVisible(false)}
          onCheckout={handleCheckout}
          onRemove={handleRemoveFromCart}
          user={user}
        />
      )}

      <Dialog
        user={user}
        isOpen={isOpen}
        onClose={closeModal}
        product={selectedProduct}
        category={category}
      />
    </div>
  );
}
