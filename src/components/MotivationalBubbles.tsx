import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getMessageBracket, getBubbleInterval } from '../data/ramadanMessages';

interface Bubble {
    id: number;
    message: string;
    x: number;
    y: number; // vertical position (percentage from bottom)
    size: 'sm' | 'md' | 'lg';
    side: 'left' | 'right';
}

interface MotivationalBubblesProps {
    totalMinutesLeft: number;
    countdownType: string;
}

let bubbleIdCounter = 0;

export default function MotivationalBubbles({ totalMinutesLeft, countdownType }: MotivationalBubblesProps) {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const usedMessagesRef = useRef<Set<string>>(new Set());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const isActive = countdownType === 'IFTAR';

    const dismissBubble = useCallback((id: number) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
    }, []);

    const spawnBubble = useCallback(() => {
        const messages = getMessageBracket(totalMinutesLeft);
        let msg: string;
        const unused = messages.filter(m => !usedMessagesRef.current.has(m));
        if (unused.length > 0) {
            msg = unused[Math.floor(Math.random() * unused.length)];
        } else {
            usedMessagesRef.current.clear();
            msg = messages[Math.floor(Math.random() * messages.length)];
        }
        usedMessagesRef.current.add(msg);

        const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
        const side = Math.random() > 0.5 ? 'right' : 'left';
        const newBubble: Bubble = {
            id: ++bubbleIdCounter,
            message: msg,
            x: side === 'left' ? (2 + Math.random() * 8) : (2 + Math.random() * 8),
            y: 3 + Math.random() * 35, // 3% - 38% from bottom (lower half only, avoids timer)
            size: sizes[Math.floor(Math.random() * sizes.length)],
            side,
        };

        setBubbles(prev => {
            const kept = prev.length >= 5 ? prev.slice(1) : prev;
            return [...kept, newBubble];
        });

        // Auto-dismiss after 20-30 seconds
        const autoTimeout = 20000 + Math.random() * 10000;
        setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
        }, autoTimeout);
    }, [totalMinutesLeft]);

    useEffect(() => {
        if (!isActive) {
            setBubbles([]);
            return;
        }

        spawnBubble();

        const interval = getBubbleInterval(totalMinutesLeft);
        intervalRef.current = setInterval(spawnBubble, interval);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, totalMinutesLeft, spawnBubble]);

    useEffect(() => {
        if (!isActive) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        const interval = getBubbleInterval(totalMinutesLeft);
        intervalRef.current = setInterval(spawnBubble, interval);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [
        totalMinutesLeft > 600 ? 'long' :
            totalMinutesLeft > 300 ? 'mid' :
                totalMinutesLeft > 60 ? 'almost' :
                    totalMinutesLeft > 30 ? 'soclose' :
                        totalMinutesLeft > 10 ? 'final1' :
                            totalMinutesLeft > 5 ? 'final2' : 'final3',
        isActive, spawnBubble
    ]);

    if (!isActive) return null;

    const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
        switch (size) {
            case 'sm': return { fontSize: 'clamp(0.55rem, 1.6vw, 0.7rem)', padding: '10px 14px', maxWidth: 'min(280px, 40vw)' };
            case 'md': return { fontSize: 'clamp(0.6rem, 1.8vw, 0.8rem)', padding: '12px 18px', maxWidth: 'min(320px, 45vw)' };
            case 'lg': return { fontSize: 'clamp(0.65rem, 2vw, 0.9rem)', padding: '14px 20px', maxWidth: 'min(380px, 50vw)' };
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 100,
                overflow: 'hidden',
            }}
        >
            <AnimatePresence>
                {bubbles.map(bubble => {
                    const sizeStyle = getSizeStyles(bubble.size);
                    const posStyle: React.CSSProperties = {
                        position: 'absolute',
                        bottom: `${bubble.y}%`,
                        ...(bubble.side === 'left'
                            ? { left: `${bubble.x}%` }
                            : { right: `${bubble.x}%` }),
                    };

                    return (
                        <motion.div
                            key={bubble.id}
                            initial={{
                                opacity: 0,
                                scale: 0.3,
                                y: 80,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -6, 0, -4, 0],
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.5,
                                y: -30,
                                transition: { duration: 0.3 },
                            }}
                            transition={{
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.5, type: 'spring', stiffness: 200 },
                                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            style={{
                                ...posStyle,
                                fontFamily: "'Press Start 2P', cursive",
                                ...sizeStyle,
                                background: 'linear-gradient(135deg, #0d0d0d 0%, #1a3a10 100%)',
                                border: '3px solid var(--gold)',
                                borderRadius: '14px',
                                color: 'var(--mc-beige)',
                                boxShadow: '0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15), 0 6px 16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
                                pointerEvents: 'auto',
                                cursor: 'pointer',
                                lineHeight: '1.6',
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                            }}
                            onClick={() => dismissBubble(bubble.id)}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(212,175,55,0.6), 0 0 50px rgba(212,175,55,0.2)' }}
                        >
                            {/* Close button */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                whileHover={{ opacity: 1, scale: 1.2 }}
                                style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: 'var(--mc-darker)',
                                    border: '2px solid var(--gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dismissBubble(bubble.id);
                                }}
                            >
                                <X size={10} className="text-gold" />
                            </motion.div>
                            {bubble.message}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
