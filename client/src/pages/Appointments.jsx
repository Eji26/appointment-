import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Clock,
    XCircle,
    CheckCircle2,
    CreditCard,
    User,
    ChevronRight,
    Filter,
    MoreVertical
} from 'lucide-react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get('/appointments');
            setAppointments(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            if (status === 'CANCELLED') {
                if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
                await api.put(`/appointments/${id}/cancel`);
            } else {
                await api.put(`/appointments/${id}/status`, { status });
            }
            fetchAppointments();
        } catch (err) {
            alert(err.response?.data?.message || 'Update failed');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/30';
            case 'PAID': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20 ring-brand-gold/30';
            case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100 ring-red-500/30';
            case 'COMPLETED': return 'bg-brand-navy/5 text-brand-navy border-brand-navy/10 ring-brand-navy/30';
            default: return 'bg-gray-50 text-gray-500 border-gray-100 ring-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream/30 p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black text-brand-navy tracking-tight"
                        >
                            {isAdmin ? 'Business' : 'My'} <span className="text-brand-gold italic">Agenda</span>
                        </motion.h1>
                        <p className="text-brand-navy/60 mt-2 font-medium">
                            {isAdmin ? 'Complete overview of all scheduled sessions and status management.' : 'View and manage your upcoming elite bookings.'}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="bg-white border border-brand-navy/5 p-1 rounded-2xl flex items-center shadow-sm">
                            <button className="px-4 py-2 bg-brand-navy text-brand-gold rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg">All</button>
                            <button className="px-4 py-2 text-brand-navy/50 font-bold text-xs uppercase tracking-widest hover:text-brand-navy">Upcoming</button>
                            <button className="px-4 py-2 text-brand-navy/50 font-bold text-xs uppercase tracking-widest hover:text-brand-navy">Past</button>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
                    </div>
                ) : appointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white/50 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-brand-navy/10"
                    >
                        <Calendar className="mx-auto text-brand-navy/20 mb-6" size={64} />
                        <h3 className="text-2xl font-black text-brand-navy">Quiet for now.</h3>
                        <p className="text-brand-navy/50 font-medium mt-2">No appointments have been scheduled yet.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        <AnimatePresence>
                            {appointments.map((appt, idx) => (
                                <motion.div
                                    key={appt.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white/70 backdrop-blur-md border border-brand-navy/5 rounded-[2.5rem] p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between shadow-xl shadow-brand-navy/5 hover:shadow-2xl hover:shadow-brand-navy/10 transition-all border-l-8 border-l-brand-navy"
                                    style={{ borderLeftColor: appt.status === 'PAID' ? '#D4AF37' : appt.status === 'CANCELLED' ? '#ef4444' : '#001F3F' }}
                                >
                                    <div className="flex items-start space-x-6">
                                        <div className="bg-brand-navy/5 p-4 rounded-[1.5rem] text-brand-navy hidden sm:flex items-center justify-center">
                                            <Calendar size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-brand-navy flex items-center gap-3">
                                                {appt.service?.name}
                                                {isAdmin && <span className="text-xs px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded-md border border-brand-gold/20 uppercase tracking-widest">Client</span>}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-4 font-bold text-sm text-brand-navy/60">
                                                <div className="flex items-center space-x-2">
                                                    <Clock size={16} className="text-brand-gold" />
                                                    <span>{new Date(appt.startDateTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                                    <span className="text-brand-navy/20">•</span>
                                                    <span>{new Date(appt.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                                {isAdmin && (
                                                    <div className="flex items-center space-x-2">
                                                        <User size={16} className="text-brand-gold" />
                                                        <span>{appt.customer?.name} ({appt.customer?.email})</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mt-8 lg:mt-0 p-4 lg:p-0 border-t lg:border-t-0 border-brand-navy/5">
                                        <span className={`px-6 py-2 rounded-full text-xs font-black border ring-4 ring-opacity-10 ${getStatusStyle(appt.status)}`}>
                                            {appt.status}
                                        </span>

                                        <div className="flex items-center space-x-2 bg-brand-navy/5 p-1 rounded-2xl">
                                            {isAdmin ? (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'PAID')}
                                                        className="p-2.5 rounded-xl hover:bg-white text-brand-gold transition-all"
                                                        title="Mark as Paid"
                                                    >
                                                        <CreditCard size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'COMPLETED')}
                                                        className="p-2.5 rounded-xl hover:bg-white text-brand-navy transition-all"
                                                        title="Mark as Completed"
                                                    >
                                                        <CheckCircle2 size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                                        className="p-2.5 rounded-xl hover:bg-white text-red-600 transition-all"
                                                        title="Cancel Booking"
                                                    >
                                                        <XCircle size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                appt.status !== 'CANCELLED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                                        className="px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white text-red-600 font-black text-xs uppercase tracking-widest transition-all"
                                                    >
                                                        Request Cancellation
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
