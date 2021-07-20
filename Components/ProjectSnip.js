import Image from "next/image";
import Link from "next/link";
import Moment from "react-moment";
import "tailwindcss/tailwind.css";

export default function Projects({ project }) {
  const { title, slug, date, shortDescription, thumbnail } = project.fields;
  return (
    <div className="">
      <Link key={project.sys.id} project={project} href={"/projects/" + slug}>
        <a>
          <div className="border-2 border-black hover:bg-gray-100 p-4 rounded-3xl">
            <div className="h-48 sm:h-80 mb-5 relative">
              <Image
                src={"https:" + thumbnail.fields.file.url}
                className="rounded-2xl"
                layout="fill"
                objectFit="cover"
                alt={title}
              />
            </div>
            <div className="px-3">
              <span className="text-xs text-gray-600 font-semibold mb-3">
                <Moment format="YYYY/MM/DD">{date}</Moment>
              </span>
              <h2 className="text-2xl overflow-clip overflow-hidden text-gray-900 font-medium mb-4">
                {title}
              </h2>
              <div className="leading-relaxed text-sm sm:text-base pb-2">
                {shortDescription}
              </div>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .bg-image {
          background-image: url(${"https:" + thumbnail.fields.file.url});
          background-position: center;
        }
      `}</style>
    </div>
  );
}
