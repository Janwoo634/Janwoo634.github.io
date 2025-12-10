import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const categories = [
    { id: 'pictures', name: 'Pictures', files: 480, icon: '📷', color: '#9C27B0' },
    { id: 'documents', name: 'Documents', files: 190, icon: '📄', color: '#009688' },
    { id: 'videos', name: 'Videos', files: 30, icon: '🎥', color: '#E91E63' },
    { id: 'audio', name: 'Audio', files: 80, icon: '🎤', color: '#2196F3' },
  ];

  const files = [
    { id: 'work', name: 'Work', files: 820, icon: '📋' },
    { id: 'personal', name: 'Personal', files: 115, icon: '👤' },
    { id: 'school', name: 'School', files: 65, icon: '🎓' },
    { id: 'archive', name: 'Archive', files: 21, icon: '📦' },
  ];

  const recentFiles = [
    { id: 1, name: 'IMG_100000', type: 'PNG file', size: '5 MB', icon: '📷' },
    { id: 2, name: 'Startup pitch', type: 'AVI file', size: '105 MB', icon: '🎥' },
    { id: 3, name: 'Freestyle beat', type: 'MP3 file', size: '21 MB', icon: '🎤' },
    { id: 4, name: 'Work proposal', type: 'DOCX file', size: '500 kb', icon: '📄' },
  ];

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'pictures') {
      navigate('/pictures');
    } else if (categoryId === 'documents') {
      navigate('/documents');
    }
  };

  return (
    <div className="home-page">
      <div className="search-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="M21 21l-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Search" />
      </div>

      <section className="categories-section">
        <h2>Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              style={{ background: category.color }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.files} files</p>
              </div>
              {category.id === 'pictures' && (
                <svg className="star-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="files-section">
        <h2>Files</h2>
        <div className="files-grid">
          {files.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-icon">{file.icon}</div>
              <div className="file-info">
                <h3>{file.name}</h3>
                <p>{file.files} files</p>
              </div>
            </div>
          ))}
          <div className="file-card add-new-card">
            <div className="file-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-files-section">
        <h2>Recent files</h2>
        <div className="recent-files-list">
          {recentFiles.map((file) => (
            <div key={file.id} className="recent-file-item">
              <div className="file-icon-small">{file.icon}</div>
              <div className="file-details">
                <h4>{file.name}</h4>
                <p>{file.type} • {file.size}</p>
              </div>
              <div className="file-actions">
                <button className="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </button>
                <button className="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;

