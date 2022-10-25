import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import { createClient } from "contentful";
import Link from "next/link";
import background from "../public/donate.jpg"
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
		<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-36SZJWPBZW"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-36SZJWPBZW');
</script>
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
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className="z-0"
					priority
				/>
				<div className="z-10 backdrop-brightness-75 w-full h-full flex flex-col justify-center items-center">
					<h1 className="text-3xl md:text-5xl font-medium text-center p-4">Donate for a better future</h1>
				</div>
			</header>
			<Layout>
				<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{Object.entries(links).map(([index, item]) => (
						<Link key={index} href={item.fields.link}>
							<a className={`btn ${index == 0 ? " border-transparent bg-red-primary" : " btn-outline"}`}>{item.fields.name}</a>
						</Link>
					))}
				</section>
			</Layout>
		</div>
	);
};

export default Donate;
