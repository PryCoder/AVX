import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Search, X, ChevronDown, Mail,
  Zap, Layout, DollarSign, Code, Clock, HelpCircle, Menu, MessageCircle,
  CheckCircle, BarChart3, Bot, ArrowUpRight, ChevronRight
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { MagneticButton } from "../components/ui/magnetic-button";
import Glow from "../components/ui/glow";
import { TextAnimate } from "../components/ui/text-animate";
import { AuroraText } from "../components/ui/aurora-text";
import { AnimatedGridPattern } from "../components/ui/animated-grid-pattern";
import { Meteors } from "../components/ui/meteors";
import { RetroGrid } from "../components/ui/retro-grid";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { CanvasText } from "../components/ui/canvas-text";

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const premiumEase = [0.22, 1, 0.36, 1];
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: premiumEase }
};
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const SectionWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: premiumEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All", short: "All", icon: HelpCircle, count: 19 },
  { id: "services", label: "Services", short: "SVC", icon: Zap, count: 4 },
  { id: "process", label: "Process", short: "PRC", icon: Layout, count: 4 },
  { id: "pricing", label: "Pricing", short: "PRI", icon: DollarSign, count: 4 },
  { id: "tech", label: "Technical", short: "TCH", icon: Code, count: 4 },
  { id: "support", label: "Support", short: "SUP", icon: Clock, count: 3 },
];

