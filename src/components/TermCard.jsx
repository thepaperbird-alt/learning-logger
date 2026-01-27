import React, { useState } from 'react';
import { Trash2, BookOpen, Edit2, Check, Search, X } from 'lucide-react';

const TermCard = ({ term, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(term.definition || '');

  const handleSave = () => {
    onUpdate(term.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(term.definition || '');
    setIsEditing(false);
  };

  return (
    <div className="term-card">
      <div className="term-header">
        <h3 className="term-title">{term.word}</h3>
        <div className="actions">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit-btn"
              aria-label="Edit term"
            >
              <Edit2 size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(term.id)}
            className="action-btn delete-btn"
            aria-label="Delete term"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {term.phonetic && (
        <span className="term-phonetic">{term.phonetic}</span>
      )}

      <div className="term-content">
        {isEditing ? (
          <div className="edit-container">
            <textarea
              className="edit-textarea"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter definition..."
              rows={3}
              autoFocus
            />
            <div className="edit-actions">
              <button onClick={handleSave} className="save-btn">
                <Check size={14} /> Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <>
            {term.definition ? (
              <p className="term-definition">{term.definition}</p>
            ) : (
              <div className="no-def-container">
                <p className="term-no-def">No definition found.</p>
                <a
                  href={`https://www.google.com/search?q=define+${encodeURIComponent(term.word)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-search-link"
                >
                  <Search size={14} />
                  <span>Search on Google</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>

      <div className="term-footer">
        <span className="term-date">
          {new Date(term.created_at || term.createdAt).toLocaleDateString()}
        </span>
        {term.source && (
          <a href={term.source} target="_blank" rel="noopener noreferrer" className="term-link">
            <BookOpen size={14} /> source
          </a>
        )}
      </div>

      <style>{`
        .term-card {
          background: ${term.color || 'var(--color-card-bg)'}; /* Use assigned color or default */
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-md);
          padding: 1rem; /* Reduced padding from 1.5rem */
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: var(--font-family);
          color: var(--color-text);
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .term-card:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .term-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .drag-handle {
          color: var(--color-text-secondary);
          opacity: 0.5;
          cursor: grab;
          display: flex;
          align-items: center;
        }
        .drag-handle:active {
          cursor: grabbing;
        }

        .term-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          text-transform: capitalize;
          flex-grow: 1;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: transparent;
          color: var(--color-text-secondary);
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: color 0.2s, background-color 0.2s;
        }
        
        .delete-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
        
        .edit-btn:hover {
          color: var(--color-primary);
          background: rgba(99, 102, 241, 0.1);
        }

        .term-phonetic {
          font-family: var(--font-family);
          color: var(--color-primary);
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: -0.5rem;
        }

        .term-content {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .term-definition {
          color: var(--color-text);
          line-height: 1.6;
          white-space: pre-wrap;
          font-size: 0.95rem;
        }
        
        .no-def-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .term-no-def {
          color: var(--color-text-secondary);
          font-style: italic;
          font-size: 0.875rem;
        }
        
        .google-search-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-primary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: opacity 0.2s;
        }
        
        .google-search-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        
        /* Edit Mode Styles */
        .edit-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .edit-textarea {
          width: 100%;
          background: var(--color-input-bg);
          border: 1px solid var(--color-primary);
          border-radius: var(--radius-md);
          padding: 0.5rem;
          color: var(--color-text);
          font-family: inherit;
          resize: vertical;
          outline: none;
        }
        
        .edit-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
        
        .save-btn, .cancel-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .save-btn {
          background: var(--color-primary);
          color: white;
        }
        
        .save-btn:hover {
          background: var(--color-primary-hover);
        }
        
        .cancel-btn {
          background: transparent;
          border: 1px solid var(--color-card-border);
          color: var(--color-text-secondary);
        }
        .cancel-btn:hover {
          background: rgba(0,0,0,0.05);
        }

        .term-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          color: var(--color-text-secondary);
          font-size: 0.75rem;
          border-top: 1px solid var(--color-card-border);
          padding-top: 0.75rem;
        }
        
        .term-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: inherit;
          text-decoration: none;
          transition: color 0.1s;
        }
        .term-link:hover {
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};

export default TermCard;
