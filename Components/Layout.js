import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "tailwindcss/tailwind.css";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 antialiased">
        <div id="navbar">
          <Navbar />
        </div>
        <main className="max-w-5xl mx-auto py-5">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
 
export default Layout;