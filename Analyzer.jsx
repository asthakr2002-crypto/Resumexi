import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Upload, FileText, CheckCircle2, XCircle, AlertCircle, Loader2, Download } from 'lucide-react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const Analyzer = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!file) return;
        setAnalyzing(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/api/resumes/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);

            const analysisRes = await axios.get(`http://localhost:8080/api/resumes/${response.data.id}/analysis`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setAnalysis(analysisRes.data);

            if (response.data.atsScore > 70) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">AI Resume Analyzer</h1>
                    <p className="text-text-secondary">Upload your resume to get instant feedback and ATS optimization tips.</p>
                </header>

                {!result ? (
                    <div className="glass-card p-12 flex flex-col items-center border-dashed border-2 border-white/10">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Upload size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Drag and drop your file here</h3>
                        <p className="text-text-secondary mb-8 text-center max-w-sm">Supported formats: PDF (Max 5MB). Ensure your resume is up to date for best results.</p>
                        <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="resume-upload"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="resume-upload"
                            className="btn-primary cursor-pointer mb-4"
                        >
                            Select File
                        </label>
                        {file && <p className="text-sm font-medium text-primary">Selected: {file.name}</p>}

                        <button
                            onClick={handleUpload}
                            disabled={!file || analyzing}
                            className={`mt-8 px-12 py-3 rounded-lg font-bold transition ${!file || analyzing ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'btn-primary'}`}
                        >
                            {analyzing ? <Loader2 className="animate-spin" /> : 'Start AI Analysis'}
                        </button>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="glass-card p-8 col-span-2">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">ATS Match Score</h2>
                                        <p className="text-text-secondary">Based on industry-standard keyword analysis.</p>
                                    </div>
                                    <div className="text-5xl font-black text-primary">{result.atsScore?.toFixed(0)}%</div>
                                </div>

                                <div className="w-full bg-white/5 h-4 rounded-full mb-10 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-right from-primary to-accent-purple transition-all duration-1000 ease-out"
                                        style={{ width: `${result.atsScore}%` }}
                                    ></div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold mb-3"><CheckCircle2 className="text-green-500" size={18} /> Found Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis?.skillsFound?.split('|')[0].split(',').map((s, i) => (
                                                <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm border border-green-500/20">{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold mb-3"><XCircle className="text-red-500" size={18} /> Missing Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {analysis?.skillsMissing?.split(',').map((s, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-sm border border-red-500/20">{s.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="glass-card p-6 bg-primary/5 border-primary/20">
                                    <h3 className="flex items-center gap-2 font-bold mb-4"><AlertCircle size={18} /> AI Recommendations</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                                        {analysis?.recommendations}
                                    </p>
                                    <button className="btn-primary w-full text-sm"><Download size={16} /> Download PDF Report</button>
                                </div>

                                <div className="glass-card p-6">
                                    <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-text-secondary">Career Path</h3>
                                    <div className="space-y-4">
                                        {['Senior Full-Stack Developer', 'DevOps Engineer', 'Cloud Architect'].map((role, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition border border-transparent hover:border-white/10">
                                                <span className="text-sm font-medium">{role}</span>
                                                <CheckCircle2 size={16} className="text-primary" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setResult(null)}
                            className="text-text-secondary hover:text-white transition font-medium"
                        >
                            ← Analyze another resume
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Analyzer;
