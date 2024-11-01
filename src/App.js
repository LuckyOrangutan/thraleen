import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import KradonianTranslator from './KradonianTranslator.jsx';
import LoreCompendium from './LoreCompendium.jsx';
import './App.css';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <svg className="nav-icon" viewBox="0 0 24 24">
        {to === '/' ? (
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
        ) : (
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
        )}
      </svg>
      <span>{children}</span>
    </Link>
  );
};

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="logo-container">
            <h1 className="logo-title">Kradonian Tools</h1>
          </div>
          <nav className="nav-menu">
            <NavLink to="/">Translator</NavLink>
            <NavLink to="/lore">Lore Compendium</NavLink>
          </nav>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg viewBox="0 0 24 24" className="toggle-icon">
              <path d={isSidebarCollapsed 
                ? "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                : "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              } />
            </svg>
          </button>
        </aside>
        <main className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
          <Routes>
            <Route path="/" element={<KradonianTranslator />} />
            <Route path="/lore" element={<LoreCompendium />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;