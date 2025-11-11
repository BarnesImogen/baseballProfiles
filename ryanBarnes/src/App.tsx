import { useState } from 'react'
// @ts-ignore: CSS file has no type declarations; add "declare module '*.css';" in a .d.ts file to type it properly
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const playerData = {
    name: "Ryan Barnes",
    nickname: "Barnsey",
    position: "Catcher / 2nd Base / RF",
    graduationYear: "2026",
    height: "5'10\"",
    weight: "175 lbs",
    batsThrows: "R/R",
    email: "aussie.ryanbarnes@gmail.com",
    phone: "+61 436 027 800",
    fieldLevel: "https://www.fieldlevel.com/app/profile/ryan.barnes.2186350/baseball",
    twitter: "https://twitter.com/BarnseyBaseball",
    
    stats: {
      catching: [
        { label: "Pop Time", value: "1.98s" },
        { label: "Caught Stealing", value: "1" },
        { label: "Fielding %", value: "1,000" },
        { label: "Pass Balls", value: "0" },
        { label: "Pickoffs", value: "1" },
        { label: "60 Yard Dash", value: "7.4" }
      ],
      hitting: [
        { label: "Batting Avg", value: ".421" },
        { label: "RBIs", value: "6" },
        { label: "OBP", value: ".500" },
        { label: "OPS", value: "1.026" },
        { label: "QAB", value: "7" },
        { label: "TB", value: "10" }
      ]
    },
    
    experience: [
      "College Prospects Australia Showcase (2025)",
      "Blacktown Workers Baseball Club NSW State League 1st & 2nd Grade (2024-2025)",
      "World Baseball Showcases - Primary catcher for 19u team as 17 year old (2024)",
      "Australian Baseball League - Bullpen catcher for Sydney Blue Sox (2022-2024)",
      "Awarded Golden Glove for u18 - Blacktown Workers (2023/2024)",
      "NSW Schoolboys Baseball - CIS Representative (2023-2024)",
      "The Pittwater House Schools - Baseballer of the Year (2023-2024)",
      "Senior League National Championships - 3rd place (2022)",
      "International Experience: 2 West Coast USA tours, Florida tours, Japan tours (PONY)"
    ],
    
    bio: "Dual-threat player with experience as both a catcher and batter. Known for competitive spirit, strong work ethic, and leadership on and off the field. Committed to excellence in athletics and academics."
  }

  const galleryImages = [
    { src: `${import.meta.env.BASE_URL}images/catcher-1.jpg`, alt: 'Ryan Barnes catching' },
    { src: `${import.meta.env.BASE_URL}images/batting-1.jpg`, alt: 'Ryan Barnes batting' },
    { src: `${import.meta.env.BASE_URL}images/catcher-2.jpg`, alt: 'Ryan Barnes in catcher position' },
    { src: `${import.meta.env.BASE_URL}images/teamwork.jpg`, alt: 'Ryan Barnes with teammate' },
    { src: `${import.meta.env.BASE_URL}images/batting-2.jpg`, alt: 'Ryan Barnes batting swing' },
    { src: `${import.meta.env.BASE_URL}images/action.jpg`, alt: 'Ryan Barnes game action' }
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!lightboxOpen) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  // Add keyboard event listener
  useState(() => {
    window.addEventListener('keydown', handleKeyPress as any)
    return () => window.removeEventListener('keydown', handleKeyPress as any)
  })

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="baseball-icon">⚾</span>
            <span className="player-name">{playerData.name}</span>
          </div>
          
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
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#stats" onClick={() => setIsMenuOpen(false)}>Stats</a></li>
            <li><a href="#achievements" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">{playerData.graduationYear}</div>
          <h1 className="hero-title">
            {playerData.name}
            <span className="hero-subtitle">"{playerData.nickname}" - Australian Catcher</span>
          </h1>
          <p className="hero-position">{playerData.position}</p>
          
          <div className="hero-stats-grid">
            <div className="hero-stat">
              <span className="stat-label">Height</span>
              <span className="stat-value">{playerData.height}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">Weight</span>
              <span className="stat-value">{playerData.weight}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">B/T</span>
              <span className="stat-value">{playerData.batsThrows}</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">GPA</span>
              <span className="stat-value">3.82</span>
            </div>
          </div>
          
          <a href="#contact" className="cta-button">Get In Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <p className="about-text">{playerData.bio}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="container">
          <h2 className="section-title">Player Statistics Summer 2025</h2>
          <h3 className="games-played">Games Played: 7</h3>
          
          <div className="stats-grid">
            <div className="stats-category">
              <h3 className="category-title">
                Catchings Stats
              </h3>
              <div className="stats-cards">
                {playerData.stats.catching.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="stats-category">
              <h3 className="category-title">
                Hitting Stats
              </h3>
              <div className="stats-cards">
                {playerData.stats.hitting.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="achievements" className="achievements">
        <div className="container">
          <h2 className="section-title">Baseball Experience</h2>
          <div className="achievements-grid">
            {playerData.experience.map((item, index) => (
              <div key={index} className="achievement-card">
                <span className="achievement-icon">⚾</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
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

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <a href={`mailto:${playerData.email}`}>{playerData.email}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <h3>Phone</h3>
              <a href={`tel:${playerData.phone}`}>{playerData.phone}</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-img">
                <img src={`${import.meta.env.BASE_URL}images/fieldlevel-logo.png`} alt="Field Level" />
              </div>
              <h3>Field Level</h3>
              <a href={playerData.fieldLevel} target="_blank" rel="noopener noreferrer">View Profile</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon-img">
                <img src={`${import.meta.env.BASE_URL}images/twitter-logo.png`} alt="Twitter" />
              </div>
              <h3>Twitter</h3>
              <a href={playerData.twitter} target="_blank" rel="noopener noreferrer">@BarnseyBaseball</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {playerData.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
