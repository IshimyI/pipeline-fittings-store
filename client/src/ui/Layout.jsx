import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { ShootingStars } from "./shooting-stars";

export default function Layout({ user, handleLogout }) {
  return (
    <div className="min-h-screen relative isolate">
      <div className="space-layer grid-layer" />
      <div className="space-layer stars-layer" />
      <div className="space-layer twinkling-layer" />
      <div className="space-layer sputnik-layer" />

      <div className="main-content">
        <Header user={user} handleLogout={handleLogout} />
        <div className="min-h-[calc(100vh-160px)]">
          <Outlet />
        </div>
        <Footer />
        <ShootingStars />
      </div>
    </div>
  );
}
