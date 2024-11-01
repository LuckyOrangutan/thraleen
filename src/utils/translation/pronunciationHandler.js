export const findPronunciationInLexicons = (word) => {
  const lexicons = [
    require('../../lexicons/thraleen-lexicon.json'),
    require('../../lexicons/deepwalkers-lexicon.json'),
    require('../../lexicons/thunderkin-lexicon.json'),
    require('../../lexicons/skyforgers-lexicon.json'),
    require('../../lexicons/frostborn-lexicon.json'),
    require('../../lexicons/adamantium-legion-lexicon.json')
  ];

  // Remove any brackets from the word
  word = word.replace(/[[\]]/g, '');

  for (const lexicon of lexicons) {
    // Search through each category in the lexicon
    for (const category in lexicon) {
      const categoryData = lexicon[category];
      // Check if the word exists in this category
      for (const entry in categoryData) {
        if (categoryData[entry].word === word && categoryData[entry].pronunciation) {
          return categoryData[entry].pronunciation;
        }
      }
    }
  }

  return null;
};

export const convertToPronunciation = (text) => {
  if (!text) return '';

  // Split the text into words
  const words = text.split(' ');
  let pronunciationParts = [];

  for (const word of words) {
    // Skip empty words
    if (!word.trim()) continue;

    // Remove any brackets from untranslated words
    const cleanWord = word.replace(/[[\]]/g, '');
    
    // Try to find pronunciation in lexicons
    const pronunciation = findPronunciationInLexicons(cleanWord);
    
    if (pronunciation) {
      pronunciationParts.push(pronunciation);
    } else {
      // If no pronunciation found, keep original word in brackets
      pronunciationParts.push(`[${cleanWord}]`);
    }
  }

  return pronunciationParts.join(' ');
};

export const stringPronunciation = (text) => {
  if (!text) return '';

  // Split the text into words
  const words = text.split(' ');
  let pronunciationString = [];

  for (const word of words) {
    // Search through all lexicons for the word's pronunciation
    const pronunciation = findPronunciationInLexicons(word);
    if (pronunciation) {
      pronunciationString.push(pronunciation);
    } else {
      // If no pronunciation found, keep original word in brackets
      pronunciationString.push(`[${word}]`);
    }
  }

  return pronunciationString.join(' ');
};