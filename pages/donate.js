import Layout from "../Components/Layout";
import Link from "next/link";
import { createClient } from "contentful";
import HeaderIMG from "../public/header.png";
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
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const link = await client.getEntries({ content_type: "donationLink" });

  return {
    props: {
      link: link.items,
      revalidate: 10,
    },
  };
}

export default function Donate({ link }) {
  return (
    <div>
      <Head>
        {/* Genral Tags */}
        <title>We Rise Together — Donate</title>
        <meta name="title" content="We Rise Together — Donate" />
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
          content="https://www.werisetogetherfoundation.org/donate"
        />
        <meta property="og:title" content="We Rise Together — Donate" />
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
          content="https://www.werisetogetherfoundation.org/donate"
        />
        <meta property="twitter:title" content="We Rise Together — Donate" />
        <meta
          property="twitter:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
        <meta name="twitter:image:alt" content="We Rise Together" />
      </Head>
      <Layout>
        <section className="">
          <div className="">
            <div className="flex flex-wrap w-full mb-10">
              <div className="w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Donate Now
                </h1>
                <div className="h-2 w-20 bg-redBtn rounded"></div>
              </div>
              <p className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
                We Rise Together Foundation has always looked forward to helping
                people in all areas, be it sanitation and hygiene through She
                Hygiene, better lifestyle through Helping hands, or a healthy
                nature through Sunday4SecuredFuture. We are trying our level
                best to keep up with our work and to bring happiness through our
                initiatives but we need your support and kind gestures to move
                forward. Donate now to help those who need it the most!
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-4 mt-7">
              {link.map((link) => (
                <Link href={link.fields.link}>
                  <a
                    className="font-medium text-2xl sm:text-4xl text-center rounded-3xl py-5 leading-relaxed bg-gray-200 hover:bg-redBtn"
                    target="blank"
                  >
                    {link.fields.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
}
