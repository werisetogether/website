import React from "react";

const Layout = ({ children }) => {
	return (
		<div className="max-w-3xl mx-auto px-4 relative min-w-0 pb-20">
			{children}
		</div>
	);
};

export default Layout;
