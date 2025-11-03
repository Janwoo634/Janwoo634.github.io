import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <span className="logo-icon">🌟</span>
            <span className="logo-text">포트폴리오</span>
          </div>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                홈
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                소개
              </Link>
            </li>
            <li>
              <Link 
                to="/skills" 
                className={location.pathname === '/skills' ? 'active' : ''}
              >
                스킬
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className={location.pathname === '/projects' ? 'active' : ''}
              >
                프로젝트
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                연락처
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 포트폴리오. All rights reserved. 🌸</p>
      </footer>
    </div>
  )
}

export default Layout

