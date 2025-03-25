import { Routes, Route, BrowserRouter } from "react-router";
import Layout from "./ui/Layout";
import axiosInstance, { setAccessToken } from "./axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import SelectorPage from "./pages/SelectorPage";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken("");
        navigate("/login");
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/listCategories");
        setCategory(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
        setError("Не удалось загрузить категории");
      }
    };
    fetchCategories();
  }, []);

  if (loadingUser) return <p>Загрузка пользователя...</p>;

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res && res.status === 200) {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      } else {
        console.error("Ошибка при регистрации:", res);
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const res = await axiosInstance.post("/auth/login", data);
    if (res.status === 200) {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    }
  };

  const handleLogout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    if (res.status === 200) {
      setUser(null);
      setAccessToken("");
      navigate("/login");
    }
  };

  return (
    <BrowserRouter basename="/pipeline-fittings-store">
      <Routes>
        <Route element={<Layout user={user} handleLogout={handleLogout} />}>
          <Route
            path="/"
            element={<MainPage user={user} category={category} />}
          />
          <Route path="/contacts" element={<ContactsPage user={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/selector" element={<SelectorPage />} />
          <Route path="/basket" element={<BasketPage user={user} />} />
          <Route
            path="/login"
            element={
              <AuthPage handleLogin={handleLogin} handleSignUp={handleSignUp} />
            }
          />
          {user?.isAdmin && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
          <Route
            path="/category/:categoryId"
            element={<ProductsPage user={user} category={category} />}
          />
          <Route
            path="/category"
            element={<ProductsPage user={user} category={category} />}
          />

          <Route path="*" element={<ErrorPage user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
