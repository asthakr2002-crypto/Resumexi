import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FileText, TrendingUp, Award, Zap } from 'lucide-react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/resumes/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const latestScore = history[0]?.atsScore || 0;

    const chartData = {
        labels: history.slice(0, 5).reverse().map((_, i) => `Resume ${i + 1}`),
        datasets: [{
            label: 'ATS Score',
            data: history.slice(0, 5).reverse().map(r => r.atsScore),
            backgroundColor: 'rgba(99, 102, 241, 0.5)',
            borderColor: '#6366f1',
            borderWidth: 1,
        }]
    };

    const doughnutData = {
        labels: ['Matched', 'Missing'],
        datasets: [{
            data: [latestScore, 100 - latestScore],
            backgroundColor: ['#6366f1', 'rgba(255, 255, 255, 0.05)'],
            borderWidth: 0,
        }]
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                    <p className="text-text-secondary">Here's an overview of your career acceleration progress.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="glass-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500"><FileText /></div>
                        <div>
                            <p className="text-sm text-text-secondary">Total Analysis</p>
                            <p className="text-2xl font-bold">{history.length}</p>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500"><TrendingUp /></div>
                        <div>
                            <p className="text-sm text-text-secondary">Avg. Score</p>
                            <p className="text-2xl font-bold">{history.length > 0 ? (history.reduce((a, b) => a + b.atsScore, 0) / history.length).toFixed(1) : 0}%</p>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500"><Award /></div>
                        <div>
                            <p className="text-sm text-text-secondary">Highest Score</p>
                            <p className="text-2xl font-bold">{history.length > 0 ? Math.max(...history.map(r => r.atsScore)).toFixed(1) : 0}%</p>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center text-yellow-500"><Zap /></div>
                        <div>
                            <p className="text-sm text-text-secondary">Active Plan</p>
                            <p className="text-2xl font-bold">Free</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-bold mb-6">Score Progression</h3>
                        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                    </div>
                    <div className="glass-card p-8 flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-6 w-full text-left">Latest ATS Alignment</h3>
                        <div className="w-64 h-64 relative">
                            <Doughnut data={doughnutData} options={{ cutout: '80%', plugins: { legend: { display: false } } }} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold">{latestScore.toFixed(0)}%</span>
                                <span className="text-xs text-text-secondary font-medium">Match</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
