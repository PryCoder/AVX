// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Eye, Search, 
  BookOpen, User, ArrowRight, Sparkles,
  PenTool, Filter, X, ChevronRight,
  TrendingUp, Zap, Layers, Grid3x3,
  List, Newspaper, Tag, Share2,
  Heart, MessageCircle, Bookmark,
  ArrowUpRight, ExternalLink, Menu,
  Plus, Minus, ChevronDown, Star,
  Flame, Award, Rocket, Globe,
  Hash, Link2, Mail, Send,
  Moon, Sun, Monitor
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { ScrollArea } from "../components/ui/scroll-area";

const API_URL = import.meta.env.VITE_API_URL;

// Premium dark theme blog templates inspired by:
// - Shadcn Blocks Pro (Dark Theme)
// - Shadcn Studio Premium
// - Brandly Dark Blog
// - Studio IX Dark Theme
// - Kibo UI Dark
// - Solace UI Dark
// - Smooth UI Dark
// - Intent UI Dark

const LAYOUT_VARIANTS = [
  { id: "grid", icon: Grid3x3, label: "Grid" },
  { id: "list", icon: List, label: "List" },
  { id: "magazine", icon: Newspaper, label: "Magazine" },
];

// Premium dark theme color palette
const THEME = {
  background: {
    primary: 'bg-[#0A0A0A]',
    secondary: 'bg-[#141414]',
    tertiary: 'bg-[#1A1A1A]',
    quaternary: 'bg-[#222222]',
  },
  border: {
    primary: 'border-[#2A2A2A]',
    secondary: 'border-[#333333]',
    tertiary: 'border-[#3A3A3A]',
  },
  text: {
    primary: 'text-white',
    secondary: 'text-[#A0A0A0]',
    tertiary: 'text-[#6B6B6B]',
    muted: 'text-[#444444]',
  },
  accent: {
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-blue-600 to-cyan-600',
    tertiary: 'from-orange-500 to-red-500',
    quaternary: 'from-green-600 to-emerald-600',
  },
  gradient: {
    hero: 'from-[#0A0A0A] via-[#141414] to-[#1A1A1A]',
    card: 'from-[#141414] to-[#1A1A1A]',
    glow: 'from-purple-600/20 via-pink-600/20 to-transparent',
  }
};

