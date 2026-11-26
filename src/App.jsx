import { useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, X, Code2, Database, Globe, Layers, GraduationCap,
  BriefcaseBusiness, Send, CheckCircle2, Sparkles
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "FocusBoard",
    type: "Productivity Web App",
    description: "A clean task management dashboard to create, organise and track daily work with priorities and progress.",
    stack: ["React", "JavaScript", "CSS", "Local Storage"],
    icon: Layers
  },
  {
    number: "02",
    name: "Student Report Card",
    type: "Academic Web App",
    description: "A student result interface that presents semester performance and calculates GPA and CGPA.",
    stack: ["React", "JavaScript", "CSS"],
    icon: GraduationCap
  },
  {
    number: "03",
    name: "Developer Portfolio",
    type: "Personal Website",
    description: "A responsive portfolio that introduces my background, skills, projects and ways to connect.",
    stack: ["React", "Express", "MongoDB"],
    icon: Code2
  }
];

const skills = [
  { name: "Java", group: "Programming" },
  { name: "Python", group: "Programming" },
  { name: "HTML", group: "Frontend" },
  { name: "CSS", group: "Frontend" },
  { name: "JavaScript", group: "Frontend" },
  { name: "React", group: "Frontend" },
  { name: "SQL", group: "Database" },
  { name: "MySQL", group: "Database" }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSending(true);
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send message.");
      setNotice(data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setNotice(error.message || "Server is unavailable. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">P</span>
          <span>priyadharshini<span className="brand-dot">.</span></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE TO LEARN & COLLABORATE</div>
            <p className="hero-small">Hello, I'm</p>
            <h1>Priyadharshini <span>RP.</span></h1>
            <h2>Computer Science Student <span className="muted-and">&</span><br /><span className="gradient-text">Aspiring Full-Stack Developer</span></h2>
            <p className="hero-description">
              I enjoy turning ideas into useful digital experiences. I’m learning, building
              and improving one project at a time.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowRight size={16} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="mailto:your-email@example.com" aria-label="Email"><Mail size={18} /></a>
              <span className="social-note">Connect with me</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="code-window">
              <div className="window-bar"><span></span><span></span><span></span><small>developer.js</small></div>
              <div className="code-lines">
                <p><span className="code-purple">const</span> developer = {"{"}</p>
                <p className="indent"><span className="code-blue">name</span>: <span className="code-green">"Priyadharshini"</span>,</p>
                <p className="indent"><span className="code-blue">role</span>: <span className="code-green">"Student"</span>,</p>
                <p className="indent"><span className="code-blue">focus</span>: [</p>
                <p className="indent2"><span className="code-green">"Web Development"</span>,</p>
                <p className="indent2"><span className="code-green">"Problem Solving"</span></p>
                <p className="indent">],</p>
                <p className="indent"><span className="code-blue">learning</span>: <span className="code-purple">true</span></p>
                <p>{"}"};</p>
                <p className="code-comment">// building my next idea...</p>
              </div>
              <div className="window-footer"><span><span className="status-dot" /> All systems curious</span><span>01 / 04</span></div>
            </div>
            <div className="floating-chip chip-top"><Code2 size={16} /> Creative coding</div>
            <div className="floating-chip chip-bottom"><Sparkles size={16} /> Always learning</div>
          </div>
          <a href="#about" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
        </section>

        <section className="about section-wrap section-space" id="about">
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <h2>A little about <span>me.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-intro">
              <p className="large-copy">I’m a <span>2nd-year B.E. Computer Science and Engineering student</span> with a growing interest in building web applications.</p>
              <p className="body-copy">I like learning how websites work, practising programming and creating projects that solve everyday problems. My current goal is to strengthen my frontend, backend and database skills through hands-on development.</p>
            </div>
            <div className="about-details">
              <div className="detail-card"><GraduationCap /><div><small>EDUCATION</small><strong>B.E. Computer Science & Engineering</strong><span>2nd Year</span></div></div>
              <div className="detail-card"><BriefcaseBusiness /><div><small>CURRENT LEARNING</small><strong>Full-Stack Development</strong><span>Thiranex Internship</span></div></div>
              <div className="detail-card"><Globe /><div><small>BASED IN</small><strong>Tamil Nadu, India</strong><span>Open to learning opportunities</span></div></div>
            </div>
          </div>
        </section>

        <section className="skills section-wrap section-space" id="skills">
          <div className="section-heading">
            <span className="section-index">02 / SKILLS</span>
            <h2>Tools I work <span>with.</span></h2>
            <p className="section-subtitle">Technologies I have learned and continue to practise.</p>
          </div>
          <div className="skill-grid">
            {skills.map((skill, index) => (
              <div className="skill-card" key={skill.name}>
                <span className="skill-number">0{index + 1}</span>
                <strong>{skill.name}</strong>
                <small>{skill.group}</small>
              </div>
            ))}
          </div>
          <div className="learning-strip"><Database size={18} /><span>Currently strengthening my backend and database development skills.</span></div>
        </section>

        <section className="projects section-wrap section-space" id="projects">
          <div className="section-heading heading-row">
            <div><span className="section-index">03 / SELECTED WORK</span><h2>Things I've <span>built.</span></h2></div>
            <span className="work-count">03 PROJECTS</span>
          </div>
          <div className="project-list">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <article className="project-card" key={project.number}>
                  <div className="project-number">{project.number}</div>
                  <div className="project-icon"><Icon size={24} /></div>
                  <div className="project-info">
                    <span className="project-type">{project.type}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <span className="project-arrow" aria-label="Project details"><ArrowUpRight size={21} /></span>
                </article>
              );
            })}
          </div>
          <p className="project-note">Project descriptions are summaries. Add your GitHub repository and live-demo links when they are ready.</p>
        </section>

        <section className="experience section-wrap section-space">
          <div className="section-heading">
            <span className="section-index">04 / EXPERIENCE</span>
            <h2>Learning by <span>doing.</span></h2>
          </div>
          <div className="experience-card">
            <div className="experience-mark">T</div>
            <div className="experience-content">
              <span className="project-type">INTERNSHIP · 2026</span>
              <h3>Full Stack Development Intern</h3>
              <p>Thiranex</p>
              <p className="body-copy">Working through practical web development tasks, from building a personal portfolio to developing full-stack applications.</p>
            </div>
            <span className="experience-status"><span className="status-dot" /> In progress</span>
          </div>
        </section>

        <section className="contact section-wrap section-space" id="contact">
          <div className="contact-panel">
            <div className="contact-copy">
              <span className="section-index">05 / CONTACT</span>
              <h2>Have an idea?<br /><span>Let's connect.</span></h2>
              <p>I’m happy to connect, learn and discuss ideas related to technology and web development.</p>
              <a className="contact-email" href="mailto:your-email@example.com"><Mail size={17} /> your-email@example.com</a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Your name<input required minLength="2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" /></label>
              <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Your message<textarea required minLength="10" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Write your message..." /></label>
              <button className="button button-primary submit-button" disabled={sending}>{sending ? "Sending..." : "Send message"} <Send size={16} /></button>
              {notice && <p className="form-notice"><CheckCircle2 size={16} /> {notice}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">P</span><span>priyadharshini<span className="brand-dot">.</span></span></a>
        <span>Designed & built with curiosity · © 2026</span>
        <a href="#home" className="back-top">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
