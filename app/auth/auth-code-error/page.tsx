import Link from "next/link";
import { Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthErrorPage({ searchParams }: { searchParams: { message?: string } }) {
    const errorMessage = searchParams.message || "We couldn't verify your login. This usually happens if the link expired or was already used.";

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Authentication Error</CardTitle>
                    <CardDescription>
                        {errorMessage}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                        Please try signing in again. If the problem persists, ensure your GitHub account has a primary email address verified.
                    </p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Button asChild className="w-full">
                        <Link href="/auth">Back to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
