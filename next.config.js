/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Exportera statiska filer
  images: {
    unoptimized: true, // Krävs för statisk export
  },
  trailingSlash: true, // Lägger till en slash i slutet av URL:er för bättre relativa länkar
};

module.exports = nextConfig; 