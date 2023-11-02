const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  env: {
    baseApiUrl: "http://localhost:1337/api",
    baseUrl: "http://localhost:1337",
    publicKeyMailJs: "O6bgMaC197XW14trw",
    serviceMailJs: "service_uji7rjm",
    templateIdMailJs: "",
    templateIdMailJsContact: "",
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
