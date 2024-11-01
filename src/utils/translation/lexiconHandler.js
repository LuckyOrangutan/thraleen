import kradonianLanguage from '../../kradonianLanguageSystem';
import lexicon from '../../lexicons/thraleen-lexicon.json';

const commonSuffixes = [
  's',
  'es',
  'ed',
  'ing',
  'er',
  'est'
];

const removeSuffix = (word) => {
  for (const suffix of commonSuffixes) {
    if (word.endsWith(suffix)) {
      // Special case for -ies (e.g., "flies" -> "fly")
      if (suffix === 'ies') {
        return word.slice(0, -3) + 'y';
      }
      // Special case for doubled consonants (e.g., "running" -> "run")
      if (suffix === 'ing' && word[word.length - 4] === word[word.length - 5]) {
        return word.slice(0, -4);
      }
      return word.slice(0, -suffix.length);
    }
  }
  return word;
};

export const searchLexicon = (word, dialect = 'generic') => {
  word = word.toLowerCase();
  console.log('Searching lexicon for:', word);

  // First try exact match
  if (kradonianLanguage.commonWords[word]) {
    console.log('Found common word:', kradonianLanguage.commonWords[word].word);
    return kradonianLanguage.commonWords[word].word;
  }

  const categories = ['nouns', 'verbs', 'adjectives', 'comparisons', 'pronouns'];
  
  for (const category of categories) {
    if (lexicon[category] && lexicon[category][word]) {
      console.log('Found in category', category + ':', lexicon[category][word].word);
      return lexicon[category][word].word;
    }
  }

  // If no exact match, try removing suffixes
  const baseWord = removeSuffix(word);
  if (baseWord !== word) {
    console.log('Trying base word:', baseWord);
    return searchLexicon(baseWord, dialect);
  }

  console.log('No translation found for:', word);
  return null;
};