import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		react(),
	],
	build:{
		rollupOptions:{
			input:{
				main: resolve(__dirname, "index.html"),
				resume: resolve(__dirname, "resume.html"),
			}
		}
	}
});
