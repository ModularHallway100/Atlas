⚡ PROJECT CODE NAME

ATLAS

The orchestration layer for API security intelligence

Tagline for investors:

“Stripe for API security engines.”

0) NON-NEGOTIABLE GOAL OF V0.1

V0.1 does one thing insanely well:

Take an API endpoint → run multiple security engines → return a single, normalized, executive-level risk view in minutes.

Not:

Not a full pentesting platform

Not enterprise policy management

Not SIEM

Not compliance theater

This is pre-decision intelligence for engineers, founders, and security leads.

If you can’t explain it in one sentence, it’s trash.

1) INVESTOR FOMO THESIS (WHY THIS IS DANGEROUSLY BIG)

Investors should immediately see:

Security tooling is fragmented

Open-source engines are powerful but unusable

Nobody owns the orchestration layer

Normalization + automation = defensibility

Every API company needs this

ATLAS is positioned as:

The layer that decides what security tools to run, when, and why.

That’s platform territory.

2) MVP SCOPE (V0.1 — HARD CONSTRAINTS)
What V0.1 MUST DO

✅ User signs up
✅ Creates a project
✅ Adds ONE API target
✅ Selects engines
✅ Runs a scan
✅ Sees one unified risk report

What V0.1 MUST NOT DO

❌ No enterprise compliance
❌ No custom policies
❌ No SOC dashboards
❌ No RBAC complexity
❌ No “AI magic” hand-waving

Restraint = credibility.

3) CORE USER PERSONA

Primary user

Senior engineer / tech founder / security lead

Knows APIs

Hates setting up security tools

Wants fast signal, not noise

Investor takeaway

“This spreads bottom-up through developers, then moves upmarket.”

4) SYSTEM ARCHITECTURE (HIGH LEVEL)
[ Next.js Frontend ]
        |
        v
[ Orchestrator API ]
        |
        v
[ Engine Adapters ]
  |      |      |
Metlo  Akto  PentestGPT
        |
        v
[ Normalization Layer ]
        |
        v
[ Supabase (Postgres + Auth + Storage) ]
The Orchestrator + Normalizer is the moat.

5) FRONTEND — DESIGN BLUEPRINT
Design Philosophy

Dark, serious, technical

Feels like Datadog + Linear

No fluff, no gradients, no marketing BS

Stack

Next.js (App Router)

Tailwind CSS

Radix UI primitives

Server Components by default

5.1 Frontend Pages & Flow
1️⃣ Landing Page (Minimal, FOMO-driven)

Sections:

Headline:
“One API. Multiple Security Engines. One Truth.”

Subtext:
Run Metlo, Akto, PentestGPT together. Get one risk view.

CTA: Run your first scan

Logos: engines you support (credibility hack)

No pricing. No features list. Mystery > explanation.

2️⃣ Auth

Magic link only (Supabase)

No passwords

Speed > security theater

3️⃣ Dashboard (Empty State Matters)

Empty state copy:

“Security insights appear here once you scan an API.”

Button:

+ New Scan

This tells investors you understand UX.

4️⃣ New Scan Flow (Core UX)

Step-by-step wizard:

Step 1: Project

Project name

Environment (Prod / Staging)

Step 2: API Target

Base URL

Auth method:

None

API Key

Bearer Token

Step 3: Engine Selection

Checkboxes:

Metlo (API Observability)

Akto (Fuzzing)

PentestGPT (LLM-based Pentest)

Each has:

What it finds

Expected runtime

This subtly educates users.

Step 4: Run Scan

Button:

“Run Security Intelligence”

Language matters.

5️⃣ Results Page (THE MONEY SHOT)

This is where investors get FOMO.

Top Summary Card

Overall Risk Score (0–100)

Critical / High / Medium counts

Engines used

Scan duration

Risk Timeline

Chronological findings

Normalized severity

Issue Detail Drawer

Click an issue → see:

Description

Affected endpoint

Evidence

Recommended fix

Engine Attribution (Transparency)

Each issue shows:

“Detected by: Akto + PentestGPT”

This builds trust.

6) BACKEND — TECH & LAYERS
6.1 Stack
| Layer          | Tech                              |
| -------------- | --------------------------------- |
| API            | Next.js API Routes                |
| Auth           | Supabase Auth                     |
| DB             | Supabase Postgres                 |
| Workers        | Node.js                           |
| Engine Runtime | Docker containers                 |
| Queue          | Simple DB-backed job queue (V0.1) |
No Kubernetes yet. Investors like restraint.

6.2 Backend Layers
1️⃣ API Layer

Handles:

User actions

Scan creation

Status polling

2️⃣ Orchestrator

Responsibilities:

Accept scan config

Dispatch engines

Track execution state

Handle failures

3️⃣ Engine Adapters

Each engine gets:

Input transformer

Runner

Output parser

4️⃣ Normalization Layer (CORE IP)

All engine outputs become:

{
  "issue_id": "uuid",
  "engine": "akto",
  "severity": "high",
  "title": "Broken Object Level Auth",
  "endpoint": "POST /api/user",
  "evidence": "...",
  "recommendation": "..."
}


This is what you sell.

7) DATABASE SCHEMA (SUPABASE)
users

Handled by Supabase

projects
id (uuid)
user_id
name
environment
created_at

scans
id
project_id
status (pending/running/completed/failed)
risk_score
created_at

scan_engines
id
scan_id
engine_name
status
runtime_ms

issues
id
scan_id
engine
severity
title
description
endpoint
evidence
recommendation


This schema screams “platform”.

8) API ENDPOINTS
POST /api/scan

Creates scan job

GET /api/scan/:id

Returns scan + issues

POST /api/engine/run

Internal engine execution

POST /api/engine/result

Engine reports results back

Clean. Predictable. Auditable.

9) APP FLOW (END TO END)

User signs up

Creates project

Configures scan

Orchestrator queues engines

Engines run in isolation

Results normalized

Risk score computed

Dashboard updates

User reviews issues

No hidden magic. Investors trust clarity.

10) SECURITY & ISOLATION (IMPORTANT SIGNAL)

Each scan runs in isolated container

No shared credentials

Rate limits on targets

Logs stored separately

You don’t need perfection, just awareness.

11) METRICS INVESTORS CARE ABOUT

Even in V0.1:

Time to first scan

Engines used per scan

Issues per scan

Repeat scans per project

This screams “we know how SaaS works”.

12) WHAT MAKES INVESTORS SWEAT

When they see:

Clean orchestration

Engine abstraction

Normalized intelligence

Developer adoption path

Obvious enterprise upsell

They’ll think:

“If this becomes the standard control plane, we’re late.”

That’s FOMO.

13) NEXT STEPS (DO NOT SKIP)

Your immediate execution order:

Implement normalized schema

Build orchestrator skeleton

Integrate ONE engine end-to-end

Ship results UI

Get 5 real users to run scans

Anything else before this is procrastination disguised as architecture.