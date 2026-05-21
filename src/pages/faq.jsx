import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  MessageCircle, 
  Search,
  Mail,
  Clock,
  Zap,
  Layout,
  Code,
  DollarSign,
  HelpCircle,
  X,
  ArrowRight
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { Accordion as BaseAccordion } from '@base-ui/react/accordion';

// Magic UI Components
import { TextAnimate } from "../components/ui/text-animate";
import { AnimatedGridPattern } from "../components/ui/animated-grid-pattern";
import { Meteors } from "../components/ui/meteors";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { BorderBeam } from "../components/ui/border-beam";
import { MagicCard } from "../components/ui/magic-card";
import { Particles } from "../components/ui/particles";
import { AuroraBackground } from "../components/ui/aurora-background";

const faqs = [
  {
    category: "Services",
    icon: Zap,
    description: "What we offer and how we can help your business grow",
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    auroraColor: "blue",
    items: [
      {
        q: "What services does AVXONIA offer?",
        a: "AVXONIA offers three core services:",
        details: [
          "Website Development: Custom web applications, e-commerce platforms, landing pages, and enterprise solutions built with modern technologies like React, Next.js, and Node.js",
          "UI/UX Design: User research, wireframing, high-fidelity prototyping, design systems, and usability testing to create intuitive digital experiences",
          "AI Automation: Workflow automation, AI-powered chatbots, intelligent document processing, predictive analytics, and custom AI integrations"
        ],
      },
      {
        q: "Do you work with startups or only established businesses?",
        a: "We work with everyone — from early-stage startups to Fortune 500 companies. Our process is flexible and we tailor our approach based on your specific goals, timeline, and budget. We offer special packages for startups to help them get off the ground.",
      },
      {
        q: "Can you handle both design and development for a project?",
        a: "Yes! We offer comprehensive end-to-end services. We can take your project from initial concept and design all the way through development, testing, and deployment. Our integrated approach ensures seamless handoffs and consistent quality throughout.",
      },
      {
        q: "Do you offer ongoing support after project completion?",
        a: "Absolutely. We offer flexible maintenance and support packages including:",
        details: [
          "Technical support and bug fixes",
          "Performance monitoring and optimization",
          "Security updates and patches",
          "Content updates and feature additions",
          "24/7 emergency support for critical issues"
        ],
      },
    ],
  },
  {
    category: "Process",
    icon: Layout,
    description: "How we work and what to expect when partnering with us",
    gradient: "from-purple-500 via-pink-400 to-purple-600",
    auroraColor: "purple",
    items: [
      {
        q: "How does your project process work?",
        a: "Our proven 5-phase process ensures successful project delivery:",
        details: [
          "Discovery: We dive deep into your goals, target audience, and requirements through workshops and research",
          "Strategy: We create a detailed roadmap, technology stack recommendations, and project timeline",
          "Design: We craft wireframes, prototypes, and visual designs with your feedback at every step",
          "Development: We build your solution using agile methodology with regular progress updates",
          "Launch & Support: We deploy, test, and provide ongoing maintenance and optimization"
        ],
      },
      {
        q: "How long does a typical project take?",
        a: "Project timelines vary based on scope and complexity:",
        details: [
          "Landing pages & simple websites: 2-4 weeks",
          "E-commerce platforms: 6-12 weeks",
          "Custom web applications: 3-6 months",
          "Enterprise solutions: 4-8 months",
          "AI integrations: 4-10 weeks"
        ],
        note: "We provide detailed timeline estimates in our project proposals and keep you updated throughout the process.",
      },
      {
        q: "Will I be involved during the project?",
        a: "Absolutely! We believe in collaborative partnerships. You'll be involved through:",
        details: [
          "Weekly progress calls and updates",
          "Design review sessions",
          "Sprint demos of completed features",
          "Feedback cycles at key milestones",
          "Direct access to the project team via Slack/Teams"
        ],
      },
      {
        q: "How do you handle project feedback and revisions?",
        a: "We have a structured feedback process: After each milestone, you'll have a dedicated review period to provide feedback. We include revision rounds in our proposals, and any additional changes can be scoped separately. This ensures clarity and keeps the project moving forward efficiently.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    icon: DollarSign,
    description: "Transparent pricing and flexible payment options",
    gradient: "from-emerald-500 via-green-400 to-emerald-600",
    auroraColor: "green",
    items: [
      {
        q: "How much does a project cost?",
        a: "Our pricing is project-based and tailored to your specific needs. Here's what influences the cost:",
        details: [
          "Project complexity and features",
          "Design requirements and research needed",
          "Development time and technology stack",
          "Third-party integrations and APIs",
          "Timeline and resource requirements"
        ],
        note: "Contact us for a free, no-obligation quote. We'll provide a detailed breakdown of costs based on your requirements.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes, we offer flexible payment structures:",
        details: [
          "50% upfront, 25% at mid-point, 25% on completion",
          "Monthly retainers for ongoing work",
          "Custom milestone-based payments",
          "Discounts for annual commitments on maintenance"
        ],
      },
      {
        q: "What's included in your pricing?",
        a: "Our project quotes typically include:",
        details: [
          "Project management and planning",
          "Design and development work",
          "Quality assurance and testing",
          "Deployment and setup",
          "Documentation and training",
          "30 days of post-launch support"
        ],
      },
      {
        q: "Do you offer refunds?",
        a: "We're committed to your satisfaction. If you're not happy with our work during the initial design phase, we'll work with you to address concerns. For development work, payments are tied to completed milestones, ensuring you only pay for work delivered and approved.",
      },
    ],
  },
  {
    category: "Technical",
    icon: Code,
    description: "Technical details about our development approach",
    gradient: "from-indigo-500 via-blue-400 to-indigo-600",
    auroraColor: "indigo",
    items: [
      {
        q: "What technologies do you use?",
        a: "We use modern, industry-leading technologies:",
        details: [
          "Frontend: React, Next.js, TypeScript, Tailwind CSS",
          "Backend: Node.js, Python, Express",
          "Databases: MongoDB, PostgreSQL, Supabase",
          "AI/ML: OpenAI, LangChain, TensorFlow",
          "Cloud: AWS, Vercel, Netlify",
          "CMS: Sanity, Strapi, Contentful"
        ],
      },
      {
        q: "Will my website be mobile responsive?",
        a: "Yes, absolutely. All our projects are built with a mobile-first approach and are fully responsive across:",
        details: [
          "Mobile phones (all screen sizes)",
          "Tablets and iPads",
          "Laptops and desktops",
          "Large displays and TVs",
          "Print stylesheets (if needed)"
        ],
      },
      {
        q: "Can you integrate AI features into my existing website?",
        a: "Yes, we specialize in AI integrations. We can add:",
        details: [
          "Intelligent chatbots and virtual assistants",
          "Personalized recommendation engines",
          "Automated content generation",
          "Predictive analytics dashboards",
          "Document processing and extraction",
          "Sentiment analysis and customer insights"
        ],
      },
      {
        q: "How do you ensure website security?",
        a: "Security is paramount in our development process:",
        details: [
          "SSL/HTTPS encryption by default",
          "Secure authentication and authorization",
          "Regular security audits and penetration testing",
          "GDPR and data protection compliance",
          "DDoS protection and firewall configuration",
          "Automated backups and disaster recovery"
        ],
      },
    ],
  },
  {
    category: "Support & Maintenance",
    icon: Clock,
    description: "Ongoing support options and maintenance packages",
    gradient: "from-rose-500 via-red-400 to-rose-600",
    auroraColor: "rose",
    items: [
      {
        q: "What kind of post-launch support do you offer?",
        a: "We offer comprehensive support packages:",
        details: [
          "Technical support via email, chat, and phone",
          "Bug fixes and issue resolution",
          "Performance monitoring and optimization",
          "Security updates and patches",
          "Content updates and changes",
          "Analytics and reporting"
        ],
      },
      {
        q: "How quickly do you respond to support requests?",
        a: "Our response times vary by plan:",
        details: [
          "Basic: 48-72 hours",
          "Pro: 24-48 hours",
          "Enterprise: 4-8 hours",
          "Emergency: 1-2 hours (24/7 support)"
        ],
      },
      {
        q: "Can you help with scaling my application?",
        a: "Yes, we design all applications with scalability in mind. As your user base grows, we can help with:",
        details: [
          "Database optimization and indexing",
          "CDN integration and caching strategies",
          "Load balancing and auto-scaling",
          "Microservices architecture",
          "Performance optimization",
          "Cost optimization for cloud resources"
        ],
      },
    ],
  },
];

// Plus Icon Component for Accordion - refined artistic touch
const PlusIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    style={{ display: 'block', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', ...props.style }}
  >
    <path d="M1.5 8h13M8 14.5v-13" />
  </svg>
);

// Category Card - stable, no hover color effect, refined artistic styling
const CategoryCard = ({ category, icon: Icon, description, isActive, onClick, gradient }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.97 }}
    className={`relative overflow-hidden flex flex-col items-start p-4 sm:p-5 rounded-2xl transition-all duration-300 text-left w-full border ${
      isActive 
        ? "border-stone-200 shadow-sm" 
        : "border-stone-100 bg-white/80 backdrop-blur-sm"
    }`}
    style={{
      background: isActive 
        ? 'linear-gradient(135deg, #fafaf9, #ffffff)' 
        : 'rgba(255, 255, 255, 0.6)'
    }}
  >
    {isActive && <BorderBeam size={120} duration={6} delay={0} borderWidth={1.5} />}
    <div className={`relative z-10 mb-2 sm:mb-3 ${isActive ? `bg-gradient-to-r ${gradient} bg-clip-text text-transparent` : "text-stone-400"}`}>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
    </div>
    <span className={`text-xs sm:text-sm font-medium tracking-wide mb-0.5 sm:mb-1 relative z-10 ${isActive ? "text-stone-800" : "text-stone-500"}`}>
      {category}
    </span>
    <span className={`text-[10px] sm:text-xs leading-relaxed relative z-10 ${isActive ? "text-stone-400" : "text-stone-400"}`}>
      {description}
    </span>
  </motion.button>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter FAQs based on search and category
  const filteredFaqs = faqs
    .filter(cat => selectedCategory === "all" || cat.category === selectedCategory)
    .map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-stone-50/30">
      
      {/* Aurora Background with subtle artistic presence */}
      <AuroraBackground className="absolute inset-0 opacity-30" intensity={0.3}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute inset-0 mix-blend-soft-light" />
        ))}
      </AuroraBackground>
      
      {/* Animated Grid Pattern - delicate, like rice paper texture */}
      <AnimatedGridPattern
        numSquares={24}
        maxOpacity={0.03}
        duration={4}
        repeatDelay={2}
        className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black_30%,transparent_80%)]"
      />

      {/* Colored Meteors - whisper-thin */}
      <div className="absolute inset-0 pointer-events-none">
        <Meteors number={12} className="opacity-20" />
      </div>

      {/* Particles - single quiet color, like dust motes in sunlight */}
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={80}
        ease={70}
        color="#78716c"
        refresh
      />

   {/* Hero Section - Fixed responsive heading */}
