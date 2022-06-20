import { createClient } from "contentful";
import Image from "next/image";
import Layout from "../../Components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import DonateSnip from "../../Components/DonateSnip";
import Head from "next/head";
import Moment from "react-moment";
import Link from "next/link";

const renderOptions = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <div className="my-6 h-96 w-full relative">
          <Image
            className="rounded-xl h-full w-full"
            src={`https:${node.data.target.fields.file.url}`}
            objectFit="cover"
            layout="fill"
            width={node.data.target.fields.file.details.image.width}
            height={node.data.target.fields.file.details.image.height}
          />
        </div>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node) => {
      return (
        <a
          href={`/projects/${node.data.target.fields.slug}`}
          className="underline"
        >
          {" "}
          {node.data.target.fields.title}
        </a>
      );
    },
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a href={data.uri} className="underline">
        {children}
      </a>
    ),
  },
};

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "newsletter",
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
    content_type: "newsletter",
    "fields.slug": params.slug,
  });

  const donate = await client.getEntries({ content_type: "donationLink" });

  return {
    props: { newsletter: items[0], donate: donate.items },
    revalidate: 10,
  };
};

export default function Index({ newsletter, donate }) {
	const { title, slug, content, thumbnail, date, author } = newsletter.fields;
	return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — {title}</title>
				<meta name="title" content={"We Rise Together Foundation - " + title} />
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
				<meta property="og:url" content={"https://www.werisetogetherfoundation.org/" + slug} />
				<meta property="og:title" content={"We Rise Together Foundation - " + title} />
				<meta
					property="og:description"
					content="A non-profit organisation in India working towards the welfare of society and its surroundings"
				/>
				<meta property="og:image" content={"https:" + thumbnail.fields.file.url} />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={"https://www.werisetogetherfoundation.org/" + slug} />
				<meta property="twitter:title" content={"We Rise Together Foundation - " + title} />
				<meta
					property="twitter:description"
					content="A non-profit organisation in India working towards the welfare of society and its surroundings"
				/>
				<meta property="twitter:image" content={"https:" + thumbnail.fields.file.url} />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<Layout>
				<section className="">
					<div className="flex flex-col">
						<div className="">
							<div className="h-40 sm:h-80 relative">
								<Image
									className="rounded-xl h-full w-full"
									objectFit="cover"
									layout="fill"
									src={"https:" + thumbnail.fields.file.url}
									alt={title}
								/>
							</div>
							<div className="flex flex-wrap w-full my-10">
								<div className="w-full">
									<div className="mb-2">
										<h1 className="font-medium text-2xl sm:text-3xl title-font pb-2"> {title}</h1>
										<span className="uppercase">
											<Moment format="MMMM">{newsletter.fields.date}</Moment> Edition{" "}
										</span>
										<span> by {author}</span>
									</div>
									<div className="h-1 w-20 bg-redBtn rounded"></div>
								</div>
							</div>
							<div className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
								{documentToReactComponents(content, renderOptions)}
							</div>
						</div>
					</div>
				</section>

				<DonateSnip donate={donate} />
			</Layout>
		</div>
	);
}
