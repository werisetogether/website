import Head from "next/head";
import React from "react";
import { createClient } from "contentful";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: "gallery" });

	return {
		props: {
			gallery: res.items,
			revalidate: 10,
		},
	};
}

const Index = ({ gallery }) => {
	return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Gallery</title>
				<meta name="title" content="We Rise Together Foundation — Gallery" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/gallery" />
				<meta property="og:title" content="We Rise Together Foundation — Gallery" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/gallery" />
				<meta property="twitter:title" content="We Rise Together Foundation — Gallery" />
				<meta
					property="twitter:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<Navbar />
			<Layout>
				<header className="py-8 flex flex-col gap-4">
					<h1 className="text-3xl font-medium text-red-primary">Gallery</h1>
				</header>

				<section className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{Object.entries(gallery).map(([index, item]) => (
						<Link key={index} gallery={item} href={"/gallery/" + item.fields.slug}>
							<a className="card shadow-md">
								<div className="aspect-square w-full relative">
									<Image
										src={`http:${item.fields.pictures[0].fields.file.url}`}
										layout="fill"
										objectFit="cover"
										objectPosition="center"
										alt="thumbnail"
									/>
								</div>
								<h2 className="text-lg font-medium p-4 truncate text-center">{item.fields.title}</h2>
							</a>
						</Link>
					))}
				</section>
			</Layout>
		</div>
	);
};

export default Index;
