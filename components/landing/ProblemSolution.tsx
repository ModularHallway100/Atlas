"use client";

import { CheckCircle2, AlertCircle, Zap, Shield, Target, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProblemSolution() {
    return (
        <section className="py-24 md:py-32 border-t border-border/40">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        API security is powerful — and completely fragmented.
                    </h2>
                    <p className="text-muted-foreground">
                        Teams fly blind between audits because traditional security tools are isolated, slow, and speak different languages.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Problem Side: Chaotic Output */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest">
                                <AlertCircle className="h-3 w-3" />
                                The Problem: Tool Fragmentation
                            </div>
                            <h3 className="text-2xl font-bold">Too many tools, no signal.</h3>
                        </div>

                        <div className="relative p-8 rounded-3xl border border-border/40 bg-[#0B0E14] overflow-hidden group">
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="space-y-4 blur-[1px] group-hover:blur-0 transition-all">
                                {[
                                    { engine: "Metlo", found: "12 Issues", color: "bg-blue-500/20 text-blue-400" },
                                    { engine: "Akto", found: "8 Issues", color: "bg-amber-500/20 text-amber-400" },
                                    { engine: "PentestGPT", found: "5 Scenarios", color: "bg-purple-500/20 text-purple-400" },
                                ].map((tool, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-muted/10 opacity-60">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded flex items-center justify-center font-black text-[8px] ${tool.color}`}>
                                                {tool.engine.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold">{tool.engine} JSON Output</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-muted-foreground">0x{["a2f1", "c9d4", "e7b8"][i]}...</span>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-4 py-2 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl rotate-[-5deg]">
                                    Unorganized Noise
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "Each engine speaks its own language. Nothing lines up.",
                                "Great tools die behind YAML, configs, and endless docs.",
                                "Security insights arrive too late for engineering decisions."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                    <p className="text-sm font-medium text-muted-foreground">{text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solution Side: ATLAS Order */}
                    <div className="relative">
                        <div className="absolute -inset-8 bg-primary/20 blur-[120px] opacity-50 rounded-full" />

                        <div className="relative space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                    <Shield className="h-3 w-3" />
                                    The ATLAS Solution
                                </div>
                                <h3 className="text-2xl font-bold">One orchestration layer.</h3>
                            </div>

                            <Card className="border-primary/20 bg-[#0B0E14]/80 backdrop-blur-3xl overflow-hidden">
                                <CardContent className="p-8 space-y-8">
                                    <div className="flex items-center justify-center gap-12 relative">
                                        {/* Tool Logos merging */}
                                        <div className="flex -space-x-4">
                                            {[1, 2, 3].map((j) => (
                                                <div key={j} className="w-12 h-12 rounded-full border border-border/40 bg-muted/20 flex items-center justify-center grayscale opacity-80 backdrop-blur">
                                                    <Zap className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex-1 flex flex-col items-center">
                                            <div className="w-full h-px bg-gradient-to-r from-border/0 via-primary to-border/0" />
                                            <div className="mt-[-12px] px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                                NORMALIZED
                                            </div>
                                        </div>

                                        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                                            <FileText className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Unified Report</span>
                                            <Badge variant="success" className="rounded-full px-2 text-[8px]">Ready to Fix</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary w-[82%]" />
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span>Risk Score</span>
                                                <span>82 / 100</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <p className="text-sm font-medium text-muted-foreground text-center italic">
                                “ATLAS runs multiple engines, normalizes findings, and delivers a single actionable risk view.”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
