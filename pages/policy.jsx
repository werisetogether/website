import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import { createClient } from "contentful";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const renderOptions = {
	renderText: (text) => {
		return text.split("\n").reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	},
};

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: "policy" });

	return {
		props: {
			policies: res.items,
			revalidate: 10,
		},
	};
}

export default function policy({ policies }) {
	console.log(policies);
	return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Policy</title>
				<meta name="title" content="We Rise Together Foundation — Policy" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/policy" />
				<meta property="og:title" content="We Rise Together Foundation — Policy" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/policy" />
				<meta property="twitter:title" content="We Rise Together Foundation — Policy" />
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
				<header className="flex flex-col gap-4 py-8">
					<h1 className="text-3xl font-medium text-red-primary">Policies</h1>
					<p>Check out our newsletter.</p>
				</header>

				<section>
					{policies != 0 ? (
						<div className="flex flex-col gap-4">
							{Object.entries(policies).map(([index, newsletter]) => (
								<div key={index}>
									<div
										className="w-full gap-4 p-4 border-2 border-black rounded-xl hover:bg-gray-100 text-xl text-center font-medium text-[#fb5776] title-font mb-2 cursor-pointer"
										onClick={() => window.my_modal_1.showModal()}>
										{newsletter.fields.title}
									</div>
									<dialog id="my_modal_1" className="p-2 modal">
										<form method="dialog" className="modal-box">
											<h3 className="text-lg font-bold">{newsletter.fields.title}</h3>
											<div className="py-4 text-sm leading-6">
												{documentToReactComponents(newsletter.fields.content, renderOptions)}
											</div>
											<div className="modal-action">
												{/* if there is a button in form, it will close the modal */}
												<button className="w-full btn">I have read the terms</button>
											</div>
										</form>
									</dialog>
								</div>
							))}
						</div>
					) : (
						<div className="p-4 mt-4 text-center border-2 border-black rounded-xl">No policy found</div>
					)}
				</section>
			</Layout>
		</div>
	);
}
