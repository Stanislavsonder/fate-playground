import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	base:  process.env.NODE_ENV === 'production' ? '/fate-playground/' : '/',
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	vue: {
		publicPath: process.env.NODE_ENV === 'production' ? 'https://stanislavsonder.github.io/fate-playground' : '/',
		script: {
			defineModel: true,
			propsDestructure: true
		}
	}
})
