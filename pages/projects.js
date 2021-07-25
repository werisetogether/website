import Layout from "../Components/Layout";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Moment from "react-moment";
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
        {/* Genral Tags */}
        <title>We Rise Together — About</title>
        <meta name="title" content="We Rise Together — Projects" />
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
          content="https://website-sandy-three.vercel.app/projects"
        />
        <meta property="og:title" content="We Rise Together — Projects" />
        <meta
          property="og:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta property="og:image" content={HeaderIMG} />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://website-sandy-three.vercel.app/projects"
        />
        <meta property="twitter:title" content="We Rise Together — Projects" />
        <meta
          property="twitter:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta property="twitter:image" content={HeaderIMG} />
        <meta name="twitter:image:alt" content="We Rise Together" />
      </Head>
      <Layout>
        <section className="">
          <div className="">
            <div className="flex flex-wrap w-full mb-10">
              <div className="w-full mb-6">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Our Projects
                </h1>
                <div className="h-2 w-20 bg-redBtn rounded"></div>
              </div>
              <p className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
                We Rise Together Foundation has always looked forward to helping
                people in all areas, be it sanitation and hygiene through She
                Hygiene, better lifestyle through Helping hands, or a healthy
                nature through Sunday4SecuredFuture.
                <br />
                <br />
                We are trying our level best to keep up with our work and to
                bring happiness through our initiatives but we need your support
                and kind gestures to move forward. Donate now to help those who
                need it the most!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.map((project) => (
                <Link
                  key={project.sys.id}
                  project={project}
                  href={"/projects/" + project.fields.slug}
                >
                  <a>
                    <div className="border-2 border-black hover:bg-gray-100 p-4 rounded-3xl">
                      <div className="h-48 sm:h-80 mb-5 relative">
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
                        <span className="text-xs text-gray-600 font-semibold mb-3">
                          <Moment format="YYYY/MM/DD">
                            {project.fields.date}
                          </Moment>
                        </span>
                        <h2 className="text-xl sm:text-2xl overflow-clip overflow-hidden text-gray-900 font-medium mb-4">
                          {project.fields.title}
                        </h2>
                        <div className="leading-relaxed text-sm sm:text-base pb-2">
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