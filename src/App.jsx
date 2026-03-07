import React,{useEffect,useState} from "react"
import {motion} from "framer-motion"
import {
FaJava,
FaReact,
FaAndroid,
FaGithub,
FaLinkedin,
FaEnvelope
} from "react-icons/fa"


export default function App(){

/* =============================
TYPEWRITER
============================= */

const roles=[
"Java Full Stack Developer",
"Android Developer",
"Qt / QML Developer",
"Backend Engineer"
]

const[text,setText]=useState("")
const[index,setIndex]=useState(0)
const[subIndex,setSubIndex]=useState(0)
const[deleting,setDeleting]=useState(false)

useEffect(()=>{
const timeout=setTimeout(()=>{

if(!deleting && subIndex===roles[index].length){
setDeleting(true)
return
}

if(deleting && subIndex===0){
setDeleting(false)
setIndex((prev)=>(prev+1)%roles.length)
return
}

setSubIndex((prev)=>prev+(deleting?-1:1))
setText(roles[index].substring(0,subIndex))

},deleting?40:90)

return()=>clearTimeout(timeout)

},[subIndex,index,deleting])

/* =============================
GITHUB PROJECT LOADER
============================= */

const [repos,setRepos]=useState([])

useEffect(()=>{

fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
.then(res=>res.json())
.then(data=>{

const top=data
.filter(repo=>!repo.fork)
.slice(0,6)

setRepos(top)

})

},[])

/* =============================
THEME
============================= */

const [dark,setDark]=useState(false)

useEffect(()=>{
document.body.className = dark ? "dark" : ""
},[dark])

/* =============================
RETURN
============================= */

return(

<div>

{/* PARTICLES */}

<div className="particles">
{[...Array(30)].map((_,i)=>(
<span key={i} style={{
left:Math.random()*100+"%",
animationDelay:Math.random()*20+"s"
}}/>
))}
</div>

{/* NAVBAR */}

<nav className="navbar">
<div className="nav-container">

<h2>GK</h2>

<div className="nav-links">

<a href="#skills">Skills</a>
<a href="#experience">Experience</a>
<a href="#projects">Projects</a>
<a href="#contact">Contact</a>

<button
onClick={()=>setDark(!dark)}
className="theme-btn"
>
{dark ? "☀️" : "🌙"}
</button>

</div>
</div>
</nav>


{/* HERO */}

<section className="hero">

<motion.h1
initial={{opacity:0,y:80}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>
Ganesh Kumar
</motion.h1>

<div className="role">{text}|</div>

<p>
Passionate developer building modern applications using Java,
Qt/QML, Android and modern web technologies.
</p>

</section>

{/* =============================
FLOATING TECH ICONS
============================= */}

<section className="tech-icons">

<motion.div
className="icon-row"
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:1}}
viewport={{once:true}}
>

<motion.div whileHover={{scale:1.3}} className="icon"><FaJava/></motion.div>
<motion.div whileHover={{scale:1.3}} className="icon"><FaReact/></motion.div>
<motion.div whileHover={{scale:1.3}} className="icon"><FaAndroid/></motion.div>

</motion.div>

</section>


{/* =============================
SKILLS
============================= */}

<section id="skills" className="section">

<h2>Skills</h2>

<div className="skills">

{["Java","Spring Boot","Android","Qt/QML","React","JavaScript"].map(skill=>(

<motion.div
key={skill}
className="card"
whileHover={{scale:1.07}}
>
{skill}
</motion.div>

))}

</div>

</section>


{/* =============================
EXPERIENCE TIMELINE
============================= */}

<section id="experience" className="section">

<h2>Experience</h2>

<div className="timeline">

<motion.div
className="timeline-item"
initial={{opacity:0,x:-50}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>
<h3>Software Developer</h3>
<p>Drone Ground Control Systems</p>
</motion.div>

<motion.div
className="timeline-item"
initial={{opacity:0,x:50}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>
<h3>Android Developer</h3>
<p>Building mobile applications</p>
</motion.div>

</div>

</section>


{/* =============================
PROJECTS (AUTO GITHUB)
============================= */}

<section id="projects" className="section">

<h2>Projects</h2>

<div className="projects">

{repos.map(repo=>(

<motion.div
key={repo.id}
className="card project-card"
whileHover={{y:-10,scale:1.03}}
>

<h3>{repo.name}</h3>

<p>{repo.description}</p>

<a
href={repo.html_url}
target="_blank"
rel="noreferrer"
>
View on GitHub
</a>

</motion.div>

))}

</div>

</section>


{/* =============================
CONTACT
============================= */}

<section id="contact" className="section contact">

<h2>Contact</h2>

<div className="contact-icons">

<a href="mailto:your@email.com">
<FaEnvelope/>
</a>

<a href="https://github.com/YOUR_GITHUB_USERNAME">
<FaGithub/>
</a>

<a href="https://linkedin.com">
<FaLinkedin/>
</a>

</div>

</section>

</div>

)

}