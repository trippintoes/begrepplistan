/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Ställer in att bygga till statiska filer
  distDir: 'out',    // Specificerar out-mappen som utdatamapp
  // Om du ska publicera på GitHub Pages på en URL som inte är rot (t.ex. username.github.io/begrepplistan)
  basePath: '/begrepplistan',
  images: {
    unoptimized: true, // Behövs för export till statiska sidor
  }
};

module.exports = nextConfig; 