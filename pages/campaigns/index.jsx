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
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Campaigns</title>
				<meta name="title" content="We Rise Together Foundation — Campaigns" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/campaigns" />
				<meta property="og:title" content="We Rise Together Foundation — Campaigns" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/campaigns" />
				<meta property="twitter:title" content="We Rise Together Foundation — Campaigns" />
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
					<div className="relative w-full h-[20rem]">
						<Image src={campaignHeader} alt="Thumb" style={{ objectFit: "contain" }} fill priority />
					</div>
					<h1 className="text-3xl font-medium text-center text-red-primary">Our Campaigns</h1>
					<p className="leading-7 text-center">
						We Rise Together Foundation has always looked forward to helping people in all areas, be it sanitation and hygiene
						through She Hygiene, better lifestyle through Helping hands, or a healthy nature through Sunday4SecuredFuture.
					</p>
				</header>

				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{Object.entries(projects).map(([index, item]) => (
						<div key={index} className="relative mt-[6rem]">
							<div className="rounded-full w-[10rem] aspect-square z-10 absolute -top-20 m-auto left-0 right-0 border border-gray-700 bg-white">
								<Image
									src={`https:${item.fields.logo.fields.file.url}`}
									style={{ objectFit: "cover" }}
									fill
									className="rounded-full"
									alt="thumbnail"
								/>
							</div>
							<div className="rounded-xl bg-gradient-to-br from-[#f96274] to-[#f1896e] text-white text-center pt-24 px-2 pb-10 shadow-md h-full">
								<h2 className="pb-2 font-semibold capitalize">{item.fields.title}</h2>
								<p className="text-sm leading-6">{item.fields.shortDescription}</p>
							</div>
							<Link
								project={item}
								href={"/campaigns/" + item.fields.slug}
								className="rounded-full btn btn-sm w-fit bg-[#853325] border-transparent z-10 absolute -bottom-4 m-auto left-0 right-0">
								Learn more
							</Link>
						</div>
					))}
				</section>
				<section className="flex flex-col items-center gap-6 mt-20">
					<p className="leading-7 text-center">
						We gained a lot of unforgettable memories from all the events we do. Have a peek at how our event look like by
						clicking on the card below.
					</p>
					<Link href={"/gallery"} className={`btn btn-outline px-10`}>
						Gallery
					</Link>
				</section>
			</Layout>
			<section className="h-[15rem] relative bg-slate-100 text-white mt-8">
				<Image
					src={campaignFooter}
					alt="Thumbnail"
					style={{ objectFit: "cover", objectPosition: "center" }}
					fill
					className="z-0"
					priority
				/>
				<div className="z-10 flex flex-col items-center justify-center w-full h-full backdrop-brightness-75">
					<h1 className="p-4 text-3xl font-medium text-center md:text-5xl">Make an Impact</h1>
					<div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
						<Link href="/donate" className="w-full border-transparent rounded-full btn bg-red-primary">
							Donate Now
						</Link>
						<Link
							href="https://docs.google.com/forms/d/e/1FAIpQLSeTeX2zhmKt6GNRetwODA-6rQ5xWQNAoIW3t-BMh7Ih38huqA/viewform"
							className="w-full text-white rounded-full btn btn-outline border-red-primary">
							Become a Volunteer
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Index;
