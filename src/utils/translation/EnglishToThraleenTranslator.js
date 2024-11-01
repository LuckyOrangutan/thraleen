class EnglishToThraleenTranslator {
  constructor(dialect = 'generic') {
    this.dialect = dialect;
  }

  translate(text) {
    if (!text || typeof text !== 'string') {
      return { translation: '', pronunciation: '' };
    }

    try {
      // Handle punctuation
      const { cleanText, punctuation } = this.handlePunctuation(text);
      
      // Process words
      const words = cleanText.toLowerCase().trim().split(/\s+/);
      const translatedWords = words.map(word => {
        const translation = this.searchLexicon(word);
        return translation || `[${word}]`;
      });

      // Apply grammar rules
      let processedWords = this.applyGrammarRules(translatedWords);
      
      // Apply alien punctuation
      processedWords = this.applyAlienPunctuation(processedWords, punctuation);

      const translation = processedWords.join(' ');
      const pronunciation = this.convertToPronunciation(translation);

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
  }

  handlePunctuation(text) {
    const punctuationMap = {
      '.': '𐑾',
      ',': '𐑿',
      '!': '𐑺',
      '?': '𐑻',
      ';': '𐑼',
      ':': '𐑽'
    };

    let cleanText = text;
    const punctuation = [];

    // Extract punctuation and their positions
    Object.keys(punctuationMap).forEach(punct => {
      const regex = new RegExp(`\\${punct}`, 'g');
      cleanText = cleanText.replace(regex, match => {
        punctuation.push({
          original: match,
          translated: punctuationMap[match],
          position: cleanText.indexOf(match)
        });
        return ' ';
      });
    });

    return { cleanText: cleanText.trim(), punctuation };
  }

  searchLexicon(word) {
    const lexicon = require('../../lexicons/thraleen-lexicon.json');
    
    // Check each category in the lexicon
    for (const category of ['nouns', 'verbs', 'adjectives', 'commonWords']) {
      if (lexicon[category] && lexicon[category][word]) {
        return lexicon[category][word].word;
      }
    }

    // Handle basic plurals
    if (word.endsWith('s')) {
      const singular = word.slice(0, -1);
      const singularTranslation = this.searchLexicon(singular);
      if (singularTranslation) {
        return singularTranslation + '𐑹'; // Add plural marker
      }
    }

    return null;
  }

  applyGrammarRules(words) {
    // Apply basic grammar rules
    return words.map((word, index) => {
      // Skip words in brackets (untranslated)
      if (word.startsWith('[')) return word;

      // Add dialect-specific modifications
      if (this.dialect !== 'generic') {
        word = this.applyDialectModifications(word);
      }

      return word;
    });
  }

  applyDialectModifications(word) {
    const dialectMarkers = {
      'AdamantiumLegion': '𐑐',
      'Deepwalkers': '𐑑',
      'Thunderkin': '𐑒',
      'Frostborn': '𐑓',
      'Skyforgers': '𐑔'
    };

    if (dialectMarkers[this.dialect]) {
      return dialectMarkers[this.dialect] + word;
    }
    return word;
  }

  applyAlienPunctuation(words, punctuation) {
    if (!punctuation.length) return words;

    const result = [...words];
    punctuation.forEach(p => {
      // Add the translated punctuation at the appropriate position
      if (p.position >= 0) {
        result.push(p.translated);
      }
    });

    return result;
  }

  convertToPronunciation(text) {
    const lexicon = require('../../lexicons/thraleen-lexicon.json');
    const words = text.split(' ');
    
    return words.map(word => {
      // Skip brackets for untranslated words
      if (word.startsWith('[')) {
        return word;
      }

      // Search through lexicon categories for pronunciation
      for (const category of Object.values(lexicon)) {
        for (const entry of Object.values(category)) {
          if (entry.word === word && entry.pronunciation) {
            return entry.pronunciation;
          }
        }
      }

      // If no pronunciation found, return the original word
      return `[${word}]`;
    }).join(' ');
  }
}

export default EnglishToThraleenTranslator;