import { FieldProps } from "@/lib/types";

export function Field({ label, children, error }: FieldProps) {
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
