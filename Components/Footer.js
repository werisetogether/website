import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24">
      <a href="#">
        <p className="underline text-center">Scroll to top</p>
      </a>
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
          &copy; 2021 We Rise Together. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
 
export default Footer;