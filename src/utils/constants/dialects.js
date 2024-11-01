import kradonianLanguage from '../../kradonianLanguageSystem';

export const genericDialect = kradonianLanguage.lexicon;

export const dialects = {
  generic: genericDialect,
  AdamantiumLegion: {
    ...genericDialect,
    // Add specific AdamantiumLegion terms
  },
  Deepwalkers: {
    ...genericDialect,
    // Add specific Deepwalkers terms
  },
  Thunderkin: {
    ...genericDialect,
    // Add specific Thunderkin terms
  },
  Frostborn: {
    ...genericDialect,
    // Add specific Frostborn terms
  },
  Skyforgers: {
    ...genericDialect,
    // Add specific Skyforgers terms
  }
};
