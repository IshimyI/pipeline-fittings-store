import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { ShootingStars } from "./shooting-stars";

export default function Layout({ user, handleLogout }) {
  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <div className="min-h-screen relative isolate">
        <Outlet />
        <ShootingStars />
      </div>
      <Footer />
    </>
  );
}
