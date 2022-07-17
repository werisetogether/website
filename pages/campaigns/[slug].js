import React from "react";
import { createClient } from "contentful";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Navbar from "../../components/Navbar/Navbar";
import Layout from "../../components/Layout/Layout";

const renderOptions = {
	renderText: (text) => {
		return text.split("\n").reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	},
};

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: "singleProject",
	});

	const paths = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug },
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const { items } = await client.getEntries({
		content_type: "singleProject",
		"fields.slug": params.slug,
	});

	const donate = await client.getEntries({ content_type: "donationLink" });

	return {
		props: { project: items[0], donate: donate.items },
		revalidate: 10,
	};
};

const Slug = ({ project, donate }) => {
	const { title, slug, description, donationCta, thumbnail, gallery } = project.fields;

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
					<div className="relative w-full h-[20rem] border rounded-xl overflow-clip">
						<Image src={`https:${thumbnail.fields.file.url}`} layout="fill" objectFit="cover" priority />
					</div>
					<h1 className="text-3xl text-center font-medium text-red-primary">{title}</h1>
					<div className="text-center leading-7">{documentToReactComponents(description, renderOptions)}</div>
				</header>

				<div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-medium text-center p-4">{donationCta}</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
						<Link href="/donate">
							<a className="btn rounded-full w-full border-transparent bg-red-primary">Donate Now</a>
						</Link>
						{gallery.map((gallery) => (
							<Link key={gallery.sys.id} gallery={gallery} href={"/gallery/" + gallery.fields.slug}>
								<a className="btn btn-outline rounded-full w-full border-red-primary">{gallery.fields.title}</a>
							</Link>
						))}
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Slug;
