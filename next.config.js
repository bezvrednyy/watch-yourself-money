/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
	  domains: ['tailwindui.com'],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/main-space',
				permanent: true,
			},
		]
	},
}