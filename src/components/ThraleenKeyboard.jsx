import React, { useEffect } from 'react';
import ThraleenCharMap from '../utils/ThraleenCharMap';
import './ThraleenKeyboard.css';

const ThraleenKeyboard = ({ onCharacterClick }) => {
  const characters = Object.keys(ThraleenCharMap);
  
  // Create rows with adjusted distribution
  const row1 = [...characters.slice(0, 10), characters[40], characters[44]];
  const row2 = [...characters.slice(10, 20), characters[41]];
  const row3 = characters.slice(20, 30);
  const row4 = [...characters.slice(30, 40), characters[45]];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        onCharacterClick('backspace');
      } else if (event.key === ' ') {
        onCharacterClick(' ');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCharacterClick]);

  return (
    <div className="keyboard-grid">
      {[row1, row2, row3, row4].map((row, i) => (
        <div key={i} className={`keyboard-row ${i === 2 ? 'with-controls' : ''}`}>
          {i === 2 && (
            <button
              className="space-button"
              onClick={() => onCharacterClick(' ')}
              title="Space"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          )}
          {row.map((char, j) => (
            <button
              key={`${i}-${j}`}
              className="hex-button"
              onClick={() => onCharacterClick(char)}
            >
              {ThraleenCharMap[char] && React.createElement(ThraleenCharMap[char])}
            </button>
          ))}
          {i === 2 && (
            <button
              className="backspace-button"
              onClick={() => onCharacterClick('backspace')}
              title="Backspace"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z"/>
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThraleenKeyboard;