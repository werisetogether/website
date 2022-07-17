import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/Navbar/Navbar";
import campaignHeader from "../../public/campaignHeader.png";
import campaignFooter from "../../public/campaignFooter.jpg";
import { createClient } from "contentful";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: "singleProject" });

	return {
		props: {
			projects: res.items,
			revalidate: 10,
		},
	};
}

const Index = ({ projects }) => {
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
					<div className="relative w-full h-[20rem]">
						<Image src={campaignHeader} layout="fill" objectFit="contain" priority />
					</div>
					<h1 className="text-3xl text-center font-medium text-red-primary">Our Campaigns</h1>
					<p className="text-center leading-7">
						We Rise Together Foundation has always looked forward to helping people in all areas, be it sanitation and hygiene
						through She Hygiene, better lifestyle through Helping hands, or a healthy nature through Sunday4SecuredFuture.
					</p>
				</header>

				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{Object.entries(projects).map(([index, item]) => (
						<div key={index} className="relative mt-[6rem]">
							<div className="rounded-full w-[10rem] aspect-square z-10 absolute -top-20 m-auto left-0 right-0 border border-gray-700 bg-white">
								<Image
									src={`https:${item.fields.logo.fields.file.url}`}
									layout="fill"
									objectFit="cover"
									className="rounded-full"
									alt="thumbnail"
								/>
							</div>
							<div className="rounded-xl bg-gradient-to-br from-[#f96274] to-[#f1896e] text-white text-center pt-24 px-2 pb-10 shadow-md h-full">
								<h2 className="capitalize pb-2 font-semibold">{item.fields.title}</h2>
								<p className="text-sm leading-6">{item.fields.shortDescription}</p>
							</div>
							<Link project={item} href={"/campaigns/" + item.fields.slug}>
								<a
									type="button"
									className="rounded-full btn btn-sm w-fit bg-[#853325] border-transparent z-10 absolute -bottom-4 m-auto left-0 right-0">
									Learn more
								</a>
							</Link>
						</div>
					))}
				</section>
				<section className="mt-20 flex flex-col items-center gap-6">
					<p className="text-center leading-7">
						We gained a lot of unforgettable memories from all the events we do. Have a peek at how our event look like by
						clicking on the card below.
					</p>
					<Link href={"/gallery"}>
						<a className={`btn btn-outline px-10`}>Gallery</a>
					</Link>
				</section>
			</Layout>
			<section className="h-[15rem] relative bg-slate-100 text-white mt-8">
				<Image
					src={campaignFooter}
					alt="Thumbnail"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className="z-0"
					priority
				/>
				<div className="z-10 backdrop-brightness-75 w-full h-full flex flex-col justify-center items-center">
					<h1 className="text-3xl md:text-5xl font-medium text-center p-4">Make an Impact</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
						<Link href="/donate">
							<a className="btn rounded-full w-full border-transparent bg-red-primary">Donate Now</a>
						</Link>
						<Link href="https://docs.google.com/forms/d/e/1FAIpQLSeTeX2zhmKt6GNRetwODA-6rQ5xWQNAoIW3t-BMh7Ih38huqA/viewform">
							<a className="btn btn-outline rounded-full w-full border-red-primary text-white">Become a Volunteer</a>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Index;
