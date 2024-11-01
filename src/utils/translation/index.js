// Import translation functions
import { translateToKradonian, translateFromKradonian } from './coreTranslator';
import { searchLexicon } from './lexiconHandler';
import { handleCompoundWord } from './compoundHandler';
import { convertToPronunciation } from './pronunciationHandler';

// Export all translation functions
export {
  translateToKradonian,
  translateFromKradonian,
  searchLexicon,
  handleCompoundWord,
  convertToPronunciation
};

// Export dialect-related utilities if needed by other components
export { dialects, genericDialect } from '../constants/dialects';
export { default as kradonianLanguage } from '../../kradonianLanguageSystem';