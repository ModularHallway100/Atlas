"use client";

import { Shield, Zap, Target, FileText, Check, AlertTriangle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DashboardMockup() {
    return (
        <div className="relative mt-16 max-w-5xl mx-auto group">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-primary/20 blur-[100px] opacity-50 rounded-full group-hover:opacity-75 transition-opacity duration-700" />

            <div className="relative rounded-2xl border border-border/40 bg-[#0B0E14] shadow-2xl overflow-hidden backdrop-blur-3xl">
                {/* Window Header */}
                <div className="h-10 border-b border-border/40 bg-muted/20 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                    </div>
                    <div className="mx-auto text-[10px] font-medium text-muted-foreground/60 flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        atlas.sh/report/live-scan-082
                    </div>
                </div>

                <div className="grid md:grid-cols-12 min-h-[400px]">
                    {/* Left: Engine Config */}
                    <div className="md:col-span-3 border-r border-border/40 p-4 space-y-6 bg-muted/5">
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Engines</p>
                            {[
                                { name: "Metlo", status: true },
                                { name: "Akto", status: true },
                                { name: "PentestGPT", status: true },
                                { name: "StackHawk", status: false },
                            ].map((e) => (
                                <div key={e.name} className="flex items-center justify-between p-2 rounded border border-border/40 bg-muted/20">
                                    <span className="text-[10px] font-bold uppercase">{e.name}</span>
                                    {e.status ? (
                                        <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center border border-primary/40">
                                            <Check className="h-2.5 w-2.5 text-primary" />
                                        </div>
                                    ) : (
                                        <div className="w-4 h-4 rounded border border-border/40" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Configuration</p>
                            <div className="p-2 rounded border border-border/40 bg-muted/20 space-y-1">
                                <p className="text-[8px] text-muted-foreground uppercase font-bold">Base URL</p>
                                <p className="text-[10px] font-mono truncate">api.production.internal</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Live Feed / Flow */}
                    <div className="md:col-span-4 border-r border-border/40 p-4 space-y-4 flex flex-col justify-center overflow-hidden">
                        {[
                            { icon: <Zap className="h-3 w-3" />, text: "Running Observability...", color: "text-primary" },
                            { icon: <Shield className="h-3 w-3" />, text: "Fuzzing Parameters...", color: "text-amber-500" },
                            { icon: <Target className="h-3 w-3" />, text: "Modeling Threats...", color: "text-red-500" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: `${i * 200}ms` }}>
                                <div className={`p-1.5 rounded ${s.color} bg-current/10`}>
                                    {s.icon}
                                </div>
                                <div className="flex-1 h-1 shadow-inner bg-muted/10 rounded-full overflow-hidden">
                                    <div className={`h-full bg-current ${s.color} animate-[loading_2s_infinite]`} style={{ width: '60%' }} />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-tighter opacity-60">{s.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right: Unified Report */}
                    <div className="md:col-span-5 p-4 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Unified Intelligence</p>
                            <div className="text-[18px] font-black italic text-primary">Score: 82</div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { title: "BOLA in Order History", severity: "critical", engine: "akto" },
                                { title: "PII Response Leak", severity: "high", engine: "metlo" },
                                { title: "Shadow Endpoint Detected", severity: "medium", engine: "metlo, pgpt" },
                            ].map((issue, i) => (
                                <div key={i} className="p-3 rounded-lg border border-border/40 bg-muted/20 group/item hover:border-primary/40 transition-colors">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            {issue.severity === 'critical' ? (
                                                <AlertCircle className="h-3 w-3 text-red-500" />
                                            ) : (
                                                <AlertTriangle className="h-3 w-3 text-amber-500" />
                                            )}
                                            <span className="text-[10px] font-bold">{issue.title}</span>
                                        </div>
                                        <span className="text-[8px] font-bold uppercase opacity-40 px-1.5 py-0.5 border border-border/40 rounded bg-background">
                                            {issue.engine}
                                        </span>
                                    </div>
                                    <div className="mt-2 h-1 w-full bg-muted/20 rounded-full overflow-hidden">
                                        <div className={`h-full ${issue.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`} style={{ width: issue.severity === 'critical' ? '100%' : '70%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floaties */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl border border-border/40 bg-[#0B0E14] shadow-2xl flex flex-col items-center gap-1 animate-bounce">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-[8px] font-black uppercase tracking-tighter">PDF EXPORT</span>
            </div>

            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl border border-border/40 bg-[#0B0E14] shadow-2xl flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase">Ready to fix</p>
                    <p className="text-[8px] text-muted-foreground mt-0.5">Normalization Complete</p>
                </div>
            </div>
        </div>
    );
}

// Custom style for the loading simulation
const styles = `
@keyframes loading {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}
`;
