import React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

// ===== FŐ KOMPONENS =====
export default function Footer({ 
    ctaTitleStart, 
    ctaTitleHighlight, 
    ctaSubtitle, 
    ctaButtonText, 
    brandName, 
    brandDesc,
    emailAddress,
    phoneNumber,
    locationText
}: any) {
    const currentYear = new Date().getFullYear()

    return (
        <footer style={styles.footerContainer}>
            {/* Finom felső elválasztó vonal */}
            <div style={styles.topBorderStyle} />

            <div style={styles.maxWidthWrapper}>
                
                {/* 1. CTA (Call To Action) Szekció */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={styles.ctaSection}
                >
                    <h2 style={styles.ctaTitle}>
                        {ctaTitleStart} <span style={styles.gradientText}>{ctaTitleHighlight}</span>
                    </h2>
                    <p style={styles.ctaSubtitle}>
                        {ctaSubtitle}
                    </p>
                    <motion.a 
                        href={`mailto:${emailAddress}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={styles.ctaButton}
                    >
                        {ctaButtonText}
                    </motion.a>
                </motion.div>

                {/* 2. LÁBLÉC GRID (Menü és Elérhetőségek) */}
                <div style={styles.gridContainer}>
                    
                    {/* Brand és rövid info */}
                    <div style={styles.colSpan2}>
                        <h3 style={styles.brandName}>{brandName}</h3>
                        <p style={styles.brandDescription}>
                            {brandDesc}
                        </p>
                    </div>

                    {/* Navigáció */}
                    <div style={styles.linkColumn}>
                        <h4 style={styles.columnTitle}>Menü</h4>
                        <div style={styles.linkList}>
                            {["Főoldal", "Jellemzők", "Munkáim", "Rólam"].map((item) => (
                                <motion.a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`} 
                                    whileHover={{ x: 5, color: "#fff" }}
                                    style={styles.link}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Elérhetőségek */}
                    <div style={styles.linkColumn}>
                        <h4 style={styles.columnTitle}>Elérhetőségek</h4>
                        <div style={styles.linkList}>
                            <motion.a href={`mailto:${emailAddress}`} whileHover={{ color: "#fff" }} style={styles.contactItem}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                {emailAddress}
                            </motion.a>
                            {/* A telefonszámból eltávolítjuk a szóközöket a kattintható linkhez */}
                            <motion.a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} whileHover={{ color: "#fff" }} style={styles.contactItem}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                {phoneNumber}
                            </motion.a>
                            <div style={styles.contactItem}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2a85" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                {locationText}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Szerzői jogi sáv */}
                <div style={styles.bottomBar}>
                    <p style={styles.copyrightText}>
                        © {currentYear} {brandName}. Minden jog fenntartva.
                    </p>
                    <div style={styles.socialLinks}>
                        <motion.a href="#" whileHover={{ y: -3, color: "#d500f9" }} style={styles.socialIcon}>LinkedIn</motion.a>
                        <motion.a href="#" whileHover={{ y: -3, color: "#d500f9" }} style={styles.socialIcon}>Dribbble</motion.a>
                        <motion.a href="#" whileHover={{ y: -3, color: "#d500f9" }} style={styles.socialIcon}>Behance</motion.a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

// ===== PROPERTY CONTROLS =====
addPropertyControls(Footer, {
    // CTA Szekció
    ctaTitleStart: { type: ControlType.String, title: "CTA Cím", defaultValue: "Készen állsz a " },
    ctaTitleHighlight: { type: ControlType.String, title: "CTA Kiemelt szó", defaultValue: "közös munkára?" },
    ctaSubtitle: { type: ControlType.String, title: "CTA Alcím", defaultValue: "Beszéljük meg, hogyan emelhetjük a következő szintre a digitális termékedet felhasználóközpontú tervezéssel.", displayTextArea: true },
    ctaButtonText: { type: ControlType.String, title: "Gomb Szöveg", defaultValue: "Kapcsolatfelvétel" },
    
    // Brand Info
    brandName: { type: ControlType.String, title: "Márkanév", defaultValue: "Studio" },
    brandDesc: { type: ControlType.String, title: "Márka Leírás", defaultValue: "Prémium digitális élmények tervezése és fejlesztése. Senior UX fókusz, letisztult vizualitás és adatalapú döntések.", displayTextArea: true },
    
    // Elérhetőségek
    emailAddress: { type: ControlType.String, title: "Email cím", defaultValue: "hello@studio.com" },
    phoneNumber: { type: ControlType.String, title: "Telefonszám", defaultValue: "+36 30 123 4567" },
    locationText: { type: ControlType.String, title: "Helyszín", defaultValue: "Budapest, Hungary" }
})

// ===== STÍLUSOK =====
const styles: Record<string, React.CSSProperties> = {
    footerContainer: { width: "100%", backgroundColor: "#000000", padding: "80px 20px 30px", position: "relative", fontFamily: "'Inter', sans-serif", overflow: "hidden" },
    topBorderStyle: { position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)", zIndex: 10 },
    maxWidthWrapper: { width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 },
    ctaSection: { textAlign: "center", paddingBottom: "80px", marginBottom: "60px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
    ctaTitle: { fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#fff", marginBottom: "20px" },
    gradientText: { background: "linear-gradient(90deg, #ff2a85, #d500f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    ctaSubtitle: { fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.6 },
    ctaButton: { display: "inline-block", padding: "16px 40px", fontSize: "1rem", fontWeight: 600, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, #ff2a85 0%, #d500f9 100%)", borderRadius: "30px", boxShadow: "0 10px 25px rgba(255, 42, 133, 0.3)", cursor: "pointer" },
    gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "60px" },
    colSpan2: { gridColumn: "1 / -1", maxWidth: "400px", "@media (min-width: 768px)": { gridColumn: "span 2" } } as any,
    brandName: { fontSize: "1.5rem", fontWeight: 800, color: "#fff", letterSpacing: "1px", marginBottom: "15px" },
    brandDescription: { fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 },
    linkColumn: { display: "flex", flexDirection: "column" },
    columnTitle: { fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: "20px" },
    linkList: { display: "flex", flexDirection: "column", gap: "15px" },
    link: { color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.95rem", display: "inline-block" },
    contactItem: { display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", textDecoration: "none" },
    bottomBar: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.05)", gap: "20px" },
    copyrightText: { fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", margin: 0 },
    socialLinks: { display: "flex", gap: "20px" },
    socialIcon: { fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }
}
