// components/ContactPage.jsx
'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Phone, User, MessageSquare, AlertCircle, Check, Loader2 } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import Earth from '../components/ui/globe';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    if (error) setError('');
  };
  
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${API}/contacts`, 
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map((e) => e.msg).join(' ');
        setError(errorMessages);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to send message. Please try again.');
      }
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Email",
      value: "Avxoniainnovations@gmail.com",
      link: "mailto:Avxoniainnovations@gmail.com"
    },
    {
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
      title: "Phone",
      value: "+91-8898022337",
      link: "tel:+918898022337"
    },
  ];

  return (
    <section className="bg-background relative w-full overflow-hidden py-12 sm:py-16 md:py-24">
      {/* Animated Gradient Orbs */}
      <div
        className="absolute top-0 left-0 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] rounded-full opacity-20 blur-[80px] sm:blur-[100px] md:blur-[120px]"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] rounded-full opacity-10 blur-[60px] sm:blur-[80px] md:blur-[100px]"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-rose-500/30 animate-float"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-6">
        <div className="border-border/40 bg-secondary/20 mx-auto max-w-6xl overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px] border shadow-xl backdrop-blur-sm">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Contact Information Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 sm:mb-6 md:mb-8"
              >
                <div className="relative">
                  <h2 className="font-clash from-foreground to-foreground/80 mb-1 sm:mb-2 bg-gradient-to-r bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-transparent">
                    Get in
                  </h2>
                  <span className="font-clash text-primary relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight italic">
                    Touch
                  </span>
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-rose-500 to-transparent rounded-full animate-pulse" />
                </div>
                <p className="font-clash text-muted-foreground mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </motion.div>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-background/40 backdrop-blur-sm border-border/40 hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-3 sm:p-4 md:p-5">
                      <a
                        href={info.link}
                        className="flex items-center gap-3 sm:gap-4 group"
                        target={info.link !== '#' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        <div className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                          <div className="text-primary group-hover:text-primary/80 transition-colors">
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-clash text-muted-foreground text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1 uppercase tracking-wider">
                            {info.title}
                          </h3>
                          <p className="font-clash text-foreground text-xs sm:text-sm font-medium group-hover:text-primary transition-colors break-all">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form Section */}
            <div className="lg:col-span-3 p-4 sm:p-6 md:p-8" ref={formRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 sm:mb-5 md:mb-6"
              >
                <h2 className="font-clash from-foreground to-foreground/80 mb-1 sm:mb-2 bg-gradient-to-r bg-clip-text text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-transparent">
                  Send us a
                </h2>
                <span className="font-clash text-primary text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-red-600 italic">
                  Message
                </span>
              </motion.div>

              {success && (
                <Alert className="mb-4 sm:mb-5 md:mb-6 bg-green-900/20 border-green-800 text-green-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-clash text-xs sm:text-sm">
                    Message sent successfully! We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mb-4 sm:mb-5 md:mb-6 bg-red-900/20 border-red-800 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-clash text-xs sm:text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <motion.div
                    className="space-y-1.5 sm:space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="name" className="font-clash flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="font-clash bg-background/60 border-border focus:border-primary/50 text-sm"
                      required
                      disabled={loading}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-1.5 sm:space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="email" className="font-clash flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="font-clash bg-background/60 border-border focus:border-primary/50 text-sm"
                      required
                      disabled={loading}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-1.5 sm:space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label htmlFor="subject" className="font-clash flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="What would you like to talk about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="font-clash bg-background/60 border-border focus:border-primary/50 text-sm"
                    required
                    disabled={loading}
                  />
                </motion.div>

                <motion.div
                  className="space-y-1.5 sm:space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label htmlFor="message" className="font-clash flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="font-clash bg-background/60 border-border focus:border-primary/50 min-h-[100px] sm:min-h-[120px] text-sm"
                    required
                    disabled={loading}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="font-clash w-full bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:from-rose-600 hover:to-rose-800 transition-all duration-300 text-sm sm:text-base py-2 sm:py-2.5"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        <span>Sending...</span>
                      </span>
                    ) : success ? (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Message Sent!</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <span>Send Message</span>
                        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </div>

          {/* Earth Globe Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 border-t border-border/40"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <article className="relative mx-auto h-[250px] sm:h-[300px] md:h-[350px] min-h-[200px] sm:min-h-[240px] md:min-h-[280px] w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] overflow-hidden rounded-2xl sm:rounded-3xl border bg-gradient-to-b from-[#e60a64] to-[#e60a64]/5 p-4 sm:p-6 md:p-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-white">
                <p className="font-clash relative z-20 text-sm sm:text-base md:text-lg lg:text-xl">
                  From idea to impact — we make it happen.
                </p>
                <div className="absolute -right-16 sm:-right-20 md:-right-28 -bottom-16 sm:-bottom-20 md:-bottom-28 z-10 mx-auto flex h-full w-full max-w-[200px] sm:max-w-[300px] md:max-w-[450px] items-center justify-center transition-all duration-700 hover:scale-105">
                  <Earth
                    scale={0.8}
                    baseColor={[1, 0, 0.3]}
                    markerColor={[0, 0, 0]}
                    glowColor={[1, 0.3, 0.4]}
                  />
                </div>
              </article>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: calc(var(--duration, 3s) * 0.8);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactPage;