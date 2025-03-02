import { Routes, Route } from "react-router";
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

function App() {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

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
    <Routes>
      <Route element={<Layout user={user} handleLogout={handleLogout} />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/contacts" element={<ContactsPage user={user} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/selector" element={<SelectorPage />} />
        <Route
          path="/login"
          element={
            <AuthPage handleLogin={handleLogin} handleSignUp={handleSignUp} />
          }
        />
        <Route
          path="/category/:categoryId"
          element={<ProductsPage user={user} />}
        />
        <Route path="/category" element={<ProductsPage user={user} />} />
        <Route path="*" element={<ErrorPage user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
