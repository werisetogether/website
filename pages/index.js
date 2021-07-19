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

  const abouts = await client.getEntries({ content_type: "homepageAbout" });
  const projects = await client.getEntries({
    content_type: "singleProject",
    limit: 2,
  });

  return {
    props: {
      abouts: abouts.items,
      projects: projects.items,
    },
  };
}

export default function Home({ abouts, projects }) {
  return (
    <div>
      <div>
        <Head>
          <title>WeRiseTogether</title>
          <meta property="og:title" content="WeRiseTogether" />
          <link rel="icon" href="/favicon.icon" />
          <meta
            name="description"
            content="We Rise Together is a non profit initiative based in india."
          />
          <meta
            name="keywords"
            content="werisetogether, we rise together, non profit organisation, menstrual hygiene, ngo india, shreya tuli"
          />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="5 days" />
          <meta name="author" content="We Rise Together" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content="shreyatuli" key="twhandle" />

          {/* Open Graph */}
          <meta
            property="og:url"
            content="https://website-shady-three.vercle.app"
            key="ogurl"
          />
          <meta
            property="og:site_name"
            content="WeRiseTogether"
            key="ogsitename"
          />
          <meta property="og:title" content="WeRiseTogether" key="ogtitle" />
          <meta property="og:locale" content="en_GB" />
          <meta
            property="og:description"
            content="We Rise Together is a non profit initiative based in india."
            key="ogdesc"
          />
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
                  <a className="sm:col-span-3">
                    <button className="focus:outline-none border-2 border-black rounded-xl px-8 py-4 text-lg sm:text-xl font-semibold flex justify-center w-full h-full items-center">
                      Learn more
                    </button>
                  </a>
                </Link>
              </div>
              {abouts.map((about) => (
                <AboutSnip key={about.sys.id} about={about} />
              ))}
              <DonateSnip />
            </div>
          </Layout>
        </main>
      </div>
    </div>
  );
}
