import './Projects.css'

function Projects() {
  const projects = [
    {
      id: 1,
      title: '웹 포트폴리오',
      description: 'React와 Vite를 사용하여 만든 반응형 포트폴리오 웹사이트',
      tech: ['React', 'Vite', 'CSS3'],
      icon: '🎨',
      link: '#'
    },
    {
      id: 2,
      title: '할일 관리 앱',
      description: '실시간으로 할일을 관리하고 동기화할 수 있는 웹 애플리케이션',
      tech: ['React', 'Firebase', 'Material-UI'],
      icon: '📝',
      link: '#'
    },
    {
      id: 3,
      title: '날씨 앱',
      description: '실시간 날씨 정보를 제공하는 모바일 친화적 웹 앱',
      tech: ['React', 'API', 'CSS3'],
      icon: '☀️',
      link: '#'
    },
    {
      id: 4,
      title: '쇼핑몰 웹사이트',
      description: '전자상거래를 위한 반응형 쇼핑몰 플랫폼',
      tech: ['Next.js', 'Node.js', 'MongoDB'],
      icon: '🛒',
      link: '#'
    },
  ]

  return (
    <section className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                자세히 보기 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

