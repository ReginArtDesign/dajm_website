import React from "react"
import { motion } from "framer-motion"

// ===== ADATOK: SKILL LISTA =====
const SKILLS = [
  {
    name: "UX/UI Design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },
  {
    name: "User Research",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v2" />
        <path d="M11 14h.01" />
      </svg>
    )
  },
  {
    name: "Figma Pro",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d500f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
        <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
        <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
        <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
      </svg>
    )
  },
  {
    name: "Framer & Webflow",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d500f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
]

// ===== FŐ KOMPONENS =====
export default function AboutSection() {
  return (
    <section style={styles.sectionContainer}>
      <div style={styles.maxWidthWrapper}>
        
        <div style={styles.gridContainer}>
          
          {/* BAL OLDAL: KÉP ÉS GLOW EFFEKT */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={styles.imageColumn}
          >
            <div style={styles.imageWrapper}>
              {/* Mögöttes pink-lila világítás */}
              <div style={styles.imageGlow} />
              
              {/* Maga a kép */}
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="UX Designer Workspace" 
                style={styles.image}
              />
              
              {/* Üveg keret effekt a képen */}
              <div style={styles.imageOverlayBorder} />
            </div>
          </motion.div>

          {/* JOBB OLDAL: SZÖVEG ÉS SKILLEK */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={styles.textColumn}
          >
            <h4 style={styles.badge}>Rólam</h4>
            <h2 style={styles.title}>
              Kreatív vízió. <br />
              <span style={styles.gradientText}>Adatalapú döntések.</span>
            </h2>
            
            <p style={styles.description}>
              Senior UX Designerként és User Researcherként abban hiszek, hogy a valóban prémium digitális élmények a felhasználók mély megértésénél kezdődnek. 
              Szenvedélyem a komplex problémák lefordítása letisztult, intuitív és gyönyörű felületekké.
            </p>
            <p style={styles.description}>
              Legyen szó komplex webalkalmazások kutatásáról, wireframingről, vagy high-end animált oldalak felépítéséről modern eszközökkel, a célom mindig a maximális értékteremtés.
            </p>

            {/* SKILL GRID */}
            <div style={styles.skillsGrid}>
              {SKILLS.map((skill, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  style={styles.skillCard}
                >
                  <div style={styles.skillIconWrapper}>
                    {skill.icon}
                  </div>
                  <span style={styles.skillName}>{skill.name}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ===== STÍLUSOK (CSS in JS) =====
const styles: Record<string, React.CSSProperties> = {
  sectionContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#000000",
    padding: "100px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden"
  },
  maxWidthWrapper: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    zIndex: 2
  },
  
  // A Grid felel a reszponzivitásért (Auto-fit/Flex wrap hatás)
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "60px",
    alignItems: "center"
  },

  // --- KÉP OSZLOP ---
  imageColumn: {
    position: "relative",
    display: "flex",
    justifyContent: "center"
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "450px",
    aspectRatio: "4/5",
    borderRadius: "24px",
    transformStyle: "preserve-3d",
    perspective: "1000px"
  },
  imageGlow: {
    position: "absolute",
    inset: "-20px",
    background: "linear-gradient(135deg, #ff2a85 0%, #2563eb 50%, #d500f9 100%)",
    filter: "blur(40px)",
    opacity: 0.3,
    borderRadius: "24px",
    zIndex: 0
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "24px",
    position: "relative",
    zIndex: 1,
    boxShadow: "0 20px 40px rgba(0,0,0,0.8)"
  },
  imageOverlayBorder: {
    position: "absolute",
    inset: 0,
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
    zIndex: 2,
    pointerEvents: "none"
  },

  // --- SZÖVEG OSZLOP ---
  textColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  badge: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#ff2a85",
    padding: "6px 14px",
    border: "1px solid rgba(255, 42, 133, 0.3)",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 42, 133, 0.1)",
    marginBottom: "20px"
  },
  title: {
    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.1,
    marginBottom: "25px"
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff2a85, #d500f9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "rgba(255, 255, 255, 0.65)",
    marginBottom: "20px",
    fontWeight: 300
  },

  // --- SKILL GRID ---
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "30px"
  },
  skillCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    cursor: "default",
    transition: "background-color 0.3s ease"
  },
  skillIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  skillName: {
    color: "#ffffff",
    fontSize: "0.95rem",
    fontWeight: 500
  }
}
