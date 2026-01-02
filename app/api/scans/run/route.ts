import { NextResponse } from "next/server";
import { processScan } from "@/lib/orchestrator";

export async function POST(req: Request) {
    try {
        const { scanId } = await req.json();

        if (!scanId) {
            return NextResponse.json({ error: "Scan ID is required" }, { status: 400 });
        }

        // Run the orchestrator in the background
        // In a real production app, this should be a background worker or edge function
        // For V0.1, we'll kick it off here and not await it if we want to return fast
        // However, since we want to show it running, we won't block the response
        processScan(scanId).catch(console.error);

        return NextResponse.json({ success: true, message: "Scan processing started" });
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
