/// <reference types="vitest" />
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
	const env = { ...loadEnv(mode, process.cwd(), 'PLUME_') };
	return defineConfig({
		base: '',
    define: {
      'process.env': env
    },
		build: {
			outDir: 'dist',
			sourcemap: false,
			rollupOptions: {
				plugins: [
					visualizer({
						title: 'Plumejs example repo',
						open: true
					})
				]
			}
		},
		server: {
			host: true,
			port: 3001,
			open: '/'
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['vitest.setup.js'],
			deps: {
				inline: [/^(?!.*vitest).*$/]
			},
			coverage: {
				include: ['src/**'],
				provider: 'istanbul',
				reporter: ['text', 'json', 'html'],
				cleanOnRerun: true,
				reportsDirectory: 'coverage'
			}
		}
	});
};
