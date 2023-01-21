import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "src/**/*.{js,ts}"',
      },
      stylelint: {
        lintCommand: 'stylelint src/**/*.{css,scss}',
      },
    })
  ],
});