<div className="relative w-full overflow-hidden pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Badge className="mb-4 sm:mb-6 bg-white/60 backdrop-blur-sm text-stone-500 border-stone-200/80 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wide">
        <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5 text-stone-400" />
        FAQ
      </Badge>
    </motion.div>
    
    {/* Responsive heading - using standard HTML with Tailwind instead of TextAnimate for better responsiveness */}
    <motion.h1 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.2] sm:leading-[1.15] mb-3 sm:mb-5 text-stone-800"
    >
      Got questions? <span className="font-medium">We've got answers.</span>
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="text-sm sm:text-base md:text-lg text-stone-500 font-light max-w-2xl mx-auto leading-relaxed px-2"
    >
      Everything you need to know about working with AVXONIA. 
      Can't find what you're looking for? Reach out directly.
    </motion.p>

    {/* Search Bar */}
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-8 sm:mt-10 md:mt-12"
    >
      <div className="relative">
        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300" />
        <Input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-5 w-full text-sm rounded-full border-stone-200 bg-white/60 backdrop-blur-sm focus:border-stone-300 focus:ring-1 focus:ring-stone-200 transition-all duration-200 font-light shadow-sm"
        />
        {searchQuery && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSearchQuery("")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 rounded-full hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-400" strokeWidth={1.5} />
          </motion.button>
        )}
      </div>
    </motion.div>
  </div>
