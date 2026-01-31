const nextConfig = {
  experimental: {
    serverExternalPackages: ['@prisma/client', 'pg'],
    turbo: {
      resolveAlias: {
        // This helps Turbopack find the generated client files 
        // that your Better-Auth and Prisma lib are looking for.
        '@prisma/client': '@prisma/client',
      },
    },
  },
};