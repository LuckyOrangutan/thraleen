export const handlePunctuation = (text) => {
  const punctuation = [];
  
  // Extract punctuation with their positions
  text.replace(/[.,!?;:]/g, (match, offset) => {
    punctuation.push({ mark: match, position: offset });
    return match;
  });
  
  const cleanText = text.replace(/[.,!?;:]/g, '');
  
  return { cleanText, punctuation };
};

export const convertPunctuation = (mark, context = 'end') => {
  // Alien punctuation system:
  // - Punctuation appears at start AND end of clauses
  // - Multiple marks can combine for complex meanings
  const punctuationMap = {
    '.': {
      start: '𐑓𐑨',
      end: '𐑨𐑓'
    },
    ',': {
      start: '𐑖𐑨',
      end: '𐑨𐑖'
    },
    '!': {
      start: '𐑞𐑨',
      end: '𐑨𐑞'
    },
    '?': {
      start: '𐑲𐑗',
      end: '𐑗𐑲'
    },
    ';': {
      start: '𐑖𐑓',
      end: '𐑓𐑖'
    },
    ':': {
      start: '𐑖𐑨𐑞',
      end: '𐑞𐑨𐑖'
    }
  };

  return punctuationMap[mark]?.[context] || mark;
};

export const applyAlienPunctuation = (words, originalPunctuation) => {
  let result = [];
  let currentClause = [];
  let clauseStart = true;

  words.forEach((word, index) => {
    // Check if we need to start a new clause
    if (clauseStart) {
      // Add starting punctuation for the clause
      const startPunct = originalPunctuation.find(p => p.position < index * 5);
      if (startPunct) {
        result.push(convertPunctuation(startPunct.mark, 'start'));
      }
      clauseStart = false;
    }

    currentClause.push(word);

    // Check if we need to end the clause
    const nextPunct = originalPunctuation.find(p => p.position > index * 5);
    if (nextPunct) {
      result.push(...currentClause);
      result.push(convertPunctuation(nextPunct.mark, 'end'));
      currentClause = [];
      clauseStart = true;
    }
  });

  // Add any remaining words
  if (currentClause.length > 0) {
    result.push(...currentClause);
  }

  return result;
};