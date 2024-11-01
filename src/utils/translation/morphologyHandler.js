import kradonianLanguage from '../../kradonianLanguageSystem';

export const applyMorphology = (word, category, tense, number, caseType) => {
  let modifiedWord = word;

  if (number === 'plural') {
    modifiedWord = applyPluralMarker(modifiedWord, category);
  }

  if (tense) {
    modifiedWord = applyTenseMarker(modifiedWord, tense);
  }

  if (caseType) {
    modifiedWord = applyCaseMarker(modifiedWord, caseType);
  }

  return modifiedWord;
};

const applyPluralMarker = (word, category) => {
  const { pluralMarkers } = kradonianLanguage.morphology.affixes;
  
  if (category === 'noun') {
    return word + pluralMarkers.nounPlural;
  } else if (category === 'pronoun') {
    return pluralMarkers.pronounPlural + word;
  }
  return word;
};

const applyTenseMarker = (word, tense) => {
  const { tenseMarkers } = kradonianLanguage.morphology.affixes;
  
  switch (tense) {
    case 'past': return tenseMarkers.past + word;
    case 'present': return tenseMarkers.present + word;
    case 'future': return word + tenseMarkers.future;
    case 'perfect': return tenseMarkers.perfect + word;
    case 'progressive': return word + tenseMarkers.progressive;
    default: return word;
  }
};

const applyCaseMarker = (word, caseType) => {
  const { caseMarkers } = kradonianLanguage.morphology.affixes;
  const marker = caseMarkers[caseType];
  return marker ? word + marker : word;
};