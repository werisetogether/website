import Link from "next/link";
import moment from "moment";

const Footer = () => {
  return (
    <footer className="mt-24">
      <a href="#">
        <p className="underline text-center">Scroll to top</p>
      </a>
      <div className="bg-yellow-100 border-2 border-black mt-4 rounded-xl flex flex-col justify-between  p-4">
        <div className="">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Join Membership
          </h1>
          <p className="text-sm sm:text-xl leading-7 sm:leading-9 font-normal mb-6">
            We are a big family of passionate volunteers with a common goal in
            mind. Join our membership to get the get the latets news and to show
            your support!
          </p>
        </div>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeTeX2zhmKt6GNRetwODA-6rQ5xWQNAoIW3t-BMh7Ih38huqA/viewform">
          <a>
            <button className="focus:outline-none mr-2 bg-white rounded-xl px-8 py-4 text-lg sm:text-xl font-semibold flex justify-center w-full h-full items-center hover:bg-gray-100 border-2 border-black">
              Join now
            </button>
          </a>
        </Link>
      </div>
      <div className="py-8 border-t mt-4 border-gray-200 md:flex md:items-start md:justify-between">
        <div>
          <p className="text-base text-gray-600 mb-2 font-medium">
            💪 We Rise Together
          </p>
          <Link href="mailto:werisetogetherfoundation@gmail.com">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
          </Link>
          <Link href="/projects">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              rel="noreferrer"
            >
              Projects
            </a>
          </Link>
          <Link href="/donate">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              rel="noreferrer"
            >
              Donate
            </a>
          </Link>
        </div>

        <p className="text-sm text-gray-600 pt-6 md:pt-0">
          &copy; {moment().year()} We Rise Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
