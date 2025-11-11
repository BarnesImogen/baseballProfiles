import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlayers } from '../data/players';
import { Player } from '../types/Player';
import './HomePage.css';

function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const loadedPlayers = getPlayers();
    setPlayers(loadedPlayers);
    setFilteredPlayers(loadedPlayers);
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.graduationYear.includes(searchTerm)
      );
      setFilteredPlayers(filtered);
    }
  }, [searchTerm, players]);

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="site-title">
            <span className="baseball-icon">⚾</span>
            Baseball Profiles
          </h1>
          <p className="site-subtitle">Discover talented baseball players</p>
        </div>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, position, or graduation year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </section>

      {/* Players Grid */}
      <section className="players-section">
        <div className="players-container">
          <h2 className="section-title">
            {searchTerm ? `Search Results (${filteredPlayers.length})` : 'All Players'}
          </h2>
          
          {filteredPlayers.length === 0 ? (
            <div className="no-results">
              <p>No players found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search">
                Clear Search
              </button>
            </div>
          ) : (
            <div className="players-grid">
              {filteredPlayers.map((player) => (
                <Link
                  key={player.id}
                  to={`/profile/${player.id}`}
                  className="player-card"
                >
                  <div className="player-card-header">
                    <div className="player-avatar">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="graduation-badge">{player.graduationYear}</div>
                  </div>
                  
                  <div className="player-card-body">
                    <h3 className="player-name">{player.name}</h3>
                    <p className="player-nickname">"{player.nickname}"</p>
                    <p className="player-position">{player.position}</p>
                    
                    <div className="player-quick-stats">
                      <div className="quick-stat">
                        <span className="stat-label">Height</span>
                        <span className="stat-value">{player.height}</span>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-label">B/T</span>
                        <span className="stat-value">{player.batsThrows}</span>
                      </div>
                      {player.gpa && (
                        <div className="quick-stat">
                          <span className="stat-label">GPA</span>
                          <span className="stat-value">{player.gpa}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="player-card-footer">
                    <span className="view-profile">View Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Player Button */}
      <div className="add-player-section">
        <Link to="/profile/new/edit" className="add-player-button">
          <span className="plus-icon">+</span>
          Create New Player Profile
        </Link>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} Baseball Profiles. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
