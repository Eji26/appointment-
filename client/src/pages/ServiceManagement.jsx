import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Clock, DollarSign, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState({ name: '', description: '', duration: 30, price: 0 });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentService.id) {
                await api.put(`/services/${currentService.id}`, currentService);
            } else {
                await api.post('/services', currentService);
            }
            setShowModal(false);
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to retire this curated service?')) {
            try {
                await api.delete(`/services/${id}`);
                fetchServices();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream/30 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black text-brand-navy tracking-tight uppercase"
                        >
                            Business <span className="text-brand-gold italic">Curations</span>
                        </motion.h1>
                        <p className="text-brand-navy/60 mt-2 font-medium">Manage the exclusive offerings your clients can reserve.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setCurrentService({ name: '', description: '', duration: 30, price: 0 }); setShowModal(true); }}
                        className="bg-brand-navy text-brand-gold px-8 py-4 rounded-2xl font-black flex items-center space-x-2 shadow-2xl shadow-brand-navy/20 uppercase tracking-widest text-xs"
                    >
                        <Plus size={20} />
                        <span>Add New Entry</span>
                    </motion.button>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-brand-navy/5 shadow-xl shadow-brand-navy/5 hover:shadow-2xl hover:shadow-brand-navy/10 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="bg-brand-navy/5 p-3 rounded-2xl text-brand-navy">
                                        <Briefcase size={24} />
                                    </div>
                                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                        <button onClick={() => { setCurrentService(service); setShowModal(true); }} className="p-3 bg-white text-brand-navy hover:text-brand-gold border border-brand-navy/5 rounded-xl shadow-sm transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-3 bg-white text-brand-navy hover:text-red-600 border border-brand-navy/5 rounded-xl shadow-sm transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">{service.name}</h3>
                                <p className="text-brand-navy/50 text-sm mb-8 leading-relaxed font-medium line-clamp-3 italic">{service.description || 'Our signature bespoke offering for the discerning client.'}</p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-navy/5 relative z-10">
                                    <div className="flex items-center space-x-6 text-xs font-black uppercase tracking-[0.2em] text-brand-navy/40">
                                        <div className="flex items-center space-x-2">
                                            <Clock size={16} className="text-brand-gold" />
                                            <span>{service.duration}m</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DollarSign size={16} className="text-brand-gold" />
                                            <span className="text-brand-navy">${service.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 bg-brand-navy/40 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3.5rem] w-full max-w-lg p-10 md:p-14 shadow-2xl relative overflow-hidden border border-brand-gold/20"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
                                <h2 className="text-3xl font-black text-brand-navy mb-8 uppercase italic tracking-tight">{currentService.id ? 'Refine' : 'Add'} <span className="text-brand-gold">Curation</span></h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="group">
                                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-widest ml-2">Display Name</label>
                                        <input
                                            required
                                            value={currentService.name}
                                            onChange={e => setCurrentService({ ...currentService, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-brand-cream/20 border-2 border-transparent focus:border-brand-gold/50 rounded-2xl outline-none font-bold text-brand-navy transition-all"
                                            placeholder="e.g. Executive Consultation"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="text-xs font-black text-brand-navy/30 uppercase tracking-widest ml-2">Narrative</label>
                                        <textarea
                                            value={currentService.description || ''}
                                            onChange={e => setCurrentService({ ...currentService, description: e.target.value })}
                                            className="w-full px-6 py-4 bg-brand-cream/20 border-2 border-transparent focus:border-brand-gold/50 rounded-2xl outline-none font-bold text-brand-navy transition-all min-h-[100px]"
                                            placeholder="Describe the aesthetic and value..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-xs font-black text-brand-navy/30 uppercase tracking-widest ml-2">Duration (min)</label>
                                            <input
                                                type="number"
                                                required
                                                value={currentService.duration}
                                                onChange={e => setCurrentService({ ...currentService, duration: parseInt(e.target.value) })}
                                                className="w-full px-6 py-4 bg-brand-cream/20 border-2 border-transparent focus:border-brand-gold/50 rounded-2xl outline-none font-bold text-brand-navy transition-all"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="text-xs font-black text-brand-navy/30 uppercase tracking-widest ml-2">Value ($)</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                required
                                                value={currentService.price}
                                                onChange={e => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                                                className="w-full px-6 py-4 bg-brand-cream/20 border-2 border-transparent focus:border-brand-gold/50 rounded-2xl outline-none font-bold text-brand-navy transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 pt-8">
                                        <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-8 py-4 border-2 border-brand-navy/10 rounded-2xl font-black text-xs uppercase tracking-widest text-brand-navy/40 hover:bg-gray-50 transition-all">Relinquish</button>
                                        <button type="submit" className="flex-1 px-8 py-4 bg-brand-navy text-brand-gold rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-navy/20 hover:scale-105 active:scale-95 transition-all">Finalize</button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ServiceManagement;