</div>
      {/* Category Filters - stable, no hover color effects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          <CategoryCard
            category="All Questions"
            icon={HelpCircle}
            description="Browse everything"
            isActive={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            gradient="from-stone-400 to-stone-500"
          />
          
          {faqs.map((category) => (
            <CategoryCard
              key={category.category}
              category={category.category}
              icon={category.icon}
              description={category.description}
              isActive={selectedCategory === category.category}
              onClick={() => setSelectedCategory(category.category)}
              gradient={category.gradient}
            />
          ))}
        </div>
      </div>

      {/* FAQ Content with Base UI Accordion - artistic, handcrafted feel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 md:pb-36">
        <AnimatePresence mode="wait">
          {filteredFaqs.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 sm:space-y-10 md:space-y-14"
            >
              {filteredFaqs.map((section, sectionIdx) => (
                <motion.div 
                  key={section.category}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIdx * 0.08, duration: 0.4 }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Category Header - subtle and refined */}
                  <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-2 pb-1 border-b border-stone-100/80">
                    <div className={`p-1 sm:p-1.5 rounded-md bg-gradient-to-r ${section.gradient} bg-opacity-10`}>
                      <section.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className={`text-[10px] sm:text-xs tracking-wider uppercase font-medium bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                        {section.category}
                      </h2>
                      <p className="text-[10px] sm:text-[11px] text-stone-400 font-light mt-0.5">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Accordion with artistic card - no hover color effects */}
                  <MagicCard
                    gradientColor="#E7E5E455"
                    className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm"
                  >
                    <BaseAccordion.Root className="divide-y divide-stone-50" multiple>
                      {section.items.map((item, index) => (
                        <BaseAccordion.Item key={index} className="group">
                          <BaseAccordion.Header className="m-0">
                            <BaseAccordion.Trigger 
                              className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-left group cursor-pointer transition-all duration-200"
                            >
                              <span className="text-sm sm:text-base font-normal tracking-wide pr-3 sm:pr-4 text-stone-100 group-data-[popup-open]:text-stone-900 transition-colors duration-200">
                                {item.q}
                              </span>
                              <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-300 flex-shrink-0 group-data-[popup-open]:rotate-45 transition-transform duration-300 group-data-[popup-open]:text-stone-500" />
                            </BaseAccordion.Trigger>
                          </BaseAccordion.Header>
                          <BaseAccordion.Panel className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="space-y-3 sm:space-y-4 text-stone-500 pt-1"
                            >
                              <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed">
                                {item.a}
                              </p>
                              
                              {item.details && (
                                <ul className="space-y-2 sm:space-y-2.5 pl-3 sm:pl-4 mt-2 sm:mt-3">
                                  {item.details.map((detail, i) => (
                                    <motion.li 
                                      key={i}
                                      initial={{ opacity: 0, x: -6 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.04, duration: 0.2 }}
                                      className="text-xs sm:text-sm text-stone-400 font-light flex items-start gap-2 sm:gap-2.5 leading-relaxed"
                                    >
                                      <span className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-gradient-to-r ${section.gradient} mt-1.5 sm:mt-2 flex-shrink-0 opacity-60`} />
                                      <span>{detail}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              )}
                              
                              {item.note && (
                                <p className="text-[10px] sm:text-xs italic font-light text-stone-400 bg-stone-50/50 p-2 sm:p-3 rounded-lg border-l border-stone-100 mt-2 sm:mt-3">
                                  Note: {item.note}
                                </p>
                              )}
                            </motion.div>
                          </BaseAccordion.Panel>
                        </BaseAccordion.Item>
                      ))}
                    </BaseAccordion.Root>
                  </MagicCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // No Results State
            <motion.div 
              key="no-results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="text-center py-16 sm:py-20 md:py-24"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 border border-stone-100">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-stone-300" strokeWidth={1.25} />
              </div>
              <h3 className="text-base sm:text-lg font-normal text-stone-600 mb-2 tracking-wide">
                No questions found
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light mb-5 sm:mb-7 max-w-md mx-auto px-4">
                We couldn't find any questions matching "{searchQuery}". Try different keywords or browse all categories.
              </p>
              <ShimmerButton
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="shadow-sm bg-stone-800 text-white text-sm"
              >
                Clear search
              </ShimmerButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section - refined, artistic, premium feel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 sm:mt-20 md:mt-24"
        >
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 text-center overflow-hidden border border-stone-100/80 shadow-sm">
            <BorderBeam size={300} duration={12} delay={0} borderWidth={1} />
            
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-stone-100/50 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-stone-100/50 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div 
                whileHover={{ rotate: 3 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-stone-800 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-stone-100" strokeWidth={1.25} />
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-stone-800 mb-2 sm:mb-3 tracking-tight">
                Still have questions?
              </h3>
              
              <p className="text-stone-400 font-light text-xs sm:text-sm md:text-base max-w-lg mx-auto mb-6 sm:mb-8 px-2">
                Our team is happy to help. Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <ShimmerButton
                  onClick={handleContactClick}
                  className="bg-stone-800 text-white rounded-full px-6 sm:px-8 py-3 sm:py-5 text-xs sm:text-sm font-normal shadow-sm hover:bg-stone-700 transition-all"
                >
                  Contact Us
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" strokeWidth={1.5} />
                </ShimmerButton>
                <Button
                  onClick={() => window.location.href = 'mailto:hello@avxonia.com'}
                  variant="outline"
                  className="border-stone-200 text-stone-500 hover:bg-stone-50 rounded-full px-6 sm:px-8 py-3 sm:py-5 text-xs sm:text-sm font-normal"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" strokeWidth={1.25} />
                  hello@avxonia.com
                </Button>
              </div>
              
              <p className="text-[10px] sm:text-[11px] text-stone-300 mt-5 sm:mt-7 font-light tracking-wide">
                Or call us directly: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;