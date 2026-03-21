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
      explanation: "The FHIR R4 Observation resource is the correct container for measurements, lab results, and vital signs such as blood pressure. An Observation links to the Patient and Encounter, carries a LOINC code (e.g., 85354-9 for blood pressure panel), and stores the component values (systolic, diastolic) as nested component elements. Condition captures diagnoses, Encounter captures the visit metadata, and Procedure captures interventions.",
      hints: [
        "Vital signs are a subtype of what broader concept — findings or procedures?",
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
      explanation: "FHIR favors independent resources linked by references over deep nesting. The Coverage resource has a Coverage.beneficiary field that references the Patient, and Coverage.payor that references the Organization (insurer). This keeps the Patient resource focused on demographics and lets Coverage be queried, updated, and versioned independently. Contained resources should only be used when the contained resource has no independent existence outside its container.",
      hints: [
        "In FHIR, which direction does the reference usually flow — from Coverage to Patient or Patient to Coverage?",
        "When should you use contained resources vs independent references?",
      ],
    },
    {
      id: "q-hlth-3",
      type: "true-false",
      difficulty: "easy",
      question: "In FHIR R4, the Encounter resource represents a single interaction between a patient and a healthcare provider, and it can reference both the Patient and the Condition(s) being addressed during that visit.",
      correctAnswer: "True",
      explanation: "The FHIR R4 Encounter resource does represent a single patient-provider interaction (e.g., an office visit, ER visit, or telehealth session). It carries references to the Patient (subject), the practitioners involved (participant), the location, and the reason codes or Condition references (reasonReference) that motivated the visit. This allows downstream queries like \"find all encounters for patients with diabetes in the past year.\"",
      hints: [
        "Look at the Encounter.reasonReference field in the FHIR R4 spec.",
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
      explanation: "_include instructs the FHIR server to follow references FROM the matched resources and include the referenced targets in the same Bundle. Observation.performer references the Practitioner, so _include=Observation:performer fetches those Practitioner records alongside the Observations. _revinclude goes the other direction: it includes resources that REFERENCE the matched set (e.g., finding all Observations that reference a specific Patient). This distinction is critical for efficient FHIR query design at Epic and Cerner.",
      hints: [
        "Does the reference point from Observation to Practitioner, or from Practitioner to Observation?",
        "_include follows references outward; _revinclude follows references inward.",
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
      explanation: "FHIR pagination uses the Bundle.link array. An entry with relation=\"next\" provides the opaque URL for the next page; the server manages cursor state. Bundle.total (when present) gives the total number of matching resources across all pages — note that FHIR servers may omit Bundle.total for performance reasons. Clients must not construct page URLs manually; they must follow the server-provided next link because servers may use cursor tokens, keyset pagination, or other opaque strategies internally.",
      hints: [
        "The FHIR spec says page URLs are opaque — never reconstruct them yourself.",
        "Bundle has both .total and .link[] — which one tells you about more pages vs total count?",
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
      explanation: "HIPAA's Technical Safeguard rule (45 CFR §164.312(b)) requires audit controls that record and examine activity in information systems that contain or use ePHI. The minimum elements are: user identity, timestamp, action performed (read/write/delete), and the resource accessed (patient ID, record type). Logging only failures is insufficient — successful accesses are the primary vector for insider threats. Logging full PHI content in audit logs creates secondary PHI exposure risk and is not required.",
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
      correctAnswer: "True",
      explanation: "This reflects the distinction between HIPAA's \"required\" and \"addressable\" implementation specifications. Encryption in transit (45 CFR §164.312(e)(2)(ii)) is addressable — but the standard it supports (transmission security, §164.312(e)(1)) is required, and in practice unencrypted internet transmission is indefensible. Encryption at rest (§164.312(a)(2)(iv)) is also addressable. Organizations must document why an alternative is reasonable and appropriate if they do not encrypt at rest. Most cloud EHR vendors (Epic, Cerner, Google Health) encrypt both in transit and at rest by default.",
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
      explanation: "The HIPAA Minimum Necessary standard requires limiting PHI access to the minimum needed for each user's role. ABAC enforces this by evaluating contextual attributes — the user's role (physician, nurse, billing), the patient-provider relationship (is this provider treating this patient?), and record sensitivity (mental health, substance abuse covered by 42 CFR Part 2). Critically, this must be enforced at or near the data layer, not solely in application code, to prevent privilege escalation bypasses. Encryption alone is not access control. Application-layer-only filtering can be bypassed by compromised application code.",
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
      explanation: "In the Fellegi-Sunter model, for each comparison field (name, DOB, SSN), m(a) is P(agreement | true match) — how often the field agrees when two records are truly the same person — and u(a) is P(agreement | true non-match) — how often the field happens to agree by chance for different people. The log-likelihood weight for a field agreeing is log(m/u) and for disagreeing is log((1-m)/(1-u)). A common last name like \"Smith\" has a high u-probability (many non-matches share it), so it contributes less weight than a rare name. This model underpins patient matching in Epic MPI, IBM Initiate, and EMPI systems used at Cerner.",
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
      explanation: "Patient matching must account for nicknames, data entry errors, and name variations. Phonetic algorithms (Soundex, Double Metaphone) encode names by how they sound, so \"Jon\" and \"John\" produce the same code. String similarity metrics (Jaro-Winkler, Levenshtein distance) measure edit distance. In production MPIs like those at Epic and IBM Initiate, these signals are combined as features in the probabilistic scoring model. Relying solely on SSN is dangerous because SSNs are frequently missing, incorrectly entered, or shared across family members.",
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
      explanation: "An HL7 v2 ORU^R01 message carries OBR (observation request/report header) and OBX (observation result) segments. The canonical FHIR mapping is: MSH/PID segments map to Patient identity; PV1 maps to Encounter; OBR maps to DiagnosticReport; each OBX maps to an Observation. DiagnosticReport.result[] references the individual Observations. The pipeline should first perform MPI lookup to find or create the Patient, resolve the Encounter, then persist the DiagnosticReport and Observations atomically via a FHIR transaction Bundle. This is the pattern used by Google Cloud Healthcare API's HL7v2 store and Azure Health Data Services.",
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
      correctAnswer: "False",
      explanation: "While using MSH-10 as a correlation key for idempotency tracking is a good practice, it should NOT be used directly as the FHIR resource ID. FHIR resource IDs must be unique per resource type on the server, and a single HL7 v2 message creates multiple FHIR resources (Patient, Encounter, DiagnosticReport, multiple Observations) — they cannot all have the same ID. The correct approach is to use MSH-10 as an idempotency key stored in a separate deduplication table or as a resource.identifier, and to use the MPI-assigned patient ID and server-generated or deterministic UUIDs for FHIR resource IDs.",
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
      explanation: "SMART on FHIR (HL7 SMART App Launch IG) requires the Authorization Code flow with PKCE for user-facing clinical applications. The clinician authenticates at the EHR's authorization server (e.g., Epic's OAuth endpoint), which issues an authorization code. The app exchanges it for a FHIR access token scoped to specific resources (e.g., patient/*.read). This preserves user identity context critical for HIPAA audit trails. Client Credentials is appropriate for backend system-to-system integration without a user context. The Implicit grant is deprecated in OAuth 2.1 due to token leakage risks.",
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
      explanation: "CommonWell Health Alliance operates a centralized infrastructure including a Record Locator Service (RLS) that tracks which member organizations hold records for a given patient (identified by a Common Key). Members query the RLS to discover record locations, then retrieve documents. Carequality is a governance and trust framework — it sets rules for how organizations can query each other's FHIR/IHE endpoints in a federated, peer-to-peer manner. Epic's Care Everywhere and other networks connect via Carequality. CommonWell members can access Carequality networks through a bridge. Both support the ONC's interoperability goals but with different trust and routing models.",
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
      explanation: "An SFU (e.g., mediasoup, Jitsi, Daily.co's infrastructure) forwards encrypted WebRTC streams without decrypting or storing them, satisfying HIPAA's requirement that PHI not be persistently stored outside HIPAA-covered infrastructure. Pure peer-to-peer WebRTC works for 1:1 calls but requires both peers to expose their IP addresses via STUN and cannot scale to group visits or virtual waiting rooms. MCUs decode and re-encode video (high CPU cost and latency) and may buffer frames (storage concern). HLS is unsuitable for real-time bidirectional communication. Twilio Video and Amazon Chime SDK use SFU architectures for telehealth.",
      hints: [
        "Does an SFU need to decrypt the video stream to forward it?",
        "What happens to bandwidth when you add a 4th participant in pure P2P vs SFU?",
      ],
    },
    {
      id: "q-hlth-16",
      type: "true-false",
      difficulty: "easy",
      question: "Under HIPAA, a telehealth platform's video streaming vendor (e.g., Zoom, Twilio) must sign a Business Associate Agreement (BAA) before the platform can transmit PHI through their infrastructure.",
      correctAnswer: "True",
      explanation: "Any vendor that creates, receives, maintains, or transmits PHI on behalf of a covered entity is a Business Associate under HIPAA. A BAA is a contract that obligates the vendor to safeguard PHI according to HIPAA standards. Twilio, Zoom (healthcare version), Daily.co, and Amazon Chime all offer BAAs for their healthcare customers. Using a consumer video product (e.g., standard Zoom or FaceTime) without a BAA is a HIPAA violation. This is a common question at Epic and Google Health interviews regarding telemedicine compliance architecture.",
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
      explanation: "The CDS Hooks patient-view hook fires when a clinician opens a patient chart. The EHR sends a context payload containing the patientId and userId, plus a prefetch object with pre-fetched FHIR resources (Observations, Conditions, MedicationRequests) the CDS service declared in its discovery endpoint. The CDS service evaluates the patient's data and returns Cards — informational alerts, suggestion cards, or app launch links. For sepsis alerting, the service would consume recent vitals and labs from the prefetch bundle and return an alert card if the sepsis risk score exceeds threshold. Flatiron and Epic both use this pattern for oncology and sepsis CDS.",
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
      explanation: "HIPAA Safe Harbor (45 CFR §164.514(b)) requires removal of 18 specific identifier categories. Dates (other than year) directly related to an individual — including admission dates, discharge dates, and dates of service — must be removed. A month+year combination (March 2024) is a date more specific than just the year and must be generalized to year only (2024). State-level geographic data is permitted. 3-digit ZIP codes are permitted if the region has >20,000 people. Ages under 90 expressed in years are permitted. This is a common Flatiron and Google Health interview question about building de-identified oncology datasets.",
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
      explanation: "The scenario describes a failure of k-anonymity: a record is not k-anonymous if its quasi-identifier combination appears fewer than k times. But even when k-anonymity holds, it does not prevent attribute disclosure if all records in a group share the same sensitive value (e.g., all 5 records with ZIP=94143, Age=34 have the same diagnosis). l-diversity extends k-anonymity by requiring that each equivalence class (group of records sharing the same quasi-identifiers) contain at least l \"well-represented\" values of the sensitive attribute. This prevents an attacker from inferring a specific diagnosis even if they know the quasi-identifiers. Veracyte and Flatiron apply these techniques when sharing genomics datasets.",
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
      explanation: "The FHIR R4 Consent resource models patient consent directives, including scope (what data), purpose (why), and permissions (permit/deny). Consent.status=\"rejected\" indicates the patient has actively refused consent. The Consent.provision element carries hierarchical permit/deny rules, including category restrictions (e.g., restricting data tagged with the LOINC sensitivity code for mental health). Downstream HIE query handlers must check applicable Consent resources before returning records. Deleting records is inappropriate — the records remain clinically relevant for the treating provider; consent controls external sharing. Apple Health and CommonWell both respect FHIR Consent directives in their exchange models.",
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
      explanation: "OMOP CDM stores clinical diagnoses in the CONDITION_OCCURRENCE table. The source_concept_id holds the native ICD-10 code concept, and condition_concept_id holds the SNOMED CT concept it maps to via the OMOP standardized vocabulary (the CONCEPT and CONCEPT_RELATIONSHIP tables). OMOP standardizes to SNOMED CT for conditions because it provides richer semantic relationships. The ETL must look up E11.9 in the vocabulary and populate both the source and standard concept IDs. This bidirectional mapping enables both source-faithful queries and cross-network studies where different sites used different coding systems. Google Health and All of Us Research Program use OMOP for federated analytics.",
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
      correctAnswer: "True",
      explanation: "This is a fundamental aspect of the OMOP CDM schema design. PERSON is the central patient table (one row per person) containing demographics. VISIT_OCCURRENCE stores individual encounters (one row per visit) with a foreign key person_id linking to PERSON. All clinical events — conditions, drugs, measurements, observations, procedures — reference both a person_id and a visit_occurrence_id, enabling queries like \"find all lab results for diabetic patients during inpatient stays in 2023.\" This star-schema-like design enables efficient cohort queries across large healthcare datasets as used in the OHDSI network.",
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
      explanation: "Cryptographic hash chaining (as used in blockchain and certificate transparency logs) is the gold standard for tamper-evident logs. Each log entry includes a SHA-256 hash of (entry_data + previous_entry_hash), forming an immutable chain. Modifying any past entry changes its hash, which cascades to invalidate every subsequent hash in the chain — making tampering detectable. AWS QLDB (Quantum Ledger Database) implements this exact pattern for healthcare audit logs. S3 versioning prevents overwriting but does not prevent deletion of versions. A read-only replica can be modified at the storage level. Epic's EHR maintains tamper-evident audit logs using similar chaining for HIPAA compliance.",
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
      explanation: "A potassium of 6.2 mEq/L is both abnormal (above the reference range) and potentially critical (many labs set the critical high threshold for potassium at 6.0 mEq/L due to cardiac arrhythmia risk). The pipeline should: (1) map OBX-8=\"H\" to FHIR Observation.interpretation with code \"H\" from the HL7 v2 interpretation code system; (2) evaluate the value against configurable critical thresholds; (3) if critical, trigger a CDS alert workflow to notify the ordering clinician within regulatory timeframes (The Joint Commission requires critical value notification). Automatic ICD-10 coding is inappropriate without clinical validation. Rejection wastes clinical time.",
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
      explanation: "Warfarin + fluconazole is a major DDI: fluconazole inhibits CYP2C9, significantly increasing warfarin levels and bleeding risk. The CDS Hooks order-sign hook fires when a clinician finalizes a medication order, providing the draft MedicationRequest(s) as context. The DDI service (e.g., powered by First Databank, Multum, or an open-source database like DrugBank) evaluates the patient's current medication list against the new order and returns a Warning or Critical severity Card. The clinician can acknowledge the alert, override with documentation, or choose an alternative. This is exactly the pattern used in Epic's Medication Management and Flatiron's pharmacy integration. FHIR MedicationRequest has no native DDI checking — that is a CDS service concern.",
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
      explanation: "Negation detection is among the most critical components of clinical NLP. Medical text frequently uses negation (\"no\", \"denies\", \"ruled out\", \"negative for\") to exclude conditions. Coding negated findings as present diagnoses causes false coding, incorrect quality metrics, and potentially harmful treatment decisions. The NegEx algorithm and its successors (ConText, NegBio) detect negation cues in a window around clinical concepts. In the sentence \"no evidence of pneumonia,\" \"no evidence of\" is a negation trigger within the detection window of \"pneumonia.\" Clinical NLP pipelines at Flatiron, Veracyte, and Google Health Research all implement negation detection before coding. ICD-10 guidelines explicitly require coding only confirmed diagnoses.",
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
      explanation: "Effective cohort identification for uncontrolled diabetes requires combining diagnosis (to confirm the condition exists), lab results (HbA1c >9% indicates poor glycemic control per ADA guidelines), and utilization patterns (no specialist visit suggests potential care gap). A query using only diagnosis codes includes well-controlled patients who do not need intervention. Metformin prescription alone does not indicate uncontrolled disease. BMI alone identifies obesity risk, not diabetes control. This multi-criteria phenotyping approach is used in HEDIS quality measures and value-based care programs. Epic Healthy Planet and Google Health's Care Studio implement this type of risk stratification.",
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
      explanation: "This is a real-time stream processing problem requiring stateful windowing. Apache Flink or AWS Kinesis Data Analytics can maintain per-patient state (recent heart rate readings) in a 2-minute sliding or tumbling window and fire an alert when the threshold condition persists. Kafka decouples ingestion from processing at 10,000-device scale. A cron-job polling approach adds up to 1 minute of latency on top of alert evaluation time, missing the 60-second SLA. Batch processing is completely wrong for real-time clinical alerts. Device-side alerting has no server-side validation or care team routing. Apple Health and Withings RPM platforms use stream processing architectures for alert generation.",
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
      explanation: "WADO-RS (DICOMweb, DICOM PS3.18) is the RESTful standard for web-based DICOM retrieval. A viewer issues GET requests to endpoints like /studies/{studyUID}/series/{seriesUID}/instances to retrieve DICOM instances as multipart/related responses. The companion standards STOW-RS (store) and QIDO-RS (query) complete the DICOMweb suite. FHIR ImagingStudy is a metadata resource that carries references (URLs) to the WADO-RS endpoint — it does not embed pixel data. C-MOVE is the traditional DICOM network protocol requiring a separate DICOM listener destination. Google Cloud Healthcare API's DICOM store and AWS HealthImaging both implement WADO-RS.",
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
      explanation: "The HL7 Da Vinci Project defines the standard for electronic prior authorization (ePA). The Coverage Requirements Discovery (CRD) IG uses CDS Hooks to surface payer requirements at the point of care ordering. The Prior Authorization Support (PAS) IG defines how to submit a prior authorization request using FHIR Claim resource (mapped from X12 278) and receive a ClaimResponse with approval/denial. The Burden Reduction IG links these workflows. CMS's CMS-0057-F rule (effective January 2026) mandates these APIs for Medicare Advantage, Medicaid, and CHIP payers. Epic, Cerner, and major payers are actively implementing this stack. This is a frequently asked Google Health and Epic interview question.",
      hints: [
        "The Da Vinci Project produces FHIR IGs for payer-provider interoperability — which ones cover prior auth?",
        "What FHIR resource represents a payer claim or authorization request?",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
