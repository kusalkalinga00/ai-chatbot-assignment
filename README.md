# Ashoka Hospital AI Chatbot

An AI-powered virtual assistant for Ashoka Hospital, built with Next.js and OpenAI. The chatbot uses Retrieval-Augmented Generation (RAG) to answer questions about hospital services, schedules, and facilities based on a managed knowledge base.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [API Reference](#api-reference)
- [Knowledge Base Management](#knowledge-base-management)

---

## Features

- **Conversational AI** – Streams responses from OpenAI GPT-4o-mini in real time.
- **RAG (Retrieval-Augmented Generation)** – Answers are grounded in a hospital-specific knowledge base stored in an OpenAI Vector Store.
- **Quick Action Buttons** – One-click prompts for common queries (test packages, visiting hours, consultation services, location).
- **Admin Panel** – UI to create and sync the vector store with the latest hospital data (`data.json`).
- **Dark Mode** – System-aware theme switching powered by `next-themes`.
- **Markdown Rendering** – Assistant responses with tables and formatting are rendered correctly in the chat.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5 |
| AI / LLM | [OpenAI GPT-4o-mini](https://platform.openai.com/docs/models) |
| AI SDK | [Vercel AI SDK](https://sdk.vercel.ai/) (`ai`, `@ai-sdk/openai`, `@ai-sdk/react`) |
| Vector Store | OpenAI Vector Stores (File Search API) |
| LangChain | `langchain`, `@langchain/openai` |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer-motion.com/) |
| Forms | React Hook Form + Zod |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Project Structure

```
ai-chatbot-assignment/
├── public/                         # Static assets
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   ├── create-vector-store.action.ts   # Server action: create & populate vector store
│   │   │   ├── retrieve-vector-store.action.ts # Server action: search vector store & generate answer
│   │   │   └── data.json                       # Hospital knowledge base (source of truth)
│   │   ├── admin/
│   │   │   └── page.tsx                        # Admin page for knowledge base management
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts                    # POST /api/chat – streaming chat endpoint
│   │   ├── globals.css
│   │   ├── layout.tsx                          # Root layout with ThemeProvider
│   │   └── page.tsx                            # Main chat page
│   ├── components/
│   │   ├── custom/
│   │   │   ├── ChatView.tsx                    # Chat interface with message list & input
│   │   │   ├── Header.tsx                      # Page header
│   │   │   ├── KnowladgeBaseView.tsx           # Admin UI for vector store actions
│   │   │   ├── MessageComp.tsx                 # Individual chat message renderer
│   │   │   └── QuickAction.tsx                 # Quick-action chip button
│   │   └── ui/                                 # shadcn/ui primitives
│   ├── lib/
│   │   └── utils.ts                            # Tailwind class merge utility
│   ├── providers/
│   │   └── theme-provider.tsx                  # next-themes wrapper
│   └── types/
│       └── index.ts                            # Shared TypeScript types
├── .env.local                                  # Local environment variables (not committed)
├── env.sample.txt                              # Environment variable template
├── components.json                             # shadcn/ui configuration
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Architecture Overview

```
Browser
  │
  ├─► GET /          → Chat UI (ChatView)
  │       │
  │       └─► POST /api/chat   (streaming)
  │               │
  │               ├─► OpenAI GPT-4o-mini  (streamText)
  │               │       │
  │               │       └─► Tool: getInformations
  │               │               │
  │               │               └─► retrieveVectorStore (Server Action)
  │               │                       │
  │               │                       ├─► OpenAI Vector Store (search)
  │               │                       └─► GPT-4o-mini (summarise results)
  │
  └─► GET /admin    → Admin UI (KnowladgeBaseView)
          │
          ├─► createVectorStore  (Server Action)
          │       └─► Uploads data.json → OpenAI Vector Store
          │
          └─► retrieveVectorStore (Server Action) [test fetch]
```

**RAG flow:**
1. The chat API receives a user message and calls `streamText` with the `getInformations` tool.
2. When the model decides to use the tool, `retrieveVectorStore` searches the OpenAI Vector Store with the user's query.
3. The raw search results are passed back to GPT-4o-mini, which summarises them into a markdown response.
4. The formatted answer is streamed back to the browser.

---

## Prerequisites

- **Node.js** v20 or higher
- **npm** v10 or higher
- **OpenAI API key** with access to:
  - Chat Completions API (GPT-4o-mini)
  - Vector Stores API (File Search)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kusalkalinga00/ai-chatbot-assignment.git
cd ai-chatbot-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the sample file and fill in your key:

```bash
cp env.sample.txt .env.local
```

Edit `.env.local`:

```plaintext
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Initialise the knowledge base (first time only)

Before users can chat, the hospital data must be uploaded to an OpenAI Vector Store:

1. Start the development server: `npm run dev`
2. Open `http://localhost:3000/admin` in your browser.
3. Click the **"create"** button to upload `src/app/actions/data.json` to the OpenAI Vector Store.
4. Wait for the confirmation in the browser console.

> **Note:** This step only needs to be repeated when the knowledge base (`data.json`) is updated.

### 5. Start the development server

```bash
npm run dev
```

### 6. Open the application

Navigate to `http://localhost:3000` in your browser.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | ✅ Yes | OpenAI secret API key used for chat completions and vector store access. |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack hot-reload on `http://localhost:3000` |
| `npm run build` | Compile and optimise the application for production |
| `npm run start` | Serve the production build (requires `npm run build` first) |
| `npm run lint` | Run ESLint across the project |

---

## Pages & Routes

| Path | Type | Description |
|---|---|---|
| `/` | Page | Main chat interface for end users |
| `/admin` | Page | Admin panel for managing the knowledge base |
| `/api/chat` | API Route (POST) | Streaming chat endpoint consumed by the AI SDK `useChat` hook |

---

## Key Components

### `ChatView`
Client component that drives the full chat experience. Uses the `useChat` hook from `@ai-sdk/react` to stream messages from `/api/chat`. Renders quick-action chips, a scrollable message history, and a text input form.

### `MessageComp`
Renders a single chat message. Differentiates between `user` and `assistant` roles and renders markdown content (including tables) from assistant replies.

### `QuickAction`
A small chip/button component that pre-fills the chat input with a preset question when clicked.

### `Header`
Top navigation bar displaying the hospital assistant branding.

### `KnowladgeBaseView`
Admin UI component with two actions:
- **Create** – calls `createVectorStore` to upload `data.json` to an OpenAI Vector Store.
- **Fetch** – calls `retrieveVectorStore` with a test query to verify the vector store is working.

---

## API Reference

### `POST /api/chat`

Accepts a conversation history and streams an AI-generated response.

**Request body:**

```json
{
  "messages": [
    { "role": "user", "content": "What are the visiting hours?" }
  ]
}
```

**Response:** A streaming `text/event-stream` (Vercel AI SDK data stream format).

The endpoint uses the `getInformations` tool internally; clients do not need to call the tool directly.

---

## Knowledge Base Management

Hospital information is stored in `src/app/actions/data.json` and served via an OpenAI Vector Store.

**To update the knowledge base:**

1. Edit `src/app/actions/data.json` with the new or updated hospital information.
2. Navigate to `/admin` and click **"create"** to re-upload the file to a new vector store.
3. The chatbot will automatically use the most recently created vector store (the first entry returned by the Vector Stores list API).
