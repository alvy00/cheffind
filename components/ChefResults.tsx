/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Chef } from "@/lib/types";
import { motion } from "framer-motion";
import { Star, Clock, Banknote, Utensils, Check } from "lucide-react";

export default function ChefResults({
    data,
    onBack,
}: {
    data: Chef[];
    onBack: () => void;
}) {
    const [bookedChefId, setBookedChefId] = useState<string | number | null>(
        null,
    );

    const handleBook = (chefId: string | number) => {
        setBookedChefId(chefId);
        console.log(`Chef ${chefId} booked!`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-center md:mt-2">
                {data.map((chef, index) => {
                    const isRecommended = index === 1;
                    const isBooked = bookedChefId === chef.id;
                    const isAnyChefBooked = bookedChefId !== null;
                    const isDisabled = isAnyChefBooked && !isBooked;

                    return (
                        <motion.div
                            key={chef.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: isDisabled ? 0.5 : 1,
                                scale: isBooked
                                    ? 1.05
                                    : isRecommended
                                      ? 1.1
                                      : 0.95,
                                y: 0,
                            }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 ${
                                isBooked
                                    ? "border-green-500 bg-neutral-800 shadow-[0_0_30px_rgba(34,197,94,0.2)] z-30"
                                    : isRecommended
                                      ? "bg-neutral-800 border-orange-500/50 shadow-[0_0_30px_rgba(251,146,60,0.15)] z-20"
                                      : "bg-neutral-900/50 border-neutral-800 z-10"
                            }`}
                        >
                            {isRecommended && !isBooked && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                                    Best Value
                                </span>
                            )}

                            {isBooked && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full flex items-center gap-1">
                                    <Check size={10} /> Confirmed
                                </span>
                            )}

                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-xl font-serif font-bold text-[#f5ece0]">
                                        {chef.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-orange-400 text-sm font-bold">
                                        <Star size={14} fill="currentColor" />
                                        {chef.rating}
                                    </div>
                                </div>
                                <p className="text-orange-400/80 text-xs font-medium uppercase tracking-wider">
                                    {chef.cuisineSpeciality} Specialist
                                </p>
                            </div>

                            <div className="space-y-3 mb-6 text-sm text-[#f5ece0]/70">
                                <div className="flex items-center gap-3">
                                    <Clock
                                        size={16}
                                        className="text-orange-400/50"
                                    />
                                    <span>{chef.experience} Experience</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Utensils
                                        size={16}
                                        className="text-orange-400/50"
                                    />
                                    <span>{chef.speciality}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Banknote
                                        size={16}
                                        className="text-orange-400/50"
                                    />
                                    <span className="text-[#f5ece0] font-semibold">
                                        ৳{chef.pricePerSession.toLocaleString()}{" "}
                                        / session
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-[#f5ece0]/10">
                                <p className="text-xs italic leading-relaxed text-[#f5ece0]/50">
                                    &ldquo;{chef.opinion}&rdquo;
                                </p>
                            </div>

                            <button
                                onClick={() => handleBook(chef.id)}
                                disabled={isAnyChefBooked}
                                className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${
                                    isBooked
                                        ? "bg-green-600 text-white cursor-default"
                                        : isDisabled
                                          ? "bg-neutral-800 text-neutral-600 border border-neutral-700 cursor-not-allowed opacity-50"
                                          : isRecommended
                                            ? "bg-orange-500 text-black hover:bg-orange-400 shadow-lg shadow-orange-500/20 cursor-pointer"
                                            : "bg-neutral-800 text-[#f5ece0] hover:bg-neutral-700 border border-neutral-700 cursor-pointer"
                                }`}
                            >
                                {isBooked ? "Booked" : "Book Now"}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            <button
                onClick={onBack}
                className={`mt-4 text-sm flex items-center gap-2 group transition-colors 
                        text-[#f5ece0]/40 hover:text-orange-400 cursor-pointer
                }`}
            >
                <span
                    className={"group-hover:-translate-x-1 transition-transfor"}
                >
                    ←
                </span>
                Adjust My Preferences
            </button>
        </motion.div>
    );
}
