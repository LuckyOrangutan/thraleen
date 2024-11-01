// src/utils/ThraleenCharMap.js
import { ThraleenAlphabet } from '../assets/thraleen-alphabet/ThraleenAlphabet';

const ThraleenCharMap = {};

// Add debugging
console.log('Loading ThraleenAlphabet:', Object.keys(ThraleenAlphabet));

Object.entries(ThraleenAlphabet).forEach(([char, Component]) => {
  const normalizedChar = char.normalize('NFC');
  if (Component) {
    ThraleenCharMap[normalizedChar] = Component;
    // Debug which characters are being mapped
    console.log(`Mapped character ${char} (${char.codePointAt(0).toString(16)}) to SVG component`);
  }
});

export default ThraleenCharMap;