import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

// ===== FŐ KOMPONENS =====
export default function AboutSection({ badgeText, titleStart, titleHighlight, desc1, desc2, profileImage }: any) {
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
              
              {/* Maga a kép dinamikus propból */}
              <img 
                src={profileImage || "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800&h=1000"} 
                alt="Profile Workspace" 
                style={styles.image}
              />
              
              {/* Üveg keret effekt a képen */}
              <div style={styles.imageOverlayBorder} />
            </div>
          </motion.div>

          {/* JOBB OLDAL: DINAMIKUS SZÖVEGEK */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={styles.textColumn}
          >
            <h4 style={styles.badge}>{badgeText}</h4>
            <h2 style={styles.title}>
              {titleStart} <br />
              <span style={styles.gradientText}>{titleHighlight}</span>
            </h2>
            
            <p style={styles.description}>{desc1}</p>
            <p style={styles.description}>{desc2}</p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ===== PROPERTY CONTROLS (Szerkeszthető felület a jobb panelen) =====
addPropertyControls(AboutSection, {
  badgeText: { 
    type: ControlType.String, 
    title: "Címke", 
    defaultValue: "Rólam" 
  },
  titleStart: { 
    type: ControlType.String, 
    title: "Cím eleje", 
    defaultValue: "Kreatív vízió." 
  },
  titleHighlight: { 
    type: ControlType.String, 
    title: "Kiemelt szó", 
    defaultValue: "Adatalapú döntések." 
  },
  desc1: { 
    type: ControlType.String, 
    title: "1. Bekezdés", 
    defaultValue: "Senior UX Designerként és User Researcherként abban hiszek, hogy a valóban prémium digitális élmények a felhasználók mély megértésénél kezdődnek.", 
    displayTextArea: true 
  },
  desc2: { 
    type: ControlType.String, 
    title: "2. Bekezdés", 
    defaultValue: "Legyen szó komplex webalkalmazások kutatásáról, wireframingről, vagy high-end animált oldalak felépítéséről modern eszközökkel, a célom mindig a maximális értékteremtés.", 
    displayTextArea: true 
  },
  profileImage: { 
    type: ControlType.Image, 
    title: "Profilkép" 
  }
})

// ===== STÍLUSOK (Változatlanul) =====
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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "60px",
    alignItems: "center"
  },
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
  }
}
