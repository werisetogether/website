import Head from 'next/head';
import React from 'react'
import Layout from '../components/Layout/Layout';
import Navbar from '../components/Navbar/Navbar';
import { createClient } from "contentful";
import Image from 'next/image';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const team = await client.getEntries({ content_type: "team" });

	return {
		props: {
			team: team.items,
			revalidate: 10,
		},
	};
}

const Team = ({team}) => {
  return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Team</title>
				<meta name="title" content="We Rise Together Foundation — Team" />
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
				<meta property="og:url" content="https://www.werisetogetherfoundation.com/team" />
				<meta property="og:title" content="We Rise Together Foundation — Team" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.com/team" />
				<meta property="twitter:title" content="We Rise Together Foundation — Team" />
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
					<h1 className="text-3xl font-medium text-center text-red-primary">Our Team</h1>
				</header>
				<section className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{Object.entries(team).map(([index, member]) => (
						<div key={index} className="shadow-md card overflow-clip">
							<div className="relative w-full overflow-clip aspect-square">
								<Image
									src={`http:${member.fields.profilePicture.fields.file.url}`}
									style={{ objectFit: "cover", objectPosition: "center" }}
									fill
									alt="profile"
								/>
							</div>
							<h2 className="p-4 text-lg font-medium text-center truncate">{member.fields.name}</h2>
						</div>
					))}
				</section>
			</Layout>
		</div>
	);
}

export default Team