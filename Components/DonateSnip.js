import Link from "next/link";

export default function DonateSnip({ donate }) {
  return (
    <div className="mt-24">
      <h1 className="font-semibold text-3xl sm:text-5xl">Donate</h1>
      <p className="text-sm sm:text-xl leading-7 sm:leading-9 mt-5 sm:mt-10">
        We Rise Together Foundation has always looked forward to helping people
        in all areas, be it sanitation and hygiene through She Hygiene, better
        lifestyle through Helping hands, or a healthy nature through
        Sunday4SecuredFuture. We are trying our level best to keep up with our
        work and to bring happiness through our initiatives but we need your
        support and kind gestures to move forward. Donate now to help those who
        need it the most!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 mt-7">
        {donate.map((link) => (
          <Link href={link.fields.link}>
            <a
              className="font-medium text-2xl sm:text-4xl text-center rounded-xl py-5 leading-relaxed bg-gray-200 hover:bg-redBtn"
              target="blank"
            >
              {link.fields.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
