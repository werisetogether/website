import Image from "next/image";
import Link from "next/link";
import HeaderIMG from "../public/header.jpg";
import HandIMG from "../public/hand.png";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header>
      <div className="relative h-80">
        <Image
          src={HeaderIMG}
          className="rounded-3xl"
          alt="Header image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-7 sm:mt-12 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-5xl font-bold">We Rise Together</h1>
          <p className="text-lg sm:text-2xl font-medium mt-5 sm:mt-10 leading-10 tracking-normal">
            <RoughNotationGroup show={true}>
              We work towards{" "}
              <RoughNotation
                type="highlight"
                color="#e9d6ff"
                order={1}
                iterations={1}
                animationDuration={600}
                multiline={true}
              >
                menstrual hygiene
              </RoughNotation>{" "}
              and{" "}
              <RoughNotation
                type="highlight"
                color="#fee58d"
                order={2}
                iterations={1}
                animationDuration={500}
                multiline={true}
              >
                provision of resources
              </RoughNotation>{" "}
              to{" "}
              <RoughNotation
                type="underline"
                color="#ffcac9"
                order={3}
                strokeWidth={3}
                iterations={1}
                animationDuration={600}
                multiline={true}
              >
                underprivileged children.
              </RoughNotation>
            </RoughNotationGroup>
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-10 w-10/12">
          <Link href="">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              className="col-span-4 sm:col-span-2"
            >
              <button className="focus:outline-none mr-2 bg-redBtn rounded-xl px-8 py-4 text-lg sm:text-xl font-semibold flex justify-center w-full h-full items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart mr-4"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Donate now
              </button>
            </motion.a>
          </Link>
        </div>

        <motion.div
          drag="y"
          dragDirectionLock
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          dragElastic={0.5}
          className="py-14 sm:py-24"
        >
          <div className="">
            <h1 className="text-8xl text-center">+</h1>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
