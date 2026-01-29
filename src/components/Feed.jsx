import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function Feed() {
    const [terms, setTerms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTerms();
    }, []);

    const fetchTerms = async () => {
        try {
            const { data, error } = await supabase
                .from('terms')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setTerms(data);
        } catch (error) {
            console.error('Error fetching terms:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const getCardStyle = (index) => {
        // 8 distinct themes based on the reference image
        const themes = [
            'theme-yellow-green',   // Yellow Bg, Green Text
            'theme-green-yellow',   // Green Bg, Yellow Text
            'theme-blue-red',       // Light Blue Bg, Red Text
            'theme-red-blue',       // Red Bg, Light Blue Text
            'theme-pink-blue',      // Pink Bg, Dark Blue Text
            'theme-blue-pink',      // Dark Blue Bg, Pink Text
            'theme-green-orange',   // Light Green Bg, Orange Text
            'theme-orange-green',   // Orange Bg, Light Green Text
        ];
        return themes[index % themes.length];
    };

    // SVG Noise Data URI (Optional: Keep it for texture or remove for flat look? Reference looks flat. Removing noise for now as per "graphic" look)

    return (
        <div className="feed-container">
            <header className="header">
                <div>
                    <h1>Apelog</h1>
                    <p className="subtitle">Visual dictionary of technical terms.</p>
                </div>
                <div className="logo-container">
                    <img src="/apelog-logo.png" alt="Apelog Logo" style={{ height: '80px', width: 'auto' }} />
                </div>
            </header>

            {loading ? (
                <div className="loading">Loading terms...</div>
            ) : (
                <div className="grid-mosaic">
                    {terms.map((term, index) => {
                        const themeClass = getCardStyle(index);

                        return (
                            <div key={term.id} className={`card ${themeClass}`}>
                                <div className="card-content">
                                    <div className="card-top">
                                        <h2 className="term-word">{term.word}</h2>
                                    </div>

                                    <div className="card-middle">
                                        <p className="term-def">
                                            {term.definition}
                                        </p>
                                    </div>

                                    <div className="card-bottom">
                                        {term.phonetic && (
                                            <span className="term-phonetic">
                                                {term.phonetic}
                                            </span>
                                        )}
                                        {/* Optional: Add hex code or ID similar to reference */}
                                        <span className="term-id">#{term.id.toString().substring(0, 6)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>{`
                .feed-container {
                    max-width: 100%; /* Full width for mosaic */
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    background-color: #fff;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                 .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 4rem 2rem 1rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-bottom: 0px;
                }

                .logo-container {
                    /* No margin needed */
                }

                h1 {
                    font-size: 2rem;
                    color: #111;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    line-height: 1;
                    margin: 0;
                    margin-bottom: 0.5rem;
                }

                .subtitle {
                    color: #888;
                    font-size: 0.9rem;
                    font-weight: 400;
                    letter-spacing: -0.01em;
                    margin: 0;
                }

                /* GRID LAYOUT */
                .grid-mosaic {
                    display: grid;
                    /* Responsive columns: 1 on mobile, 2 sm, 3 md, 4 lg */
                    grid-template-columns: repeat(1, 1fr);
                    gap: 0; /* Zero gap */
                    width: 100%;
                }

                @media (min-width: 640px) { .grid-mosaic { grid-template-columns: repeat(2, 1fr); } }
                @media (min-width: 1024px) { .grid-mosaic { grid-template-columns: repeat(4, 1fr); } }

                .card {
                    aspect-ratio: 3/4; /* Vertical rectangle */
                    padding: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                    border: none; /* No border */
                    border-radius: 0; /* Square corners */
                    transition: none;
                }
                
                .card-content {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .card-top {
                    margin-bottom: 1rem;
                }

                /* TYPOGRAPHY */
                .term-word {
                    font-size: 2.75rem; /* Big and bold */
                    font-weight: 900; /* Extra bold */
                    margin: 0;
                    letter-spacing: -0.04em;
                    line-height: 0.85; /* Tight leading */
                    word-wrap: break-word; /* Prevent overflow */
                    text-transform: capitalize; 
                }

                .term-def {
                    font-size: 0.75rem; /* Reduced size */
                    line-height: 1.3; /* Reduced line height */
                    font-weight: 500;
                    margin: 0;
                    opacity: 0.9;
                    max-width: 90%;
                }

                .card-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-top: auto;
                    font-size: 0.75rem;
                    font-weight: 700;
                    opacity: 0.8;
                    font-family: inherit; /* Keep main font */
                }

                .term-phonetic {
                    /* No specific style needed, inherits theme */
                }

                /* THEMES (Color Pairs) */
                /* 1. Yellow / Green */
                .theme-yellow-green { background-color: #FBBA16; color: #00492C; }
                
                /* 2. Green / Yellow */
                .theme-green-yellow { background-color: #00492C; color: #FBBA16; }

                /* 3. Blue / Red */
                .theme-blue-red { background-color: #9BCCDD; color: #E22028; }

                /* 4. Red / Blue */
                .theme-red-blue { background-color: #E22028; color: #9BCCDD; }

                /* 5. Pink / Dark Blue */
                .theme-pink-blue { background-color: #E2B2B4; color: #1E4380; }

                /* 6. Dark Blue / Pink */
                .theme-blue-pink { background-color: #1E4380; color: #E2B2B4; }

                /* 7. Light Green / Orange */
                .theme-green-orange { background-color: #B1D8B8; color: #E85D04; }

                /* 8. Orange / Light Green */
                .theme-orange-green { background-color: #E85D04; color: #B1D8B8; }


                @media (max-width: 600px) {
                    .header { padding: 2rem 1.5rem; }
                    .term-word { font-size: 2.25rem; }
                    .card { padding: 2rem; min-height: 300px; aspect-ratio: auto; } /* Allow height to grow on mobile */
                }
            `}</style>
        </div>
    );
}

export default Feed;
