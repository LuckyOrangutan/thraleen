import kradonianLanguage from '../../kradonianLanguageSystem';

export const applyGrammarRules = (words, sentenceType = 'declarative') => {
  const { syntax } = kradonianLanguage;
  let processedWords = [...words];

  // Apply word order based on syntax rules
  if (syntax.wordOrder === 'OSV') {
    processedWords = reorderToAlienSyntax(processedWords);
  }

  // Apply articles
  processedWords = applyArticles(processedWords);

  // Apply case markers
  processedWords = applyCaseMarkers(processedWords);

  // Apply sentence-type specific markers
  if (sentenceType === 'interrogative' && syntax.questions.yesNo) {
    processedWords.unshift(syntax.questions.yesNo);
  }

  return processedWords;
};

const reorderToAlienSyntax = (words) => {
  // Split into clauses
  const clauses = splitIntoClauses(words);
  
  // Reorder each clause according to alien syntax
  return clauses.map(clause => {
    const components = identifySentenceComponents(clause);
    
    // Alien order: Object-Subject-Verb with modifiers interspersed
    return [
      ...components.object,
      ...insertModifiers(components.modifiers, 'pre-subject'),
      ...components.subject,
      ...insertModifiers(components.modifiers, 'pre-verb'),
      ...components.verb
    ];
  }).flat();
};

const splitIntoClauses = (words) => {
  const clauses = [];
  let currentClause = [];

  words.forEach(word => {
    if (isClauseBreaker(word)) {
      if (currentClause.length > 0) {
        clauses.push(currentClause);
        currentClause = [];
      }
    }
    currentClause.push(word);
  });

  if (currentClause.length > 0) {
    clauses.push(currentClause);
  }

  return clauses;
};

const insertModifiers = (modifiers, position) => {
  // Distribute modifiers based on their type and position
  return modifiers.filter(mod => {
    const modType = determineModifierType(mod);
    return modType.position === position;
  });
};

const identifySentenceComponents = (words) => {
  const components = {
    subject: [],
    object: [],
    verb: [],
    modifiers: []
  };

  words.forEach((word, index) => {
    const wordType = determineWordType(word);
    switch (wordType) {
      case 'verb':
        components.verb.push(word);
        break;
      case 'noun':
        if (!components.subject.length) {
          components.subject.push(word);
        } else if (!components.object.length) {
          components.object.push(word);
        }
        break;
      default:
        components.modifiers.push(word);
    }
  });

  return components;
};

export const determineWordType = (word) => {
  const { lexicon } = kradonianLanguage;
  
  if (lexicon.verbs[word]) return 'verb';
  if (lexicon.nouns[word]) return 'noun';
  if (lexicon.adjectives[word]) return 'adjective';
  return 'modifier';
};

const applyArticles = (words) => {
  const { articles } = kradonianLanguage.morphology.grammarMarkers;
  
  return words.map(word => {
    if (requiresArticle(word)) {
      if (isDefinite(word)) {
        return articles.definite + word;
      }
      return articles.indefinite + word;
    }
    return word;
  });
};

const requiresArticle = (word) => {
  const { lexicon } = kradonianLanguage;
  return lexicon.nouns[word] && !isProperNoun(word);
};

const isDefinite = (word, context = []) => {
  // Check if the word has been mentioned before in the context
  return context.includes(word) || isProperNoun(word);
};

const isProperNoun = (word) => {
  // Check if word starts with a capital letter in original form
  return word.charAt(0) === word.charAt(0).toUpperCase();
};

const determineCase = (word, index, sentence) => {
  const wordType = determineWordType(word);
  
  if (wordType === 'noun') {
    if (index === 0) return 'nominative';
    const prevWord = sentence[index - 1];
    if (prevWord && determineWordType(prevWord) === 'verb') {
      return 'accusative';
    }
  }
  
  return null;
};

const applyCaseMarkers = (words) => {
  const { caseMarkers } = kradonianLanguage.morphology.affixes;
  
  return words.map((word, index, array) => {
    const caseType = determineCase(word, index, array);
    if (caseType && caseMarkers[caseType]) {
      return word + caseMarkers[caseType];
    }
    return word;
  });
};

export const applySentenceMarkers = (words, sentenceType) => {
  const { syntax } = kradonianLanguage;
  
  switch (sentenceType) {
    case 'interrogative':
      return [...words, syntax.questions.yesNo];
    case 'imperative':
      return [...words, syntax.evidentiality.seen];
    default:
      return words;
  }
};

const isClauseBreaker = (word) => {
  // Words that typically break clauses
  const clauseBreakers = [
    '𐑙𐑩𐑨', // and
    '𐑛𐑮𐑨𐑒𐑑', // but
    '𐑖𐑨𐑩𐑮', // or
    '𐑦𐑓', // if
    '𐑚𐑧𐑒', // because
    '𐑢𐑧𐑯' // when
  ];
  return clauseBreakers.includes(word);
};

const determineModifierType = (modifier) => {
  // Define modifier types and their positions
  const modifierTypes = {
    adjective: { position: 'pre-subject' },
    adverb: { position: 'pre-verb' },
    preposition: { position: 'pre-verb' }
  };

  // Check modifier against lexicon categories
  if (kradonianLanguage.lexicon.adjectives[modifier]) {
    return modifierTypes.adjective;
  }
  if (kradonianLanguage.commonWords[modifier]?.type === 'adverb') {
    return modifierTypes.adverb;
  }
  if (kradonianLanguage.commonWords[modifier]?.type === 'preposition') {
    return modifierTypes.preposition;
  }

  // Default to pre-verb position if type cannot be determined
  return { position: 'pre-verb' };
};