import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import KradonianTranslator from './KradonianTranslator.jsx';
import LoreCompendium from './LoreCompendium.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <aside style={styles.sidebar}>
          <h2 style={styles.logo}>Kradonian Tools</h2>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              Translator
            </Link>
            <Link to="/lore" style={styles.navLink}>
              Lore Compendium
            </Link>
          </nav>
        </aside>
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<KradonianTranslator />} />
            <Route path="/lore" element={<LoreCompendium />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0a1929',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1e3a5f',
    padding: '20px',
    boxSizing: 'border-box',
  },
  logo: {
    color: '#fff',
    marginBottom: '40px',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 0',
    fontSize: '18px',
    transition: 'color 0.3s',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    boxSizing: 'border-box',
  },
};

export default App;