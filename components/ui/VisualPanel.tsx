"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CUISINES, DISH_ICONS } from "@/lib/constants";

interface VisualPanelProps {
    activeDot: number;
}

export function VisualPanel({ activeDot }: VisualPanelProps) {
    return (
        <div className="relative hidden md:flex flex-col justify-end p-10 bg-[#1a0f00] overflow-hidden">
            {/* Background Glow */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 30% 20%, #4d2600 0%, #1a0f00 70%)",
                }}
            />

            {/* Animated Icon Carousel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 flex flex-col items-center gap-6 z-10">
                <div className="relative">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-32 h-32 rounded-full absolute -inset-1 opacity-20 border-2 border-dashed border-orange-400"
                    />
                    <div className="w-28 h-28 rounded-full flex items-center justify-center bg-[#2d1800] border-4 border-[#5a3010] shadow-2xl relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDot}
                                initial={{ scale: 0, rotate: -10, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                className="text-5xl"
                            >
                                {DISH_ICONS[activeDot]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex gap-2">
                    {CUISINES.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                i === activeDot
                                    ? "bg-orange-400 scale-125"
                                    : "bg-orange-900"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10">
                <span className="inline-block text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-md mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    Chef&apos;s Table
                </span>
                <h2 className="text-3xl font-serif font-semibold text-[#f5ece0] leading-tight mb-3">
                    Curate your <br /> perfect meal
                </h2>
                <p className="text-sm text-[#f5ece0]/50 max-w-[240px]">
                    Professional mastery, served at your home.
                </p>
            </div>
        </div>
    );
}
