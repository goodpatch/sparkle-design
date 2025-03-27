import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const sd = new StyleDictionary({
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
});

await sd.buildAllPlatforms();
