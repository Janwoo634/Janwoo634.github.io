import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('메시지가 전송되었습니다! (이것은 데모입니다)')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { icon: '📧', label: '이메일', value: 'example@email.com' },
    { icon: '📞', label: '전화', value: '010-1234-5678' },
    { icon: '📍', label: '위치', value: '서울, 대한민국' },
    { icon: '💼', label: '링크드인', value: 'linkedin.com/in/example' },
  ]

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>언제든지 연락주세요! 💌</h3>
            <p>함께 일할 수 있는 기회를 만들어요</p>
            <div className="info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <span className="info-icon">{info.icon}</span>
                  <div className="info-details">
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="홍길동"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="메시지를 입력해주세요..."
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              보내기 ✉️
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

