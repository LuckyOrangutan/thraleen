import kradonianLanguage from '../../kradonianLanguageSystem';

export const validateTranslation = (translation) => {
  if (!translation) return false;

  // Check for valid characters
  const validChars = new Set([
    ...kradonianLanguage.phonology.vowels,
    ...kradonianLanguage.phonology.consonants,
    ' ',
    '[',
    ']'
  ]);

  const chars = Array.from(translation);
  const hasInvalidChars = chars.some(char => {
    if (char === ' ' || char === '[' || char === ']') return false;
    if (char.match(/[a-zA-Z]/)) return false;  // Allow English characters in brackets
    return !validChars.has(char);
  });
  if (hasInvalidChars) return false;

  // Check syllable structure
  const words = translation.split(' ');
  return words.every(word => {
    if (word.startsWith('[') && word.endsWith(']')) return true;
    return validateSyllableStructure(word);
  });
};

const validateSyllableStructure = (word) => {
  const { syllableStructure } = kradonianLanguage.phonology;
  const syllables = splitIntoSyllables(word);
  
  return syllables.every(syllable => {
    return syllableStructure.some(pattern => {
      const regex = createSyllableRegex(pattern);
      return regex.test(syllable);
    });
  });
};

const splitIntoSyllables = (word) => {
  // Basic syllable splitting logic
  const vowels = new Set(kradonianLanguage.phonology.vowels);
  const syllables = [];
  let currentSyllable = '';
  
  for (const char of word) {
    currentSyllable += char;
    if (vowels.has(char)) {
      syllables.push(currentSyllable);
      currentSyllable = '';
    }
  }
  
  if (currentSyllable) {
    syllables[syllables.length - 1] += currentSyllable;
  }
  
  return syllables;
};

const createSyllableRegex = (pattern) => {
  const consonants = kradonianLanguage.phonology.consonants.join('');
  const vowels = kradonianLanguage.phonology.vowels.join('');
  
  return new RegExp(
    '^' + 
    pattern
      .replace('C', `[${consonants}]`)
      .replace('V', `[${vowels}]`) + 
    '$'
  );
};