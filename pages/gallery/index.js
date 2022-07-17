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
				<title>We Rise Together</title>
				{/* <meta name="description" content="Generated by create next app" /> */}
				{/* <link rel="icon" href="/favicon.ico" /> */}
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
