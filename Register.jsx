import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:8080/api/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email might already be in use.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 w-full max-w-md"
            >
                <div className="flex items-center gap-2 font-bold text-2xl mb-8 justify-center">
                    <Sparkles className="text-primary" />
                    <span>ResumeX AI</span>
                </div>

                <h2 className="text-2xl font-bold mb-2">Create Account</h2>
                <p className="text-text-secondary mb-8">Start your journey to a better career today.</p>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="text"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary outline-none transition"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary outline-none transition"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary outline-none transition"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3 text-lg flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight className="ml-2 w-5 h-5" /></>}
                    </button>
                </form>

                <p className="mt-8 text-center text-text-secondary">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
