import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import emailjs from "@emailjs/browser";
import homepageHeader from "../public/homepageHeader.png";
import homepageFooter from "../public/homepageFooter.jpg";
import { toast, ToastContainer } from "react-toastify";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const renderOptions = {
	renderText: (text) => {
		return text.split("\n").reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	},
};

export async function getStaticProps() {
	const client = createClient({
		space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
		accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
	});

	const homepage = await client.getEntries({ content_type: "homepage" });

	return {
		props: {
			homepage: homepage.items[0].fields,
			revalidate: 10,
		},
	};
}

export default function Home({ homepage }) {
	const stats = [
		{ stat: "2000+", label: "Trees Planted" },
		{ stat: "1000+", label: "Children Benefited" },
		{ stat: "4000+", label: "Pads Distributed" },
	];

	const sendEmail = async (event) => {
		try {
			event.preventDefault();

			await emailjs.sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
				event.target,
				process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
			);

			toast("Message sent!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Head>
				{/* Genral Tags */}
				<title>We Rise Together Foundation — Inspire, Aid and Empower</title>
				<meta name="title" content="We Rise Together Foundation — Inspire, Aid and Empower" />
				<meta
					name="description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta
					name="keywords"
					content="werisetogether, werisetogether foundation, we rise together foundation, we rise together, non profit organisation, menstrual hygiene, ngo india, shreya tuli, aarava seth, sunday4securedfuture, s4sf, shehygiene, she hygiene, helping hands"
				/>
				<meta name="robots" content="index, follow" />
				<meta name="language" content="English" />
				<meta name="revisit-after" content="1 days" />
				<meta name="author" content="We Rise Together Foundation" />
				<meta name="google-site-verification" content="BjWqAaLp8AyqUryXb0wkuIFCIfWdc4bobIjUDgeYd0I" />
				<meta name="msvalidate.01" content="E5F9D56E6DAF681D98D6E0B41D10462E" />

				{/* Open Graph */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.werisetogetherfoundation.org/" />
				<meta property="og:title" content="We Rise Together Foundation — Inspire, Aid and Empower" />
				<meta
					property="og:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="og:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta property="og:locale" content="en_GB" />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://www.werisetogetherfoundation.org/" />
				<meta property="twitter:title" content="We Rise Together Foundation — Inspire, Aid and Empower" />
				<meta
					property="twitter:description"
					content="We Rise Together scales evidence-based programs towards pressing environmental and social issues."
				/>
				<meta property="twitter:image" content="https://i.imgur.com/p68Dwwz.png" />
				<meta name="twitter:image:alt" content="We Rise Together Foundation" />
			</Head>
			<ToastContainer />
			<Navbar />
			<Layout>
				<section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 py-10">
					<div className="order-last md:order-first flex flex-col justify-center">
						<h1 className="text-4xl font-bold">We Rise Together</h1>
						<p className="py-6 leading-7">We scale evidence-based programs towards pressing environment and social issues</p>
						<Link href="/donate">
							<a className="btn rounded-full w-fit border-transparent bg-gradient-to-b from-[#f96274] to-[#f1896e]">Donate Now</a>
						</Link>
					</div>
					<div className="relative w-full aspect-square">
						<Image src={homepageHeader} layout="fill" objectFit="cover" alt="Thumbnail" />
					</div>
				</section>

				<div className="flex flex-col gap-20">
					{/* Vision  */}
					<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-red-primary p-4 text-white">
							<h1 className="text-2xl font-medium pb-2">What We Do</h1>
							<div className="text-sm leading-6">{documentToReactComponents(homepage.whatWeDo, renderOptions)}</div>
						</div>
						<div className="p-4 text-black rounded-xl">
							<h1 className="text-2xl font-semibold pb-2">Our Mission</h1>
							<div className="text-sm leading-6">{documentToReactComponents(homepage.ourMission, renderOptions)}</div>
						</div>
					</section>

					{/* Contact  */}
					<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 text-black">
							<h1 className="text-2xl font-semibold pb-2">Get Involved</h1>
							<div className="text-sm leading-6">{documentToReactComponents(homepage.getInvolved, renderOptions)}</div>
						</div>
						<div className="bg-[#5f4f50] p-4">
							<form className="form-control gap-2" onSubmit={sendEmail}>
								<div>
									<label className="label">
										<span className="label-text text-white">Full Name</span>
									</label>
									<input type="text" placeholder="John Doe" className="input input-bordered w-full max-w-xs" required />
								</div>
								<div>
									<label className="label">
										<span className="label-text text-white">Email</span>
									</label>
									<input
										type="email"
										placeholder="johndoe@example.com"
										className="input input-bordered w-full max-w-xs"
										required
									/>
								</div>
								<div>
									<label className="label">
										<span className="label-text text-white">Message</span>
									</label>
									<textarea className="textarea textarea-bordered h-24 w-full" placeholder="Type here" required />
								</div>
								<button type="submit" className="btn w-fit bg-gray-400">
									Send message
								</button>
							</form>
						</div>
					</section>
					{/* Campaigns  */}
					<section>
						<h1 className="text-2xl font-semibold pb-2">Our Campaigns</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{Object.entries(homepage.campaigns).map(([index, item]) => (
								<div key={index} className="relative mt-[6rem]">
									<div className="rounded-full w-[10rem] aspect-square z-10 absolute -top-20 m-auto left-0 right-0 border border-gray-700 bg-white">
										<Image
											src={`https:${item.fields.logo.fields.file.url}`}
											layout="fill"
											objectFit="cover"
											className="rounded-full"
											alt="thumbnail"
										/>
									</div>
									<div className="rounded-xl bg-gradient-to-br from-[#f96274] to-[#f1896e] text-white text-center pt-24 px-2 pb-10 shadow-md h-full">
										<h2 className="capitalize pb-2 font-semibold">{item.fields.title}</h2>
										<p className="text-sm leading-6">{item.fields.shortDescription}</p>
									</div>
									<Link project={item} href={"/campaigns/" + item.fields.slug}>
										<a
											type="button"
											className="rounded-full btn btn-sm w-fit bg-[#853325] border-transparent z-10 absolute -bottom-4 m-auto left-0 right-0">
											Learn more
										</a>
									</Link>
								</div>
							))}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
							{Object.entries(stats).map(([index, item]) => (
								<div key={index} className="bg-gray-200 text-center p-4 rounded-xl">
									<h2 className="text-2xl mb-1 font-semibold text-red-primary">{item.stat}</h2>
									<p className="text-sm">{item.label}</p>
								</div>
							))}
						</div>
					</section>

					{/* Founders  */}
					<section>
						<div className="text-black">
							<h1 className="text-2xl pb-4">Founders</h1>
						</div>
						<div className="flex flex-col gap-4 md:gap-20">
							{Object.entries(homepage.founders).map(([index, item]) => (
								<div key={index} className="relative">
									<div className="bg-white shadow-md p-6 w-full md:w-2/3">
										<div className="avatar md:hidden">
											<div className="w-24 aspect-square relative rounded-full overflow-clip border">
												<Image
													src={`https:${item.fields.profilePicture.fields.file.url}`}
													layout="fill"
													objectFit="cover"
													alt="thumbnail"
												/>
											</div>
										</div>
										<h2 className="text-red-primary text-2xl font-semibold">{item.fields.role}</h2>
										<h3 className="text-red-primary pb-4">{item.fields.name}</h3>
										<div className="text-sm leading-6">{documentToReactComponents(item.fields.description, renderOptions)}</div>
									</div>
									<div className="hidden md:flex absolute -bottom-10 right-0 bg-gray-200 w-2/3 h-[12rem] -z-10">
										<div className="aspect-square h-full relative ml-auto">
											<Image
												src={`https:${item.fields.profilePicture.fields.file.url}`}
												layout="fill"
												objectFit="cover"
												alt="thumbnail"
											/>
										</div>
									</div>
								</div>
							))}

							<Link href="/team">
								<a className="btn mx-auto px-10 rounded-full w-fit border-transparent bg-gradient-to-b from-[#f96274] to-[#f1896e]">
									View Team
								</a>
							</Link>
						</div>
					</section>
				</div>
			</Layout>
			{/* How can you help  */}
			<section className="h-fit relative bg-slate-100 text-white mt-8">
				<Image
					src={homepageFooter}
					alt="Thumbnail"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className="z-0"
					priority
				/>
				<div className="z-10 backdrop-brightness-75 w-full h-full flex flex-col justify-center items-center p-10">
					<h1 className="text-3xl md:text-5xl font-medium text-center p-4">How can you help</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
						<div className="relative bg-white mt-10 p-6">
							<div className="rounded-full w-[4rem] aspect-square z-10 absolute -top-[2rem] m-auto left-0 right-0 border border-gray-700 bg-red-primary flex items-center justify-center">
								<svg className="w-8 h-8" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M10.5 14h-.73l5.1 5.31c.61.64.16 1.69-.72 1.69c-.27 0-.53-.11-.72-.31L7.4 14.41c-.26-.26-.4-.62-.4-.98c0-.79.64-1.43 1.43-1.43h2.07c1.76 0 3.22-1.3 3.46-3H7c-.55 0-1-.45-1-1s.45-1 1-1h6.66c-.56-1.18-1.76-2-3.16-2H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1h-2.26c.48.58.84 1.26 1.05 2H17c.55 0 1 .45 1 1s-.45 1-1 1h-1.02c-.26 2.8-2.62 5-5.48 5z"></path>
								</svg>
							</div>
							<div className="pt-5 text-black text-center">
								<h1 className="text-2xl font-semibold mb-6">Give a donation</h1>
								<p>
									We are trying our level best to keep up with our work and to bring happiness through our initiatives but we need
									your support and kind gestures to move forward.
								</p>
								<Link href="/donate">
									<a className="btn btn-outline rounded-full w-fit mt-6 border-black text-black">Donate now</a>
								</Link>
							</div>
						</div>

						<div className="relative bg-white mt-10 p-6">
							<div className="rounded-full w-[4rem] aspect-square z-10 absolute -top-[2rem] m-auto left-0 right-0 border border-gray-700 bg-red-primary flex items-center justify-center">
								<svg className="w-8 h-8" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"></path>
								</svg>
							</div>
							<div className="pt-5 text-black text-center">
								<h1 className="text-2xl font-semibold mb-6">Become a Volunteer</h1>
								<p>
									We are a big family of passionate volunteers with a common goal in mind. Join our membership to get the get the
									latets news and to show your support!
								</p>
								<Link href="https://docs.google.com/forms/d/e/1FAIpQLSeTeX2zhmKt6GNRetwODA-6rQ5xWQNAoIW3t-BMh7Ih38huqA/viewform">
									<a className="btn btn-outline rounded-full w-fit mt-6 border-black text-black">Become a Volunteer</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
