import Image from "next/image";
import indiaMap from "../public/indiaMap.png";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const renderOptions = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default function About({ about }) {
  const { title, description, thumbnail } = about.fields;

  return (
    <div className="mt-24">
      <h1 className="font-semibold text-3xl sm:text-5xl">About us</h1>
      <div className="h-80 my-7 sm:my-12 relative">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          className="rounded-3xl"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="font-medium text-3xl sm:text-5xl">
        {documentToReactComponents(title, renderOptions)}
      </div>
      <div className="text-base sm:text-xl leading-7 sm:leading-9 font-normal mt-7 sm:mt-12">
        {documentToReactComponents(description, renderOptions)}
      </div>
      <div className="h-80 my-12 relative">
        <Image
          src={indiaMap}
          className="rounded-3xl"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}