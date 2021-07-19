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
          <Link
            key={project.sys.id}
            project={project}
            href={"/projects/" + slug}
          >
            <a>
              <div className="border-2 border-black hover:bg-gray-100 p-4 rounded-3xl">
                <div className=" h-48 mb-5 relative">
                  <Image
                    src={"https:" + thumbnail.fields.file.url}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    alt={title}
                    placeholder="blur"
                  />
                </div>
                <div className="px-3">
                  <h3 className="text-sm font-semibold mb-2">
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                  </h3>
                  <h2 className="text-2xl overflow-clip overflow-hidden text-gray-900 font-medium mb-4">
                    {title}
                  </h2>
                  <div className="leading-relaxed text-base pb-2">
                    {shortDescription}
                  </div>
                </div>
              </div>
            </a>
          </Link>
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
