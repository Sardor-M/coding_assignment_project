import type { StorybookConfig } from '@storybook/nextjs-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite'),
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (config) => {
    // Ensure workspace packages are resolved correctly
    const { mergeConfig } = await import('vite');
    const path = await import('path');

    const uiSrcPath = path.resolve(__dirname, '../../../packages/ui/src');
    const uiIndexPath = path.resolve(__dirname, '../../../packages/ui/src/index.tsx');

    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '@repo/ui',
            replacement: uiIndexPath,
          },
          {
            find: /^@repo\/ui\/(.+)$/,
            replacement: `${uiSrcPath}/$1`,
          },
        ],
      },
      optimizeDeps: {
        exclude: ['@repo/ui'],
      },
    });
  },
};

export default config;