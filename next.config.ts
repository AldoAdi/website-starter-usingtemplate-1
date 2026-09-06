import type { NextConfig } from 'next'
import { defineNextConfig } from '@aldoadi/website-template/config'

const deployTarget = process.env.DEPLOY_TARGET === 'github-pages' ? 'github-pages' : 'vercel'

const nextConfig: NextConfig = {
  // repoName must match the GitHub repo exactly -- it becomes the Pages
  // basePath. Omit it entirely when serving from a custom domain.
  ...defineNextConfig({ target: deployTarget, repoName: 'website-starter-usingtemplate-1' }),
  // Library ships raw TS, no dist/ -- Next compiles it directly.
  transpilePackages: ['@aldoadi/website-template'],
}

export default nextConfig
