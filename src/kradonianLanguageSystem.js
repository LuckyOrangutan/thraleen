const kradonianLanguage = {
  phonology: {
    vowels: ['𐑩', '𐑧', '𐑰', '𐑦', '𐑗', '𐑨'],
    consonants: [
      '𐑱', '𐑯', '𐑢', '𐑬', '𐑫', '𐑟', '𐑭',
      '𐑥', '𐑡', '𐑞', '𐑮', '𐑴', '𐑳', '𐑪',
      '𐑖', '𐑘', '𐑙', '𐑚', '𐑛', '𐑜', '𐑐', '𐑑'
    ],
    syllableStructure: ['CV', 'CVC', 'CVCC', 'CVCV'],
    phonotactics: {
      illegalClusters: ['𐑐𐑑', '𐑒𐑓'],
      vowelHarmony: {
        frontVowels: ['𐑦', '𐑧', '𐑰'],
        backVowels: ['𐑳', '𐑪', '𐑫'],
      }
    }
  },
  lexicon: {
    nouns: {
      'cycle': '𐑯𐑛𐑥𐑡𐑦',
      'clan': '𐑖𐑨𐑩𐑥',
      'war': '𐑜𐑨𐑩𐑙',
      'peace': '𐑬𐑰𐑮𐑖',
      'forge': '𐑞𐑧𐑖𐑩',
      'weapon': '𐑙𐑩𐑨𐑞',
      'honor': '𐑫𐑰𐑮𐑦',
      'unified': '𐑯𐑛𐑦𐑯𐑧',
      'survival': '𐑖𐑨𐑘𐑰𐑘',
      'skyforger': '𐑪𐑥𐑛𐑬𐑦𐑨𐑡',
    },
    verbs: {
      'fight': '𐑜𐑨𐑩𐑖',
      'forge': '𐑞𐑧𐑖𐑰',
      'survive': '𐑖𐑨𐑘𐑰',
      'unite': '𐑯',
      'destroy': '𐑯𐑩𐑨𐑞',
      'build': '𐑞𐑧𐑖𐑨𐑗',
    },
    adjectives: {
      'strong': '𐑞𐑧𐑖𐑨𐑩',
      'wise': '𐑥𐑗𐑡𐑰',
      'cold': '𐑬𐑨𐑕𐑩𐑰',
      'dark': '𐑯𐑰𐑪𐑩',
      'advanced': '𐑑𐑦𐑟𐑥',
    },
    // Add other categories like adverbs, prepositions, etc.
  },
  culturalConcepts: {
    'cycleOfWar': '𐑯𐑛𐑥𐑡𐑦𐑜𐑨𐑩𐑙',
    'forgeHonor': '𐑞𐑧𐑖𐑩𐑫𐑰𐑮𐑦',
    'clanUnity': '𐑖𐑨𐑩𐑥𐑯𐑛𐑦𐑯',
    'shadowSurvival': '𐑯𐑰𐑪𐑩𐑖𐑨𐑘𐑰𐑘',
  },
  phrases: {
    'May your forge never cool': '𐑫𐑰 𐑞𐑧𐑖𐑩 𐑯𐑦 𐑬𐑨𐑕𐑩𐑰',
    'In war, we are forged': '𐑙𐑩 𐑜𐑨𐑩𐑙 𐑙𐑧 𐑞𐑧𐑖𐑰',
    'Unity in the face of destruction': '𐑯𐑛𐑦𐑯𐑧 𐑙𐑩 𐑯𐑩𐑨𐑞',
    'The cycle continues': '𐑯𐑛𐑥𐑡𐑦 𐑖𐑨𐑘𐑰',
  },
  morphology: {
    affixes: {
      tenseMarkers: {
        past: '𐑯𐑛-', // prefix
        present: '𐑖𐑨', // prefix
        future: '-𐑖𐑨', // suffix
        perfect: '𐑑𐑪-', // prefix
        progressive: '-𐑦', // suffix
      },
      pluralMarkers: {
        nounPlural: '-𐑑𐑧',
        pronounPlural: '𐑖𐑨𐑩-', 
      },
      caseMarkers: {
        nominative: '', 
        accusative: '-𐑓',
        possessive: '-𐑥𐑦',
        dative: '-𐑕',
        instrumental: '-𐑌',
      },
      clanMarkers: {
        adamantiumLegion: '𐑛𐑮𐑨𐑒-',
        frostborn: '𐑬𐑨𐑛-',
      },
      connector: '𐑙', // Connector for compound words
    },
    compoundFormation: {
      connector: '𐑙', // Defined in affixes
    },
    grammarMarkers: {
      possession: {
        marker: '𐑥𐑦',  // Existing possessive marker
        rules: {
          apostropheS: true,
          of: true
        }
      },
      articles: {
        definite: '𐑛𐑧𐑛',    // "the"
        indefinite: '𐑐𐑑'     // "a/an"
      },
      conjunction: {
        and: '𐑙𐑩𐑨',
        but: '𐑛𐑮𐑨𐑒𐑑',
        or: '𐑖𐑨𐑩𐑮'
      }
    },
    verbModifiers: {
      continuous: '-𐑦𐑙',    // -ing form
      past: '𐑯𐑛-',         // Past tense
      future: '-𐑖𐑨',       // Future tense
      perfect: '𐑑𐑪-'       // Perfect aspect
    }
  },
  syntax: {
    wordOrder: 'OSV', // Object-Subject-Verb
    topicMarker: '𐑞𐑧', 
    evidentiality: {
      seen: '𐑖𐑨𐑘',
      heard: '𐑙𐑩𐑨',
      inferred: '𐑥𐑗𐑡',
    },
    negation: '', // Negation marker
    questions: {
      yesNo: '𐑲𐑗', // Marker for yes/no questions
      whQuestions: '', // Marker for wh-questions
    }
  },
  conceptualMapping: {
    uniqueColors: {
      '𐑪𐑥𐑛𐑬': 'Color of heated adamantium (not visible to humans)',
      '𐑯𐑰𐑪𐑩𐑖': 'Color of deep cave fungi (not visible to humans)',
    },
    emotionalStates: {
      '𐑞𐑧𐑖𐑫𐑰𐑮𐑙𐑩': 'The feeling of unity during forging',
      '𐑯𐑛𐑥𐑡𐑦𐑜𐑨𐑩': 'The anticipation before a battle',
    }
  },
  numeralSystem: {
    base: 8,
    specialQuantities: {
      "𐑞𐑧𐑖𐑨𐑗𐑙": "A full forge (equivalent to 64 in base-10)",
      "𐑯𐑛𐑦𐑯𐑧𐑖𐑨𐑩𐑥": "A complete clan gathering (512 in base-10)"
    }
  },
  temporalConcepts: {
    dayParts: ['𐑞𐑧𐑖𐑩𐑢𐑨𐑒𐑧', '𐑞𐑧𐑖𐑩𐑥𐑦𐑛', '𐑞𐑧𐑖𐑩𐑛𐑨𐑮𐑒'],
    seasonNames: ['𐑞𐑧𐑖𐑩𐑣𐑧𐑨𐑑', '𐑞𐑧𐑖𐑩𐑒𐑪𐑤𐑛', '𐑞𐑧𐑖𐑩𐑖𐑑𐑪𐑮𐑥', '𐑞𐑧𐑖𐑩𐑒𐑨𐑤𐑥'],
  },
  idiomaticExpressions: {
    '𐑞𐑧𐑖𐑩𐑣𐑨𐑥𐑥𐑧𐑓𐑨𐑤𐑤𐑕': 'Opportunity knocks (lit. "The hammer falls")',
    '𐑞𐑧𐑖𐑩𐑓𐑪𐑮𐑡𐑧𐑒𐑪𐑤𐑛': 'To lose passion or skill (lit. "The forge cools")',
  },
  writingSystem: {
    diacritics: {
      '̇': 'Indicates a hushed or whispered sound',
      '̄': 'Elongates the sound of a character',
    },
    ligatures: {
      '𐑞𐑧': 'Often combined into a single character in formal writing',
    }
  },
  discourseMakers: {
    formalityLevels: {
      casual: '𐑯𐑩',
      formal: '𐑞𐑧𐑖',
      ceremonial: '𐑛𐑮𐑨𐑒𐑞𐑧𐑖',
    },
    clanAffiliation: {
      start: '𐑖𐑨𐑩-',
      end: '-𐑥𐑞𐑮𐑨𐑤𐑒',
    }
  },
  nonVerbalComponents: {
    gestures: {
      '𐑞𐑧𐑖𐑩𐑣𐑨𐑥𐑥𐑧𐑮': 'Hammer-striking motion accompanying oaths',
      '𐑞𐑧𐑖𐑩𐑓𐑪𐑮𐑡𐑧': 'Palm-up gesture indicating sincerity',
    },
    tonalVariations: {
      rising: 'Indicates a question',
      falling: 'Indicates a statement of fact',
      wavering: 'Indicates uncertainty or speculation',
    }
  },
  tabooConcepts: {
    '𐑞𐑧𐑖𐑩𐑢𐑧𐑨𐑒': 'Concepts related to weakness or surrender (rarely spoken)',
    '𐑞𐑧𐑖𐑩𐑚𐑮𐑧𐑨𐑒': 'The act of breaking an oath (considered highly offensive)',
  },
  phonologicalRules: {
    soundChanges: [
      {
        from: '𐑓',
        to: 'f',
        description: 'Voiceless labiodental fricative remains consistent.'
      },
      {
        from: '𐑞',
        to: 'dh',
        description: 'Dental fricative evolves to voiced.'
      },
      // Add more sound change rules as necessary
    ],
    applySoundChanges: (word) => {
      kradonianLanguage.phonologicalRules.soundChanges.forEach(rule => {
        const regex = new RegExp(rule.from, 'g');
        word = word.replace(regex, rule.to);
      });
      return word;
    }
  },
  commonWords: {
    'the': {
      word: '𐑛𐑧𐑛',
      type: 'article'
    },
    'a': {
      word: '𐑐𐑑',
      type: 'article'
    },
    'an': {
      word: '𐑐𐑑',
      type: 'article'
    },
    'in': {
      word: '𐑦𐑯',
      type: 'preposition'
    },
    'on': {
      word: '𐑪𐑯',
      type: 'preposition'
    },
    'at': {
      word: '𐑨𐑑',
      type: 'preposition'
    },
    'to': {
      word: '𐑑𐑳',
      type: 'preposition'
    },
    'from': {
      word: '𐑓𐑮𐑪𐑥',
      type: 'preposition'
    },
    'with': {
      word: '𐑢𐑦𐑔',
      type: 'preposition'
    },
    'by': {
      word: '𐑚𐑦',
      type: 'preposition'
    },
    'and': {
      word: '𐑙𐑩𐑨',
      type: 'conjunction'
    },
    'or': {
      word: '𐑖𐑨𐑩𐑮',
      type: 'conjunction'
    },
    'but': {
      word: '𐑛𐑮𐑨𐑒𐑑',
      type: 'conjunction'
    },
    'of': {
      word: '𐑪𐑓',
      type: 'preposition'
    },
    'for': {
      word: '𐑓𐑪𐑮',
      type: 'preposition'
    },
    'down': {
      word: '𐑛𐑨𐑳𐑯',
      type: 'preposition'
    },
    'while': {
      word: '𐑢𐑨𐑦𐑤',
      type: 'conjunction'
    },
    'than': {
      word: '𐑔𐑨𐑯',
      type: 'conjunction'
    },
    // Add new common words
    'only': {
      word: '𐑪𐑯𐑤𐑦',
      type: 'adverb'
    },
    'this': {
      word: '𐑔𐑦𐑕',
      type: 'demonstrative'
    },
    'that': {
      word: '𐑔𐑨𐑑',
      type: 'demonstrative'
    },
    'is': {
      word: '𐑦𐑕',
      type: 'verb'
    },
    'are': {
      word: '𐑨𐑮',
      type: 'verb'
    },
    'was': {
      word: '𐑢𐑨𐑕',
      type: 'verb'
    },
    'were': {
      word: '𐑢𐑧𐑮',
      type: 'verb'
    },
    'will': {
      word: '𐑢𐑦𐑤',
      type: 'auxiliary'
    },
    'can': {
      word: '𐑒𐑨𐑯',
      type: 'auxiliary'
    },
    'could': {
      word: '𐑒𐑳𐑛',
      type: 'auxiliary'
    },
    'should': {
      word: '𐑖𐑳𐑛',
      type: 'auxiliary'
    },
    'would': {
      word: '𐑢𐑳𐑛',
      type: 'auxiliary'
    },
    'it': {
      word: '𐑦𐑑',
      type: 'pronoun'
    },
    'they': {
      word: '𐑔𐑧𐑦',
      type: 'pronoun'
    },
    'we': {
      word: '𐑢𐑦',
      type: 'pronoun'
    },
    'you': {
      word: '𐑘𐑳',
      type: 'pronoun'
    },
    // Time-related
    'after': {
      word: '𐑨𐑓𐑑',
      type: 'preposition'
    },
    'before': {
      word: '𐑚𐑧𐑓',
      type: 'preposition'
    },
    'during': {
      word: '𐑛𐑳𐑮',
      type: 'preposition'
    },
    'well': {
      word: '𐑢𐑧𐑤',
      type: 'adverb'
    },
    'now': {
      word: '𐑯𐑨𐑳',
      type: 'adverb'
    },
    'then': {
      word: '𐑔𐑧𐑯',
      type: 'adverb'
    },
    'when': {
      word: '𐑢𐑧𐑯',
      type: 'adverb'
    },
    'soon': {
      word: '𐑕𐑳𐑯',
      type: 'adverb'
    },

    // Modal verbs
    'must': {
      word: '𐑥𐑳𐑕𐑑',
      type: 'auxiliary'
    },
    'may': {
      word: '𐑥𐑧𐑦',
      type: 'auxiliary'
    },
    'might': {
      word: '𐑥𐑨𐑦𐑑',
      type: 'auxiliary'
    },
    'shall': {
      word: '𐑖𐑨𐑤',
      type: 'auxiliary'
    },

    // Common adverbs
    'very': {
      word: '𐑝𐑧𐑮',
      type: 'adverb'
    },
    'too': {
      word: '𐑑𐑳𐑳',
      type: 'adverb'
    },
    'just': {
      word: '𐑡𐑳𐑕𐑑',
      type: 'adverb'
    },
    'also': {
      word: '𐑨𐑤𐑕',
      type: 'adverb'
    },

    // Question words
    'what': {
      word: '𐑢𐑨𐑑',
      type: 'interrogative'
    },
    'where': {
      word: '𐑢𐑧𐑮',
      type: 'interrogative'
    },
    'who': {
      word: '𐑢𐑳',
      type: 'interrogative'
    },
    'why': {
      word: '𐑢𐑨𐑦',
      type: 'interrogative'
    },
    'how': {
      word: '𐑣𐑨𐑳',
      type: 'interrogative'
    },

    // Negatives
    'not': {
      word: '𐑯𐑪𐑑',
      type: 'negative'
    },
    'no': {
      word: '𐑯𐑳',
      type: 'negative'
    },
    'never': {
      word: '𐑯𐑧𐑝',
      type: 'negative'
    },

    // Quantifiers
    'all': {
      word: '𐑨𐑤',
      type: 'quantifier'
    },
    'some': {
      word: '𐑕𐑳𐑥',
      type: 'quantifier'
    },
    'many': {
      word: '𐑥𐑧𐑯',
      type: 'quantifier'
    },
    'few': {
      word: '𐑓𐑧𐑳',
      type: 'quantifier'
    },

    // Other common words
    'if': {
      word: '𐑦𐑓',
      type: 'conjunction'
    },
    'because': {
      word: '𐑚𐑧𐑒',
      type: 'conjunction'
    },
    'so': {
      word: '𐑕𐑳',
      type: 'conjunction'
    },
    'yet': {
      word: '𐑘𐑧𐑑',
      type: 'conjunction'
    }
  }
};

export const grammarRules = {
  comparison: {
    marker: '𐑔𐑨𐑯',
    position: 'after-compared',
    rules: {
      requiresArticle: false,
      requiresCase: 'accusative'
    }
  },
  articles: {
    definite: {
      marker: '𐑛𐑧𐑛',
      position: 'before-noun',
      exceptions: ['proper-nouns', 'abstract-concepts']
    }
  }
};

export default kradonianLanguage;