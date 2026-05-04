/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";

export default function ChefResults({
    data,
    onBack,
}: {
    data: any;
    onBack: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl text-center"
        >
            <h2 className="text-2xl font-serif font-bold dark:text-white mb-4">
                Recommended Chefs
            </h2>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl mb-6 text-sm dark:text-neutral-300">
                {/* Map through your results here */}
                <p>Gemini found 3 chefs matching your criteria!</p>
            </div>

            <button
                onClick={onBack}
                className="px-8 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all font-medium"
            >
                ← Back to Preferences
            </button>
        </motion.div>
    );
}
