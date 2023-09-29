/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
  async headers() {
    return [
      {
        // Socket.io sunucusunun bulunduğu adres
        source: "http://localhost:3000", // veya başka bir adres
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // İstemci adresi
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
