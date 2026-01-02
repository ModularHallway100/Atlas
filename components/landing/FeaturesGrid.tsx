"use client";

import { FileText, Radio, Gauge, Tag, Terminal } from "lucide-react";

const features = [
    {
        title: "Unified Risk Report",
        desc: "All issues normalized into a single schema. No duplicated noise from different tools.",
        icon: <FileText className="h-5 w-5" />,
    },
    {
        title: "Engine Orchestration",
        desc: "Run Metlo, Akto, and PentestGPT with one click. Add more engines over time without extra setup.",
        icon: <Radio className="h-5 w-5" />,
    },
    {
        title: "Severity Normalization",
        desc: "Critical means critical, everywhere. Consistent risk scoring across all utilized security engines.",
        icon: <Gauge className="h-5 w-5" />,
    },
    {
        title: "Transparent Attribution",
        desc: "Know exactly which engine found which vulnerability. Every finding includes its source attribution.",
        icon: <Tag className="h-5 w-5" />,
    },
    {
        title: "Built for Developers",
        desc: "API-first, CLI-ready, and designed for speed. No security theater — just actionable intelligence.",
        icon: <Terminal className="h-5 w-5" />,
    },
];

export function FeaturesGrid() {
    return (
        <section className="py-24 md:py-32">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                        Everything you need. <br /> Nothing you don’t.
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="p-8 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/30 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}

                    {/* Coming Soon Card */}
                    <div className="p-8 rounded-2xl border border-dashed border-border flex flex-col items-center justify-center text-center opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2">Waitlist</p>
                        <h3 className="text-lg font-bold">Custom Adapters</h3>
                        <p className="text-xs mt-1">Connect your internal engines.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
