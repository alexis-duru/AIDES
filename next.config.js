const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  env: {
    emailJsKey: "n9BwADLkQs_0Aw1Ly",
  },
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      // "cheekyfamily-strapi-api.herokuapp.com",
      // "cheekyfamily.fr",
    ],
  },
};

module.exports = nextConfig;
