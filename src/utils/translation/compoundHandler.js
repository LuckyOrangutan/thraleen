import kradonianLanguage from '../../kradonianLanguageSystem';
import { searchLexicon } from './lexiconHandler';

export const handleCompoundWord = (word, dialect) => {
  if (word.includes('-') || word.includes(' ')) {
    const parts = word.split(/[-\s]/);
    const translatedParts = parts.map(part => {
      const lexEntry = searchLexicon(part, dialect);
      if (lexEntry) return lexEntry.word;
      const commonEntry = kradonianLanguage.commonWords[part];
      if (commonEntry) return commonEntry.word;
      return null;
    }).filter(Boolean);
    
    if (translatedParts.length === parts.length) {
      return translatedParts.join(kradonianLanguage.morphology.compoundFormation.connector);
    }
  }
  return null;
};