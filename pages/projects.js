import Layout from "../Components/Layout";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Moment from "react-moment";
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

  const res = await client.getEntries({ content_type: "singleProject" });

  return {
    props: {
      projects: res.items,
      revalidate: 1,
    },
  };

}

export default function Projects({ projects }) {
  return (
    <div>
      <Head>
        <title>WeRiseTogether - Projects</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Layout>
        <section className="text-gray-600 body-font">
          <div className="">
            <div className="flex flex-wrap w-full mb-10">
              <div className="w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Our Projects
                </h1>
                <div className="h-2 w-20 bg-redBtn rounded"></div>
              </div>
              <p className="text-base sm:text-xl leading-7 sm:leading-9 font-normal">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them man bun deep jianbing selfies heirloom
                prism food truck ugh squid celiac humblebrag.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.sys.id}
                  project={project}
                  href={"/projects/" + project.fields.slug}
                >
                  <a>
                    <div className="border-2 border-black hover:bg-gray-100 p-4 rounded-3xl">
                      <div className=" h-48 mb-5 relative">
                        <Image
                          src={
                            "https:" + project.fields.thumbnail.fields.file.url
                          }
                          className="rounded-2xl"
                          layout="fill"
                          objectFit="cover"
                          about={project.fields.title}
                        />
                      </div>
                      <div className="px-3">
                        <h3 className="text-sm font-semibold mb-2">
                          <Moment format="YYYY/MM/DD">
                            {project.fields.date}
                          </Moment>
                        </h3>
                        <h2 className="text-2xl text-gray-900 font-medium mb-4">
                          {project.fields.title}
                        </h2>
                        <div className="leading-relaxed text-base pb-2">
                          {project.fields.shortDescription}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};