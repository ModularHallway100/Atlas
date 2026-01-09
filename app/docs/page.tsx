"use client";

import Link from "next/link";
import { Shield, ArrowLeft, Book, Code, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-[#0B0E14] text-foreground font-sans">
            <header className="px-6 h-16 flex items-center border-b border-border/40 bg-[#0B0E14]/50 backdrop-blur sticky top-0 z-50">
                <Link className="flex items-center justify-center gap-2" href="/">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl tracking-tighter text-white">ATLAS</span>
                </Link>
                <nav className="ml-auto">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Landing
                        </Link>
                    </Button>
                </nav>
            </header>

            <main className="container max-w-5xl py-20 px-4">
                <div className="space-y-4 mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                        Documentation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                        Developer Guide & Reference
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Everything you need to orchestrate security engines and generate unified risk reports.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl border border-border/60 bg-card/30 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 transition-colors">
                            <Book className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold">Getting Started</h2>
                        <p className="text-muted-foreground">
                            Learn how to connect your first API target and run a multi-engine scan in under 2 minutes.
                        </p>
                        <Link href="#" className="inline-block text-primary font-bold hover:underline">Read Guide →</Link>
                    </div>

                    <div className="p-8 rounded-3xl border border-border/60 bg-card/30 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 transition-colors">
                            <Code className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold">Engine Reference</h2>
                        <p className="text-muted-foreground">
                            Deep dive into how we orchestrate Metlo, Akto, and PentestGPT and normalize their output.
                        </p>
                        <Link href="#" className="inline-block text-primary font-bold hover:underline">View Engines →</Link>
                    </div>

                    <div className="p-8 rounded-3xl border border-border/60 bg-card/30 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 transition-colors">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold">Security & Privacy</h2>
                        <p className="text-muted-foreground">
                            Our architecture for hardware-isolated engine execution and end-to-end data encryption.
                        </p>
                        <Link href="#" className="inline-block text-primary font-bold hover:underline">Read Whitepaper →</Link>
                    </div>

                    <div className="p-8 rounded-3xl border border-border/60 bg-card/30 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 transition-colors">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-bold">Integrations</h2>
                        <p className="text-muted-foreground">
                            Connect ATLAS to your CI/CD pipelines and alerting systems via our Webhook and API.
                        </p>
                        <Link href="#" className="inline-block text-primary font-bold hover:underline">Explore API →</Link>
                    </div>
                </div>

                <div className="mt-20 p-12 rounded-[40px] border border-primary/20 bg-primary/5 text-center space-y-6">
                    <h3 className="text-3xl font-bold italic text-white">Ready to orchestrate?</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Get started for free and see why engineering teams trust ATLAS.
                    </p>
                    <Button asChild size="lg" className="rounded-full px-12">
                        <Link href="/auth">Create Free Account</Link>
                    </Button>
                </div>
            </main>

            <footer className="py-12 border-t border-border/40 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    © 2025 ATLAS Security Orchestration. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
