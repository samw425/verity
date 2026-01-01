# VERITY AI — IMPLEMENTATION PLAN

## 🎯 Current Phase: Infrastructure Setup

---

## STEP 1: Create External Accounts (Manual Steps Required)

Before we can code, you need to create these accounts:

### 1.1 GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create a new **private** repository named `verity-ai`
3. Don't initialize with README (we'll push our own)

### 1.2 Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (or use existing)
4. Create project named `verity-ai`
5. Choose a strong database password (save it!)
6. Select region closest to you
7. Once created, go to **Settings > API** and note:
   - `Project URL`
   - `anon public key`
   - `service_role key` (keep secret!)

### 1.3 Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create account with a NEW email (separate from other projects)
3. Complete verification
4. Note your **Publishable key** and **Secret key** from Dashboard > Developers > API keys

### 1.4 Cloudflare Pages Account
1. Go to [cloudflare.com](https://cloudflare.com)
2. Create a NEW account with a NEW email
3. We'll connect GitHub later for automatic deploys

### 1.5 Resend Account (Email)
1. Go to [resend.com](https://resend.com)
2. Create account
3. Get API key from dashboard

### 1.6 Google AI Studio (Gemini API)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google account
3. Get your API key

---

## STEP 2: Initialize Project (After Accounts Ready)

Once you have the accounts, I will:
1. Initialize Next.js 14 with TypeScript
2. Configure Supabase client
3. Set up environment variables
4. Create database schema
5. Push to GitHub

---

## STEP 3: Build Order (Per PRD)

| Phase | Components |
|:---|:---|
| **1** | Auth + Database Schema + Agent A |
| **2** | Home Page + Audit Result Page |
| **3** | Stripe + Agent B + Dashboard |
| **4** | About, FAQ, How It Works pages |
| **5** | Sentry Monitoring + Rate Limits |
| **6** | Deploy to Cloudflare |

---

## 📋 Credentials Checklist

When you're ready, share these with me:

- [ ] GitHub repo URL
- [ ] Supabase Project URL
- [ ] Supabase Anon Key
- [ ] Stripe Publishable Key
- [ ] Stripe Secret Key (we'll add to .env only)
- [ ] Resend API Key
- [ ] Gemini API Key

**We will store all secrets in `.env.local` and never commit them.**
