import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaJava, FaAndroid, FaGithub, FaLinkedin,
  FaEnvelope, FaGlobe, FaCss3Alt, FaCode,
  FaWhatsapp, FaDownload, FaPhone, FaTimes
} from "react-icons/fa"
import { SiHtml5, SiSpringboot, SiQt } from "react-icons/si"
import profilePic from "./assets/Gk_profile.jpeg"
import resume from "./assets/Ganeshkumar's_Resume.pdf"

export default function App() {

  const roles = [
    "Software Developer",
    "Java Full Stack Developer",
    "Android Application Developer",
    "Web Application Developer (QT/QML)"
  ]

  const [index, setIndex] = useState(0)
  const [dark, setDark] = useState(false)
  const [repos, setRepos] = useState([])
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.className = dark ? "dark" : ""
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("show")
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll(".section").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetch("https://api.github.com/users/Gkinfobox/repos")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const top = data.filter(repo => !repo.fork).slice(0, 6)
          setRepos(top)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setShowProfile(false) }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  const skills = [
    { name: "Java", icon: <FaJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "Android", icon: <FaAndroid /> },
    { name: "QT / QML", icon: <SiQt /> },
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <FaCss3Alt /> },
    { name: "JavaScript", icon: <FaCode /> },
  ]

  return (
    <div>

      {/* FLOATING PARTICLES */}
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <span key={i} style={{
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 20 + "s"
          }} />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <button onClick={() => setDark(!dark)} className="theme-btn">
            {dark ? "☀️" : "🌙"}
          </button>
          <div className="nav-links">
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-avatar-wrap" onClick={() => setShowProfile(true)} title="View Profile">
            <img src={profilePic} alt="Ganesh Kumar" className="nav-avatar" />
          </div>
        </div>
      </nav>

      {/* PROFILE POPUP MODAL */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              className="profile-modal"
              initial={{ scale: 0.75, opacity: 0, y: -30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowProfile(false)}>
                ✕
              </button>

              <div className="modal-img-wrap">
                <img src={profilePic} alt="Ganesh Kumar" className="modal-img" />
              </div>

              <h2 className="modal-name">Ganesh Kumar S</h2>
              <p className="modal-role">Software Developer - Java & Android</p>
              <p className="modal-company">Daloft Aerospace · IIT Madras</p>

              <div className="modal-details">
                <a href="tel:+919344030421" className="modal-detail-row">
                  <FaPhone className="modal-detail-icon" />
                  <span>+91 93440 30421</span>
                </a>
                <a href="mailto:gkumardetails@gmail.com" className="modal-detail-row">
                  <FaEnvelope className="modal-detail-icon" />
                  <span>gkumardetails@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/ganeshkumarsakthivel" target="_blank" rel="noreferrer" className="modal-detail-row">
                  <FaLinkedin className="modal-detail-icon" />
                  <span>linkedin.com/in/ganeshkumarsakthivel</span>
                </a>
                <a href="https://github.com/Gkinfobox" target="_blank" rel="noreferrer" className="modal-detail-row">
                  <FaGithub className="modal-detail-icon" />
                  <span>github.com/Gkinfobox</span>
                </a>
                <a href="https://wa.me/919344030421" target="_blank" rel="noreferrer" className="modal-detail-row">
                  <FaWhatsapp className="modal-detail-icon" style={{ color: "#25d366" }} />
                  <span>WhatsApp Me</span>
                </a>
              </div>

              <a href={resume} download="Ganeshkumar's_Resume.pdf" className="modal-download-btn">
                <FaDownload style={{ marginRight: "8px" }} /> Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ganeshkumar S
        </motion.h1>

        <div className="role-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="role"
            >
              {roles[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Software Developer specializing in Java Full Stack, with hands-on experience in Spring Boot, Android, Qt/QML, and modern web technologies. 
          Passionate about building scalable, high-performance applications and solving real-world problems.
        </motion.p>

        <motion.div
          className="buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <button className="btn primary" onClick={() => setShowProfile(true)}>Get In Touch</button>
          <a href="#projects">
            <button className="btn secondary">View Projects</button>
          </a>
          <a href={resume} download="Ganeshkumar_Resume.pdf">
            <button className="btn resume-btn">
              <FaDownload style={{ marginRight: "8px", fontSize: "13px" }} />
              Download Resume
            </button>
          </a>
        </motion.div>
      </section>

      {/* TECH ICONS */}
      <section className="tech-icons">
        <motion.div
          className="icon-row"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {[
            { icon: <FaJava />, label: "Java" },
            { icon: <SiHtml5 />, label: "HTML5" },
            { icon: <FaCss3Alt />, label: "CSS3" },
            { icon: <FaAndroid />, label: "Android" },
            { icon: <FaGlobe />, label: "Web" },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ scale: 1.3, rotate: 10 }} className="icon" title={item.label}>
              {item.icon}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="card skill-card"
              whileHover={{ scale: 1.07 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-name">{skill.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <h2>Experience</h2>
        <div className="timeline">
          <motion.div className="timeline-item" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3>Software Developer</h3>
            <p className="timeline-company">Daloft Aerospace — IIT Madras · May 2025 – Present</p>
            <p className="timeline-desc">Developed Qt/QML-based Ground Control System for drone operations and telemetry visualization.</p>
          </motion.div>
          <motion.div className="timeline-item" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3>Software Developer Intern</h3>
            <p className="timeline-company">Daloft Aerospace — IIT Madras · Nov 2024 – May 2025</p>
            <p className="timeline-desc">Built Android apps with Firebase and AWS, created responsive web pages, collaborated on real-world projects.</p>
          </motion.div>
          <motion.div className="timeline-item" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3>Associate Backend Developer</h3>
            <p className="timeline-company">GRT Jewellery, T.Nagar Chennai · Jul 2023 – Jun 2024</p>
            <p className="timeline-desc">Developed and maintained scalable Java applications, writing clean and efficient code while managing MySQL databases, optimizing queries, and handling the full SDLC from requirement gathering and analysis through to design and deployment.</p>
          </motion.div>
          
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        {repos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>Loading projects from GitHub...</p>
        ) : (
          <div className="projects">
            {repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                className="card project-card"
                whileHover={{ y: -10, scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description provided."}</p>
                <a href={repo.html_url} target="_blank" rel="noreferrer">View on GitHub →</a>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <h2>Contact</h2>
        <p style={{ color: "#555", marginBottom: "30px" }}>
          Let's connect and build something great together!
        </p>
        <div className="contact-icons">
          <a href="mailto:gkumardetails@gmail.com" title="Email"><FaEnvelope /></a>
          <a href="https://github.com/Gkinfobox" target="_blank" rel="noreferrer" title="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/ganeshkumarsakthivel" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin /></a>
          <a href="https://wa.me/919344030421" target="_blank" rel="noreferrer" title="WhatsApp"><FaWhatsapp /></a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "30px", color: "#aaa", fontSize: "14px" }}>
        © 2026 Ganeshkumar S
      </footer>

    </div>
  )
}
