/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // With this we avoid the error that appears when we reload the app on a subrout. Like this:
  // https://savercommunity-test.web.app/dapp/ (Refresh)
}

module.exports = nextConfig
