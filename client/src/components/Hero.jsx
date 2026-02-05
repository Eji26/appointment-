import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Zap, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden pt-16 pb-32">
            {/* Background blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-navy rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-navy text-brand-gold text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
                    >
                        <Star size={14} className="fill-current" />
                        <span>The Gold Standard in Booking</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-brand-navy tracking-tighter leading-[0.9] mb-8"
                    >
                        Reserved for the <br />
                        <span className="gold-shimmer">Elite.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-brand-navy/60 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                    >
                        Don't just schedule. Curate your experience with a platform designed for authority and pure elegance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
                    >
                        <button
                            onClick={() => navigate('/register')}
                            className="group relative w-full sm:w-auto overflow-hidden bg-brand-navy text-brand-gold px-12 py-5 rounded-2xl font-black flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-navy/20 uppercase tracking-widest"
                        >
                            <span>Get Exclusive Access</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/booking')}
                            className="w-full sm:w-auto bg-white/40 backdrop-blur-md border border-brand-navy/10 text-brand-navy px-12 py-5 rounded-2xl font-black hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-95 shadow-xl uppercase tracking-widest"
                        >
                            Book Preview
                        </button>
                    </motion.div>
                </div>

                {/* Floating preview cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Zap className="text-amber-500" />, title: 'Incredible Speed', desc: 'Book slots in under 10 seconds with our optimized flow.' },
                        { icon: <Calendar className="text-indigo-500" />, title: 'Smart Scheduling', desc: 'No more double bookings or overlaps, ever.' },
                        { icon: <Shield className="text-emerald-500" />, title: 'Enterprise Security', desc: 'Your data is encrypted and protected by the latest standards.' }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
                            className="bg-white/70 backdrop-blur-lg border border-white/50 p-8 rounded-3xl shadow-xl shadow-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2 group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
