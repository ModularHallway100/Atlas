"use client";

import { useState } from "react";
import { Shield, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const handleGithubLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    scopes: 'read:user user:email',
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || "Failed to sign in with GitHub");
            setIsLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setIsSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send magic link");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md border-border/40">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Shield className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle>Check your email</CardTitle>
                        <CardDescription>
                            We've sent a magic link to <strong>{email}</strong>.
                            Click the link to sign in to ATLAS.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button variant="ghost" onClick={() => setIsSent(false)}>
                            Back to Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-6">
                        <Shield className="h-10 w-10 text-primary mr-2" />
                        <span className="text-3xl font-bold tracking-tighter">ATLAS</span>
                    </div>
                    <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to receive a magic link. <br /> No passwords required.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-destructive text-center">{error}</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full h-11" type="submit" disabled={isLoading}>
                            {isLoading ? "Sending link..." : "Send Magic Link"}
                        </Button>

                        <div className="relative w-full py-2">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border/60" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground font-bold tracking-widest">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            className="w-full h-11 border-border/60 hover:bg-muted font-bold"
                            onClick={handleGithubLogin}
                            disabled={isLoading}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            Sign in with GitHub
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
