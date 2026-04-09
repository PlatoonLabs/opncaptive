/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // static export — no server needed
  basePath: '',
  trailingSlash: true,   // generates index.html in each folder
  images: {
    unoptimized: true    // required for static export
  },
  allowedDevOrigins: ['192.168.2.161'],
  // for project
  env: {
    networkname: 'OPNsense Guest Wi-Fi',
  },
};

export default nextConfig;
