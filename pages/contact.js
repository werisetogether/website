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
				<title>We Rise Together</title>
				{/* <meta name="description" content="Generated by create next app" /> */}
				{/* <link rel="icon" href="/favicon.ico" /> */}
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
