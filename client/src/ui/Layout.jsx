import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { ShootingStars } from "./shooting-stars";

export default function Layout({ user, handleLogout }) {
  return (
    <>
      <div className="min-h-screen relative isolate ">
        <div className="twinkling">
          <div className="stars">
            <Header user={user} handleLogout={handleLogout} />
            <Outlet />
            <ShootingStars />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
