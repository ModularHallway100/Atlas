import Link from "next/link";
import { Plus, LayoutDashboard, History, Settings, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null; // Should be handled by middleware
    }

    const { data: projectsData } = await supabase
        .from("projects")
        .select("*, scans(count)")
        .order("created_at", { ascending: false });

    const projects = (projectsData || []) as any[];

    const { data: recentScansData } = await supabase
        .from("scans")
        .select("*, projects(name)")
        .order("created_at", { ascending: false })
        .limit(5);

    const recentScans = (recentScansData || []) as any[];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/40 bg-muted/30 hidden md:block">
                <div className="flex h-14 items-center px-6 border-b border-border/40">
                    <Shield className="h-6 w-6 mr-2 text-primary" />
                    <span className="font-bold tracking-tighter">ATLAS</span>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link href="/scans" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
                        <History className="h-4 w-4" />
                        Scan History
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-muted-foreground text-sm font-medium transition-colors">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-14 flex items-center justify-between px-8 border-b border-border/40">
                    <h1 className="font-semibold">Security Intelligence Dashboard</h1>
                    <Button asChild size="sm" className="rounded-full">
                        <Link href="/scan/new">
                            <Plus className="h-4 w-4 mr-2" />
                            New Scan
                        </Link>
                    </Button>
                </header>

                <div className="p-8 space-y-8">
                    {/* Projects Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight">Active Projects</h2>
                        </div>

                        {(!projects || projects.length === 0) ? (
                            <Card className="border-dashed border-2 bg-transparent">
                                <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                                    <div className="p-4 rounded-full bg-muted">
                                        <Target className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium text-lg">No projects yet</p>
                                        <p className="text-muted-foreground max-w-sm">
                                            Security insights appear here once you scan an API. Create your first project to get started.
                                        </p>
                                    </div>
                                    <Button asChild variant="outline">
                                        <Link href="/scan/new">Create First Project</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {projects.map((project) => (
                                    <Card key={project.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                                        <CardHeader className="p-4">
                                            <div className="flex items-center justify-between">
                                                <Badge variant={project.environment === 'production' ? 'destructive' : 'secondary'} className="uppercase text-[10px]">
                                                    {project.environment}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{new Date(project.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <CardTitle className="text-lg mt-2">{project.name}</CardTitle>
                                            <CardDescription>
                                                {project.scans?.[0]?.count || 0} scan(s) performed
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Recent Scans Section */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold tracking-tight">Recent Intelligence</h2>
                        <Card>
                            <div className="divide-y divide-border/40">
                                {!recentScans || recentScans.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        No scans performed yet.
                                    </div>
                                ) : (
                                    recentScans.map((scan) => (
                                        <Link key={scan.id} href={`/scan/${scan.id}`} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${scan.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' :
                                                    scan.status === 'running' ? 'border-blue-500/20 bg-blue-500/5 text-blue-500 animate-pulse' :
                                                        'border-muted bg-muted/20 text-muted-foreground'
                                                    }`}>
                                                    <History className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{scan.projects?.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(scan.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {scan.status === 'completed' && (
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold">Score: {scan.risk_score}</p>
                                                        <p className="text-[10px] text-muted-foreground">Risk Intel</p>
                                                    </div>
                                                )}
                                                <Badge variant={
                                                    scan.status === 'completed' ? 'success' :
                                                        scan.status === 'running' ? 'info' :
                                                            scan.status === 'failed' ? 'error' : 'secondary'
                                                } className="capitalize">
                                                    {scan.status}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </Card>
                    </section>
                </div>
            </main>
        </div>
    );
}
