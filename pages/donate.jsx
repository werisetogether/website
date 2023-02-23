import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import { createClient } from "contentful";
import Link from "next/link";
import background from "../public/donate.jpg";
import Image from "next/image";

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const link = await client.getEntries({ content_type: "donationLink" });

	return {
		props: {
			links: link.items,
			revalidate: 10,
		},
	};
}

const Donate = ({ links }) => {
	return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Donate</title>
				<meta name="title" content="We Rise Together Foundation — Donate" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/donate" />
				<meta property="og:title" content="We Rise Together Foundation — Donate" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/donate" />
				<meta property="twitter:title" content="We Rise Together Foundation — Donate" />
				<meta
					property="twitter:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<ToastContainer />
			<Navbar />
			<header className="h-[20rem] relative bg-slate-100 text-white mb-8">
				<Image
					src={background}
					alt="Thumbnail"
					style={{ objectFit: "cover", objectPosition: "center" }}
					fill
					className="z-0"
					priority
				/>
				<div className="z-10 flex flex-col items-center justify-center w-full h-full backdrop-brightness-75">
					<h1 className="p-4 text-3xl font-medium text-center md:text-5xl">Donate for a better future</h1>
				</div>
			</header>
			<Layout>
				<section className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{Object.entries(links).map(([index, item]) =>
						item.fields.link ? (
							<Link
								key={index}
								href={item.fields.link}
								className={`btn ${index == 0 ? " border-transparent bg-red-primary" : " btn-outline"}`}>
								{item.fields.name}
							</Link>
						) : (
							<div key={index}>
								<label
									htmlFor={item.sys.id}
									className={`btn w-full ${index == 0 ? " border-transparent bg-red-primary" : " btn-outline"}`}>
									{item.fields.name}
								</label>
								<input type="checkbox" id={item.sys.id} className="modal-toggle" />
								<label htmlFor={item.sys.id} className="cursor-pointer modal">
									<label className="relative modal-box" htmlFor="">
										<h3 className="mb-4 text-lg font-bold">{item.fields.name}</h3>
										<div className="relative w-full p-2 border aspect-square">
											<Image
												src={`https:${item.fields.qrCode.fields.file.url}`}
												style={{ objectFit: "cover" }}
												fill
												alt={item.fields.name}
											/>
										</div>
									</label>
								</label>
							</div>
						)
					)}
				</section>
			</Layout>
		</div>
	);
};

export default Donate;
