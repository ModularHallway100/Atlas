1) What you actually want (clarified)

Right now you listed these:

Metlo — API observability & security

PentestGPT — automated penetration testing

Akto — API security fuzzing / testing

vulnapi — vulnerability scanning

autoswagger — automated API spec generation

These are related but different utilities. You don’t just “join them in a repo”. You need a platform that smartly orchestrates these engines based on user intent.

Product vision (refined)

A Unified API Security Platform that:

Lets users plug in multiple analysis engines

Centralizes results in a dashboard

Normalizes findings into a common schema

Automates continuous scanning

Offers remediation guidance

Is simple to self-host or use as SaaS

Think “Zapier for API Security Engines”, not a Frankenstein repo.

2) Core product components

Here’s how this needs to be structured:

🚀 A) Orchestrator API Service (backend brain)

Receives user config (endpoint, auth, scan type)

Dispatches jobs to selected engines

Normalizes results into a standard format

Stores results in Supabase

This should be in TypeScript and run as a serverless API (Next.js API Routes or Supabase Edge Functions).

🧠 B) Engine Adapters

Wrappers for each tool so they behave the same way:
| Engine      | Capabilities       | Adapter Outputs                    |
| ----------- | ------------------ | ---------------------------------- |
| Metlo       | Observability      | security events, anomalies         |
| PentestGPT  | pentest automation | issues with severity & remediation |
| Akto        | fuzz testing       | input anomalies, crash reports     |
| VulnAPI     | vuln scanning      | CWEs found                         |
| Autoswagger | spec generation    | OpenAPI schemas                    |

Each adapter:

Runs the tool (locally or containerized)

Converts its output → Normalized JSON schema

Sends results back to orchestrator

This adapter layer is the core value add.

📊 C) Web UI (Next.js)

Public pages + private dashboard:

Project management

Engine selection

Scan scheduling

Results reporting

Alerts / history

UI built in Next.js with incremental static + server-side rendering.

💾 D) Database (Supabase)

Use Supabase for:

Auth (magic link / OAuth)

Projects

Engine configs

Scan results

Audit logs

Team access controls

Supabase Functions can handle compute jobs or webhook triggers.

3) Normalized Results Schema (Very important)

Without this the whole thing breaks.

{
  "scan_id": "uuid",
  "engine": "metlo | pentestgpt | akto | vulnapi",
  "target": "https://example.com/api",
  "timestamp": "ISO8601",
  "issues": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "severity": "critical | high | medium | low",
      "location": "endpoint | parameter",
      "evidence": ["string ..."],
      "recommendation": "string"
    }
  ]
}


This lets you compare apples to apples.

4) High-Level Architecture Diagram
                                +----------------+
                                |     Next.js    |
                                |   Frontend UI  |
                                +--------+-------+
                                         |
                                         v
+-------------+     +---------------+  POST /scan   +----------------+
|   Users     |     | Supabase Auth |<------------->| Orchestrator   |
+-------------+     +---------------+               | API Server     |
                                                       |            |
                     Scan Configs                     |            |
                                                       v            v
                                                  +-----------+  +-----------+
                                                  | Engine 1  |  | Engine 2  |
                                                  | Adapter   |  | Adapter   |
                                                  +-----------+  +-----------+
                                                         ...           ...
                                                                +-----------+
                                                                | Engine N  |
                                                                +-----------+
                                                                  |
                                                                  v
                                                          +-----------------+
                                                          | Supabase Storage|
                                                          +-----------------+

Engineering Stack
| Layer                | Technology                             |
| -------------------- | -------------------------------------- |
| Frontend             | Next.js (app router)                   |
| Backend              | Supabase + Edge Functions              |
| Database             | Supabase Postgres                      |
| Engine Orchestration | Node worker / serverless functions     |
| Containers           | Docker for engines that need isolation |
| Queue                | Supabase Realtime / Redis (optional)   |

7) Roadmap (30/60/90)

30 Days

Scaffold Next.js + Supabase auth

Build orchestrator skeleton

Adapter for one engine (pick Metlo first)

Normalized results store

Simple results UI

60 Days

Add adapters for PentestGPT & Akto

Scheduling & history

Team access & permissions

CLI trigger

90 Days

Marketplace of engines

Auto spec generation + coverage scoring

Alerts & Slack/Email hooks

Public SaaS launch

8) Monetization (so it’s not a random toy)

Monetize with:

Usage tiers (scans / month)

Teams & roles

Priority engine integrations

SLA for enterprise

Hosted vs self-hosted version

If users want it "free forever", make a self-hostable open-source core + paid hosted service.

9) Risks & Hard problems

Resource usage — engines like PentestGPT / fuzzers can be CPU & memory heavy
Solution: run them in containers or worker clusters.

Security — users scan real endpoints; you must isolate tenants
Solution: strict network rules + container sandboxing.

Output normalization — each tool has different output quality
Solution: define a strict schema and reject garbage.

Scaling — Supabase + serverless has limits
Solution: queueing & worker autoscaling.

10) First Action You Should Take

Stop thinking “join repos.” Instead:

Define your normalized schema.

Pick one engine adapter and wire it end-to-end.

Deploy a PoC where a user clicks ‘scan’ and sees results.

If you can’t do that in 1 week, this idea is currently too big — break it into a smaller landing-page with signup + one engine PoC.

