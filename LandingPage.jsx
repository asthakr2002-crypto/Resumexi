import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BarChart3, Upload, Shield, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 font-bold text-2xl">
                    <Sparkles className="text-primary" />
                    <span>ResumeX AI</span>
                </div>
                <div className="flex gap-6 items-center">
                    <Link to="/login" className="text-text-secondary hover:text-white transition">Login</Link>
                    <Link to="/register" className="btn-primary">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-20 px-6 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title mb-6">
                        Intelligent Career <br /> Accelerator
                    </h1>
                    <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                        Bridge the gap between your resume and your dream job with AI-powered ATS scoring, skill gap analysis, and personalized career coaching.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/register" className="btn-primary px-8 py-4 text-lg">
                            Analyze My Resume <ArrowRight />
                        </Link>
                        <button className="glass-card px-8 py-4 text-lg font-semibold hover:bg-white/5 transition border-white/10">
                            Live Demo
                        </button>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
                    {[
                        { label: 'Resumes Analyzed', value: '10,000+' },
                        { label: 'Success Rate', value: '85%' },
                        { label: 'Match Precision', value: '98%' },
                        { label: 'Job Matches', value: '2,500+' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6"
                        >
                            <div className="text-3xl font-bold text-primary">{stat.value}</div>
                            <div className="text-sm text-text-secondary">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Powerful AI Features</h2>
                    <p className="text-text-secondary">Everything you need to land your next big role.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Upload />, title: 'Smart Upload', desc: 'Drag and drop your PDF resume for instant parsing.' },
                        { icon: <BarChart3 />, title: 'ATS Scoring', desc: 'Get a professional score based on industry standards.' },
                        { icon: <Shield />, title: 'Skill Gap', desc: 'Identify missing technical and soft skills instantly.' }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card p-8 hover:border-primary/50 transition duration-500">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Sparkles className="text-primary" />
                        <span>ResumeX AI</span>
                    </div>
                    <p className="text-text-secondary text-sm">© 2026 ResumeX AI. Accelerating Careers Worldwide.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="text-text-secondary hover:text-white">Twitter</Link>
                        <Link to="#" className="text-text-secondary hover:text-white">LinkedIn</Link>
                        <Link to="#" className="text-text-secondary hover:text-white">GitHub</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
