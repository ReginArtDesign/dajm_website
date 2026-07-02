import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

export default function PortfolioSection({ badgeText, titleStart, titleHighlight, buttonText, items }: any) {
  return (
    <section style={styles.sectionContainer}>
      <div style={styles.maxWidthWrapper}>
        
        {/* FEJLÉC */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.badge}
          >
            {badgeText}
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={styles.sectionTitle}
          >
            {titleStart} <span style={styles.gradientText}>{titleHighlight}</span>
          </motion.h2>
        </div>

        {/* PORTFÓLIÓ GRID */}
        <div style={styles.gridContainer}>
          {items.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover="hover"
              style={styles.cardWrapper}
            >
              {/* Media Konténer */}
              <div style={styles.mediaContainer}>
                {item.mediaType === "video" && item.videoUrl ? (
                  <video 
                    src={item.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    style={styles.mediaElement} 
                  />
                ) : (
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"} 
                    alt={item.title} 
                    style={styles.mediaElement} 
                  />
                )}
                
                <div style={styles.gradientOverlay} />
              </div>

              {/* Szöveges tartalom */}
              <motion.div 
                variants={{
                  hover: { y: -5 }
                }}
                transition={{ duration: 0.3 }}
                style={styles.cardContent}
              >
                <span style={styles.categoryBadge}>{item.category}</span>
                
                <h3 style={styles.title}>{item.title}</h3>
                
                <motion.div 
                  variants={{
                    hover: { opacity: 1, x: 5 }
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  style={styles.actionRow}
                >
                  <span style={styles.actionText}>Részletek</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
              
              <div style={styles.glassBorder} />
            </motion.div>
          ))}
        </div>

        {/* Fő CTA gomb alul */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.viewAllButton}
          >
            {buttonText}
          </motion.button>
        </div>

      </div>
    </section>
  )
}

// ===== PROPERTY CONTROLS =====
addPropertyControls(PortfolioSection, {
  badgeText: { type: ControlType.String, title: "Címke", defaultValue: "Munkáim" },
  titleStart: { type: ControlType.String, title: "Cím eleje", defaultValue: "Kiemelt" },
  titleHighlight: { type: ControlType.String, title: "Kiemelt szó", defaultValue: "Projektek." },
  buttonText: { type: ControlType.String, title: "Gomb Szöveg", defaultValue: "Összes munka megtekintése" },
  items: {
    type: ControlType.Array,
    title: "Portfólió Kártyák",
    control: {
      type: ControlType.Object,
      controls: {
        title: { type: ControlType.String, title: "Cím", defaultValue: "Új Projekt" },
        category: { type: ControlType.String, title: "Kategória", defaultValue: "Web Design" },
        mediaType: { 
          type: ControlType.Enum, 
          options: ["image", "video"], 
          optionTitles: ["Kép", "Videó"], 
          title: "Média Típus", 
          defaultValue: "image" 
        },
        image: { 
          type: ControlType.Image, 
          title: "Borítókép", 
          hidden: (props) => props.mediaType === "video" 
        },
        videoUrl: { 
          type: ControlType.String, 
          title: "Videó URL (.mp4)", 
          hidden: (props) => props.mediaType === "image" 
        }
      }
    },
    defaultValue: [
      { 
        title: "Fintech Dashboard", 
        category: "UX/UI Design & Kutatás", 
        mediaType: "video", 
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-plexus-background-27680-large.mp4", 
        image: "" 
      },
      { 
        title: "Adatvizualizációs App", 
        category: "Web App Design", 
        mediaType: "image", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
      }
    ]
  }
})

// ===== STÍLUSOK =====
const styles: Record<string, React.CSSProperties> = { 
  sectionContainer: { width: "100%", minHeight: "100vh", backgroundColor: "#000000", padding: "100px 20px", position: "relative", fontFamily: "'Inter', sans-serif", overflow: "hidden" }, 
  maxWidthWrapper: { width: "100%", maxWidth: "1200px", margin: "0 auto", zIndex: 2, position: "relative" }, 
  badge: { display: "inline-block", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#ff2a85", padding: "6px 14px", border: "1px solid rgba(255, 42, 133, 0.3)", borderRadius: "20px", backgroundColor: "rgba(255, 42, 133, 0.1)", margin: "0 0 15px 0" }, 
  sectionTitle: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#ffffff", margin: 0 }, 
  gradientText: { background: "linear-gradient(90deg, #ff2a85, #d500f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }, 
  gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", width: "100%" }, 
  cardWrapper: { position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: "24px", overflow: "hidden", cursor: "pointer", backgroundColor: "rgba(255, 255, 255, 0.02)" }, 
  mediaContainer: { width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 1 }, 
  mediaElement: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }, 
  gradientOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)", zIndex: 2, pointerEvents: "none" }, 
  cardContent: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px", zIndex: 3, display: "flex", flexDirection: "column", justifyContent: "flex-end" }, 
  categoryBadge: { display: "inline-block", alignSelf: "flex-start", fontSize: "0.75rem", color: "#f5d0fe", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", padding: "6px 14px", marginBottom: "12px", backgroundColor: "rgba(213, 0, 249, 0.2)", border: "1px solid rgba(213, 0, 249, 0.4)", borderRadius: "20px", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }, 
  title: { fontSize: "1.4rem", color: "#ffffff", fontWeight: 600, margin: "0 0 10px 0" }, 
  actionRow: { display: "flex", alignItems: "center", gap: "8px" }, 
  actionText: { fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", fontWeight: 400 }, 
  glassBorder: { position: "absolute", inset: 0, borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", pointerEvents: "none", zIndex: 10, boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }, 
  viewAllButton: { padding: "14px 32px", fontSize: "1rem", fontWeight: 500, color: "#fff", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "30px", cursor: "pointer", backdropFilter: "blur(10px)" } 
}
