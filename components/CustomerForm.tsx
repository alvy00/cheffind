"use client";

import { useState, useEffect } from "react";

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

    // Auto-cycle dish when no cuisine selected
    useEffect(() => {
        if (form.cuisine) return;
        const timer = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % CUISINES.length);
        }, 2400);
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
        // TODO: proceed to Step 2 / call your API here
        console.log("Form submitted:", form);
    };

    const handleClear = () => {
        setForm({ cuisine: "", meal: "", guests: "", budget: "", special: "" });
        setActiveDot(0);
        setSubmitStatus("idle");
    };

    return (
        <div className="font-sans grid grid-cols-1 md:grid-cols-2 min-h-[580px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            {/* ── Visual Panel ── */}
            <div
                className="relative flex flex-col justify-end p-8 overflow-hidden"
                style={{ background: "#1a0f00" }}
            >
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 30% 20%, #3d1f00 0%, #1a0f00 60%)",
                    }}
                />

                {/* Decorative circles */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
                    {/* Plate */}
                    <div
                        className="w-28 h-28 rounded-full flex items-center justify-center"
                        style={{
                            background: "#2d1800",
                            border: "3px solid #5a3010",
                        }}
                    >
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                            style={{
                                background: "#3a2008",
                                border: "1.5px solid #7a4a20",
                            }}
                        >
                            {DISH_ICONS[activeDot]}
                        </div>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                        {CUISINES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveDot(i)}
                                className="w-1.5 h-1.5 rounded-full transition-opacity"
                                style={{
                                    background: "#e89040",
                                    opacity: i === activeDot ? 1 : 0.35,
                                }}
                                aria-label={`Show ${CUISINES[i]}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom copy */}
                <div className="relative z-10">
                    <span
                        className="inline-block text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full mb-2.5"
                        style={{
                            background: "rgba(196,122,48,0.2)",
                            color: "#e89040",
                            border: "0.5px solid rgba(196,122,48,0.4)",
                        }}
                    >
                        Chef&apos;s Table
                    </span>

                    <h2
                        className="text-2xl leading-snug mb-2"
                        style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            color: "#f5ece0",
                            fontWeight: 600,
                        }}
                    >
                        Curate your
                        <br />
                        perfect meal
                    </h2>

                    <p
                        className="text-sm mb-5"
                        style={{
                            color: "rgba(245,236,224,0.55)",
                            lineHeight: 1.6,
                        }}
                    >
                        From intimate gatherings to grand celebrations — crafted
                        to your taste.
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {[
                            "Customisable menu",
                            "Home service",
                            "Party catering",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="text-[11px] px-2.5 py-1 rounded-full"
                                style={{
                                    background: "rgba(255,255,255,0.06)",
                                    color: "rgba(245,236,224,0.65)",
                                    border: "0.5px solid rgba(255,255,255,0.1)",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Form Panel ── */}
            <div className="bg-white dark:bg-neutral-900 p-7 flex flex-col gap-0">
                {/* Header */}
                <div className="mb-5">
                    <p
                        className="text-[10px] tracking-widest uppercase font-medium mb-1"
                        style={{ color: "#c47a30" }}
                    >
                        Step 1 of 3
                    </p>
                    <h2
                        className="text-xl leading-snug text-neutral-900 dark:text-neutral-100"
                        style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontWeight: 600,
                        }}
                    >
                        Your preferences
                    </h2>
                    <p className="text-xs text-neutral-500 mt-1">
                        Help us match you with the right chef.
                    </p>
                </div>

                <div className="h-px bg-neutral-100 dark:bg-neutral-800 mb-5" />

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <Field label="Cuisine preference">
                        <Select
                            value={form.cuisine}
                            onChange={(v) => handleCuisineChange(v)}
                            placeholder="Select cuisine"
                            options={[...CUISINES]}
                        />
                    </Field>
                    <Field label="Meal type">
                        <Select
                            value={form.meal}
                            onChange={(v) => handleChange("meal", v)}
                            placeholder="Select type"
                            options={[...MEAL_TYPES]}
                        />
                    </Field>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <Field label="Number of guests">
                        <Select
                            value={form.guests}
                            onChange={(v) => handleChange("guests", v)}
                            placeholder="Select range"
                            options={[...GUEST_OPTIONS]}
                        />
                    </Field>
                    <Field label="Budget per session">
                        <Select
                            value={form.budget}
                            onChange={(v) => handleChange("budget", v)}
                            placeholder="Select budget"
                            options={[...BUDGET_OPTIONS]}
                        />
                    </Field>
                </div>

                {/* Special requests */}
                <Field label="Special requests" className="mb-4">
                    <textarea
                        value={form.special}
                        onChange={(e) =>
                            handleChange("special", e.target.value)
                        }
                        placeholder="e.g. Birthday dinner, no beef, nut allergy..."
                        rows={3}
                        className="w-full text-[13px] px-3 py-2 rounded-lg resize-none outline-none transition-all
              bg-neutral-50 dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              text-neutral-900 dark:text-neutral-100
              placeholder:text-neutral-400
              focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                    />
                </Field>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 text-[13px] rounded-lg border border-neutral-200 dark:border-neutral-700
              text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800
              transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-2 text-[13px] font-medium rounded-lg text-white transition-all active:scale-[0.98]"
                        style={{ background: "#c47a30" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#a86428")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "#c47a30")
                        }
                    >
                        Continue to Step 2 →
                    </button>
                </div>

                {/* Status message */}
                {submitStatus === "success" && (
                    <div className="mt-3 text-[12px] text-center py-2 px-3 rounded-lg bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                        ✓ Details saved! Proceeding to chef selection…
                    </div>
                )}
                {submitStatus === "error" && (
                    <div className="mt-3 text-[12px] text-center py-2 px-3 rounded-lg bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                        Please fill in all required fields.
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Sub-components ── */

function Field({
    label,
    children,
    className = "",
}: {
    label: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-[11px] font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
                {label}
            </label>
            {children}
        </div>
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
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-[13px] px-3 py-2 rounded-lg outline-none transition-all appearance-none cursor-pointer
        bg-neutral-50 dark:bg-neutral-800
        border border-neutral-200 dark:border-neutral-700
        text-neutral-900 dark:text-neutral-100
        focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
            }}
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
    );
}
