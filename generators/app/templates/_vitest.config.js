/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['vitest.setup.js'],
		deps: {
			inline: [/^(?!.*vitest).*$/]
		},
		coverage: {
			reporter: ['text', 'json', 'html'],
			cleanOnRerun: true,
			reportsDirectory: 'coverage'
		}
	}
});
