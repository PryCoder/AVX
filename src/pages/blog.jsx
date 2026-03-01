// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Eye, Search, 
  BookOpen, User, ArrowRight, Sparkles,
  PenTool, Filter
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL;

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

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    author: "Admin",
    tags: "",
    readTime: 5,
    isPublished: true
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth === "true") {
      setIsAdmin(true);
    }
    fetchBlogs();
    
    // Handle resize for mobile filter
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileFilter(false);
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
    
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedTag, blogs]);

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
        readTime: Math.ceil(formData.content.split(" ").length / 200) || 5
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
        isPublished: true
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
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-indigo-500 to-purple-500"
    ];
    return gradients[index % gradients.length];
  };

  const BlogSkeleton = () => (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-lg">
      <Skeleton className="w-full h-48 sm:h-56" />
      <CardContent className="p-4 sm:p-6">
        <Skeleton className="h-6 sm:h-7 w-3/4 mb-3" />
        <Skeleton className="h-3 sm:h-4 w-full mb-2" />
        <Skeleton className="h-3 sm:h-4 w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
          <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-full" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
          <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 border border-white/20"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
              <span className="text-xs sm:text-sm font-medium sfpro-font">Welcome to our blog</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 clash-font leading-tight">
              Stories & 
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 text-transparent bg-clip-text block sm:inline"> Insights</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 sm:mb-12 sfpro-font leading-relaxed px-4">
              Discover the latest trends, tutorials, and insights from our team of experts
            </p>

            {/* Stats - Responsive Grid */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12 sm:mb-16">
              {[
                { icon: BookOpen, label: "Articles", value: blogs.length },
                { icon: User, label: "Authors", value: "5+" },
                { icon: Clock, label: "Min Read", value: "5-10" }
              ].map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-white/10"
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
                    <div>
                      <div className="text-lg sm:text-2xl font-bold clash-font">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-white/70 sfpro-font">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-xl mx-auto px-4"
            >
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5 group-focus-within:text-purple-400 transition-colors" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 sm:pl-12 pr-3 sm:pr-4 py-4 sm:py-6 text-sm sm:text-base bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/50 rounded-xl sm:rounded-2xl focus:bg-white/20 transition-all sfpro-font"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider - Hide on mobile */}
        <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {/* Filter Bar */}
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg sm:rounded-xl">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold clash-font bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Browse Articles
            </h2>
          </div>
          
          {/* Desktop Tags */}
          <div className="hidden md:flex gap-2 flex-wrap">
            <Button
              variant={selectedTag === "all" ? "default" : "outline"}
              onClick={() => setSelectedTag("all")}
              className={`text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base sfpro-font ${
                selectedTag === "all" 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              All Articles
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                onClick={() => setSelectedTag(tag)}
                className={`text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base sfpro-font ${
                  selectedTag === tag 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden w-full flex items-center justify-between rounded-xl border-gray-200"
          >
            <span className="text-white sfpro-font text-sm">Filter by tag</span>
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Filter Dropdown */}
        <AnimatePresence>
          {showMobileFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mb-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl">
                <Button
                  variant={selectedTag === "all" ? "default" : "outline"}
                  onClick={() => {
                    setSelectedTag("all");
                    setShowMobileFilter(false);
                  }}
                  className="rounded-full text-sm"
                  size="sm"
                >
                  All
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    onClick={() => {
                      setSelectedTag(tag);
                      setShowMobileFilter(false);
                    }}
                    className="text-white rounded-full text-sm"
                    size="sm"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Button */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-10"
          >
            <Button 
              onClick={() => setOpen(true)} 
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 sm:px-8 py-5 sm:py-6 shadow-lg shadow-purple-200 group sfpro-font text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Write New Story
            </Button>
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && filteredBlogs.length > 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 sfpro-font"
          >
            Showing <span className="font-semibold text-purple-600">{filteredBlogs.length}</span> articles
            {selectedTag !== "all" && ` in #${selectedTag}`}
          </motion.p>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                className="text-center py-12 sm:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-sm px-4"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 clash-font">No articles found</h3>
                <p className="text-sm sm:text-base text-gray-500 sfpro-font max-w-md mx-auto px-4">
                  We couldn't find any articles matching your search. Try different keywords or clear the filters.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("all");
                  }}
                  className="mt-4 sm:mt-6 rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50 text-sm sm:text-base"
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              >
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <Card 
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col rounded-2xl sm:rounded-3xl border-0 bg-white relative"
                      onClick={() => handleViewBlog(blog._id)}
                    >
                      {/* Image Container */}
                      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
                        {!blog.coverImage ? (
                          <div className={`w-full h-full bg-gradient-to-br ${getGradientByIndex(index)} flex items-center justify-center`}>
                            <span className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold opacity-30 clash-font">
                              {blog.title?.charAt(0) || 'B'}
                            </span>
                          </div>
                        ) : (
                          <img 
                            src={blog.coverImage} 
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${getGradientByIndex(index)} flex items-center justify-center"><span class="text-white text-5xl sm:text-6xl lg:text-7xl font-bold opacity-30">${blog.title?.charAt(0) || 'B'}</span></div>`;
                            }}
                          />
                        )}
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Tags */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                          {blog.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              className="bg-white/20 backdrop-blur-md text-white border-0 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sfpro-font"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Draft Badge */}
                        {!blog.isPublished && (
                          <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-yellow-500 text-white border-0 rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                            Draft
                          </Badge>
                        )}

                        {/* Meta Info on Image */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <Avatar className="h-6 w-6 sm:h-7 sm:w-8 border border-white/50">
                              <AvatarFallback className="bg-white/20 text-white text-[10px] sm:text-xs">
                                {getInitials(blog.author)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs sm:text-sm font-medium sfpro-font truncate max-w-[80px] sm:max-w-none">
                              {blog.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                            <span className="flex items-center gap-0.5 sm:gap-1">
                              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {blog.readTime || 5}
                            </span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                        {/* Title */}
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors clash-font leading-tight">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-1 sfpro-font leading-relaxed">
                          {blog.excerpt || (blog.content ? blog.content.substring(0, 100) + "..." : "")}
                        </p>

                        {/* Footer */}
                        <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                {blog.publishedAt ? formatDate(blog.publishedAt).split(",")[0] : 'N/A'}
                              </span>
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                {blog.views || 0}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </CardContent>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-xl"></div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Newsletter Section */}
        {!loading && filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
            
            <div className="relative max-w-3xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 clash-font">Never miss an article</h2>
              <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8 sfpro-font">
                Subscribe to our newsletter and get the latest posts delivered to your inbox
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
                <Input 
                  placeholder="Enter your email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  type="email"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl py-5 sm:py-6 text-sm sm:text-base sfpro-font"
                />
                <Button type="submit" className="bg-white text-purple-600 hover:bg-gray-100 rounded-xl px-6 sm:px-8 py-5 sm:py-6 font-semibold text-sm sm:text-base sfpro-font">
                  Subscribe
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Blog Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-bold clash-font bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Create New Story
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="sfpro-font text-sm sm:text-base">Title *</Label>
              <Input
                id="title"
                placeholder="Enter an engaging title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={200}
                className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 sfpro-font">{formData.title.length}/200 characters</p>
            </div>

            {/* Rest of the form fields with responsive classes */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="sfpro-font text-sm sm:text-base">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of your post..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                maxLength={500}
                rows={2}
                className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 sfpro-font">{formData.excerpt.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="sfpro-font text-sm sm:text-base">Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="font-mono rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="sfpro-font text-sm sm:text-base">Cover Image URL</Label>
              <Input
                id="coverImage"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author" className="sfpro-font text-sm sm:text-base">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="sfpro-font text-sm sm:text-base">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="React, JavaScript, Web Dev"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-200"
              />
              <Label htmlFor="isPublished" className="sfpro-font text-sm sm:text-base">Publish immediately</Label>
            </div>

            <Button 
              onClick={handleCreateBlog} 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-5 sm:py-6 text-base sm:text-lg font-semibold sfpro-font"
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