import React, { useState, useEffect } from 'react';
import TermInput from './components/TermInput';
import TermList from './components/TermList';

import { supabase } from './supabase';

function App() {
    const [terms, setTerms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initial fetch from Supabase
    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            const { data, error } = await supabase
                .from('terms')
                .select('*')
                .order('created_at', { ascending: false }); // Show newest first

            if (error) throw error;
            if (data) setTerms(data);
        } catch (error) {
            console.error('Error fetching terms:', error.message);
        }
    };

    const fetchDefinition = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error('Not found');
            }
            const data = await response.json();
            return data[0]; // Take the first result
        } catch (error) {
            console.error("Error fetching definition:", error);
            return null;
        }
    };

    const handleAddTerm = async (word) => {
        setIsLoading(true);

        // Check local duplicate (optional optimization to avoid DB call if obvious)
        if (terms.some(t => t.word.toLowerCase() === word.toLowerCase())) {
            alert(`'${word}' is already in your list!`);
            setIsLoading(false);
            return;
        }

        const apiData = await fetchDefinition(word);

        let definition = '';
        let phonetic = '';
        let source = '';

        if (apiData) {
            // Try to find the first definition
            if (apiData.meanings && apiData.meanings.length > 0) {
                // Prefer noun or verb, or just take the first one
                const meaning = apiData.meanings[0];
                if (meaning.definitions && meaning.definitions.length > 0) {
                    definition = meaning.definitions[0].definition;
                }
            }

            if (apiData.phonetic) {
                phonetic = apiData.phonetic;
            } else if (apiData.phonetics && apiData.phonetics.length > 0) {
                phonetic = apiData.phonetics.find(p => p.text)?.text || '';
            }

            if (apiData.sourceUrls && apiData.sourceUrls.length > 0) {
                source = apiData.sourceUrls[0];
            }
        }

        const colors = [
            '#fef3c7', // Yellow
            '#f3e8ff', // Purple
            '#dcfce7', // Green
            '#ffffff', // White
            '#e0f2fe', // Blue
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newTerm = {
            word: apiData ? apiData.word : word,
            definition,
            phonetic,
            source,
            color: randomColor,
            // Supabase handles 'id' and 'created_at' automatically
        };

        try {
            const { data, error } = await supabase
                .from('terms')
                .insert([newTerm])
                .select();

            if (error) throw error;
            if (data) {
                // Optimistically update or just re-fetch. Since we want the ID from DB, let's use the returned data.
                setTerms(prev => [data[0], ...prev]);
            }
        } catch (error) {
            console.error('Error adding term:', error.message);
            alert('Error saving to database: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTerm = async (id) => {
        try {
            const { error } = await supabase
                .from('terms')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setTerms(prev => prev.filter(term => term.id !== id));
        } catch (error) {
            console.error('Error deleting term:', error.message);
            alert('Error deleting: ' + error.message);
        }
    };

    const handleUpdateTerm = async (id, newDefinition) => {
        try {
            const { error } = await supabase
                .from('terms')
                .update({ definition: newDefinition })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setTerms(prev => prev.map(term =>
                term.id === id ? { ...term, definition: newDefinition } : term
            ));
        } catch (error) {
            console.error('Error updating term:', error.message);
            alert('Error updating: ' + error.message);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <div className="logo">
                    <img src="/apelog-logo.png" alt="Apelog Logo" style={{ height: '120px', width: 'auto' }} />
                    <h1>Apelog</h1>
                </div>
                <p className="subtitle">Track your daily technical vocabulary.</p>
            </header>

            <main>
                <TermInput onAddTerm={handleAddTerm} isLoading={isLoading} />
                <TermList
                    terms={terms}
                    onDelete={handleDeleteTerm}
                    onUpdate={handleUpdateTerm}
                />
            </main>

            <style>{`
        .header {
          text-align: left;
          margin-bottom: 3rem;
          padding-top: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        h1 {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 5rem;
          color: var(--color-text);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .subtitle {
          color: var(--color-text-secondary);
          font-size: 1.125rem;
          margin-left: 0.5rem;
        }

        @media (max-width: 600px) {
            h1 {
                font-size: 3rem;
            }
            .logo img {
                height: 80px !important; 
            }
        }
      `}</style>
        </div>
    );
}

export default App;
