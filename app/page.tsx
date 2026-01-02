import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Testimonials } from "@/components/landing/Testimonials";
import { PricingFAQ } from "@/components/landing/PricingFAQ";
import { Footer } from "@/components/landing/Footer";

import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isLoggedIn = !!user;

    return (
        <div className="flex flex-col min-h-screen bg-[#0B0E14] text-foreground">
            <header className="px-6 h-16 flex items-center border-b border-border/40 bg-[#0B0E14]/50 backdrop-blur sticky top-0 z-50">
                <Link className="flex items-center justify-center gap-2" href="/">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl tracking-tighter text-white">ATLAS</span>
                </Link>
                <nav className="ml-auto flex items-center gap-6">
                    <Link className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors hidden sm:block" href="#features">
                        Features
                    </Link>
                    <Link className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors hidden sm:block" href="#pricing">
                        Pricing
                    </Link>
                    {!isLoggedIn && (
                        <Link className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors" href="/auth">
                            Sign In
                        </Link>
                    )}
                    <Button asChild size="sm" className="rounded-full px-5 font-black text-[9px] uppercase tracking-[0.2em] glow-hover transition-all bg-primary text-white hover:bg-primary/90">
                        <Link href={isLoggedIn ? "/dashboard" : "/auth"}>
                            {isLoggedIn ? "Dashboard" : "Start Now"}
                        </Link>
                    </Button>
                </nav>
            </header>

            <main className="flex-1">
                <Hero isLoggedIn={isLoggedIn} />
                <TrustStrip />

                <div id="problem">
                    <ProblemSolution />
                </div>

                <HowItWorks />

                <div id="features">
                    <FeaturesGrid />
                </div>

                <Testimonials />

                {/* Final Call to Action Section */}
                <section className="py-32 bg-[#0B0E14] relative overflow-hidden border-t border-border/40">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
                    <div className="container relative px-4 mx-auto text-center space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white text-balance">
                                Stop stitching tools together.
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto font-medium text-lg">
                                Run real API security intelligence in minutes, not weeks. <br />
                                Start your assessment now.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <Button asChild size="lg" className="h-16 px-12 rounded-full text-xl font-black bg-primary text-white hover:bg-primary/90 shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all glow-hover">
                                <Link href={isLoggedIn ? "/dashboard" : "/auth"}>
                                    {isLoggedIn ? "Go to Dashboard" : "Run Your First Scan"}
                                    <ArrowRight className="ml-3 h-6 w-6" />
                                </Link>
                            </Button>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
                                No credit card. Cancel anytime.
                            </p>
                        </div>
                    </div>
                </section>

                <div id="pricing">
                    <PricingFAQ />
                </div>
            </main>

            <Footer />
        </div>
    );
}
