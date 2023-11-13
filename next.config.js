/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false
const hasCustomDomain = process.env.GITHUB_CUSTOM_DOMAIN || false

let assetPrefix = ''
let basePath = '/'

if (isGithubActions && !hasCustomDomain) {
	const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

	assetPrefix = `/${repo}/`
	basePath = `/${repo}`
}

module.exports = {
	assetPrefix: assetPrefix,
	basePath,
	reactStrictMode: false,
}
