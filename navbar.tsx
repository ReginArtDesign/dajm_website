import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

export default function ResponsiveNavbar({ brandName, navLinks, buttonText }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
        if (window.innerWidth >= 768) setIsOpen(false)
      }
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={styles.navbarWrapper}
    >
      <div style={styles.navbarMain}>
        <div style={styles.navBrand}>{brandName}</div>

        {!isMobile ? (
          <div style={styles.desktopContainer}>
            <div style={styles.navLinks}>
              {navLinks.map((link: string, i: number) => (
                <motion.a key={i} href="#" style={styles.navLink} whileHover={{ color: "#ffffff" }}>
                  {link}
                </motion.a>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={styles.navCta}
            >
              {buttonText}
            </motion.button>
          </div>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)} style={styles.hamburgerBtn} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2">
              <motion.path strokeLinecap="round" variants={{ closed: { d: "M 4 6 L 20 6" }, open: { d: "M 6 18 L 18 6" } }} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeOut" }} />
              <motion.path strokeLinecap="round" variants={{ closed: { d: "M 4 12 L 20 12", opacity: 1 }, open: { d: "M 4 12 L 20 12", opacity: 0 } }} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.2 }} />
              <motion.path strokeLinecap="round" variants={{ closed: { d: "M 4 18 L 20 18" }, open: { d: "M 6 6 L 18 18" } }} initial={false} animate={isOpen ? "open" : "closed"} transition={{ duration: 0.3, ease: "easeOut" }} />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ width: "100%", overflow: "hidden" }}>
            <div style={styles.mobileDropdownContent}>
              {navLinks.map((link: string, i: number) => (
                <a key={i} href="#" style={styles.mobileNavLink}>{link}</a>
              ))}
              <motion.button whileTap={{ scale: 0.95 }} style={styles.mobileNavCta}>
                {buttonText}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

addPropertyControls(ResponsiveNavbar, {
  brandName: { type: ControlType.String, title: "Márkanév", defaultValue: "Studio" },
  navLinks: { type: ControlType.Array, control: { type: ControlType.String }, title: "Menüpontok", defaultValue: ["Features", "Work", "About"] },
  buttonText: { type: ControlType.String, title: "Gomb Szöveg", defaultValue: "Kapcsolat" }
})

const styles: Record<string, React.CSSProperties> = {
  navbarWrapper: { position: "fixed", top: "20px", left: "5%", right: "5%", zIndex: 100, backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.2)", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)", display: "flex", flexDirection: "column", overflow: "hidden" },
  navbarMain: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" },
  navBrand: { fontSize: "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" },
  desktopContainer: { display: "flex", alignItems: "center", gap: "30px" },
  navLinks: { display: "flex", gap: "30px" },
  navLink: { color: "rgba(255, 255, 255, 0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 400, transition: "color 0.2s ease" },
  navCta: { padding: "8px 24px", borderRadius: "20px", background: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "1px solid rgba(255, 255, 255, 0.2)", cursor: "pointer", fontSize: "0.95rem", fontWeight: 500 },
  hamburgerBtn: { background: "transparent", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" },
  mobileDropdownContent: { display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 24px 24px 24px", borderTop: "1px solid rgba(255,255,255,0.1)", gap: "20px" },
  mobileNavLink: { color: "rgba(255, 255, 255, 0.9)", textDecoration: "none", fontSize: "1.1rem", fontWeight: 400, width: "100%", textAlign: "center" },
  mobileNavCta: { width: "100%", padding: "12px", borderRadius: "15px", background: "linear-gradient(135deg, #ff2a85 0%, #d500f9 100%)", color: "#fff", border: "none", fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginTop: "10px", boxShadow: "0 4px 15px rgba(255, 42, 133, 0.4)" }
}
