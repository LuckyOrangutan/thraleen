import React, { useState, useEffect } from 'react';
import EnglishToThraleenTranslator from './utils/translation/EnglishToThraleenTranslator';
import ThraleenToEnglishTranslator from './utils/translation/ThraleenToEnglishTranslator';
import './KradonianTranslator.css';
import ThraleenKeyboard from './components/ThraleenKeyboard';
import QuantumChar from './components/QuantumChar';
import { searchLexicon } from './utils/translation/lexiconHandler';
import lexicon from './lexicons/thraleen-lexicon.json';

const KradonianTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputTranslation, setOutputTranslation] = useState('');
  const [outputPronunciation, setOutputPronunciation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedDialect, setSelectedDialect] = useState('generic');
  const [showWarning, setShowWarning] = useState(false);

  const languages = ['English', 'Thraleen'];
  const dialectOptions = ['generic', 'Adamantium Legion', 'Deepwalkers', 'Thunderkin', 'Frostborn', 'Skyforgers'];

  const [englishToThraleen, setEnglishToThraleen] = useState(() => new EnglishToThraleenTranslator('generic'));
  const [thraleenToEnglish, setThraleenToEnglish] = useState(() => new ThraleenToEnglishTranslator('generic'));

  const [animationQueue, setAnimationQueue] = useState([]);

  useEffect(() => {
    setEnglishToThraleen(new EnglishToThraleenTranslator(selectedDialect));
    setThraleenToEnglish(new ThraleenToEnglishTranslator(selectedDialect));
  }, [selectedDialect]);

  useEffect(() => {
    const translateTimeout = setTimeout(() => {
      if (inputText) {
        if (selectedLanguage === 'English') {
          const { translation, pronunciation } = englishToThraleen.translate(inputText);
          setOutputTranslation(translation);
          setOutputPronunciation(pronunciation);
          const newAnimationStates = animateCharacters(inputText, translation);
          setAnimationQueue(newAnimationStates || []);
        } else {
          const translatedText = thraleenToEnglish.translate(inputText);
          setOutputTranslation(translatedText);
          setOutputPronunciation('N/A');
          setAnimationQueue([]);
        }
      } else {
        setOutputTranslation('');
        setOutputPronunciation('');
        setAnimationQueue([]);
      }
    }, 300);

    return () => clearTimeout(translateTimeout);
  }, [inputText, selectedLanguage, selectedDialect, englishToThraleen, thraleenToEnglish]);

  const animateCharacters = (input, output) => {
    if (!input || !output) return;
    
    try {
      const inputChars = Array.from(input);
      const outputChars = Array.from(output);
      
      // Create animation states for each character
      const animationStates = inputChars.map((char, index) => ({
        from: char,
        to: outputChars[index] || '',
        progress: 0,
        startTime: Date.now() + (index * 100),
      }));
      
      // Store animation states in state if needed for rendering
      return animationStates;
      
    } catch (error) {
      console.error('Animation error:', error);
    }
  };

  const getCurrentWord = (index, chars) => {
    let start = index;
    let end = index;
    
    // Find word boundaries
    while (start > 0 && chars[start - 1] !== ' ') start--;
    while (end < chars.length && chars[end] !== ' ') end++;
    
    // Get the word
    return chars.slice(start, end).join('');
  };

  const checkValidWord = (word) => {
    // First check if it's a valid Thraleen word in the lexicon
    const lexiconEntry = searchLexicon(word);
    if (lexiconEntry) return true;

    // Then check all categories in the lexicon for matching Thraleen words
    for (const category of Object.values(lexicon)) {
      for (const entry of Object.values(category)) {
        if (entry.word === word) return true;
      }
    }

    return false;
  };

  const renderThraleenChar = (char, index, originalChar = '', enableQuantum = false, isOutput = false) => {
    if (char === ' ') {
      return <span key={index} className="space-char">&nbsp;</span>;
    }
    
    if (char === '[' || char === ']') {
      return null;
    }
    
    return (
      <QuantumChar 
        key={index}
        char={char}
        englishChar={originalChar}
        enableQuantum={enableQuantum}
        isOutput={isOutput}
        selectedLanguage={selectedLanguage}
        onWordComplete={(callback) => {
          const currentWord = getCurrentWord(index, Array.from(outputTranslation));
          const isValidWord = checkValidWord(currentWord);
          callback(isValidWord);
        }}
      />
    );
  };

  const handleCharacterClick = (char) => {
    if (!showWarning) {
      setShowWarning(true);
    }
    
    if (char === 'backspace') {
      setInputText(prevText => {
        if (!prevText) return '';
        
        // Get the last character and check if it's a surrogate pair
        const lastChar = prevText.slice(-2); // Take last two code units
        
        // Check if it's a Thraleen character (surrogate pair)
        if (lastChar.length === 2 && lastChar.codePointAt(0) > 0xFFFF) {
          return prevText.slice(0, -2);
        }
        
        // For regular characters or already partially deleted characters
        return prevText.slice(0, -1);
      });
    } else {
      setInputText(prevText => prevText + char);
    }
  };

  const handleLanguageSwitch = (lang) => {
    setSelectedLanguage(lang);
    setSelectedDialect('generic');
    setInputText('');
    setOutputTranslation('');
    setOutputPronunciation('');
  };

  return (
    <div className="translator-container">
      <header className="translator-header">
        <h1 className="translator-title">Kradonian Translator</h1>
      </header>
      
      <div className="language-selector">
        {languages.map(lang => (
          <button
            key={lang}
            className={`language-button ${lang === selectedLanguage ? 'active' : ''}`}
            onClick={() => handleLanguageSwitch(lang)}
          >
            {lang}
          </button>
        ))}
        {(selectedLanguage === 'Thraleen' || selectedLanguage === 'English') && (
          <select
            className="dialect-select"
            value={selectedDialect}
            onChange={(e) => setSelectedDialect(e.target.value)}
          >
            {dialectOptions.map(dialect => (
              <option key={dialect} value={dialect}>
                {dialect === 'generic' ? 'Generic Dialect' : dialect}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="output-display">
        {selectedLanguage === 'English' ? (
          Array.from(outputTranslation).map((char, index) => 
            renderThraleenChar(
              char,
              index,
              char,
              selectedLanguage === 'Thraleen',
              true
            )
          )
        ) : (
          Array.from(outputTranslation).map((char, index) => 
            renderThraleenChar(
              char,
              index,
              char,
              true,
              true
            )
          )
        )}
      </div>
      {selectedLanguage === 'Thraleen' && showWarning && (
        <div className="warning-message">
          <span className="warning-icon">⚠️</span>
          Warning: Kradonian letters are unstable on Earth Technology
        </div>
      )}

      {/* Pronunciation Output - Only show for English to Thraleen */}
      {selectedLanguage === 'English' && outputPronunciation && (
        <div style={{
          padding: '10px',
          marginTop: '10px',
          backgroundColor: '#1a2a3a',
          borderRadius: '8px',
          color: '#4299e1',
          fontStyle: 'italic'
        }}>
          Pronunciation: {outputPronunciation}
        </div>
      )}

      {/* Input Section */}
      {selectedLanguage === 'English' ? (
        <textarea
          style={{
            width: '98%',
            height: '150px',
            padding: '10px',
            marginTop: '20px',
            marginBottom: '10px',
            backgroundColor: '#1a2a3a',
            border: '1px solid #2d3748',
            borderRadius: '8px',
            color: '#fff',
            resize: 'vertical',
          }}
          placeholder={`Enter text in English${selectedDialect !== 'generic' ? ` (${selectedDialect})` : ''}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      ) : (
        <div>
          <div style={{
            width: '97%',
            minHeight: '150px',
            padding: '15px',
            marginTop: '20px',
            marginBottom: '10px',
            backgroundColor: '#1a2a3a',
            border: '1px solid #2d3748',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '24px',
            lineHeight: '1.5',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            alignItems: 'center'
          }}>
            {Array.from(inputText).map((char, index) => renderThraleenChar(char, index, char, false))}
          </div>
          <ThraleenKeyboard onCharacterClick={handleCharacterClick} />
        </div>
      )}
    </div>
  );
};

export default KradonianTranslator;