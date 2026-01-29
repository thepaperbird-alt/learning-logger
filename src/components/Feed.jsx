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
        const styles = [
            'bg-white text-gray-900 border border-gray-100',
            'bg-gradient-to-br from-orange-400 to-red-500 text-white border border-white-20 gradient-card',
            'bg-white text-gray-900 border border-gray-100',
            'bg-gradient-to-bl from-blue-400 to-indigo-600 text-white border border-white-20 gradient-card',
            'bg-white text-gray-900 border border-gray-100',
            'bg-white text-gray-900 border border-gray-100',
            'bg-gradient-to-tr from-emerald-400 to-cyan-500 text-white border border-white-20 gradient-card',
        ];
        return styles[index % styles.length];
    };

    // SVG Noise Data URI
    const noiseBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

    return (
        <div className="feed-container">
            <header className="header">
                <div className="logo-container">
                    <img src="/apelog-logo.png" alt="Apelog Logo" style={{ height: '60px', width: 'auto' }} />
                </div>
                <div>
                    <h1>Apelog</h1>
                    <p className="subtitle">Visual dictionary of technical terms.</p>
                </div>
            </header>

            {loading ? (
                <div className="loading">Loading terms...</div>
            ) : (
                <div className="masonry-grid">
                    {terms.map((term, index) => {
                        const cardClass = getCardStyle(index);
                        const isGradient = cardClass.includes('gradient');

                        return (
                            <div key={term.id} className={`card ${cardClass}`}>
                                {isGradient && <div className="noise-overlay" style={{ backgroundImage: noiseBg }}></div>}

                                <div className="card-content">
                                    <div className="card-header">
                                        <h2 className="term-word">{term.word}</h2>
                                        {term.phonetic && (
                                            <span className={`term-phonetic ${isGradient ? 'text-white/80' : 'text-gray-400'}`}>
                                                {term.phonetic}
                                            </span>
                                        )}
                                    </div>

                                    <p className={`term-def ${isGradient ? 'text-white/95' : 'text-gray-600'}`}>
                                        {term.definition}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style>{`
                .feed-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                    min-height: 100vh;
                    background-color: #fcfcfc;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                 .header {
                    text-align: left;
                    margin-bottom: 5rem;
                }

                .logo-container {
                    margin-bottom: 2rem; /* Increased gap */
                }

                h1 {
                    font-size: 2rem; /* Smaller title */
                    color: #111;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    line-height: 1;
                    margin: 0;
                    margin-bottom: 0.5rem;
                }

                .subtitle {
                    color: #888;
                    font-size: 0.9rem; /* Smaller subtitle */
                    font-weight: 400;
                    letter-spacing: -0.01em;
                    margin: 0; /* Align directly under */
                }

                .masonry-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* Smaller columns */
                    gap: 1.5rem;
                    align-items: start;
                }

                .card {
                    padding: 1.75rem; /* Reduced padding */
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: all 0.3s ease;
                    min-height: 180px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                
                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.06);
                }

                .card-content {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    height: 100%;
                }

                .noise-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    mix-blend-mode: overlay;
                    pointer-events: none;
                }

                /* Typography & Hierarchy */
                .term-word {
                    font-size: 1.15rem; /* Significantly smaller */
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                    margin-bottom: 0.15rem;
                }

                .term-phonetic {
                    font-family: 'SF Mono', 'Menlo', monospace;
                    font-size: 0.75rem;
                    opacity: 0.8;
                    letter-spacing: 0;
                }

                .term-def {
                    font-size: 0.925rem; /* Smaller body text */
                    line-height: 1.5;
                    margin: 0;
                    font-weight: 450;
                }

                /* Utility classes */
                .bg-white { background-color: #ffffff; }
                .text-gray-900 { color: #1a1a1a; }
                .text-gray-600 { color: #555; }
                .text-gray-400 { color: #999; }
                .border { border-width: 1px; border-style: solid; }
                .border-gray-100 { border-color: #f0f0f0; }
                .border-white-20 { border-color: rgba(255, 255, 255, 0.2); }

                /* Refined Gradients */
                .bg-gradient-to-br { background: linear-gradient(135deg, #FF9A9E 0%, #FECFEEF 99%, #FECFEEF 100%); background: linear-gradient(135deg, #ff9a9e, #fecfef); /* Soft Peach/Pink */ } 
                .bg-gradient-to-br.from-orange-400 { background: linear-gradient(135deg, #FF6B6B, #FF8E53); /* Vibrant Coral/Orange */ }
                
                .bg-gradient-to-bl { background: linear-gradient(225deg, #4facfe 0%, #00f2fe 100%); /* Blue Cyan */ }
                .bg-gradient-to-tr { background: linear-gradient(45deg, #43e97b 0%, #38f9d7 100%); /* Spring Green */ }

                /* Overwriting specific gradients for better "modern" look */
                .bg-gradient-to-br { background: linear-gradient(150deg, #ff7e5f, #feb47b); } /* Warm */
                .bg-gradient-to-bl { background: linear-gradient(210deg, #2b5876, #4e4376); } /* Deep Purple/Blue */
                .bg-gradient-to-tr { background: linear-gradient(30deg, #0ba360, #3cba92); } /* Modern Green */

                .text-white { color: white; }
                .text-white\/95 { color: rgba(255, 255, 255, 0.95); }
                .text-white\/80 { color: rgba(255, 255, 255, 0.8); }

                @media (max-width: 600px) {
                    .feed-container {
                        padding: 2rem 1.5rem;
                    }
                    .masonry-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    h1 {
                        font-size: 1.75rem;
                    }
                    .header {
                        margin-bottom: 3rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default Feed;
