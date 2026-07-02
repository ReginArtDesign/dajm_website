import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

export default function Hero({ titleStart, titleHighlight, titleEnd, subtitle, buttonText }: any) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springConfig = { damping: 50, stiffness: 100 }
    const mouseXSpring = useSpring(mouseX, springConfig)
    const mouseYSpring = useSpring(mouseY, springConfig)
    const move1 = useTransform(mouseXSpring, (x) => x / 15)
    const move2 = useTransform(mouseXSpring, (x) => -x / 10)
    const moveY = useTransform(mouseYSpring, (y) => y / 15)

    return (
        <div
            style={containerStyle}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left - rect.width / 2)
                mouseY.set(e.clientY - rect.top - rect.height / 2)
            }}
        >
            <div style={bottomBorderStyle} />
            <motion.div style={{ ...glowStyle, background: "#7e22ce", top: "-20%", left: "-10%", x: move1, y: moveY }} />
            <motion.div style={{ ...glowStyle, background: "#db2777", bottom: "-10%", right: "-5%", x: move2, y: -moveY }} />

            <div style={contentStyle}>
                <h1 style={titleStyle}>
                    {titleStart} <span style={gradientTextStyle}>{titleHighlight}</span> {titleEnd}
                </h1>
                <p style={subtitleStyle}>{subtitle}</p>
                <motion.button 
                    style={buttonStyle}
                    whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)", borderColor: "rgba(255, 42, 133, 0.5)", boxShadow: "0 0 20px rgba(255, 42, 133, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    {buttonText}
                </motion.button>
            </div>
        </div>
    )
}

addPropertyControls(Hero, {
    titleStart: { type: ControlType.String, title: "Cím eleje", defaultValue: "Building the " },
    titleHighlight: { type: ControlType.String, title: "Kiemelt szó", defaultValue: "future" },
    titleEnd: { type: ControlType.String, title: "Cím vége", defaultValue: " of digital." },
    subtitle: { type: ControlType.String, title: "Alcím", defaultValue: "Innovatív szoftverek, prémium design és skálázható infrastruktúra." },
    buttonText: { type: ControlType.String, title: "Gomb Szöveg", defaultValue: "Kezdjük el" }
})

const containerStyle: React.CSSProperties = { width: "100%", minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }
const bottomBorderStyle: React.CSSProperties = { position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)", zIndex: 20 }
const glowStyle: React.CSSProperties = { position: "absolute", width: "800px", height: "800px", borderRadius: "50%", filter: "blur(120px)", opacity: 0.25 }
const contentStyle: React.CSSProperties = { zIndex: 10, textAlign: "center", maxWidth: "700px" }
const titleStyle: React.CSSProperties = { fontSize: "64px", fontWeight: 800, color: "#fff", lineHeight: 1.1 }
const gradientTextStyle: React.CSSProperties = { background: "linear-gradient(90deg, #ff2a85, #d500f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
const subtitleStyle: React.CSSProperties = { fontSize: "20px", color: "rgba(255,255,255,0.6)", margin: "20px 0 40px" }
const buttonStyle: React.CSSProperties = { padding: "16px 40px", fontSize: "16px", fontWeight: 500, color: "#fff", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px", cursor: "pointer", backdropFilter: "blur(10px)", transition: "box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease" }
