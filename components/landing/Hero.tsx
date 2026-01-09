"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { DashboardMockup } from "./DashboardMockup";

export function Hero({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background noise/grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3F%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="container relative z-10 px-4 mx-auto text-center">
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-top duration-1000">
                            <Terminal className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Orchestration V0.1</span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white animate-in fade-in slide-in-from-bottom duration-1000 [text-wrap:balance]">
                                Run every API security engine. <br />
                                <span className="text-primary italic">Get one answer.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                                ATLAS orchestrates <span className="text-white font-bold">Metlo, Akto, PentestGPT</span>, and more into a single, normalized security report — in minutes. <br className="hidden md:block" />
                                <span className="text-primary italic font-bold">So you can stop identifying risks after they're exploited and start shipping at a speed your competitors can't touch.</span>
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Button asChild size="lg" className="h-16 px-12 rounded-full text-xl font-black bg-primary text-white hover:bg-primary/90 shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all glow-hover">
                                    <Link href={isLoggedIn ? "/dashboard" : "/auth"}>
                                        {isLoggedIn ? "Go to Dashboard" : "Run Your First Scan"}
                                        <ArrowRight className="ml-3 h-6 w-6" />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="h-16 px-8 rounded-full text-lg font-bold border-white/20 hover:bg-white/5 transition-colors">
                                    <Link href="/sample-report">
                                        View Sample Report
                                    </Link>
                                </Button>
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                No credit card. Takes 2 minutes.
                            </p>
                        </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                        <DashboardMockup />
                    </div>
                </div>
            </div>
        </section>
    );
}
