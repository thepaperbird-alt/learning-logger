import React, { useState } from 'react';
import { Plus, Search, Loader2 } from 'lucide-react';

const TermInput = ({ onAddTerm, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTerm(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="term-input-container">
      <div className="input-wrapper">
        <Search className="input-icon" size={20} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new term, tool, or jargon..."
          className="term-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="add-btn"
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Plus size={24} />
          )}
        </button>
      </div>

      <style>{`
        .term-input-container {
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--color-input-bg);
          border: 1px solid var(--color-card-border);
          border-radius: 9999px; /* Pill shape */
          box-shadow: var(--shadow-lg);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-glow);
        }

        .input-icon {
          margin-left: 1.25rem;
          color: #94a3b8;
        }

        .term-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem;
          font-size: 1.125rem;
          color: var(--color-text);
          outline: none;
        }

        .term-input::placeholder {
          color: #64748b;
        }

        .add-btn {
          margin: 0.5rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s, transform 0.1s;
        }

        .add-btn:hover:not(:disabled) {
          background-color: var(--color-primary-hover);
          transform: scale(1.05);
        }
        
        .add-btn:active:not(:disabled) {
          transform: scale(0.95);
        }

        .add-btn:disabled {
          background-color: #334155;
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .animate-spin {
           animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
};

export default TermInput;
