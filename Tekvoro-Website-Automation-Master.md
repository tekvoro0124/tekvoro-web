# TEKVORO — WEBSITE AUTOMATION MASTER BLUEPRINT
> **Full-Stack Website OS: Manage Posts, Clients, Leads, Projects & Business from One Place**
> Level: Enterprise / MNC-Grade | Use this as your master prompt + build reference

---

## 🧠 MASTER SYSTEM PROMPT
> Paste this into any AI (Claude, GPT-4, Gemini) to get it to understand your full system context

```
You are the AI assistant for Tekvoro Technologies, a Hyderabad-based 
AI Platform Development company. You help manage the complete business 
website automation system called "Tekvoro OS."

COMPANY CONTEXT:
- Company: Tekvoro Technologies Pvt Ltd, Hyderabad, India
- Niche: AI-powered marketplace & platform development for Indian startups/SMBs
- Flagship proof: QuickMela (full AI auction marketplace, 90-day delivery)
- Services: Platform MVPs (₹8-15L), AI integrations (₹3-6L), Retainers (₹1.5-4L/month)
- Target clients: Funded Indian startups, US/UK/UAE founders, Indian SMBs
- Revenue target: ₹8.4 Crore ARR ($1M) in 12-18 months

TEKVORO OS MODULES:
1. Content Engine     — Blog, LinkedIn, case studies, SEO automation
2. Lead Machine       — Lead capture, scoring, nurturing, CRM
3. Client Portal      — Onboarding, projects, invoices, communication
4. Project Command    — Task management, timelines, AI progress tracking
5. Finance Dashboard  — Invoices, payments, GST, revenue analytics
6. Hiring Engine      — Job posts, applicant tracking, onboarding
7. Analytics Center   — Website, SEO, conversion, campaign tracking

Your role: Help operate, automate, and improve each module. 
Always align decisions with the ₹8.4Cr ARR target.
Preferred stack: Next.js, Supabase, Resend, Stripe/Razorpay, n8n, Vercel.
```

---

## 🗺️ SYSTEM OVERVIEW — WHAT TOP MNCs DO (AND WHAT YOU NEED)

```
┌─────────────────────────────────────────────────────────────────┐
│                     TEKVORO WEBSITE OS                          │
│                                                                 │
│   VISITOR → LEAD → PROSPECT → CLIENT → RETAINED → ADVOCATE     │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ CONTENT  │  │  LEADS   │  │ CLIENT   │  │   FINANCE    │   │
│  │ ENGINE   │→ │ MACHINE  │→ │  PORTAL  │→ │  DASHBOARD   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│       ↓              ↓             ↓               ↓           │
│   SEO Traffic    CRM + Email   Project Mgmt    GST Reports     │
│   Blog/Social    Lead Score    Invoices        Revenue KPIs    │
│   Case Studies   Auto-Nurture  Files/Docs      Payroll Track   │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │ HIRING   │  │ANALYTICS │  │  AI OPS  │                     │
│  │ ENGINE   │  │  CENTER  │  │ ASSISTANT│                     │
│  └──────────┘  └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## MODULE 1 — CONTENT ENGINE 📝
> *What HubSpot, Atlassian, Webflow do: Publish content that attracts clients automatically*

### What it does:
- Blog auto-published from a CMS (Notion / Sanity / Contentful)
- LinkedIn posts auto-scheduled from one dashboard
- Case studies with gated download (email capture)
- AI-assisted content generation with your brand voice
- SEO metadata auto-generated per post
- Social preview cards auto-generated (OG images)

### Pages needed on tekvoro.com:
```
/blog                    — All blog posts (SSR for SEO)
/blog/[slug]             — Individual post (dynamic, SSR)
/case-studies            — Portfolio / social proof
/case-studies/[slug]     — Detailed case study
/resources               — Free templates, guides (email capture)
```

### Automation flows:
```
FLOW 1: Publish to All Channels
  Trigger: New post published in CMS
  → Auto-post to LinkedIn (via LinkedIn API or Buffer)
  → Auto-post to Twitter/X
  → Send to email subscribers (via Resend/Mailchimp)
  → Generate OG image (via Vercel OG or Cloudinary)
  → Ping Google Search Console to index

