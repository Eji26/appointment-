import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/5 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-brand-navy p-1.5 rounded-lg text-brand-gold shadow-lg">
                                <Calendar size={20} />
                            </div>
                            <span className="text-xl font-black tracking-tight text-brand-navy italic">AppointMe</span>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                        <Link to="/booking" className="text-brand-navy/60 hover:text-brand-gold px-1 pt-1 text-sm font-bold transition-colors uppercase tracking-widest">Book Now</Link>
                        {user?.role === 'ADMIN' && (
                            <Link to="/admin" className="text-brand-navy/60 hover:text-brand-gold px-1 pt-1 text-sm font-bold transition-colors uppercase tracking-widest">Admin</Link>
                        )}
                        {user && (
                            <Link to="/appointments" className="text-brand-navy/60 hover:text-brand-gold px-1 pt-1 text-sm font-bold transition-colors uppercase tracking-widest">My Bookings</Link>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-brand-navy">
                                    <UserIcon size={18} className="text-brand-gold" />
                                    <span className="text-sm font-bold">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-brand-navy text-brand-gold hover:bg-brand-navy/90 p-2 rounded-xl transition-all shadow-md"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="text-brand-navy hover:text-brand-gold text-sm font-bold px-4 py-2 uppercase tracking-widest">Sign In</Link>
                                <Link to="/register" className="bg-brand-navy text-brand-gold hover:bg-brand-navy/90 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-navy/10 uppercase tracking-widest">Join Now</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
