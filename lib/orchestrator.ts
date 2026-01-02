import { createClient } from "./supabase/server";
import { runMetlo } from "./engines/metlo";
import { runAkto } from "./engines/akto";
import { runPentestGPT } from "./engines/pentestgpt";
import {
    normalizeMetlo,
    normalizeAkto,
    normalizePentestGPT,
    calculateRiskScore,
    deduplicateIssues
} from "./normalizer";

export async function processScan(scanId: string) {
    const supabase = createClient();

    try {
        // 1. Get scan details
        const { data: scan, error: scanError } = await (supabase
            .from("scans") as any)
            .select("*, api_targets(*)")
            .eq("id", scanId)
            .single();

        if (scanError || !scan) throw new Error("Scan not found");

        // 2. Update scan status to running
        await (supabase.from("scans") as any).update({ status: "running" }).eq("id", scanId);

        // 3. Get requested engines
        const { data: engines, error: engineError } = await (supabase
            .from("scan_engines") as any)
            .select("*")
            .eq("scan_id", scanId);

        if (engineError || !engines) throw new Error("Engines not found");

        const targetUrl = (scan as any).api_targets?.base_url;
        if (!targetUrl) throw new Error("Target URL not found");

        let allIssues: any[] = [];

        // 4. Run engines in parallel (simulated)
        const enginePromises = engines.map(async (engine: any) => {
            await (supabase
                .from("scan_engines") as any)
                .update({ status: "running" })
                .eq("id", engine.id);

            const startTime = Date.now();
            let results: any[] = [];

            try {
                if (engine.engine_name === "metlo") {
                    const output = await runMetlo(targetUrl);
                    results = normalizeMetlo(scanId, output);
                } else if (engine.engine_name === "akto") {
                    const output = await runAkto(targetUrl);
                    results = normalizeAkto(scanId, output);
                } else if (engine.engine_name === "pentestgpt") {
                    const output = await runPentestGPT(targetUrl);
                    results = normalizePentestGPT(scanId, output);
                }

                const runtimeMs = Date.now() - startTime;
                allIssues = [...allIssues, ...results];

                await (supabase
                    .from("scan_engines") as any)
                    .update({
                        status: "completed",
                        runtime_ms: runtimeMs
                    })
                    .eq("id", engine.id);

            } catch (err) {
                console.error(`Engine ${engine.engine_name} failed:`, err);
                await (supabase
                    .from("scan_engines") as any)
                    .update({ status: "failed" })
                    .eq("id", engine.id);
            }
        });

        await Promise.all(enginePromises);

        // 5. Store issues in DB
        const deduplicatedIssues = deduplicateIssues(allIssues);
        if (deduplicatedIssues.length > 0) {
            await (supabase.from("issues") as any).insert(deduplicatedIssues);
        }

        // 6. Finalize scan status and score
        const riskScore = calculateRiskScore(deduplicatedIssues);
        await (supabase
            .from("scans") as any)
            .update({
                status: "completed",
                risk_score: riskScore,
                completed_at: new Date().toISOString()
            })
            .eq("id", scanId);

    } catch (error) {
        console.error("Orchestrator failed:", error);
        await (supabase
            .from("scans") as any)
            .update({ status: "failed" })
            .eq("id", scanId);
    }
}
