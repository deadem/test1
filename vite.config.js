import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: `eslint --cache --cache-location=${__dirname}/.cache/ "src/**/*.{js,ts}"`,
      },
      stylelint: {
        lintCommand: `stylelint --cache --cache-location=${__dirname}/.cache/stylelint-cache src/**/*.{css,scss}`,
      },
    })
  ],
});
