import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      category: '프론트엔드',
      icon: '💻',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 75 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Vite', level: 80 },
      ]
    },
    {
      category: '백엔드',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'Python', level: 65 },
        { name: 'Express', level: 75 },
      ]
    },
    {
      category: '도구',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 70 },
        { name: 'Docker', level: 60 },
      ]
    },
  ]

  return (
    <section className="skills-section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.category}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-name-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

