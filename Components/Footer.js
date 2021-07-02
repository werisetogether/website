import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto mt-24">
      <Link href="/">
        <a>
          <p className="underline text-center">Scroll to top</p>
        </a>
      </Link>
      <div className="py-8 border-t mt-4 border-gray-200 md:flex md:items-start md:justify-between">
        <div>
          <p className="text-base text-gray-400 mb-2 font-medium">
            Let's get in touch
          </p>
          <Link href="mailto:">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
          </Link>
          <Link href="">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Telephone (Name)
            </a>
          </Link>
          <Link href="">
            <a
              className="mr-4 text-gray-700 text-sm font-medium hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </Link>
        </div>

        <p className="text-sm text-gray-400 pt-6 md:pt-0">
          &copy; 2021 We Rise Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
 
export default Footer;