import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </>
  );
}
