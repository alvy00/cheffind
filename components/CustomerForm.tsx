/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
    BUDGET_OPTIONS,
    CUISINES,
    GUEST_OPTIONS,
    MEAL_TYPES,
} from "@/lib/constants";
import { ProgressLoader } from "./misc/ProgressLoader";
import { CustomSelect } from "./ui/CustomSelect";
import { VisualPanel } from "./ui/VisualPanel";
import { Field } from "./ui/FormField";

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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans grid grid-cols-1 md:grid-cols-2 w-full max-h-[85vh] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-white dark:bg-neutral-900"
        >
            <VisualPanel activeDot={activeDot} />

            <div className="relative p-6 md:p-8 flex flex-col overflow-hidden">
                <AnimatePresence>
                    {isSubmitting && <ProgressLoader />}
                </AnimatePresence>

                <div
                    className={`flex flex-col h-full transition-all duration-500 overflow-y-auto ${
                        isSubmitting
                            ? "blur-md opacity-40 scale-[0.98] pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <header className="mb-6">
                        <h2 className="text-xl md:text-2xl font-serif font-semibold dark:text-white">
                            Your preferences
                        </h2>
                    </header>

                    <form
                        onSubmit={handleSubmit(onSubmitSuccess)}
                        className="space-y-5"
                    >
                        {/* Row 1: Cuisine & Meal Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Cuisine"
                                error={errors.cuisine?.message}
                            >
                                <Controller
                                    name="cuisine"
                                    control={control}
                                    rules={{ required: "Required" }}
                                    render={({ field }) => (
                                        <CustomSelect
                                            {...field}
                                            placeholder="Select"
                                            options={[...CUISINES]}
                                        />
                                    )}
                                />
                            </Field>

                            <Field
                                label="Meal Type"
                                error={errors.meal?.message}
                            >
                                <Controller
                                    name="meal"
                                    control={control}
                                    rules={{ required: "Required" }}
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

                        {/* Row 2: Guests & Budget */}
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                label="Guests"
                                error={errors.guests?.message}
                            >
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

                            <Field
                                label="Budget"
                                error={errors.budget?.message}
                            >
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

                        {/* Special Requests */}
                        <Field label="Special Requests">
                            <textarea
                                {...register("special")}
                                placeholder="Allergies, themes..."
                                rows={3}
                                className="w-full text-sm p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none resize-none dark:text-white"
                            />
                        </Field>

                        {/* Actions */}
                        <div className="pt-2 flex gap-3">
                            <button
                                type="button"
                                onClick={() => reset()}
                                className="px-6 py-3 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 py-3 rounded-xl bg-[#c47a30] hover:bg-[#a86428] disabled:bg-neutral-400 text-white font-semibold text-sm shadow-lg transition-all cursor-pointer"
                            >
                                {isSubmitting ? "Searching..." : "Find Chef"}
                            </button>
                        </div>

                        {isSubmitSuccessful && !isSubmitting && (
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
            </div>
        </motion.div>
    );
}
