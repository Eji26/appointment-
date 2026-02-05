import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Layout, Mail, Lock, ArrowRight, Star } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-cream/30 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl shadow-brand-navy/10 border border-brand-gold/20 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>

                <div className="text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-brand-navy text-brand-gold mb-6 shadow-xl">
                        <Layout size={38} />
                    </div>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase">Welcome <span className="text-brand-gold italic">Back</span></h2>
                    <p className="mt-3 text-brand-navy/50 font-bold uppercase tracking-widest text-xs">Enter your elite credentials</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm text-center font-black border border-red-100 uppercase tracking-widest"
                    >
                        {error}
                    </motion.div>
                )}

                <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Email Address</label>
                            <div className="relative mt-2">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-brand-cream/20 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-brand-gold/50 transition-all text-brand-navy font-bold placeholder:text-brand-navy/20 outline-none"
                                    placeholder="your@prestige.com"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Password</label>
                            <div className="relative mt-2">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-brand-cream/20 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-brand-gold/50 transition-all text-brand-navy font-bold placeholder:text-brand-navy/20 outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-5 px-4 border border-transparent rounded-[1.5rem] text-brand-gold bg-brand-navy hover:bg-brand-navy/95 transition-all font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-brand-navy/20"
                    >
                        <span>Sign In</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="text-center relative z-10 pt-4">
                    <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">
                        New to the collection? {' '}
                        <Link to="/register" className="text-brand-gold hover:text-brand-gold-light transition-colors underline decoration-brand-gold/30 underline-offset-4">
                            Create Exclusive Account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
