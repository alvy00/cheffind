/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const CustomSelect = React.forwardRef<HTMLSelectElement, any>(
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
