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
				{/* Genral Tags */}
				<title>{`We Rise Together Foundation — ${title}`}</title>
				<meta name="title" content={`We Rise Together Foundation — ${title}`} />
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
				<meta property="og:url" content={`https://www.werisetogetherfoundation.org/${slug}`} />
				<meta property="og:title" content={`We Rise Together Foundation — ${title}`} />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={`https://www.werisetogetherfoundation.org/${slug}`} />
				<meta property="twitter:title" content={`We Rise Together Foundation — ${title}`} />
				<meta
					property="twitter:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<Navbar />
			<Layout>
				<header className="flex flex-col gap-4 py-8">
					<div className="relative w-full h-[20rem] border rounded-xl overflow-clip">
						<Image
							src={`https:${thumbnail.fields.file.url}`}
							alt="thumb"
							style={{ objectFit: "cover"}}
							fill
							priority
						/>
					</div>
					<h1 className="text-3xl font-medium text-center text-red-primary">{title}</h1>
					<div className="leading-7 text-center">{documentToReactComponents(description, renderOptions)}</div>
				</header>

				<div className="flex flex-col items-center justify-center">
					<h1 className="p-4 text-3xl font-medium text-center">{donationCta}</h1>
					<div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
						<Link href="/donate" className="w-full border-transparent rounded-full btn bg-red-primary">
							Donate Now
						</Link>
						{gallery.map((gallery) => (
							<Link
								key={gallery.sys.id}
								gallery={gallery}
								href={"/gallery/" + gallery.fields.slug}
								className="w-full rounded-full btn btn-outline border-red-primary">
								{gallery.fields.title}
							</Link>
						))}
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Slug;
