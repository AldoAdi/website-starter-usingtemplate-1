import type { NextConfig } from 'next'
import { defineNextConfig } from '@aldoadi/website-template/config'

const deployTarget = process.env.DEPLOY_TARGET === 'github-pages' ? 'github-pages' : 'vercel'

const nextConfig: NextConfig = {
  ...defineNextConfig({ target: deployTarget, repoName: 'Website-template-starter' }),
  // Library ships raw TS, no dist/ -- Next compiles it directly.
  transpilePackages: ['@aldoadi/website-template'],
}

export default nextConfig
