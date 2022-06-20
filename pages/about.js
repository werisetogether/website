import Layout from "../Components/Layout";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Head from "next/head";

const renderOptions = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export async function getStaticProps() {
  const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

  const about = await client.getEntries({ content_type: "about" });
  const team = await client.getEntries({ content_type: "team" });

  return {
    props: {
      about: about.items,
      team: team.items,
      revalidate: 10,
    },
  };
}

export default function About({ about, team }) {
  return (
    <div>
      <Head>
        {/* Genral Tags */}
        <title>We Rise Together Foundation — About</title>
        <meta name="title" content="We Rise Together Foundation — About" />
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
        <meta
          name="google-site-verification"
          content="BjWqAaLp8AyqUryXb0wkuIFCIfWdc4bobIjUDgeYd0I"
        />
        <meta name="msvalidate.01" content="E5F9D56E6DAF681D98D6E0B41D10462E" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.werisetogetherfoundation.org/about"
        />
        <meta
          property="og:title"
          content="We Rise Together Foundation — About"
        />
        <meta
          property="og:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.werisetogetherfoundation.org/about"
        />
        <meta
          property="twitter:title"
          content="We Rise Together Foundation — About"
        />
        <meta
          property="twitter:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta
          property="twitter:image"
          content="https://i.imgur.com/p68Dwwz.png"
        />
        <meta name="twitter:image:alt" content="We Rise Together Foundation" />
      </Head>
      <Layout>
        <section className="">
          {about.map((about) => (
            <div className="flex flex-col" key={about.sys.id}>
              <div className="">
                <div className="w-full mb-6">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    About Us
                  </h1>
                  <div className="h-2 w-20 bg-redBtn rounded"></div>
                </div>
                <div className="h-48 sm:h-80 mb-5 relative">
                  <Image
                    src={"https:" + about.fields.thumbnail.fields.file.url}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    alt="about us"
                  />
                </div>

                <div className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal my-10">
                  {documentToReactComponents(
                    about.fields.description,
                    renderOptions
                  )}
                </div>
              </div>
            </div>
          ))}

          <hr />

          <h2 className="sm:text-3xl text-2xl font-medium text-center title-font my-10 text-gray-900">
            The Founders
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {team.map((team) => (
              <div
                className="h-full flex flex-col items-center text-center"
                key={team.sys.id}
              >
                <div className="h-32 w-32 sm:h-60 sm:w-60 mb-5 relative">
                  <Image
                    src={"https:" + team.fields.profilePicture.fields.file.url}
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    alt="about us"
                  />
                </div>
                <div className="w-full">
                  <div className="font-medium texl-xl sm:text-2xl">
                    {team.fields.name}
                  </div>
                  <div className="text-gray-500 texl-base sm:text-xl">
                    <Link
                      href={
                        "https://twitter.com/" + team.fields.twitterUsername
                      }
                    >
                      <a className="inline-flex items-center justify-center mt-1 hover:underline">
                        @{team.fields.twitterUsername}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}
