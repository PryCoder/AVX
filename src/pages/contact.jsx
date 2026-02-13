// components/ContactPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, MessageSquare, User, AlertCircle } from 'lucide-react';
import ThreeBackground from '../components/contactbg';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:5005/api/contacts', 
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      // Improved error handling to show specific validation messages
      if (err.response?.data?.errors) {
        // If the server sends back a list of validation errors
        const errorMessages = err.response.data.errors.map(e => e.msg).join(' ');
        setError(errorMessages);
      } else if (err.response?.data?.message) {
        // For other server-side messages (like moderation failure)
        setError(err.response.data.message);
      } else {
        // Generic fallback error
        setError('Failed to send message. Please try again.');
      }
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "hello@company.com",
      link: "mailto:hello@company.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Office",
      value: "123 Business Ave, Suite 100",
      link: "#"
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="clash-font text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="sfpro-font text-lg text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <CardContent className="p-6">
                    <a
                      href={info.link}
                      className="flex items-center gap-4 group"
                      target={info.link !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                    >
                      <div className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300">
                        <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="sfpro-font text-sm text-gray-500 mb-1">{info.title}</h3>
                        <p className="clash-font text-gray-300 group-hover:text-white transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-black/40 backdrop-blur-xl border border-gray-800">
              <CardContent className="p-8">
                {success && (
                  <Alert className="mb-6 bg-green-900/20 border-green-800 text-green-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Message sent successfully! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert className="mb-6 bg-red-900/20 border-red-800 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="sfpro-font text-gray-300 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black/60 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-gray-700 focus:ring-gray-700"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="sfpro-font text-gray-300 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black/60 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-gray-700 focus:ring-gray-700"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="sfpro-font text-gray-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What would you like to talk about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-black/60 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-gray-700 focus:ring-gray-700"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="sfpro-font text-gray-300 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-black/60 border-gray-800 text-gray-200 placeholder:text-gray-600 focus:border-gray-700 focus:ring-gray-700 min-h-[150px]"
                      required
                      disabled={loading}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-200 border border-gray-700 clash-font text-lg py-6 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl -z-5" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gray-900/20 rounded-full blur-3xl -z-5" />
    </div>
  );
};

export default ContactPage;