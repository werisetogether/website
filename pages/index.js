import Head from "next/head";
import Layout from "../Components/Layout";
import Header from "../Components/Header";
import ProjectSnip from "../Components/ProjectSnip";
import AboutSnip from "../Components/AboutSnip";
import DonateSnip from "../Components/DonateSnip";
import { createClient } from "contentful";
import Link from "next/link";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const donate = await client.getEntries({ content_type: "donationLink" });
  const about = await client.getEntries({ content_type: "about" });
  const projects = await client.getEntries({
    content_type: "singleProject",
    limit: 2,
  });

  return {
    props: {
      about: about.items[0].fields,
      projects: projects.items,
      donate: donate.items,
      revalidate: 10,
    },
  };
}

export default function Home({ about, projects, donate }) {
  return (
    <div>
      <div>
        <Head>
          {/* Genral Tags */}
          <title>We Rise Together — Inspire, Aid and Empower</title>
          <meta
            name="title"
            content="We Rise Together Foundation Foundation — Inspire, Aid and Empower"
          />
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
          <meta
            name="msvalidate.01"
            content="E5F9D56E6DAF681D98D6E0B41D10462E"
          />
          <link rel="preload" href="https://i.imgur.com/p68Dwwz.png" />
          <link rel="preconnect" href="https://i.imgur.com/p68Dwwz.png" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.werisetogetherfoundation.org/"
          />
          <meta
            property="og:title"
            content="We Rise Together Foundation — Inspire, Aid and Empower"
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
            content="https://www.werisetogetherfoundation.org/"
          />
          <meta
            property="twitter:title"
            content="We Rise Together Foundation — Inspire, Aid and Empower"
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
        <main>
          <Layout>
            <Header />
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                {projects.map((project) => (
                  <ProjectSnip key={project.sys.id} project={project} />
                ))}
                <Link href="/projects">
                  <a className="sm:col-span-2">
                    <button className="focus:outline-none border-2 border-black rounded-3xl px-8 py-4 text-lg sm:text-xl font-semibold flex justify-center w-full h-full items-center">
                      See Projects
                    </button>
                  </a>
                </Link>
              </div>
              <AboutSnip about={about} />
              <DonateSnip donate={donate} />
            </div>
          </Layout>
        </main>
      </div>
    </div>
  );
}
