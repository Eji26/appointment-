import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Hero />

            {/* Social Proof Placeholder */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Trusted by modern businesses worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                        <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse" />
                        <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse" />
                        <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse" />
                        <div className="h-8 w-32 bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Modern CTA */}
            <section className="px-4 py-20 pb-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">Ready to transform your business?</h2>
                    <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto relative z-10">
                        Join 5,000+ businesses that have automated their scheduling and saved thousands of hours.
                    </p>
                    <button className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-xl relative z-10">
                        Start My 14-Day Trial
                    </button>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
