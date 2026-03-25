import React, { useState, useEffect } from 'react';
import './App.css';
import HackathonCard from './components/HackathonCard';

// Comprehensive Mock Data covering your target platforms
const MOCK_DATA = [
  { id: 1, title: "AI Gen Innovation", prizePool: "$10,000", deadline: "2 Days Left", tags: ["AI"], platform: "Devpost", link: "#" },
  { id: 2, title: "Web3 Global Build", prizePool: "$5,000", deadline: "5 Days Left", tags: ["Blockchain"], platform: "Unstop", link: "#" },
  { id: 3, title: "Data Insights Hack", prizePool: "$2,000", deadline: "1 Week Left", tags: ["Data Science"], platform: "HackerEarth", link: "#" },
  { id: 4, title: "FullStack Challenge", prizePool: "Swags", deadline: "10 Hours Left", tags: ["Web"], platform: "MLH", link: "#" },
  { id: 5, title: "Neural Network Cup", prizePool: "$8,000", deadline: "4 Days Left", tags: ["AI"], platform: "Devpost", link: "#" },
  { id: 6, title: "Chain Reaction", prizePool: "$3,500", deadline: "6 Days Left", tags: ["Blockchain"], platform: "Unstop", link: "#" }
];

function App() {
  // --- STATE MANAGEMENT ---
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [activePlatform, setActivePlatform] = useState("All Platforms");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Persistence: Initial load from LocalStorage so data survives refresh
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    const saved = localStorage.getItem("hackathon_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence: Save to LocalStorage whenever bookmarks update
  useEffect(() => {
    localStorage.setItem("hackathon_bookmarks", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // --- LOADER & TYPEWRITER LOGIC ---
  useEffect(() => {
    const title = "Hackathon Finder";
    const totalLoadTime = 3000; // 3 Seconds to match CSS animation

    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, totalLoadTime);

    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(title.slice(0, i));
      i++;
      if (i > title.length) clearInterval(typingInterval);
    }, 100);

    return () => {
      clearTimeout(loaderTimer);
      clearInterval(typingInterval);
    };
  }, []);

  // --- HANDLERS ---
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // --- TRIPLE-LAYER FILTERING LOGIC ---
  const filteredHackathons = MOCK_DATA.filter(hack => {
    const matchesDomain = activeDomain === "All" || hack.tags.includes(activeDomain);
    const matchesPlatform = activePlatform === "All Platforms" || hack.platform === activePlatform;
    const matchesSearch = hack.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesPlatform && matchesSearch;
  });

  const bookmarkedHackathons = MOCK_DATA.filter(hack => 
    bookmarkedIds.includes(hack.id)
  );

  // --- 1. RENDER: LOADER WITH PROGRESS BAR ---
  if (isLoading) {
    return (
      <div className="splash-screen">
        <h1 className="splash-title">
          {typedText}<span className="cursor">|</span>
        </h1>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text">Fetching latest hackathons...</p>
      </div>
    );
  }

  // --- 2. RENDER: MAIN DASHBOARD ---
  return (
    <div className="app-wrapper">
      {/* Moving Cinematic Background */}
      <div className="bg-animation"></div>

      {/* Top Right Fixed Bookmark Trigger */}
      <div className="top-right-actions">
        <button className="main-bookmark-trigger" onClick={() => setShowBookmarks(true)}>
          <span className="icon">🔖</span>
          {bookmarkedIds.length > 0 && <span className="badge">{bookmarkedIds.length}</span>}
        </button>
      </div>

      {/* Pop-out Bookmark Drawer */}
      <div className={`bookmark-drawer ${showBookmarks ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Saved Opportunities</h3>
          <button className="close-btn" onClick={() => setShowBookmarks(false)}>✕</button>
        </div>
        <div className="drawer-content">
          {bookmarkedHackathons.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📂</span>
              <p>No bookmarks yet. Save your first hackathon!</p>
            </div>
          ) : (
            bookmarkedHackathons.map(hack => (
              <div key={hack.id} className="drawer-detail-card">
                <div className="drawer-card-top">
                  <span className="drawer-platform">{hack.platform}</span>
                  <button className="drawer-remove-icon" onClick={() => toggleBookmark(hack.id)}>✕</button>
                </div>
                <h4 className="drawer-title">{hack.title}</h4>
                <div className="drawer-stats">
                  <div className="drawer-stat-item">
                    <span className="stat-icon">🏆</span>
                    <span className="stat-value">{hack.prizePool}</span>
                  </div>
                  <div className="drawer-stat-item">
                    <span className="stat-icon">⏳</span>
                    <span className="stat-value">{hack.deadline}</span>
                  </div>
                </div>
                <button className="drawer-view-btn" onClick={() => window.open(hack.link, "_blank")}>
                  Register Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drawer Overlay for closing when clicking outside */}
      {showBookmarks && <div className="drawer-overlay" onClick={() => setShowBookmarks(false)}></div>}

      {/* Centered Domain Navigation */}
      {/* Updated Top Navigation Bar */}
<header className="main-header">
  <div className="header-left">
    <div className="brand-logo">
      <span className="logo-icon">🚀</span>
      <h1 className="main-title">Hackathon <span className="highlight">Finder</span></h1>
    </div>
  </div>

  <div className="header-center">
    <div className="domain-nav">
      {["All", "AI", "Web", "Blockchain", "Data Science"].map(domain => (
        <button 
          key={domain}
          className={`nav-item ${activeDomain === domain ? "selected" : ""}`}
          onClick={() => setActiveDomain(domain)}
        >
          {domain}
        </button>
      ))}
    </div>
  </div>

  <div className="header-right">
    {/* This keeps the layout balanced since the bookmark trigger is fixed elsewhere */}
  </div>
</header>

      <main className="main-container">
        {/* Search & Platform Control Bar */}
        <div className="control-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="platform-filter">
            <select 
              value={activePlatform} 
              onChange={(e) => setActivePlatform(e.target.value)}
              className="styled-select"
            >
              <option value="All Platforms">All Platforms</option>
              <option value="Devpost">Devpost</option>
              <option value="Unstop">Unstop</option>
              <option value="MLH">MLH</option>
              <option value="HackerEarth">HackerEarth</option>
            </select>
          </div>
        </div>

        {/* 3-Column Hackathon Grid */}
        <div className="hackathon-grid">
          {filteredHackathons.map(hack => (
            <HackathonCard 
              key={hack.id} 
              hackathon={hack} 
              isBookmarked={bookmarkedIds.includes(hack.id)}
              onBookmark={() => toggleBookmark(hack.id)}
            />
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredHackathons.length === 0 && (
          <div className="no-results">
            <p>No hackathons found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;