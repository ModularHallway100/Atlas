"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12 border-t border-border/40 bg-card/20">
            <div className="container px-4 mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-primary" />
                            <span className="font-bold text-xl tracking-tighter">ATLAS</span>
                        </Link>
                        <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
                            The security orchestration layer for modern API teams.
                            Run every engine. Get one answer.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Product</h4>
                        <ul className="space-y-2 text-sm font-medium">
                            <li><Link href="/auth" className="hover:text-primary transition-colors">SignIn</Link></li>
                            <li><Link href="/auth" className="hover:text-primary transition-colors">Get Started</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Legal</h4>
                        <ul className="space-y-2 text-sm font-medium">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        © 2025 ATLAS Security Orchestration. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="https://github.com" className="text-muted-foreground hover:text-white transition-colors"><Github className="h-5 w-5" /></Link>
                        <Link href="https://twitter.com" className="text-muted-foreground hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                        <Link href="https://linkedin.com" className="text-muted-foreground hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
