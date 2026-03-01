import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Star, Utensils, Coffee } from 'lucide-react';
import { sehriMessages, iftarMessages } from '../data/ramadanMessages';

interface SehriIftarOverlayProps {
    type: 'sehri' | 'iftar';
    onDismiss: () => void;
}

export default function SehriIftarOverlay({ type, onDismiss }: SehriIftarOverlayProps) {
    const messages = type === 'sehri' ? sehriMessages : iftarMessages;
    const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

    // Rotate messages every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMsgIdx(prev => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [messages.length]);

    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            size: Math.random() * 8 + 4,
        }));
        setParticles(newParticles);
    }, []);

    const isSehri = type === 'sehri';
    const title = isSehri ? 'SUHOOR TIME' : 'IFTAR TIME';
    const subtitle = isSehri
        ? 'Dawn is here — fuel up for the day!'
        : 'The wait is over — break your fast!';
    const Icon = isSehri ? Coffee : Utensils;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sehri-iftar-overlay"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: isSehri
                    ? 'radial-gradient(ellipse at center, rgba(45,80,22,0.95) 0%, rgba(13,13,13,0.98) 70%)'
                    : 'radial-gradient(ellipse at center, rgba(100,60,10,0.95) 0%, rgba(13,13,13,0.98) 70%)',
                backdropFilter: 'blur(10px)',
                padding: '1rem',
                overflow: 'hidden',
            }}
        >
            {/* Floating particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        bottom: '-20px',
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        background: isSehri
                            ? 'radial-gradient(circle, rgba(107,159,127,0.8), rgba(212,175,55,0.4))'
                            : 'radial-gradient(circle, rgba(244,208,63,0.8), rgba(212,175,55,0.4))',
                    }}
                    animate={{
                        y: [0, -window.innerHeight - 50],
                        x: [0, Math.sin(p.id) * 40, 0],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeOut',
                    }}
                />
            ))}

            {/* Main Content */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 80, delay: 0.2 }}
                className="text-center relative z-10"
                style={{ maxWidth: '90vw' }}
            >
                {/* Icon */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-4 md:mb-6"
                >
                    <div
                        className="mx-auto flex items-center justify-center rounded-full"
                        style={{
                            width: 'clamp(80px, 20vw, 120px)',
                            height: 'clamp(80px, 20vw, 120px)',
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(74,124,89,0.3))',
                            border: '3px solid var(--gold)',
                            boxShadow: '0 0 40px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.2)',
                        }}
                    >
                        <Icon style={{ width: 'clamp(40px, 10vw, 60px)', height: 'clamp(40px, 10vw, 60px)' }} className="text-gold" />
                    </div>
                </motion.div>

                {/* Stars around title */}
                <div className="flex items-center justify-center gap-2 md:gap-4 mb-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                        <Star className="text-gold" style={{ width: 'clamp(16px, 4vw, 28px)', height: 'clamp(16px, 4vw, 28px)' }} />
                    </motion.div>
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                        <Moon className="text-gold-light" style={{ width: 'clamp(20px, 5vw, 32px)', height: 'clamp(20px, 5vw, 32px)' }} />
                    </motion.div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                        <Star className="text-gold" style={{ width: 'clamp(16px, 4vw, 28px)', height: 'clamp(16px, 4vw, 28px)' }} />
                    </motion.div>
                </div>

                {/* Title */}
                <motion.h1
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="minecraft-text gradient-text"
                    style={{
                        fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="islamic-text text-gold-light mb-6 md:mb-8"
                    style={{ fontSize: 'clamp(0.875rem, 3vw, 1.5rem)' }}
                >
                    {subtitle}
                </motion.p>

                {/* Rotating messages */}
                <div
                    className="islamic-border p-4 md:p-6 mx-auto mb-6 md:mb-8"
                    style={{ maxWidth: '600px', minHeight: 'clamp(60px, 15vw, 100px)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentMsgIdx}
                            initial={{ opacity: 0, y: 30, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="islamic-text text-mc-beige"
                            style={{ fontSize: 'clamp(0.875rem, 3vw, 1.25rem)' }}
                        >
                            {messages[currentMsgIdx]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Dismiss button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onDismiss}
                    className="minecraft-button"
                    style={{
                        fontSize: 'clamp(0.5rem, 2vw, 0.75rem)',
                        padding: 'clamp(8px, 2vw, 16px) clamp(20px, 5vw, 40px)',
                    }}
                >
                    ✕ DISMISS
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
