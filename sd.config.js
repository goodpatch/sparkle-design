import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

const sdConfig = makeSdTailwindConfig({
  type: 'color',
  source: ['style-dictionary/tokens/**/*.json'],
  buildPath: 'style-dictionary/build/',
  tailwind: {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ]
  }
});

const sd = await (new StyleDictionary({
  source: ['style-dictionary/tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: transformGroups.css,
      buildPath: 'style-dictionary/build/',
      files: [
        {
          destination: '_variables.css',
          format: formats.cssVariables,
        },
      ],
    },
    // ...
  },
})).extend(sdConfig);

await sd.buildAllPlatforms();
