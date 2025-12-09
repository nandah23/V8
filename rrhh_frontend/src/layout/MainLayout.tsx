import { Outlet } from "react-router-dom";
import Navbar from '../components/layout/Navbar';
import Footer from "../components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col"> 
        <Navbar/>
      <main className="flex-1 pt-20 container mx-auto px-4">
        <Outlet />
      </main>
        <Footer />
    </div>
  );
};

export default MainLayout;
