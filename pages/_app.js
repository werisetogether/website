import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="flex flex-col min-h-screen antialiased scroll-smooth">
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

export default MyApp;
