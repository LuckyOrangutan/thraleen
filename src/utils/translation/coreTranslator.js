import kradonianLanguage from '../../kradonianLanguageSystem';
import { searchLexicon } from './lexiconHandler';
import { convertToPronunciation } from './pronunciationHandler';
import { handlePunctuation } from './punctuationHandler';
import { applyGrammarRules } from './grammarRules';
import { applyAlienPunctuation } from './punctuationHandler';

export const translateToKradonian = (text, dialect = 'generic') => {
  try {
    if (!text || typeof text !== 'string') {
      return { translation: '', pronunciation: '' };
    }

    // Handle punctuation
    const { cleanText, punctuation } = handlePunctuation(text);
    
    // Process words
    const words = cleanText.toLowerCase().trim().split(/\s+/);
    const translatedWords = words.map(word => {
      const translation = searchLexicon(word, dialect);
      return translation || `[${word}]`;
    });

    // Apply alien grammar rules
    let processedWords = applyGrammarRules(translatedWords);
    
    // Apply alien punctuation
    processedWords = applyAlienPunctuation(processedWords, punctuation);

    const translation = processedWords.join(' ');
    const pronunciation = convertToPronunciation(translation);

    return {
      translation: translation.normalize('NFC'),
      pronunciation
    };
  } catch (error) {
    console.error('Translation error:', error);
    return {
      translation: '[translation error]',
      pronunciation: 'Translation Error'
    };
  }
};

export const applyDialectModifications = (word, dialect) => {
  const dialectMarkers = kradonianLanguage.morphology.affixes.clanMarkers;
  
  switch(dialect) {
    case 'AdamantiumLegion':
      return dialectMarkers.adamantiumLegion + word;
    case 'Frostborn':
      return dialectMarkers.frostborn + word;
    default:
      return word;
  }
};

export const translateFromKradonian = (text, dialect = 'generic') => {
  const words = text.split(' ');
  const translated = words
    .map(word => translateWord(word, dialect))
    .filter(Boolean); // Remove any null/undefined values
  return translated.join(' ');
};

const translateWord = (word, dialect) => {
  // Check for articles first
  if (word === kradonianLanguage.morphology.grammarMarkers.articles.definite) {
    return 'the';
  }
  if (word === kradonianLanguage.morphology.grammarMarkers.articles.indefinite) {
    return 'a';
  }

  // Check lexicons
  const lexiconResult = searchLexicon(word.toLowerCase(), dialect);
  if (!lexiconResult || typeof lexiconResult !== 'string') {
    // Return the word in brackets to indicate untranslated
    return `[${word}]`;
  }
  
  return lexiconResult;
};