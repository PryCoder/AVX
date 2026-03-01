import React, { useState, useEffect } from "react";
import { 
  ChevronDown, 
  Sparkles, 
  MessageCircle, 
  Search,
  Mail,
  Clock,
  Zap,
  Layout,
  Code,
  Bot,
  DollarSign,
  HelpCircle,
  X
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    category: "Services",
    icon: Zap,
    description: "What we offer and how we can help your business grow",
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

const CategoryCard = ({ category, icon: Icon, description, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-start p-4 rounded-xl transition-all duration-300 text-left w-full ${
      isActive 
        ? "bg-stone-900 text-white shadow-lg" 
        : "bg-white hover:bg-stone-50 text-stone-600 border border-stone-100"
    }`}
  >
    <Icon className={`w-5 h-5 mb-2 ${isActive ? "text-white" : "text-stone-400"}`} />
    <span className="text-sm font-medium mb-1">{category}</span>
    <span className={`text-xs ${isActive ? "text-stone-300" : "text-stone-400"}`}>
      {description}
    </span>
  </button>
);

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState([]);

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
    <div className="min-h-screen w-full bg-gradient-to-br from-stone-50 via-white to-stone-50">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)]"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            variant="outline" 
            className="rounded-full px-4 py-1.5 border-stone-200 bg-white/50 backdrop-blur-sm text-stone-600 sfpro-font text-xs sm:text-sm mb-6 inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 clash-font leading-[1.1] mb-6">
            Got questions?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900">
              We've got answers.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-stone-500 sfpro-font max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about working with AVXONIA. 
            Can't find what you're looking for? Reach out to us directly.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 sm:mt-10">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-stone-400 transition-colors group-focus-within:text-stone-600" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 sm:pl-12 pr-12 py-5 sm:py-6 w-full text-sm sm:text-base rounded-full border-stone-200 bg-white/80 backdrop-blur-sm focus:border-stone-300 focus:ring-0 transition-all duration-300 sfpro-font shadow-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`p-4 rounded-xl transition-all duration-300 text-left ${
              selectedCategory === "all"
                ? "bg-stone-900 text-white shadow-lg"
                : "bg-white hover:bg-stone-50 text-stone-600 border border-stone-100"
            }`}
          >
            <HelpCircle className={`w-5 h-5 mb-2 ${selectedCategory === "all" ? "text-white" : "text-stone-400"}`} />
            <span className="text-sm font-medium mb-1 block">All Questions</span>
            <span className={`text-xs ${selectedCategory === "all" ? "text-stone-300" : "text-stone-400"}`}>
              Browse everything
            </span>
          </button>
          
          {faqs.map((category) => (
            <CategoryCard
              key={category.category}
              category={category.category}
              icon={category.icon}
              description={category.description}
              isActive={selectedCategory === category.category}
              onClick={() => setSelectedCategory(category.category)}
            />
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32">
        {filteredFaqs.length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {filteredFaqs.map((section) => (
              <div key={section.category} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 px-1">
                  <div className="p-2 bg-stone-100 rounded-lg">
                    <section.icon className="w-4 h-4 text-stone-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-stone-900 sfpro-font">
                      {section.category}
                    </h2>
                    <p className="text-xs text-stone-500 sfpro-font">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="bg-white rounded-2xl border border-stone-100 divide-y divide-stone-100 shadow-sm">
                  <Accordion type="multiple" className="w-full">
                    {section.items.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${section.category}-${index}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="px-5 sm:px-8 py-5 hover:no-underline hover:bg-stone-50/50 transition-colors group">
                          <span className="text-sm sm:text-base font-medium text-stone-800 group-hover:text-stone-900 sfpro-font text-left pr-8">
                            {item.q}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 sm:px-8 pb-6">
                          <div className="space-y-4 text-stone-600">
                            <p className="text-sm sm:text-base sfpro-font leading-relaxed">
                              {item.a}
                            </p>
                            
                            {item.details && (
                              <ul className="space-y-2 pl-4">
                                {item.details.map((detail, i) => (
                                  <li key={i} className="text-sm sm:text-base text-stone-500 sfpro-font flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                            
                            {item.note && (
                              <p className="text-sm text-stone-400 italic sfpro-font bg-stone-50 p-3 rounded-lg">
                                Note: {item.note}
                              </p>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No Results State
          <div className="text-center py-16 sm:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-stone-900 mb-2 clash-font">
              No questions found
            </h3>
            <p className="text-sm sm:text-base text-stone-500 mb-6 sfpro-font max-w-md mx-auto">
              We couldn't find any questions matching "{searchQuery}". Try different keywords or browse all categories.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="rounded-full px-6 py-5 border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-900 transition-all sfpro-font"
            >
              Clear search
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 sm:p-10 md:p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-stone-300" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 clash-font">
                Still have questions?
              </h3>
              
              <p className="text-stone-400 sfpro-font text-sm sm:text-base max-w-lg mx-auto mb-8">
                Our team is happy to help. Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleContactClick}
                  className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-8 py-6 sfpro-font text-sm font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Contact Us
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:hello@avxonia.com'}
                  variant="outline"
                  className="border-stone-700 text-white hover:bg-stone-800 rounded-full px-8 py-6 sfpro-font text-sm font-medium"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  hello@avxonia.com
                </Button>
              </div>
              
              <p className="text-xs text-stone-500 mt-6 sfpro-font">
                Or call us directly: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;