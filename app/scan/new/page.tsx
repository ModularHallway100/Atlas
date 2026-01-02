"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight, ArrowLeft, Globe, Zap, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";

const steps = [
    { id: 1, title: "Project" },
    { id: 2, title: "Target" },
    { id: 3, title: "Engines" },
    { id: 4, title: "Run" },
];

export default function NewScanPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    // Form State
    const [projectName, setProjectName] = useState("");
    const [environment, setEnvironment] = useState<"production" | "staging">("staging");
    const [targetUrl, setTargetUrl] = useState("");
    const [authType, setAuthType] = useState<"none" | "api_key" | "bearer">("none");
    const [authValue, setAuthValue] = useState("");
    const [selectedEngines, setSelectedEngines] = useState(["metlo", "akto", "pentestgpt"]);

    const handleNext = () => setStep((s) => Math.min(s + 1, 4));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const toggleEngine = (id: string) => {
        setSelectedEngines((prev) =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    const handleRunScan = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Unauthorized");

            // 1. Create or get project
            const { data: project, error: pError } = await (supabase
                .from("projects") as any)
                .insert({
                    user_id: user.id,
                    name: projectName,
                    environment
                })
                .select()
                .single();

            if (pError) throw pError;

            // 2. Create target
            const { data: target, error: tError } = await (supabase
                .from("api_targets") as any)
                .insert({
                    project_id: project.id,
                    base_url: targetUrl,
                    auth_type: authType,
                    auth_value: authValue || null
                })
                .select()
                .single();

            if (tError) throw tError;

            // 3. Create scan
            const { data: scan, error: sError } = await (supabase
                .from("scans") as any)
                .insert({
                    project_id: project.id,
                    api_target_id: target.id,
                    status: "pending"
                })
                .select()
                .single();

            if (sError) throw sError;

            // 4. Create scan engines
            const engineInserts = selectedEngines.map(e => ({
                scan_id: scan.id,
                engine_name: e as any,
                status: "pending" as any
            }));

            await (supabase.from("scan_engines") as any).insert(engineInserts);

            // 5. Trigger Orchestrator (Server Action or Route Handler)
            await fetch("/api/scans/run", {
                method: "POST",
                body: JSON.stringify({ scanId: scan.id }),
                headers: { "Content-Type": "application/json" }
            });

            router.push(`/scan/${scan.id}`);
        } catch (error) {
            console.error("Failed to start scan:", error);
            alert("Failed to start scan. Please check your inputs.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl space-y-8">
                {/* Progress Header */}
                <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold tracking-tighter">ATLAS Intelligence Wizard</span>
                    </div>
                    <div className="flex justify-between max-w-sm mx-auto">
                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors ${step >= s.id ? "border-primary bg-primary text-primary-foreground" : "border-muted text-muted-foreground"
                                    }`}>
                                    {s.id}
                                </div>
                                <span className={`text-[10px] uppercase font-bold tracking-wider ${step >= s.id ? "text-primary" : "text-muted-foreground"
                                    }`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                    {step === 1 && (
                        <>
                            <CardHeader>
                                <CardTitle>Project Configuration</CardTitle>
                                <CardDescription>Tell us which project or microservice this scan belongs to.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Project Name</label>
                                    <Input
                                        placeholder="e.g. Identity Service, Payments VPC"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Environment</label>
                                    <div className="flex gap-4">
                                        <Button
                                            variant={environment === "production" ? "default" : "outline"}
                                            className="flex-1"
                                            onClick={() => setEnvironment("production")}
                                        >
                                            Production
                                        </Button>
                                        <Button
                                            variant={environment === "staging" ? "default" : "outline"}
                                            className="flex-1"
                                            onClick={() => setEnvironment("staging")}
                                        >
                                            Staging
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <CardHeader>
                                <CardTitle>API Target</CardTitle>
                                <CardDescription>Specify the base URL and authentication required to access the API.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Base URL</label>
                                    <Input
                                        placeholder="https://api.example.com"
                                        value={targetUrl}
                                        onChange={(e) => setTargetUrl(e.target.value)}
                                    />
                                    <p className="text-[10px] text-muted-foreground">e.g. https://api.prd.company.com/v1</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Auth Method</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button variant={authType === 'none' ? 'default' : 'outline'} size="sm" onClick={() => setAuthType('none')}>None</Button>
                                        <Button variant={authType === 'api_key' ? 'default' : 'outline'} size="sm" onClick={() => setAuthType('api_key')}>API Key</Button>
                                        <Button variant={authType === 'bearer' ? 'default' : 'outline'} size="sm" onClick={() => setAuthType('bearer')}>Bearer Token</Button>
                                    </div>
                                </div>
                                {authType !== 'none' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{authType === 'bearer' ? 'Token' : 'Key'} Value</label>
                                        <Input type="password" value={authValue} onChange={(e) => setAuthValue(e.target.value)} />
                                    </div>
                                )}
                            </CardContent>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <CardHeader>
                                <CardTitle>Security Engines</CardTitle>
                                <CardDescription>Select the specialized engines to orchestrate for this scan.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4">
                                    {[
                                        { id: 'metlo', title: 'Metlo', desc: 'API Observability & Shadow API Detection', icon: <Globe className="h-4 w-4" />, runtime: '2-3 min' },
                                        { id: 'akto', title: 'Akto', desc: 'Business Logic & BOLA Fuzzing', icon: <Zap className="h-4 w-4" />, runtime: '3-5 min' },
                                        { id: 'pentestgpt', title: 'PentestGPT', desc: 'LLM-based Reasoning & Exploit Chain discovery', icon: <Lock className="h-4 w-4" />, runtime: '5-8 min' },
                                    ].map((engine) => (
                                        <div
                                            key={engine.id}
                                            className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${selectedEngines.includes(engine.id) ? "border-primary bg-primary/5" : "border-border/40 hover:border-border"
                                                }`}
                                            onClick={() => toggleEngine(engine.id)}
                                        >
                                            <div className="mt-1">
                                                <Checkbox checked={selectedEngines.includes(engine.id)} onCheckedChange={() => toggleEngine(engine.id)} />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    {engine.icon}
                                                    <span className="font-bold">{engine.title}</span>
                                                    <Badge variant="outline" className="ml-auto text-[10px]">{engine.runtime}</Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{engine.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <CardHeader>
                                <CardTitle>Review & Execute</CardTitle>
                                <CardDescription>Confirm the configuration and launch the intelligence routine.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 rounded-lg border border-border/40 p-6 bg-muted/20">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">Project</p>
                                            <p className="font-medium">{projectName}</p>
                                            <Badge variant={environment === 'production' ? 'destructive' : 'secondary'} className="mt-1 uppercase text-[10px]">{environment}</Badge>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider mb-1">Target</p>
                                            <p className="font-medium truncate">{targetUrl}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Auth: {authType}</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-border/40">
                                        <p className="text-muted-foreground text-xs uppercase font-bold tracking-wider mb-2">Engines Enqueued</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedEngines.map(e => (
                                                <Badge key={e} variant="outline" className="capitalize">{e}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    )}

                    <CardFooter className="flex justify-between border-t border-border/40 p-6">
                        <Button variant="ghost" onClick={handleBack} disabled={step === 1 || isLoading}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        {step < 4 ? (
                            <Button onClick={handleNext} disabled={
                                (step === 1 && !projectName) ||
                                (step === 2 && !targetUrl) ||
                                (step === 3 && selectedEngines.length === 0)
                            }>
                                Next Step
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        ) : (
                            <Button className="rounded-full px-8" onClick={handleRunScan} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Initializing engines...
                                    </>
                                ) : (
                                    "Run Security Intelligence"
                                )}
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
