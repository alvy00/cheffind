/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import ChefResults from "@/components/ChefResults";
import CustomerForm from "@/components/CustomerForm";
import Background from "@/components/misc/Background";
import FSLoader from "@/components/misc/FSLoader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [chefData, setChefData] = useState<any>(null);

    useEffect(() => {
        const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

        if (hasSeenLoader) {
            setLoading(false);
        } else {
            const timer = setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem("hasSeenLoader", "true");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleFormSubmit = async (data: any) => {
        try {
            const res = await axios.post("/api/recommend", { data });
            console.log(res.data.recommendedChefs);
            setChefData(res.data.recommendedChefs);
            setShowResults(true);
        } catch (error) {
            console.error("Submission failed", error);
        }
    };

    if (loading) return <FSLoader />;
    return (
        <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-16">
            <Background />

            <div className="w-full max-w-4xl flex flex-col gap-10 z-10">
                <div className="text-center flex flex-col items-center gap-3">
                    <h1
                        className="text-3xl sm:text-4xl leading-tight"
                        style={{
                            color: "#f5ece0",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontWeight: 600,
                        }}
                    >
                        Chef <span className="text-orange-400">Find</span>
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

                {!showResults ? (
                    <CustomerForm onSubmitSuccess={handleFormSubmit} />
                ) : (
                    <ChefResults
                        data={chefData}
                        onBack={() => setShowResults(false)}
                    />
                )}
            </div>
        </main>
    );
}
