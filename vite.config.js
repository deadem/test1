import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [
    eslint(),
    stylelint({
      cacheLocation: resolve(__dirname, '.cache', 'stylelint-cache'),
    })
  ],
});
