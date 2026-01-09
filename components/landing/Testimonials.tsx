"use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        quote: "We finally stopped arguing about which tool was right. ATLAS cut our triage time by 60% and made the answer obvious for engineers.",
        author: "Head of Engineering",
        company: "Series B FinTech",
        initials: "JD"
    },
    {
        quote: "This feels like the missing control plane for security tooling. We deployed it in minutes and found 3 shadow endpoints immediately.",
        author: "Security Lead",
        company: "B2B SaaS Unicorn",
        initials: "AM"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-muted/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Built for teams that ship APIs.
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        The single source of truth for engineering and security teams.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-8 rounded-3xl border border-border/60 bg-card/30 space-y-6 relative group hover:border-primary/40 transition-colors">
                            <Quote className="h-8 w-8 text-primary opacity-20 absolute top-8 right-8" />
                            <p className="text-lg md:text-xl font-medium leading-relaxed italic">
                                “{t.quote}”
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="font-bold">{t.author}</p>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{t.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mb-4" id="oss-credits">
                        Powered by open security engines trusted by thousands of devs: <br className="md:hidden" />
                        <Link href="https://github.com/metlo-labs/metlo" className="hover:text-primary underline underline-offset-4 transition-colors">Metlo</Link>,{" "}
                        <Link href="https://github.com/akto-api-security/akto" className="hover:text-primary underline underline-offset-4 transition-colors">Akto</Link>, and{" "}
                        <Link href="https://github.com/GreyDGL/PentestGPT" className="hover:text-primary underline underline-offset-4 transition-colors">PentestGPT</Link>
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-muted/20 text-xs font-bold font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        7,400+ Combined GitHub Stars
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        </section>
    );
}
