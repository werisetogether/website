import Link from "next/link";
import moment from "moment";

const Footer = () => {
	const menuItems = [
		{ label: "Campaigns", link: "/campaigns" },
		{ label: "Gallery", link: "/gallery" },
		{ label: "Donate", link: "/donate" },
		{ label: "Newsletter", link: "/newsletter" },
		{ label: "Team", link: "/team" },
		{ label: "Contact", link: "/contact" },
	];

	return (
		<footer className="flex-1 text-white bg-gray-800">
			<div className="max-w-5xl px-6 py-5 mx-auto">
				<p className="text-xl font-semibold">We Rise Together</p>
				<div className="grid grid-cols-1 gap-6 my-4 md:grid-cols-2">
					<div>
						<div className="flex flex-row gap-2">
							<Link href={`https://twitter.com/_WeRiseTogether`}>
								<svg className="w-8 cursor-pointer aspect-square hover:text-gray-300" viewBox="0 0 20 20">
									<path
										fill="currentColor"
										d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zm3.905 7.864c.004.082.005.164.005.244c0 2.5-1.901 5.381-5.379 5.381a5.335 5.335 0 0 1-2.898-.85c.147.018.298.025.451.025c.886 0 1.701-.301 2.348-.809a1.895 1.895 0 0 1-1.766-1.312a1.9 1.9 0 0 0 .853-.033a1.892 1.892 0 0 1-1.517-1.854v-.023c.255.141.547.227.857.237a1.89 1.89 0 0 1-.585-2.526a5.376 5.376 0 0 0 3.897 1.977a1.891 1.891 0 0 1 3.222-1.725a3.797 3.797 0 0 0 1.2-.459a1.9 1.9 0 0 1-.831 1.047a3.799 3.799 0 0 0 1.086-.299a3.834 3.834 0 0 1-.943.979z"></path>
								</svg>
							</Link>
							<Link href={`https://www.linkedin.com/company/we-rise-together-foundation/`}>
								<svg className="w-8 cursor-pointer aspect-square hover:text-gray-300" viewBox="0 0 20 20">
									<path
										fill="currentColor"
										d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699v3.699z"></path>
								</svg>
							</Link>
							<Link href={``}>
								<svg className="w-8 cursor-pointer aspect-square hover:text-gray-300" viewBox="0 0 20 20">
									<path
										fill="currentColor"
										d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zm2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443v1.581z"></path>
								</svg>
							</Link>
						</div>
					</div>
					<div>
						<p className="text-xl">Quicklinks</p>
						<div className="grid grid-cols-2 gap-2 mt-4">
							{Object.entries(menuItems).map(([index, item]) => (
								<Link key={index} href={item.link} className="hover:underline hover:underline-offset-2">
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</div>
				<p className="pt-6 text-sm md:pt-0">
					&copy; {moment().year()} We Rise Together. All rights reserved. |{" "}
					<Link href="/policy" className="font-bold underline ">
						View Policies
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
