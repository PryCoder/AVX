// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Eye, ArrowLeft, User, Share2, 
  Bookmark, Heart, MessageCircle, ChevronLeft,
  Twitter, Facebook, Link2, BookmarkCheck
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Skeleton } from "../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const API_URL = import.meta.env.VITE_API_URL;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchBlogDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/blogs`);
      const foundBlog = res.data.data.find(b => b._id === id);
      setBlog(foundBlog);
      
      if (foundBlog?.tags) {
        const related = res.data.data
          .filter(b => b._id !== id && b.tags?.some(tag => foundBlog.tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    } finally {
      setLoading(false);
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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You might want to add a toast notification here
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: blog.title,
            text: blog.excerpt || 'Check out this article',
            url: url,
          });
        }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Skeleton className="h-[500px] w-full rounded-3xl mb-8" />
          <Skeleton className="h-14 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <div className="text-9xl font-bold text-purple-200 mb-4">404</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Article Not Found</h2>
          <p className="text-slate-600 mb-8">
            The article you're looking for doesn't exist or has been moved to another universe.
          </p>
          <Button 
            onClick={() => navigate('/blog')} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Back Button */}
       

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 relative"
        >
          {blog.coverImage ? (
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={blog.coverImage}
                alt={blog.title}
                className=" w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
            </div>
          ) : (
            <div className="h-[40vh] sm:h-[50vh] bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-6xl sm:text-2xl font-bold text-white"
              >
                {blog.title?.charAt(0)}
              </motion.h1>
            </div>
          )}

          {/* Title Section Overlay */}
          <div className="absolute bottom-0 left-0 right-0 text-white p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags?.map((tag, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-md text-white border-0 rounded-full px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition-all"
                    >
                      #{tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <h1 className="clash-font text-2xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 leading-tight">
                {blog.title}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Author and Meta Info */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-purple-200 ring-2 ring-purple-100">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-lg">
                  {getInitials(blog.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg sm:text-xl">{blog.author}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  {formatDate(blog.publishedAt)}
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-default">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">{blog.readTime || 5} min</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Reading time</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors cursor-default">
                    <Eye className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">{blog.views || 0}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Views</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`rounded-full hover:bg-slate-100 transition-all ${isLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isLiked ? 'Unlike' : 'Like'}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`rounded-full hover:bg-slate-100 transition-all ${isBookmarked ? 'text-purple-600' : ''}`}
                  >
                    {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isBookmarked ? 'Remove bookmark' : 'Bookmark'}</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-slate-100"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Share</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => handleShare('twitter')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('facebook')}>
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </motion.div>

          {/* Excerpt */}
          {blog.excerpt && (
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="italic bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 mb-8 border-l-4 border-purple-400"
            >
              <p className="text-lg sm:text-xl text-slate-700 italic leading-relaxed">
                "{blog.excerpt}"
              </p>
            </motion.div>
          )}

          {/* Main Content */}
          <motion.article 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="prose prose-lg max-w-none"
          >
            <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
              {blog.content}
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                You might also like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/blog/${post._id}`)}
                  >
                    <Card className="overflow-hidden rounded-xl border-0 shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="h-40 overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white text-4xl font-bold opacity-50">
                              {post.title?.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt).split(",")[0]}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 sm:hidden">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            onClick={handleShare}
          >
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}