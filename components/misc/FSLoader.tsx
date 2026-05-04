"use client";
import Background from "./Background";

export default function FSLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0800]">
            <Background />

            <div className="relative flex flex-col items-center gap-6">
                <h2
                    className="text-4xl sm:text-5xl animate-pulse tracking-widest"
                    style={{
                        color: "#f5ece0",
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        filter: "drop-shadow(0 0 8px rgba(180,90,20,0.4))",
                    }}
                >
                    ChefFind
                </h2>

                <div className="w-48 h-[1px] bg-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#b45a14] to-transparent animate-shimmer" />
                </div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5ece0]/30 animate-pulse">
                    Setting your table
                </p>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
