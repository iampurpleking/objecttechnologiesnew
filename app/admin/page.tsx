"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
// Admin Management Component
function AdminManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchUsersAndAdmins = async () => {
      setLoading(true);
      setError('');
      // Fetch all users from Supabase auth.users (via a view or RPC)
      const { data: usersData, error: usersError } = await supabase.from('users_view').select('*');
      // Fetch all admins
      const { data: adminsData, error: adminsError } = await supabase.from('admin_users').select('*');
      if (usersError || adminsError) {
        setError('Failed to fetch users or admins.');
        setLoading(false);
        return;
      }
      setUsers(usersData || []);
      setAdmins(adminsData || []);
      setLoading(false);
    };
    fetchUsersAndAdmins();
  }, [refresh]);

  const promoteToAdmin = async (user: any) => {
    setLoading(true);
    await supabase.from('admin_users').insert({ user_id: user.id, email: user.email, role: 'admin' });
    setRefresh(r => r + 1);
  };
  const demoteFromAdmin = async (admin: any) => {
    setLoading(true);
    await supabase.from('admin_users').delete().eq('user_id', admin.user_id);
    setRefresh(r => r + 1);
  };

  return (
    <div className="bg-brand-white rounded-lg shadow p-6 mt-8">
      <h3 className="text-xl font-semibold mb-4">Admin Management</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const isAdmin = admins.some(a => a.user_id === user.id);
                const adminObj = admins.find(a => a.user_id === user.id);
                return (
                  <tr key={user.id}>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{isAdmin ? adminObj.role : '-'}</td>
                    <td className="px-4 py-2">
                      {isAdmin ? (
                        <button onClick={() => demoteFromAdmin(adminObj)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Remove Admin</button>
                      ) : (
                        <button onClick={() => promoteToAdmin(user)} className="px-3 py-1 bg-green-100 text-green-700 rounded">Make Admin</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
import AdminLayout from './AdminLayout';

// Dashboard Overview Component
function DashboardOverview() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Active Projects', value: '28', change: '+3', icon: '🚀' },
    { label: 'Blog Posts', value: '45', change: '+5', icon: '📝' },
    { label: 'Monthly Revenue', value: '$12,340', change: '+18%', icon: '💰' },
  ];

  const recentActivity = [
    { type: 'user', message: 'New user registered: john@example.com', time: '2 minutes ago' },
    { type: 'project', message: 'Project "E-commerce Site" status updated', time: '15 minutes ago' },
    { type: 'blog', message: 'New blog post published: "Next.js Best Practices"', time: '1 hour ago' },
    { type: 'user', message: 'User complaint submitted by sarah@example.com', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-brand-black mb-2">Dashboard Overview</h2>
        <p className="text-brand-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-brand-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brand-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-brand-black">{stat.value}</p>
                <p className="text-brand-orange text-sm">{stat.change}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-brand-white rounded-lg shadow">
        <div className="p-6 border-b border-brand-gray-200">
          <h3 className="text-xl font-semibold text-brand-black">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-brand-orange mt-2"></div>
                <div className="flex-1">
                  <p className="text-brand-black">{activity.message}</p>
                  <p className="text-brand-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// User Management Component
function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joined: '2024-01-15', projects: 3 },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', status: 'active', joined: '2024-02-20', projects: 1 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', joined: '2024-03-10', projects: 2 },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand-black mb-2">User Management</h2>
        <p className="text-brand-gray-600">Manage your users and their access.</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors">
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-brand-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-brand-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-brand-black">{user.name}</div>
                    <div className="text-brand-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-brand-gray-500">{user.joined}</td>
                <td className="px-6 py-4 text-brand-gray-500">{user.projects}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-brand-orange hover:text-brand-orange/80">View</button>
                    <button className="text-brand-gray-600 hover:text-brand-gray-800">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Project Management Component
function ProjectManagement() {
  const projects = [
    { id: 1, name: 'E-commerce Platform', client: 'TechMart Nigeria', status: 'In Progress', progress: 75, deadline: '2024-12-15' },
    { id: 2, name: 'Healthcare App', client: 'MediConnect', status: 'Completed', progress: 100, deadline: '2024-11-30' },
    { id: 3, name: 'Corporate Website', client: 'Business Solutions Ltd', status: 'Planning', progress: 25, deadline: '2025-01-20' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand-black mb-2">Project Management</h2>
        <p className="text-brand-gray-600">Track and manage all your projects.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select 
            className="px-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label="Filter projects by status"
          >
            <option>All Statuses</option>
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors">
          New Project
        </button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-brand-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-brand-black">{project.name}</h3>
                <p className="text-brand-gray-600">Client: {project.client}</p>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-brand-gray-600">Progress</span>
                <span className="text-brand-orange">{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill`} style={{width: `${project.progress}%`}}></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-brand-gray-600 text-sm">Deadline: {project.deadline}</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-brand-orange hover:bg-brand-orange/5 rounded">View</button>
                <button className="px-3 py-1 text-brand-gray-600 hover:bg-brand-gray-100 rounded">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Blog Management Component
function BlogManagement() {
  const [posts] = useState([
    { id: 1, title: 'Next.js Best Practices for 2024', status: 'published', author: 'Admin', date: '2024-09-20', views: 1234 },
    { id: 2, title: 'Building Scalable React Applications', status: 'draft', author: 'Admin', date: '2024-09-18', views: 0 },
    { id: 3, title: 'The Future of Web Development', status: 'published', author: 'Admin', date: '2024-09-15', views: 2156 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand-black mb-2">Blog Management</h2>
        <p className="text-brand-gray-600">Create and manage your blog content.</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select 
            className="px-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label="Filter blog posts"
          >
            <option>All Posts</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <input
            type="text"
            placeholder="Search posts..."
            className="px-4 py-2 border border-brand-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label="Search blog posts"
          />
        </div>
        <button className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors">
          New Post
        </button>
      </div>

      <div className="bg-brand-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-brand-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-brand-black">{post.title}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-brand-gray-500">{post.author}</td>
                <td className="px-6 py-4 text-brand-gray-500">{post.date}</td>
                <td className="px-6 py-4 text-brand-gray-500">{post.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="text-brand-orange hover:text-brand-orange/80">Edit</button>
                    <button className="text-brand-gray-600 hover:text-brand-gray-800">View</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Analytics Component
function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-brand-black mb-2">Analytics</h2>
        <p className="text-brand-gray-600">Track your website performance and user engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-brand-black mb-4">Website Traffic</h3>
          <div className="h-64 bg-brand-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-brand-gray-500">Chart placeholder - integrate with analytics service</p>
          </div>
        </div>

        <div className="bg-brand-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-brand-black mb-4">User Engagement</h3>
          <div className="h-64 bg-brand-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-brand-gray-500">Chart placeholder - integrate with analytics service</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-brand-black mb-4">Top Pages</h3>
        <div className="space-y-3">
          {[
            { page: '/', views: 5234, percentage: 45 },
            { page: '/about', views: 2156, percentage: 25 },
            { page: '/projects', views: 1890, percentage: 20 },
            { page: '/testimonials', views: 934, percentage: 10 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-brand-black">{item.page}</span>
                  <span className="text-brand-gray-600">{item.views.toLocaleString()} views</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${item.percentage}%`}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardOverview />;
      case 'users': return <UserManagement />;
      case 'projects': return <ProjectManagement />;
      case 'blog': return <BlogManagement />;
      case 'analytics': return <Analytics />;
      case 'admin-management': return <AdminManagement />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Section Navigation */}
        <div className="flex space-x-1 bg-brand-white rounded-lg p-1 shadow">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'projects', label: 'Projects', icon: '🚀' },
            { id: 'blog', label: 'Blog', icon: '📝' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'admin-management', label: 'Admin Mgmt', icon: '🛡️' },
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-brand-orange text-brand-white'
                  : 'text-brand-gray-600 hover:text-brand-black hover:bg-brand-gray-50'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </AdminLayout>
  );
}