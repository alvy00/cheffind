"use client";
import CustomerForm from "@/components/CustomerForm";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-16">
            {/* ── Full-page background ── */}
            <div
                className="absolute inset-0 -z-10"
                style={{ background: "#0d0800" }}
            />

            {/* Warm radial glow — top left */}
            <div
                className="absolute -z-10 pointer-events-none"
                style={{
                    top: "-15%",
                    left: "-10%",
                    width: "55vw",
                    height: "55vw",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(180,90,20,0.18) 0%, transparent 70%)",
                }}
            />

            {/* Warm radial glow — bottom right */}
            <div
                className="absolute -z-10 pointer-events-none"
                style={{
                    bottom: "-20%",
                    right: "-10%",
                    width: "60vw",
                    height: "60vw",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(160,70,10,0.14) 0%, transparent 70%)",
                }}
            />

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Fine grid lines */}
            <div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* ── Page chrome ── */}
            <div className="w-full max-w-4xl flex flex-col gap-10">
                {/* Top nav strip */}
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
                            style={{
                                background: "rgba(196,122,48,0.15)",
                                border: "0.5px solid rgba(196,122,48,0.3)",
                            }}
                        >
                            🍽️
                        </div>
                        <span
                            className="text-sm font-semibold tracking-tight"
                            style={{
                                color: "#f0e0c8",
                                fontFamily: "'Georgia', serif",
                            }}
                        >
                            Chef&apos;s Table
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        {["How it works", "Cuisines", "Pricing"].map((item) => (
                            <span
                                key={item}
                                className="text-xs cursor-pointer transition-colors"
                                style={{ color: "rgba(240,224,200,0.4)" }}
                                onMouseEnter={(e) =>
                                    ((e.target as HTMLElement).style.color =
                                        "rgba(240,224,200,0.8)")
                                }
                                onMouseLeave={(e) =>
                                    ((e.target as HTMLElement).style.color =
                                        "rgba(240,224,200,0.4)")
                                }
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </nav>

                {/* Heading block */}
                <div className="text-center flex flex-col items-center gap-3">
                    <span
                        className="text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1 rounded-full"
                        style={{
                            color: "#e89040",
                            background: "rgba(196,122,48,0.12)",
                            border: "0.5px solid rgba(196,122,48,0.3)",
                        }}
                    >
                        Book a private chef
                    </span>
                    <h1
                        className="text-3xl sm:text-4xl leading-tight"
                        style={{
                            color: "#f5ece0",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontWeight: 600,
                        }}
                    >
                        Your table, your rules.
                    </h1>
                    <p
                        className="text-sm max-w-sm"
                        style={{
                            color: "rgba(245,236,224,0.45)",
                            lineHeight: 1.7,
                        }}
                    >
                        Tell us your preferences and we&apos;ll match you with
                        the perfect chef for the occasion.
                    </p>
                </div>

                {/* The form card */}
                <CustomerForm />

                {/* Footer trust bar */}
                <div className="flex items-center justify-center gap-6 flex-wrap">
                    {[
                        { icon: "✦", label: "200+ verified chefs" },
                        { icon: "✦", label: "Same-day bookings" },
                        { icon: "✦", label: "Free cancellation" },
                    ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                            <span
                                className="text-[9px]"
                                style={{ color: "#c47a30" }}
                            >
                                {icon}
                            </span>
                            <span
                                className="text-[11px]"
                                style={{ color: "rgba(245,236,224,0.35)" }}
                            >
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
