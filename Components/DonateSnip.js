import Link from "next/link";

const DonateSnip = () => {
  return (
    <div className="mt-24">
      <h1 className="font-semibold text-2xl sm:text-5xl">Donate</h1>
      <p className="text-sm sm:text-xl leading-7 sm:leading-9 mt-5 sm:mt-12">
        Hey, this is Shreya and I’m the founder WeRiseTogether. We are a
        non-profit organisation based in India working towards menstrual hygiene
        and provision of resources to underprivileged children under our
        #SheHygiene and #HelpingHands initiatives.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-2 mt-7 sm:mt-12">
        <Link href="https://test.cashfree.com/billpay/product/1950">
          <a
            className="font-medium text-2xl sm:text-4xl text-center rounded-3xl py-5 leading-relaxed bg-gray-200"
            target="blank"
          >
            Rs 100
          </a>
        </Link>
        <Link href="https://test.cashfree.com/billpay/product/1950">
          <a
            className="font-medium text-2xl sm:text-4xl text-center rounded-3xl py-5 leading-relaxed bg-gray-200"
            target="blank"
          >
            Rs 500
          </a>
        </Link>
        <Link href="https://test.cashfree.com/billpay/product/1950">
          <a
            className="font-medium text-2xl sm:text-4xl text-center rounded-3xl py-5 leading-relaxed bg-gray-200"
            target="blank"
          >
            Rs 1000
          </a>
        </Link>
        <Link href="https://test.cashfree.com/billpay/product/1950">
          <a
            className="sm:col-span-3 font-medium text-2xl sm:text-4xl text-center rounded-3xl py-5 leading-relaxed bg-redBtn"
            target="blank"
          >
            Custom
          </a>
        </Link>
      </div>
    </div>
  );
}
 
export default DonateSnip;