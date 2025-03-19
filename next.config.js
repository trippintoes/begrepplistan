/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Exportera statiska filer
  trailingSlash: true, // Använd trailingSlash för bättre relativa länkar
  images: {
    unoptimized: true, // Krävs för statisk export
  },
  // Ta bort basePath och distDir för enklare konfiguration
};

module.exports = nextConfig; 