import Layout from "../Components/Layout";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import Moment from "react-moment";
import Head from "next/head";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "newsletter" });

  return {
    props: {
      newsletters: res.items,
      revalidate: 10,
    },
  };
}

export default function newsletter({ newsletters }) {
  return (
    <div>
      <Head>
        {/* Genral Tags */}
        <title>We Rise Together Foundation — Newsletter</title>
        <meta name="title" content="We Rise Together Foundation — Newsletter" />
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
          content="https://www.werisetogetherfoundation.org/newsletter"
        />
        <meta
          property="og:title"
          content="We Rise Together Foundation — Newsletter"
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
          content="https://www.werisetogetherfoundation.org/newsletter"
        />
        <meta
          property="twitter:title"
          content="We Rise Together Foundation — Newsletter"
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
          <div className="">
            <div className="flex flex-wrap w-full mb-10">
              <div className="w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Our Newsletters
                </h1>
                <div className="h-2 w-20 bg-redBtn rounded"></div>
              </div>
              <p className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
                Check out our monthly newsletters.
              </p>
            </div>
            {newsletters != 0 ? (
              <div className="flex flex-col gap-4">
                {newsletters.map((newsletter) => (
                  <Link
                    key={newsletter.sys.id}
                    newsletter={newsletter}
                    href={"/newsletter/" + newsletter.fields.slug}
                  >
                    <a className="p-4 flex flex-wrap gap-4 md:flex-nowrap border-2 border-black rounded-xl hover:bg-gray-100">
                      <div className="md:w-64 mt-1 flex-shrink-0 flex flex-col">
                        <span className="font-semibold text-sm text-gray-700 uppercase">
                          <Moment format="MMMM">
                            {newsletter.fields.date}
                          </Moment>{" "}
                          Edition
                        </span>
                      </div>
                      <div className="md:flex-grow">
                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                          {newsletter.fields.title}
                        </h2>
                        <p className="prose line-clamp-2">
                          {newsletter.fields.description}
                        </p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 border-2 border-black mt-4 rounded-xl text-center">
                No newsletters found
              </div>
            )}
          </div>
        </section>
      </Layout>
    </div>
  );
}
