"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CUISINES = [
    "Bengali",
    "Chinese",
    "Italian",
    "Continental",
    "BBQ",
] as const;
const DISH_ICONS = ["🍛", "🍜", "🍝", "🥩", "🍖"] as const;
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Party catering"] as const;
const GUEST_OPTIONS = ["1–5", "6–15", "16–30", "30+"] as const;
const BUDGET_OPTIONS = [
    "৳500–৳1,000",
    "৳1,000–৳2,000",
    "৳2,000–৳5,000",
    "৳5,000+",
] as const;

type FormState = {
    cuisine: string;
    meal: string;
    guests: string;
    budget: string;
    special: string;
};

type SubmitStatus = "idle" | "success" | "error";

export default function CustomerForm() {
    const [form, setForm] = useState<FormState>({
        cuisine: "",
        meal: "",
        guests: "",
        budget: "",
        special: "",
    });
    const [activeDot, setActiveDot] = useState(0);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

    useEffect(() => {
        if (form.cuisine) return;
        const timer = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % CUISINES.length);
        }, 2800);
        return () => clearInterval(timer);
    }, [form.cuisine]);

    const handleCuisineChange = (value: string) => {
        setForm((prev) => ({ ...prev, cuisine: value }));
        const idx = CUISINES.indexOf(value as (typeof CUISINES)[number]);
        if (idx >= 0) setActiveDot(idx);
        setSubmitStatus("idle");
    };

    const handleChange = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setSubmitStatus("idle");
    };

    const handleSubmit = () => {
        const { cuisine, meal, guests, budget } = form;
        if (!cuisine || !meal || !guests || !budget) {
            setSubmitStatus("error");
            return;
        }
        setSubmitStatus("success");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans grid grid-cols-1 md:grid-cols-2 min-h-[600px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-orange-900/10"
        >
            {/* ── Visual Panel ── */}
            <div
                className="relative flex flex-col justify-end p-6 md:p-10 overflow-hidden"
                style={{ background: "#1a0f00" }}
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 20%, #4d2600 0%, #1a0f00 70%)",
                    }}
                />

                {/* Dish Icon Section - HIDDEN ON MOBILE (hidden), FLEX ON DESKTOP (md:flex) */}
                <div className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 flex-col items-center gap-6 z-10">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-32 h-32 rounded-full absolute -inset-1 opacity-20"
                            style={{ border: "2px dashed #e89040" }}
                        />
                        <motion.div
                            className="w-28 h-28 rounded-full flex items-center justify-center relative z-10"
                            style={{
                                background: "#2d1800",
                                border: "4px solid #5a3010",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDot}
                                    initial={{
                                        scale: 0,
                                        rotate: -10,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="text-5xl"
                                >
                                    {DISH_ICONS[activeDot]}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="flex gap-2">
                        {CUISINES.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: i === activeDot ? 1.2 : 1,
                                    backgroundColor:
                                        i === activeDot ? "#e89040" : "#4d2600",
                                }}
                                className="w-2 h-2 rounded-full cursor-pointer"
                                onClick={() => setActiveDot(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-md mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    >
                        Chef&apos;s Table
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-serif font-semibold text-[#f5ece0] leading-tight mb-3"
                    >
                        Curate your <br /> perfect meal
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-[#f5ece0]/50 mb-4 md:mb-6 max-w-[240px]"
                    >
                        Hand-picked ingredients, professional mastery, served at
                        your home.
                    </motion.p>
                </div>
            </div>

            {/* ── Form Panel ── */}
            <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 flex flex-col">
                <div className="mb-6 md:mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] tracking-widest uppercase font-bold text-orange-600">
                            Step 1 of 3
                        </span>
                        <div className="flex gap-1">
                            <div className="w-8 h-1 rounded-full bg-orange-500" />
                            <div className="w-8 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                            <div className="w-8 h-1 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                        </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold dark:text-white">
                        Your preferences
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Cuisine" delay={0.1}>
                            <Select
                                value={form.cuisine}
                                onChange={handleCuisineChange}
                                placeholder="Select"
                                options={[...CUISINES]}
                            />
                        </Field>
                        <Field label="Meal Type" delay={0.2}>
                            <Select
                                value={form.meal}
                                onChange={(v) => handleChange("meal", v)}
                                placeholder="Select"
                                options={[...MEAL_TYPES]}
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Guests" delay={0.3}>
                            <Select
                                value={form.guests}
                                onChange={(v) => handleChange("guests", v)}
                                placeholder="Range"
                                options={[...GUEST_OPTIONS]}
                            />
                        </Field>
                        <Field label="Budget" delay={0.4}>
                            <Select
                                value={form.budget}
                                onChange={(v) => handleChange("budget", v)}
                                placeholder="Amount"
                                options={[...BUDGET_OPTIONS]}
                            />
                        </Field>
                    </div>

                    <Field label="Special Requests" delay={0.5}>
                        <textarea
                            value={form.special}
                            onChange={(e) =>
                                handleChange("special", e.target.value)
                            }
                            placeholder="Allergies, themes, or specific dishes..."
                            rows={4}
                            className="w-full text-sm p-4 text-white rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none resize-none"
                        />
                    </Field>
                </div>

                <div className="mt-8 flex gap-3">
                    <motion.button
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setForm({
                                cuisine: "",
                                meal: "",
                                guests: "",
                                budget: "",
                                special: "",
                            });
                            setSubmitStatus("idle");
                        }}
                        className="px-4 md:px-6 py-3 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 dark:text-white"
                    >
                        Reset
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: "#a86428" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className="flex-1 py-3 rounded-xl bg-[#c47a30] text-white font-semibold text-sm shadow-lg shadow-orange-900/20"
                    >
                        Find Chef
                    </motion.button>
                </div>

                <AnimatePresence>
                    {submitStatus !== "idle" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 16,
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`p-3 rounded-xl text-center text-xs font-medium ${
                                submitStatus === "success"
                                    ? "bg-green-500/10 text-green-600"
                                    : "bg-red-500/10 text-red-600"
                            }`}
                        >
                            {submitStatus === "success"
                                ? "✓ Preferences saved. Loading chefs..."
                                : "⚠ Please complete all required fields."}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function Field({
    label,
    children,
    delay = 0,
}: {
    label: string;
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex flex-col gap-1.5"
        >
            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500 ml-1">
                {label}
            </label>
            {children}
        </motion.div>
    );
}

function Select({
    value,
    onChange,
    placeholder,
    options,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: string[];
}) {
    return (
        <div className="relative group">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm pl-4 pr-10 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none dark:text-white"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-focus-within:text-orange-500 transition-colors">
                <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}
