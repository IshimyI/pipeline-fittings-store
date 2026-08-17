import { useEffect, useReducer, useState, type SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import Dialog from "../ui/Dialog";
import { OrdersService } from "../ui/OrderService";
import Cart from "../ui/Cart";
import type { User, Category, Product, CartItem, BasketEntry } from "../types";
import { parsePrice } from "../lib/utils";

interface ProductsPageProps {
  user: User | null;
  category: Category[];
}

export default function ProductsPage({ user, category }: ProductsPageProps) {
  const { categoryId } = useParams();
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  const [, setLoadingCart] = useState(false);

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

  interface State {
    products: Product[];
    sortedProducts: Product[];
    searchQuery: string;
    selectedProduct: Product | null;
    isOpen: boolean;
    loading: boolean;
  }

  type Action =
    | { type: typeof ACTION.SET_PRODUCTS; payload: Product[] }
    | { type: typeof ACTION.SET_SORTED_PRODUCTS; payload: Product[] }
    | { type: typeof ACTION.SET_SEARCH_QUERY; payload: string }
    | { type: typeof ACTION.SET_SELECTED_PRODUCT; payload: Product | null }
    | { type: typeof ACTION.SET_IS_OPEN; payload: boolean }
    | { type: typeof ACTION.SET_LOADING; payload: boolean };

  const initialState: State = {
    products: [],
    sortedProducts: [],
    searchQuery: "",
    selectedProduct: null,
    isOpen: false,
    loading: false,
  };

  const reducer = (state: State, action: Action): State => {
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

      default:
        return state;
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
          const response = await axiosInstance.get<BasketEntry[]>("/basket", {
            params: { userId: user.id },
          });
          const cartProducts = response.data.map((item) => ({
            ...(item.product as Product),
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

  const addToCart = async (product: Product) => {
    setLoadingCart(true);
    try {
      if (user?.id) {
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
      const message = error instanceof Error ? error.message : undefined;
      const responseMessage = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      setError(message || responseMessage || "Не удалось оформить заказ");
    }
  };

  const isValidUrl = (str: string) => {
    const pattern = /^(https?:\/\/)/;
    return pattern.test(str);
  };

  const getImageUrl = (image: string | null | undefined) => {
    if (!image) return "/uploads/no-photo.png";
    if (isValidUrl(image)) return image;
    if (image.startsWith("/uploads/")) return image;
    if (image) {
      return `/uploads/categories/${image}.jpg?v=${Date.now()}`;
    }
    return "/uploads/no-photo.png";
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    console.error("Failed to load image:", e.currentTarget.src);
    e.currentTarget.src = "/uploads/no-photo.png";
  };

  const handleRemoveFromCart = async (productId: number) => {
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

  const sortProducts = (prods: Product[]) => {
    if (!Array.isArray(prods)) return [];

    return [...prods].sort((a, b) => {
      switch (sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          const priceA = parsePrice(a.price) || 0;
          const priceB = parsePrice(b.price) || 0;
          return priceA - priceB;
        case "availability":
          if (a.availability === b.availability) return 0;
          return b.availability - a.availability;
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
        const response = categoryId
          ? await axiosInstance.get<Product[]>(`/listProducts/${categoryId}`)
          : await axiosInstance.get<Product[]>(`/listProducts`);
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

  const parseProductParams = (product: Product): Record<string, string> => {
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

  const getUniqueValues = (products: Product[], paramName: string): string[] => {
    const values = new Set<string>();
    products.forEach((product) => {
      const params = parseProductParams(product);
      const value = params[paramName];
      if (value) values.add(String(value));
    });
    return Array.from(values);
  };

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

  const openModal = (product: Product) => {
    dispatch({ type: ACTION.SET_SELECTED_PRODUCT, payload: product });
    dispatch({ type: ACTION.SET_IS_OPEN, payload: true });
  };

  const closeModal = () => {
    dispatch({ type: ACTION.SET_SELECTED_PRODUCT, payload: null });
    dispatch({ type: ACTION.SET_IS_OPEN, payload: false });
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      if (!window.confirm("Вы уверены, что хотите удалить этот товар?")) return;
      if (!user) return;

      await axiosInstance.delete(`/deleteProduct/${productId}`);

      const response = await axiosInstance.get<Product[]>(
        categoryId ? `/listProducts/${categoryId}` : `/listProducts`
      );

      dispatch({ type: ACTION.SET_PRODUCTS, payload: response.data });
    } catch (error) {
      console.error("Ошибка удаления:", error);
      const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined;
      setError(message || "Недостаточно прав");
    }
  };

  return (
    <div className="flex items-center text-white justify-center min-h-screen bg-[url('/uploads/BG-image.png')] bg-fixed bg-center bg-no-repeat bg-cover bg-opacity-10 p-2 md:p-8">
      <main className="w-full max-w-[90%] md:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[80%] 4k:max-w-[80%] p-0 md:p-6 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl 4k:text-4xl font-bold text-white uppercase tracking-[0.15em]">
            Товары в категории
          </h2>
          <div className="w-16 h-0.5 bg-krio-primary mx-auto mt-3" />
        </div>
        <div className="flex flex-col xl:flex-row gap-10">
          <aside className="block xl:hidden w-full max-w-md mx-auto mb-5">
            <div className="bg-krio-background rounded-lg p-6 border border-krio-primary/20">
              <h3 className="text-xl font-semibold text-white mb-4 text-center uppercase tracking-wide">
                Фильтры
              </h3>
              <div className="mb-4">
                <div className="mb-4">
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
                  {getUniqueValues(
                    products,
                    "Условный проходной диаметр Ду, мм"
                  ).length > 0 && (
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
                  {getUniqueValues(products, "Направление потока").length >
                    0 && (
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
                  {getUniqueValues(products, "Тип присоединения").length >
                    0 && (
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
                className="w-full mt-4 py-2 px-4 bg-krio-primary hover:bg-krio-primary/80 text-white rounded-lg shadow-md transition-colors duration-300"
              >
                Сбросить фильтры
              </button>
            </div>
          </aside>
          <aside className="hidden xl:block w-72 min-w-[288px] bg-krio-background rounded-lg p-6 border border-krio-primary/20 sticky top-20 h-fit mb-10">
            <h3 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
              Фильтры
            </h3>
            <div className="mb-4">
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
            <button
              onClick={handleResetFilters}
              className="w-full mt-4 py-2 px-4 bg-krio-primary hover:bg-krio-primary/80 text-white rounded-lg shadow-md transition-colors duration-300"
            >
              Сбросить фильтры
            </button>
          </aside>

          <section className="flex-1">
            <div className="mb-8 2xl:mb-12">
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
                className="w-full p-4 2xl:p-5 text-lg 2xl:text-xl bg-krio-background border border-krio-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-krio-primary"
              />
            </div>
            {loading ? (
              <div className="text-center text-gray-300">Загрузка...</div>
            ) : sortedProducts?.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 4k:grid-cols-5 gap-2 md:gap-8 2xl:gap-10">
                {sortedProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-krio-background p-6 rounded-xl shadow-xl border-2 border-krio-primary/20 hover:border-krio-primary/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    onClick={() => openModal(product)}
                  >
                    {user?.isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product.id);
                        }}
                        className="absolute top-2 right-2 z-10 p-2 bg-red-500/80 hover:bg-red-500 text-white shadow-lg transition-colors rounded-full"
                        title="Удалить товар"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                      <div className="mt-4 flex justify-end lg:mt-0 lg:block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="p-2 bg-krio-primary hover:bg-krio-primary/80 text-white shadow-md transition-colors rounded-full lg:absolute lg:bottom-2 lg:right-2"
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
                      </div>
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
                    <p className="text-center text-sm md:text-xl font-semibold break-words whitespace-normal">
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
        </div>

        {error && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500/10 border border-red-500/40 text-red-300 rounded-lg">
            {error}
          </div>
        )}
      </main>
      {!user?.isAdmin && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="p-4 bg-krio-primary rounded-full shadow-lg hover:bg-krio-primary/80 relative transition-colors"
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
