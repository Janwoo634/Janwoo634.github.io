import './RightColumn.css';

function RightColumn() {
  return (
    <div className="right-column">
      <div className="add-files-card">
        <div className="add-files-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <p>Add new files</p>
      </div>
      
      <div className="storage-card">
        <h3>Your storage</h3>
        <div className="storage-info">
          <span className="storage-left">25% left</span>
          <p className="storage-details">75 GB of 100 GB are used</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '75%' }}></div>
        </div>
      </div>
      
      <div className="shared-folders-card">
        <h3>Your shared folders</h3>
        <div className="shared-folder-list">
          <div className="shared-folder-item" style={{ background: '#E3F2FD' }}>
            <span>Keynote files</span>
            <div className="folder-avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>
          </div>
          <div className="shared-folder-item" style={{ background: '#F3E5F5' }}>
            <span>Vacation photos</span>
            <div className="folder-avatars">
              <div className="avatar"></div>
            </div>
          </div>
          <div className="shared-folder-item" style={{ background: '#FCE4EC' }}>
            <span>Project report</span>
            <div className="folder-avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>
          </div>
        </div>
        <button className="add-more-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add more
        </button>
      </div>
    </div>
  );
}

export default RightColumn;

