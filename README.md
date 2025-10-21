# CuraAI

CuraAI is a privacy-first AI voice agent that automates telehealth intake and triage with secure AI (TEE) and private data analysis through FHE.


### Full description:

CuraAI is a privacy-first voice AI agent built to automate telehealth intake and triage using confidential computing and privacy-preserving tech principles. Designed for clinics, NGOs, and healthcare systems, CuraAI conducts symptom interviews through natural conversation and generates structured summaries — all while preserving absolute patient confidentiality.

The system runs inside Trusted Execution Environments (TEEs), ensuring that all voice and text data are processed in secure enclaves where even system operators cannot access raw inputs. Zama’s Fully Homomorphic Encryption (FHE) enables privacy-preserving aggregation of demographic and symptom data, allowing providers to view encrypted analytics without ever exposing personal health information. 

CuraAI’s architecture treats privacy not as compliance overhead but as a foundational design layer. By leveraging AI inference inside TEEs, encrypted data flows, and zero-knowledge verification for sensitive attributes, CuraAI offers a new standard for secure digital health. The result is an intelligent intake agent that scales access to health care globally—without ever compromising patient trust or data sovereignty. 

### Impact 

CuraAI is redefining clinical efficiency through privacy-preserving automation of the medical intake and triage process. In traditional healthcare settings, up to 30% of a clinician’s time is lost to routine intake tasks — collecting patient histories, symptoms, and demographic data before care even begins. CuraAI eliminates that bottleneck with a voice-based AI agent that conducts natural, guided conversations with patients before their appointment or during telehealth sessions. The system listens, asks relevant follow-up questions, and automatically structures the gathered data into clear, standardized summaries for clinicians.

These summaries are securely transmitted to the attending physician, giving them an immediate, concise overview of the patient’s condition, context, and reported symptoms. CuraAI also assists in routing patients to the appropriate specialists or services when needed — for example, by flagging urgent cases or recommending specific departments — but it never provides medical diagnoses. Its role is that of a clinical assistant, not a decision-maker: it streamlines intake, not treatment.

Under the hood, every part of this interaction is built with privacy and security at its core. All data processing occurs within Trusted Execution Environments (TEEs) — secure enclaves that isolate computations from any external access — and is encrypted end-to-end. Aggregated analytics use Fully Homomorphic Encryption (FHE), allowing providers to gain operational insights without ever seeing raw patient data. This ensures that no sensitive information is ever stored or exposed, even as the system learns and improves over time.

By combining conversational AI, confidential computing, and encrypted analytics, CuraAI delivers a practical and ethical automation layer for healthcare systems. It empowers clinics and NGOs to handle higher patient volumes with fewer administrative delays, freeing up medical professionals to focus on care rather than data entry. In doing so, CuraAI contributes not only to healthcare efficiency but to a new paradigm of trustworthy, privacy-first AI infrastructure that respects both human time and patient dignity.

### Previous work 

We started this project with the Aleph hackathon 2025, in which we won the [third place in the Protocol Labs AI track](https://x.com/alephhackathon/status/1962885209596076193). Now, we are working on improving the technical and business development for launch our product with the guidance from the [Lisk's Founders Track from the Crecimiento Buildathon Season](https://x.com/alephhackathon/status/1973790903635480997)

- MVP Repo: https://github.com/NathaliaBarreiros/CuraAI
- Video: https://www.youtube.com/watch?v=5M4gKJ6Ipvk


