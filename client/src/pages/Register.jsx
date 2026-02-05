import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User as UserIcon, ArrowRight, Star } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'CUSTOMER'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                        <UserPlus size={38} />
                    </div>
                    <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase">Join the <span className="text-brand-gold italic">Elite</span></h2>
                    <p className="mt-3 text-brand-navy/50 font-bold uppercase tracking-widest text-xs">Register for curated access</p>
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

                <form className="mt-8 space-y-5 relative z-10" onSubmit={handleSubmit}>
                    <div className="group">
                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Full Name</label>
                        <div className="relative mt-2">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                            <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-4 bg-brand-cream/20 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-brand-gold/50 transition-all text-brand-navy font-bold placeholder:text-brand-navy/20 outline-none"
                                placeholder="E.g. Alexander Pierce"
                            />
                        </div>
                    </div>
                    <div className="group">
                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Email Identity</label>
                        <div className="relative mt-2">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-4 bg-brand-cream/20 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-brand-gold/50 transition-all text-brand-navy font-bold placeholder:text-brand-navy/20 outline-none"
                                placeholder="identity@prestige.com"
                            />
                        </div>
                    </div>
                    <div className="group">
                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Private Password</label>
                        <div className="relative mt-2">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pl-12 pr-4 py-4 bg-brand-cream/20 border-2 border-transparent rounded-[1.5rem] focus:ring-0 focus:border-brand-gold/50 transition-all text-brand-navy font-bold placeholder:text-brand-navy/20 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] ml-2">Membership Type</label>
                        <div className="flex space-x-3 mt-3">
                            {['CUSTOMER', 'ADMIN'].map((role) => (
                                <label key={role} className="flex-1">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={role}
                                        checked={formData.role === role}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="text-center p-4 border-2 border-transparent rounded-2xl cursor-pointer bg-brand-cream/20 peer-checked:bg-brand-navy peer-checked:text-brand-gold peer-checked:border-brand-gold/50 hover:bg-brand-cream/40 transition-all text-xs font-black uppercase tracking-widest text-brand-navy/40 peer-checked:shadow-xl">
                                        {role === 'ADMIN' ? 'Proprietor' : 'Patron'}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-5 px-4 border border-transparent rounded-[1.5rem] text-brand-gold bg-brand-navy hover:bg-brand-navy/95 transition-all font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-brand-navy/20 mt-4"
                    >
                        <span>Confirm Registry</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="text-center relative z-10">
                    <p className="text-xs font-bold text-brand-navy/40 uppercase tracking-widest">
                        Already a member? {' '}
                        <Link to="/login" className="text-brand-gold hover:text-brand-gold-light transition-colors underline decoration-brand-gold/30 underline-offset-4">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
