import React, { useState, useEffect, useRef } from 'react';
import ThraleenCharMap from '../utils/ThraleenCharMap';
import { ThraleenAlphabet } from '../assets/thraleen-alphabet/ThraleenAlphabet';

const QuantumChar = ({ char, englishChar, enableQuantum = false, onWordComplete, isOutput = false, selectedLanguage }) => {
  const [currentChar, setCurrentChar] = useState(char);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isEnglishChar, setIsEnglishChar] = useState(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const wordCheckRef = useRef(null);

  const thraleenChars = Object.keys(ThraleenAlphabet);
  const englishChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    if (!enableQuantum || isCollapsed) {
      setCurrentChar(char);
      setIsEnglishChar(false);
      return;
    }

    const randomDelay = Math.random() * 100;
    const getRandomChar = () => {
      // 30% chance to show English character
      if (Math.random() < 0.3) {
        setIsEnglishChar(true);
        return englishChars[Math.floor(Math.random() * englishChars.length)];
      } else {
        setIsEnglishChar(false);
        return thraleenChars[Math.floor(Math.random() * thraleenChars.length)];
      }
    };

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const newChar = getRandomChar();
        setCurrentChar(newChar);
        
        if (onWordComplete) {
          onWordComplete((isValid) => {
            if (isValid) {
              clearInterval(intervalRef.current);
              setIsCollapsed(true);
              setIsEnglishChar(false);
              setCurrentChar(char);
            }
          });
        }
      }, 100);
    }, randomDelay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [enableQuantum, isCollapsed, char, thraleenChars, englishChars, onWordComplete]);

  return (
    <div className="quantum-char">
      {isEnglishChar ? (
        <div className="english-char quantum-english">{currentChar}</div>
      ) : (
        currentChar && ThraleenCharMap[currentChar] ? (
          <div className={`thraleen-char ${isCollapsed ? 'collapsed' : ''}`}>
            {React.createElement(ThraleenCharMap[currentChar])}
          </div>
        ) : (
          <div className="english-char">{englishChar}</div>
        )
      )}
    </div>
  );
};

export default QuantumChar;