import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// eslint-disable-next-line no-undef
const dirname = __dirname;

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: `eslint --cache --cache-location=${dirname}/.cache/ "src/**/*.{js,ts}"`,
      },
      stylelint: {
        lintCommand: `stylelint --cache --cache-location=${dirname}/.cache/stylelint-cache src/**/*.{css,scss}`,
      },
    })
  ],
});
