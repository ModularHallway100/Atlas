"use client";

import { Star, Zap, Clock, Shield } from "lucide-react";

export function TrustStrip() {
    return (
        <section className="py-12 border-y border-border/40 bg-[#0F1219]">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col space-y-12">
                    {/* Logos/Labels Strip */}
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/40">
                            Compatible with tools trusted by modern API teams
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale saturate-0 pointer-events-none">
                            <span className="text-sm font-bold tracking-widest uppercase">Fintech</span>
                            <span className="text-sm font-bold tracking-widest uppercase">API-first</span>
                            <span className="text-sm font-bold tracking-widest uppercase">Infrastructure</span>
                            <span className="text-sm font-bold tracking-widest uppercase">SaaS</span>
                            <span className="text-sm font-bold tracking-widest uppercase">Web3</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 items-center">
                        {/* Testimonial Quote */}
                        <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                                ))}
                            </div>
                            <blockquote className="text-xl md:text-2xl font-medium tracking-tight text-balance italic text-muted-foreground">
                                “This is what security tooling should have looked like 10 years ago.”
                            </blockquote>
                            <cite className="text-xs font-bold uppercase tracking-widest text-primary not-italic">
                                — Security Engineer, Series B SaaS
                            </cite>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 gap-6 border-l border-border/40 pl-8 hidden md:grid">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10 text-primary">
                                    <Shield className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">3+ Engines</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Orchestrated</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10 text-primary">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Minutes</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">To first scan</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-primary/10 text-primary">
                                    <Zap className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">One score</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Unified Risk View</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
