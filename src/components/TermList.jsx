import React from 'react';
import TermCard from './TermCard';
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TermList = ({ terms, onDelete, onUpdate }) => {
  if (terms.length === 0) {
    return (
      <div className="empty-state">
        <Layers size={48} className="empty-icon" />
        <p>No terms added yet. Start your learning log!</p>

        <style>{`
          .empty-state {
            text-align: center;
            color: var(--color-text-secondary);
            margin-top: 4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            animation: fadeIn 0.5s ease-out;
            font-family: var(--font-family);
          }
          .empty-icon {
            opacity: 0.5;
            color: var(--color-primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="term-list-container">
      <AnimatePresence>
        {terms.map((term) => (
          <motion.div
            key={term.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <TermCard
              term={term}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        .term-list-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          padding-bottom: 2rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default TermList;
