// services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Job Applications
  async submitJobApplication(formData) {
    const response = await fetch(`${API_BASE_URL}/applications/job`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  async submitSpontaneousApplication(formData) {
    const response = await fetch(`${API_BASE_URL}/applications/spontaneous`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  }

  // Admin endpoints
  async getJobApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/applications/job?${queryString}`);
    return response.json();
  }

  async getSpontaneousApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/applications/spontaneous?${queryString}`);
    return response.json();
  }

  async getApplicationStats() {
    const response = await fetch(`${API_BASE_URL}/applications/stats`);
    return response.json();
  }

  async updateApplicationStatus(id, status, type = 'job') {
    const response = await fetch(`${API_BASE_URL}/applications/${type}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  }

  async deleteApplication(id, type = 'job') {
    const response = await fetch(`${API_BASE_URL}/applications/${type}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}

export default new ApiService();