import React from 'react';

const HackathonCard = ({ hackathon, isBookmarked, onBookmark }) => {
  return (
    <div className="hack-card">
      <div className="card-header">
        <span className="platform-tag">{hackathon.platform}</span>
        {/* THIS IS THE CRITICAL LINE */}
        <button 
          className={`bookmark-btn ${isBookmarked ? 'active' : ''}`} 
          onClick={(e) => {
            e.stopPropagation(); 
            onBookmark(); // This sends the signal back to App.jsx
          }}
        >
          {isBookmarked ? '★' : '☆'}
        </button>
      </div>

      <h3 className="hack-title">{hackathon.title}</h3>

      <div className="tags-container">
        {hackathon.tags.map((tag, index) => (
          <span key={index} className="domain-tag">{tag}</span>
        ))}
      </div>

      <div className="hack-details">
        <div className="detail-row">🏆 {hackathon.prizePool}</div>
        <div className="detail-row">⏳ {hackathon.deadline}</div>
      </div>

      <button className="register-now-btn" onClick={() => window.open(hackathon.link, "_blank")}>
        Register Now
      </button>
    </div>
  );
};

export default HackathonCard;