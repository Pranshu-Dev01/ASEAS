"use client";
import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowUp,
    LifeBuoy,
    Handshake,
    Briefcase,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MaskContainer } from './svg-mask-effect';
import { RevealCardContainer, IdentityCardBody } from './animated-profile-card';

const data = {
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
        email: 'pranshu@aseas.ai',
        phone: '+91 7569764637',
        address: 'Jain University Global Campus, Kanakapura',
    },
    company: {
        name: 'ASEAS',
        description:
            'Empowering educators and students with AI-driven academic scoring and evaluation. We bridge the gap between traditional learning and modern technology.',
        logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop',
    },
    contactEmails: [
        { 
            label: 'Support', 
            email: 'anirudh@intelligrade.io', 
            icon: LifeBuoy,
            description: 'Expert technical assistance and account support, available 24/7 for our global users.'
        },
        { 
            label: 'Collaborations', 
            email: 'yogesh@intelligrade.io', 
            icon: Handshake,
            description: 'Explore partnership opportunities to innovate and scale together with ASEAS Inc.'
        },
        { 
            label: 'General Inquiries', 
            email: 'anirudh@intelligrade.io', 
            icon: Mail,
            description: 'For general questions about our products, services, or corporate information.'
        },
        { 
            label: 'Careers', 
            email: 'pranshu@intelligrade.io', 
            icon: Briefcase,
            description: 'Join our mission to shape the future of AI and academic excellence. Grow with us.'
        },
    ],
};


export default function Footer4Col() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const footerRef = useRef(null);

    return (
        <footer className="bg-black text-white w-full border-t border-zinc-800 relative z-50 overflow-hidden">
            <MaskContainer
                revealText={
                    <div className="mx-auto max-w-7xl px-8 md:px-12">
                        {/* Newsletter Section */}
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 w-full">
                            <div className="max-w-xl text-center lg:text-left">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white leading-tight">Stay ahead with <span className="text-[#00f2ff]">ASEAS Inc.</span></h2>
                                <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
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

                            <div className="relative w-full lg:w-[400px] h-[280px] hidden lg:block group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#00f2ff]/20 to-blue-500/20 rounded-[35px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                <img
                                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                                    alt="ASEAS Intelligence"
                                    className="relative w-full h-full object-cover rounded-[30px] shadow-2xl border border-white/5"
                                />
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 border-t border-zinc-900 pt-16">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#00f2ff]/10 rounded-xl border border-[#00f2ff]/20 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                                        <img src={data.company.logo} alt="logo" className="h-6 w-6 rounded-lg object-cover" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight text-white">{data.company.name} Inc.</span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                                    {data.company.description}
                                </p>
                                {/* Maps Integration */}
                                <div className="w-full h-40 rounded-2xl overflow-hidden border border-zinc-800/50 shadow-inner group relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.1505745616855!2d77.43807251045396!3d12.638125087595853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5ba23d54962f%3A0xfbeb4a664c58a94e!2sJain%20University%20Global%20campus%20Kanakapura!5e0!3m2!1sen!2sin!4v1775068713221!5m2!1sen!2sin" 
                                        className="w-full h-full transition-all duration-700 pointer-events-auto"
                                        style={{ border: 0 }} 
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
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
                    </div>
                }
                className="w-full h-full min-h-[500px] py-16"
            >
                <div className="w-full max-w-7xl px-8 md:px-12 flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight text-white mix-blend-difference">Connect with our Experts</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {data.contactEmails.map((item) => (
                            <RevealCardContainer
                                key={item.label}
                                className="h-[380px]"
                                accent={
                                  item.label === 'Support' ? '#e0f2fe' : 
                                  item.label === 'Collaborations' ? '#f0fdf4' : 
                                  item.label === 'General Inquiries' ? '#f5f3ff' : 
                                  '#fdf2f8'
                                }
                                textOnAccent="#0f172a"
                                mutedOnAccent="#475569"
                                base={
                                    <IdentityCardBody 
                                        fullName={item.label}
                                        place="ASEAS Inc."
                                        about={item.description}
                                        avatarUrl="" 
                                        avatarText={item.label[0]}
                                        scheme="plain" 
                                        displayAvatar={false} 
                                    />
                                }
                                overlay={
                                    <IdentityCardBody
                                        fullName={item.label}
                                        place={item.email}
                                        about={item.description}
                                        avatarUrl={`https://images.unsplash.com/photo-${
                                            item.label === 'Support' ? '1534528741775-53994a69daeb' : 
                                            item.label === 'Collaborations' ? '1507003211169-0a1dd7228f2d' : 
                                            item.label === 'General Inquiries' ? '1494790108377-be9c29b29330' : 
                                            '1500648767791-00dcc994a43e'
                                        }?q=80&w=200&h=200&auto=format&fit=crop`}
                                        avatarText={item.label[0]}
                                        socials={[
                                          {
                                            id: 'mail',
                                            url: `mailto:${item.email}`,
                                            label: 'Email',
                                            icon: <item.icon className="h-5 w-5" />
                                          }
                                        ]}
                                        scheme="accented"
                                        displayAvatar={true}
                                        cardCss={{ backgroundColor: "var(--accent-color)" }}
                                    />
                                }
                            />
                        ))}
                    </div>
                </div>
            </MaskContainer>

            {/* Footer Bottom (Outside Mask) */}
            <div className="mx-auto max-w-7xl px-8 md:px-12 pt-8 pb-10 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 items-center gap-6">
                {/* Legal Links (Left) */}
                <div className="flex gap-6 justify-center md:justify-start">
                    <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms & policies</Link>
                    <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy policy</Link>
                </div>

                {/* Copyright (Centered) */}
                <p className="text-sm text-gray-600 italic text-center order-first md:order-none">© 2025 {data.company.name} Inc. All Rights Reserved.</p>

                {/* Back to Top (Right) */}
                <div className="flex justify-center md:justify-end">
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