const FAQS = [
  { id: 1, cat: "services", q: "What services does AVXONIA offer?",
    a: "AVXONIA delivers three core services: Website Development — custom web applications, e-commerce platforms, and enterprise solutions built on React, Next.js, and Node.js; UI/UX Design — user research, wireframing, high-fidelity prototyping, and design systems; and AI Automation — workflow automation, intelligent chatbots, document processing, and custom AI integrations.",
    tags: ["Web Dev", "UI/UX", "AI"] },
  { id: 2, cat: "services", q: "Do you work with startups or only established businesses?",
    a: "Everyone is welcome — from pre-seed founders to Fortune 500 teams. Our process adapts to your stage, budget, and timeline. Early-stage startups benefit from our dedicated startup packages designed to maximize impact at lean cost.",
    tags: ["Startups", "Enterprise"] },
  { id: 3, cat: "services", q: "Can you handle both design and development for a project?",
    a: "Yes — we operate as a full end-to-end studio. From first-concept sketches through design, engineering, QA, and deployment, our integrated teams ensure seamless handoffs and consistent quality at every stage.",
    tags: ["End-to-End", "Full Studio"] },
  { id: 4, cat: "services", q: "Do you offer ongoing support after project completion?",
    a: "Absolutely. Post-launch, you can choose from flexible maintenance packages covering technical support, performance monitoring, security patches, content updates, and 24/7 emergency response for critical issues.",
    tags: ["Maintenance", "Support"] },
  { id: 5, cat: "process", q: "How does your project process work?",
    a: "Our five-phase model: Discovery (goals, audience, requirements workshops) → Strategy (roadmap, tech-stack selection, timeline) → Design (wireframes, prototypes, visual design) → Development (agile sprints, regular demos) → Launch & Support (deployment, testing, optimization). You're an active collaborator throughout.",
    tags: ["5-Phase", "Agile"] },
  { id: 6, cat: "process", q: "How long does a typical project take?",
    a: "Timelines scale with scope: landing pages in 2–4 weeks, e-commerce in 6–12 weeks, custom apps in 3–6 months, enterprise builds in 4–8 months, and AI integrations in 4–10 weeks. Every proposal includes a detailed timeline with milestone markers.",
    tags: ["Timeline", "Milestones"] },
  { id: 7, cat: "process", q: "Will I be involved during the project?",
    a: "Deeply. Weekly progress calls, design review sessions, sprint demos, milestone-based feedback cycles, and direct Slack/Teams access to your dedicated project team. You'll always know exactly where things stand.",
    tags: ["Collaborative", "Transparent"] },
  { id: 8, cat: "process", q: "How do you handle project feedback and revisions?",
    a: "After each milestone you receive a structured review period. Revision rounds are included in the proposal; additional changes are scoped transparently. This clarity keeps the project moving efficiently without surprises.",
    tags: ["Revisions", "Process"] },
  { id: 9, cat: "pricing", q: "How much does a project cost?",
    a: "Pricing is bespoke — influenced by complexity, design scope, development effort, integrations, and timeline. Contact us for a free, detailed quote with full cost breakdown. No obligation, no opaque line items.",
    tags: ["Custom Quote", "Transparent"] },
  { id: 10, cat: "pricing", q: "Do you offer payment plans?",
    a: "Yes. Standard split is 50% upfront / 25% at mid-point / 25% on completion. We also offer monthly retainers for ongoing work, milestone-based custom structures, and annual-commitment discounts on maintenance.",
    tags: ["Flexible", "Payment"] },
  { id: 11, cat: "pricing", q: "What's included in your pricing?",
    a: "Every quote covers: project management, design, development, QA and testing, deployment and setup, documentation and training, and 30 days of post-launch support. What you see is what you get.",
    tags: ["All-Inclusive"] },
  { id: 12, cat: "pricing", q: "Do you offer refunds?",
    a: "Satisfaction is our commitment. During the initial design phase, we'll work through any concerns together. For development, payments are milestone-tied — you only pay for delivered and approved work.",
    tags: ["Guarantee", "Fair"] },
  { id: 13, cat: "tech", q: "What technologies do you use?",
    a: "Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Node.js, Python, Express. Databases: MongoDB, PostgreSQL, Supabase. AI/ML: OpenAI, LangChain, TensorFlow. Cloud: AWS, Vercel, Netlify. CMS: Sanity, Strapi, Contentful.",
    tags: ["React", "Node.js", "AI/ML"] },
  { id: 14, cat: "tech", q: "Will my website be mobile responsive?",
    a: "Always. Every project starts mobile-first and scales up to tablets, laptops, desktops, large displays, and print stylesheets where needed. Responsive is a baseline, not an add-on.",
    tags: ["Mobile-First", "Responsive"] },
  { id: 15, cat: "tech", q: "Can you integrate AI features into my existing website?",
    a: "Yes — we specialize in retrofit AI integration: chatbots and virtual assistants, recommendation engines, automated content generation, predictive analytics, document processing, and sentiment analysis layered onto your current stack.",
    tags: ["AI Integration", "Existing Sites"] },
  { id: 16, cat: "tech", q: "How do you ensure website security?",
    a: "Security is baked in from day one: SSL/HTTPS default, secure auth flows, regular audits and pen-testing, GDPR compliance, DDoS protection, firewall configuration, automated backups, and disaster recovery plans.",
    tags: ["Security", "GDPR"] },
  { id: 17, cat: "support", q: "What kind of post-launch support do you offer?",
    a: "Comprehensive packages: technical support via email/chat/phone, bug fixes, performance monitoring, security updates, content changes, and analytics reporting. Tailored to how much coverage your project needs.",
    tags: ["Post-Launch", "Monitoring"] },
  { id: 18, cat: "support", q: "How quickly do you respond to support requests?",
    a: "Basic plan: 48–72 hours. Pro plan: 24–48 hours. Enterprise: 4–8 hours. Emergency (24/7): 1–2 hours. Every tier includes SLA-backed commitments so you always know what to expect.",
    tags: ["SLA", "Response Times"] },
  { id: 19, cat: "support", q: "Can you help with scaling my application?",
    a: "Absolutely. All builds are designed for growth: database indexing and optimization, CDN and caching strategies, load balancing, auto-scaling, microservices architecture, performance tuning, and cloud-cost optimization as usage climbs.",
    tags: ["Scaling", "Performance"] },
];

