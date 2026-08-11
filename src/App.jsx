import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function App() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeUpper) charset += UPPERCASE_CHARS;
    if (includeLower) charset += LOWERCASE_CHARS;
    if (includeNumbers) charset += NUMBER_CHARS;
    if (includeSymbols) charset += SYMBOL_CHARS;

    if (!charset) {
      setPassword('');
      return;
    }

    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    setPassword(generated);
    setCopied(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password) return { label: 'None', score: 0, color: '#475569' };

    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;

    let types = 0;
    if (includeUpper && /[A-Z]/.test(password)) types++;
    if (includeLower && /[a-z]/.test(password)) types++;
    if (includeNumbers && /[0-9]/.test(password)) types++;
    if (includeSymbols && /[^A-Za-z0-9]/.test(password)) types++;

    score += types;

    if (score <= 3) return { label: 'Weak', score: 1, color: '#ef4444' };
    if (score <= 5) return { label: 'Medium', score: 2, color: '#f59e0b' };
    return { label: 'Strong', score: 3, color: '#22c55e' };
  };

  const strength = getStrength();

  return (
    <div className="dark-app-container">
      <div className="password-card">
        <header className="card-header">
          <h1>🔒 Password Generator</h1>
          <p>Create strong & secure passwords instantly</p>
        </header>

        {/* Display Output */}
        <div className="display-box">
          <input 
            type="text" 
            readOnly 
            value={password || 'Select options below'} 
            placeholder="Generated password"
            className="password-input"
          />
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`} 
            onClick={handleCopy}
            disabled={!password}
            title="Copy to clipboard"
          >
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>

        {/* Strength Meter */}
        <div className="strength-container">
          <div className="strength-header">
            <span>Strength:</span>
            <span className="strength-label" style={{ color: strength.color }}>
              {strength.label}
            </span>
          </div>
          <div className="strength-bars">
            <div 
              className="bar" 
              style={{ backgroundColor: strength.score >= 1 ? strength.color : '#334155' }}
            ></div>
            <div 
              className="bar" 
              style={{ backgroundColor: strength.score >= 2 ? strength.color : '#334155' }}
            ></div>
            <div 
              className="bar" 
              style={{ backgroundColor: strength.score >= 3 ? strength.color : '#334155' }}
            ></div>
          </div>
        </div>

        {/* Password Length Slider */}
        <div className="control-group">
          <div className="slider-header">
            <label htmlFor="length-slider">Character Length</label>
            <span className="length-badge">{length}</span>
          </div>
          <input 
            id="length-slider"
            type="range" 
            min="4" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(Number(e.target.value))}
            className="length-slider"
          />
        </div>

        {/* Checkbox Options */}
        <div className="checkbox-grid">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={includeUpper} 
              onChange={(e) => setIncludeUpper(e.target.checked)} 
            />
            <span className="custom-checkbox"></span>
            Include Uppercase Letters (A-Z)
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={includeLower} 
              onChange={(e) => setIncludeLower(e.target.checked)} 
            />
            <span className="custom-checkbox"></span>
            Include Lowercase Letters (a-z)
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={includeNumbers} 
              onChange={(e) => setIncludeNumbers(e.target.checked)} 
            />
            <span className="custom-checkbox"></span>
            Include Numbers (0-9)
          </label>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={includeSymbols} 
              onChange={(e) => setIncludeSymbols(e.target.checked)} 
            />
            <span className="custom-checkbox"></span>
            Include Symbols (!@#$%)
          </label>
        </div>

        {/* Generate Button */}
        <button className="generate-btn" onClick={generatePassword}>
          ⚡ Generate Password
        </button>
      </div>
    </div>
  );
}
