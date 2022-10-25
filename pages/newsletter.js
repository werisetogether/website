import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import { createClient } from "contentful";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: "newsletter" });

	return {
		props: {
			newsletters: res.items,
			revalidate: 10,
		},
	};
}

const Index = ({ newsletters }) => {
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
				<title>We Rise Together Foundation — Newsletter</title>
				<meta name="title" content="We Rise Together Foundation — Newsletter" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/newsletter" />
				<meta property="og:title" content="We Rise Together Foundation — Newsletter" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/newsletter" />
				<meta property="twitter:title" content="We Rise Together Foundation — Newsletter" />
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
				<header className="py-8 flex flex-col gap-4">
					<h1 className="text-3xl font-medium text-red-primary">WRT Mirror</h1>
					<p>Check out our newsletter.</p>
				</header>

				<section>
					{newsletters != 0 ? (
						<div className="flex flex-col gap-4">
							{Object.entries(newsletters)
								.sort((a, b) => {
									return b[1].fields.date.localeCompare(a[1].fields.date);
								})
								.map(([index, newsletter]) => (
									<Link key={index} newsletter={newsletter} href={"https:" + newsletter.fields.pdf.fields.file.url}>
										<a
											target="blank"
											className="p-4 flex flex-wrap gap-4 md:flex-nowrap border-2 border-black rounded-xl hover:bg-gray-100">
											<div className="md:flex-grow">
												<h2 className="text-xl font-medium text-[#fb5776] title-font mb-2">{newsletter.fields.title}</h2>
												<p className="prose line-clamp-2">{newsletter.fields.description}</p>
											</div>
										</a>
									</Link>
								))}
						</div>
					) : (
						<div className="p-4 border-2 border-black mt-4 rounded-xl text-center">No newsletters found</div>
					)}
				</section>
			</Layout>
		</div>
	);
};

export default Index;
