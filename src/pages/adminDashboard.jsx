import React, { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Users,
  FileText,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BarChart3,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Trash2,
  RefreshCw,
  TrendingUp,
  Award,
  PieChart,
  Activity,
  Menu,
  X,
  LayoutGrid,
  List,
  User,
  LogOut,
  Settings,
  Bell,
  HelpCircle
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
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
} from "../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import ContactManagement from "./contactManagement";

// Custom Toast Component with fonts
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
        return "bg-green-50 border-green-200 text-green-800";
      case "danger":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-white border-gray-200 text-gray-800";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case "danger":
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`
      fixed top-4 right-4 left-4 sm:left-auto sm:w-96 
      p-3 sm:p-4 rounded-xl border shadow-lg 
      animate-in slide-in-from-top-2 fade-in duration-300 z-[100]
      ${getVariantStyles()}
    `}>
      <div className="flex items-start gap-2 sm:gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-xs sm:text-sm sfpro-font">{title}</h3>
          <p className="text-xs mt-0.5 sm:mt-1 opacity-90 break-words sfpro-font">{description}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gray-200 rounded-b-xl overflow-hidden w-full">
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
      <div className="fixed top-0 right-0 left-0 sm:left-auto z-[100] p-2 sm:p-4 space-y-2 sm:space-y-4 pointer-events-none">
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

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Mock job listings for filter
const jobListings = [
  { id: 1, title: "Senior Frontend Developer" },
  { id: 2, title: "Product Designer" },
  { id: 3, title: "Backend Engineer" }
];

