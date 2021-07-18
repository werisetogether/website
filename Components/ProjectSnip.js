import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const ProjectSnip = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
        <Link href="">
          <a>
            <div className="bg-gray-300 bg-cover rounded-3xl">
              <div className="h-96 pl-6 pb-3 flex flex-wrap content-end">
                <span className="mt-1 text-base sm:text-lg font-bold text-gray-600 dark:text-gray-300">
                  #SheHygiene
                </span>
              </div>
            </div>
          </a>
        </Link>

        <Link href="">
          <a>
            <div className="bg-gray-300 bg-cover rounded-3xl">
              <div className="h-96 pl-6 pb-3 flex flex-wrap content-end">
                <span className="mt-1 text-base sm:text-lg font-bold text-gray-600 dark:text-gray-300">
                  #HelpingHands
                </span>
              </div>
            </div>
          </a>
        </Link>

        <Link href="">
          <a>
            <div className="bg-gray-300 bg-cover rounded-3xl">
              <div className="h-96 pl-6 pb-3 flex flex-wrap content-end">
                <span className="mt-1 text-base sm:text-lg font-bold text-gray-600 dark:text-gray-300">
                  #Sunday4SecuredFuture
                </span>
              </div>
            </div>
          </a>
        </Link>

        <Link href="">
          <a className="sm:col-span-3">
            <button className="focus:outline-none border-2 border-black rounded-xl px-8 py-4 text-lg sm:text-xl font-semibold flex justify-center w-full h-full items-center">
              Learn more
            </button>
          </a>
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default ProjectSnip;
