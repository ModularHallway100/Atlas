import { Issue } from "@/lib/types";
import { MetloOutput } from "./engines/metlo";
import { AktoOutput } from "./engines/akto";
import { PentestGPTOutput } from "./engines/pentestgpt";

export function normalizeMetlo(scanId: string, output: MetloOutput): Omit<Issue, "id" | "created_at">[] {
    return output.findings.map((f) => ({
        scan_id: scanId,
        engine: "metlo",
        severity: f.severity as any,
        title: f.title,
        description: f.description,
        endpoint: f.endpoint,
        evidence: f.evidence,
        recommendation: f.recommendation,
    }));
}

export function normalizeAkto(scanId: string, output: AktoOutput): Omit<Issue, "id" | "created_at">[] {
    return output.vulnerabilities.map((v) => ({
        scan_id: scanId,
        engine: "akto",
        severity: v.severityLabel.toLowerCase() === 'critical' ? 'critical' : v.severityLabel.toLowerCase() as any,
        title: v.name,
        description: v.desc,
        endpoint: v.url,
        evidence: v.details,
        recommendation: v.fix,
    }));
}

export function normalizePentestGPT(scanId: string, output: PentestGPTOutput): Omit<Issue, "id" | "created_at">[] {
    return output.results.map((r) => ({
        scan_id: scanId,
        engine: "pentestgpt",
        severity: r.risk_level.toLowerCase() as any,
        title: r.vulnerability_title,
        description: r.impact_analysis,
        endpoint: r.affected_resource,
        evidence: r.proof_of_concept,
        recommendation: r.mitigation_steps,
    }));
}

export function calculateRiskScore(issues: Omit<Issue, "id" | "created_at">[]): number {
    if (issues.length === 0) return 100;

    const weights = {
        critical: 10,
        high: 5,
        medium: 2,
        low: 1,
    };

    let actualDeduction = 0;
    issues.forEach((issue) => {
        actualDeduction += weights[issue.severity] || 0;
    });

    const score = Math.max(0, 100 - actualDeduction);
    return Math.round(score);
}

export function deduplicateIssues(issues: Omit<Issue, "id" | "created_at">[]): Omit<Issue, "id" | "created_at">[] {
    const merged: Record<string, Omit<Issue, "id" | "created_at">> = {};

    issues.forEach((issue) => {
        // Unique key based on endpoint and title
        const key = `${issue.endpoint}|${issue.title}`.toLowerCase();

        if (merged[key]) {
            // Merge engine names if not already present
            const engines = merged[key].engine.split(", ");
            if (!engines.includes(issue.engine)) {
                merged[key].engine = [...engines, issue.engine].join(", ");
            }
        } else {
            merged[key] = { ...issue };
        }
    });

    return Object.values(merged);
}
