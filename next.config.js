/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
    return { 
      beforeFiles: [
        {
          source: '/api/:endpoint*',
          destination: `${process.env.API_URL}/:endpoint*`, // The :path parameter isn't used here so will be automatically passed in the query
        },
      ]
    }
  },
}
