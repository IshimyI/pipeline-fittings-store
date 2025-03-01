import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <div className="min-h-screen bg-gray-900">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
