import React from 'react';
import Home from './pages/Home';
import Past from './pages/Past';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/c/:id" element={<Past />} />
            </Routes>
        </Router>
    )
}

export default App