FLOW 2: AI Content Drafts
  Trigger: You add topic to Notion database
  → AI (Claude/GPT-4) generates full draft
  → Draft appears in CMS for your review
  → One-click publish after approval

FLOW 3: Case Study from Project
  Trigger: Project marked "Complete" in your PM tool
  → AI generates case study template with client data
  → Auto-creates LinkedIn carousel content
  → Adds to website portfolio after approval
```

### Tools:
| Tool | Purpose | Cost |
|---|---|---|
| Sanity.io or Notion | CMS / content management | Free / ₹2K/month |
| Buffer or Publer | Social scheduling | ₹1.5K/month |
| Resend | Email newsletters | Free up to 3K/month |
| Vercel OG | Auto-generate social cards | Free |
| n8n (self-hosted) | Automation glue | Free (self-host) or ₹1.5K/month |

---

## MODULE 2 — LEAD MACHINE 🎯
> *What Salesforce, HubSpot do: Capture, score, and nurture every lead automatically*

### What it does:
- Contact forms with smart routing (by project type, budget, timeline)
- Lead scoring (budget + timeline + company size = priority score)
- Automated email nurture sequences
- CRM dashboard to track all prospects
- Meeting scheduler embedded (Calendly-style)
- WhatsApp auto-reply for form submissions

### Pages needed on tekvoro.com:
```
/contact                 — Main contact form
/get-quote               — Detailed project brief form
/book-call               — Direct calendar booking
/free-audit              — AI Audit lead magnet form
/thank-you               — Post-submission confirmation + next steps
```

### Smart Contact Form Fields:
```javascript
// Lead Qualification Form — tekvoro.com/get-quote
{
  name: "Full Name",
  email: "Business Email",
  company: "Company Name",
  project_type: [
    "AI Marketplace Platform",
    "AI Integration / Bot",
    "Admin Dashboard",
    "White-Label Platform",
    "Mobile App",
    "Other"
  ],
  budget: [
    "Under ₹3L",
    "₹3L - ₹8L",
    "₹8L - ₹20L",
    "₹20L+",
    "International ($10K+)"
  ],
  timeline: [
    "ASAP (< 1 month)",
    "1-3 months",
    "3-6 months",
    "Flexible"
  ],
  describe_project: "textarea",
  how_found_us: ["Google", "LinkedIn", "Clutch", "Referral", "Other"]
}
```

### Lead Scoring Algorithm:
```
SCORE FORMULA (0-100):
  Budget:    ₹20L+ = 40pts | ₹8-20L = 30pts | ₹3-8L = 20pts | <₹3L = 5pts
  Timeline:  ASAP = 25pts  | 1-3mo = 20pts  | 3-6mo = 10pts | Flex = 5pts
  Source:    Referral = 20pts | Clutch = 15pts | LinkedIn = 10pts | Google = 8pts
  Project:   Marketplace = 15pts | AI = 12pts | Dashboard = 8pts | Other = 5pts

  Score 80-100 = 🔴 HOT  → Respond in 1 hour, send calendar link
  Score 50-79  = 🟡 WARM → Respond in 4 hours, send proposal template
  Score 20-49  = 🔵 COLD → Add to nurture sequence
  Score < 20   = ⚫ UNFIT → Send resources, no follow-up
```

### Automation flows:
```
FLOW 1: Lead Capture → CRM
  Trigger: Form submitted on tekvoro.com
  → Add to Airtable / Supabase CRM with lead score
  → Send Slack/WhatsApp notification to founder
  → Auto-reply email to lead (branded, with case studies attached)
  → If HOT: Send calendar booking link + your mobile number
  → If WARM: Send proposal starter template
  → If COLD: Start 5-email nurture sequence (over 14 days)

