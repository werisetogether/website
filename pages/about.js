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

  const about = await client.getEntries({ content_type: "about" });
  const team = await client.getEntries({ content_type: "team" });

  return {
    props: {
      about: about.items,
      team: team.items,
      revalidate: 1,
    },
  };
}

export default function About({ about, team }) {
  return (
    <div>
      <Head>
        <title>WeRiseTogether - About</title>
        <meta name="description" content="About We Rise Together" />
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
            The Team
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {team.map((team) => (
              <div
                class="h-full flex flex-col items-center text-center"
                key={team.sys.id}
              >
                <div className="h-48 w-48 sm:h-80 sm:w-80 mb-5 relative">
                  <Image
                    src={"https:" + team.fields.profilePicture.fields.file.url}
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    alt="about us"
                  />
                </div>
                <div class="w-full">
                  <div class="font-medium texl-xl sm:text-2xl">
                    {team.fields.name}
                  </div>
                  <div class="text-gray-500 texl-base sm:text-xl">
                    {team.fields.position}
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
