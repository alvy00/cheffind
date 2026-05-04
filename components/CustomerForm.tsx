/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
    BUDGET_OPTIONS,
    CUISINES,
    DISH_ICONS,
    GUEST_OPTIONS,
    MEAL_TYPES,
} from "@/lib/constants";

type FormValues = {
    cuisine: string;
    meal: string;
    guests: string;
    budget: string;
    special: string;
};

export default function CustomerForm({
    onSubmitSuccess,
}: {
    onSubmitSuccess: (data: any) => void;
}) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormValues>({
        defaultValues: {
            cuisine: "",
            meal: "",
            guests: "",
            budget: "",
            special: "",
        },
    });

    const [activeDot, setActiveDot] = useState(0);
    const selectedCuisine = watch("cuisine");

    useEffect(() => {
        if (selectedCuisine) {
            const idx = CUISINES.indexOf(selectedCuisine as any);
            if (idx >= 0) setActiveDot(idx);
        } else {
            const timer = setInterval(() => {
                setActiveDot((prev) => (prev + 1) % CUISINES.length);
            }, 2800);
            return () => clearInterval(timer);
        }
    }, [selectedCuisine]);

    const onSubmit = async (data: FormValues) => {
        onSubmitSuccess(data);
        console.log("Form Submitted Successfully:", data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans grid grid-cols-1 md:grid-cols-2 w-full max-h-[85vh] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-white dark:bg-neutral-900"
        >
            {/* ── Visual Panel (Left) ── */}
            <div className="relative hidden md:flex flex-col justify-end p-10 bg-[#1a0f00] overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 30% 20%, #4d2600 0%, #1a0f00 70%)",
                    }}
                />

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
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {CUISINES.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeDot ? "bg-orange-400 scale-125" : "bg-orange-900"}`}
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

            {/* ── Form Panel (Right) ── */}
            <div className="p-6 md:p-8 flex flex-col overflow-y-auto">
                <header className="mb-6">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-orange-600">
                        Step 1 of 3
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-semibold dark:text-white">
                        Your preferences
                    </h2>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Cuisine" error={errors.cuisine?.message}>
                            <Controller
                                name="cuisine"
                                control={control}
                                rules={{ required: "Select a cuisine" }}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        placeholder="Select"
                                        options={[...CUISINES]}
                                    />
                                )}
                            />
                        </Field>

                        <Field label="Meal Type" error={errors.meal?.message}>
                            <Controller
                                name="meal"
                                control={control}
                                rules={{ required: "Select a meal type" }}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        placeholder="Select"
                                        options={MEAL_TYPES}
                                    />
                                )}
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field label="Guests" error={errors.guests?.message}>
                            <Controller
                                name="guests"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        placeholder="Range"
                                        options={GUEST_OPTIONS}
                                    />
                                )}
                            />
                        </Field>

                        <Field label="Budget" error={errors.budget?.message}>
                            <Controller
                                name="budget"
                                control={control}
                                rules={{ required: "Required" }}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        placeholder="Amount"
                                        options={BUDGET_OPTIONS}
                                    />
                                )}
                            />
                        </Field>
                    </div>

                    <Field label="Special Requests">
                        <textarea
                            {...register("special")}
                            placeholder="Allergies, themes..."
                            rows={3}
                            className="w-full text-sm p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none resize-none dark:text-white"
                        />
                    </Field>

                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-6 py-3 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 rounded-xl bg-[#c47a30] hover:bg-[#a86428] disabled:bg-neutral-400 text-white font-semibold text-sm shadow-lg transition-all"
                        >
                            {isSubmitting ? "Searching..." : "Find Chef"}
                        </button>
                    </div>

                    {isSubmitSuccessful && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-green-600 text-xs font-medium"
                        >
                            ✓ Preferences saved. Loading chefs...
                        </motion.p>
                    )}
                </form>
            </div>
        </motion.div>
    );
}

function Field({
    label,
    children,
    error,
}: {
    label: string;
    children: React.ReactNode;
    error?: string;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 dark:text-neutral-500">
                    {label}
                </label>
                {error && (
                    <span className="text-[9px] text-red-500 font-bold uppercase">
                        {error}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
}

const CustomSelect = React.forwardRef<HTMLSelectElement, any>(
    ({ value, onChange, placeholder, options, ...props }, ref) => {
        return (
            <div className="relative group">
                <select
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    {...props}
                    className="w-full text-sm pl-4 pr-10 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 appearance-none cursor-pointer focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none dark:text-white"
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-focus-within:text-orange-500 transition-colors">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        );
    },
);
CustomSelect.displayName = "CustomSelect";
