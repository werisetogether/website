import { createClient } from "contentful";
import Image from "next/image";
import Layout from "../../Components/Layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import DonateSnip from "../../Components/DonateSnip";
import Head from "next/head";
import Link from "next/link";

const renderOptions = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
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

export default function RecipeDetails({ project, donate }) {
  const { title, slug, description, thumbnail, gallery } = project.fields;
  return (
    <div>
      <Head>
        {/* Genral Tags */}
        <title>We Rise Together — {title}</title>
        <meta name="title" content={"We Rise Together - " + title} />
        <meta
          name="description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta
          name="keywords"
          content="werisetogether, we rise together, non profit organisation, menstrual hygiene, ngo india, shreya tuli, aarava seth, sunday4securedfuture, s4sf, shehygiene, she hygiene, helping hands"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="We Rise Together" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={"https://www.werisetogetherfoundation.org/" + slug}
        />
        <meta property="og:title" content={"We Rise Together - " + title} />
        <meta
          property="og:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta
          property="og:image"
          content={"https:" + thumbnail.fields.file.url}
        />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={"https://www.werisetogetherfoundation.org/" + slug}
        />
        <meta
          property="twitter:title"
          content={"We Rise Together - " + title}
        />
        <meta
          property="twitter:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta
          property="twitter:image"
          content={"https:" + thumbnail.fields.file.url}
        />
        <meta name="twitter:image:alt" content="We Rise Together" />
      </Head>
      <Layout>
        <section className="">
          <div className="flex flex-col">
            <div className="">
              <div className="h-40 sm:h-80 relative">
                <Image
                  alt="content"
                  className="rounded-3xl h-full w-full"
                  objectFit="cover"
                  layout="fill"
                  src={"https:" + thumbnail.fields.file.url}
                  alt={title}
                />
              </div>
              <div className="flex flex-wrap w-full my-10">
                <div className="w-full">
                  <div className="sm:text-3xl text-2xl font-medium title-font mb-2 break-all">
                    {title}
                  </div>
                  <div className="h-1 w-20 bg-redBtn rounded"></div>
                </div>
              </div>
              <div className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
                {documentToReactComponents(description, renderOptions)}
              </div>
            </div>
          </div>
        </section>
        {gallery != null ? (
          <div className="mt-24">
            <h1 className="font-semibold text-3xl sm:text-5xl">Gallery</h1>
            <p className="text-sm sm:text-xl leading-7 sm:leading-9 mt-5 sm:mt-10">
              We gained a lot of unforgettable memories from all the events we
              do. Have a peek at how our event look like by clicking on the
              cards below.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-7">
              {gallery.map((gallery) => (
                <Link
                  key={gallery.sys.id}
                  gallery={gallery}
                  href={"/gallery/" + gallery.fields.slug}
                >
                  <a className="border-2 border-black hover:bg-gray-100 p-4 rounded-3xl text-center">
                    <h3 className="text-lg font-medium">
                      {gallery.fields.title}
                    </h3>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <DonateSnip donate={donate} />
      </Layout>
    </div>
  );
}
