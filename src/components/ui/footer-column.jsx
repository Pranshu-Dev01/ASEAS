"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
    Dribbble,
    Facebook,
    Github,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    ArrowUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const data = {
    facebookLink: 'https://facebook.com/aseas',
    instaLink: 'https://instagram.com/aseas',
    twitterLink: 'https://twitter.com/aseas',
    githubLink: 'https://github.com/aseas',
    dribbbleLink: 'https://dribbble.com/aseas',
    services: [
        { text: 'Universities', href: '/universities' },
        { text: 'Schools', href: '/schools' },
        { text: 'Colleges', href: '/colleges' },
        { text: 'Coaching Institutes', href: '/coaching-institutes' },
    ],
    about: [
        { text: 'Company History', href: '/company-history' },
        { text: 'Meet the Team', href: '/meet-the-team' },
        { text: 'Employee Handbook', href: '/employee-handbook' },
        { text: 'Careers', href: '/careers' },
    ],
    help: [
        { text: 'FAQs', href: '/faqs' },
        { text: 'Support', href: '/support' },
        { text: 'Live Chat', href: '/live-chat', hasIndicator: true },
    ],
    contact: {
        email: 'contact@aseas.ai',
        phone: '+91 8637373116',
        address: 'Bhubaneswar, Odisha, India',
    },
    company: {
        name: 'ASEAS',
        description:
            'Empowering educators and students with AI-driven academic scoring and evaluation. We bridge the gap between traditional learning and modern technology.',
        logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop',
    },
};

const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: data.instaLink },
    { icon: Twitter, label: 'Twitter', href: data.twitterLink },
    { icon: Github, label: 'GitHub', href: data.githubLink },
    { icon: Facebook, label: 'Facebook', href: data.facebookLink },
];

export default function Footer4Col() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const footerRef = useRef(null);


    return (
        <footer className="bg-black text-white w-full border-t border-zinc-800 relative z-50">
            <div className="mx-auto max-w-[1800px] px-8 md:px-16 lg:px-24 pt-24 pb-20">

                {/* Newsletter Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32 w-full">
                    <div className="max-w-2xl text-center lg:text-left">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">Stay ahead with <span className="text-[#00f2ff]">ASEAS Inc.</span></h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                            Join thousands of professionals who trust ASEAS Inc. for innovative business and academic solutions.
                        </p>
                        {isSubscribed ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl max-w-md"
                            >
                                <div className="flex items-center gap-3 mb-3 text-emerald-400">
                                    <span className="material-symbols-outlined font-bold">check_circle</span>
                                    <h4 className="text-xl font-bold">Subscription Successful!</h4>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic">
                                    “Thank you for your support! From now on, you will be among the first members
                                    to receive the latest updates about our products and be among the first to
                                    experience our new releases.”
                                </p>
                            </motion.div>
                        ) : (
                            <form
                                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (email) setIsSubscribed(true);
                                }}
                            >
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00f2ff]/50 transition-all backdrop-blur-sm shadow-inner"
                                />
                                <button type="submit" className="bg-white text-black font-bold px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-95 whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="relative w-full lg:w-[480px] h-[320px] hidden lg:block group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#00f2ff]/20 to-blue-500/20 rounded-[45px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                            alt="ASEAS Intelligence"
                            className="relative w-full h-full object-cover rounded-[40px] shadow-2xl border border-white/5"
                        />
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 border-t border-zinc-900 pt-20">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-[#00f2ff]/10 rounded-xl border border-[#00f2ff]/20 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                                <img src={data.company.logo} alt="logo" className="h-8 w-8 rounded-lg object-cover" />
                            </div>
                            <span className="text-3xl font-bold tracking-tight text-white">{data.company.name} Inc.</span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-xs">
                            {data.company.description}
                        </p>
                        <div className="flex gap-6">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <Link key={label} href={href} className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                                    <Icon className="size-6" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
                        <div>
                            <p className="text-lg font-bold text-white mb-8 tracking-wide">Solutions</p>
                            <ul className="space-y-4">
                                {data.services.map((link) => (
                                    <li key={link.text}><Link href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.text}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white mb-8 tracking-wide">Resources</p>
                            <ul className="space-y-4">
                                {data.help.map((link) => (
                                    <li key={link.text}>
                                        <Link href={link.href} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                            {link.text}
                                            {link.hasIndicator && (
                                                <span className="relative flex size-2">
                                                    <span className="bg-emerald-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                                                    <span className="bg-emerald-500 relative inline-flex size-2 rounded-full"></span>
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white mb-8 tracking-wide">Company</p>
                            <ul className="space-y-4">
                                {data.about.map((link) => (
                                    <li key={link.text}><Link href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.text}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="flex gap-6 mb-4 md:mb-0">
                            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms & policies</Link>
                            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy policy</Link>
                        </div>
                        <p className="text-sm text-gray-600 italic">© 2025 {data.company.name} Inc. All Rights Reserved.</p>
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 group text-sm font-bold uppercase tracking-widest text-[#00f2ff] hover:brightness-125 transition-all"
                    >
                        BACK TO TOP <ArrowUp className="size-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
