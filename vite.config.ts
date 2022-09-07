import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import * as path from 'path'

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons')
    }
  }
}

export default config
