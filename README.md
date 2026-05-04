# 🍳 ChefFind

**ChefFind** is a premium, AI-driven discovery platform designed to connect users with their ideal culinary experts. Built with a focus on fluid user experience and intelligent matching, ChefFind leverages generative AI to transform how people find chefs who align with their specific tastes, dietary needs, and lifestyle.

## 🚀 The Problem It Solves

Traditional search engines and directories provide overwhelming, unfiltered data. Users often struggle to find chefs who specialize in niche diets (like keto, vegan, or gluten-free) or specific cultural cuisines within their local area.

**ChefFind** bridges this gap by:

- **Eliminating Choice Paralysis:** Using AI to curate a shortlist of chefs based on deep preference analysis.
- **Intuitive Discovery:** Replacing clunky forms with a modern, high-fidelity interface.
- **Intent-Based Matching:** Going beyond keywords to understand the _vibe_ and _flavor profile_ a user is actually looking for.

## ✨ Key Features

- **AI-Powered Recommendations:** Integrates `@google/genai` to analyze complex user preferences and deliver personalized chef suggestions.
- **Fluid Motion UI:** A highly interactive experience powered by **Framer Motion**, featuring smooth transitions and micro-interactions.
- **Responsive Modern Design:** Crafted with **Tailwind CSS 4** for a clean, minimalist, and mobile-first aesthetic.
- **Type-Safe Architecture:** Fully implemented in **TypeScript** to ensure reliability and maintainability.
- **Performance Optimized:** Leverages **Next.js 16** (App Router) for lightning-fast server-side rendering and optimized client-side navigation.
- **Streamlined Forms:** Robust data handling and validation using **React Hook Form**.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Intelligence:** [Google Generative AI (Gemini API)](https://ai.google.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Setup Guide

Follow these steps to get your local development environment running:

### 1. Prerequisites

- **Node.js:** v20 or higher
- **Package Manager:** npm or pnpm
- **API Key:** A Google Gemini API key (available via Google AI Studio)

### 2. Installation

```bash
git clone https://github.com/alvy00/cheffind.git
cd cheffind
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Environment Variables

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
```
