"use client";

import { Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export function PricingFAQ() {
    const faqs = [
        {
            q: "Is this a replacement for security tools?",
            a: "No. ATLAS orchestrates and unifies them. You still get best-in-class engines (Metlo, Akto, etc.), but with a single control plane and normalized results.",
        },
        {
            q: "Do you run scans against production APIs?",
            a: "Yes, safely. You control the targets, authentication methods, and engine selection. We recommend staging/dev for destructive engines (like fuzzers).",
        },
        {
            q: "How is this different from a vulnerability scanner?",
            a: "A typical scanner runs one engine. ATLAS is an orchestration layer that runs multiple engines simultaneously and normalizes their conflicting outputs into one report.",
        },
        {
            q: "Is my data secure?",
            a: "Absolutely. Each scan runs in an isolated environment. Your credentials are encrypted and never stored in plain text. We do not retain cross-tenant access.",
        },
    ];

    return (
        <section className="py-24 md:py-32 bg-muted/10 border-t border-border/40">
            <div className="container px-4 mx-auto">
                {/* Pricing Tiers */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
                    {/* Free Tier */}
                    <div className="p-8 rounded-3xl border border-border bg-card/50 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-widest mb-8">
                                Starter
                            </div>
                            <div className="mb-8">
                                <span className="text-5xl font-black">$0</span>
                                <span className="text-muted-foreground ml-2">/ month</span>
                                <p className="text-sm text-muted-foreground mt-4">For individuals and early teams getting started with orchestration.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "1 Active Project",
                                    "Limited scans per month",
                                    "Metlo, Akto, PentestGPT included",
                                    "Standard Unified Report",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <Check className="h-4 w-4 text-success" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button asChild className="w-full rounded-full h-12">
                            <Link href="/auth">Start Free</Link>
                        </Button>
                    </div>

                    {/* Pro tier */}
                    <div className="p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-4 right-4 rotate-12 opacity-10 group-hover:rotate-0 transition-transform duration-500">
                            <Zap className="h-24 w-24 text-primary fill-primary" />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest mb-8">
                                Pro (Coming Soon)
                            </div>
                            <div className="mb-8">
                                <span className="text-2xl font-black italic">Usage-based</span>
                                <p className="text-sm text-muted-foreground mt-4">For growing companies requiring enterprise-grade security oversight.</p>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Unlimited Projects",
                                    "Automated Scan Scheduling",
                                    "Webhook & Alerting integrations",
                                    "Team Access Management",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm">
                                        <Check className="h-4 w-4 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full rounded-full h-12 border-primary/50 text-primary hover:bg-primary hover:text-white"
                            onClick={() => alert("Registration for the Pro waitlist is coming soon!")}
                        >
                            Join the Waitlist
                        </Button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Straight answers. No fluff.</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`faq-${i}`} className="border-border/60">
                                <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-primary transition-colors">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