// Mock authentication
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const AdminDashboardContent = () => {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Data states
  const [jobApplications, setJobApplications] = useState([]);
  const [spontaneousApplications, setSpontaneousApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  // Filter states
  const [activeTab, setActiveTab] = useState('job');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // View mode for mobile
  const [viewMode, setViewMode] = useState('table');

  // Colors for charts
  const COLORS = ['#1f2937', '#4b5563', '#9ca3af', '#d1d5db', '#6b7280', '#374151'];
  const STATUS_COLORS = {
    pending: '#f59e0b',
    reviewed: '#3b82f6',
    shortlisted: '#10b981',
    rejected: '#ef4444',
    contacted: '#8b5cf6',
    archived: '#6b7280'
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setLoginError('');
      showToast(
        "Welcome back!",
        "Successfully logged in to admin dashboard.",
        "success"
      );
    } else {
      setLoginError('Invalid username or password');
      showToast(
        "Login failed",
        "Invalid username or password",
        "danger"
      );
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      
      const jobResponse = await fetch(`${API_BASE_URL}/applications/job`);
      const jobData = await jobResponse.json();
      if (jobData.success) {
        setJobApplications(jobData.data);
        setTotalPages(Math.ceil((jobData.pagination?.total || 0) / itemsPerPage));
      }

      const spontaneousResponse = await fetch(`${API_BASE_URL}/applications/spontaneous`);
      const spontaneousData = await spontaneousResponse.json();
      if (spontaneousData.success) {
        setSpontaneousApplications(spontaneousData.data);
      }

      const statsResponse = await fetch(`${API_BASE_URL}/applications/stats`);
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      showToast(
        "Data refreshed",
        "Applications data has been updated successfully.",
        "success"
      );

    } catch (error) {
      console.error('Error fetching data:', error);
      showToast(
        "Error",
        "Failed to fetch applications data",
        "danger"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, currentPage]);

  // Update application status
  const updateApplicationStatus = async (id, status, type = 'job') => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${type}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(
          "Status updated",
          `Application status changed to ${status}`,
          "success"
        );
        fetchData();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast(
        "Error",
        "Failed to update application status",
        "danger"
      );
    }
  };

  // Delete application
  const deleteApplication = async () => {
    if (!applicationToDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/applications/${applicationToDelete.type}/${applicationToDelete.id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (data.success) {
        showToast(
          "Application deleted",
          "The application has been permanently deleted",
          "success"
        );
        setIsDeleteDialogOpen(false);
        setApplicationToDelete(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      showToast(
        "Error",
        "Failed to delete application",
        "danger"
      );
    }
  };

  // Download resume
  const downloadResume = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(
      "Download started",
      "Your resume download has started.",
      "default"
    );
  };

  // Filter applications
  const getFilteredApplications = () => {
    const applications = activeTab === 'job' ? jobApplications : spontaneousApplications;
    
    return applications.filter(app => {
      const matchesSearch = searchQuery === '' ||
        app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicantEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.jobTitle && app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

      const matchesJob = jobFilter === 'all' || 
        (activeTab === 'job' && app.jobId?.toString() === jobFilter);

      let matchesDate = true;
      if (dateRange !== 'all') {
        const appDate = new Date(app.appliedAt);
        const now = new Date();
        const days = parseInt(dateRange);
        const cutoff = new Date(now.setDate(now.getDate() - days));
        matchesDate = appDate >= cutoff;
      }

      return matchesSearch && matchesStatus && matchesJob && matchesDate;
    });
  };

  const filteredApplications = getFilteredApplications();
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Prepare chart data
  const getApplicationsOverTime = () => {
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      last30Days.push({
        date: dateStr,
        job: 0,
        spontaneous: 0,
        total: 0
      });
    }

    jobApplications.forEach(app => {
      const date = new Date(app.appliedAt).toISOString().split('T')[0];
      const day = last30Days.find(d => d.date === date);
      if (day) {
        day.job++;
        day.total++;
      }
    });

    spontaneousApplications.forEach(app => {
      const date = new Date(app.appliedAt).toISOString().split('T')[0];
      const day = last30Days.find(d => d.date === date);
      if (day) {
        day.spontaneous++;
        day.total++;
      }
    });

    return last30Days;
  };

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, statusFilter, dateRange, jobFilter]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-900 to-gray-700"></div>
          <CardHeader className="space-y-3 p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center clash-font">
              Admin Login
            </CardTitle>
            <p className="text-center text-sm text-gray-500 sfpro-font">
              Enter your credentials to access the dashboard
            </p>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 sfpro-font">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 sfpro-font"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 sfpro-font">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400 h-11 sfpro-font"
                  required
                />
              </div>
              {loginError && (
                <div className="text-sm text-red-500 flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="sfpro-font">{loginError}</span>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl h-11 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 sfpro-font"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600 sfpro-font">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute bottom-24 right-4 w-64 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl hover:bg-gray-50 sfpro-font"
                onClick={() => {
                  fetchData();
                  setIsMobileMenuOpen(false);
                }}
              >
                <RefreshCw className={`w-4 h-4 mr-3 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              <div className="h-px bg-gray-100 my-2"></div>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 sfpro-font"
                onClick={() => {
                  setIsAuthenticated(false);
                  setIsMobileMenuOpen(false);
                  showToast(
                    "Logged out",
                    "You have been successfully logged out.",
                    "default"
                  );
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mt-12 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-md">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 clash-font">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-500 sfpro-font">Recruitment Portal</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                onClick={fetchData}
                disabled={refreshing}
                className="rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 sfpro-font"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAuthenticated(false);
                  showToast(
                    "Logged out",
                    "You have been successfully logged out.",
                    "default"
                  );
                }}
                className="rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 sfpro-font"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchData}
                disabled={refreshing}
                className="rounded-xl hover:bg-gray-100"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-700"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 sfpro-font">Total Applications</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 clash-font">
                    {stats?.total?.all || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="text-gray-600 sfpro-font">Job: {stats?.total?.job || 0}</span>
                <span className="text-gray-600 sfpro-font">Spontaneous: {stats?.total?.spontaneous || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 sfpro-font">Pending Review</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 clash-font">
                    {stats?.jobApplicationsByStatus?.find(s => s._id === 'pending')?.count || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-gray-500 sfpro-font">Need attention</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 sfpro-font">Shortlisted</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 clash-font">
                    {stats?.jobApplicationsByStatus?.find(s => s._id === 'shortlisted')?.count || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-gray-500 sfpro-font">Ready for interview</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 sfpro-font">Rejected</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 clash-font">
                    {stats?.jobApplicationsByStatus?.find(s => s._id === 'rejected')?.count || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xs text-gray-500 sfpro-font">Not moving forward</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 clash-font">
                <Activity className="w-5 h-5 text-gray-900" />
                Applications Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getApplicationsOverTime()}>
                    <defs>
                      <linearGradient id="jobGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1f2937" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#1f2937" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="spontaneousGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                      interval="preserveStartEnd"
                    />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontFamily: 'SFProDisplay, sans-serif'
                      }} 
                    />
                    <Legend 
                      wrapperStyle={{ 
                        fontSize: '12px',
                        fontFamily: 'SFProDisplay, sans-serif'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="job" 
                      stroke="#1f2937" 
                      strokeWidth={2}
                      fill="url(#jobGradient)" 
                      name="Job Applications"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="spontaneous" 
                      stroke="#6b7280" 
                      strokeWidth={2}
                      fill="url(#spontaneousGradient)" 
                      name="Spontaneous"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 clash-font">
                <PieChart className="w-5 h-5 text-gray-900" />
                Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.jobApplicationsByStatus || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ _id, percent }) => {
                        if (typeof window !== 'undefined' && window.innerWidth < 640) {
                          return `${(percent * 100).toFixed(0)}%`;
                        }
                        return `${_id}: ${(percent * 100).toFixed(0)}%`;
                      }}
                      outerRadius={window.innerWidth < 640 ? 60 : window.innerWidth < 768 ? 80 : 100}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats?.jobApplicationsByStatus?.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={STATUS_COLORS[entry._id] || COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontFamily: 'SFProDisplay, sans-serif'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="job" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col gap-4 mb-6">
                {/* Tab Controls */}
                <div className="flex items-center justify-between">
                  <TabsList className="grid w-full sm:w-auto grid-cols-3 rounded-xl bg-gray-100 p-1">
                    <TabsTrigger 
                      value="job" 
                      className="text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 sfpro-font"
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Job Applications</span>
                      <span className="sm:hidden">Job</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="spontaneous" 
                      className="text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 sfpro-font"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Spontaneous</span>
                      <span className="sm:hidden">Open</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="contacts" 
                      className="text-xs sm:text-sm px-4 py-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 sfpro-font"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Contacts</span>
                      <span className="sm:hidden">Contact</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* View Mode Toggle for Mobile */}
                  <div className="flex sm:hidden items-center gap-1">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="rounded-xl px-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className="rounded-xl px-2"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, or position..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 w-full text-sm rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400 sfpro-font"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:flex gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[140px] text-sm rounded-xl border-gray-200 sfpro-font">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="sfpro-font">All Status</SelectItem>
                        <SelectItem value="pending" className="sfpro-font">Pending</SelectItem>
                        <SelectItem value="reviewed" className="sfpro-font">Reviewed</SelectItem>
                        <SelectItem value="shortlisted" className="sfpro-font">Shortlisted</SelectItem>
                        <SelectItem value="rejected" className="sfpro-font">Rejected</SelectItem>
                        {activeTab === 'spontaneous' && (
                          <>
                            <SelectItem value="contacted" className="sfpro-font">Contacted</SelectItem>
                            <SelectItem value="archived" className="sfpro-font">Archived</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>

                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="w-full sm:w-[130px] text-sm rounded-xl border-gray-200 sfpro-font">
                        <SelectValue placeholder="Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="sfpro-font">All Time</SelectItem>
                        <SelectItem value="7" className="sfpro-font">Last 7 days</SelectItem>
                        <SelectItem value="30" className="sfpro-font">Last 30 days</SelectItem>
                        <SelectItem value="90" className="sfpro-font">Last 90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {activeTab === 'job' && (
                    <Select value={jobFilter} onValueChange={setJobFilter}>
                      <SelectTrigger className="w-full sm:w-[200px] text-sm rounded-xl border-gray-200 sfpro-font">
                        <SelectValue placeholder="Filter by job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="sfpro-font">All Jobs</SelectItem>
                        {jobListings.map(job => (
                          <SelectItem key={job.id} value={job.id.toString()} className="sfpro-font">
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Job Applications Tab */}
              <TabsContent value="job">
                {/* Desktop Table View */}
                <div className="hidden sm:block">
                  <ScrollArea className="h-[500px] lg:h-[600px] rounded-xl">
                    <Table>
                      <TableHeader className="sticky top-0 bg-gray-50 z-10">
                        <TableRow>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Applicant</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Position</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Applied</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Status</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Resume</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedApplications.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-sm text-gray-500 sfpro-font">
                              No job applications found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedApplications.map((app) => (
                            <TableRow key={app._id} className="hover:bg-gray-50 transition-colors">
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm text-gray-900 sfpro-font">{app.applicantName}</p>
                                  <p className="text-xs text-gray-500 sfpro-font">{app.applicantEmail}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm text-gray-900 sfpro-font">{app.jobTitle}</p>
                                  <p className="text-xs text-gray-500 sfpro-font">{app.department}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-gray-600 sfpro-font whitespace-nowrap">
                                  {new Date(app.appliedAt).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500 sfpro-font">
                                  {new Date(app.appliedAt).toLocaleTimeString()}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={app.status}
                                  onValueChange={(value) => updateApplicationStatus(app._id, value, 'job')}
                                >
                                  <SelectTrigger className={`w-[130px] h-8 text-xs rounded-xl border-0 ${
                                    app.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                    app.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                                    app.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
                                    app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                    'bg-gray-50 text-gray-700'
                                  } sfpro-font`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending" className="sfpro-font">Pending</SelectItem>
                                    <SelectItem value="reviewed" className="sfpro-font">Reviewed</SelectItem>
                                    <SelectItem value="shortlisted" className="sfpro-font">Shortlisted</SelectItem>
                                    <SelectItem value="rejected" className="sfpro-font">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadResume(app.resumeUrl, `${app.applicantName}_resume.pdf`)}
                                  className="rounded-xl text-xs h-8 border-gray-200 hover:border-gray-300 hover:bg-gray-50 sfpro-font"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Resume
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedApplication({ ...app, type: 'job' });
                                      setIsViewDialogOpen(true);
                                    }}
                                    className="rounded-xl h-8 w-8 p-0 hover:bg-gray-100"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setApplicationToDelete({ id: app._id, type: 'job' });
                                      setIsDeleteDialogOpen(true);
                                    }}
                                    className="rounded-xl h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-4">
                  {paginatedApplications.length === 0 ? (
                    <Card className="border-0 bg-gray-50 p-8 text-center rounded-2xl">
                      <p className="text-sm text-gray-500 sfpro-font">No job applications found</p>
                    </Card>
                  ) : (
                    paginatedApplications.map((app) => (
                      <Card key={app._id} className="border-0 shadow-md rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-700"></div>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 clash-font">{app.applicantName}</h3>
                              <p className="text-xs text-gray-500 sfpro-font">{app.applicantEmail}</p>
                            </div>
                            <Badge className={`
                              text-xs px-3 py-1 rounded-full font-medium
                              ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                app.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                                app.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
                                app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                'bg-gray-50 text-gray-700'
                              } sfpro-font
                            `}>
                              {app.status}
                            </Badge>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 sfpro-font">{app.jobTitle}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 sfpro-font">
                                {new Date(app.appliedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Select
                                value={app.status}
                                onValueChange={(value) => updateApplicationStatus(app._id, value, 'job')}
                              >
                                <SelectTrigger className="w-[110px] h-8 text-xs rounded-xl border-0 bg-gray-50 sfpro-font">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending" className="sfpro-font">Pending</SelectItem>
                                  <SelectItem value="reviewed" className="sfpro-font">Reviewed</SelectItem>
                                  <SelectItem value="shortlisted" className="sfpro-font">Shortlisted</SelectItem>
                                  <SelectItem value="rejected" className="sfpro-font">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadResume(app.resumeUrl, `${app.applicantName}_resume.pdf`)}
                                className="rounded-xl h-8 px-2 border-gray-200"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication({ ...app, type: 'job' });
                                  setIsViewDialogOpen(true);
                                }}
                                className="rounded-xl h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setApplicationToDelete({ id: app._id, type: 'job' });
                                  setIsDeleteDialogOpen(true);
                                }}
                                className="rounded-xl h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 order-2 sm:order-1 sfpro-font">
                    Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of{' '}
                    <span className="font-medium">{filteredApplications.length}</span> applications
                  </p>
                  <div className="flex items-center gap-3 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-xl h-9 px-3 border-gray-200 hover:border-gray-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600 sfpro-font">
                      Page {currentPage} of {Math.ceil(filteredApplications.length / itemsPerPage) || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage >= Math.ceil(filteredApplications.length / itemsPerPage)}
                      className="rounded-xl h-9 px-3 border-gray-200 hover:border-gray-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Spontaneous Applications Tab */}
              <TabsContent value="spontaneous">
                {/* Desktop Table View */}
                <div className="hidden sm:block">
                  <ScrollArea className="h-[500px] lg:h-[600px] rounded-xl">
                    <Table>
                      <TableHeader className="sticky top-0 bg-gray-50 z-10">
                        <TableRow>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Applicant</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Applied</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Status</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font">Resume</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-700 sfpro-font text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedApplications.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 text-sm text-gray-500 sfpro-font">
                              No spontaneous applications found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedApplications.map((app) => (
                            <TableRow key={app._id} className="hover:bg-gray-50 transition-colors">
                              <TableCell>
                                <div>
                                  <p className="font-medium text-sm text-gray-900 sfpro-font">{app.applicantName}</p>
                                  <p className="text-xs text-gray-500 sfpro-font">{app.applicantEmail}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <p className="text-sm text-gray-600 sfpro-font whitespace-nowrap">
                                  {new Date(app.appliedAt).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500 sfpro-font">
                                  {new Date(app.appliedAt).toLocaleTimeString()}
                                </p>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={app.status}
                                  onValueChange={(value) => updateApplicationStatus(app._id, value, 'spontaneous')}
                                >
                                  <SelectTrigger className={`w-[130px] h-8 text-xs rounded-xl border-0 ${
                                    app.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                    app.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                                    app.status === 'contacted' ? 'bg-purple-50 text-purple-700' :
                                    app.status === 'archived' ? 'bg-gray-50 text-gray-700' :
                                    'bg-gray-50 text-gray-700'
                                  } sfpro-font`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending" className="sfpro-font">Pending</SelectItem>
                                    <SelectItem value="reviewed" className="sfpro-font">Reviewed</SelectItem>
                                    <SelectItem value="contacted" className="sfpro-font">Contacted</SelectItem>
                                    <SelectItem value="archived" className="sfpro-font">Archived</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadResume(app.resumeUrl, `${app.applicantName}_resume.pdf`)}
                                  className="rounded-xl text-xs h-8 border-gray-200 hover:border-gray-300 hover:bg-gray-50 sfpro-font"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Resume
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedApplication({ ...app, type: 'spontaneous' });
                                      setIsViewDialogOpen(true);
                                    }}
                                    className="rounded-xl h-8 w-8 p-0 hover:bg-gray-100"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setApplicationToDelete({ id: app._id, type: 'spontaneous' });
                                      setIsDeleteDialogOpen(true);
                                    }}
                                    className="rounded-xl h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-4">
                  {paginatedApplications.length === 0 ? (
                    <Card className="border-0 bg-gray-50 p-8 text-center rounded-2xl">
                      <p className="text-sm text-gray-500 sfpro-font">No spontaneous applications found</p>
                    </Card>
                  ) : (
                    paginatedApplications.map((app) => (
                      <Card key={app._id} className="border-0 shadow-md rounded-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-700"></div>
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 clash-font">{app.applicantName}</h3>
                              <p className="text-xs text-gray-500 sfpro-font">{app.applicantEmail}</p>
                            </div>
                            <Badge className={`
                              text-xs px-3 py-1 rounded-full font-medium
                              ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                app.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                                app.status === 'contacted' ? 'bg-purple-50 text-purple-700' :
                                app.status === 'archived' ? 'bg-gray-50 text-gray-700' :
                                'bg-gray-50 text-gray-700'
                              } sfpro-font
                            `}>
                              {app.status}
                            </Badge>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 sfpro-font">
                                {new Date(app.appliedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Select
                                value={app.status}
                                onValueChange={(value) => updateApplicationStatus(app._id, value, 'spontaneous')}
                              >
                                <SelectTrigger className="w-[110px] h-8 text-xs rounded-xl border-0 bg-gray-50 sfpro-font">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending" className="sfpro-font">Pending</SelectItem>
                                  <SelectItem value="reviewed" className="sfpro-font">Reviewed</SelectItem>
                                  <SelectItem value="contacted" className="sfpro-font">Contacted</SelectItem>
                                  <SelectItem value="archived" className="sfpro-font">Archived</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadResume(app.resumeUrl, `${app.applicantName}_resume.pdf`)}
                                className="rounded-xl h-8 px-2 border-gray-200"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedApplication({ ...app, type: 'spontaneous' });
                                  setIsViewDialogOpen(true);
                                }}
                                className="rounded-xl h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setApplicationToDelete({ id: app._id, type: 'spontaneous' });
                                  setIsDeleteDialogOpen(true);
                                }}
                                className="rounded-xl h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 order-2 sm:order-1 sfpro-font">
                    Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of{' '}
                    <span className="font-medium">{filteredApplications.length}</span> applications
                  </p>
                  <div className="flex items-center gap-3 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-xl h-9 px-3 border-gray-200 hover:border-gray-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600 sfpro-font">
                      Page {currentPage} of {Math.ceil(filteredApplications.length / itemsPerPage) || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage >= Math.ceil(filteredApplications.length / itemsPerPage)}
                      className="rounded-xl h-9 px-3 border-gray-200 hover:border-gray-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts">
                <ContactManagement showToast={showToast} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View Application Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl mx-4 rounded-2xl p-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-700"></div>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-bold clash-font">Application Details</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] sm:max-h-[80vh]">
              {selectedApplication && (
                <div className="p-6 pt-2 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <Users className="w-7 h-7 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 clash-font">
                        {selectedApplication.applicantName}
                      </h3>
                      <p className="text-sm text-gray-500 sfpro-font">{selectedApplication.applicantEmail}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 sfpro-font">Applied Date</p>
                      <p className="text-sm font-medium text-gray-900 sfpro-font">
                        {new Date(selectedApplication.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-xs text-gray-500 sfpro-font">Status</p>
                      <Badge className={`mt-1 text-sm ${
                        selectedApplication.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                        selectedApplication.status === 'reviewed' ? 'bg-blue-50 text-blue-700' :
                        selectedApplication.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
                        selectedApplication.status === 'rejected' ? 'bg-red-50 text-red-700' :
                        selectedApplication.status === 'contacted' ? 'bg-purple-50 text-purple-700' :
                        'bg-gray-50 text-gray-700'
                      } sfpro-font`}>
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>

                  {selectedApplication.jobTitle && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500 sfpro-font">Position</Label>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm font-medium text-gray-900 sfpro-font">{selectedApplication.jobTitle}</p>
                        <p className="text-xs text-gray-500 sfpro-font">{selectedApplication.department}</p>
                      </div>
                    </div>
                  )}

                  {selectedApplication.coverLetter && (
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-500 sfpro-font">Cover Letter</Label>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-700 sfpro-font">{selectedApplication.coverLetter}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500 sfpro-font">Resume</Label>
                    <div className="bg-gray-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700 sfpro-font">Resume.pdf</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadResume(selectedApplication.resumeUrl, `${selectedApplication.applicantName}_resume.pdf`)}
                        className="rounded-xl text-sm h-9 border-gray-200 hover:border-gray-300 sfpro-font"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={() => setIsViewDialogOpen(false)}
                      className="rounded-xl text-sm h-10 px-6 border-gray-200 hover:border-gray-300 sfpro-font order-2 sm:order-1"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => {
                        setIsViewDialogOpen(false);
                        updateApplicationStatus(
                          selectedApplication._id,
                          selectedApplication.status === 'pending' ? 'reviewed' : 'shortlisted',
                          selectedApplication.type
                        );
                      }}
                      className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-xl text-sm h-10 px-6 shadow-md hover:shadow-lg transition-all duration-300 sfpro-font order-1 sm:order-2"
                    >
                      Mark as {selectedApplication.status === 'pending' ? 'Reviewed' : 'Shortlisted'}
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px] mx-4 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 clash-font">Delete Application</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 sfpro-font">
                Are you sure you want to delete this application? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setApplicationToDelete(null);
                }}
                className="rounded-xl text-sm h-10 px-6 border-gray-200 hover:border-gray-300 sfpro-font"
              >
                Cancel
              </Button>
              <Button
                onClick={deleteApplication}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl text-sm h-10 px-6 shadow-md hover:shadow-lg transition-all duration-300 sfpro-font"
              >
                Delete Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Wrap the component with custom ToastProvider
const AdminDashboard = () => {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
};

export default AdminDashboard;