const padNum = (n) => String(n).padStart(2, "0");

// ─── TICKER COMPONENT (Landing Page Style) ──────────────────────────────────
const TICKER_ITEMS = [
  "Website Development", "UI/UX Design", "AI Automation",
  "React & Next.js", "Mobile-First", "24/7 Support",
  "GDPR Compliant", "Agile Process", "Custom Solutions",
  "Enterprise Ready", "Startup Packages", "End-to-End Studio",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-t border-b border-stone-800 py-3 bg-black">
      <motion.div
        className="flex gap-8 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-stone-400 text-xs tracking-wider uppercase flex items-center gap-4">
            {item}
            <span className="text-stone-600 text-[6px]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── CATEGORY PILL (Landing Page Style) ─────────────────────────────────────
function CatPill({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300",
        active
          ? "bg-stone-900 text-white border border-stone-700"
          : "bg-transparent text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-700"
      )}
    >
      {label}
      <span className={cn(
        "text-[10px] px-1.5 py-0.5 rounded",
        active ? "bg-stone-700 text-stone-300" : "bg-stone-100 text-stone-500"
      )}>
        {count}
      </span>
    </button>
  );
}

// ─── MAIN FAQ COMPONENT ──────────────────────────────────────────────────────
const FAQ = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filtered = FAQS.filter(f => {
    const matchCat = cat === "all" || f.cat === cat;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => { setActive(null); }, [cat, search]);

  const selectedFaq = active ? FAQS.find(f => f.id === active) : null;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Sticky CTA */}
      <motion.a
        href="/contact"
        onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
        className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:bg-stone-800 transition-colors duration-300"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <MessageCircle className="w-6 h-6" />
        </motion.div>
      </motion.a>

      {/* ── HEADER SECTION (Landing Page Hero Style) ── */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div variants={fadeInUp} className="flex justify-center">
            <div className="group relative inline-flex items-center rounded-full px-4 py-1.5 bg-stone-100 border border-stone-200">
              <span className="text-sm font-medium bg-gradient-to-r from-stone-600 to-stone-900 bg-clip-text text-transparent">FAQ</span>
              <ChevronRight className="ml-1 size-4 text-stone-400" />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight clash-font">
              <span className="bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 bg-clip-text text-transparent">
                Questions &
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Answers
              </span>
            </h1>
            <p className="text-stone-500 text-lg mt-4 max-w-2xl mx-auto">
              Everything you need to know about working with AVXONIA
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full border border-stone-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-stone-400" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 pt-4">
            {CATEGORIES.map(c => (
              <CatPill
                key={c.id}
                label={c.label}
                active={cat === c.id}
                count={c.count}
                onClick={() => setCat(c.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <Ticker />

      {/* ── MAIN BODY ── */}
      <main className="relative z-10 flex flex-col md:flex-row min-h-[600px]">
        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="m-4 px-4 py-2 bg-stone-900 text-white rounded-full text-xs tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Menu size={14} /> Browse Questions ({filtered.length})
          </button>
        )}

        {/* Sidebar */}
        <aside className={cn(
          "md:w-80 lg:w-96 border-r border-stone-200 bg-white/50 backdrop-blur-sm z-20 transition-transform duration-300",
          isMobile ? "fixed inset-y-0 left-0 w-full max-w-sm" : "sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto",
          isMobile && !mobileSidebarOpen && "-translate-x-full"
        )}>
          <div className="p-4 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-10">
            <span className="text-xs text-stone-500 uppercase tracking-wider">{filtered.length} questions</span>
            {isMobile && (
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X size={16} />
              </button>
            )}
          </div>
          <div className="divide-y divide-stone-100">
            {filtered.map((faq, idx) => (
              <button
                key={faq.id}
                onClick={() => {
                  setActive(active === faq.id ? null : faq.id);
                  if (isMobile) setMobileSidebarOpen(false);
                }}
                className={cn(
                  "w-full text-left p-4 transition-all duration-300 flex items-start gap-3 group",
                  active === faq.id ? "bg-stone-900 text-white" : "hover:bg-stone-50"
                )}
              >
                <span className={cn(
                  "text-xs font-mono mt-0.5",
                  active === faq.id ? "text-stone-400" : "text-stone-400"
                )}>
                  {padNum(faq.id)}
                </span>
                <span className={cn(
                  "flex-1 text-sm leading-relaxed",
                  active === faq.id ? "text-white" : "text-stone-400"
                )}>
                  {faq.q}
                </span>
                <ChevronDown size={14} className={cn(
                  "shrink-0 transition-transform duration-200",
                  active === faq.id && "rotate-180"
                )} />
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobile && mobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-15" onClick={() => setMobileSidebarOpen(false)} />
        )}

        {/* Answer Panel */}
        <section className="flex-1 p-6 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            {!active ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[50vh] text-center"
              >
                <div className="text-8xl font-bold text-stone-200 mb-4">?</div>
                <p className="text-stone-500">Select a question from the list</p>
                <p className="text-sm text-stone-400 mt-1">{filtered.length} answers available</p>
              </motion.div>
            ) : (
              <motion.div
                key={`answer-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                {selectedFaq && (
                  <>
                    <div className="flex items-center gap-3 text-sm text-stone-500 mb-6">
                      <span className="uppercase tracking-wider text-stone-400">
                        {CATEGORIES.find(c => c.id === selectedFaq.cat)?.label}
                      </span>
                      <span className="text-stone-300">—</span>
                      <span>Entry {padNum(selectedFaq.id)}</span>
                    </div>

                    <div className="text-5xl font-bold text-stone-200 mb-2">{padNum(selectedFaq.id)}</div>
                    <div className="w-16 h-px bg-stone-900/20 my-4" />

                    <h2 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-6 leading-tight">
                      {selectedFaq.q}
                    </h2>

                    <p className="text-stone-600 leading-relaxed text-lg border-l-2 border-stone-900/20 pl-5 mb-6">
                      {selectedFaq.a}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedFaq.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 bg-stone-100 text-stone-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 border-t border-stone-100">
                      {(() => {
                        const idx = filtered.findIndex(f => f.id === active);
                        const prev = filtered[idx - 1];
                        const next = filtered[idx + 1];
                        return (
                          <>
                            <button
                              onClick={() => prev && setActive(prev.id)}
                              className={cn(
                                "text-left transition-all",
                                prev ? "opacity-100 hover:translate-x-0" : "opacity-0 pointer-events-none"
                              )}
                            >
                              <div className="text-xs text-stone-400 mb-1">← Previous</div>
                              <div className="text-sm text-stone-200 max-w-[200px] truncate">{prev?.q}</div>
                            </button>
                            <button
                              onClick={() => next && setActive(next.id)}
                              className={cn(
                                "text-right transition-all",
                                next ? "opacity-100 hover:translate-x-0" : "opacity-0 pointer-events-none"
                              )}
                            >
                              <div className="text-xs text-stone-400 mb-1">Next →</div>
                              <div className="text-sm text-stone-200 max-w-[200px] truncate">{next?.q}</div>
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* ── FOOTER CTA (Landing Page Style) ── */}
      <footer className="border-t border-stone-200 bg-stone-900 text-white py-16 px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold clash-font">
            Still have questions?
          </h2>
          <p className="text-stone-400 text-lg">
            We're here to help you understand how AVXONIA can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              asChild
              className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-8 py-6"
            >
              <Link to="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <ShimmerButton onClick={() => navigate('/contact')}>
              Book a Free Consultation
            </ShimmerButton>
          </div>
          <div className="pt-8 text-stone-500 text-sm">
            <a href="mailto:hello@avxonia.com" className="hover:text-white transition-colors">
              hello@avxonia.com
            </a>
            <span className="mx-3">•</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;