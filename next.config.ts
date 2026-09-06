import type { NextConfig } from 'next'

// T2 walking skeleton: plain Next config, just proves transpilePackages works
// with raw-TS distribution. Replaced by @aldoadi/website-template/config's
// defineNextConfig() in T3.
const nextConfig: NextConfig = {
  transpilePackages: ['@aldoadi/website-template'],
}

export default nextConfig
