import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, History, Sparkles, User, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Upload size={20} />, label: 'Upload Resume', path: '/analyzer' },
        { icon: <History size={20} />, label: 'Analysis History', path: '/dashboard' },
        { icon: <Sparkles size={20} />, label: 'AI Suggestions', path: '/dashboard' },
        { icon: <User size={20} />, label: 'Profile', path: '/dashboard' },
    ];

    return (
        <div className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 left-4 m-4 flex flex-col p-6">
            <div className="flex items-center gap-2 font-bold text-xl mb-10 text-white">
                <Sparkles className="text-primary" />
                <span>ResumeX AI</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-white/5 hover:text-white'}`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="pt-6 border-t border-white/10 mt-6">
                <div className="flex items-center gap-3 mb-6 px-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {user.name?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{user.name}</p>
                        <p className="text-xs text-text-secondary truncate">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 w-full rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
