import Layout from "../Components/Layout";
import Link from "next/link";
import Image from "next/image";
import HeaderIMG from "../public/header.png";
import Head from "next/head";
import { createClient } from "contentful";
import emailjs from "emailjs-com";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const social = await client.getEntries({ content_type: "socialLink" });

  return {
    props: {
      social: social.items,
      revalidate: 10,
    },
  };
}

export default function Contact({social}) {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_h9i9os2",
        "template_9srk6kn",
        e.target,
        "user_9nWLqvNaOVIEZ5fm1y8D6"
      )
      .then(alert("Message sent! We'll get back to you as soon as possibe."));
  }

  return (
    <div>
      <Head>
        {/* Genral Tags */}
        <title>We Rise Together — Contact</title>
        <meta name="title" content="We Rise Together — Contact" />
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
          content="https://website-sandy-three.vercel.app/contact"
        />
        <meta property="og:title" content="We Rise Together — Contact" />
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
          content="https://website-sandy-three.vercel.app/contact"
        />
        <meta property="twitter:title" content="We Rise Together — Contact" />
        <meta
          property="twitter:description"
          content="A non-profit organisation in India working towards the welfare of society and its surroundings"
        />
        <meta property="twitter:image" content={HeaderIMG} />
        <meta name="twitter:image:alt" content="We Rise Together" />
      </Head>
      <Layout>
        <section className="">
          <div className="mb-10">
            <div className="w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact Us
              </h1>
              <div className="h-2 w-20 bg-redBtn rounded"></div>
            </div>
            <p className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal">
              Have a question you want to ask? Feel free to send us a message.
              We'll get back to you as soon as possible.
            </p>
          </div>
          <div className="mt-6 ">
            <form
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={sendEmail}
            >
              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Name
                </label>

                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  required
                />
              </div>

              <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  E-mail
                </label>

                <input
                  className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  required
                />
              </div>

              <div className="w-full mt-4 sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Message
                </label>

                <textarea
                  className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Type in your message..."
                  name="message"
                  required
                />
              </div>
              <input
                className="border-2 border-black bg-white hover:bg-gray-100 p-2 sm:p-4 rounded-3xl"
                type="submit"
                value="Send Message"
              />
            </form>
          </div>
        </section>
        <section className="mt-24">
          <h1 className="font-semibold text-3xl sm:text-5xl">Get in touch</h1>
          <p className="text-sm sm:text-xl leading-7 sm:leading-9 mt-5 sm:mt-10">
            Follow us on our offical platforms to get the latest updates.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-10">
            {social.map((social) => (
              <Link key={social.sys.id} href={social.fields.link}>
                <a className="text-center rounded-3xl py-5 leading-relaxed bg-gray-200 hover:bg-redBtn" target="blank">
                  <h3 className="text-lg font-medium">{social.fields.title}</h3>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}
