import React, { useState, useEffect, useCallback } from "react";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  Filter, 
  X, 
  Search,
  Upload,
  Send,
  CheckCircle,
  Mail,
  AlertCircle,
  ChevronRight,
  CircleDot
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Slider } from "../components/ui/slider";
import { ScrollArea } from "../components/ui/scroll-area";

// Custom Toast Component (keep your existing Toast code)
const Toast = ({ id, title, description, variant = "default", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-50/90 backdrop-blur-sm border-green-200/50 text-green-800";
      case "danger":
        return "bg-red-50/90 backdrop-blur-sm border-red-200/50 text-red-800";
      case "warning":
        return "bg-yellow-50/90 backdrop-blur-sm border-yellow-200/50 text-yellow-800";
      default:
        return "bg-white/90 backdrop-blur-sm border-gray-200/50 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "danger":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`
      fixed top-4 right-4 w-[calc(100%-2rem)] sm:w-96 p-4 rounded-xl border shadow-lg 
      animate-in slide-in-from-top-2 fade-in duration-300
      ${getVariantStyles()}
    `}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sfpro-font">{title}</h3>
          <p className="text-xs mt-1 opacity-90 break-words">{description}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-gray-200/50 rounded-b-xl overflow-hidden w-full">
        <div 
          className="h-full bg-gray-400/30 transition-all duration-[3000ms] ease-linear"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

// Toast Provider Component
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, description, variant }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    window.__addToast = addToast;
  }, [addToast]);

  return (
    <>
      {children}
      <div className="fixed top-0 right-0 z-[100] p-4 space-y-4 pointer-events-none max-w-full">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              title={toast.title}
              description={toast.description}
              variant={toast.variant}
              onClose={removeToast}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// Toast hook
const useToast = () => {
  const showToast = (title, description, variant = "default") => {
    if (window.__addToast) {
      window.__addToast({ title, description, variant });
    }
  };
  return { showToast };
};

const API_BASE_URL = 'http://localhost:5005/api';

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    salary: "$140k - $180k",
    remote: "Hybrid",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer to lead our web application development. You'll work with React, TypeScript, and modern CSS frameworks.",
    requirements: [
      "5+ years of frontend development experience",
      "Expert knowledge of React and TypeScript",
      "Experience with Next.js or similar frameworks"
    ],
    benefits: [
      "Competitive salary + equity",
      "Health, dental, vision insurance",
      "Unlimited PTO"
    ],
    icon: "💻",
    color: "from-blue-500/5 to-indigo-500/5"
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    experience: "3+ years",
    salary: "$110k - $150k",
    remote: "Remote",
    posted: "1 week ago",
    description: "Join our design team to create beautiful, intuitive interfaces for our products. Collaborate with product managers and engineers.",
    requirements: [
      "3+ years of product design experience",
      "Proficiency in Figma",
      "Experience with design systems"
    ],
    benefits: [
      "Competitive salary + equity",
      "Remote-first culture",
      "Design conference budget"
    ],
    icon: "🎨",
    color: "from-pink-500/5 to-rose-500/5"
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    experience: "4+ years",
    salary: "$130k - $170k",
    remote: "On-site",
    posted: "3 days ago",
    description: "Build scalable APIs and microservices that power our platform. Work with Node.js, Python, and cloud infrastructure.",
    requirements: [
      "4+ years of backend development experience",
      "Strong experience with Node.js or Python",
      "Knowledge of database design"
    ],
    benefits: [
      "Competitive salary + equity",
      "Gym membership",
      "Continuing education budget"
    ],
    icon: "⚙️",
    color: "from-emerald-500/5 to-teal-500/5"
  }
];

const departments = ["All Departments", "Engineering", "Design"];
const locations = ["All Locations", "San Francisco, CA", "New York, NY", "Austin, TX", "Remote"];
const jobTypes = ["All Types", "Full-time"];
const remoteOptions = ["All", "Remote", "Hybrid", "On-site"];

const JoinUsPageContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedJobType, setSelectedJobType] = useState("All Types");
  const [selectedRemote, setSelectedRemote] = useState("All");
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationError, setApplicationError] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [spontaneousName, setSpontaneousName] = useState("");
  const [spontaneousEmail, setSpontaneousEmail] = useState("");
  const [spontaneousResume, setSpontaneousResume] = useState(null);
  const [spontaneousSubmitted, setSpontaneousSubmitted] = useState(false);
  const [spontaneousError, setSpontaneousError] = useState(false);
  const [isSpontaneousSubmitting, setIsSpontaneousSubmitting] = useState(false);
  const [isSpontaneousDialogOpen, setIsSpontaneousDialogOpen] = useState(false);

  const { showToast } = useToast();

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === "All Locations" || job.location.includes(selectedLocation);
    const matchesJobType = selectedJobType === "All Types" || job.type === selectedJobType;
    const matchesRemote = selectedRemote === "All" || job.remote === selectedRemote;
    const matchesExperience = parseInt(job.experience) >= experienceRange[0] && 
                            parseInt(job.experience) <= experienceRange[1];
    
    return matchesSearch && matchesDepartment && matchesLocation && 
           matchesJobType && matchesRemote && matchesExperience;
  });

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File too large", "Please upload a file smaller than 5MB", "danger");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSpontaneousResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("File too large", "Please upload a file smaller than 5MB", "danger");
        return;
      }
      setSpontaneousResume(file);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      showToast("Resume required", "Please upload your resume", "warning");
      return;
    }

    setIsSubmitting(true);
    setApplicationError(false);

    const formData = new FormData();
    formData.append('jobId', selectedJob.id);
    formData.append('jobTitle', selectedJob.title);
    formData.append('department', selectedJob.department);
    formData.append('applicantName', applicantName);
    formData.append('applicantEmail', applicantEmail);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resumeFile);

    try {
      const response = await fetch(`${API_BASE_URL}/applications/job`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setApplicationSubmitted(true);
        showToast("Application submitted!", "We've received your application and will review it shortly.", "success");
        
        setTimeout(() => {
          setApplicationSubmitted(false);
          setApplicantName("");
          setApplicantEmail("");
          setCoverLetter("");
          setResumeFile(null);
          setSelectedJob(null);
          setIsJobDialogOpen(false);
        }, 3000);
      } else {
        setApplicationError(true);
        showToast("Submission failed", data.message || "Failed to submit application. Please try again.", "danger");
      }
    } catch (error) {
      setApplicationError(true);
      showToast("Connection error", "Failed to connect to server. Please check your internet connection.", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpontaneousSubmit = async (e) => {
    e.preventDefault();
    if (!spontaneousResume) {
      showToast("Resume required", "Please upload your resume", "warning");
      return;
    }

    setIsSpontaneousSubmitting(true);
    setSpontaneousError(false);

    const formData = new FormData();
    formData.append('applicantName', spontaneousName);
    formData.append('applicantEmail', spontaneousEmail);
    formData.append('resume', spontaneousResume);

    try {
      const response = await fetch(`${API_BASE_URL}/applications/spontaneous`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSpontaneousSubmitted(true);
        showToast("Resume submitted!", "We've received your resume and will keep you in our talent pool.", "success");
        
        setTimeout(() => {
          setSpontaneousSubmitted(false);
          setSpontaneousName("");
          setSpontaneousEmail("");
          setSpontaneousResume(null);
          setIsSpontaneousDialogOpen(false);
        }, 3000);
      } else {
        setSpontaneousError(true);
        showToast("Submission failed", data.message || "Failed to submit resume. Please try again.", "danger");
      }
    } catch (error) {
      setSpontaneousError(true);
      showToast("Connection error", "Failed to connect to server. Please check your internet connection.", "danger");
    } finally {
      setIsSpontaneousSubmitting(false);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsJobDialogOpen(true);
  };

  return (
    <div className="mt-2 min-h-screen bg-white sfpro-font">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
      </div>

      {/* Simple Header - Responsive */}
      <div className="w-full bg-gradient-to-br from-gray-50/80 via-white/80 to-gray-50/80 backdrop-blur-sm py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge 
              variant="outline" 
              className="px-4 sm:px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border-gray-200/50 mb-5 sm:mb-6"
            >
              <span className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                <span className="text-gray-700 clash-font font-medium tracking-wide">JOIN OUR TEAM</span>
              </span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl clash-font font-light italic text-gray-900 mb-3 sm:mb-4 px-2">
              Work with us
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto px-4 sfpro-font font-light">
              Build the future of digital experiences with anxvvion
            </p>
          </div>
        </div>
      </div>

      {/* Job Listings Section - Fully Responsive */}
      <div className="w-full bg-white/50 backdrop-blur-sm py-12 sm:py-16" id="jobs">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter - Mobile First */}
            <div className="mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 sm:pl-10 pr-4 py-4 sm:py-5 w-full border-gray-200/70 rounded-full bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                  />
                </div>
                
                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-center gap-2 px-4 sm:px-5 py-4 sm:py-5 rounded-full border-gray-200/70 bg-white/80 backdrop-blur-sm text-sm w-full xs:w-auto"
                  >
                    <Filter className="!text-white w-4 h-4" />
                    <span className="!text-white">Filters</span>
                    {showFilters && <X className="w-4 h-4 ml-1" />}
                  </Button>
                  
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="!text-white w-full xs:w-[140px] sm:w-[160px] py-4 sm:py-5 rounded-full border-gray-200/70 bg-white/80 backdrop-blur-sm text-sm">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filters Panel - Responsive Grid */}
              {showFilters && (
                <Card className="!text-white mt-4 sm:mt-6 border-0 bg-gray-50/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm text-gray-600">Location</Label>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger className="bg-white/80 border-gray-200/70 rounded-xl text-sm h-10 sm:h-11">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((loc) => (
                              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm text-gray-600">Remote Policy</Label>
                        <Select value={selectedRemote} onValueChange={setSelectedRemote}>
                          <SelectTrigger className="bg-white/80 border-gray-200/70 rounded-xl text-sm h-10 sm:h-11">
                            <SelectValue placeholder="Select remote policy" />
                          </SelectTrigger>
                          <SelectContent>
                            {remoteOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <Label className="text-xs sm:text-sm text-gray-600">
                          Experience: {experienceRange[0]}-{experienceRange[1]}+ years
                        </Label>
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          value={experienceRange}
                          onValueChange={setExperienceRange}
                          className="py-3"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-500 sfpro-font">
                <span className="font-semibold text-gray-900">{filteredJobs.length}</span> open positions
              </p>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
                <CircleDot className="w-3 h-3" />
                <span>Updated daily</span>
              </div>
            </div>

            {/* Job Cards - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id}
                  className="group border-0 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02]"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100/80 flex items-center justify-center text-lg sm:text-xl">
                          {job.icon}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate clash-font">
                            {job.title}
                          </h3>
                          <p className="text-xs text-gray-500">{job.department}</p>
                        </div>
                      </div>
                      <Badge className="bg-gray-900/90 text-white border-0 px-2 py-1 text-xs rounded-full shrink-0">
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[120px] sm:max-w-none">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 shrink-0" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 clash-font">
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        View details
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <Card className="border-0 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 text-center">
                <p className="text-sm sm:text-base text-gray-500 sfpro-font">
                  No positions found. Try adjusting your filters.
                </p>
              </Card>
            )}

            {/* Job Details Dialog - Responsive */}
            <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
              <DialogContent className="max-w-3xl w-[95vw] sm:w-full p-0 rounded-2xl">
                <ScrollArea className="max-h-[85vh] sm:max-h-[80vh]">
                  {selectedJob && (
                    <div className="p-4 sm:p-6">
                      <DialogHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl">
                            {selectedJob.icon}
                          </div>
                          <div className="min-w-0">
                            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 clash-font">
                              {selectedJob.title}
                            </DialogTitle>
                            <DialogDescription className="text-xs sm:text-sm truncate">
                              {selectedJob.department} • {selectedJob.location}
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>

                      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 sm:gap-6 mt-4">
                        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base clash-font">
                              About the role
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              {selectedJob.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base clash-font">
                              Requirements
                            </h4>
                            <ul className="space-y-1.5">
                              {selectedJob.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base clash-font">
                              Benefits
                            </h4>
                            <ul className="space-y-1.5">
                              {selectedJob.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Application Form - Responsive */}
                        <div className="lg:col-span-1">
                          <Card className="border-0 bg-gray-50/80 backdrop-blur-sm rounded-xl">
                            <CardContent className="p-4 sm:p-5">
                              <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base clash-font">
                                Apply now
                              </h4>
                              
                              {applicationSubmitted ? (
                                <div className="text-center py-4 sm:py-6">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">Application sent!</p>
                                  <p className="text-xs text-gray-500 mt-1">We'll get back to you soon.</p>
                                </div>
                              ) : applicationError ? (
                                <div className="text-center py-4 sm:py-6">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">Submission failed</p>
                                  <p className="text-xs text-gray-500 mt-1">Please try again.</p>
                                  <Button 
                                    onClick={() => setApplicationError(false)}
                                    variant="outline"
                                    className="mt-3 text-xs h-8 sm:h-9"
                                  >
                                    Try again
                                  </Button>
                                </div>
                              ) : (
                                <form onSubmit={handleApplicationSubmit} className="space-y-3">
                                  <div>
                                    <Label htmlFor="name" className="text-xs">Full name *</Label>
                                    <Input
                                      id="name"
                                      value={applicantName}
                                      onChange={(e) => setApplicantName(e.target.value)}
                                      className="bg-white border-gray-200/70 rounded-xl text-xs sm:text-sm h-8 sm:h-9 mt-1"
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor="email" className="text-xs">Email *</Label>
                                    <Input
                                      id="email"
                                      type="email"
                                      value={applicantEmail}
                                      onChange={(e) => setApplicantEmail(e.target.value)}
                                      className="bg-white border-gray-200/70 rounded-xl text-xs sm:text-sm h-8 sm:h-9 mt-1"
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor="resume" className="text-xs">Resume *</Label>
                                    <div 
                                      onClick={() => document.getElementById('resume')?.click()}
                                      className="border border-dashed border-gray-300/70 bg-white rounded-xl p-2.5 sm:p-3 text-center cursor-pointer hover:bg-gray-50/80 transition-colors mt-1"
                                    >
                                      <Upload className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                      <p className="text-xs text-gray-600 break-words">
                                        {resumeFile ? resumeFile.name : 'Click to upload (PDF, DOC)'}
                                      </p>
                                    </div>
                                    <Input
                                      id="resume"
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={handleResumeUpload}
                                      className="hidden"
                                      required
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor="coverLetter" className="text-xs">Cover letter</Label>
                                    <Textarea
                                      id="coverLetter"
                                      value={coverLetter}
                                      onChange={(e) => setCoverLetter(e.target.value)}
                                      placeholder="Optional"
                                      className="bg-white border-gray-200/70 rounded-xl text-xs sm:text-sm mt-1 h-16 sm:h-20"
                                    />
                                  </div>

                                  <Button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-8 sm:h-9 text-xs mt-2 disabled:opacity-50"
                                  >
                                    {isSubmitting ? (
                                      <span className="flex items-center gap-2">
                                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                      </span>
                                    ) : (
                                      <>
                                        <Send className="w-3 h-3 mr-1" />
                                        Submit
                                      </>
                                    )}
                                  </Button>
                                </form>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {/* Spontaneous Application CTA - Responsive */}
            <div className="mt-12 sm:mt-16 text-center">
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-10 backdrop-blur-sm">
                <h3 className="text-xl sm:text-2xl clash-font font-light italic text-white mb-2 sm:mb-3">
                  Don't see your role?
                </h3>
                <p className="text-gray-300 mb-5 sm:mb-6 max-w-lg mx-auto text-xs sm:text-sm px-2">
                  Send us your resume and we'll reach out when a matching position opens.
                </p>
                
                <Button 
                  onClick={() => setIsSpontaneousDialogOpen(true)}
                  className="!text-white bg-white text-gray-900 hover:bg-gray-100 px-5 sm:px-6 py-4 sm:py-5 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105"
                >
                  Send your resume
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                </Button>

                {/* Spontaneous Application Dialog - Responsive */}
                <Dialog open={isSpontaneousDialogOpen} onOpenChange={setIsSpontaneousDialogOpen}>
                  <DialogContent className="sm:max-w-[400px] w-[95vw] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 clash-font">
                        Send your resume
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm">
                        We'll keep you in our talent pool and reach out when a matching position opens.
                      </DialogDescription>
                    </DialogHeader>
                    
                    {spontaneousSubmitted ? (
                      <div className="text-center py-6 sm:py-8">
                        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3" />
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Resume sent!</p>
                        <p className="text-xs text-gray-500 mt-1">We'll be in touch.</p>
                      </div>
                    ) : spontaneousError ? (
                      <div className="text-center py-6 sm:py-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Submission failed</p>
                        <p className="text-xs text-gray-500 mt-1">Please try again.</p>
                        <Button 
                          onClick={() => setSpontaneousError(false)}
                          variant="outline"
                          className="mt-3 text-xs h-8 sm:h-9"
                        >
                          Try again
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSpontaneousSubmit} className="space-y-3 sm:space-y-4 mt-2">
                        <Input
                          placeholder="Full name"
                          value={spontaneousName}
                          onChange={(e) => setSpontaneousName(e.target.value)}
                          className="rounded-xl text-sm h-10 sm:h-11"
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={spontaneousEmail}
                          onChange={(e) => setSpontaneousEmail(e.target.value)}
                          className="rounded-xl text-sm h-10 sm:h-11"
                          required
                        />
                        <div 
                          onClick={() => document.getElementById('resume-spontaneous')?.click()}
                          className="border-2 border-dashed border-gray-200/70 rounded-xl p-4 sm:p-5 text-center cursor-pointer hover:bg-gray-50/80 transition-colors"
                        >
                          <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs sm:text-sm text-gray-600 break-words">
                            {spontaneousResume ? spontaneousResume.name : 'Upload resume (PDF, DOC)'}
                          </p>
                        </div>
                        <Input
                          id="resume-spontaneous"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleSpontaneousResumeUpload}
                          className="hidden"
                          required
                        />
                        <Button 
                          type="submit" 
                          disabled={isSpontaneousSubmitting}
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-4 sm:py-5 text-sm disabled:opacity-50"
                        >
                          {isSpontaneousSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            'Submit resume'
                          )}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JoinUsPage = () => {
  return (
    <ToastProvider>
      <JoinUsPageContent />
    </ToastProvider>
  );
};

export default JoinUsPage;