export default function BlogPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [allTags, setAllTags] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [viewLayout, setViewLayout] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [featuredPost, setFeaturedPost] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    author: "Admin",
    tags: "",
    readTime: 5,
    isPublished: true,
    category: "General"
  });

  const categories = [
    "All",
    "Technology",
    "Design",
    "Development",
    "AI & ML",
    "Startup",
    "Marketing",
    "Productivity",
    "Security",
    "Cloud"
  ];

  // Premium color schemes for categories (dark theme)
  const categoryColors = {
    "Technology": "bg-blue-600/20 text-blue-400 border-blue-600/30",
    "Design": "bg-purple-600/20 text-purple-400 border-purple-600/30",
    "Development": "bg-green-600/20 text-green-400 border-green-600/30",
    "AI & ML": "bg-indigo-600/20 text-indigo-400 border-indigo-600/30",
    "Startup": "bg-orange-600/20 text-orange-400 border-orange-600/30",
    "Marketing": "bg-pink-600/20 text-pink-400 border-pink-600/30",
    "Productivity": "bg-teal-600/20 text-teal-400 border-teal-600/30",
    "Security": "bg-red-600/20 text-red-400 border-red-600/30",
    "Cloud": "bg-cyan-600/20 text-cyan-400 border-cyan-600/30",
    "General": "bg-gray-600/20 text-gray-400 border-gray-600/30"
  };

  // Premium gradient backgrounds for cards
  const cardGradients = [
    "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    "from-orange-600/20 via-red-600/20 to-pink-600/20",
    "from-indigo-600/20 via-purple-600/20 to-blue-600/20",
  ];

  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth === "true") {
      setIsAdmin(true);
    }
    fetchBlogs();
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileFilter(false);
      }
      if (window.innerWidth < 1024) {
        setShowSidebar(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let filtered = blogs;
    
    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTag !== "all") {
      filtered = filtered.filter(blog => blog.tags?.includes(selectedTag));
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    switch(sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "trending":
        filtered.sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
        break;
      default:
        break;
    }
    
    setFilteredBlogs(filtered);

    if (filtered.length > 0) {
      const featured = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0))[0];
      setFeaturedPost(featured);
      
      const trending = [...filtered]
        .filter(p => p._id !== featured._id)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 3);
      setTrendingPosts(trending);
      
      const recent = [...filtered]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentPosts(recent);
    }

    const tagCounts = {};
    filtered.forEach(blog => {
      blog.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tag]) => tag);
    setPopularTags(sortedTags);
    
  }, [searchTerm, selectedTag, selectedCategory, sortBy, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data.data);
      
      const tags = new Set();
      res.data.data.forEach(blog => {
        blog.tags?.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    try {
      const blogData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        readTime: Math.ceil(formData.content.split(" ").length / 200) || 5,
        views: 0,
        trendingScore: 0
      };
      
      await axios.post(`${API_URL}/blogs`, blogData);
      setOpen(false);
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        coverImage: "",
        author: "Admin",
        tags: "",
        readTime: 5,
        isPublished: true,
        category: "General"
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      alert(`Thank you for subscribing with: ${subscriberEmail}`);
      setSubscriberEmail("");
    }
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getGradientByIndex = (index) => {
    const gradients = [
      "from-blue-600 to-cyan-600",
      "from-purple-600 to-pink-600",
      "from-orange-600 to-red-600",
      "from-green-600 to-emerald-600",
      "from-yellow-600 to-orange-600",
      "from-indigo-600 to-purple-600"
    ];
    return gradients[index % gradients.length];
  };

  const getCategoryColor = (category) => {
    return categoryColors[category] || categoryColors["General"];
  };

  const BlogSkeleton = () => (
    <div className="bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A]">
      <Skeleton className="w-full h-48 bg-[#222222]" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-[#222222]" />
        <Skeleton className="h-4 w-full bg-[#222222]" />
        <Skeleton className="h-4 w-2/3 bg-[#222222]" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-[#222222]" />
          <Skeleton className="h-6 w-16 rounded-full bg-[#222222]" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 bg-[#222222]" />
          <Skeleton className="h-4 w-20 bg-[#222222]" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Premium Dark Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1A1A1A] border-b border-[#2A2A2A] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -right-40 w-[700px] h-[700px] bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-[#A0A0A0]">Welcome to our blog</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text bg-[length:200%] animate-gradient">
                Stories & Insights
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover the latest trends, tutorials, and insights from our team of experts
            </p>

            {/* Premium Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: BookOpen, label: "Articles", value: blogs.length },
                { icon: User, label: "Authors", value: "5+" },
                { icon: Clock, label: "Min Read", value: "5-10" },
                { icon: Flame, label: "Trending", value: "3" }
              ].map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 bg-[#141414] rounded-2xl px-6 py-3 border border-[#2A2A2A]"
                  >
                    <IconComponent className="w-5 h-5 text-purple-400" />
                    <div className="text-left">
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-[#6B6B6B]">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Premium Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] h-5 w-5 group-focus-within:text-purple-400 transition-colors" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base bg-[#141414] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B] rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Badge variant="outline" className="border-[#2A2A2A] text-[#6B6B6B] text-xs">
                    ⌘K
                  </Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        {/* Premium Filter Bar */}
        <div className="mb-10 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-xl">
              <Filter className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Browse Articles
            </h2>
            <Badge className="bg-[#141414] text-[#A0A0A0] border-[#2A2A2A]">
              {filteredBlogs.length} posts
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Layout Toggle */}
            <div className="flex items-center gap-1 bg-[#141414] rounded-xl p-1 border border-[#2A2A2A]">
              {LAYOUT_VARIANTS.map((layout) => {
                const Icon = layout.icon;
                return (
                  <button
                    key={layout.id}
                    onClick={() => setViewLayout(layout.id)}
                    className={`p-2 rounded-lg transition-all ${
                      viewLayout === layout.id 
                        ? "bg-purple-600/20 text-purple-400" 
                        : "text-[#6B6B6B] hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] rounded-xl bg-[#141414] border-[#2A2A2A] text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#141414] border-[#2A2A2A] text-white">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Premium Category Tabs */}
        <div className="mb-10 overflow-x-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="inline-flex gap-2 bg-[#141414] p-1 rounded-2xl border border-[#2A2A2A] flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`rounded-xl px-5 py-2 text-sm transition-all whitespace-nowrap ${
                    selectedCategory === category 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/20" 
                      : "text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Premium Featured Post */}
        {!loading && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div 
              className="relative overflow-hidden rounded-3xl cursor-pointer group bg-gradient-to-br from-[#141414] to-[#1A1A1A] border border-[#2A2A2A]"
              onClick={() => handleViewBlog(featuredPost._id)}
            >
              <div className="relative h-[400px] lg:h-[500px]">
                {!featuredPost.coverImage ? (
                  <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(0)} flex items-center justify-center`}>
                    <span className="text-white text-8xl font-bold opacity-30">
                      {featuredPost.title?.charAt(0) || 'F'}
                    </span>
                  </div>
                ) : (
                  <img 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
                
                <div className="absolute top-6 left-6 flex gap-2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-full px-4 py-1.5 text-xs font-semibold">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                  <Badge className={`${getCategoryColor(featuredPost.category)} border rounded-full px-3 py-1 text-xs`}>
                    {featuredPost.category || "General"}
                  </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-4 text-[#A0A0A0] mb-4 text-sm">
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.createdAt)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime || 5} min read
                      </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-[#A0A0A0] mb-6 line-clamp-2 max-w-2xl text-lg">
                      {featuredPost.excerpt || featuredPost.content?.substring(0, 150) + "..."}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags?.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-white/5 text-[#A0A0A0] border-[#2A2A2A] rounded-full px-3 py-1 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-8 py-3 font-semibold shadow-lg shadow-purple-600/20">
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium Trending Section */}
        {!loading && trendingPosts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-600/20 rounded-xl">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold">Trending Now</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-[#2A2A2A] to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleViewBlog(post._id)}
                  className="cursor-pointer group"
                >
                  <div className="bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-purple-600/30 transition-all duration-300">
                    <div className="relative h-52 overflow-hidden">
                      {!post.coverImage ? (
                        <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(index + 1)} flex items-center justify-center`}>
                          <span className="text-white text-5xl font-bold opacity-30">
                            {post.title?.charAt(0) || 'P'}
                          </span>
                        </div>
                      ) : (
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 rounded-full px-3 py-1 text-xs">
                          #{index + 1} Trending
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-400 transition-colors mb-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-3">
                        {post.excerpt || post.content?.substring(0, 80) + "..."}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                        <span>{post.author}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <BlogSkeleton key={n} />
            ))}
          </div>
        ) : (
          <>
            {filteredBlogs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-[#141414] rounded-3xl border border-[#2A2A2A]"
              >
                <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#6B6B6B]" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No articles found</h3>
                <p className="text-[#A0A0A0] max-w-md mx-auto">
                  We couldn't find any articles matching your search. Try different keywords or clear the filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("all");
                    setSelectedCategory("all");
                  }}
                  className="mt-6 rounded-xl border-[#2A2A2A] text-white hover:bg-[#1A1A1A]"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  viewLayout === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : viewLayout === "magazine"
                    ? "grid grid-cols-1 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredBlogs.map((blog, index) => {
                  if (viewLayout === "magazine" && index === 0) {
                    return (
                      <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="lg:col-span-3"
                      >
                        <div 
                          className="group bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-purple-600/30 transition-all duration-300 cursor-pointer"
                          onClick={() => handleViewBlog(blog._id)}
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden">
                              {!blog.coverImage ? (
                                <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(index)} flex items-center justify-center`}>
                                  <span className="text-white text-7xl font-bold opacity-30">{blog.title?.charAt(0) || 'M'}</span>
                                </div>
                              ) : (
                                <img 
                                  src={blog.coverImage} 
                                  alt={blog.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent md:hidden"></div>
                            </div>
                            <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                              <div className="flex items-center gap-3 mb-4">
                                <Badge className={`${getCategoryColor(blog.category)} border rounded-full`}>
                                  {blog.category || "General"}
                                </Badge>
                                <span className="text-sm text-[#6B6B6B]">{formatDate(blog.createdAt)}</span>
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                                {blog.title}
                              </h3>
                              <p className="text-[#A0A0A0] mb-6 line-clamp-3">
                                {blog.excerpt || blog.content?.substring(0, 120) + "..."}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 border border-[#2A2A2A]">
                                    <AvatarFallback className="bg-purple-600/20 text-purple-400">
                                      {getInitials(blog.author)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{blog.author}</p>
                                    <p className="text-sm text-[#6B6B6B]">{blog.readTime || 5} min read</p>
                                  </div>
                                </div>
                                <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/20 rounded-full">
                                  Read <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  if (viewLayout === "magazine" && index > 0) {
                    return (
                      <motion.div
                        key={blog._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className={index % 2 === 0 ? "lg:col-span-2" : "lg:col-span-1"}
                      >
                        <div 
                          className={`group bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-purple-600/30 transition-all duration-300 cursor-pointer h-full ${
                            index % 2 === 0 ? "flex flex-col md:flex-row" : ""
                          }`}
                          onClick={() => handleViewBlog(blog._id)}
                        >
                          <div className={index % 2 === 0 ? "md:w-2/5 h-56 md:h-auto relative overflow-hidden" : "relative h-56 overflow-hidden"}>
                            {!blog.coverImage ? (
                              <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(index)} flex items-center justify-center`}>
                                <span className="text-white text-5xl font-bold opacity-30">{blog.title?.charAt(0) || 'P'}</span>
                              </div>
                            ) : (
                              <img 
                                src={blog.coverImage} 
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                          </div>
                          <div className={index % 2 === 0 ? "md:w-3/5 p-6 flex flex-col justify-center" : "p-5"}>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${getCategoryColor(blog.category)} border rounded-full text-xs`}>
                                {blog.category || "General"}
                              </Badge>
                              <span className="text-xs text-[#6B6B6B]">{formatDate(blog.createdAt)}</span>
                            </div>
                            <h4 className={`font-bold mb-2 group-hover:text-purple-400 transition-colors ${
                              index % 2 === 0 ? "text-xl" : "text-lg"
                            }`}>
                              {blog.title}
                            </h4>
                            <p className="text-[#A0A0A0] line-clamp-2 text-sm">
                              {blog.excerpt || blog.content?.substring(0, 100) + "..."}
                            </p>
                            {index % 2 === 0 && (
                              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#2A2A2A]">
                                <Avatar className="h-8 w-8 border border-[#2A2A2A]">
                                  <AvatarFallback className="bg-purple-600/20 text-purple-400 text-xs">
                                    {getInitials(blog.author)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-[#A0A0A0]">{blog.author}</span>
                                <span className="text-sm text-[#6B6B6B]">•</span>
                                <span className="text-sm text-[#6B6B6B]">{blog.readTime || 5} min read</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  // Regular Grid or List view with premium dark theme styling
                  return (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={viewLayout === "list" ? "w-full" : ""}
                    >
                      <div 
                        className={`group bg-[#141414] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-purple-600/30 transition-all duration-300 cursor-pointer h-full flex flex-col ${
                          viewLayout === "list" ? "flex-row" : ""
                        }`}
                        onClick={() => handleViewBlog(blog._id)}
                      >
                        <div className={`relative overflow-hidden ${
                          viewLayout === "list" ? "w-1/3 h-56 flex-shrink-0" : "h-56"
                        }`}>
                          {!blog.coverImage ? (
                            <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(index)} flex items-center justify-center`}>
                              <span className="text-white text-6xl font-bold opacity-30">
                                {blog.title?.charAt(0) || 'B'}
                              </span>
                            </div>
                          ) : (
                            <img 
                              src={blog.coverImage} 
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                          
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {blog.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <Badge 
                                key={tagIndex} 
                                className="bg-black/50 backdrop-blur-sm text-white border-0 rounded-full px-3 py-1 text-xs"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {!blog.isPublished && (
                            <Badge className="absolute top-3 right-3 bg-yellow-600/80 text-white border-0 rounded-full px-3 py-1 text-xs">
                              Draft
                            </Badge>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7 border border-white/20">
                                <AvatarFallback className="bg-white/10 text-white text-xs">
                                  {getInitials(blog.author)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium truncate max-w-[100px]">
                                {blog.author}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {blog.readTime || 5}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`${
                          viewLayout === "list" ? "p-6 flex-1 flex flex-col justify-between" : "p-5 flex-1 flex flex-col"
                        }`}>
                          <Badge className={`${getCategoryColor(blog.category)} border rounded-full w-fit mb-3 text-xs`}>
                            {blog.category || "General"}
                          </Badge>

                          <h3 className={`font-bold mb-2 group-hover:text-purple-400 transition-colors ${
                            viewLayout === "list" ? "text-xl" : "text-lg"
                          }`}>
                            {blog.title}
                          </h3>

                          <p className={`text-[#A0A0A0] mb-4 line-clamp-2 ${
                            viewLayout === "list" ? "text-sm" : "text-sm"
                          }`}>
                            {blog.excerpt || (blog.content ? blog.content.substring(0, 100) + "..." : "")}
                          </p>

                          <div className="mt-auto pt-4 border-t border-[#2A2A2A]">
                            <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
                              <span className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5" />
                                {blog.publishedAt ? formatDate(blog.publishedAt).split(",")[0] : 'N/A'}
                              </span>
                              <span className="flex items-center gap-2">
                                <Eye className="h-3.5 w-3.5" />
                                {blog.views || 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/5 to-pink-600/5 blur-xl"></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </>
        )}

        {/* Premium Newsletter Section */}
        {!loading && filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-br from-[#141414] to-[#1A1A1A] rounded-3xl p-8 sm:p-12 border border-[#2A2A2A] relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 -left-40 w-[400px] h-[400px] bg-purple-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] bg-pink-600 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl sm:text-3xl font-bold">Never miss an article</h2>
              </div>
              <p className="text-[#A0A0A0] mb-8">
                Subscribe to our newsletter and get the latest posts delivered to your inbox
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input 
                  placeholder="Enter your email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  type="email"
                  required
                  className="flex-1 bg-[#0A0A0A] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B] rounded-xl py-6"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-8 py-6 font-semibold shadow-lg shadow-purple-600/20">
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Premium Popular Tags */}
        {!loading && popularTags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#2A2A2A]">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold">Popular Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, i) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? "all" : tag);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/20"
                      : "bg-[#141414] text-[#A0A0A0] hover:text-white border border-[#2A2A2A] hover:border-purple-600/30"
                  }`}
                >
                  #{tag}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Blog Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#141414] border-[#2A2A2A] text-white p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Create New Story
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="text-[#A0A0A0]">Title *</Label>
              <Input
                placeholder="Enter an engaging title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={200}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl"
              />
              <p className="text-xs text-[#6B6B6B]">{formData.title.length}/200 characters</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#A0A0A0]">Excerpt</Label>
              <Textarea
                placeholder="Brief summary of your post..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                maxLength={500}
                rows={2}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl"
              />
              <p className="text-xs text-[#6B6B6B]">{formData.excerpt.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <Label className="text-[#A0A0A0]">Content *</Label>
              <Textarea
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#A0A0A0]">Cover Image URL</Label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#A0A0A0]">Author</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#A0A0A0]">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-[#2A2A2A] text-white">
                    {categories.filter(c => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#A0A0A0]">Tags (comma separated)</Label>
              <Input
                placeholder="React, JavaScript, Web Dev"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white rounded-xl"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded border-[#2A2A2A] bg-[#0A0A0A] text-purple-600 focus:ring-purple-600/20"
              />
              <Label htmlFor="isPublished" className="text-[#A0A0A0]">Publish immediately</Label>
            </div>

            <Button 
              onClick={handleCreateBlog} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-purple-600/20"
              disabled={!formData.title || !formData.content}
            >
              Publish Story
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}