import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <main className="max-w-screen-xl px-4 md:px-0 mx-auto min-h-[calc(100vh-340px)]">
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;