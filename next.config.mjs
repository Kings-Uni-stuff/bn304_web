/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8081",
				pathname: "/0/**",
			},
		],
	},
};

export default nextConfig;
