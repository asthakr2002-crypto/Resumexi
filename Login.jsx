import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials, please try again.');
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

                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-text-secondary mb-8">Enter your credentials to access your dashboard.</p>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-primary outline-none transition"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3 text-lg flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight className="ml-2 w-5 h-5" /></>}
                    </button>
                </form>

                <p className="mt-8 text-center text-text-secondary">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
