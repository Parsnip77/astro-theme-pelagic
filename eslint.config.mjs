import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  astro: true,
  unocss: true,
  ignores: ['src/content/**', 'local-guides/**', 'pnpm-workspace.yaml'],
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
