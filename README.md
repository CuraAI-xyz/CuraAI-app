# CuraAI
### Privacy-First Voice AI Agent for Telehealth Intake

[![Demo Video](https://img.shields.io/badge/Watch-Demo-red)](https://www.youtube.com/watch?v=5M4gKJ6Ipvk)
[![Website](https://img.shields.io/badge/Website-Coming_Soon-blue)](https://curaai.xyz)
[![X / Twitter](https://img.shields.io/badge/Follow_on-X-black)](https://x.com/CuraAI_)
[![LinkedIn](https://img.shields.io/badge/Connect-LinkedIn-blue)](https://linkedin.com/company/curaai-xyz)
![Built at Aleph Hackathon](https://img.shields.io/badge/Aleph%20Hackathon-3rd%20Place-orange)
![Privacy-Preserving AI](https://img.shields.io/badge/AI-Privacy%20Preserving-green)
![Powered by Zama](https://img.shields.io/badge/Encryption-Zama%20FHE-brightgreen)

---

## TL;DR
CuraAI builds a privacy-first voice agent that automates telehealth intake inside secure enclaves — accelerating care while keeping patient data private.

---

## Overview
CuraAI is a privacy-first voice AI agent that automates the medical intake and triage process using confidential computing and encrypted analytics.  
Built with Trusted Execution Environments (TEEs) and Fully Homomorphic Encryption (FHE), CuraAI runs sensitive AI inference securely — ensuring that even system operators cannot access raw patient data.

Patients interact naturally by voice, describing their symptoms while the agent asks relevant follow-ups and structures the conversation into standardized summaries for clinicians.  
Doctors receive these summaries securely — complete with likely conditions, confidence levels, and reasoning — without CuraAI ever making a medical diagnosis. The goal: help doctors act faster with better information, not replace them.

---

## The Problem
Healthcare systems waste immense clinical capacity on routine intake:
- 30% of clinical time is lost to manual symptom collection and administrative entry.  
- Staff shortages leave millions without timely care, especially in developing regions.  
- Privacy and compliance barriers block the adoption of most AI or digital intake tools.

These inefficiencies delay treatment, reduce quality of care, and burden overworked clinicians — particularly in NGOs, public clinics, and resource-limited health systems.

---

## Our Solution
CuraAI automates the intake and triage layer of healthcare.  

- Voice-based AI Agent — Converses naturally with patients to gather history, symptoms, and context.  
- Intelligent Summarization — Generates structured clinical notes including symptom clusters, prior medication, family history, and relevant medical background.  
- Smart Routing — Flags urgent cases and redirects patients to appropriate general or specialist care.  
- TEE Enclaves — All inference runs inside secure enclaves, isolating patient data from any external access.  
- FHE Analytics — Providers get encrypted demographic and intake analytics without exposing sensitive data.  

CuraAI doesn’t diagnose — it prepares doctors with structured, privacy-preserving information so they can focus on treatment, not paperwork.

---

## How It Works
1. Patient describes symptoms through a voice call or app.  
2. AI agent conducts a guided consultation (like a first interview).  
3. AI processes data in a TEE, asking context-specific questions.  
4. Patient approves sharing; doctor receives a structured summary with probabilities and reasoning.  
5. Encrypted analytics are aggregated using FHE — giving clinics insight without data exposure.  

Future integrations include OCR for scanning patient records, Zero-Knowledge Proofs for sensitive attributes, and encrypted dashboards for providers.

---

## Market Opportunity
Healthcare intake automation represents a $50B+ global market.  
Our initial focus is the $20B Latin American telehealth sector, expanding into NGO and public health contracts estimated between $500M–$1.5B.  

Particularly strong beneficiaries include:
- Public clinics with high intake volume and limited staff  
- NGOs operating in underserved or rural regions  
- Specialized fields like reproductive assistance, maternal health, and early diagnostic programs

---

## Architecture Highlights
- Phala TEE – Secure in-session AI inference  
- Zama FHE – Encrypted demographic and symptom analytics  
- Privy – Wallet-based decentralized identity  
- Twilio – Real voice input and streaming interface  
- v0 by Vercel – Rapid frontend + dashboard  
- (Planned) Filecoin for encrypted summary storage and Lisk for micropayments  

---

## Why It Matters
Billions of people still face care delays due to staff shortages and privacy barriers.  
CuraAI gives every patient a private, AI-powered voice that streamlines access to care — ethically and securely.

---

## Impact
CuraAI redefines healthcare efficiency by freeing doctors from repetitive intake work.  
NGOs and clinics can serve more patients in less time while maintaining end-to-end privacy compliance.  
Every patient gets a private AI voice at the point of need, improving equity in digital health access.

---

## Team
- Nathalia – Backend / Privacy  
- Mauro – AI & Fullstack  
- Fernando – Frontend (v0)  
- Nathaniel – Product Lead  

Backed by:  
3rd Place — [Protocol Labs Aleph Hackathon (AI Track)](https://x.com/alephhackathon/status/1962885209596076193)  
Lisk Founders Track — [Crecimiento Buildathon Season](https://x.com/alephhackathon/status/1973790903635480997)

---

## Quickstart (Developer Demo)
```bash
git clone https://github.com/NathaliaBarreiros/CuraAI.git
cd CuraAI
npm install
npm run dev
```

---

## Quick Links
- MVP Repo: [github.com/NathaliaBarreiros/CuraAI](https://github.com/NathaliaBarreiros/CuraAI)  
- Demo Video: [YouTube](https://www.youtube.com/watch?v=5M4gKJ6Ipvk)   
- Website: [CuraAI.xyz](https://curaai.xyz)  
- Email: [nathaniel@curaai.xyz](mailto:nathaniel@curaai.xyz)  
- X / Twitter: [@CuraAI_](https://x.com/CuraAI_)  
- LinkedIn: [CuraAI-xyz](https://linkedin.com/company/curaai-xyz)

---

## Join Our Journey
Follow us on [X (Twitter)](https://x.com/CuraAI_) and [LinkedIn](https://linkedin.com/company/curaai-xyz).  
Subscribe for updates at [CuraAI.xyz](https://curaai.xyz).  
Reach out directly at [nathaniel@curaai.xyz](mailto:nathaniel@curaai.xyz).