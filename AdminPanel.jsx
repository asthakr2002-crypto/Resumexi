import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Users, DollarSign, FileCheck, Search, Trash2, ShieldCheck, UserMinus } from 'lucide-react';
import axios from 'axios';

const AdminPanel = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalRevenue: 0, totalResumes: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [statsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('http://localhost:8080/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(users.filter(u => u.id !== id));
            } catch (err) {
                alert('Error deleting user');
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            Admin Control Center <ShieldCheck className="text-primary" />
                        </h1>
                        <p className="text-text-secondary">Platform-wide analytics and user management.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="glass-card px-4 py-2 hover:bg-white/5 transition flex items-center gap-2"><DollarSign size={18} /> Export Revenue</button>
                        <button className="btn-primary text-sm flex items-center gap-2"><Users size={18} /> Invite Admin</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-primary/5 group-hover:text-primary/10 transition duration-500 scale-150 rotate-12"><Users size={120} /></div>
                        <p className="text-text-secondary mb-1">Total Users</p>
                        <p className="text-4xl font-black">{stats.totalUsers}</p>
                    </div>
                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-green-500/5 group-hover:text-green-500/10 transition duration-500 scale-150 rotate-12"><DollarSign size={120} /></div>
                        <p className="text-text-secondary mb-1">Total Revenue</p>
                        <p className="text-4xl font-black text-green-500">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-purple-500/5 group-hover:text-purple-500/10 transition duration-500 scale-150 rotate-12"><FileCheck size={120} /></div>
                        <p className="text-text-secondary mb-1">Resumes Analyzed</p>
                        <p className="text-4xl font-black text-purple-500">{stats.totalResumes}</p>
                    </div>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold text-lg">Platform Users</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                            <input
                                className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-1 focus:ring-primary text-sm"
                                placeholder="Search by name or email..."
                            />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-text-secondary text-sm border-b border-white/5">
                                <th className="p-6">User</th>
                                <th className="p-6">Role</th>
                                <th className="p-6">Joined Date</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                                    <td className="p-6">
                                        <div>
                                            <p className="font-bold">{user.name}</p>
                                            <p className="text-xs text-text-secondary">{user.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-6 text-sm text-text-secondary">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="p-2 text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
