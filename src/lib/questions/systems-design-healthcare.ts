import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "hlth-fhir-data-model": [
    {
      id: "q-hlth-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In FHIR R4, which resource would you use to record a blood pressure reading taken during a patient visit?",
      options: [
        "Condition — used for clinical diagnoses and problems",
        "Observation — used for measurements, lab results, and vital signs",
        "Encounter — used to track the visit itself",
        "Procedure — used for actions performed on a patient",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the category of clinical information. Blood pressure is a measurable vital sign — a finding that can be observed and recorded with a numeric value — rather than a diagnosis, a visit record, or an intervention.\\n\\n**Step 2:** Match the category to the FHIR resource. The FHIR R4 Observation resource is the standard container for measurements, lab results, and vital signs. It links to the Patient and Encounter via reference fields, carries a LOINC code (e.g., 85354-9 for blood pressure panel), and stores systolic and diastolic values as nested component elements.\\n\\n**Step 3:** Eliminate the alternatives. Condition captures diagnoses and clinical problems. Encounter captures visit metadata — who, what, when, where. Procedure captures actions performed on the patient. None of these represents a measurement result.",
      hints: [
        "Vital signs are a subtype of what broader clinical concept — findings or procedures?",
        "The FHIR vital-signs IG (Implementation Guide) profiles which base resource?",
      ],
    },
    {
      id: "q-hlth-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A FHIR R4 Patient resource must link to their insurance coverage. Which approach is correct according to the FHIR specification?",
      options: [
        "Embed the Coverage resource as an inline contained resource inside Patient.contained[]",
        "Store the Coverage resource independently and reference it from a Coverage.beneficiary reference pointing to the Patient",
        "Add a custom extension on the Patient resource storing the coverage plan ID as a string",
        "Use the Claim resource to link patient and coverage together",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Determine the relationship direction. The reference should point from the resource that describes something about the patient TO the Patient. Coverage describes who is paying for the patient's care, so the natural direction is Coverage $\\to$ Patient.\\n\\n**Step 2:** Apply FHIR's reference pattern. The Coverage resource has a mandatory Coverage.beneficiary field that references the Patient, and a Coverage.payor field that references the Organization (insurer). This allows Coverage to be queried and versioned independently of the Patient resource.\\n\\n**Step 3:** Evaluate why each alternative is wrong. Contained resources should only be used when the contained resource has no independent existence outside its parent - Coverage clearly does (it can be queried by payers, employers, and other systems). A custom extension avoids the reference pattern entirely and breaks interoperability. The Claim resource represents a billing request, not a coverage relationship.",
      hints: [
        "In FHIR, which direction does the reference usually flow — from Coverage to Patient or Patient to Coverage?",
        "When should you use contained resources versus independent referenced resources?",
      ],
    },
    {
      id: "q-hlth-3",
      type: "true-false",
      difficulty: "easy",
      question: "In FHIR R4, the Encounter resource represents a single interaction between a patient and a healthcare provider, and it can reference both the Patient and the Condition(s) being addressed during that visit.",
      correctAnswer: "true",
      explanation: "**Step 1:** Confirm what the Encounter resource represents. The FHIR R4 Encounter resource models a single patient-provider interaction — an office visit, an ER visit, a telehealth session, or an inpatient stay. It carries the who (Patient), when (date/time), where (Location), and who participated (Practitioner).\\n\\n**Step 2:** Check the reason-reference field. Encounter.reasonReference is an array that links to Condition resources (among other things), allowing the Encounter to document what clinical problems or diagnoses were addressed during that specific visit.\\n\\n**Step 3:** Verify the statement is accurate. The statement says Encounter can reference both the Patient and the Condition(s) — both of these are true. The Encounter.classifier captures the type of encounter, and reasonReference captures the clinical motivation.",
      hints: [
        "Look at the Encounter.reasonReference field in the FHIR R4 specification.",
        "Think about how Epic surfaces visit-level data in its FHIR APIs.",
      ],
    },
  ],

  "hlth-fhir-rest-api": [
    {
      id: "q-hlth-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You need to fetch all Observation resources for a patient along with the referenced Practitioner who recorded each one, in a single FHIR API call. Which query parameter achieves this?",
      options: [
        "GET /Observation?patient=123&_expand=Practitioner",
        "GET /Observation?patient=123&_include=Observation:performer",
        "GET /Observation?patient=123&_revinclude=Practitioner:performer",
        "GET /Observation?patient=123&join=Practitioner",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the data model direction. Observation.performer is a reference field that points FROM the Observation TO the Practitioner who performed or recorded it. This is the forward direction of the reference.\\n\\n**Step 2:** Choose the correct FHIR search parameter. The _include modifier follows references in the forward direction — from the requested resource (Observation) outward to the resources it references (Practitioner). So _include=Observation:performer fetches Observation records and additionally includes the referenced Practitioner resources in the same Bundle response.\\n\\n**Step 3:** Eliminate the wrong alternatives. _revinclude follows references backward — it would find Practitioners that reference the matched Observations, which is the opposite direction. _expand is not a valid FHIR search parameter. join is not part of the FHIR search specification.",
      hints: [
        "Does the reference point from Observation to Practitioner, or from Practitioner to Observation?",
        "_include follows references outward; _revinclude follows references inward. Which do you need here?",
      ],
    },
    {
      id: "q-hlth-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A FHIR server returns a searchset Bundle with a next link. What is the correct way to implement pagination, and what field indicates the total number of matching resources?",
      options: [
        "Use the Bundle.entry[].resource.id to construct the next page URL; total is in Bundle.meta.count",
        "Follow the link with relation=\"next\" from Bundle.link[]; total matching resources is in Bundle.total",
        "Increment an offset query parameter by the page size; total is computed client-side",
        "Use a cursor token from Bundle.entry[0].search.score; total is always the entry count",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand how FHIR pagination works. FHIR pagination uses the Bundle.link array. An entry with relation=\"next\" provides an opaque URL for the next page — opaque meaning the server controls its format. The server may use cursor tokens, keyset pagination, or offsets internally, so clients must never try to construct page URLs themselves.\\n\\n**Step 2:** Identify the total count field. Bundle.total (when present) gives the total number of matching resources across all pages. However, servers may omit Bundle.total for performance reasons on large result sets.\\n\\n**Step 3:** Eliminate the wrong alternatives. Bundle.meta.count is not a standard field for total count. Constructing URLs from entry IDs ignores the server's internal pagination state. Using a search score as a cursor is not specified in the FHIR standard.",
      hints: [
        "The FHIR spec says page URLs are opaque — never reconstruct them yourself.",
        "Bundle has both .total and .link[] — which one tells you about more pages versus total count?",
      ],
    },
  ],

  "hlth-hipaa-safeguards": [
    {
      id: "q-hlth-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Under HIPAA's Technical Safeguard requirements, a covered entity must implement audit controls. Which of the following BEST describes what must be recorded in a HIPAA-compliant PHI access audit log?",
      options: [
        "Only failed access attempts, to minimize log storage costs",
        "Who accessed or attempted to access PHI, what PHI was accessed, when, and from which system",
        "The content of the PHI record that was viewed, encrypted and stored alongside the log",
        "Only administrator actions such as schema changes and user provisioning",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the regulatory basis. HIPAA's Technical Safeguard rule (45 CFR §164.312(b)) requires audit controls that record and examine activity in information systems containing or using ePHI. This is a required standard, not merely addressable.\\n\\n**Step 2:** Determine the minimum required elements. A useful audit log for breach investigation must capture: who (user identity), what (resource accessed — patient ID and record type), when (timestamp), and which system (source IP or system identifier). Without these four elements, a compliance officer cannot reconstruct what happened during a potential breach.\\n\\n**Step 3:** Eliminate the insufficient or harmful alternatives. Logging only failed attempts misses the most dangerous scenario — a legitimate insider accessing records they should not. Logging full PHI content in the audit log creates secondary PHI exposure risk. Logging only administrator actions ignores the vast majority of PHI access by clinical users.",
      hints: [
        "Think about what information a compliance officer would need to investigate a breach.",
        "HIPAA audit requirements focus on activity tracking, not on storing the data itself.",
      ],
    },
    {
      id: "q-hlth-7",
      type: "true-false",
      difficulty: "easy",
      question: "HIPAA requires that PHI transmitted over a public network (e.g., the internet) must be encrypted, but PHI stored at rest on internal servers is only \"addressable\" — meaning covered entities may choose not to encrypt it if they document a reasonable alternative.",
      correctAnswer: "true",
      explanation: "**Step 1:** Distinguish between required and addressable standards. HIPAA's Security Rule distinguishes between \"required\" standards (which must be implemented) and \"addressable\" implementation specifications (which must be implemented if reasonable, or documented as not reasonable if not). Encryption in transit (45 CFR §164.312(e)(2)(ii)) is addressable, but the underlying transmission security standard (§164.312(e)(1)) is required.\\n\\n**Step 2:** Recognize practical reality. In practice, unencrypted internet transmission is virtually impossible to defend before a auditor — any reasonable security review would flag it. Most cloud EHR vendors (Epic, Cerner, Google Health) encrypt both in transit and at rest by default, making the addressability question largely academic.\\n\\n**Step 3:** Confirm the statement is accurate. The statement correctly describes the required/addressable distinction for encryption at rest versus in transit.",
      hints: [
        "Look up the difference between 'required' and 'addressable' in the HIPAA Security Rule.",
        "Would any auditor accept 'we chose not to encrypt' without extensive documentation?",
      ],
    },
    {
      id: "q-hlth-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You are designing a HIPAA-compliant multi-tenant SaaS EHR. To satisfy the Minimum Necessary standard and role-based access control, which architecture pattern is most appropriate?",
      options: [
        "Store all PHI in a single shared database; apply row-level security filters in the application layer only",
        "Use attribute-based access control (ABAC) where policies evaluate user role, patient-provider relationship, and record sensitivity before every data access, enforced at the data layer",
        "Encrypt each tenant's data with a different key and rely on key possession as the sole access control",
        "Issue each clinical user a separate database credential with read-only access to all records",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the HIPAA Minimum Necessary standard. This requires that PHI access be limited to the minimum needed for each user's specific role. It is not enough to say \"a physician can see all patients\" — a physician should only see records of patients they are currently treating.\\n\\n**Step 2:** Evaluate ABAC as the right pattern. ABAC evaluates contextual attributes — user role (physician, nurse, billing), patient-provider relationship (is this provider currently treating this patient?), and record sensitivity (mental health, substance abuse flagged by 42 CFR Part 2) — before each data access. Critically, this enforcement must happen at or near the data layer, not solely in application code, to prevent privilege escalation if the application is compromised.\\n\\n**Step 3:** Eliminate the inadequate alternatives. Application-layer-only filtering can be bypassed if the application has a bug or is compromised. Encryption without access control is not access control at all. Per-user database credentials cannot express the dynamic relationship between provider and patient that Minimum Necessary requires.",
      hints: [
        "What is the difference between authentication (who are you) and authorization (what can you see)?",
        "The HIPAA Minimum Necessary standard requires that each role can only see what it needs — how do you enforce that at scale?",
      ],
    },
  ],

  "hlth-patient-matching": [
    {
      id: "q-hlth-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a Master Patient Index (MPI) using the Fellegi-Sunter probabilistic record linkage model, what do the m-probability and u-probability represent?",
      options: [
        "m is the match threshold score; u is the unmatch threshold score",
        "m is the probability a field agrees given two records ARE the same person; u is the probability a field agrees given they are NOT the same person",
        "m is the weight for mandatory fields; u is the weight for optional fields",
        "m is the false-match rate; u is the unlinked-record rate",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand what the Fellegi-Sunter model computes. For each comparison field (name, DOB, SSN), the model calculates how much evidence the field agreement contributes to the overall match score. This requires two conditional probabilities.\\n\\n**Step 2:** Define m and u. The m-probability, m(a), is P(agreement | true match) — how often the field agrees when two records truly represent the same person (e.g., two records for \"John Smith\" with the same DOB). The u-probability, u(a), is P(agreement | true non-match) — how often the field agrees by pure chance for different people (e.g., two different \"John Smith\" records with the same DOB).\\n\\n**Step 3:** Understand the discriminative weight. The log-likelihood ratio for a field agreeing is log(m/u). A rare field like a unique middle name has a high m (often agrees for true matches) and low u (rarely agrees for non-matches), giving it high weight. A common name like \"Smith\" has a high u (many non-matches share it), reducing its weight.",
      hints: [
        "Think about what information each probability gives you about the discriminating power of a field.",
        "Why would a rare name contribute more to a match score than a common name?",
      ],
    },
    {
      id: "q-hlth-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A health information exchange (HIE) detects that two records for the same patient were created under slightly different names: \"Jon Smith\" vs \"Jonathan Smith\". Which technique should the MPI use to handle this?",
      options: [
        "Exact string matching only — reject potential matches unless names are identical",
        "Phonetic encoding (Soundex/Metaphone) and edit-distance (Jaro-Winkler) similarity to score partial name agreement",
        "Discard the name field entirely and rely solely on SSN",
        "Flag the record for manual review only if date-of-birth is also different",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the underlying problem. Patient names in real-world EHRs have substantial variation: nicknames (Jon/John/Jonathan), spelling errors, name changes after marriage, and transcription errors. An MPI that requires exact string matching will miss true matches and create duplicate records.\\n\\n**Step 2:** Apply the correct techniques. Phonetic algorithms (Soundex, Double Metaphone) encode names by their sound, so \"Jon\" and \"John\" produce the same code. Edit-distance metrics (Jaro-Winkler, Levenshtein) measure how many character insertions, deletions, or substitutions are needed to transform one string into another. These signals are combined as features in the probabilistic scoring model used by production MPIs.\\n\\n**Step 3:** Eliminate the wrong alternatives. Relying solely on SSN is dangerous because SSNs are frequently missing (especially in pediatric records), incorrectly entered, or shared among family members. Exact matching misses a huge fraction of true matches.",
      hints: [
        "What are common sources of name variation in EHR data?",
        "How does Jaro-Winkler differ from simple edit distance, and why does it matter for names?",
      ],
    },
  ],

  "hlth-hl7-fhir-migration": [
    {
      id: "q-hlth-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When building an HL7 v2 to FHIR R4 transformation pipeline, an ORU^R01 lab result message arrives. Which FHIR resources should be created or updated from this single message?",
      options: [
        "Only a DiagnosticReport resource",
        "A Patient (if not found), an Encounter, a DiagnosticReport, and one or more Observation resources linked from the DiagnosticReport",
        "A Claim resource and an Observation resource",
        "A ServiceRequest and a Condition resource",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand what an ORU^R01 message contains. ORU (Observation Result) messages have MSH (header), PID (patient identity), PV1 (visit info), OBR (observation request/report header), and multiple OBX (observation result) segments. A single message can carry one report header but many individual lab results.\\n\\n**Step 2:** Map each segment to the corresponding FHIR resource. MSH/PID segments map to Patient identity (via MPI lookup or creation). PV1 maps to Encounter. OBR maps to DiagnosticReport (the container for the lab report). Each OBX segment maps to an individual Observation resource (one per result). DiagnosticReport.result[] references the Observations.\\n\\n**Step 3:** Execute the pipeline correctly. The pipeline should first find or create the Patient via MPI, resolve or create the Encounter, then persist the DiagnosticReport and Observations atomically via a FHIR transaction Bundle. This is the pattern used by Google Cloud Healthcare API and Azure Health Data Services.",
      hints: [
        "ORU = Observation Result Unsolicited. What FHIR resource represents a collection of lab results?",
        "How do OBR and OBX segments map to FHIR resources?",
      ],
    },
    {
      id: "q-hlth-12",
      type: "true-false",
      difficulty: "medium",
      question: "In an HL7 v2 to FHIR transformation pipeline, it is safe to use the HL7 v2 message control ID (MSH-10) as the FHIR resource ID to guarantee idempotency across retries.",
      correctAnswer: "false",
      explanation: "**Step 1:** Recognize the idempotency requirement. When a message is retried (due to network timeout, for example), the pipeline must not create duplicate FHIR resources. Storing MSH-10 as an idempotency key in a deduplication table is a valid approach.\\n\\n**Step 2:** Identify why MSH-10 cannot be used as the FHIR resource ID. A single ORU message creates multiple FHIR resources: one Patient, one Encounter, one DiagnosticReport, and multiple Observations (one per OBX segment). All of these cannot share the same ID — FHIR resource IDs must be unique per resource type on the server.\\n\\n**Step 3:** Apply the correct pattern. Use MSH-10 as a correlation key stored in a deduplication table or as a resource.identifier, but use server-assigned IDs or deterministic UUIDs based on the patient ID + encounter ID + observation ID for the FHIR resource IDs.",
      hints: [
        "A single ORU message creates how many FHIR resources?",
        "What is the difference between a FHIR resource ID and a business identifier?",
      ],
    },
  ],

  "hlth-ehr-interoperability": [
    {
      id: "q-hlth-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A patient's care team at Hospital A needs to access their records from Hospital B using SMART on FHIR. Which OAuth 2.0 grant type is most appropriate for a clinician-facing application that accesses patient data on behalf of a logged-in user?",
      options: [
        "Client Credentials grant — the app authenticates with its own credentials, no user context needed",
        "Authorization Code grant with PKCE — the user authenticates at the EHR's authorization server and grants the app access",
        "Resource Owner Password Credentials grant — the clinician provides EHR username and password directly to the app",
        "Implicit grant — the access token is returned directly in the URL fragment for SPA performance",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the requirement for user context. The scenario involves a clinician accessing patient data — HIPAA requires that every PHI access be attributable to an individual user for audit trails. This means the app must act on behalf of a logged-in user, not as an anonymous system.\\n\\n**Step 2:** Choose the correct OAuth 2.0 flow. SMART on FHIR (HL7 SMART App Launch IG) requires the Authorization Code flow with PKCE for user-facing clinical applications. The clinician authenticates at the EHR's authorization server (not the app), which issues an authorization code. The app exchanges it for a FHIR access token scoped to specific resources (e.g., patient/*.read).\\n\\n**Step 3:** Eliminate the wrong alternatives. Client Credentials has no user context. Password Credentials grant requires the app to handle the user's EHR password, which is unacceptable for third-party apps and breaks the audit trail. Implicit grant is deprecated in OAuth 2.1 due to token leakage risks via URL fragments.",
      hints: [
        "SMART on FHIR requires that the EHR, not the app, authenticate the user. Which grant achieves this?",
        "Why is the Implicit grant deprecated for clinical apps?",
      ],
    },
    {
      id: "q-hlth-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "CommonWell Health Alliance and Carequality are both health information exchange (HIE) networks. What is the key architectural difference between them?",
      options: [
        "CommonWell uses HL7 v2 messaging while Carequality uses FHIR R4 exclusively",
        "CommonWell is a membership-based network with a centralized record locator service (RLS); Carequality is a governance framework enabling peer-to-peer query between independently operated networks",
        "Carequality requires patient consent for every record exchange; CommonWell operates on opt-out consent",
        "CommonWell is limited to hospital systems; Carequality serves only ambulatory practices",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand CommonWell's architecture. CommonWell operates a centralized infrastructure including a Record Locator Service (RLS) that maintains an index of which member organizations hold records for each patient (identified by a CommonWell Person ID). Members query the RLS to discover record locations, then retrieve documents from those locations.\\n\\n**Step 2:** Understand Carequality's architecture. Carequality is a governance and trust framework — it defines the rules, standards, and trust agreements that allow independently operated networks (like Epic's Care Everywhere) to query each other's FHIR or IHE endpoints in a federated, peer-to-peer manner. There is no central index.\\n\\n**Step 3:** Verify the correct answer. The key architectural difference is centralized RLS versus federated governance framework. Both support FHIR. Both are used across hospital and ambulatory settings. Consent models vary by state and organization, not strictly by network.",
      hints: [
        "One has a central index; the other is a rulebook for federated exchange. Which is which?",
        "How does a provider using CommonWell find out which hospitals have records for a patient?",
      ],
    },
  ],

  "hlth-telemedicine-architecture": [
    {
      id: "q-hlth-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You are designing a HIPAA-compliant telemedicine video platform. The video stream must not pass through any server that stores PHI. Which WebRTC topology satisfies this requirement while minimizing infrastructure cost?",
      options: [
        "MCU (Multipoint Control Unit) — a server mixes all video streams into one",
        "SFU (Selective Forwarding Unit) — a server routes streams without decoding; patients connect peer-to-peer through the SFU",
        "Peer-to-peer directly between browser clients with no server involvement",
        "HLS streaming via a media server that transcodes and stores segments",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Analyze the HIPAA requirement. The requirement is that no server persistently stores PHI (video in this case). The video stream itself is ephemeral — it passes through servers but is not stored there. The question is which topology minimizes the attack surface for interception or storage.\\n\\n**Step 2:** Evaluate each topology. An SFU (e.g., mediasoup, Jitsi, Daily.co) receives encrypted WebRTC packets and forwards them to other participants without decrypting, re-encoding, or storing the video content — satisfying the HIPAA concern. MCUs decode and re-encode video (high CPU, latency, and potential storage risk). Pure peer-to-peer requires both peers to expose their IP addresses via STUN and cannot scale beyond 1:1 calls or support virtual waiting rooms. HLS is unsuitable for real-time bidirectional communication.\\n\\n**Step 3:** Confirm the best choice. The SFU satisfies HIPAA's \"no persistent storage\" requirement at scale for group visits while keeping infrastructure costs lower than a full MCU.",
      hints: [
        "Does an SFU need to decrypt the video stream to forward it?",
        "What happens to bandwidth when you add a 4th participant in pure P2P versus SFU?",
      ],
    },
    {
      id: "q-hlth-16",
      type: "true-false",
      difficulty: "easy",
      question: "Under HIPAA, a telehealth platform's video streaming vendor (e.g., Zoom, Twilio) must sign a Business Associate Agreement (BAA) before the platform can transmit PHI through their infrastructure.",
      correctAnswer: "true",
      explanation: "**Step 1:** Identify the business associate definition. Under HIPAA, any vendor that creates, receives, maintains, or transmits PHI on behalf of a covered entity is a Business Associate (BA). A telehealth video vendor that transmits video containing PHI — even if it does not store the video — is transmitting PHI.\\n\\n**Step 2:** Recognize the contractual requirement. A BAA is a legally binding contract that obligates the vendor to safeguard PHI according to HIPAA standards. Without a BAA, the covered entity cannot legally allow the vendor to handle PHI.\\n\\n**Step 3:** Confirm the statement is accurate. Major telehealth vendors (Twilio, Zoom for Healthcare, Daily.co, Amazon Chime SDK) all offer BAAs. Using consumer-grade products (standard Zoom, FaceTime) without a BAA is a HIPAA violation and a common compliance audit finding.",
      hints: [
        "Who qualifies as a Business Associate under HIPAA?",
        "Does the video vendor 'transmit' PHI even if it doesn't store it?",
      ],
    },
  ],

  "hlth-cds-hooks": [
    {
      id: "q-hlth-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A hospital deploys a CDS Hooks service that fires a sepsis risk alert when a clinician opens a patient chart. The hook returns a Card with a SMART app link. Which CDS Hooks hook point is being used, and what does the EHR send in the hook request?",
      options: [
        "patient-view hook; the EHR sends the patient ID and the current user's context in a FHIR prefetch bundle",
        "order-sign hook; the EHR sends draft medication orders for the CDS service to evaluate",
        "order-select hook; the EHR sends a list of candidate SNOMED codes for the clinician to choose from",
        "appointment-book hook; the EHR sends the scheduled appointment resource",
      ],
      correctAnswer: 0,
      explanation: "**Step 1:** Identify the hook point from the scenario. The scenario describes an alert firing when a clinician \"opens a patient chart\" — this is the patient-view hook, which fires at the point of a clinician viewing a patient's record.\\n\\n**Step 2:** Identify what the EHR sends. The patient-view hook request payload contains the patientId (the patient whose chart is being viewed) and userId (the clinician). The hook request also includes a prefetch object containing pre-fetched FHIR resources (Observations, Conditions, MedicationRequests) that the CDS service declared it needs in its discovery endpoint.\\n\\n**Step 3:** Eliminate alternatives. The order-sign hook fires when a clinician signs a medication order — not when viewing a chart. The order-select hook fires during the ordering workflow. The appointment-book hook fires when scheduling an appointment. None of these match the \"open patient chart\" trigger.",
      hints: [
        "Which CDS Hooks hook fires when viewing (not ordering) a patient record?",
        "What does the EHR send in the prefetch to avoid extra round-trips?",
      ],
    },
  ],

  "hlth-de-identification": [
    {
      id: "q-hlth-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Under HIPAA's de-identification Safe Harbor method, which of the following would still be considered PHI and must be removed or transformed?",
      options: [
        "A patient's state of residence (e.g., \"California\")",
        "A 3-digit ZIP code prefix for a ZIP code region with more than 20,000 people",
        "A patient's age expressed as a single year (e.g., \"45 years old\")",
        "The month and year of a patient visit (e.g., \"March 2024\")",
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Consult the Safe Harbor identifier list. HIPAA Safe Harbor (45 CFR §164.514(b)) requires removal of 18 specific identifier categories. Dates are one category — specifically, all dates directly related to an individual, including admission dates, discharge dates, and dates of service.\\n\\n**Step 2:** Apply the date rules. A month and year like \"March 2024\" is more specific than just a year — it narrows the possible visit dates to a single month. This must be generalized to year only (\"2024\") or removed entirely.\\n\\n**Step 3:** Verify the other options are permitted. State-level geographic data (California) is permitted. A 3-digit ZIP code for a region with more than 20,000 people is explicitly permitted by the Safe Harbor rule. Ages expressed in years (not exceeding 90) are permitted.",
      hints: [
        "HIPAA Safe Harbor lists 18 identifier types. Dates are one category — what level of date granularity is allowed?",
        "Is \"March 2024\" more or less specific than just \"2024\"?",
      ],
    },
    {
      id: "q-hlth-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A data science team at a health system wants to release a dataset and applies k-anonymity with k=5. A record with ZIP=94143, Age=34, Sex=Male still appears as the ONLY record with that combination in the dataset. What additional technique should be applied and why?",
      options: [
        "Apply l-diversity to ensure each quasi-identifier group contains at least l distinct sensitive attribute values, preventing attribute disclosure",
        "Increase k to 50 to guarantee no individual can be identified",
        "Apply differential privacy noise to the ZIP code field only",
        "Remove the Sex field entirely, as it is always a HIPAA identifier",
      ],
      correctAnswer: 0,
      explanation: "**Step 1:** Recognize the failure. With k=5, each quasi-identifier group must have at least 5 records. The record in question is the only one with ZIP=94143, Age=34, Sex=Male — so it fails k-anonymity (it is unique in its group). But even if we fixed this by adding more records, k-anonymity alone does not prevent attribute disclosure.\\n\\n**Step 2:** Understand the attribute disclosure problem. Even if k-anonymity holds, an attacker who knows the quasi-identifiers (ZIP, Age, Sex) can infer sensitive information if all records in the group share the same sensitive value. For example, if all 5 patients with these quasi-identifiers have the same diagnosis, knowing the quasi-identifiers reveals the diagnosis.\\n\\n**Step 3:** Apply the correct technique. l-diversity extends k-anonymity by requiring that each equivalence class contain at least l \"well-represented\" values of the sensitive attribute. This prevents attribute disclosure even when identity disclosure is nominally blocked. Sex is not always a HIPAA identifier — it is demographic data that can be retained if properly de-identified.",
      hints: [
        "k-anonymity prevents identity disclosure but not what other type of disclosure?",
        "What does l-diversity add on top of k-anonymity?",
      ],
    },
  ],

  "hlth-consent-management": [
    {
      id: "q-hlth-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A patient revokes consent for their mental health records to be shared via the HIE. Which FHIR resource should be updated, and what field conveys the revocation?",
      options: [
        "Update the Patient resource and set Patient.active = false",
        "Create or update a Consent resource with Consent.status = \"rejected\" and appropriate provision rules restricting the mental health category",
        "Delete all mental health Observations from the FHIR server",
        "Set a flag on the Encounter resource for all mental health visits",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the correct FHIR resource. The FHIR R4 Consent resource is specifically designed to model patient consent directives, including scope (what data), purpose (why it is being accessed), and permissions (permit or deny).\\n\\n**Step 2:** Encode the revocation. Consent.status=\"rejected\" indicates the patient has actively refused consent for the specified scope. The Consent.provision element carries hierarchical permit/deny rules, including category restrictions (e.g., restricting data tagged with the LOINC sensitivity code for mental health records).\\n\\n**Step 3:** Apply the correct behavior. Downstream HIE query handlers must check applicable Consent resources before returning records. The underlying clinical data (the mental health Observations and Encounters) must NOT be deleted — the records remain clinically relevant for the treating provider within the originating organization. Consent controls external sharing, not clinical data storage.",
      hints: [
        "Which FHIR resource is specifically designed to represent a patient's consent decision?",
        "Should consent revocation delete the underlying clinical data?",
      ],
    },
  ],

  "hlth-clinical-data-warehouse": [
    {
      id: "q-hlth-21",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your team is migrating a claims + EHR clinical data warehouse to the OMOP Common Data Model (CDM). A diagnosis recorded in the EHR as ICD-10-CM code E11.9 (Type 2 diabetes, uncomplicated) needs to be stored in OMOP. Which table and vocabulary should be used?",
      options: [
        "Store in CONDITION_OCCURRENCE with concept_id mapped to SNOMED CT via the OMOP vocabulary tables",
        "Store in OBSERVATION with the raw ICD-10 code as a string in value_as_string",
        "Store in DRUG_EXPOSURE since diabetes requires medication management",
        "Store in MEASUREMENT with the ICD-10 code as measurement_source_value",
      ],
      correctAnswer: 0,
      explanation: "**Step 1:** Identify the correct OMOP table. In OMOP CDM, clinical diagnoses are stored in the CONDITION_OCCURRENCE table — one row per condition occurrence per person per visit.\\n\\n**Step 2:** Apply the correct vocabulary mapping. OMOP standardizes clinical concepts to SNOMED CT for conditions. The ETL process must look up the ICD-10-CM code E11.9 in the OMOP CONCEPT and CONCEPT_RELATIONSHIP tables to find the corresponding SNOMED CT concept_id. The source_concept_id stores the native ICD-10 code, and condition_concept_id stores the standardized SNOMED CT concept.\\n\\n**Step 3:** Eliminate the wrong alternatives. OBSERVATION is for measurements and assessments, not diagnoses. DRUG_EXPOSURE is for medication records. MEASUREMENT is for lab results and vital signs. Using the wrong table would make the diagnosis invisible to standard OMOP analytics.",
      hints: [
        "OMOP CDM has specific tables for conditions, drugs, measurements, and observations — which table is for diagnoses?",
        "OMOP standardizes to which vocabulary for conditions?",
      ],
    },
    {
      id: "q-hlth-22",
      type: "true-false",
      difficulty: "medium",
      question: "In an OMOP CDM data warehouse, the PERSON table stores one row per patient and the VISIT_OCCURRENCE table stores one row per clinical encounter, allowing a single patient to have multiple visits over time.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand the PERSON table. PERSON is the central patient table in OMOP CDM. It contains one row per patient with demographics (gender, birth year, race, ethnicity) and serves as the parent table for all clinical data.\\n\\n**Step 2:** Understand the VISIT_OCCURRENCE table. VISIT_OCCURRENCE stores individual encounters — one row per visit (inpatient stay, outpatient visit, emergency department visit, etc.). The person_id foreign key links each visit to the patient.\\n\\n**Step 3:** Confirm the statement is accurate. All clinical event tables (CONDITION_OCCURRENCE, DRUG_EXPOSURE, MEASUREMENT, OBSERVATION, PROCEDURE_OCCURRENCE) reference both person_id and visit_occurrence_id, enabling queries like \"find all lab results for diabetic patients during inpatient stays in 2023.\"",
      hints: [
        "How does OMOP represent the relationship between a patient and their multiple visits?",
        "What is the primary key in PERSON and the foreign key in VISIT_OCCURRENCE?",
      ],
    },
  ],

  "hlth-phi-audit-logging": [
    {
      id: "q-hlth-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You must design a tamper-evident PHI audit log system for a large EHR. Logs must prove in court that no entries were deleted or modified after creation. Which design pattern achieves this?",
      options: [
        "Write logs to the application database with an updated_at timestamp trigger",
        "Use an append-only log with cryptographic chaining: each entry's hash includes the hash of the previous entry, so modification of any entry invalidates all subsequent hashes",
        "Write logs to an S3 bucket with versioning enabled",
        "Use a separate read-only database replica for audit data",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the court-admissibility requirement. A tamper-evident log must provide cryptographic proof that no entry was modified or deleted after creation. A court must be able to verify the log's integrity independently of the system that created it.\\n\\n**Step 2:** Evaluate cryptographic hash chaining. Each log entry contains a SHA-256 hash computed from (entry_data + previous_entry_hash). Modifying any past entry changes its hash, which cascades to invalidate every subsequent hash in the chain. This makes tampering detectable by anyone with the chain.\\n\\n**Step 3:** Eliminate inadequate alternatives. updated_at triggers can be modified or bypassed by someone with database access. S3 versioning prevents overwriting but does not prevent deletion of specific versions. A read-only replica can be modified at the storage level and provides no cryptographic proof of integrity. AWS QLDB (Quantum Ledger Database) implements hash chaining for this exact healthcare compliance use case.",
      hints: [
        "How do blockchain systems detect that historical blocks were not modified?",
        "What happens to all hashes downstream if you change one entry in the middle of a hash-chained log?",
      ],
    },
  ],

  "hlth-lab-results-pipeline": [
    {
      id: "q-hlth-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A lab interface sends HL7 v2 ORU messages with OBX segments containing lab results. A serum potassium value of 6.2 mEq/L arrives with OBX-8 (Abnormal Flags) set to \"H\" and OBX-5.3 (reference range) of \"3.5-5.0\". How should the clinical pipeline handle this?",
      options: [
        "Persist the result as a normal Observation and let the clinician notice the value",
        "Reject the message and request retransmission from the lab system",
        "Persist the Observation with Observation.interpretation coded as \"H\" (High), trigger a critical value workflow if the value exceeds a configurable critical threshold (e.g., >6.0), and send an alert to the ordering provider",
        "Convert the result to a Condition resource with ICD-10 code E87.5 (Hyperkalemia) automatically",
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Assess the clinical significance. A potassium of 6.2 mEq/L is above the reference range (3.5-5.0) AND above most labs' critical high threshold (typically 6.0 mEq/L due to cardiac arrhythmia risk). This requires both flagging and alerting.\\n\\n**Step 2:** Execute the correct pipeline behavior. The pipeline should: (1) Map OBX-8=\"H\" to FHIR Observation.interpretation with code \"H\" from the HL7 v2 interpretation code system. (2) Evaluate the numeric value against a configurable critical threshold. (3) If critical, trigger a CDS alert workflow within the regulatory timeframe (The Joint Commission requires notification of critical values within 30-60 minutes).\\n\\n**Step 3:** Eliminate the wrong alternatives. Persisting without alerting lets a dangerous value go unnoticed. Rejecting the message wastes clinical time and delays care. Automatic ICD-10 coding is inappropriate without clinical validation by a provider.",
      hints: [
        "What does OBX-8 \"H\" indicate in HL7 v2?",
        "What is the clinical risk of a potassium of 6.2, and what does The Joint Commission require for critical values?",
      ],
    },
  ],

  "hlth-medication-reconciliation": [
    {
      id: "q-hlth-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A patient is admitted to the hospital taking warfarin and is prescribed fluconazole for a fungal infection. Which system component should flag this interaction and what is the correct FHIR-based implementation?",
      options: [
        "The EHR billing system should flag the interaction based on CPT codes",
        "A drug-drug interaction (DDI) checking service should be invoked via CDS Hooks order-sign hook; if the interaction is detected, the service returns a Warning Card with the interaction details and suggested alternatives",
        "The pharmacy system should reject the order silently and not notify the prescriber",
        "The FHIR MedicationRequest resource has a built-in DDI check field that evaluates automatically",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Assess the clinical risk. Warfarin + fluconazole is a major DDI. Fluconazole inhibits CYP2C9, significantly increasing warfarin levels and bleeding risk. This interaction must be flagged at the point of ordering.\\n\\n**Step 2:** Identify the correct architecture. The CDS Hooks order-sign hook fires when a clinician finalizes a medication order. The DDI checking service — powered by a clinical knowledge database (First Databank, Multum, or DrugBank) — evaluates the patient's current medication list against the new order and returns a Warning or Critical severity Card with interaction details and alternatives.\\n\\n**Step 3:** Eliminate the wrong alternatives. The EHR billing system operates after clinical decisions are made — it cannot flag DDIs at the point of care. Silent rejection by the pharmacy without notification is dangerous and clinically unacceptable. FHIR MedicationRequest has no native DDI checking capability — that is a CDS service responsibility.",
      hints: [
        "What CDS Hooks hook fires at the point of ordering a medication?",
        "Who should check for drug interactions — the FHIR resource or an external clinical knowledge service?",
      ],
    },
  ],

  "hlth-clinical-nlp": [
    {
      id: "q-hlth-26",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A clinical NLP pipeline extracts diagnoses from discharge summaries to auto-populate ICD-10 codes. The text reads: \"There is no evidence of pneumonia on the current chest X-ray.\" A naive NER model extracts \"pneumonia\" and codes J18.9. What NLP technique is missing and why is it critical?",
      options: [
        "Coreference resolution — to link \"pneumonia\" to its earlier mention in the document",
        "Negation detection — to recognize that \"no evidence of\" negates the clinical finding and the condition should not be coded as present",
        "Relation extraction — to link \"pneumonia\" to \"chest X-ray\" as its anatomical site",
        "Sentence segmentation — to handle the long sentence correctly before NER",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify what the naive model did wrong. The naive NER model extracted \"pneumonia\" as a diagnosis, ignoring the negation context. The phrase \"no evidence of\" explicitly states that pneumonia is NOT present — this is a negation cue.\\n\\n**Step 2:** Apply negation detection. Negation detection is among the most critical components of clinical NLP. Algorithms like NegEx, ConText, and NegBio detect negation cues (\"no\", \"denies\", \"ruled out\", \"negative for\") within a defined window around clinical concepts. In this sentence, \"no evidence of\" is a negation trigger within the detection window of \"pneumonia.\"\\n\\n**Step 3:** Understand why it is critical. Coding negated findings as present diagnoses causes false quality metrics (e.g., hospital-acquired infection rates), incorrect risk adjustment, and potentially harmful treatment decisions. ICD-10 guidelines explicitly require coding only confirmed diagnoses. Clinical NLP pipelines at Flatiron, Veracyte, and Google Health Research all implement negation detection as a foundational step.",
      hints: [
        "What does \"no evidence of X\" mean clinically — does the patient have X?",
        "Look up the NegEx algorithm — what problem does it solve in clinical NLP?",
      ],
    },
  ],

  "hlth-population-health": [
    {
      id: "q-hlth-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A population health platform needs to identify patients with uncontrolled Type 2 diabetes for a care management outreach program. Which query against an OMOP CDM or FHIR server best identifies this cohort?",
      options: [
        "Find all patients with ICD-10 code E11 and send them all an outreach message",
        "Find patients with a Type 2 diabetes diagnosis (SNOMED 44054006) who have had an HbA1c Observation (LOINC 4548-4) value >9% in the last 12 months and no endocrinology visit in the last 6 months",
        "Find all patients who have ever been prescribed metformin",
        "Find all patients with a BMI over 30",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify why simple diagnosis filtering is insufficient. Diabetes patients whose HbA1c is well-controlled (e.g., <7%) with regular specialist care do not need care management outreach. A query that includes all diabetics is over-broad and wastes care management resources.\\n\\n**Step 2:** Apply multi-criteria phenotyping. Uncontrolled diabetes is defined by ADA guidelines as HbA1c >9%. Combining diagnosis (confirms the condition exists), lab results (HbA1c >9% indicates poor glycemic control), and utilization patterns (no recent endocrinology visit suggests a care gap) produces a precise cohort for intervention.\\n\\n**Step 3:** Eliminate the insufficient alternatives. Metformin prescription indicates diabetes treatment, not uncontrolled disease. BMI >30 identifies obesity risk, not diabetes control specifically. This multi-criteria approach is used in HEDIS quality measures and value-based care programs.",
      hints: [
        "What HbA1c threshold does the ADA define as \"uncontrolled\" diabetes?",
        "Why is combining diagnosis + lab value + utilization more precise than any single criterion alone?",
      ],
    },
  ],

  "hlth-remote-patient-monitoring": [
    {
      id: "q-hlth-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A remote patient monitoring (RPM) system receives continuous heart rate data from 10,000 wearable devices. You need to alert a care team within 60 seconds when a patient's heart rate exceeds 150 bpm for more than 2 consecutive minutes. What architecture handles this at scale?",
      options: [
        "Batch-process all device readings nightly in a data warehouse and email alerts the next day",
        "Use a stream processing engine (e.g., Apache Kafka + Flink or AWS Kinesis + Lambda) with a stateful windowing operator that tracks each patient's recent readings and triggers alerts when the threshold condition is met within the time window",
        "Store all readings in a relational database and poll with a cron job every minute",
        "Have each device send an alert directly to the care team's pager without server-side processing",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the real-time requirement. The SLA is 60-second alert latency across 10,000 devices with stateful condition detection (heart rate >150 bpm for >2 consecutive minutes). This requires processing data within seconds of arrival, not in batch.\\n\\n**Step 2:** Evaluate stream processing. Apache Kafka decouples device ingestion from processing. Apache Flink or AWS Kinesis Data Analytics maintains per-patient state in a 2-minute sliding window, evaluating the threshold condition as each reading arrives and triggering an alert when the condition is met. This handles 10,000 devices with sub-minute latency.\\n\\n**Step 3:** Eliminate the wrong alternatives. Nightly batch processing completely fails the 60-second requirement. Cron polling of a relational database adds up to 1 minute of polling latency on top of processing time and cannot maintain stateful windows efficiently. Device-side alerting has no server-side validation, routing, or escalation.",
      hints: [
        "What category of data processing is needed when you must detect a pattern in the most recent N minutes of data per patient?",
        "How does stateful stream processing differ from stateless event processing?",
      ],
    },
  ],

  "hlth-dicom-imaging": [
    {
      id: "q-hlth-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A radiology platform needs to retrieve a DICOM CT scan series for display in a web-based viewer. Which standard API should be used to retrieve the image data in a web-friendly format?",
      options: [
        "HL7 FHIR ImagingStudy resource — it contains the pixel data as a base64-encoded attachment",
        "DICOM WADO-RS (Web Access to DICOM Objects - RESTful Services) — retrieves studies, series, and instances as multipart MIME responses",
        "DICOM C-MOVE — sends images from the PACS to a specified destination using DICOM network protocol",
        "FHIR Binary resource — streams raw DICOM files as octet-stream attachments",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the standard for web-based DICOM retrieval. WADO-RS (DICOMweb, DICOM PS3.18) is the RESTful standard for web-based retrieval of DICOM objects. A viewer issues GET requests to endpoints like /studies/{studyUID}/series/{seriesUID}/instances to retrieve DICOM instances as multipart/related responses.\\n\\n**Step 2:** Understand the role of FHIR ImagingStudy. The FHIR ImagingStudy resource is a metadata resource that carries references (URLs) to the WADO-RS endpoint — it does not embed pixel data. The viewer uses ImagingStudy to discover what series and instances exist, then retrieves pixel data via WADO-RS.\\n\\n**Step 3:** Eliminate the wrong alternatives. C-MOVE is the traditional DICOM network protocol requiring a separate DICOM listener and is not web-friendly. FHIR Binary streams raw DICOM files without the multipart MIME packaging that web viewers expect. Base64-encoding DICOM in FHIR would be enormously inefficient.",
      hints: [
        "DICOMweb has three components: QIDO-RS (query), STOW-RS (store), and what for retrieval?",
        "Does FHIR ImagingStudy embed pixel data or reference it externally?",
      ],
    },
  ],

  "hlth-prior-authorization": [
    {
      id: "q-hlth-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "CMS's interoperability rules require payers to implement a Prior Authorization API by January 2026. Which FHIR Implementation Guide defines the technical standard for electronic prior authorization, and what FHIR workflow pattern does it use?",
      options: [
        "Da Vinci Coverage Requirements Discovery (CRD) IG using CDS Hooks; Da Vinci Prior Authorization Support (PAS) IG using FHIR Claims and ClaimResponse resources",
        "SMART on FHIR using Authorization Code flow with the claim resource as the token payload",
        "HL7 v2 270/271 eligibility transactions converted to FHIR Observation resources",
        "CMS-9115 requires use of EDI 837P transactions transmitted via FHIR Binary resources",
      ],
      correctAnswer: 0,
      explanation: "**Step 1:** Identify the relevant Implementation Guides. The HL7 Da Vinci Project defines the FHIR standards for payer-provider interoperability. Coverage Requirements Discovery (CRD) IG uses CDS Hooks to surface payer coverage requirements at the point of care ordering. Prior Authorization Support (PAS) IG defines how to submit and track prior authorization requests using FHIR Claim and ClaimResponse resources.\\n\\n**Step 2:** Understand the regulatory context. CMS's CMS-0057-F rule (effective January 2026) mandates these APIs for Medicare Advantage, Medicaid, and CHIP payers. The FHIR Claim resource maps from the X12 278 prior authorization transaction.\\n\\n**Step 3:** Eliminate the wrong alternatives. SMART on FHIR is for OAuth-based app authorization, not prior authorization workflows. HL7 v2 270/271 is eligibility inquiry, not prior authorization. CMS-9115 specifies the API requirements, not EDI 837P transmitted via FHIR Binary.",
      hints: [
        "The Da Vinci Project produces FHIR IGs for payer-provider interoperability — which ones cover prior auth?",
        "What FHIR resource represents a payer claim or authorization request?",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
