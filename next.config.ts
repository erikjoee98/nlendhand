const nextConfig = {
  experimental: {
    serverExternalPackages: ['pg'],
    turbo: {
      resolveAlias: {
        // This helps Turbopack find the generated client files 
        // that your Better-Auth and Prisma lib are looking for.
        '../generated/prisma/client': '/generated/prisma/client',
      },
    },
  },
};
