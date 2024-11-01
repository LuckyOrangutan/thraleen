class ThraleenToEnglishTranslator {
    constructor(dialect = 'generic') {
      this.dialect = dialect;
    }
  
    translate(text) {
      if (!text || typeof text !== 'string') {
        return '';
      }
  
      try {
        const words = text.split(' ');
        const translated = words
          .map(word => this.translateWord(word))
          .filter(Boolean);
        return translated.join(' ');
      } catch (error) {
        console.error('Translation error:', error);
        return '[translation error]';
      }
    }
  
    translateWord(word) {
      // Handle articles
      if (word === '𐑛𐑧𐑛') return 'the';
      if (word === '𐑐𐑑') return 'a';
  
      // Remove any dialect markers
      const cleanWord = this.removeDialectMarkers(word);
      
      // Search through lexicons
      return this.searchEnglishEquivalent(cleanWord) || `[${word}]`;
    }
  
    removeDialectMarkers(word) {
      const dialectMarkers = {
        '𐑐': 'AdamantiumLegion',
        '𐑑': 'Deepwalkers',
        '𐑒': 'Thunderkin',
        '𐑓': 'Frostborn',
        '𐑔': 'Skyforgers'
      };
      
      for (const marker of Object.keys(dialectMarkers)) {
        if (word.startsWith(marker)) {
          return word.slice(marker.length);
        }
      }
      return word;
    }
  
    searchEnglishEquivalent(word) {
      const lexicon = require('../../lexicons/thraleen-lexicon.json');
      
      // Search through all categories in the lexicon
      for (const category of Object.values(lexicon)) {
        for (const [english, entry] of Object.entries(category)) {
          if (entry.word === word) {
            return english;
          }
        }
      }
      
      return null;
    }
  }
  
  export default ThraleenToEnglishTranslator;