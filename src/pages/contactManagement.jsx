import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Trash2,
  RefreshCw,
  Edit,
  Plus,
  User,
  FileText,
  MessageSquare,
  Tag,
  Star,
  Award,
  TrendingUp,
  Activity,
  PieChart,
  BarChart3,
  Globe,
  Link as LinkIcon,
  Twitter,
  Facebook,
  Linkedin,
  Instagram
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

const API_BASE_URL = 'http://localhost:5005/api';

// Contact API Service with router endpoints
const contactAPI = {
  // GET /api/contacts - Get all contacts
  getAllContacts: async (page = 1, limit = 10, filters = {}) => {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters
    }).toString();
    
    const response = await fetch(`${API_BASE_URL}/contacts?${queryParams}`);
    const data = await response.json();
    return data;
  },

  // GET /api/contacts/stats - Get contact statistics
  getContactStats: async () => {
    const response = await fetch(`${API_BASE_URL}/contacts/stats`);
    const data = await response.json();
    return data;
  },

  // GET /api/contacts/:id - Get contact by ID
  getContactById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
    const data = await response.json();
    return data;
  },

  // PATCH /api/contacts/:id/status - Update contact status
  updateContactStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data;
  },

  // DELETE /api/contacts/:id - Delete contact
  deleteContact: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
};

const ContactManagement = ({ showToast }) => {
  // Data states
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);

  // Colors for charts
  const COLORS = ['#1f2937', '#4b5563', '#9ca3af', '#d1d5db', '#6b7280', '#374151'];
  const STATUS_COLORS = {
    pending: '#f59e0b',
    read: '#3b82f6',
    replied: '#10b981',
    spam: '#ef4444'
  };

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setRefreshing(true);
      
      const filters = {};
      if (statusFilter !== 'all') filters.status = statusFilter;
      if (searchQuery) filters.search = searchQuery;
      if (dateRange !== 'all') filters.days = dateRange;

      const response = await contactAPI.getAllContacts(currentPage, itemsPerPage, filters);
      if (response.success) {
        setContacts(response.data);
        setTotalPages(response.pagination?.pages || 1);
        setTotalContacts(response.pagination?.total || 0);
      }

      const statsResponse = await contactAPI.getContactStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

    } catch (error) {
      console.error('Error fetching contacts:', error);
      showToast?.(
        "Error",
        "Failed to fetch contacts data",
        "danger"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, statusFilter, dateRange, searchQuery]);

  // Update contact status
  const updateContactStatus = async (id, status) => {
    try {
      const response = await contactAPI.updateContactStatus(id, status);
      
      if (response.success) {
        showToast?.(
          "Status updated",
          `Contact status changed to ${status}`,
          "success"
        );
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast?.(
        "Error",
        "Failed to update contact status",
        "danger"
      );
    }
  };

  // Delete contact
  const deleteContact = async () => {
    if (!contactToDelete) return;

    try {
      const response = await contactAPI.deleteContact(contactToDelete);
      
      if (response.success) {
        showToast?.(
          "Contact deleted",
          "The contact has been permanently deleted",
          "success"
        );
        setIsDeleteDialogOpen(false);
        setContactToDelete(null);
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      showToast?.(
        "Error",
        "Failed to delete contact",
        "danger"
      );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'read': return 'bg-blue-50 text-blue-700';
      case 'replied': return 'bg-green-50 text-green-700';
      case 'spam': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Messages</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {stats?.total || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {stats?.byStatus?.pending || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Replied</p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {stats?.byStatus?.replied || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Spam</p>
                <p className="text-xl font-bold text-red-600 mt-1">
                  {stats?.byStatus?.spam || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 pr-4 py-2 w-full text-sm rounded-xl border-gray-200 focus:border-gray-400 focus:ring-gray-400"
          />
        </div>

        <div className="flex gap-3">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] text-sm rounded-xl border-gray-200">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={dateRange} 
            onValueChange={(value) => {
              setDateRange(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px] text-sm rounded-xl border-gray-200">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={fetchContacts}
            disabled={refreshing}
            className="rounded-xl border-gray-200 hover:border-gray-300"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Contacts Table */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader className="sticky top-0 bg-gray-50 z-10">
                <TableRow>
                  <TableHead className="text-xs font-semibold text-gray-700">Name</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700">Email</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700">Subject</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700">Received</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-sm text-gray-500">
                      No contacts found
                    </TableCell>
                  </TableRow>
                ) : (
                  contacts.map((contact) => (
                    <TableRow key={contact._id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="font-medium text-sm text-gray-900">{contact.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">{contact.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 max-w-[200px] truncate">
                          {contact.subject}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 whitespace-nowrap">
                          {formatDate(contact.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={contact.status}
                          onValueChange={(value) => updateContactStatus(contact._id, value)}
                        >
                          <SelectTrigger className={`w-[110px] h-7 text-xs rounded-lg border-0 ${getStatusColor(contact.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="replied">Replied</SelectItem>
                            <SelectItem value="spam">Spam</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedContact(contact);
                              setIsViewDialogOpen(true);
                            }}
                            className="rounded-lg h-7 w-7 p-0 hover:bg-gray-100"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setContactToDelete(contact._id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="rounded-lg h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalContacts)}</span> of{' '}
          <span className="font-medium">{totalContacts}</span> contacts
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg h-8 px-3 border-gray-200 hover:border-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-lg h-8 px-3 border-gray-200 hover:border-gray-300"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl rounded-xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-lg font-semibold">Contact Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedContact && (
              <div className="p-6 pt-2 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-500">{selectedContact.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Received</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className={`mt-1 text-xs ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Subject</Label>
                  <div className="bg-gray-50 p-3 rounded-lg mt-1">
                    <p className="text-sm font-medium text-gray-900">{selectedContact.subject}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Message</Label>
                  <div className="bg-gray-50 p-3 rounded-lg mt-1">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {selectedContact.moderationResult && (
                  <div>
                    <Label className="text-xs text-gray-500">Moderation</Label>
                    <div className="bg-gray-50 p-3 rounded-lg mt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium">Appropriate:</span>
                        <Badge className={selectedContact.moderationResult.isAppropriate ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
                          {selectedContact.moderationResult.isAppropriate ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      {selectedContact.moderationResult.toxicityScore && (
                        <div className="text-xs text-gray-600">
                          Toxicity Score: {(selectedContact.moderationResult.toxicityScore * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewDialogOpen(false)}
                    className="rounded-lg text-sm h-9 px-4 border-gray-200"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      updateContactStatus(
                        selectedContact._id,
                        selectedContact.status === 'pending' ? 'read' : 'replied'
                      );
                    }}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white rounded-lg text-sm h-9 px-4"
                  >
                    Mark as {selectedContact.status === 'pending' ? 'Read' : 'Replied'}
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Delete Contact</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Are you sure you want to delete this contact? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setContactToDelete(null);
              }}
              className="rounded-lg text-sm h-9 px-4 border-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteContact}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg text-sm h-9 px-4"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;