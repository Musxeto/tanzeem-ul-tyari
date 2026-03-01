import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BigCountdownOverlayProps {
    seconds: number;
    type: 'SEHRI' | 'IFTAR';
}

export default function BigCountdownOverlay({ seconds, type }: BigCountdownOverlayProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Play timer.mp3 when overlay first appears, stop when it disappears
    useEffect(() => {
        try {
            audioRef.current = new Audio('/timer.mp3');
            audioRef.current.play().catch(() => { });
        } catch { /* no audio */ }

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []); // empty deps — play on mount, stop on unmount

    if (seconds <= 0 || seconds > 10) {
        // Stop audio when overlay hides
        audioRef.current?.pause();
        return null;
    }

    const isCritical = seconds <= 3;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 overflow-hidden pointer-events-none"
            style={{ backdropFilter: 'blur(6px)' }}>

            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />

            {/* Glow pulse behind number */}
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full"
                style={{ background: isCritical ? 'radial-gradient(circle, rgba(220,50,50,0.4), transparent 70%)' : 'radial-gradient(circle, rgba(212,175,55,0.4), transparent 70%)' }}
            />

            <div className="relative flex flex-col items-center gap-4 sm:gap-8">
                {/* Label */}
                <p className="minecraft-text text-gold/70 text-[9px] sm:text-xs tracking-[0.3em] uppercase">
                    SYSTEM_CRITICAL :: {type}_APPROACHING
                </p>

                {/* The big number — smooth pop-in each second */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={seconds}
                        initial={{ opacity: 0, scale: 0.6, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.3, y: -30 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Number */}
                        <span
                            className="minecraft-text leading-none font-bold"
                            style={{
                                fontSize: 'clamp(8rem, 30vw, 20rem)',
                                color: isCritical ? '#ff4444' : 'var(--gold)',
                                textShadow: isCritical
                                    ? '0 0 40px rgba(255,68,68,0.8), 0 0 80px rgba(255,68,68,0.4)'
                                    : '0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4)',
                            }}
                        >
                            {seconds}
                        </span>
                    </motion.div>
                </AnimatePresence>

                {/* Subtitle */}
                <p className="minecraft-text text-base sm:text-xl md:text-2xl uppercase tracking-widest"
                    style={{ color: isCritical ? '#ff8888' : '#c5a028' }}>
                    {isCritical ? '!!! LOCK IN !!!' : 'GET READY'}
                </p>

                {/* Progress dots */}
                <div className="flex gap-2 sm:gap-3">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: 10 - i <= seconds ? 1 : 0.15 }}
                            transition={{ duration: 0.2 }}
                            className="h-2 sm:h-3 w-5 sm:w-8"
                            style={{
                                background: 10 - i <= seconds ? (isCritical ? '#ff4444' : 'var(--gold)') : 'transparent',
                                border: `2px solid ${10 - i <= seconds ? (isCritical ? '#ff4444' : 'var(--gold)') : 'rgba(212,175,55,0.3)'}`,
                                boxShadow: 10 - i <= seconds ? `0 0 8px ${isCritical ? 'rgba(255,68,68,0.6)' : 'rgba(212,175,55,0.6)'}` : 'none',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
