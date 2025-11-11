import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayerById } from '../data/players';
import { Player } from '../types/Player';
import '../App.css';

function ProfileView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Loading player with ID:', id);
    if (id) {
      const playerData = getPlayerById(id);
      console.log('Player data found:', playerData);
      if (playerData) {
        setPlayer(playerData);
        setLoading(false);
      } else {
        console.log('No player found, redirecting to home');
        navigate('/');
      }
    }
  }, [id, navigate]);

  // Keyboard navigation for lightbox - must be before early returns
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
      }
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % 6);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + 6) % 6);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen]);

  // Define helper functions
  const galleryImages = [
    { src: '/images/catcher-1.jpg', alt: player ? `${player.name} catching` : 'Catching' },
    { src: '/images/batting-1.jpg', alt: player ? `${player.name} batting` : 'Batting' },
    { src: '/images/catcher-2.jpg', alt: player ? `${player.name} in catcher position` : 'Catcher position' },
    { src: '/images/teamwork.jpg', alt: player ? `${player.name} with teammate` : 'Teamwork' },
    { src: '/images/batting-2.jpg', alt: player ? `${player.name} batting swing` : 'Batting swing' },
    { src: '/images/action.jpg', alt: player ? `${player.name} game action` : 'Game action' }
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#DC0000'
      }}>
        Loading player profile...
      </div>
    );
  }

  if (!player) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#DC0000'
      }}>
        Player not found
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="baseball-icon">⚾</span>
            <span className="player-name">Baseball Profiles</span>
          </Link>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><a href="#stats" onClick={() => setIsMenuOpen(false)}>Stats</a></li>
            <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            <li><Link to={`/profile/${id}/edit`} className="edit-link" onClick={() => setIsMenuOpen(false)}>Edit Profile</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">{player.graduationYear}</div>
          <h1 className="hero-title">
            {player.name}
            <span className="hero-subtitle">"{player.nickname}"</span>
          </h1>
          <p className="hero-position">{player.position}</p>
          
          <div className="hero-stats-grid">
            <div className="hero-stat">
              <span className="stat-label">Height</span>
              <span className="stat-value">{player.height}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">Weight</span>
              <span className="stat-value">{player.weight}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">B/T</span>
              <span className="stat-value">{player.batsThrows}</span>
            </div>
            {player.gpa && (
              <div className="hero-stat">
                <span className="stat-label">GPA</span>
                <span className="stat-value">{player.gpa}</span>
              </div>
            )}
          </div>
          
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <p className="about-text">{player.bio}</p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="gallery">
        <div className="container">
          <h2 className="section-title">In Action</h2>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-icon">🔍</span>
                  <span className="gallery-text">Click to view</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>
          <button 
            className="lightbox-nav lightbox-prev" 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button 
            className="lightbox-nav lightbox-next" 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            ›
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[currentImageIndex].src} 
              alt={galleryImages[currentImageIndex].alt}
            />
            <div className="lightbox-caption">
              {galleryImages[currentImageIndex].alt}
              <span className="lightbox-counter">
                {currentImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="container">
          <h2 className="section-title">Player Statistics</h2>
          {player.gamesPlayed && (
            <h3 className="games-played">Games Played: {player.gamesPlayed}</h3>
          )}
          
          <div className="stats-grid">
            {player.stats.catching && player.stats.catching.length > 0 && (
              <div className="stats-category">
                <h3 className="category-title">
                  <span className="icon">⚾</span>
                  Catching Stats
                </h3>
                <div className="stats-cards">
                  {player.stats.catching.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {player.stats.hitting && player.stats.hitting.length > 0 && (
              <div className="stats-category">
                <h3 className="category-title">
                  <span className="icon">🏏</span>
                  Hitting Stats
                </h3>
                <div className="stats-cards">
                  {player.stats.hitting.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {player.stats.pitching && player.stats.pitching.length > 0 && (
              <div className="stats-category">
                <h3 className="category-title">
                  <span className="icon">⚾</span>
                  Pitching Stats
                </h3>
                <div className="stats-cards">
                  {player.stats.pitching.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="achievements">
        <div className="container">
          <h2 className="section-title">Baseball Experience</h2>
          <div className="achievements-grid">
            {player.experience.map((item, index) => (
              <div key={index} className="achievement-card">
                <span className="achievement-icon">⚾</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <a href={`mailto:${player.email}`}>{player.email}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h3>Phone</h3>
              <a href={`tel:${player.phone}`}>{player.phone}</a>
            </div>
            {player.fieldLevel && (
              <div className="contact-card">
                <div className="contact-icon">FL</div>
                <h3>Field Level</h3>
                <a href={player.fieldLevel} target="_blank" rel="noopener noreferrer">View Profile</a>
              </div>
            )}
            {player.twitter && (
              <div className="contact-card">
                <div className="contact-icon">𝕏</div>
                <h3>Twitter</h3>
                <a href={player.twitter} target="_blank" rel="noopener noreferrer">@{player.name.replace(' ', '')}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {player.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ProfileView;
