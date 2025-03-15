import type { Config } from 'tailwindcss'
import path from 'path'

const config: Config = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  presets: [require('../../libs/ui/tailwind.config')],
  content: [
    path.join(__dirname, './src/**/*.{ts,tsx}'),
    path.join(__dirname, '../../libs/ui/src/**/*.{ts,tsx}'),
  ],
}

export default config
