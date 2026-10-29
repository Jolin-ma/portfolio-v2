/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // build to plain files in /out
  images: { unoptimized: true },
  trailingSlash: true,       // folder/index.html for static hosts
};
export default nextConfig;
