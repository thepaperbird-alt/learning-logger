import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Logger from './components/Logger';
import Feed from './components/Feed';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Logger />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    );
}

export default App;
