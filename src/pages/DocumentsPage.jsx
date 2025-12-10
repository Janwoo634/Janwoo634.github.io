import { useNavigate } from 'react-router-dom';
import './DocumentsPage.css';

function DocumentsPage() {
  const navigate = useNavigate();

  // サンプル文書データ
  const sampleDocuments = [
    {
      id: 1,
      name: 'Project Proposal',
      type: 'PDF',
      size: '2.3 MB',
      date: '2024-01-15',
      content: 'This is a sample project proposal document...'
    },
    {
      id: 2,
      name: 'Meeting Notes',
      type: 'DOCX',
      size: '1.8 MB',
      date: '2024-01-14',
      content: 'Meeting notes from the team discussion...'
    },
    {
      id: 3,
      name: 'Financial Report',
      type: 'XLSX',
      size: '3.5 MB',
      date: '2024-01-13',
      content: 'Quarterly financial report and analysis...'
    },
    {
      id: 4,
      name: 'Presentation Deck',
      type: 'PPTX',
      size: '5.2 MB',
      date: '2024-01-12',
      content: 'Company presentation slides...'
    },
    {
      id: 5,
      name: 'Contract Agreement',
      type: 'PDF',
      size: '1.5 MB',
      date: '2024-01-11',
      content: 'Legal contract document...'
    },
    {
      id: 6,
      name: 'Research Paper',
      type: 'DOCX',
      size: '4.1 MB',
      date: '2024-01-10',
      content: 'Academic research paper on technology...'
    },
  ];

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'PDF':
        return '📕';
      case 'DOCX':
        return '📄';
      case 'XLSX':
        return '📊';
      case 'PPTX':
        return '📽️';
      default:
        return '📄';
    }
  };

  const handleDownload = (doc) => {
    // サンプル文書をダウンロード可能な形式で生成
    const content = `Sample ${doc.type} Document\n\n${doc.name}\n\n${doc.content}\n\nCreated: ${doc.date}\nSize: ${doc.size}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name}.txt`; // 実際のアプリでは適切な拡張子を使用
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="documents-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
        <h1>Documents</h1>
        <p className="page-subtitle">190 files</p>
      </div>

      <div className="documents-list">
        {sampleDocuments.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-icon-large">
              {getDocumentIcon(doc.type)}
            </div>
            <div className="document-info">
              <h3>{doc.name}</h3>
              <p>{doc.type} file • {doc.size} • {doc.date}</p>
            </div>
            <div className="document-actions">
              <button
                className="download-btn-doc"
                onClick={() => handleDownload(doc)}
                title="Download"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocumentsPage;

