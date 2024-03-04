/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    target: 'experimental-serverless-trace',
    basePath: '/test-frontend-beta',
    images:{
        domains: ['cdn.dummyjson.com'],
    }
};

export default nextConfig;
