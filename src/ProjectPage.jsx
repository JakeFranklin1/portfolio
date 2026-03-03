import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import habitQuestImg from "../resources/images/mockups/mockuuups-iphone-16-mockup-laying-on-concrete-blocks.jpeg";
import gamestoreImg from "../resources/images/mockups/mockuuups-free-macbook-pro-mockup-on-stone-pedestal.jpeg";
import carverCrossImg from "../resources/images/mockups/mockuuups-free-macbook-air-15-mockup-on-dark-textured-rocks.jpeg";

// ─── PROJECT DATA ────────────────────────────────────────────────────────────

const PROJECTS = {
  "habit-quest": {
    id: "01",
    slug: "habit-quest",
    name: "Habit Quest",
    type: "Android Application",
    year: "2024",
    context: "University / Solo",
    accent: "#00FFC0",
    accentDim: "rgba(0,255,192,0.08)",
    accentBorder: "rgba(0,255,192,0.2)",
    tagline: "Turn your daily routines into an RPG.",
    mockupSrc: habitQuestImg,
    problem: "Most habit tracking apps are sterile spreadsheets dressed up with a coat of paint. They do nothing to make the process of building habits feel meaningful or rewarding — so users quit.",
    solution: "Habit Quest wraps every action in RPG mechanics. Complete habits to earn XP, level up your character, and maintain streaks. Break a streak and your character loses health. The result is genuine emotional investment in daily routines.",
    features: [
      { label: "RPG Progression", desc: "Character levels, XP, and a health system with real consequences for broken streaks." },
      { label: "Habit Tracking", desc: "Customisable frequencies, streak tracking, and completion rewards baked into a clean interface." },
      { label: "To-Do System", desc: "Priority management with XP rewards tied directly to task completion." },
      { label: "Pomodoro Timer", desc: "Integrated focus sessions that feed back into the character progression loop." },
      { label: "Firebase Backend", desc: "Real-time sync, user authentication, and cloud storage — all live across devices." },
      { label: "Figma-first Design", desc: "Complete design system built in Figma before a single line of code was written." },
    ],
    tags: ["Java", "Android", "Firebase", "Figma"],
    links: {
      source: "https://github.com/JakeFranklin1",
      demo: null,
    },
    prevSlug: null,
    nextSlug: "gamestore",
    nextName: "GameStore",
  },
  "gamestore": {
    id: "02",
    slug: "gamestore",
    name: "GameStore",
    type: "Full-Stack Web App",
    year: "2024",
    context: "University",
    accent: "#FF3D57",
    accentDim: "rgba(255,61,87,0.08)",
    accentBorder: "rgba(255,61,87,0.2)",
    tagline: "A community-driven game marketplace powered by IGDB.",
    mockupSrc: gamestoreImg,
    problem: "Game discovery platforms are either corporate giants (Steam) or chaotic community boards. There's no middle ground: a clean, full-stack marketplace where users can browse, review, and list games with a consistent, modern UI.",
    solution: "GameStore pulls live game data from the IGDB API and layers community features on top — user auth, reviews, custom listings, and advanced filters by platform and genre. Built end-to-end with Node/Express and PostgreSQL on Supabase.",
    features: [
      { label: "IGDB Integration", desc: "Dynamic catalog population via the official IGDB REST API — thousands of real titles, metadata, and cover art." },
      { label: "User Authentication", desc: "Secure sign-up and login with session management, protecting user-generated content." },
      { label: "Advanced Filtering", desc: "Filter by platform, genre, release year, and rating — combinations update in real time." },
      { label: "Community Reviews", desc: "Users can rate and review any title. Reviews are aggregated and displayed per game." },
      { label: "Custom Listings", desc: "Authenticated users can list games not in the IGDB catalog, building the community layer." },
      { label: "PostgreSQL on Supabase", desc: "Relational data model hosted on Supabase via Railway for zero-downtime deployments." },
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "Supabase", "IGDB API", "REST API", "Figma"],
    links: {
      source: "https://github.com/JakeFranklin1",
      demo: "https://ci536-gamestore.netlify.app/",
    },
    prevSlug: "habit-quest",
    prevName: "Habit Quest",
    nextSlug: "carver-cross",
    nextName: "Carver Cross",
  },
  "carver-cross": {
    id: "03",
    slug: "carver-cross",
    name: "Carver Cross International",
    type: "Client Work — Landing Page",
    year: "2024",
    context: "Client / Live",
    accent: "#4D8EFF",
    accentDim: "rgba(77,142,255,0.08)",
    accentBorder: "rgba(77,142,255,0.2)",
    tagline: "A recruitment agency that operates where precision matters.",
    mockupSrc: carverCrossImg,
    problem: "The client — a recruitment agency in satellite, space & defence, and automotive sectors — had no web presence. Their industry demands credibility. A generic template wouldn't cut it.",
    solution: "A bespoke landing page designed end-to-end in Figma: corporate authority, clean whitespace, and deliberate typography that signals precision. SEO-optimised from day one so the site actually gets found.",
    features: [
      { label: "Figma-first Workflow", desc: "Complete design prototype approved by the client before development began — no scope creep." },
      { label: "Responsive Design", desc: "Pixel-perfect across mobile, tablet, and desktop without a single CSS framework." },
      { label: "SEO Optimisation", desc: "Semantic HTML, meta structure, and performance tuning for search visibility from launch." },
      { label: "Corporate Aesthetic", desc: "Deliberate palette and typographic choices that communicate authority in a specialist industry." },
      { label: "Pure HTML/CSS/JS", desc: "Zero dependency stack — fast, maintainable, and easy for the client to hand off." },
      { label: "Live & In Production", desc: "Delivered, deployed, and actively used by the client as their primary web presence." },
    ],
    tags: ["HTML/CSS", "JavaScript", "Figma", "SEO"],
    links: {
      source: null,
      demo: "https://carvercrossinternational.com",
    },
    prevSlug: "gamestore",
    prevName: "GameStore",
    nextSlug: null,
  },
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fallback to first project if slug is invalid
  const activeSlug = PROJECTS[slug] ? slug : "habit-quest";
  const project = PROJECTS[activeSlug];

  const [scrollY, setScrollY] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorHovering, setCursorHovering] = useState(false);

  // Scroll to top whenever the slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      setCursorHovering(!!e.target.closest('a, button, [data-clickable]'));
    };
    const onLeave = () => { setCursorVisible(false); setCursorHovering(false); };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const navigateTo = (s) => navigate(`/project/${s}`);

  const { accent, accentDim, accentBorder } = project;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080808; color: #fff; font-family: 'DM Mono', monospace; cursor: none; }
        * { cursor: none !important; }
        ::selection { background: ${accent}; color: #080808; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #222; }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }

        .cursor-dot {
          position: fixed; width: 10px; height: 10px;
          background: ${accent}; border-radius: 50%;
          pointer-events: none; z-index: 9999; mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }
        .cursor-ring {
          position: fixed; width: 36px; height: 36px;
          border: 1px solid ${accentBorder}; border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transition: transform 0.25s ease, opacity 0.3s, border-color 0.25s;
        }
        .cursor-ring.hovering {
          transform: scale(1.8);
          border-color: ${accent};
        }

        .nav-back {
          font-family: 'DM Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: color 0.2s, gap 0.2s;
          background: none; border: none; cursor: pointer;
        }
        .nav-back:hover { color: ${accent}; gap: 14px; }

        .tag-pill {
          display: inline-block;
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px;
          border: 1px solid ${accentBorder};
          color: ${accent};
          transition: background 0.2s;
        }
        .tag-pill:hover { background: ${accentDim}; }

        .feature-card {
          border: 1px solid rgba(255,255,255,0.06);
          padding: 2rem;
          border-radius: 2px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .feature-card:hover {
          border-color: ${accentBorder};
          background: ${accentDim};
          transform: translateY(-3px);
        }
        .feature-card:hover .feature-label { color: ${accent}; }

        .cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace; font-size: 0.75rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          background: ${accent}; color: #080808;
          padding: 14px 28px; border-radius: 2px;
          text-decoration: none;
          transition: opacity 0.2s, gap 0.2s;
        }
        .cta-primary:hover { opacity: 0.85; gap: 16px; }

        .cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Mono', monospace; font-size: 0.75rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6);
          padding: 14px 28px; border-radius: 2px;
          text-decoration: none;
          transition: all 0.25s;
        }
        .cta-secondary:hover { border-color: rgba(255,255,255,0.4); color: #fff; gap: 16px; }

        .next-project-btn {
          display: flex; align-items: center; gap: 1rem;
          text-decoration: none;
          transition: gap 0.25s;
          background: none; border: none; cursor: pointer;
        }
        .next-project-btn:hover { gap: 1.75rem; }
        .next-project-btn:hover .np-label { color: ${accent}; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fu-1 { animation: fadeUp 0.8s ease 0.05s both; }
        .fu-2 { animation: fadeUp 0.8s ease 0.2s both; }
        .fu-3 { animation: fadeUp 0.8s ease 0.35s both; }
        .fu-4 { animation: fadeUp 0.8s ease 0.5s both; }
        .fu-5 { animation: fadeUp 0.8s ease 0.65s both; }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0;
        }

        /* ── TOUCH DEVICES — restore cursor ── */
        @media (hover: none) {
          body { cursor: auto !important; }
          .cursor-dot, .cursor-ring { display: none !important; }
        }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .proj-tabs-container { display: none !important; }
          .pp-hero { min-height: unset !important; padding: 120px 1.5rem 4rem !important; }
          .ps-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .pp-section { padding: 4rem 1.5rem !important; }
          .pp-section-sm { padding: 3rem 1.5rem !important; }
          .pp-next { padding: 4rem 1.5rem !important; }
          .scroll-cue-pp { display: none !important; }
          .pp-nav { padding: 0 1.5rem !important; }
          .pp-hero h1 { font-size: clamp(1.8rem, 7.5vw, 10rem) !important; line-height: 0.92 !important; }
          .pp-hero-num { display: none !important; }
          .np-label { font-size: clamp(1.8rem, 7.5vw, 8rem) !important; white-space: normal !important; word-break: break-word !important; }
          .pp-next-ghost { display: none !important; }
          .pp-next { overflow: visible !important; }
        }

        /* Project nav tabs */
        .proj-tab {
          font-family: 'DM Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          background: none; border: none; cursor: pointer;
          padding: 6px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .proj-tab:hover, .proj-tab.active {
          color: ${accent};
          border-color: ${accent};
        }
      `}</style>

      {/* Grain */}
      <div className="grain" />

      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: cursorPos.x - 5, top: cursorPos.y - 5, opacity: cursorVisible ? 1 : 0 }} />
      <div className={`cursor-ring${cursorHovering ? " hovering" : ""}`} style={{ left: cursorPos.x - 18, top: cursorPos.y - 18, opacity: cursorVisible ? 1 : 0 }} />

      {/* ── NAV ──────────────────────────────────── */}
      <nav className="pp-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 2.5rem", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 30 ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrollY > 30 ? "blur(16px)" : "none",
        borderBottom: scrollY > 30 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <button className="nav-back" onClick={() => navigate("/")}>← Back to Portfolio</button>

        {/* Project switcher tabs */}
        <div className="proj-tabs-container" style={{ display: "flex", gap: "2rem" }}>
          {Object.values(PROJECTS).map((p) => (
            <button
              key={p.slug}
              className={`proj-tab ${activeSlug === p.slug ? "active" : ""}`}
              onClick={() => navigateTo(p.slug)}
              style={{ color: activeSlug === p.slug ? p.accent : undefined,
                       borderColor: activeSlug === p.slug ? p.accent : undefined }}
            >
              {p.id} {p.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "1rem",
          letterSpacing: "-0.02em", color: "#fff",
        }}>
          JF<span style={{ color: accent }}>.</span>
        </span>
      </nav>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="pp-hero" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-start",
        padding: "140px 2.5rem 5rem",
      }}>

        {/* Background: huge project number */}
        <div className="pp-hero-num" style={{
          position: "absolute", right: "-1rem", top: "50%",
          transform: `translateY(calc(-50% + ${scrollY * 0.2}px))`,
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: "clamp(14rem, 34vw, 34rem)",
          color: "transparent",
          WebkitTextStroke: `1px ${accentBorder}`,
          letterSpacing: "-0.06em", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
        }}>
          {project.id}
        </div>

        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 30% 60%, black 20%, transparent 100%)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          {/* Meta row */}
          <div className="fu-1" style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: accent }}>
              {project.id} / {project.type}
            </span>
            <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              {project.year}
            </span>
            <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
              {project.context}
            </span>
          </div>

          {/* Title */}
          <h1 className="fu-2" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(2.8rem, 10vw, 10rem)",
            letterSpacing: "-0.04em", lineHeight: 0.88,
            marginBottom: "2.5rem",
          }}>
            {project.name.split(" ").length >= 3 ? (
              <>
                {project.name.split(" ").slice(0, -1).join(" ")}
                <br />
                <span style={{ color: "rgba(255,255,255,0.18)", WebkitTextStroke: `1px rgba(255,255,255,0.45)` }}>
                  {project.name.split(" ").slice(-1)[0]}
                </span>
                <span style={{ color: accent }}>.</span>
              </>
            ) : project.name.includes(" ") ? (
              <>
                {project.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span style={{ color: "rgba(255,255,255,0.18)", WebkitTextStroke: `1px rgba(255,255,255,0.45)` }}>
                  {project.name.split(" ").slice(-1)[0]}
                </span>
                <span style={{ color: accent }}>.</span>
              </>
            ) : (
              <>{project.name}<span style={{ color: accent }}>.</span></>
            )}
          </h1>

          {/* Tagline */}
          <p className="fu-3" style={{
            fontFamily: "'DM Mono'", fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
            color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em",
            maxWidth: "540px", lineHeight: 1.6, marginBottom: "3rem",
          }}>
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="fu-4" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {project.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
          </div>

          {/* CTAs */}
          <div className="fu-5" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {project.links.source && (
              <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="cta-primary">
                Source Code →
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={project.links.source ? "cta-secondary" : "cta-primary"}>
                Live Demo ↗
              </a>
            )}
            {!project.links.source && !project.links.demo && (
              <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
                Private / NDA
              </span>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue-pp" style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, transparent, ${accentBorder})` }} />
          <span style={{ fontFamily: "'DM Mono'", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* ── FULL-BLEED MOCKUP ─────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden", height: "75vh", background: "#0d0d0d" }}>
        <img
          src={project.mockupSrc}
          alt={`${project.name} mockup`}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "center center",
            filter: "brightness(0.8)",
          }}
        />
        {/* Fade bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to bottom, transparent, #080808)",
        }} />
        {/* Accent glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 50% 100%, ${accentDim}, transparent)`,
          pointerEvents: "none",
        }} />
      </div>

      {/* ── PROBLEM / SOLUTION ───────────────────── */}
      <section className="pp-section" style={{ padding: "8rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="ps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

          <Reveal>
            <div>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: "1rem" }}>
                The Problem
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.75rem", color: "#fff" }}>
                What was broken.
              </h2>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)" }}>
                {project.problem}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: "1rem" }}>
                The Solution
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.75rem", color: "#fff" }}>
                How it works.
              </h2>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(255,255,255,0.45)" }}>
                {project.solution}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* ── KEY FEATURES ─────────────────────────── */}
      <section className="pp-section" style={{ padding: "8rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: "0.5rem" }}>
                What it does
              </p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.92, color: "#fff" }}>
                Key Features
              </h2>
            </div>
            <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.18)" }}>
              ({project.features.length} total)
            </span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
          {project.features.map((f, i) => (
            <Reveal key={f.label} delay={i * 60}>
              <div className="feature-card" style={{ background: "#0b0b0b", height: "100%", borderRadius: 0, border: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                  <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", color: accent, letterSpacing: "0.15em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="feature-label" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em", color: "#fff", transition: "color 0.25s" }}>
                    {f.label}
                  </h3>
                </div>
                <p style={{ fontFamily: "'DM Mono'", fontSize: "0.78rem", lineHeight: 1.75, color: "rgba(255,255,255,0.38)" }}>
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── TECH STACK ───────────────────────────── */}
      <section className="pp-section-sm" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: accent, marginBottom: "2.5rem" }}>
            Built With
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {project.tags.map((t, i) => (
              <span key={t} style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                letterSpacing: "-0.02em",
                color: i === 0 ? accent : `rgba(255,255,255,${0.6 - i * 0.08})`,
                marginRight: "0.5rem",
                transition: "color 0.2s",
              }}>
                {t}{i < project.tags.length - 1 && <span style={{ color: "rgba(255,255,255,0.1)", marginLeft: "0.5rem" }}>/</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="divider" />

      {/* ── NEXT PROJECT ─────────────────────────── */}
      {project.nextSlug && (
        <section className="pp-next" style={{ padding: "7rem 2.5rem", position: "relative", overflow: "hidden" }}>
          {/* Ghost text */}
          <div className="pp-next-ghost" style={{
            position: "absolute", right: "-1rem", bottom: "-2rem",
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(6rem, 18vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: `1px ${accentBorder}`,
            letterSpacing: "-0.06em", lineHeight: 1,
            userSelect: "none", pointerEvents: "none", opacity: 0.5,
          }}>
            NEXT
          </div>

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <Reveal>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.5rem" }}>
                Next Project
              </p>
              <button
                className="next-project-btn"
                onClick={() => navigateTo(project.nextSlug)}
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <span className="np-label" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "#fff", transition: "color 0.3s" }}>
                  {project.nextName}
                </span>
                <span style={{ fontFamily: "'DM Mono'", fontSize: "2rem", color: "rgba(255,255,255,0.2)" }}>→</span>
              </button>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── FOOTER ───────────────────────────────── */}
      <footer style={{
        padding: "1.5rem 2.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem",
      }}>
        <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)" }}>
          © 2025 Jake Franklin — All Rights Reserved
        </span>
        <button
          onClick={() => navigate("/")}
          style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.15)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={e => e.target.style.color = accent}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.15)"}
        >
          jakefranklin.dev ↑
        </button>
      </footer>
    </>
  );
}
