import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = ["Work", "Skills", "Contact"];

const SKILLS = [
  { name: "JavaScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Java", category: "Language" },
  { name: "Swift", category: "Language" },
  { name: "Kotlin", category: "Language" },
  { name: "React", category: "Framework" },
  { name: "Tailwind CSS", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "Firebase", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Git", category: "Tooling" },
  { name: "Figma", category: "Design" },
];

const PROJECTS = [
  {
    id: "01",
    slug: "habit-quest",
    name: "Habit Quest",
    type: "Android App",
    tags: ["Java", "Android", "Firebase", "Figma"],
    context: "University / Solo",
    description:
      "A gamified habit tracker that transforms daily routines into an RPG. Users level up characters, earn rewards, and build streaks through a game-inspired interface.",
    accent: "#00FFC0",
  },
  {
    id: "02",
    slug: "gamestore",
    name: "GameStore",
    type: "Full-Stack Web App",
    tags: ["Node.js", "Express", "PostgreSQL", "Supabase", "IGDB API"],
    context: "University",
    description:
      "A full-stack game marketplace with dynamic catalog population via IGDB API, user auth, platform/genre filtering, community reviews, and custom listings.",
    accent: "#FF3D57",
  },
  {
    id: "03",
    slug: "carver-cross",
    name: "Carver Cross International",
    type: "Client Work",
    tags: ["HTML/CSS", "JavaScript", "Figma", "SEO"],
    context: "Client / Live",
    description:
      "Professional landing page for a recruitment agency in satellite, space & defence, and automotive sectors. Responsive, SEO-optimised, corporate Figma-designed.",
    accent: "#00C8FF",
  },
];

const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jake-franklin-01a248173/", label: "↗" },
  { name: "GitHub", href: "https://github.com/JakeFranklin1", label: "↗" },
  { name: "Instagram", href: "https://www.instagram.com/jakefranklin_98/", label: "↗" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      data-clickable="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/project/${project.slug}`)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        borderTop: `1px solid ${hovered ? project.accent : "rgba(255,255,255,0.1)"}`,
        background: hovered ? "rgba(255,255,255,0.025)" : "transparent",
        cursor: "pointer",
      }}
      className="py-10 px-0 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left */}
        <div className="flex-1">
          <div className="flex items-baseline gap-4 mb-3">
            <span
              className="text-xs font-mono tracking-widest"
              style={{ color: project.accent, letterSpacing: "0.2em" }}
            >
              {project.id}
            </span>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}
            >
              {project.type}
            </span>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}
            >
              {project.context}
            </span>
          </div>
          <h3
            className="text-3xl md:text-4xl font-black mb-4 leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: hovered ? project.accent : "#FFFFFF",
              transition: "color 0.3s ease",
              letterSpacing: "-0.02em",
            }}
          >
            {project.name}
          </h3>
          <p
            className="text-sm leading-relaxed max-w-lg"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace" }}
          >
            {project.description}
          </p>
        </div>

        {/* Right — tags + arrow */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border"
                style={{
                  borderColor: hovered ? project.accent : "rgba(255,255,255,0.15)",
                  color: hovered ? project.accent : "rgba(255,255,255,0.45)",
                  fontFamily: "'DM Mono', monospace",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.05em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: hovered ? project.accent : "rgba(255,255,255,0.2)",
              transition: "color 0.3s ease",
            }}
          >
            View Case Study →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHovering, setCursorHovering] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      setCursorHovering(!!e.target.closest('a, button, [data-clickable]'));
    };
    const onMouseLeave = () => { setCursorVisible(false); setCursorHovering(false); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const heroParallax = scrollY * 0.25;

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: #080808;
          color: #ffffff;
          font-family: 'DM Mono', monospace;
          cursor: none;
        }
        * { cursor: none !important; }

        ::selection { background: #00FFC0; color: #080808; }

        /* Hide scrollbar but keep scroll */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #333; }

        .custom-cursor {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #00FFC0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }

        .custom-cursor-ring {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(0,255,192,0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: difference;
          transition: transform 0.25s ease, opacity 0.3s, border-color 0.25s;
        }
        .custom-cursor-ring.hovering {
          transform: scale(1.8);
          border-color: rgba(0,255,192,0.9);
        }

        .grain-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }


        .nav-link {
          position: relative;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.25s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #00FFC0;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #00FFC0; }
        .nav-link:hover::after { width: 100%; }

        .skill-pill {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          padding: 14px 20px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          transition: all 0.25s ease;
          cursor: default;
        }
        .skill-pill:hover {
          border-color: #00FFC0;
          background: rgba(200,255,0,0.04);
          transform: translateY(-2px);
        }
        .skill-pill:hover .skill-name { color: #00FFC0; }

        .glow-line {
          background: linear-gradient(90deg, transparent, #00FFC0, transparent);
          height: 1px;
          opacity: 0.3;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink { animation: blink 1.1s step-end infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up-1 { animation: fadeUp 0.8s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.8s ease 0.3s both; }
        .fade-up-3 { animation: fadeUp 0.8s ease 0.5s both; }
        .fade-up-4 { animation: fadeUp 0.8s ease 0.7s both; }

        /* ── HAMBURGER & MOBILE MENU ── */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .hamburger-btn span {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #fff;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .hamburger-btn.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; }
        .hamburger-btn.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-nav {
          position: fixed;
          inset: 0;
          background: #080808;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          z-index: 98;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }
        .mobile-nav.open {
          opacity: 1;
          pointer-events: all;
        }
        .mobile-nav a {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 11vw, 5.5rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          padding: 0.1rem 0;
          text-align: center;
          opacity: 0;
          transform: translateY(28px);
          transition: color 0.25s ease, opacity 0.45s ease, transform 0.45s ease;
        }
        .mobile-nav.open a {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-nav.open a:nth-child(1) { transition-delay: 0.05s; }
        .mobile-nav.open a:nth-child(2) { transition-delay: 0.10s; }
        .mobile-nav.open a:nth-child(3) { transition-delay: 0.15s; }
        .mobile-nav.open a:nth-child(4) { transition-delay: 0.20s; }
        .mobile-nav a:hover { color: #fff; }
        .mobile-nav .mobile-hire {
          font-family: 'DM Mono', monospace;
          font-weight: 400;
          font-size: clamp(0.85rem, 4vw, 1.1rem);
          letter-spacing: 0.15em;
          color: #00FFC0;
          margin-top: 1.5rem;
        }
        .mobile-nav .mobile-hire:hover { color: #fff; }

        /* ── TOUCH DEVICES — restore cursor ── */
        @media (hover: none) {
          body { cursor: auto !important; }
          .custom-cursor, .custom-cursor-ring { display: none !important; }
        }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .hamburger-btn { display: flex; }
          .desktop-hire-me { display: none !important; }
          .desktop-nav-links { display: none !important; }
          .scroll-cue { display: none !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .work-section { padding: 4rem 1.5rem !important; }
          .skills-section { padding: 4rem 1.5rem !important; }
          .about-section { padding: 4rem 1.5rem !important; }
          .contact-section { padding: 4rem 1.5rem 3rem !important; }
          .hero-section { min-height: unset !important; padding: 120px 1.5rem 4rem !important; }
          .hire-bg-text { display: none !important; }
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Custom cursor */}
      <div
        className="custom-cursor"
        style={{
          left: cursorPos.x - 5,
          top: cursorPos.y - 5,
          opacity: cursorVisible ? 1 : 0,
        }}
      />
      <div
        className={`custom-cursor-ring${cursorHovering ? " hovering" : ""}`}
        style={{
          left: cursorPos.x - 18,
          top: cursorPos.y - 18,
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* ── NAV ─────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrollY > 40 ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <a
          href="#home"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          JF<span style={{ color: "#00FFC0" }}>.</span>
        </a>

        <div className="desktop-nav-links hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
              {link}
            </a>
          ))}
        </div>

        <a
          href="mailto:jakefranklin14@gmail.com"
          className="desktop-hire-me"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#080808",
            background: "#00FFC0",
            padding: "8px 16px",
            borderRadius: "2px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Hire Me
        </a>

        <button
          className={`hamburger-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile nav menu */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a
          href="mailto:jakefranklin14@gmail.com"
          className="mobile-hire"
          onClick={() => setMenuOpen(false)}
        >
          Hire Me →
        </a>
      </div>

      {/* ── HERO ────────────────────────────────────── */}
      <section
        id="home"
        className="hero-section"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "160px 2rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Large background number */}
        <div
          style={{
            position: "absolute",
            right: "-2rem",
            top: "50%",
            transform: `translateY(calc(-50% + ${heroParallax}px))`,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(12rem, 28vw, 28rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          JF
        </div>


        {/* Status line */}
        <div
          className="fade-up-1"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ color: "#00FFC0" }}>●</span>
          Available for Graduate & Junior Roles
          <span style={{ color: "rgba(255,255,255,0.15)" }}>— UK Based</span>
        </div>

        {/* Main headline */}
        <h1
          className="fade-up-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.2rem, 9vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: "2.5rem",
            maxWidth: "900px",
          }}
        >
          Jake
          <br />
          <span style={{ color: "rgba(255,255,255,0.2)", WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>
            Franklin
          </span>
          <span style={{ color: "#00FFC0" }}>.</span>
        </h1>

        {/* Subline */}
        <div
          className="fade-up-3"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            marginBottom: "3rem",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.02em",
            }}
          >
            Final Year Computer Science & Cybersecurity
            <span style={{ color: "#00FFC0" }}> /</span> Brighton University
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.05em",
            }}
          >
            Design-led developer. Android · Web · Full-Stack.
          </p>
        </div>

        {/* CTA row */}
        <div className="fade-up-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#work"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#080808",
              background: "#00FFC0",
              padding: "14px 28px",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "gap 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "16px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
          >
            View Work <span>→</span>
          </a>
          <a
            href="https://github.com/JakeFranklin1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "14px 28px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-cue"
          style={{
            position: "absolute",
            bottom: "2rem", right: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: 1,
              height: 60,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
        </div>
      </section>


      {/* ── WORK / PROJECTS ─────────────────────────── */}
      <section
        id="work"
        className="work-section"
        style={{ padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto", width: "100%" }}
      >
        <AnimatedSection>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#00FFC0",
                  marginBottom: "0.5rem",
                }}
              >
                Selected Work
              </p>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "#fff",
                }}
              >
                Projects
              </h2>
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              (2023—2025)
            </span>
          </div>
        </AnimatedSection>

        <div>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────── */}
      <section
        id="skills"
        className="skills-section"
        style={{
          padding: "8rem 2rem",
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#00FFC0",
                marginBottom: "0.5rem",
              }}
            >
              Tech Stack
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#fff",
                marginBottom: "4rem",
              }}
            >
              Skills
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {SKILLS.map((skill) => (
                <div key={skill.name} className="skill-pill">
                  <span
                    className="skill-name"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "#fff",
                      transition: "color 0.25s",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ABOUT STRIP ─────────────────────────────── */}
      <section className="about-section" style={{ padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#00FFC0",
                  marginBottom: "0.5rem",
                }}
              >
                About
              </p>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#fff",
                  marginBottom: "2rem",
                }}
              >
                Design-led,
                <br />
                security-aware.
              </h2>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.85rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "1.5rem",
                }}
              >
                I'm a final-year CS & Cybersecurity student with a bias for products that feel as considered as they perform. I build across Android, web, and full-stack — and I care deeply about the gap between functional and polished.
              </p>
            </div>

            {/* Right — stat grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {[
                { value: "3+", label: "Projects Shipped" },
                { value: "5+", label: "Languages" },
                { value: "2024", label: "Client Work" },
                { value: "UK", label: "Based" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0d0d0d",
                    padding: "2rem 1.5rem",
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 900,
                      fontSize: "2.5rem",
                      letterSpacing: "-0.04em",
                      color: "#00FFC0",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── CONTACT ─────────────────────────────────── */}
      <section
        id="contact"
        className="contact-section"
        style={{
          padding: "8rem 2rem 6rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large background text */}
        <div
          className="hire-bg-text"
          style={{
            position: "absolute",
            bottom: "-2rem", left: "-1rem",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(6rem, 22vw, 22rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          HIRE
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#00FFC0",
                marginBottom: "0.75rem",
              }}
            >
              Get In Touch
            </p>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 8vw, 8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#fff",
                marginBottom: "3rem",
              }}
            >
              Let's work
              <br />
              <span style={{ color: "rgba(255,255,255,0.2)", WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                together
              </span>
              <span style={{ color: "#00FFC0" }}>.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <a
              href="mailto:jakefranklin14@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                letterSpacing: "0.05em",
                color: "#fff",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                paddingBottom: "4px",
                marginBottom: "4rem",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00FFC0";
                e.currentTarget.style.borderColor = "#00FFC0";
                e.currentTarget.style.gap = "20px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.gap = "12px";
              }}
            >
              contact me <span>→</span>
            </a>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFC0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer
        style={{
          padding: "1.5rem 2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © 2025 Jake Franklin — All Rights Reserved
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.12)",
          }}
        >
          jakefranklin.dev
        </span>
      </footer>
    </>
  );
}
