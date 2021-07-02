import Image from "next/image";
import helpingHand from "../public/helpingHand.png";
import indiaMap from "../public/indiaMap.png";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24">
      <h1 className="font-semibold text-3xl sm:text-5xl">About us</h1>
      <div className="h-80 my-7 sm:my-12 relative">
        <Image
          src={helpingHand}
          className="rounded-3xl"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h2 className="font-medium text-3xl sm:text-5xl">
        10 states across India
      </h2>
      <h2 className="font-medium text-3xl mt-3 sm:mt-6 sm:text-5xl">
        2 ongoing projects
      </h2>
      <p className="text-base sm:text-xl leading-7 sm:leading-9 font-normal mt-7 sm:mt-12">
        Hey, this is Shreya and I’m the founder WeRiseTogether. We are a
        non-profit organisation based in India working towards menstrual hygiene
        and provision of resources to underprivileged children under our
        #SheHygiene and #HelpingHands initiatives.
        <br />
        <br />
        Even during the Covid-19 pandemic, our team has been constantly working
        to provide education and resources like COMPOSTABLE sanitary pads to
        those who need it the most.
      </p>
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
 
export default About;