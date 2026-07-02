import React, { useRef, useState } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

export default function FeaturesGlowSection({
    badgeText,
    titleStart,
    titleHighlight,
    subtitleText,
    buttonText,
    cards,
}: any) {
    return (
        <div style={styles.container}>
            <style>
                {`
                    @media (min-width: 768px) {
                        .mobile-drag-handle { display: none !important; }
                    }
                `}
            </style>
            <div style={styles.contentWrapper}>
                <section style={styles.featuresSection}>
                    <div style={{ textAlign: "center", marginBottom: "80px" }}>
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
                            {titleStart}{" "}
                            <span style={styles.gradientText}>
                                {titleHighlight}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            style={styles.sectionSubtitle}
                        >
                            {subtitleText}
                        </motion.p>
                    </div>

                    <div style={styles.cardsContainer}>
                        {cards.map((feature: any, index: number) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon} // <--- Itt adjuk át a bekötött ikont
                                title={feature.title}
                                description={feature.description}
                                buttonText={buttonText}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

function FeatureCard({ icon, title, description, buttonText }: any) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const touchStartY = useRef(0)
    const isScrolling = useRef(false)

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 }
    const tiltX = useSpring(0, springConfig)
    const tiltY = useSpring(0, springConfig)

    const calculateTilt = (clientX: number, clientY: number) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        tiltX.set(-((y - centerY) / centerY) * 7)
        tiltY.set(((x - centerX) / centerX) * 7)
    }

    const handleMouseMove = (e: React.MouseEvent) =>
        calculateTilt(e.clientX, e.clientY)
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
        setIsHovered(false)
        setIsExpanded(false)
        tiltX.set(0)
        tiltY.set(0)
    }
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY
        isScrolling.current = false
        setIsHovered(true)
        calculateTilt(e.touches[0].clientX, e.touches[0].clientY)
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        if (isScrolling.current) return
        if (Math.abs(e.touches[0].clientY - touchStartY.current) > 15) {
            isScrolling.current = true
            tiltX.set(0)
            tiltY.set(0)
            setIsHovered(false)
            return
        }
        calculateTilt(e.touches[0].clientX, e.touches[0].clientY)
    }
    const handleTouchEnd = () => {
        tiltX.set(0)
        tiltY.set(0)
        setTimeout(() => {
            if (!isExpanded) setIsHovered(false)
        }, 1500)
    }
    const toggleExpand = (e: React.MouseEvent) => {
        if (isScrolling.current) return
        e.stopPropagation()
        setIsExpanded(!isExpanded)
        setIsHovered(true)
    }

    const glassCardStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }

    return (
        <div
            style={{
                position: "relative",
                zIndex: isExpanded || isHovered ? 10 : 1,
                perspective: "1000px",
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto",
            }}
        >
            <motion.div
                ref={cardRef}
                layout
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ rotateX: tiltX, rotateY: tiltY, ...glassCardStyle }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    }}
                />

                <div
                    style={{
                        padding: "35px 25px 20px",
                        zIndex: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* ===== IKON MEGJELENÍTÉSE ===== */}
                    <div
                        style={{
                            transform: "translateZ(30px)",
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {icon ? (
                            // Ha a felhasználó bekötött egy ikont a panelen, azt rendereljük
                            icon
                        ) : (
                            // Ha nincs ikon bekötve, ez a szürke doboz látszik helykitöltőnek
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    background: "rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                }}
                            />
                        )}
                    </div>

                    <h3
                        style={{
                            fontSize: "1.3rem",
                            fontWeight: 600,
                            color: "#ffffff",
                            transform: "translateZ(20px)",
                            margin: 0,
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </h3>
                </div>

                <div
                    onClick={toggleExpand}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px 25px 5px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        background: isHovered
                            ? "rgba(255,255,255,0.03)"
                            : "transparent",
                        transition: "background 0.3s ease",
                        zIndex: 2,
                    }}
                >
                    <span
                        style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "0.9rem",
                            fontWeight: 400,
                        }}
                    >
                        Részletek
                    </span>
                    <motion.svg
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.8, 0.25, 1],
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff2a85"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </motion.svg>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                overflow: "hidden",
                                zIndex: 2,
                            }}
                        >
                            <div
                                style={{
                                    padding: "10px 25px 20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.95rem",
                                        lineHeight: "1.6",
                                        color: "rgba(255,255,255,0.65)",
                                        fontWeight: 300,
                                        marginBottom: "25px",
                                        textAlign: "center",
                                    }}
                                >
                                    {description}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: "12px 28px",
                                        fontSize: "0.95rem",
                                        fontWeight: 500,
                                        color: "#ffffff",
                                        border: "none",
                                        borderRadius: "20px",
                                        background:
                                            "linear-gradient(135deg, #ff2a85 0%, #d500f9 100%)",
                                        boxShadow:
                                            "0 4px 15px rgba(255, 42, 133, 0.4)",
                                        cursor: "pointer",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        console.log("Gomb")
                                    }}
                                >
                                    {buttonText}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="mobile-drag-handle"
                    onPan={(e, info) => {
                        if (info.offset.y > 15 && !isExpanded) {
                            setIsExpanded(true)
                            setIsHovered(true)
                        } else if (info.offset.y < -15 && isExpanded) {
                            setIsExpanded(false)
                        }
                    }}
                    style={{
                        width: "100%",
                        padding: "10px 0 18px 0",
                        display: "flex",
                        justifyContent: "center",
                        cursor: "grab",
                        touchAction: "none",
                        zIndex: 2,
                    }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    <div
                        style={{
                            width: "40px",
                            height: "4px",
                            backgroundColor: "rgba(255,255,255,0.2)",
                            borderRadius: "4px",
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

addPropertyControls(FeaturesGlowSection, {
    badgeText: {
        type: ControlType.String,
        title: "Címke",
        defaultValue: "Funkciók",
    },
    titleStart: {
        type: ControlType.String,
        title: "Cím",
        defaultValue: "Prémium",
    },
    titleHighlight: {
        type: ControlType.String,
        title: "Kiemelt szó",
        defaultValue: "Jellemzők.",
    },
    subtitleText: {
        type: ControlType.String,
        title: "Alcím",
        defaultValue: "Érintsd meg a kártyákat a 3D élményhez",
    },
    buttonText: {
        type: ControlType.String,
        title: "Kártya Gomb",
        defaultValue: "Érdekel",
    },
    cards: {
        type: ControlType.Array,
        title: "Kártyák",
        control: {
            type: ControlType.Object,
            controls: {
                title: {
                    type: ControlType.String,
                    title: "Kártya Cím",
                    defaultValue: "Új Szolgáltatás",
                },
                description: {
                    type: ControlType.String,
                    title: "Leírás",
                    defaultValue: "Rövid leírás a szolgáltatásról.",
                },
                // ===== COMPONENT INSTANCE VEZÉRLŐ BEKÖTÉSE =====
                icon: {
                    type: ControlType.ComponentInstance,
                    title: "Ikon bekötése (Vászonról)",
                },
            },
        },
        defaultValue: [
            {
                title: "Villámgyors Teljesítmény",
                description:
                    "Optimalizált kód és modern infrastruktúra garantálja a maximális sebességet.",
            },
            {
                title: "Csodálatos Design",
                description:
                    "Intuitív felhasználói felület, amely teljesen testreszabható.",
            },
            {
                title: "Biztonság az Első Helyen",
                description:
                    "Banki szintű titkosítás és folyamatos biztonsági felügyelet.",
            },
        ],
    },
})

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#000000",
        padding: "100px 20px",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
    },
    contentWrapper: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
    },
    badge: {
        display: "inline-block",
        fontSize: "0.85rem",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#ff2a85",
        padding: "6px 14px",
        border: "1px solid rgba(255, 42, 133, 0.3)",
        borderRadius: "20px",
        backgroundColor: "rgba(255, 42, 133, 0.1)",
        margin: "0 0 15px 0",
    },
    sectionTitle: {
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: 700,
        color: "#ffffff",
        margin: "0 0 20px 0",
    },
    gradientText: {
        background: "linear-gradient(90deg, #ff2a85, #d500f9)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    sectionSubtitle: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "1.1rem",
        fontWeight: 300,
        margin: 0,
    },
    cardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "40px",
        alignItems: "start",
        justifyItems: "center",
    },
}
