export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Base Background Color */}
            <div
                className="absolute inset-0"
                style={{ background: "#0d0800" }}
            />

            {/* Warm radial glow — top left */}
            <div
                className="absolute"
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
                className="absolute"
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
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Fine grid lines */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
                    backgroundSize: "64px 64px",
                }}
            />
        </div>
    );
}
