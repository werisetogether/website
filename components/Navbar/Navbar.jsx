import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";

const Navbar = () => {
	const menuItems = [
		{ label: "Campaigns", link: "/campaigns" },
		{ label: "Donate", link: "/donate" },
		{ label: "Newsletter", link: "/newsletter" },
		{ label: "Team", link: "/team" },
		{ label: "Contact", link: "/contact" },
	];
	return (
		<div className="max-w-3xl px-4 mx-auto navbar bg-base-100">
			<div className="flex-1">
				<Link href="/" className="relative w-16 md:w-20 aspect-square">
					<Image src={Logo} fill style={{ objectFit: "contain" }} alt="WRT" priority quality={70} />
				</Link>
			</div>
			<nav className="hidden md:flex md:flex-none">
				<ul className="p-0 menu menu-horizontal ">
					{Object.entries(menuItems).map(([index, item]) => (
						<li key={index} className="">
							<Link href={item.link}>{item.label}</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="flex-none md:hidden">
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</label>
					<ul tabIndex="0" className="p-2 mt-3 shadow menu dropdown-content bg-base-100 rounded-box w-52">
						{Object.entries(menuItems).map(([index, item]) => (
							<li key={index}>
								<Link href={item.link}>{item.label}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
