import { Suspense } from "react";
import Link from "next/link";
import {
    Shield,
    ArrowLeft,
    AlertCircle,
    AlertTriangle,
    Info,
    ChevronRight,
    Clock,
    Database,
    Zap,
    ExternalLink,
    Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default async function ScanResultsPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: scanData } = await (supabase
        .from("scans") as any)
        .select("*, projects(*), api_targets(*)")
        .eq("id", params.id)
        .single();

    const scan = scanData as any;

    if (!scan) return <div>Scan not found</div>;

    const { data: enginesData } = await (supabase
        .from("scan_engines") as any)
        .select("*")
        .eq("scan_id", params.id);

    const engines = enginesData as any[];

    const { data: issuesData } = await (supabase
        .from("issues") as any)
        .select("*")
        .eq("scan_id", params.id)
        .order("severity", { ascending: false });

    const issues = issuesData as any[];

    const stats = {
        critical: issues?.filter(i => i.severity === 'critical').length || 0,
        high: issues?.filter(i => i.severity === 'high').length || 0,
        medium: issues?.filter(i => i.severity === 'medium').length || 0,
        low: issues?.filter(i => i.severity === 'low').length || 0,
    };

    const durationMs = scan.completed_at && scan.created_at
        ? new Date(scan.completed_at).getTime() - new Date(scan.created_at).getTime()
        : null;
    const durationStr = durationMs ? (durationMs / 1000).toFixed(1) + "s" : "pending";

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="h-14 flex items-center px-8 border-b border-border/40 bg-card/50 backdrop-blur sticky top-0 z-10">
                <Button asChild variant="ghost" size="sm" className="mr-4">
                    <Link href="/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h1 className="font-bold tracking-tight">Intelligence Report: {scan.projects?.name}</h1>
                </div>
                <Badge variant="outline" className="ml-4 uppercase text-[10px]">{scan.status}</Badge>
            </header>

            <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
                {/* Summary Row */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-xs uppercase font-bold tracking-widest opacity-70">Risk Score</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 flex flex-col items-center">
                            <div className="text-6xl font-black">{scan.risk_score ?? "..."}</div>
                            <p className="text-xs mt-2 opacity-80 uppercase font-bold">Normalized Intelligence</p>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Finding Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 grid grid-cols-4 gap-4 mt-4">
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-red-500">{stats.critical}</p>
                                <Badge variant="error" className="text-[10px]">CRITICAL</Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-orange-500">{stats.high}</p>
                                <Badge variant="warning" className="text-[10px]">HIGH</Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-amber-500">{stats.medium}</p>
                                <Badge variant="warning" className="text-[10px]">MEDIUM</Badge>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-blue-500">{stats.low}</p>
                                <Badge variant="info" className="text-[10px]">LOW</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Scan duration</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 flex flex-col items-center justify-center">
                            <div className="flex items-center gap-2">
                                <Timer className="h-6 w-6 text-primary" />
                                <div className="text-4xl font-black">{durationStr}</div>
                            </div>
                            <p className="text-xs mt-2 text-muted-foreground uppercase font-bold">Total Execution</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Target Info & Engines */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                API Target Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Base URL</span>
                                <span className="font-mono text-xs">{scan.api_targets?.base_url}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Auth Method</span>
                                <span className="uppercase text-[10px] font-bold">{scan.api_targets?.auth_type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Scan Time</span>
                                <span>{new Date(scan.created_at).toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Engine Orchestration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 flex flex-wrap gap-2">
                            {engines?.map((engine) => (
                                <Badge key={engine.id} variant="outline" className="flex items-center gap-2 px-3 py-1 bg-muted/20">
                                    <div className={`h-1.5 w-1.5 rounded-full ${engine.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-blue-500'
                                        }`} />
                                    <span className="text-[10px] uppercase font-bold">{engine.engine_name}</span>
                                    {engine.runtime_ms && <span className="text-[8px] opacity-60">({(engine.runtime_ms / 1000).toFixed(1)}s)</span>}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Findings Timeline */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight">Risk Timeline</h2>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-muted font-bold">ALL FINDINGS</Badge>
                        </div>
                    </div>

                    <div className="space-y-4 font-sans">
                        {!issues || issues.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                No vulnerabilities detected in this intelligence cycle.
                            </div>
                        ) : (
                            issues.map((issue) => (
                                <Card key={issue.id} className="overflow-hidden group hover:border-primary/50 transition-colors border-border/40">
                                    <div className="flex flex-col md:flex-row">
                                        <div className={`w-1.5 shrink-0 ${issue.severity === 'critical' ? 'bg-red-500' :
                                            issue.severity === 'high' ? 'bg-orange-500' :
                                                issue.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                            }`} />
                                        <div className="flex-1 p-6 space-y-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant={
                                                            issue.severity === 'critical' ? 'error' :
                                                                issue.severity === 'high' ? 'warning' :
                                                                    issue.severity === 'medium' ? 'warning' : 'info'
                                                        } className="text-[10px] uppercase font-black">
                                                            {issue.severity}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground font-mono truncate max-w-[300px]">{issue.endpoint}</span>
                                                    </div>
                                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{issue.title}</h3>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest shrink-0">
                                                        Detected by:
                                                    </span>
                                                    <div className="flex gap-1">
                                                        {issue.engine.split(", ").map((e: string) => (
                                                            <Badge key={e} variant="secondary" className="text-[9px] uppercase font-black h-5">
                                                                {e}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</p>
                                                    <p className="text-sm text-balance leading-relaxed text-muted-foreground">{issue.description}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recommended Fix</p>
                                                    <div className="text-sm leading-relaxed p-4 rounded bg-muted/30 border border-border/40 font-medium">
                                                        {issue.recommendation}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        Normalized {new Date(issue.created_at).toLocaleTimeString()}
                                                    </span>
                                                </div>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                                                            View Evidence Case
                                                            <ExternalLink className="ml-2 h-3 w-3" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2">
                                                                <Shield className="h-5 w-5 text-primary" />
                                                                Evidence Case: {issue.title}
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Full payload and response analysis from {issue.engine}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="mt-4 space-y-4">
                                                            <div className="rounded-md bg-muted p-4 font-mono text-xs overflow-auto max-h-[400px]">
                                                                <div className="mb-2 text-primary font-bold uppercase tracking-widest text-[10px]">Proof of Concept (POC)</div>
                                                                <pre className="whitespace-pre-wrap">{issue.evidence}</pre>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Badge variant="outline" className="text-[10px]">AFFECTED: {issue.endpoint}</Badge>
                                                                <Badge variant="outline" className="text-[10px]">SEVERITY: {issue.severity}</Badge>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
