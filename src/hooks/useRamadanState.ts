import { useState, useEffect, useRef, useCallback } from 'react';
import { ramadanTimings } from '../data/ramadanTimings';

// Parse date string like "19 Feb" or "01 Mar" into a Date for 2026
function parseRamadanDate(dateStr: string): Date {
    const months: Record<string, number> = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3 };
    const parts = dateStr.trim().split(' ');
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]] ?? 1;
    return new Date(2026, month, day);
}

function getTodayIndex(): number {
    const now = new Date();
    const todayMonth = now.getMonth();
    for (let i = 0; i < ramadanTimings.length; i++) {
        const d = parseRamadanDate(ramadanTimings[i].date);
        if (d.getDate() === now.getDate() && d.getMonth() === todayMonth) {
            return i;
        }
    }
    return 0;
}

export interface RamadanState {
    todayIndex: number;
    countdown: { type: string; hours: number; minutes: number; seconds: number; totalMinutes: number };
    isSehriActive: boolean;
    isIftarActive: boolean;
    activeMinutesElapsed: number;
}

const ACTIVE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export function useRamadanState(): RamadanState {
    const todayIndex = getTodayIndex();
    const [countdown, setCountdown] = useState({ type: '', hours: 0, minutes: 0, seconds: 0, totalMinutes: 0 });
    const [isSehriActive, setIsSehriActive] = useState(false);
    const [isIftarActive, setIsIftarActive] = useState(false);
    const [activeMinutesElapsed, setActiveMinutesElapsed] = useState(0);

    const azaanRef = useRef<HTMLAudioElement | null>(null);
    const sehriPlayedRef = useRef(false);
    const iftarPlayedRef = useRef(false);
    const sehriActiveStartRef = useRef<number | null>(null);
    const iftarActiveStartRef = useRef<number | null>(null);

    const playAzaan = useCallback(() => {
        try {
            if (!azaanRef.current) {
                azaanRef.current = new Audio('/azaan.mp3');
                azaanRef.current.volume = 0.7;
            }
            azaanRef.current.currentTime = 0;
            azaanRef.current.play().catch(() => {
                // Autoplay blocked — ignore silently
            });
        } catch {
            // Audio not available
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const today = ramadanTimings[todayIndex];

            const [sehrHour, sehrMin] = today.sehr.split(':').map(Number);
            const [iftarHourRaw, iftarMin] = today.iftar.split(':').map(Number);
            const iftarHour = iftarHourRaw + 12; // PM

            const sehrTime = new Date(now);
            sehrTime.setHours(sehrHour, sehrMin, 0, 0);

            const iftarTime = new Date(now);
            iftarTime.setHours(iftarHour, iftarMin, 0, 0);

            const sehrEndTime = new Date(sehrTime.getTime() + ACTIVE_DURATION_MS);
            const iftarEndTime = new Date(iftarTime.getTime() + ACTIVE_DURATION_MS);

            // Sehri active mode (5 min window after sehri time)
            if (now >= sehrTime && now <= sehrEndTime) {
                if (!sehriPlayedRef.current) {
                    sehriPlayedRef.current = true;
                    sehriActiveStartRef.current = sehrTime.getTime();
                    playAzaan();
                }
                setIsSehriActive(true);
                setActiveMinutesElapsed(Math.floor((now.getTime() - sehrTime.getTime()) / 60000));
            } else {
                setIsSehriActive(false);
            }

            // Iftar active mode (5 min window after iftar time)
            if (now >= iftarTime && now <= iftarEndTime) {
                if (!iftarPlayedRef.current) {
                    iftarPlayedRef.current = true;
                    iftarActiveStartRef.current = iftarTime.getTime();
                    playAzaan();
                }
                setIsIftarActive(true);
                setActiveMinutesElapsed(Math.floor((now.getTime() - iftarTime.getTime()) / 60000));
            } else {
                setIsIftarActive(false);
            }

            // Countdown logic
            let target: Date, type: string;
            if (now < sehrTime) {
                target = sehrTime;
                type = 'SEHRI';
            } else if (now < iftarTime) {
                target = iftarTime;
                type = 'IFTAR';
            } else {
                // After iftar, count down to next day's sehri
                const nextIdx = Math.min(todayIndex + 1, ramadanTimings.length - 1);
                const nextDay = ramadanTimings[nextIdx];
                const [nextSehrHour, nextSehrMin] = nextDay.sehr.split(':').map(Number);
                target = new Date(now);
                target.setDate(target.getDate() + 1);
                target.setHours(nextSehrHour, nextSehrMin, 0, 0);
                type = 'SEHRI';
            }

            const diff = target.getTime() - now.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const totalMinutes = Math.floor(diff / (1000 * 60));

            setCountdown({ type, hours, minutes, seconds, totalMinutes });
        }, 1000);

        return () => clearInterval(timer);
    }, [todayIndex, playAzaan]);

    return { todayIndex, countdown, isSehriActive, isIftarActive, activeMinutesElapsed };
}
