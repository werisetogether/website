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
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "aboutPageDetails" });

  return {
    props: {
      aboutPage: res.items,
    },
  };
}

export default function About({ aboutPage }) {
  return (
    <div>
      <Head>
        <title>WeRiseTogether - About</title>
        <meta name="description" content="About We Rise Together" />
        <link rel="icon" href="/favicon.icon" />
      </Head>
      <Layout>
        <section className="text-gray-600 body-font">
          {aboutPage.map((about) => (
            <div className="flex flex-col" key={about.sys.id}>
              <div className="">
                <div className="w-full mb-6">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                    About Us
                  </h1>
                  <div className="h-2 w-20 bg-redBtn rounded"></div>
                </div>
                <div className=" h-80 mb-5 relative">
                  <Image
                    src={"https:" + about.fields.thumbnail.fields.file.url}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col sm:flex-row mt-10">
                  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex flex-col items-center text-center justify-center">
                      <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                        {about.fields.founderName}
                      </h2>
                      <p className="text-base">Founder, We Rise Together</p>
                    </div>
                  </div>
                  <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0">
                    <div className="text-base sm:text-xl leading-7 sm:leading-9 font-normal mt-7 sm:mt-12">
                      {documentToReactComponents(
                        about.fields.description,
                        renderOptions
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </Layout>
    </div>
  );
};
