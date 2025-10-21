"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../../utils/supabaseClient';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });
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
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        const [usersRes, adminsRes] = await Promise.all([
          fetch(`/api/admin/users?page=1&pageSize=100`, { headers }),
          fetch(`/api/admin/admin-users`, { headers }),
        ]);
        const usersJson = await usersRes.json();
        const adminsJson = await adminsRes.json();
        if (!usersRes.ok) throw new Error(usersJson.error || 'Failed to fetch users');
        if (!adminsRes.ok) throw new Error(adminsJson.error || 'Failed to fetch admins');
        setUsers(usersJson.users || []);
        setAdmins(adminsJson.admins || []);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch users or admins.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsersAndAdmins();
  }, [refresh]);

  const promoteToAdmin = async (user: any) => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
      const res = await fetch('/api/admin/admin-users', {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_id: user.id, email: user.email, role: 'admin' }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error || 'Failed to promote to admin');
      }
      setRefresh(r => r + 1);
    } catch (e) {
      console.error(e);
      setError((e as any)?.message || 'Failed to promote to admin');
    } finally {
      setLoading(false);
    }
  };
  const demoteFromAdmin = async (admin: any) => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const url = `/api/admin/admin-users?user_id=${encodeURIComponent(admin.user_id)}`;
      const res = await fetch(url, { method: 'DELETE', headers });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error || 'Failed to demote admin');
      }
      setRefresh(r => r + 1);
    } catch (e) {
      console.error(e);
      setError((e as any)?.message || 'Failed to demote admin');
    } finally {
      setLoading(false);
    }
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
import AdminLayout from '@/components/layouts/AdminLayout';

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
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<null | 'view' | 'invite'>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const accessToken = sessionData.session?.access_token;
        const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        const res = await fetch('/api/admin/users?page=1&pageSize=100', { headers });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || 'Failed to fetch users');
        setUsers(j.users || []);
      } catch (e) {
        setError((e as any)?.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <button
          className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors"
          onClick={() => setShowModal('invite')}
        >
          Add New User
        </button>
      </div>

      {/* Users Table */}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading users...</div>
      ) : (
        <div className="bg-brand-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Joined</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-brand-gray-50">
                  <td className="px-4 py-2">
                    <div className="font-medium text-brand-black">{user.email}</div>
                  </td>
                  <td className="px-4 py-2 text-brand-gray-500">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <button
                        className="text-brand-orange hover:text-brand-orange/80"
                        onClick={() => { setSelectedUser(user); setShowModal('view'); }}
                      >
                        View
                      </button>
                      <button className="text-brand-gray-600 hover:text-brand-gray-800" disabled>
                        Edit
                      </button>
      {/* User Details Modal */}
  {showModal === 'view' && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">User Details</h3>
            <div className="mb-2"><strong>Email:</strong> {selectedUser.email}</div>
            <div className="mb-2"><strong>Created At:</strong> {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '-'}</div>
            <div className="mb-2"><strong>User ID:</strong> {selectedUser.id}</div>
            <button className="mt-6 px-4 py-2 bg-brand-orange text-white rounded" onClick={() => setShowModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
  {showModal === 'invite' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">Invite New User</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setInviteLoading(true);
                setInviteError('');
                setInviteSuccess('');
                try {
                  const res = await fetch('/api/invite-user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: inviteEmail }),
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    setInviteError(data.error || 'Failed to send invite.');
                  } else {
                    setInviteSuccess('Invite email sent to ' + inviteEmail);
                    setInviteEmail('');
                  }
                } catch (err) {
                  setInviteError('Network error.');
                }
                setInviteLoading(false);
              }}
            >
              <input
                type="email"
                className="w-full px-4 py-2 border rounded mb-4"
                placeholder="Enter user email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
              />
              {inviteError && <div className="text-red-500 mb-2">{inviteError}</div>}
              {inviteSuccess && <div className="text-green-600 mb-2">{inviteSuccess}</div>}
              <button
                type="submit"
                className="w-full py-2 bg-brand-orange text-white rounded font-semibold"
                disabled={inviteLoading}
              >
                {inviteLoading ? 'Sending...' : 'Send Invite'}
              </button>
            </form>
            <button className="mt-4 px-4 py-2 bg-brand-gray-200 text-brand-black rounded" onClick={() => setShowModal(null)}>Cancel</button>
          </div>
        </div>
      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Project Management Component
function ProjectManagement() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All Statuses');
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ name: '', client: '', status: 'Planning', progress: 0, deadline: '', description: '', features: '' });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const res = await fetch('/api/admin/projects', { headers });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed to load projects');
      setProjects(j.projects || []);
    } catch (e) {
      setError((e as any)?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProjects(); }, []);

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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors" onClick={() => setShowNew(true)}>
          New Project
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Loading projects...</div>
      ) : (
      <div className="grid gap-6">
        {projects
          .filter(p => filter === 'All Statuses' || p.status === filter)
          .map((project) => (
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
                 <div className="progress-fill" style={{ ['--w' as any]: `${project.progress}%`, width: 'var(--w)' }}></div>
               </div>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-brand-gray-600 text-sm">Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}</span>
               <div className="flex space-x-2">
                 <button className="px-3 py-1 text-brand-orange hover:bg-brand-orange/5 rounded" onClick={() => { setSelectedProject(project); setShowView(true); }}>View</button>
                 <button className="px-3 py-1 text-brand-gray-600 hover:bg-brand-gray-100 rounded" onClick={() => { setEditForm({ ...project }); setShowEdit(true); }}>Edit</button>
                 {project.status !== 'Completed' && (
                   <button
                     className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                     onClick={async () => {
                       try {
                         const { data: sessionData } = await supabase.auth.getSession();
                         const accessToken = sessionData.session?.access_token;
                         const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
                         const res = await fetch(`/api/admin/projects/${project.id}`, {
                           method: 'PATCH',
                           headers,
                           body: JSON.stringify({ status: 'Completed', progress: 100 }),
                         });
                         const j = await res.json();
                         if (!res.ok) throw new Error(j.error || 'Failed to mark as completed');
                         await loadProjects();
                       } catch (e) {
                         alert((e as any)?.message || 'Failed to mark as completed');
                       }
                     }}
                   >
                     Mark as Completed
                   </button>
                 )}
               </div>
             </div>
           </div>
        ))}
      {/* View Project Modal */}
      {showView && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">Project Details</h3>
            <div className="mb-2"><strong>Name:</strong> {selectedProject.name}</div>
            <div className="mb-2"><strong>Client:</strong> {selectedProject.client}</div>
            {selectedProject.description && (
              <div className="mb-2"><strong>Description:</strong> {selectedProject.description}</div>
            )}
            {selectedProject.features && (
              <div className="mb-2"><strong>Features:</strong> {selectedProject.features}</div>
            )}
            <div className="mb-2"><strong>Status:</strong> {selectedProject.status}</div>
            <div className="mb-2"><strong>Progress:</strong> {selectedProject.progress}%</div>
            <div className="mb-2"><strong>Deadline:</strong> {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : '-'}</div>
            <div className="mb-2"><strong>Created At:</strong> {selectedProject.created_at ? new Date(selectedProject.created_at).toLocaleString() : '-'}</div>
            <button className="mt-6 px-4 py-2 bg-brand-orange text-white rounded" onClick={() => { setShowView(false); setSelectedProject(null); }}>Close</button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEdit && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">Edit Project</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  const accessToken = sessionData.session?.access_token;
                  const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
                  const res = await fetch(`/api/admin/projects/${editForm.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(editForm),
                  });
                  const j = await res.json();
                  if (!res.ok) throw new Error(j.error || 'Failed to update project');
                  setShowEdit(false);
                  setEditForm(null);
                  await loadProjects();
                } catch (e) {
                  alert((e as any)?.message || 'Failed to update project');
                }
              }}
            >
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Project name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} required />
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Client" value={editForm.client} onChange={e => setEditForm({ ...editForm, client: e.target.value })} />
              <textarea className="w-full px-3 py-2 border rounded mb-2" placeholder="Project description" value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
              <textarea className="w-full px-3 py-2 border rounded mb-2" placeholder="Project features (long text)" value={editForm.features || ''} onChange={e => setEditForm({ ...editForm, features: e.target.value })} />
              <div className="flex gap-2 mb-2">
                <select className="flex-1 px-3 py-2 border rounded" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <input type="number" min={0} max={100} className="w-28 px-3 py-2 border rounded" placeholder="Progress %" value={editForm.progress} onChange={e => setEditForm({ ...editForm, progress: Number(e.target.value) })} />
              </div>
              <input type="date" className="w-full px-3 py-2 border rounded mb-4" value={editForm.deadline ? editForm.deadline.slice(0,10) : ''} onChange={e => setEditForm({ ...editForm, deadline: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-4 py-2 bg-brand-gray-200 text-brand-black rounded" onClick={() => { setShowEdit(false); setEditForm(null); }}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">New Project</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  const accessToken = sessionData.session?.access_token;
                  const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
                  const res = await fetch('/api/admin/projects', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(form),
                  });
                  const j = await res.json();
                  if (!res.ok) throw new Error(j.error || 'Failed to create project');
                  setShowNew(false);
                  setForm({ name: '', client: '', status: 'Planning', progress: 0, deadline: '', description: '', features: '' });
                  await loadProjects();
                } catch (e) {
                  alert((e as any)?.message || 'Failed to create project');
                }
              }}
            >
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Project name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Client" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
              <textarea className="w-full px-3 py-2 border rounded mb-2" placeholder="Project description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
              <textarea className="w-full px-3 py-2 border rounded mb-2" placeholder="Project features (long text)" value={form.features || ''} onChange={e => setForm({ ...form, features: e.target.value })} />
              <div className="flex gap-2 mb-2">
                <select className="flex-1 px-3 py-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <input type="number" min={0} max={100} className="w-28 px-3 py-2 border rounded" placeholder="Progress %" value={form.progress} onChange={e => setForm({ ...form, progress: Number(e.target.value) })} />
              </div>
              <input type="date" className="w-full px-3 py-2 border rounded mb-4" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-4 py-2 bg-brand-gray-200 text-brand-black rounded" onClick={() => setShowNew(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Blog Management Component
function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [form, setForm] = useState({ title: '', content: '', status: 'draft', author: '', image_url: '' });
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [filter, setFilter] = useState('All Posts');
  const [search, setSearch] = useState('');

  const loadPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
      const res = await fetch('/api/admin/blog-posts', { headers });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Failed to fetch posts');
      setPosts(j.posts || []);
    } catch (e) {
      setError((e as any)?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  // Image upload helpers
  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/blog-images', { method: 'POST', body: fd });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error || 'Upload failed');
    return j.url as string;
  };

  const handleNewImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImage(file);
      setForm(prev => ({ ...prev, image_url: url }));
    } catch (err: any) {
      alert(err?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (e.currentTarget) {
        e.currentTarget.value = '';
      }
    }
  };

  const handleEditImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setEditUploading(true);
      const url = await uploadImage(file);
      setEditForm((prev: any) => ({ ...prev, image_url: url }));
    } catch (err: any) {
      alert(err?.message || 'Failed to upload image');
    } finally {
      setEditUploading(false);
      if (e.currentTarget) {
        e.currentTarget.value = '';
      }
    }
  };

  const filteredPosts = posts.filter(post =>
    (filter === 'All Posts' || post.status === filter.toLowerCase()) &&
    (post.title?.toLowerCase().includes(search.toLowerCase()) || post.content?.toLowerCase().includes(search.toLowerCase()))
  );

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
            value={filter}
            onChange={e => setFilter(e.target.value)}
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
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 bg-brand-orange text-brand-white rounded-lg hover:bg-brand-orange/90 transition-colors" onClick={() => setShowNew(true)}>
          New Post
        </button>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="bg-brand-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-brand-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-200">
              {filteredPosts.map((post) => (
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
                  <td className="px-6 py-4 text-brand-gray-500">{post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-brand-orange hover:text-brand-orange/80" onClick={() => { setEditForm(post); setShowEdit(true); }}>Edit</button>
                      <button className="text-red-600 hover:text-red-800" onClick={async () => {
                        if (!window.confirm('Delete this post?')) return;
                        try {
                          const { data: sessionData } = await supabase.auth.getSession();
                          const accessToken = sessionData.session?.access_token;
                          const headers: HeadersInit = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
                          const res = await fetch(`/api/admin/blog-posts/${post.id}`, { method: 'DELETE', headers });
                          const j = await res.json();
                          if (!res.ok) throw new Error(j.error || 'Failed to delete post');
                          await loadPosts();
                        } catch (e) {
                          alert((e as any)?.message || 'Failed to delete post');
                        }
                      }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Post Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">New Blog Post</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  const accessToken = sessionData.session?.access_token;
                  const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
                  const res = await fetch('/api/admin/blog-posts', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(form),
                  });
                  const j = await res.json();
                  if (!res.ok) throw new Error(j.error || 'Failed to create post');
                  setShowNew(false);
                  setForm({ title: '', content: '', status: 'draft', author: '', image_url: '' });
                  await loadPosts();
                } catch (e) {
                  alert((e as any)?.message || 'Failed to create post');
                }
              }}
            >
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
              <select aria-label="Post status" className="w-full px-3 py-2 border rounded mb-2" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {form.image_url ? (
                <div className="mb-2">
                  <img src={form.image_url} alt="Featured" className="w-full h-40 object-cover rounded" />
                  <button type="button" className="mt-2 text-sm text-red-600" onClick={() => setForm({ ...form, image_url: '' })}>Remove image</button>
                </div>
              ) : (
                <div className="mb-2">
                  <input type="file" accept="image/*" onChange={handleNewImageChange} disabled={uploading} />
                  {uploading && <div className="text-sm text-brand-gray-500 mt-1">Uploading...</div>}
                </div>
              )}
              <div className="mb-4">
                <RichTextEditor value={form.content} onChange={(v: string) => setForm({ ...form, content: v })} />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-4 py-2 bg-brand-gray-200 text-brand-black rounded" onClick={() => setShowNew(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {showEdit && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-brand-orange">Edit Blog Post</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { data: sessionData } = await supabase.auth.getSession();
                  const accessToken = sessionData.session?.access_token;
                  const headers: HeadersInit = accessToken ? { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } : { 'Content-Type': 'application/json' };
                  const res = await fetch(`/api/admin/blog-posts/${editForm.id}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(editForm),
                  });
                  const j = await res.json();
                  if (!res.ok) throw new Error(j.error || 'Failed to update post');
                  setShowEdit(false);
                  setEditForm(null);
                  await loadPosts();
                } catch (e) {
                  alert((e as any)?.message || 'Failed to update post');
                }
              }}
            >
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} required />
              <input className="w-full px-3 py-2 border rounded mb-2" placeholder="Author" value={editForm.author} onChange={e => setEditForm({ ...editForm, author: e.target.value })} />
              <select aria-label="Post status" className="w-full px-3 py-2 border rounded mb-2" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {editForm.image_url ? (
                <div className="mb-2">
                  <img src={editForm.image_url} alt="Featured" className="w-full h-40 object-cover rounded" />
                  <button type="button" className="mt-2 text-sm text-red-600" onClick={() => setEditForm({ ...editForm, image_url: '' })}>Remove image</button>
                </div>
              ) : (
                <div className="mb-2">
                  <input type="file" accept="image/*" onChange={handleEditImageChange} disabled={editUploading} />
                  {editUploading && <div className="text-sm text-brand-gray-500 mt-1">Uploading...</div>}
                </div>
              )}
              <div className="mb-4">
                <RichTextEditor value={editForm.content} onChange={(v: string) => setEditForm({ ...editForm, content: v })} />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-4 py-2 bg-brand-gray-200 text-brand-black rounded" onClick={() => { setShowEdit(false); setEditForm(null); }}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-orange text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                  <div className="progress-fill" style={{ ['--w' as any]: `${item.percentage}%`, width: 'var(--w)' }}></div>
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
      case 'users': return <UsersPage />;
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