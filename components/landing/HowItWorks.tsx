"use client";

import { Plug, Layers, ShieldCheck } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            title: "Connect your API",
            desc: "Add a base URL and auth method. No agents, no local setup.",
            icon: <Plug className="h-6 w-6 text-primary" />,
        },
        {
            title: "Select engines",
            desc: "Choose Metlo, Akto, PentestGPT, or all three for maximum coverage.",
            icon: <Layers className="h-6 w-6 text-primary" />,
        },
        {
            title: "Get one risk report",
            desc: "View normalized issues, severities, and recommendations in minutes.",
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Security intelligence in three steps.
                    </h2>
                    <p className="text-muted-foreground">
                        ATLAS handles the orchestration, normalization, and heavy lifting. You just focus on the results.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <div key={i} className="relative space-y-4 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    {step.icon}
                                </div>
                                <div className="text-4xl font-black text-muted-foreground/10 select-none">0{i + 1}</div>
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-6 left-[calc(100%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-primary/20 to-transparent" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
