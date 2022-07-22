import { createClient } from "contentful";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/Navbar/Navbar";

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "gallery",
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
    content_type: "gallery",
    "fields.slug": params.slug,
  });

  const donate = await client.getEntries({ content_type: "donationLink" });

  return {
    props: { gallery: items[0], donate: donate.items },
    revalidate: 10,
  };
};

export default function Index({ gallery, donate }) {
  const { title, pictures, slug } = gallery.fields;
  return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>{`We Rise Together Foundation — ${title} Gallery`}</title>
				<meta name="title" content={`We Rise Together Foundation — ${title} Gallery`} />
				<meta
					name="description"
					content="A non-profit organisation in India working towards the welfare of society and its surroundings"
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
				<meta property="og:title" content={"We Rise Together Foundation - " + title + " Gallery"} />
				<meta
					property="og:description"
					content="A non-profit organisation in India working towards the welfare of society and its surroundings"
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={`https://www.werisetogetherfoundation.org/${slug}`} />
				<meta property="twitter:title" content={"We Rise Together Foundation - " + title} />
				<meta
					property="twitter:description"
					content="A non-profit organisation in India working towards the welfare of society and its surroundings"
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<Navbar />
			<Layout>
				<header className="py-8 flex flex-col gap-4">
					<h1 className="text-3xl font-medium text-red-primary">Gallery - {title}</h1>
				</header>
				<section className="grid gap-2 grid-cols-2 sm:grid-cols-3">
					{pictures.map((pictures) => (
						<Link href={"https:" + pictures.fields.file.url} key={pictures.fields.id}>
							<a target="blank">
								<div className="w-full aspect-square relative">
									<Image
										className="rounded h-full w-full"
										objectFit="cover"
										layout="fill"
										src={"https:" + pictures.fields.file.url}
										alt={pictures.fields.title}
										loading="lazy"
										quality={70}
									/>
								</div>
							</a>
						</Link>
					))}
				</section>
			</Layout>
		</div>
	);
}
