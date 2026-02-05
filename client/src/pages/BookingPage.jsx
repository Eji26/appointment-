import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Calendar as CalIcon, Clock, CheckCircle2, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [booked, setBooked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [svcRes, apptRes] = await Promise.all([
                api.get('/services'),
                api.get('/appointments')
            ]);
            setServices(svcRes.data.data);
            setAppointments(apptRes.data.data.map(a => ({
                title: 'Reserved',
                start: a.startDateTime,
                end: a.endDateTime,
                color: '#001F3F',
                display: 'background',
                opacity: 0.1
            })));
        } catch (err) {
            console.error('Error fetching booking data:', err);
        }
    };

    const handleDateSelect = async (selectInfo) => {
        if (!selectedService) {
            alert('Please select an exclusive service first.');
            return;
        }

        if (window.confirm(`Confirm your reservation for ${selectedService.name} at ${new Date(selectInfo.startStr).toLocaleString()}?`)) {
            try {
                await api.post('/appointments/book', {
                    serviceId: selectedService.id,
                    startDateTime: selectInfo.startStr
                });
                setBooked(true);
                fetchData();
            } catch (err) {
                alert(err.response?.data?.message || 'Reservation failed. Slot may no longer be available.');
            }
        }
    };

    if (booked) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-brand-cream/30 p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-brand-navy/10 text-center max-w-lg border border-brand-gold/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-brand-navy text-brand-gold rounded-[2rem] mb-8 shadow-xl">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-brand-navy mb-4">Reservation Confirmed</h2>
                    <p className="text-brand-navy/60 mb-10 text-lg font-medium leading-relaxed">
                        Your exquisite session has been secured in our private calendar.
                        A confirmation detail has been dispatched to your account.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/appointments')}
                            className="bg-brand-navy text-brand-gold px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                            View My Agenda
                        </button>
                        <button
                            onClick={() => setBooked(false)}
                            className="bg-brand-gold/10 text-brand-gold px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-gold/20 transition-all underline decoration-brand-gold/30 underline-offset-4"
                        >
                            Book Another
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream/30 p-6 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <motion.button
                            onClick={() => navigate('/')}
                            className="flex items-center space-x-2 text-brand-navy/50 hover:text-brand-navy font-bold mb-4 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Exit Private Booking</span>
                        </motion.button>
                        <h1 className="text-4xl font-black text-brand-navy tracking-tight uppercase">
                            Secure your <span className="text-brand-gold italic">Elite Slot</span>
                        </h1>
                        <p className="text-brand-navy/60 mt-2 font-medium italic">Select your preferred service and choose a time in our live curated calendar.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    <div className="lg:col-span-1">
                        <h2 className="text-xs font-black text-brand-navy/30 uppercase tracking-[0.2em] mb-6">Available Curations</h2>
                        <div className="space-y-4">
                            {services.map(svc => (
                                <motion.div
                                    key={svc.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedService(svc)}
                                    className={`p-6 rounded-[2.5rem] cursor-pointer border-2 transition-all duration-300 relative overflow-hidden ${selectedService?.id === svc.id
                                            ? 'border-brand-gold bg-brand-navy text-white shadow-2xl shadow-brand-navy/20'
                                            : 'border-white bg-white/50 backdrop-blur-md hover:border-brand-gold/30 shadow-sm'
                                        }`}
                                >
                                    {selectedService?.id === svc.id && (
                                        <div className="absolute top-3 right-5 text-brand-gold">
                                            <Star size={18} fill="currentColor" />
                                        </div>
                                    )}
                                    <h4 className={`text-xl font-black ${selectedService?.id === svc.id ? 'text-brand-gold' : 'text-brand-navy'}`}>{svc.name}</h4>
                                    <div className="flex items-center space-x-4 mt-4 font-bold text-xs uppercase tracking-widest opacity-60">
                                        <div className="flex items-center space-x-1.5">
                                            <Clock size={14} />
                                            <span>{svc.duration}m</span>
                                        </div>
                                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                                        <span className="text-brand-gold">${svc.price}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white shadow-2xl shadow-brand-navy/5 calendar-luxury-wrap overflow-hidden">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'timeGridWeek,timeGridDay'
                                }}
                                slotMinTime="08:00:00"
                                slotMaxTime="20:00:00"
                                selectable={true}
                                selectMirror={true}
                                dayMaxEvents={true}
                                weekends={true}
                                events={appointments}
                                select={handleDateSelect}
                                height="auto"
                                allDaySlot={false}
                                slotDuration="00:30:00"
                                firstDay={1}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style sx>{`
                .fc { --fc-border-color: rgba(0, 31, 63, 0.05); --fc-today-bg-color: rgba(212, 175, 55, 0.05); }
                .fc-toolbar-title { font-weight: 900 !important; font-size: 1.5rem !important; color: #001F3F !important; text-transform: uppercase; letter-spacing: -0.025em; }
                .fc-button-primary { background-color: #001F3F !important; border-color: #001F3F !important; font-weight: 800 !important; text-transform: uppercase; font-size: 0.75rem !important; letter-spacing: 0.1em !important; border-radius: 1rem !important; padding: 0.6rem 1.2rem !important; }
                .fc-button-primary:hover { background-color: #D4AF37 !important; color: #001F3F !important; }
                .fc-button-active { background-color: #D4AF37 !important; border-color: #D4AF37 !important; color: #001F3F !important; }
                .fc-col-header-cell { padding: 1rem 0 !important; background: transparent !important; }
                .fc-col-header-cell-cushion { color: #001F3F !important; font-weight: 900 !important; text-transform: uppercase; font-size: 0.7rem !important; letter-spacing: 0.1em !important; }
                .fc-timegrid-slot-label-cushion { color: #001F3F !important; font-weight: 700 !important; font-size: 0.7rem !important; opacity: 0.4; }
                .fc-v-event { background-color: #001F3F !important; border: none !important; border-radius: 0.5rem !important; }
            `}</style>
        </div>
    );
};

export default BookingPage;
