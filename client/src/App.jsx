import { Routes, Route } from "react-router";
import Layout from "./ui/Layout";
import axiosInstance, {
  setAccessToken,
  clearAccessToken,
} from "./axiosInstance";
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
import Admin from "./pages/Admin";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NewsPage from "./pages/NewsPage";

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing saved user data:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    axiosInstance("tokens/refresh")
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAccessToken(res.data.accessToken);
      })
      .catch((error) => {
        console.error("Token refresh failed:", error);
        setUser(null);
        clearAccessToken();
        localStorage.removeItem("user");
        navigate("/");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res && res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAccessToken(res.data.accessToken);
        navigate("/");
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAccessToken(res.data.accessToken);
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        setUser(null);
        clearAccessToken();
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      console.error("Детали ошибки:", error.response?.data || error.message);
    }
  };
  return (
    <Routes>
      <Route element={<Layout user={user} handleLogout={handleLogout} />}>
        <Route
          path="/"
          element={<MainPage user={user} category={category} />}
        />
        <Route path="/contacts" element={<ContactsPage user={user} />} />
        <Route path="/about" element={<AboutPage user={user} />} />
        <Route path="/selector" element={<SelectorPage />} />
        <Route path="/basket" element={<BasketPage user={user} />} />
        <Route
          path="/login"
          element={
            <AuthPage handleLogin={handleLogin} handleSignUp={handleSignUp} />
          }
        />
        {user?.isAdmin && (
          <Route path="/admin" element={<Admin user={user} />} />
        )}
        <Route
          path="/category/:categoryId"
          element={<ProductsPage user={user} category={category} />}
        />
        <Route
          path="/category"
          element={<ProductsPage user={user} category={category} />}
        />
        <Route path="/news" element={<NewsPage user={user} />} />
        <Route path="/news/:id" element={<NewsPage user={user} />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<ErrorPage user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
