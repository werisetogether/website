import Head from 'next/head';
import Layout from '../Components/Layout';
import Header from '../Components/Header';
import ProjectSnip from '../Components/ProjectSnip';
import AboutSnip from '../Components/AboutSnip';
import DonateSnip from '../Components/DonateSnip';
import { createClient } from "contentful";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "homepageAbout" });

  return {
    props: {
      abouts: res.items,
    },
  };
}

export default function Home({ abouts }) {
  return (
    <div>
      <div>
        <Head>
          <title>WeRiseTogether</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.icon" />
        </Head>
        <main>
          <Layout>
            <Header />
            <div className="max-w-4xl mx-auto">
              <ProjectSnip />
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