FLOW 2: Meeting Booked
  Trigger: Calendar meeting booked via /book-call
  → Add to CRM as "Discovery Call Scheduled"
  → Send confirmation email with preparation checklist
  → Send reminder 24h before + 1h before
  → Post-call: Auto-send proposal template + next steps email
  → Create project in PM tool if call goes well

FLOW 3: Nurture Sequence (Cold Leads)
  Email 1 (Day 0):  "Thanks for reaching out — here's our QuickMela case study"
  Email 2 (Day 3):  "How we built an AI fraud detection system in 30 days"
  Email 3 (Day 7):  "Free resource: Platform development checklist for Indian startups"
  Email 4 (Day 10): "Client spotlight: What we delivered for [niche similar to them]"
  Email 5 (Day 14): "Last one — are you still thinking about [their project type]?"

FLOW 4: Clutch / GoodFirms Review Request
  Trigger: Project marked "Complete" + invoice paid
  → 7-day delay
  → Auto-email to client asking for Clutch review
  → Include direct Clutch review link
  → Follow up once after 3 days if no review
```

### Tools:
| Tool | Purpose | Cost |
|---|---|---|
| Airtable or Supabase | CRM database | Free / ₹1.5K/month |
| Resend | Transactional + nurture emails | Free tier |
| Cal.com (self-host) | Meeting scheduler | Free |
| n8n | All automation flows | Free self-host |
| Tally.so | Smart forms with logic | Free / ₹1.2K/month |

---

## MODULE 3 — CLIENT PORTAL 🏢
> *What Accenture, Deloitte, top agencies do: White-glove client experience from day 1*

### What it does:
- Secure login for each client at tekvoro.com/portal
- Project dashboard: milestones, progress, deliverables
- File sharing (no more WhatsApp/Drive chaos)
- Invoice + payment history
- Raise a ticket / request changes
- Live chat or async video messages (Loom)

### Pages needed:
```
/portal                  — Login / dashboard home
/portal/projects         — All their projects + status
/portal/project/[id]     — Single project detail + timeline
/portal/files            — Shared documents, designs, reports
/portal/invoices         — All invoices + payment status
/portal/support          — Raise ticket, chat, feedback
/portal/onboarding       — New client checklist
```

### Client Onboarding Automation:
```
TRIGGER: New client contract signed (DocuSign / PandaDoc)

Step 1 (Immediate):
→ Create client account in portal
→ Send welcome email with login credentials
→ Send onboarding checklist (what they need to provide)
→ Create project in PM tool (Linear / Jira)
→ Slack channel created: #client-[name]
→ Assign project manager + lead developer

Step 2 (Day 1):
→ Kickoff call scheduled (auto calendar link)
→ Brand guidelines request email
→ Access credentials form (APIs, domains, existing systems)

Step 3 (Week 1):
→ First milestone set + communicated
→ Weekly status email schedule starts
→ First invoice sent (30% advance)

Step 4 (Weekly — Automated):
→ Every Friday: Auto-generate progress summary email
→ Pull updates from PM tool (Linear/Jira)
→ Send to client with next week milestones
→ Flag blockers requiring client input
```

### Client Portal Tech Stack:
```javascript
// Tech: Next.js + Supabase + Vercel

// Database tables needed:
clients           { id, name, company, email, phone, portal_access }
projects          { id, client_id, name, status, start_date, end_date, budget }
milestones        { id, project_id, title, due_date, status, description }
files             { id, project_id, name, url, uploaded_by, created_at }
invoices          { id, client_id, project_id, amount, status, due_date, razorpay_id }
tickets           { id, client_id, project_id, subject, description, status, priority }
messages          { id, ticket_id, sender, content, created_at }
```

---

## MODULE 4 — PROJECT COMMAND CENTER ⚡
> *What McKinsey, Infosys, top product companies use internally*

### What it does:
- All projects in one view (Kanban + Timeline)
- AI-assisted sprint planning from client requirements
- Automatic status updates to clients
- Time tracking per developer per project
- Risk flagging (missed deadlines, scope creep)
- Budget tracking vs actuals

### AI Prompt — Sprint Planning Assistant:
```
You are Tekvoro's project planning AI.

