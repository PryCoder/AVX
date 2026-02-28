// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, ArrowLeft, User, Share2, Bookmark } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Skeleton } from "../components/ui/skeleton";

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      // In a real app, you'd have a dedicated endpoint like `${API_URL}/blogs/${id}`
      const res = await axios.get(`${API_URL}/blogs`);
      const foundBlog = res.data.data.find(b => b._id === id);
      setBlog(foundBlog);
      
      // Fetch related posts (same tags)
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt || 'Check out this article',
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Skeleton className="h-96 w-full rounded-3xl mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-12" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 clash-font">Article Not Found</h2>
          <p className="text-gray-600 mb-8 sfpro-font">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} className="bg-purple-600 hover:bg-purple-700">
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        {blog.coverImage ? (
          <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
        ) : (
          <div className="h-[30vh] sm:h-[40vh] bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
            <h1 className="text-5xl sm:text-7xl font-bold text-white/20 clash-font">
              {blog.title?.charAt(0)}
            </h1>
          </div>
        )}

        {/* Title Section Overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-white p-6 sm:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-white/20 backdrop-blur-md text-white border-0 rounded-full px-4 py-1 text-sm"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 clash-font leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Author and Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-purple-200">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-base sm:text-lg">
                {getInitials(blog.author)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-base sm:text-lg sfpro-font">{blog.author}</p>
              <p className="text-xs sm:text-sm text-gray-500 sfpro-font">{formatDate(blog.publishedAt)}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">{blog.readTime || 5} min read</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-xs sm:text-sm text-gray-600">{blog.views || 0} views</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full hover:bg-gray-100"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <div className="bg-purple-50 rounded-2xl p-4 sm:p-6 mb-8">
            <p className="text-base sm:text-lg text-gray-700 italic sfpro-font leading-relaxed">
              "{blog.excerpt}"
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="prose prose-base sm:prose-lg max-w-none">
          <div className="whitespace-pre-wrap sfpro-font leading-relaxed text-gray-700">
            {blog.content}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 clash-font bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((post) => (
                <motion.div
                  key={post._id}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer"
                  onClick={() => navigate(`/blog/${post._id}`)}
                >
                  <Card className="overflow-hidden rounded-xl border-0 shadow-md hover:shadow-xl transition-all">
                    <div className="h-32 sm:h-40 overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-white text-3xl font-bold opacity-50">
                            {post.title?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedAt).split(",")[0]}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}