import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
    Calendar,
    Clock,
    PlusCircle,
    TrendingUp,
    Users,
    Settings,
    ArrowRight,
    Briefcase
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ appointments: [], services: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [apptRes, svcRes] = await Promise.all([
                api.get('/appointments'),
                api.get('/services')
            ]);
            setStats({
                appointments: apptRes.data.data,
                services: svcRes.data.data
            });
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const nextAppointment = stats.appointments
        .filter(a => new Date(a.startDateTime) > new Date() && a.status === 'CONFIRMED')
        .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))[0];

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-xl shadow-indigo-100/20">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
                    <Icon className={color.replace('bg-', 'text-')} size={24} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-2xl font-black text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    const ActionCard = ({ title, desc, icon: Icon, to, color }) => (
        <Link to={to} className="group block h-full">
            <div className="bg-white hover:bg-indigo-600 border border-gray-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-500 h-full flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-3xl ${color} bg-opacity-10 group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors`}>
                    <Icon className={`${color.replace('bg-', 'text-')} group-hover:text-white`} size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2">{title}</h3>
                <p className="text-gray-500 group-hover:text-indigo-100 text-sm leading-relaxed">{desc}</p>
            </div>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-black text-gray-900 tracking-tight"
                        >
                            System <span className="text-indigo-600">Overview</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-2 font-medium">Welcome back, {user.name}. Here's what's happening.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/booking')} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center space-x-2">
                            <PlusCircle size={20} />
                            <span>Quick Book</span>
                        </button>
                    </div>
                </header>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        icon={Calendar}
                        label="Reserved Slots"
                        value={stats.appointments.length}
                        color="bg-brand-navy"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Confimed Preview"
                        value={stats.appointments.filter(a => a.status === 'CONFIRMED').length}
                        color="bg-brand-gold"
                    />
                    {user.role === 'ADMIN' ? (
                        <>
                            <StatCard
                                icon={Briefcase}
                                label="Curated Services"
                                value={stats.services.length}
                                color="bg-brand-gold"
                            />
                            <StatCard
                                icon={Users}
                                label="Elite Clients"
                                value={[...new Set(stats.appointments.map(a => a.customerId))].length}
                                color="bg-brand-navy"
                            />
                        </>
                    ) : (
                        <>
                            <StatCard
                                icon={Clock}
                                label="Total Session Time"
                                value={stats.appointments.reduce((acc, a) => acc + (a.service?.duration || 0), 0) / 60 + 'h'}
                                color="bg-brand-navy"
                            />
                            <StatCard
                                icon={Settings}
                                label="Prestige Status"
                                value="Gold"
                                color="bg-brand-gold"
                            />
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Next Event / Main Focus */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden bg-brand-navy rounded-[3rem] p-10 md:p-14 text-white shadow-2xl shadow-brand-navy/20 border border-brand-gold/20"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold opacity-80 mb-6 flex items-center space-x-2 text-brand-gold">
                                    <Clock size={20} />
                                    <span>Your Gold Standard Agenda</span>
                                </h2>

                                {nextAppointment ? (
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                        <div>
                                            <p className="text-5xl md:text-7xl font-black mb-2 text-white leading-tight">{nextAppointment.service?.name}</p>
                                            <p className="text-brand-gold text-xl font-bold tracking-widest uppercase">
                                                {new Date(nextAppointment.startDateTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="bg-brand-gold/10 backdrop-blur-md px-10 py-8 rounded-[2.5rem] border border-brand-gold/20">
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold opacity-80 mb-2">Reserved for</p>
                                            <p className="text-4xl font-black text-white">
                                                {new Date(nextAppointment.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-10 text-center">
                                        <p className="text-3xl font-bold mb-4">No upcoming bookings</p>
                                        <button onClick={() => navigate('/booking')} className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold">Book Something Now</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Recent Activity Mini List */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold">Recent History</h3>
                                <Link to="/appointments" className="text-indigo-600 font-bold flex items-center space-x-1 hover:underline">
                                    <span>View All</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {stats.appointments.slice(0, 3).map(appt => (
                                    <div key={appt.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{appt.service?.name}</p>
                                                <p className="text-sm text-gray-500">{new Date(appt.startDateTime).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black ${appt.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Quick Actions */}
                    <div className="grid grid-cols-1 gap-6">
                        <ActionCard
                            title="Secure New Slot"
                            desc="Exclusively access our curated calendar and reserve your time."
                            icon={Calendar}
                            to="/booking"
                            color="bg-brand-gold"
                        />
                        {user.role === 'ADMIN' ? (
                            <ActionCard
                                title="Elite Management"
                                desc="Refine your service offerings and business parameters."
                                icon={Briefcase}
                                to="/admin"
                                color="bg-brand-navy"
                            />
                        ) : (
                            <ActionCard
                                title="My Reservations"
                                desc="Review your confirmed elite bookings and status."
                                icon={Clock}
                                to="/appointments"
                                color="bg-brand-navy"
                            />
                        )}
                        <ActionCard
                            title="Account Settings"
                            desc="Update your profile, notifications and preferences."
                            icon={Settings}
                            to="/profile"
                            color="bg-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
