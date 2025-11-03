import './About.css'

function About() {
  return (
    <section className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="avatar">👨‍💻</div>
          </div>
          <div className="about-text">
            <h3>안녕하세요! 저는 개발자입니다 👋</h3>
            <p>
              열정적이고 창의적인 개발자로서, 끊임없이 배우고 성장하는 것을 좋아합니다.
              새로운 기술을 습득하고 실제 프로젝트에 적용하는 것이 제 가장 큰 즐거움입니다.
            </p>
            <p>
              사용자 중심의 설계와 깔끔한 코드 작성을 중요하게 생각하며,
              팀과의 협업을 통해 더 나은 결과물을 만들어가고 있습니다.
            </p>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">이름</span>
                <span className="detail-value">홍길동</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">이메일</span>
                <span className="detail-value">example@email.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">위치</span>
                <span className="detail-value">서울, 대한민국</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">직업</span>
                <span className="detail-value">프론트엔드 개발자</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

