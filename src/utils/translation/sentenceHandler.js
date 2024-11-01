import { determineWordType } from './grammarRules';

export const identifySentenceComponents = (words) => {
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
        if (index === 0 || isSubject(word, index, words)) {
          components.subject.push(word);
        } else {
          components.object.push(word);
        }
        break;
      default:
        components.modifiers.push(word);
    }
  });

  return components;
};

export const applyOSVOrder = (components) => {
  return [
    ...components.object,
    ...components.subject,
    ...components.verb,
    ...components.modifiers
  ];
};

export const getSentenceType = (text) => {
  if (text.endsWith('?')) return 'interrogative';
  if (text.endsWith('!')) return 'imperative';
  return 'declarative';
};

const isSubject = (word, index, sentence) => {
  const prevWord = sentence[index - 1];
  return !prevWord || determineWordType(prevWord) === 'verb';
};