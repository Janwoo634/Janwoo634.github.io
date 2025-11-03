import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-emoji">👋</div>
        <h1 className="hero-title">안녕하세요!</h1>
        <h2 className="hero-subtitle">저는 <span className="highlight">개발자</span>입니다</h2>
        <p className="hero-description">
          창의적이고 열정적인 개발자로, 새로운 기술을 배우고
          <br />
          도전하는 것을 좋아합니다. 함께 멋진 프로젝트를 만들어봐요! 🚀
        </p>
        <div className="hero-buttons">
          <Link to="/about" className="cta-button primary">
            더 알아보기 →
          </Link>
          <Link to="/contact" className="cta-button secondary">
            연락하기
          </Link>
        </div>
      </div>
      <div className="hero-decoration">
        <span className="float-emoji" style={{ '--delay': '0s' }}>✨</span>
        <span className="float-emoji" style={{ '--delay': '1s' }}>💫</span>
        <span className="float-emoji" style={{ '--delay': '2s' }}>⭐</span>
        <span className="float-emoji" style={{ '--delay': '3s' }}>🌟</span>
      </div>
    </section>
  )
}

export default Home

