import { useNavigate } from 'react-router-dom';
import './PicturesPage.css';

function PicturesPage() {
  const navigate = useNavigate();

  // サンプル写真データ（実際の画像URLを使用）
  const samplePictures = [
    {
      id: 1,
      name: 'Nature Landscape',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      size: '2.5 MB',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'City Skyline',
      url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop',
      size: '3.1 MB',
      date: '2024-01-14'
    },
    {
      id: 3,
      name: 'Ocean View',
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
      size: '2.8 MB',
      date: '2024-01-13'
    },
    {
      id: 4,
      name: 'Mountain Range',
      url: 'https://images.unsplash.com/photo-1464822759844-d150ad6d0afa?w=800&h=600&fit=crop',
      size: '3.5 MB',
      date: '2024-01-12'
    },
    {
      id: 5,
      name: 'Forest Path',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      size: '2.2 MB',
      date: '2024-01-11'
    },
    {
      id: 6,
      name: 'Sunset Beach',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
      size: '2.9 MB',
      date: '2024-01-10'
    },
  ];

  const handleDownload = async (picture) => {
    try {
      const response = await fetch(picture.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${picture.name}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('ダウンロードに失敗しました');
    }
  };

  return (
    <div className="pictures-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
        <h1>Pictures</h1>
        <p className="page-subtitle">480 files</p>
      </div>

      <div className="pictures-grid">
        {samplePictures.map((picture) => (
          <div key={picture.id} className="picture-card">
            <div className="picture-thumbnail">
              <img src={picture.url} alt={picture.name} />
              <div className="picture-overlay">
                <button
                  className="download-btn"
                  onClick={() => handleDownload(picture)}
                  title="Download"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div className="picture-info">
              <h3>{picture.name}</h3>
              <p>{picture.size} • {picture.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PicturesPage;

