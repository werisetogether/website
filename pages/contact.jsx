import Head from "next/head";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";

const Contact = () => {
	const sendEmail = async (event) => {
		try {
			event.preventDefault();

			await emailjs.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
				event.target,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);

			toast("Message sent!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Head>

				{/* Genral Tags */}
				<title>We Rise Together Foundation — Contact</title>
				<meta name="title" content="We Rise Together Foundation — Contact" />
				<meta
					name="description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta
					name="keywords"
					content="werisetogether, werisetogether foundation, we rise together foundation, we rise together, non profit organisation, menstrual hygiene, ngo india, shreya tuli, aarava seth, sunday4securedfuture, s4sf, shehygiene, she hygiene, helping hands"
				/>
				<meta name="robots" content="index, follow" />
				<meta name="language" content="English" />
				<meta name="revisit-after" content="1 days" />
				<meta name="author" content="We Rise Together Foundation" />
				<meta name="google-site-verification" content="BjWqAaLp8AyqUryXb0wkuIFCIfWdc4bobIjUDgeYd0I" />
				<meta name="msvalidate.01" content="E5F9D56E6DAF681D98D6E0B41D10462E" />

				{/* Open Graph */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.werisetogetherfoundation.com/contact" />
				<meta property="og:title" content="We Rise Together Foundation — Contact" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.com/contact" />
				<meta property="twitter:title" content="We Rise Together Foundation — Contact" />
				<meta
					property="twitter:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<ToastContainer />
			<Navbar />
			<Layout>
				<header className="py-8 flex flex-col gap-4">
					<h1 className="text-3xl font-medium text-red-primary">Contact</h1>
					<p>Have a question you want to ask? Feel free to send us a message. We will get back to you as soon as possible.</p>
				</header>
				<form className="form-control gap-2" onSubmit={sendEmail}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<div>
							<label className="label">
								<span className="label-text">Full Name</span>
							</label>
							<input type="text" placeholder="John Doe" className="input input-bordered w-full" required />
						</div>
						<div>
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input type="email" placeholder="johndoe@example.com" className="input input-bordered w-full" required />
						</div>
					</div>

					<div>
						<label className="label">
							<span className="label-text">Message</span>
						</label>
						<textarea className="textarea textarea-bordered h-24 w-full" placeholder="Type here" required />
					</div>
					<button type="submit" className="btn border-transparent w-fit bg-red-primary">
						Send message
					</button>
				</form>
			</Layout>
		</div>
	);
};

export default Contact;
