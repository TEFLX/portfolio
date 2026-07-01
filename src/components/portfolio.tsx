import { CustomCursor } from "./cursor-loader";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from "framer-motion";
import {
  Mail, Briefcase, Brain, Code2, Database, Terminal,
  Smartphone, BarChart3, Scan, Package, Sparkles, MapPin, Calendar,
  Building2, ScanFace, ArrowUpRight, Zap, Bot, Globe, GitMerge, GraduationCap, BadgeCheck,
} from "lucide-react";

const Github = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
  </svg>
);
const Linkedin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);
import { profile, stats, projects, experience, education, skillGroups, exploring } from "@/data/portfolio";
import ritikPhoto from "@/assets/ritik.jpeg";

/* ---------------- NAV ---------------- */
function Nav() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last.current);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[980px] glass-strong rounded-2xl px-5 h-[52px] flex items-center justify-between"
    >
      <a href="#top" className="text-sm font-extrabold tracking-tight uppercase">
        RITIK <span className="text-white/55 font-bold">KASHYAP</span>
      </a>
      <div className="flex items-center gap-0.5 sm:gap-1">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="px-2 sm:px-3 py-1.5 text-[12px] sm:text-[13px] text-white/65 hover:text-white transition-colors relative group">
            {l.label}
            <span className="absolute left-2 right-2 sm:left-3 sm:right-3 -bottom-0.5 h-px bg-gradient-to-r from-[#afa9ec] to-[#5dcaa5] scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
          </a>
        ))}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60 hover:text-white px-2 sm:px-2.5 py-1.5 rounded-lg glass">
          <Github className="w-3.5 h-3.5" /> <span className="hidden xs:inline sm:inline">{profile.githubHandle}</span>
        </a>
        <a href={profile.mailUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] sm:text-[12px] font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-white text-black hover:bg-white/90 transition whitespace-nowrap">
          Hire me
        </a>
      </div>
    </motion.nav>
  );
}

/* ---------------- COUNTER ---------------- */
function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const [val, setVal] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    const unsub = mv.on("change", (v: number) => setVal(v.toFixed(decimals)));
    return () => { controls.stop(); unsub(); };
  }, [inView, to, decimals, mv]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- SPLIT TEXT ---------------- */
