"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TIPS = [
    "Searing the perfect steak...",
    "Garnishing your experience...",
    "Waking up the sous-chef...",
    "Matching flavors and ratings...",
    "Plating your top choices...",
];

export function ProgressLoader() {
    const [tipIdx, setTipIdx] = useState(0);

    useEffect(() => {
        const tipTimer = setInterval(() => {
            setTipIdx((prev) => (prev + 1) % TIPS.length);
        }, 1800);
        return () => clearInterval(tipTimer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-neutral-950/60 backdrop-blur-md"
        >
            <div className="relative flex flex-col items-center">
                {/* --- Animated Rings --- */}
                <div className="relative flex items-center justify-center mb-8">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute w-24 h-24 rounded-full border border-orange-500"
                    />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="w-16 h-16 rounded-full border-t-2 border-r-2 border-orange-500 border-b-2 border-l-2 border-b-transparent border-l-transparent"
                    />
                    <div className="absolute font-serif italic text-orange-600 dark:text-orange-400 text-lg">
                        C
                    </div>
                </div>

                {/* --- Text Content --- */}
                <div className="text-center space-y-2">
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="block text-[10px] tracking-[0.4em] uppercase text-neutral-500 dark:text-neutral-400 font-light"
                    >
                        Inquiry Received
                    </motion.span>

                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipIdx}
                                initial={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                    y: 5,
                                }}
                                animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    filter: "blur(4px)",
                                    y: -5,
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-lg font-serif text-neutral-800 dark:text-neutral-100"
                            >
                                {TIPS[tipIdx]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex gap-1.5 mt-6">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-1 h-1 bg-orange-500 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
