# ai-athletic-ecosystem
AI-powered athletic training ecosystem with personalised planning and safeguarding
---

## Overview

The AI Athletic Ecosystem is a modular platform designed to help athletes improve performance across multiple sports and gym-based training.

The system combines:
- Universal athlete profiling
- Sport-specific intake modules
- AI-generated weekly training plans
- Safety-first progression and recovery logic

The long-term vision includes verified coaches, safeguarding features, and adaptive progression over time.

---

## Core Features

- Universal athlete profile (schedule, access, goals, constraints)
- Sport-specific modules (e.g. football, gym performance)
- AI-generated weekly training plans
- Recovery and injury-awareness built into planning
- Scalable architecture for adding new sports

---

## Tech Stack

### Frontend
- React + TypeScript  
- Hosted on Cloudflare Pages

### Backend
- TypeScript  
- Cloudflare Workers (serverless API)

### Database & Auth
- PostgreSQL (Supabase)  
- Supabase Auth (JWT-based)

### AI
- Prompt-based AI orchestration  
- Gemini API  
- Modular rule + AI hybrid design

---

## Architecture Principles

- **Modular**: New sports are added as modules, not rewrites
- **Safety-first**: Load management, recovery, and injury awareness
- **Scalable**: Designed to grow from MVP to production platform
- **Audit-friendly**: Clear logic and data structures

---

## Project Structure (Planned)

```text
ai-athletic-ecosystem/
├── web/                # Frontend (React + TypeScript)
├── worker/             # Backend API (Cloudflare Workers)
├── supabase/           # Database schema & policies
├── prompts/            # AI prompt modules
└── docs/               # Architecture and planning docs