Given this client brief: [PASTE CLIENT REQUIREMENTS]

Generate:
1. Work Breakdown Structure (WBS) with 3-level hierarchy
2. Sprint plan (2-week sprints) with specific tasks
3. Effort estimates in hours per task
4. Risk register (top 5 risks + mitigation)
5. Definition of Done for each major deliverable
6. Tech stack recommendation based on Tekvoro's strengths

Tekvoro's team:
- Senior full-stack AI developer (React, Node, Python, LLM APIs)
- Junior full-stack developer (React, Node)
- UI/UX designer
- Project manager (you're AI-assisting them)

Constraints:
- Timeline: [CLIENT TIMELINE]
- Budget: [PROJECT BUDGET]
- Must include: [REQUIRED FEATURES]
```

### Weekly Status Email — Auto-Generation Prompt:
```
You are Tekvoro's client communication AI.

Generate a weekly project status email for:
- Client: [CLIENT NAME], [COMPANY]
- Project: [PROJECT NAME]
- Week: [DATE RANGE]

Pull this data:
- Completed this week: [TASKS COMPLETED FROM LINEAR/JIRA]
- In progress: [CURRENT TASKS]
- Blockers: [ANY BLOCKERS]
- Next week plan: [UPCOMING TASKS]
- % complete overall: [PERCENTAGE]
- Timeline: [ON TRACK / AT RISK / DELAYED]

Tone: Professional, confident, transparent. 
Format: Short paragraphs, not bullet lists.
End with: One specific question or action item for the client.
Sign off as: [THEIR PM NAME], Tekvoro Technologies
```

### Tools:
| Tool | Purpose | Cost |
|---|---|---|
| Linear | Project management | Free / ₹1.5K/month |
| Notion | Documentation, wikis | Free |
| Toggl Track | Time tracking | Free |
| Loom | Async video updates to clients | Free |
| GitHub | Code + version control | Free |
| Vercel | Deployments + staging | Free |

---

## MODULE 5 — FINANCE DASHBOARD 💰
> *What Freshbooks, QuickBooks + top companies do: Never chase invoices, never miss GST*

### What it does:
- Auto-generate GST-compliant invoices
- Send invoice + follow-up automatically
- Track payments (Razorpay/UPI/bank)
- Revenue dashboard (MRR, ARR, pipeline)
- Expense tracking
- GST reports (GSTR-1 ready)
- Contractor payouts

### Invoice Automation:
```
TRIGGER: Milestone marked "Complete" in project

→ Auto-generate invoice in portal:
  - Client details (auto-filled from CRM)
  - Project details + milestone
  - Amount (from project contract)
  - GST breakdown (18% on services)
  - Payment due date (NET-7 or NET-14)
  - Razorpay payment link embedded

→ Send invoice email (branded PDF attachment)
→ 3 days before due: Gentle reminder
→ On due date: Reminder with payment link
→ 3 days after due: Escalation to founder
→ Payment received: Send receipt + thank you
→ Update revenue dashboard in Supabase
→ Add to GST tracker for the month
```

### GST Compliance Prompt:
```
You are Tekvoro's GST compliance assistant for India.
Company: Tekvoro Technologies Pvt Ltd, Hyderabad, Telangana
GSTIN: [YOUR GSTIN]
Service: Information Technology / Software Services (SAC code 998314)

For each invoice, calculate:
- CGST: 9% (if client is in Telangana)
- SGST: 9% (if client is in Telangana)
- IGST: 18% (if client is in another state)
- TDS on Professional Services: 10% (if client deducts TDS)
- Net payable: Invoice amount - TDS (if applicable)

Monthly tasks:
- GSTR-1 due by 11th of next month
- GSTR-3B due by 20th of next month
- Remind founder 5 days before each deadline

Generate GSTR-1 data for: [MONTH] with these invoices: [LIST]
```

### Revenue Dashboard Data Model:
```javascript
// Supabase tables
invoices {
  id, client_id, project_id,
  invoice_number,           // TKVR-2026-001
  amount_before_gst,
  gst_amount,
  total_amount,
  status,                   // draft | sent | paid | overdue
  due_date,
  paid_date,
  payment_mode,             // razorpay | bank | upi
  razorpay_payment_id
}

revenue_metrics {           // computed daily by cron job
  date,
  mrr,                      // monthly recurring revenue
  arr,                      // annual recurring = mrr × 12
  new_revenue,              // invoices paid this month
  outstanding,              // sent but unpaid
  pipeline_value            // proposals sent, not yet converted
}
```

### Tools:
| Tool | Purpose | Cost |
|---|---|---|
| Razorpay | Payments + payment links | 2% per transaction |
| Zoho Invoice | GST invoicing (India-specific) | Free up to 5 clients |
| ClearTax | GST filing automation | ₹2.5K/year |
| Supabase | Revenue analytics DB | Free |
| n8n | Invoice automation flows | Free |

---

## MODULE 6 — HIRING ENGINE 👥
> *What Google, Flipkart use: Attract top talent without a big HR team*

### What it does:
- Jobs page on tekvoro.com/careers
- Application form with screening questions
- Auto-acknowledge all applications
- AI screening of resumes/portfolios
- Interview scheduler
- Offer letter generator
- Onboarding checklist for new hires

### Careers Page:
```
/careers                 — All open roles + company culture
/careers/[role-slug]     — Job description + apply form
/careers/apply/[role]    — Application form
```

### Job Application Form Fields:
```
- Name, Email, Phone, LinkedIn URL, Portfolio/GitHub
- Role applied for
- Current CTC + Expected CTC
- Notice period
- 3 screening questions (role-specific):
  For developers: 
    1. "Describe your most complex backend system you've built"
    2. "Have you worked with LLM APIs (Gemini, OpenAI)? Share example."
    3. "What's your React state management preference and why?"
- Upload: Resume + Portfolio link (required)
- How did you hear about us?
```

### AI Resume Screening Prompt:
```
You are Tekvoro's hiring AI assistant.

Evaluate this candidate for [ROLE] at Tekvoro Technologies:

Resume: [RESUME TEXT]
Screening answers: [ANSWERS]
Role requirements: [JOB DESCRIPTION]

Score them on:
1. Technical fit (0-40): Does their experience match our tech stack?
   Our stack: React, Next.js, Node.js, Python, Supabase, LLM APIs, 
   WhatsApp API, Razorpay, Firebase
2. Complexity exposure (0-30): Have they built complex, AI-powered systems?
3. Communication quality (0-20): Are their answers clear and thoughtful?
4. Culture/motivation fit (0-10): Do they show initiative and learning?

Output:
- Total score: X/100
- Hire signal: STRONG HIRE / HIRE / MAYBE / NO HIRE
- Key strengths (2-3 bullet points)
- Red flags (if any)
- 3 interview questions specific to this candidate
- Recommended interview format (technical / portfolio review / both)
```

### Offer Letter Automation Prompt:
```
Generate a professional offer letter for Tekvoro Technologies Pvt Ltd.

Company details:
- Tekvoro Technologies Private Limited
- Registered: [ADDRESS], Hyderabad, Telangana
- GSTIN: [GSTIN] | CIN: [CIN]

Candidate: [NAME]
Role: [ROLE TITLE]
Department: Engineering / Design / Business
Start date: [DATE]
CTC: ₹[AMOUNT] per annum
Break-up: Basic [40%] + HRA [40%] + Special Allowance [20%]
Work type: [Remote / Hybrid / Office]
Probation: 3 months
Notice period: 30 days (post-probation)

Include: Welcome tone, role expectations, joining instructions, 
signature block for founder + HR.
Tekvoro letterhead style. Professional and warm.
```

---

## MODULE 7 — ANALYTICS CENTER 📊
> *What every data-driven company does: Measure everything, optimize constantly*

### What it does:
- Website traffic + source breakdown
- SEO keyword rankings
- Lead conversion funnel
- Email open/click rates
- Revenue from each marketing channel
- Client lifetime value
- NPS / satisfaction scores

### Analytics Stack:
```
WEBSITE ANALYTICS:
  PostHog (free, self-host) → User behavior, page views, conversion
  or Plausible ($9/mo)      → Privacy-friendly, GDPR compliant

SEO MONITORING:
  Google Search Console     → Free, keyword rankings, clicks
  Ahrefs / Semrush Lite     → Competitor keywords, backlinks
  
EMAIL METRICS:
  Resend dashboard          → Open rate, CTR, bounces

BUSINESS METRICS:
  Supabase + custom dashboard → Revenue, pipeline, clients
  or Metabase (free)          → Connect to your DB, auto dashboards

SOCIAL METRICS:
  Buffer Analytics           → LinkedIn post performance
  LinkedIn Analytics         → Company page insights (free)
```

### Weekly Analytics Report Prompt:
```
You are Tekvoro's analytics AI. Generate a weekly business summary.

DATA INPUTS:
- Website visits this week: [NUMBER]
- Top traffic sources: [LIST]
- New leads this week: [NUMBER] (breakdown: HOT/WARM/COLD)
- Proposals sent: [NUMBER]
- Deals closed: [NUMBER + VALUE]
- Active projects: [NUMBER]
- MRR: ₹[AMOUNT]
- LinkedIn post impressions: [NUMBER]
- Top performing content: [POST TITLE + STATS]
- Clutch/GoodFirms new reviews: [NUMBER]

Generate:
1. Executive summary (3 sentences)
2. What's working (top 2-3 wins)
3. What needs attention (top 2-3 concerns)
4. Recommended actions for next week
5. Progress toward ₹8.4Cr ARR target (% complete)

Format: Concise, data-driven, actionable. No fluff.
```

---

## MODULE 8 — AI OPERATIONS ASSISTANT 🤖
> *Your AI employee that works 24/7 — handles queries, generates content, supports clients*

### What it does:
- Website chatbot (answers "what do you do?", "how much does it cost?", "can you build X?")
- Lead qualification bot
- Auto-generates proposals from project briefs
- Answers client queries in portal
- Generates first drafts of all content

### Website Chatbot System Prompt:
```
You are Tekvoro AI, the intelligent assistant for Tekvoro Technologies.

YOUR GOAL: Qualify visitors and book discovery calls.

ABOUT TEKVORO:
Tekvoro Technologies is a Hyderabad-based AI platform development company. 
We build AI-powered marketplaces, platforms, and SaaS products for Indian 
startups and SMBs. We specialize in:
- AI marketplace platforms (our flagship: QuickMela — full auction marketplace 
  with AI fraud detection, WhatsApp bot, KYC AI, real-time bidding)
- AI chatbots and automation (WhatsApp, voice, web)
- Admin dashboards and command centers
- White-label platform solutions

SERVICES & PRICING (approximate, custom quotes available):
- Full platform MVP: ₹8-15L, delivered in 60-90 days
- AI integration sprint: ₹3-6L, 3-4 weeks
- Monthly retainer: ₹1.5-4L/month
- White-label platform license: ₹1-2L/month
- Admin dashboard: ₹1.5-3L, 2-3 weeks

LEAD QUALIFICATION — Ask these in natural conversation:
1. What kind of project are you thinking about?
2. What's your rough timeline?
3. Do you have a budget range in mind?
4. Have you started development already, or is this new?

If lead seems qualified (budget > ₹3L, clear project idea):
→ "I'd love to connect you with our founder for a 20-minute discovery call. 
   Shall I share our calendar link?"

TONE: Friendly, direct, knowledgeable. Not salesy. Not robotic.
LANGUAGE: Default English. Switch to Hindi if visitor writes in Hindi.
NEVER: Make up technical details not listed above. Say "our team can confirm that."
```

### Proposal Auto-Generator Prompt:
```
You are Tekvoro's proposal writing AI.

CLIENT BRIEF:
- Client name: [NAME], [COMPANY]
- Project type: [TYPE]
- Requirements: [PASTED FROM THEIR EMAIL/FORM]
- Budget mentioned: [BUDGET]
- Timeline: [TIMELINE]
- Special requirements: [ANY NOTES]

Generate a professional project proposal for Tekvoro Technologies.

STRUCTURE:
1. Executive Summary (2 paragraphs — their problem + our solution)
2. Why Tekvoro (3 points: expertise, proof, approach)
3. Our Understanding of Your Requirements (bullet points from their brief)
4. Proposed Solution (high-level technical approach)
5. Scope of Work (what's included, what's not)
6. Project Timeline (phases with weeks)
7. Team Assigned (roles, not names)
8. Investment (tiered: recommended + premium option)
9. Next Steps (CTA: accept proposal / schedule call / request changes)
10. Terms (payment: 30% advance, 40% midway, 30% delivery)

TONE: Confident. Specific. Shows we understood their problem.
Mention QuickMela as proof where relevant.
Length: 2-3 pages when formatted.
```

---

## 🔧 COMPLETE TECH STACK RECOMMENDATION

### For Tekvoro's Website OS (all-in cost: ~₹8-12K/month)

```
LAYER           TOOL                    COST/MONTH      WHY
─────────────────────────────────────────────────────────────
Frontend        Next.js on Vercel       Free            SSR + SSG + Edge
Database        Supabase                Free → ₹1.8K    Postgres + Auth + Storage
CMS             Sanity.io               Free            Blog + Case studies
Automation      n8n (self-hosted)       ₹500 (VPS)     All workflow automation
Email           Resend                  Free → ₹1.5K    Transactional + nurture
Forms           Tally.so                Free            Smart forms + logic
Payments        Razorpay                2% per txn      India-native
Scheduling      Cal.com                 Free            Meeting booking
Analytics       PostHog                 Free            User analytics
Project Mgmt    Linear                  Free            Sprint planning
Invoicing       Zoho Invoice            Free            GST-compliant
Chat (site)     Crisp or Tidio          Free → ₹2K      Live chat + bot
Docs signing    DocuSign lite           ₹1.5K           Contracts
Monitoring      Sentry                  Free            Error tracking
─────────────────────────────────────────────────────────────
TOTAL                                   ~₹8-12K/month
```

---

## 📋 WHAT'S MISSING FROM TEKVORO.COM (Merge Checklist)

Check each item. If it exists on your site, ✅. If missing, build it.

### TECHNICAL
```
□ Server-side rendering (SSR/SSG) — Google can crawl all pages
□ robots.txt and sitemap.xml
□ Schema markup (Organization, Service, Review)
□ Open Graph + Twitter Card meta tags
□ Page speed score > 90 on Google PageSpeed
□ SSL certificate active
□ Mobile responsive (all pages)
□ Error pages: 404, 500 (branded)
```

### PAGES
```
□ Home            — Clear headline, CTA, proof (✅ likely exists)
□ About           — Founder story, mission, team, office photos
□ Services        — Individual page per service with pricing
□ Portfolio       — QuickMela + DriverBharat + AI Agent System
□ Case Studies    — 3+ detailed case studies with outcomes
□ Blog            — SEO articles, 2+ published already
□ Pricing         — Transparent package pricing
□ Contact         — Smart form with lead scoring
□ Book a Call     — Calendar embed (Cal.com or Calendly)
□ Careers         — Job listings + culture section
□ Resources       — Free templates/guides (email capture)
□ Client Portal   — /portal (private, login-gated)
□ Thank You       — Post-form submission page
□ 404             — Branded error page with CTA
```

### TRUST SIGNALS
```
□ Client logos or testimonials
□ "As featured on" / Clutch badge (once listed)
□ Team photos (even just founder photo)
□ Registered company details (CIN, GSTIN in footer)
□ Privacy policy page
□ Terms of service page
□ LinkedIn link in header/footer
□ WhatsApp chat button (bottom right)
```

### SEO
```
□ Each page has unique title tag (50-60 chars)
□ Each page has unique meta description (150-160 chars)
□ H1 tag on every page (only one H1)
□ Alt text on all images
□ Internal links between pages
□ Blog posts targeting keywords like:
  "AI marketplace development India"
  "custom platform development Hyderabad"
  "WhatsApp bot development India"
  "build auction platform India"
```

### AUTOMATION (connect these)
```
□ Contact form → Airtable/Supabase CRM
□ Contact form → Slack/WhatsApp notification to founder
□ Contact form → Auto-reply email to lead
□ Blog post → LinkedIn auto-post
□ Project complete → Client review request email
□ Invoice sent → Payment reminder sequence
□ New hire accepted → Onboarding checklist
```

---

## 🚀 BUILD ORDER (Priority Sequence)

```
WEEK 1 — Foundation (Do These First):
  1. Fix SSR on website (Next.js migration)
  2. Add /portfolio page with QuickMela case study
  3. Add /contact with smart lead form
  4. Set up Supabase CRM (basic: name, email, project, score)
  5. Connect form → Supabase + WhatsApp notification (n8n)

WEEK 2 — Lead Machine:
  6. Add /book-call with Cal.com embed
  7. Set up Resend → 5-email nurture sequence
  8. Set up lead scoring (auto-tag HOT/WARM/COLD)
  9. Add website chatbot (Crisp or Tidio) with your system prompt

WEEK 3-4 — Client Portal (MVP):
  10. Build /portal with Next.js + Supabase auth
  11. Project view (milestones, progress)
  12. File sharing
  13. Invoice view + Razorpay link

MONTH 2 — Content + Finance:
  14. Connect Sanity CMS → blog
  15. Set up Buffer for LinkedIn scheduling
  16. Set up Zoho Invoice + GST automation
  17. Revenue dashboard in Supabase

MONTH 3 — Advanced:
  18. /careers page + AI resume screening
  19. Weekly analytics report automation
  20. AI proposal generator in portal
```

---

## 💬 QUICK COPY-PASTE PROMPTS

### For building any module — give this to Claude/GPT:
```
Build [MODULE NAME] for Tekvoro Technologies website.

Tech stack: Next.js 14 (App Router), TypeScript, Supabase, Tailwind CSS, Vercel.
Design system: Dark theme, primary color #F5C542 (gold), font: DM Sans + JetBrains Mono.
Style reference: Professional, MNC-grade, Hyderabad AI company.

[MODULE NAME] requirements:
[PASTE REQUIREMENTS FROM THIS DOCUMENT]

Include:
- Full working code (no placeholders)
- Supabase table schema
- API routes (Next.js App Router)
- UI components
- n8n automation flow JSON (if applicable)
- TypeScript types
- Basic error handling and loading states
```

### For writing any email/content:
```
You are writing for Tekvoro Technologies.
Tone: Confident, direct, expert. Not salesy. Not generic.
Positioning: India's AI Platform Studio. We build what others can't.
Proof: Built QuickMela — full AI marketplace with fraud detection, KYC AI, WhatsApp bot.
Target: [Funded startup founders / SMB owners / CTOs]

Write: [WHAT YOU NEED]
```

---

*Tekvoro Website Automation Master Blueprint v1.0*
*February 2026 | Built for ₹8.4Cr ARR target*
*This document is your system design + prompt library for the entire website OS*