function SplitChars({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span
  className={`${className} inline-block pr-[4px]`}
  aria-label={text}
>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className={i === 0 ? "inline-block pl-[2px]" : "inline-block"}
          aria-hidden
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen pt-28 pb-16 px-6 md:px-12 overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-[11px] text-white/70 mb-6"
          >
            <span className="pulse-dot" /> {profile.status} · {profile.location}
          </motion.div>

          <div className="flex items-center gap-7 sm:gap-12 md:gap-16">
            <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[clamp(2.25rem,7vw,5.25rem)]">
              <SplitChars text={profile.first} className="block" />
              <span className="block text-gradient">
                <SplitChars text={profile.last} delay={0.2} />
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 rounded-full p-[3px]"
              style={{
                background: "linear-gradient(135deg, #00e5ff, #3b82f6 55%, #00e5ff)",
                boxShadow:
  "0 0 10px rgba(0,229,255,0.18), 0 0 20px rgba(59,130,246,0.12), inset 0 0 5px rgba(0,229,255,0.08)",
              }}
            >
              <img
                src={ritikPhoto}
                alt="Ritik Kashyap portrait"
                className="block w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover bg-black"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.35) 90deg, transparent 180deg, rgba(59,130,246,0.35) 270deg, transparent 360deg)",
                  filter: "blur(2px)",
                  opacity: 0.4,
                }}
              />
            </motion.div>
          </div>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 1 } } }}
            className="flex flex-wrap gap-2 mt-7"
          >
            {profile.titles.map((t) => (
              <motion.span
                key={t}
                variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                className="glass rounded-full px-3 py-1.5 text-[11px] font-medium text-white/80"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
            className="mt-7 text-[15px] leading-relaxed text-white/60 max-w-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href={profile.repoSearch} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:scale-[1.02] transition glow-purple">
              <Briefcase className="w-4 h-4" /> View Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
            {[
              { href: profile.github, icon: Github, label: "GitHub" },
              { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.mailUrl, icon: Mail, label: "Email" },
            ].map((b) => (
              <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass text-sm text-white/80 hover:text-white hover:bg-white/[0.07] transition">
                <b.icon className="w-4 h-4" /> {b.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-2xl font-bold tracking-tight">
                  <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — small faded code card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block"
        >
          <div
            className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-black/20 backdrop-blur-sm"
            style={{
              width: "320px",
              opacity: 0.90,
              maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 40%, transparent 100%)",
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28ca41]" />
              <span className="ml-2 font-mono text-[10px] text-white/40">defect_detect.py</span>
            </div>
            <div className="p-4 font-mono text-[10px] leading-relaxed text-white/70">
              <div><span className="text-[#c084fc]">from</span> <span className="text-[#7dd3fc]">ultralytics</span> <span className="text-[#c084fc]">import</span> <span className="text-[#fbbf24]">YOLO</span></div>
              <div><span className="text-[#c084fc]">import</span> <span className="text-[#7dd3fc]">cv2</span>, <span className="text-[#7dd3fc]">torch</span>, <span className="text-[#7dd3fc]">qrcode</span></div>
              <div className="text-white/30 mt-2"># Industrial defect detection pipeline</div>
              <div className="mt-1"><span className="text-[#7dd3fc]">model</span> = <span className="text-[#fbbf24]">YOLO</span>(<span className="text-[#86efac]">'yolov8n.pt'</span>)</div>
              <div className="mt-2"><span className="text-[#7dd3fc]">results</span> = model.<span className="text-[#fbbf24]">predict</span>(</div>
              <div>{"  "}<span className="text-[#7dd3fc]">source</span>=<span className="text-[#86efac]">'camera_feed'</span>,</div>
              <div>{"  "}<span className="text-[#7dd3fc]">conf</span>=<span className="text-[#fda4af]">0.85</span>, <span className="text-[#7dd3fc]">stream</span>=<span className="text-[#fda4af]">True</span></div>
              <div>)</div>
              <div className="text-white/30 mt-2"># QR tag + PDF report auto-generated ✓</div>
              <div className="mt-1"><span className="text-[#c084fc]">for</span> <span className="text-[#7dd3fc]">result</span> <span className="text-[#c084fc]">in</span> <span className="text-[#7dd3fc]">results</span>:</div>
              <div>{"  "}<span className="text-[#fbbf24]">tag_defect</span>(result, qrcode)</div>
              <div>{"  "}<span className="text-[#fbbf24]">generate_report</span>(result)</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- SECTION TAG ---------------- */
function SectionTag({ left, right }: { left: string; right?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold">{left}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      {right && <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono">{right}</span>}
    </motion.div>
  );
}

/* ---------------- SKILLS UNIVERSE ---------------- */
function SkillsUniverse() {
  const orbit1 = ["Python", "PyTorch", "OpenCV", "YOLOv8", "TensorFlow", "Flutter"];
  const orbit2 = ["Pandas", "NumPy", "SQL", "Linux", "Django", "Git", "PostgreSQL"];

  return (
    <div className="relative h-[520px] hidden md:block">
      {/* Core */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center glass-strong glow-purple">
          <Brain className="w-10 h-10 text-[#afa9ec]" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7f77dd]/30 to-[#5dcaa5]/20 blur-2xl -z-10" />
        </div>
      </motion.div>

      {/* Orbit 1 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[360px] h-[360px] rounded-full border border-white/[0.06]" style={{ animation: "orbit 36s linear infinite" }}>
          {orbit1.map((s, i) => {
            const a = (i / orbit1.length) * Math.PI * 2;
            return (
              <div key={s} className="absolute" style={{ left: `calc(50% + ${Math.cos(a) * 180}px - 40px)`, top: `calc(50% + ${Math.sin(a) * 180}px - 16px)` }}>
                <span className="glass rounded-full px-3 py-1.5 text-[11px] font-medium block" style={{ animation: "orbit-rev 36s linear infinite" }}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit 2 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[520px] h-[520px] rounded-full border border-white/[0.04]" style={{ animation: "orbit-rev 48s linear infinite" }}>
          {orbit2.map((s, i) => {
            const a = (i / orbit2.length) * Math.PI * 2;
            return (
              <div key={s} className="absolute" style={{ left: `calc(50% + ${Math.cos(a) * 260}px - 40px)`, top: `calc(50% + ${Math.sin(a) * 260}px - 16px)` }}>
                <span className="glass rounded-full px-3 py-1.5 text-[11px] font-medium block text-white/70" style={{ animation: "orbit 48s linear infinite" }}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PROJECT CARD ---------------- */
function ProjectCard({ p, featured }: { p: typeof projects[number]; featured?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const gx = useMotionValue(50); const gy = useMotionValue(50);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
    gx.set(px * 100); gy.set(py * 100);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.a
      ref={ref}
      href={p.url} target="_blank" rel="noopener noreferrer"
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative glass-strong rounded-2xl p-7 overflow-hidden block ${featured ? "lg:col-span-2" : ""}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at ${gx.get()}% ${gy.get()}%, rgba(127,119,221,0.18), transparent 60%)`,
        }}
      />
      {p.image && (
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full w-[40%] overflow-hidden"
          style={{
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.55), transparent 85%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.55), transparent 85%)",
          }}
        >
          <img
            src={p.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-opacity duration-500"            loading="lazy"
          />
        </div>
      )}
      <div className={`relative flex ${featured ? "flex-col lg:flex-row gap-8" : "flex-col"} h-full`}>
        <div className="flex-1 relative z-10">
          {featured && (
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#afa9ec] font-bold mb-4">Featured</span>
          )}
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#7f77dd]/20 to-[#5dcaa5]/10 border border-white/10 mb-5">
            {featured ? <Scan className="w-5 h-5 text-[#afa9ec]" /> : p.title.includes("Shop") ? <ScanFace className="w-5 h-5 text-[#9fe1cb]" /> : <Package className="w-5 h-5 text-[#85b7eb]" />}
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-3">{p.title}</h3>
          <p className="text-[13.5px] text-white/65 leading-relaxed mb-5 max-w-[60%]">{p.summary}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.tags.map((t) => (
              <span key={t} className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/[0.04] border border-white/5 text-white/70">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-lg glass">
              <Github className="w-3.5 h-3.5" /> GitHub
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#9fe1cb] font-bold">{p.status}</span>
            <ArrowUpRight className="w-4 h-4 ml-auto text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>    
        </div>

        { p.metrics && (
          <div className="relative z-20 mt-6 flex flex-row lg:flex-col gap-3 lg:min-w-[180px]">            {p.metrics.map((m) => {
              const tone = m.tone === "purple" ? "from-[#7f77dd]/15 border-[#7f77dd]/25 text-[#afa9ec]"
                : m.tone === "cyan" ? "from-[#5dcaa5]/12 border-[#5dcaa5]/25 text-[#9fe1cb]"
                : "from-[#378add]/12 border-[#378add]/25 text-[#85b7eb]";
              return (
                <div key={m.label} className={`flex-1 rounded-xl border bg-gradient-to-br ${tone} to-transparent p-4`}>
                  <div className="text-[9px] uppercase tracking-[0.15em] text-white/40 font-bold mb-1.5">{m.label}</div>
                  <div className="text-[13px] font-semibold">{m.value}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.a>
  );
}

/* ---------------- EXPERIENCE TIMELINE ---------------- */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={ref} className="relative">
      <div className="space-y-12">
        {experience.filter(e => e.current).map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 relative">
              {e.current && (
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-bold text-[#9fe1cb] mb-3">
                  <span className="pulse-dot" /> Current Role
                </div>
              )}
              <div className="flex items-start gap-4">
                {e.logo && (
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-white/10">
                    <img src={e.logo} alt={`${e.company} logo`} className="max-w-[85%] max-h-[85%] object-contain" loading="lazy" />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold tracking-tight">{e.role}</h3>
                  <div className="text-sm text-white/70 mt-0.5">{e.company}</div>
                  <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-white/45">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {e.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {e.location}</span>
                  </div>
                </div>
              </div>

              <ul className="mt-2 space-y-1 lg:pr-[220px]">
                {e.bullets.map((b) => (
                  <li key={b} className="text-[13px] text-white/65 pl-5 relative leading-relaxed">
                    <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full" style={{ background: e.color, boxShadow: `0 0 8px ${e.color}99` }} />
                    {b}
                  </li>
                ))}
              </ul>

              {(e as any).metrics && (
                <div className="hidden lg:flex flex-col gap-2 absolute top-6 right-6 w-[160px]">
                  {(e as any).metrics.map((m: { label: string; value: string; tone?: string }) => {
                    const toneMap: Record<string, string> = {
                      purple: "from-[#7f77dd]/15 border-[#7f77dd]/25 text-[#afa9ec]",
                      cyan: "from-[#5dcaa5]/12 border-[#5dcaa5]/25 text-[#9fe1cb]",
                      blue: "from-[#378add]/12 border-[#378add]/25 text-[#85b7eb]",
                    };
                    return (
                      <div key={m.label} className={`rounded-xl border bg-gradient-to-br ${toneMap[m.tone ?? ""] ?? "text-white/85"} to-transparent p-3`}>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/40 font-bold mb-1">{m.label}</div>
                        <div className="text-[13px] font-semibold">{m.value}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {(e as any).links ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {(e as any).links.linkedin && (
                    <a href={(e as any).links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {(e as any).links.instagram && (
                    <a href={(e as any).links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition">
                      <Sparkles className="w-3.5 h-3.5" /> Instagram <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {(e as any).links.github && (
                    <a href={(e as any).links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition">
                      <Github className="w-3.5 h-3.5" /> GitHub <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {(e as any).links.gmail && (
                    <a href={(e as any).links.gmail} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition">
                      <Mail className="w-3.5 h-3.5" /> Gmail <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ) : e.verifyUrl && (<a
                
                  href={e.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition"
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verify on LinkedIn
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
/* ---------------- TERMINAL CONTACT ---------------- */
function TerminalContact() {
  const lines = [
    { p: "visitor@portfolio", c: "$ hire ritik" },
    { o: "→ Connecting to Ritik Kashyap..." },
    { o: "→ Opening secure channel..." },
    { o: "→ Ready. Use the buttons below." },
  ];
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setShown((s) => (s < lines.length ? s + 1 : s)), 550);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="glass-strong rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
        <span className="ml-2 font-mono text-[11px] text-white/40">ritik@orqelix:~</span>
      </div>
      <div className="p-6 font-mono text-[13px] min-h-[200px]">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="mb-1">
            {l.p && <span className="text-[#9fe1cb]">{l.p} </span>}
            {l.c && <span className="text-white">{l.c}</span>}
            {l.o && <span className="text-white/55">{l.o}</span>}
          </div>
        ))}
        {shown >= lines.length && <span className="caret" />}
      </div>
    </div>
  );
}

/* ---------------- ICON MAP ---------------- */
const iconMap: Record<string, ReactNode> = {
  code: <Code2 className="w-4 h-4" />,
  brain: <Brain className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
  chart: <BarChart3 className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  terminal: <Terminal className="w-4 h-4" />,
};
const exploreIcons = [
  <Bot className="w-5 h-5 text-[#afa9ec]" />,
  <Zap className="w-5 h-5 text-[#fbbf24]" />,
  <Globe className="w-5 h-5 text-[#85b7eb]" />,
  <GitMerge className="w-5 h-5 text-[#9fe1cb]" />,
];

/* ---------------- PAGE ---------------- */
export function Portfolio() {
  return (
    <div className="relative">
      <CustomCursor />
      <Nav />

      <Hero />

      {/* Skills strip */}
      
      {/* SKILLS */}
      <section id="skills" className="relative px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionTag left="Skills & Technologies" right="orbit · grid" />
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <SkillsUniverse />
            <div className="grid sm:grid-cols-2 gap-3">
              {skillGroups.map((g) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -2 }}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#7f77dd]/20 to-transparent text-[#afa9ec]">
                      {iconMap[g.icon]}
                    </div>
                    <div className="text-sm font-semibold">{g.title}</div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span key={s} className="text-[10.5px] font-medium px-2 py-1 rounded-md bg-white/[0.04] border border-white/5 text-white/70">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionTag left="Featured Projects" right={`${profile.githubHandle} · 12 repos`} />
          <div className="grid lg:grid-cols-2 gap-5">
            <ProjectCard p={projects[0]} featured />
            <ProjectCard p={projects[1]} />
            <ProjectCard p={projects[2]} />
          </div>
        </div>
      </section>


      {/* EXPERIENCE */}
      <section id="experience" className="relative px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionTag left="Experience" right="2023 — present" />
          <Timeline />
          <div className="grid lg:grid-cols-2 gap-5 mt-10">
            {experience.filter(e => !e.current).map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -4 }}
                className="group relative glass-strong rounded-2xl p-7 overflow-hidden block h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(400px circle at 50% 0%, rgba(127,119,221,0.12), transparent 60%)` }}
                />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    {e.logo && (
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden border border-white/10">
                        <img src={e.logo} alt={`${e.company} logo`} className="max-w-[85%] max-h-[85%] object-contain" loading="lazy" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-tight">{e.role}</h3>
                      <div className="text-sm text-white/70">{e.company}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4 text-[11px] text-white/45">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {e.period}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {e.location}</span>
                  </div>
                  <ul className="space-y-2 mb-5 flex-1">
                    {e.bullets.slice(0, 2).map((b) => (
                      <li key={b} className="text-[13px] text-white/65 pl-5 relative leading-relaxed">
                        <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full" style={{ background: e.color, boxShadow: `0 0 8px ${e.color}99` }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {e.verifyUrl && (
                    <a href={e.verifyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg glass hover:bg-white/[0.08] text-white/80 hover:text-white transition w-fit">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verify on LinkedIn <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="relative px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <SectionTag left="Education" right="academic background" />
          <div className="grid sm:grid-cols-2 gap-5">
            {education.map((ed, i) => (
              <motion.div
                key={ed.degree}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/[0.04] blur-2xl group-hover:bg-white/[0.07] transition" />
                <div className="flex items-start gap-3 relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center glass-strong">
                    <GraduationCap className="w-5 h-5 text-white/85" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold tracking-tight">{ed.institution || ed.degree}</h3>
                    {ed.institution && <div className="text-sm text-white/70 mt-0.5">{ed.degree}</div>}
                    {(ed.period || ed.location) && (
                      <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-white/45">
                        {ed.period && <span className="inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {ed.period}</span>}
                        {ed.location && <span className="inline-flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {ed.location}</span>}
                      </div>
                    )}
                    {"grade" in ed && (ed as { grade?: string }).grade && (
                      <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11.5px]">
                        <span className="text-white/50">Grade</span>
                        <span className="font-semibold text-white/90">{(ed as { grade?: string }).grade}</span>
                      </div>
                    )}
                    {ed.detail && <p className="mt-3 text-[12.5px] text-white/60 leading-relaxed">{ed.detail}</p>}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* EXPLORING */}
      <section className="relative px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <SectionTag left="Currently Exploring" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {exploring.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl p-5 group hover:bg-white/[0.05] transition"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center glass mb-4">{exploreIcons[i]}</div>
                <div className="text-sm font-semibold mb-1.5">{e.title}</div>
                <div className="text-[12px] text-white/50 leading-relaxed">{e.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-6 h-6 mx-auto text-[#afa9ec] mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl md:text-4xl font-light tracking-tight leading-snug text-white/85"
          >
            "Building technology that <span className="text-gradient font-semibold">transforms ideas</span> into practical solutions."
          </motion.p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <SectionTag left="Get in Touch" right="terminal · ready" />
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8">
            <TerminalContact />
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Mail, label: "Email", val: profile.email, href: profile.mailUrl, accent: "text-[#afa9ec]" },
                { icon: Github, label: "GitHub", val: `github.com/${profile.githubHandle}`, href: profile.github, accent: "text-white" },
                { icon: Linkedin, label: "LinkedIn", val: profile.linkedinHandle, href: profile.linkedin, accent: "text-[#85b7eb]" },
                { icon: Building2, label: "Company", val: profile.company, href: "https://www.linkedin.com/company/orqelix/", accent: "text-[#9fe1cb]" },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("#") ? undefined : "_blank"} rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 hover:bg-white/[0.06] transition group">
                  <c.icon className={`w-5 h-5 ${c.accent} mb-3`} />
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-bold mb-1">{c.label}</div>
                  <div className="text-[13px] font-medium truncate">{c.val}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/5 mt-8">
        {/* Marquee */}
        <div className="overflow-hidden border-b border-white/5 py-6">
          <div className="marquee-track flex whitespace-nowrap gap-12">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-12 px-6">
                {["Python", "PyTorch", "YOLOv8", "OpenCV", "Computer Vision", "Flutter", "ML Engineering", "Open Source", "Orqelix", "TEFLX"].map((w) => (
                  <span key={w + k} className="text-3xl md:text-5xl font-black tracking-tight text-white/[0.07]">{w} ·</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-[12px] text-white/55">
            <span className="pulse-dot" /> Open to roles · {profile.location}
          </div>
          <div className="flex items-center gap-5 text-[12px] text-white/60">
            <a href={profile.mailUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
          </div>
          <div className="text-[11px] text-white/35">© 2025 Ritik Kashyap · TEFLX</div>
        </div>
      </footer>
    </div>
  );
}
