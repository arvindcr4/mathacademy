import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-sec-oauth-jwt": [
    {
      id: "q-sdi-sec-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the OAuth 2.0 Authorization Code flow, which party issues the access token after the authorization code is exchanged?",
      options: [
        "The resource server (e.g., the API)",
        "The client application",
        "The authorization server (e.g., Google's OAuth endpoint)",
        "The browser / user agent",
      ],
      correctAnswer: 2,
      explanation: "The authorization server is the entity that authenticates the user, issues the authorization code to the redirect URI, and then exchanges that code for an access token when the client presents it along with its client secret. The resource server only validates the resulting token. This separation means the resource server never needs to handle user credentials.",
      hints: [
        "Think about which server the client sends its client_secret to during the code exchange step.",
        "The resource server trusts tokens — it does not issue them.",
      ],
    },
    {
      id: "q-sdi-sec-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A JSON Web Token (JWT) consists of three Base64URL-encoded parts separated by dots. What are they in order?",
      options: [
        "Payload, Header, Signature",
        "Header, Signature, Payload",
        "Header, Payload, Signature",
        "Signature, Header, Payload",
      ],
      correctAnswer: 2,
      explanation: "A JWT is structured as Header.Payload.Signature. The header contains the algorithm (e.g., RS256). The payload contains claims such as sub, iat, exp. The signature is computed over the encoded header and payload using the secret or private key, enabling any party with the public key to verify integrity without a network round-trip to an auth server.",
      hints: [
        "The acronym HPS — Header, Payload, Signature — matches the dot-separated order.",
        "Which part must be verified to trust the claims? That part logically comes last.",
      ],
    },
    {
      id: "q-sdi-sec-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user's JWT access token is compromised. The system uses stateless JWT verification with a 1-hour expiry. What is the PRIMARY limitation that prevents immediate revocation?",
      options: [
        "JWTs cannot be decoded without the private key, so revocation is impossible.",
        "Because validation is done locally against a public key with no server call, there is no shared state to mark a token as revoked before it expires.",
        "The token can be revoked by rotating the signing key, but this takes exactly 1 hour.",
        "Opaque tokens have the same revocation limitation as JWTs.",
      ],
      correctAnswer: 1,
      explanation: "Stateless JWTs are validated by checking the cryptographic signature and expiry claim locally — no network call to the auth server is required. This is their scalability advantage, but it also means there is nowhere to record 'this specific token is revoked.' Solutions include short expiry windows, a token blocklist (requiring a fast shared store like Redis, sacrificing some statefulness), or switching to opaque tokens with introspection. Okta and Auth0 both document this trade-off.",
      hints: [
        "Stateless means no per-request call to the auth server — what is the downside of that?",
        "Compare with opaque tokens: how does the resource server validate those?",
      ],
    },
    {
      id: "q-sdi-sec-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In refresh token rotation with family invalidation, what happens when a previously used (rotated-away) refresh token is presented?",
      options: [
        "A new access token is issued because the refresh token is still cryptographically valid.",
        "Only the presented token is invalidated; the current valid token in the family is preserved.",
        "The entire token family is immediately invalidated, logging out the user on all devices.",
        "The authorization server issues a new refresh token and ignores the reuse signal.",
      ],
      correctAnswer: 2,
      explanation: "Refresh token rotation issues a new refresh token on every use and retires the old one. If an old token from the same family is ever replayed (a sign of theft), the server detects reuse and invalidates the entire family — all refresh tokens derived from the same root. This is the scheme used by Auth0 and described in OAuth 2.0 Security Best Current Practice (RFC 9700). It forces a re-login but prevents a stolen refresh token from granting indefinite access.",
      hints: [
        "What signal does a replayed refresh token send? An attacker has a copy — what is the safest response?",
        "Think 'family' — if one token is compromised, how does the blast radius stay contained?",
      ],
    },
    {
      id: "q-sdi-sec-5",
      type: "true-false",
      difficulty: "easy",
      question: "Server-side sessions are inherently more scalable than client-side JWTs because the server does not need to store any session data.",
      correctAnswer: "False",
      explanation: "The statement is backwards. Server-side sessions require the server (or a shared store like Redis) to store session state for every logged-in user, which creates scaling and sticky-session challenges. Client-side JWTs carry all claims in the token itself, so validation is stateless and any server replica can verify the token without shared storage. The trade-off is that revocation is harder with JWTs because there is no server-side record to update.",
      hints: [
        "Which approach requires a network call to a session store on every request?",
        "Horizontal scaling is easier when servers share no per-user state.",
      ],
    },
  ],

  "sdi-sec-pkce-rbac": [
    {
      id: "q-sdi-sec-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "PKCE (Proof Key for Code Exchange) is designed to protect which type of OAuth client from authorization code interception attacks?",
      options: [
        "Confidential clients running on a trusted backend server that can store a client secret.",
        "Public clients such as single-page apps and mobile apps that cannot securely store a client secret.",
        "Any client using the Client Credentials grant, which does not involve a user.",
        "Resource servers that need to validate token signatures offline.",
      ],
      correctAnswer: 1,
      explanation: "Public clients (SPAs, native mobile apps) cannot keep a client_secret confidential because their code runs on the user's device. PKCE replaces the client secret with a per-request cryptographic challenge: the client generates a random code_verifier, hashes it to code_challenge, sends the hash in the authorization request, then sends the plaintext verifier during the token exchange. An attacker who intercepts the authorization code cannot exchange it without knowing the verifier. RFC 7636 defines PKCE; it is now recommended for all OAuth flows.",
      hints: [
        "Which clients cannot store secrets safely? Their code is visible to the end user.",
        "PKCE binds the code to the specific client instance that started the flow.",
      ],
    },
    {
      id: "q-sdi-sec-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A healthcare system needs to grant access based on a user's department, their patient's sensitivity label, and the current time of day — not just their job title. Which access control model is best suited?",
      options: [
        "RBAC (Role-Based Access Control) — assign roles and check membership.",
        "DAC (Discretionary Access Control) — resource owners set permissions.",
        "ABAC (Attribute-Based Access Control) — policies evaluate multiple attributes at runtime.",
        "MAC (Mandatory Access Control) — a central authority assigns fixed classification levels.",
      ],
      correctAnswer: 2,
      explanation: "ABAC evaluates policies using any combination of subject attributes (department, clearance), resource attributes (sensitivity label), and environmental attributes (time of day, location). This makes it far more expressive than RBAC, which only checks role membership. ABAC is used by AWS IAM condition keys, Google Cloud IAM conditions, and healthcare systems complying with HIPAA's minimum-necessary standard. The trade-off is increased policy complexity and evaluation latency.",
      hints: [
        "RBAC answers 'what role does the user have?' — does that capture time-of-day or resource sensitivity?",
        "Which model can express 'allow only if department=oncology AND resource.sensitivity=low AND time is business hours'?",
      ],
    },
    {
      id: "q-sdi-sec-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a zero-trust architecture, a request from an internal server in the corporate network to another internal service should be treated how?",
      options: [
        "Fully trusted — it is inside the perimeter, so no further verification is needed.",
        "Trusted after a one-time VPN authentication at session start.",
        "Untrusted by default — every request must be authenticated, authorized, and encrypted regardless of network location.",
        "Trusted only if the source IP is on the allowlist for that subnet.",
      ],
      correctAnswer: 2,
      explanation: "Zero trust's core principle is 'never trust, always verify.' Network location (inside or outside) confers no implicit trust. Every request must carry a verifiable identity (e.g., mTLS certificate or service account token), be authorized against policy (e.g., OPA or Google's BeyondProd), and travel over an encrypted channel. This model was formalized by NIST SP 800-207 and is the foundation of Google's BeyondCorp and Cloudflare Access. Lateral movement attacks that exploit perimeter trust are mitigated because compromising one internal machine does not grant access to others.",
      hints: [
        "Zero trust was created specifically because the perimeter model fails when an attacker is already inside.",
        "BeyondCorp moved Google's access control to the application layer — what replaces network location as the trust signal?",
      ],
    },
    {
      id: "q-sdi-sec-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In mutual TLS (mTLS), what does the server verify about the client that is NOT present in standard (one-way) TLS?",
      options: [
        "That the client knows the server's private key.",
        "That the client holds a certificate signed by a trusted Certificate Authority, proving its identity.",
        "That the client supports TLS 1.3 or higher.",
        "That the client's IP address matches the certificate's Subject Alternative Name.",
      ],
      correctAnswer: 1,
      explanation: "In standard TLS, only the server presents a certificate; the client is anonymous from the TLS perspective. In mTLS, the server also requests a certificate from the client during the handshake. The client signs a challenge with its private key, and the server verifies the certificate chain to a trusted CA. This enables service-to-service authentication in service meshes (e.g., Istio, Linkerd) without embedding API keys or passwords in code. Cloudflare uses mTLS extensively for API Shield and authenticated origin pulls.",
      hints: [
        "Standard TLS authenticates the server to the client. mTLS adds what direction?",
        "Service meshes like Istio inject sidecars that handle mTLS — what does the sidecar present to peer services?",
      ],
    },
  ],

  "sdi-sec-secrets-encryption": [
    {
      id: "q-sdi-sec-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "HashiCorp Vault's dynamic secrets feature generates database credentials on demand. What is the PRIMARY security advantage over static credentials stored in environment variables?",
      options: [
        "Dynamic credentials are longer and therefore harder to brute-force.",
        "Credentials have a short TTL and are auto-revoked, so a leaked credential is valid only briefly and is traceable to a specific Vault lease.",
        "Dynamic secrets are stored in Vault's encrypted storage, making them unreadable to operators.",
        "Environment variables are inherently insecure because they are transmitted over HTTP.",
      ],
      correctAnswer: 1,
      explanation: "Vault's dynamic secrets create a unique credential pair per request with a configurable TTL (e.g., 1 hour). When the lease expires, Vault revokes the credential in the target system. A leaked credential is usable only until its TTL and is tied to a specific Vault lease ID, providing an audit trail. Static credentials in env vars have no expiry, are often shared across services, and when leaked require manual rotation of all dependent systems. HashiCorp documented this pattern as a key differentiation of Vault over secret stores that only encrypt static values.",
      hints: [
        "What happens to a leaked static password vs. a leaked dynamic credential with a 1-hour TTL?",
        "Vault leases link a credential to an entity and a time — what does that enable operationally?",
      ],
    },
    {
      id: "q-sdi-sec-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In envelope encryption (used by AWS KMS, Google Cloud KMS), what is the relationship between the Data Encryption Key (DEK) and the Key Encryption Key (KEK)?",
      options: [
        "The KEK encrypts the raw data; the DEK encrypts the KEK.",
        "The DEK encrypts the raw data; the KEK encrypts the DEK; only the encrypted DEK is stored alongside the data.",
        "The DEK and KEK are the same key — envelope encryption is just a marketing term.",
        "The KEK is stored with the data so that the DEK can be reconstructed at any time.",
      ],
      correctAnswer: 1,
      explanation: "Envelope encryption separates key management from data encryption. The DEK (a symmetric AES-256 key) encrypts the actual data locally — fast and efficient. The KMS-managed KEK then encrypts the DEK. Only the encrypted DEK (the 'envelope') is stored alongside the ciphertext. The plaintext KEK never leaves the KMS HSM. To decrypt, the application calls KMS to unwrap the DEK, then decrypts data locally. This limits KMS API calls (and cost) while keeping the most sensitive key material hardware-protected.",
      hints: [
        "Think of the 'envelope' as the encrypted DEK wrapped around the ciphertext.",
        "Why not encrypt all data directly with the KEK? Consider key rotation cost when you have terabytes of data.",
      ],
    },
    {
      id: "q-sdi-sec-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When establishing a TLS connection to https://example.com, what is the purpose of Certificate Transparency (CT) logs?",
      options: [
        "To encrypt the TLS handshake before the certificate is verified.",
        "To provide a publicly auditable, append-only log of all issued certificates, enabling detection of misissued or rogue certificates.",
        "To store revoked certificates so browsers can check CRL in real time.",
        "To sign the server's certificate with a second authority to create a chain of trust.",
      ],
      correctAnswer: 1,
      explanation: "Certificate Transparency (RFC 6962) requires CAs to log every issued certificate to public, cryptographically-verifiable, append-only logs. Browsers (Chrome since 2018) require all TLS certificates to have Signed Certificate Timestamps (SCTs) proving they were submitted to a CT log. Domain owners can monitor these logs to detect certificates fraudulently issued for their domains. CT does not encrypt or revoke — it provides auditability. Cloudflare and Google both operate CT logs.",
      hints: [
        "What problem does CT solve that CRL and OCSP do not — rogue issuance before revocation is possible?",
        "CT logs are append-only and Merkle-tree structured — why does that make them tamper-evident?",
      ],
    },
  ],

  "sdi-sec-ddos-rate-limiting": [
    {
      id: "q-sdi-sec-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A volumetric DDoS attack saturates bandwidth with UDP flood traffic. A protocol-layer attack (e.g., SYN flood) exhausts server connection tables. An application-layer (L7) attack sends valid-looking HTTP requests. Which layer is HARDEST to mitigate at the network edge without inspecting request semantics?",
      options: [
        "Volumetric (L3/L4) — massive packet rates overwhelm all hardware.",
        "Protocol (L4) — TCP state machines make SYN floods undetectable.",
        "Application (L7) — requests look legitimate until behavioral analysis is applied, requiring HTTP awareness.",
        "All three layers are equally hard; the mitigation is identical.",
      ],
      correctAnswer: 2,
      explanation: "Volumetric attacks are large but detectable by traffic rate and can be dropped upstream via anycast scrubbing (Cloudflare Magic Transit, AWS Shield). Protocol attacks exploit TCP state but can be countered with SYN cookies at the network edge without tracking state. L7 attacks are hardest: each request is a valid HTTP GET or POST from a real IP (often from a botnet). Distinguishing attacker from legitimate user requires behavioral heuristics, CAPTCHA challenges, bot fingerprinting, and ML models — all of which Cloudflare's Bot Management and Google Cloud Armor provide.",
      hints: [
        "At what layer does a router or firewall need to understand HTTP headers, cookies, or session behavior?",
        "Botnets send real TCP connections with real IPs — what signals differentiate them from humans?",
      ],
    },
    {
      id: "q-sdi-sec-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An API gateway enforces rate limiting at 100 requests/minute per API key. An attacker has 10,000 compromised accounts, each with a valid API key. Which rate-limiting strategy BEST addresses this?",
      options: [
        "Reduce the per-key limit to 10 requests/minute.",
        "Add a global rate limit across all keys combined, and apply anomaly detection on traffic patterns to identify coordinated bursts.",
        "Block all requests from IPs in the attacker's country.",
        "Require API keys to be rotated every hour.",
      ],
      correctAnswer: 1,
      explanation: "Per-key limits fail against distributed attacks because each key individually stays within limits. A global rate limit (or concurrency limit) caps total system load regardless of key count. Combining this with anomaly detection — unusual spike patterns, correlated timing, shared behavioral fingerprints — allows identifying and blocking credential-stuffing or coordinated API abuse. This is the defense-in-depth approach used by Cloudflare API Shield and AWS WAF managed rules. IP blocking (C) is ineffective against botnets with residential IPs spread across countries.",
      hints: [
        "If each of 10,000 keys sends 99 req/min, the total is 990,000 req/min — which limit catches that?",
        "What signals other than raw count might reveal that thousands of keys are acting in concert?",
      ],
    },
  ],

  "sdi-sec-injection-xss-csrf": [
    {
      id: "q-sdi-sec-15",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which technique MOST effectively prevents SQL injection in a web application?",
      options: [
        "Escaping all user input with a custom regex before concatenating it into SQL strings.",
        "Using parameterized queries (prepared statements) so user input is never interpreted as SQL syntax.",
        "Running the database on a private subnet with no external network access.",
        "Validating that user input contains only alphanumeric characters.",
      ],
      correctAnswer: 1,
      explanation: "Parameterized queries (prepared statements) separate SQL code from data. The database driver sends the query structure first and user-supplied values second; the database never parses data as code. This is the OWASP-recommended primary defense. Custom escaping (A) is error-prone and context-dependent. Network isolation (C) does not prevent injection via the application itself. Alphanumeric validation (D) breaks legitimate use cases like names with apostrophes. ORMs generally use parameterized queries under the hood, providing the same protection.",
      hints: [
        "Parameterized queries: the SQL template is fixed, and values are bound separately — can the database misinterpret the data as SQL?",
        "Why does escaping fail? Think about encoding edge cases and non-string contexts like ORDER BY.",
      ],
    },
    {
      id: "q-sdi-sec-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Content Security Policy (CSP) header with `default-src 'self'` is set on a web page. What does this prevent?",
      options: [
        "All HTTPS requests from the page — only HTTP is allowed.",
        "Loading scripts, styles, and other resources from any origin other than the page's own origin, blocking most reflected and stored XSS payloads that load external scripts.",
        "CSRF attacks by preventing cross-origin form submissions.",
        "SQL injection by sanitizing form inputs before they reach the server.",
      ],
      correctAnswer: 1,
      explanation: "CSP `default-src 'self'` instructs the browser to block any resource (script, style, image, frame) loaded from an origin different from the page itself. This defeats XSS payloads that inject `<script src=\"https://evil.com/x.js\">` or inline event handlers (if `'unsafe-inline'` is absent). It does not address CSRF (which requires SameSite cookies or CSRF tokens) nor SQL injection (a server-side issue). Google and Cloudflare both use strict CSPs. Inline scripts are blocked unless the nonce or hash mechanism is used.",
      hints: [
        "CSP controls which origins the browser will fetch resources from — what class of attack loads resources from attacker-controlled domains?",
        "Does CSP operate client-side or server-side? What can it not protect?",
      ],
    },
    {
      id: "q-sdi-sec-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which combination BEST protects a web application against Cross-Site Request Forgery (CSRF)?",
      options: [
        "Setting the session cookie to HttpOnly and Secure flags only.",
        "Using SameSite=Strict cookies so the browser does not send the cookie on cross-origin requests, combined with a server-generated CSRF token in forms.",
        "Validating the Content-Type header and rejecting any request that is not application/json.",
        "Encrypting the session cookie with AES-256.",
      ],
      correctAnswer: 1,
      explanation: "CSRF exploits the browser's automatic inclusion of cookies in cross-origin requests. SameSite=Strict prevents the browser from sending cookies with cross-site requests entirely, breaking the attack for most modern browsers. A CSRF token (a random secret tied to the session, included in forms or headers) adds defense-in-depth for browsers that do not fully support SameSite or where Lax mode is used. HttpOnly (A) only prevents JavaScript from reading the cookie — it does not stop the browser from sending it. Content-Type validation (C) is bypassable. AES-256 encryption (D) does not affect how the browser sends the cookie.",
      hints: [
        "CSRF works because the browser automatically attaches cookies to any request to a domain — which mechanism stops that?",
        "The Double Submit Cookie pattern and synchronizer token pattern are two CSRF token strategies — what do they have in common?",
      ],
    },
  ],

  "sdi-sec-api-sso-mfa": [
    {
      id: "q-sdi-sec-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When managing API keys at scale, which practice MOST reduces the blast radius of a leaked key?",
      options: [
        "Making API keys very long (256 characters) to prevent guessing.",
        "Scoping each API key to the minimum set of permissions required and enforcing per-key rate limits, combined with automated rotation and audit logging of every use.",
        "Storing all API keys in a single encrypted database table with AES-256.",
        "Requiring all API clients to also send a username and password alongside the key.",
      ],
      correctAnswer: 1,
      explanation: "Least-privilege scoping limits what a leaked key can do. Automated rotation (short key lifetimes or triggered rotation on exposure) limits how long it is valid. Rate limits cap the damage rate. Audit logs detect abuse and enable forensic investigation. This is the approach recommended by Stripe, Twilio, and described in the OWASP API Security Top 10. Key length (A) matters only against random guessing — a leaked key is already known. Centralized encrypted storage (C) is good hygiene but does not reduce blast radius post-leak. Adding passwords (D) weakens API usability without addressing the core issue.",
      hints: [
        "What determines the damage if a key is leaked: its length, or what it is authorized to do?",
        "HashiCorp Vault and AWS Secrets Manager both support automatic key rotation — what does that limit?",
      ],
    },
    {
      id: "q-sdi-sec-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In enterprise SSO, what is the key technical difference between SAML 2.0 and OpenID Connect (OIDC)?",
      options: [
        "SAML uses JSON Web Tokens while OIDC uses XML assertions.",
        "SAML is an XML-based federation standard suited to browser-based SSO with signed assertions; OIDC is built on OAuth 2.0 using JWTs, better suited to APIs and mobile apps.",
        "OIDC does not support IdP-initiated login while SAML does not support SP-initiated login.",
        "SAML and OIDC are functionally identical — the only difference is vendor preference.",
      ],
      correctAnswer: 1,
      explanation: "SAML 2.0 uses XML assertions signed with XML Signature and was designed for browser-based SSO between enterprises (e.g., corporate apps, Okta, ADFS). OIDC is a lightweight identity layer on top of OAuth 2.0, using JWTs (ID tokens) and REST/JSON APIs. OIDC is easier to implement on mobile and in SPAs, supports PKCE natively, and is the basis for Google Sign-In, Apple Sign-In, and Okta's modern federation. Both support IdP-initiated and SP-initiated flows. Okta supports both protocols but recommends OIDC for new integrations.",
      hints: [
        "What format does each protocol use for identity assertions? That affects parsing complexity.",
        "OIDC adds an identity layer on top of which existing authorization framework?",
      ],
    },
    {
      id: "q-sdi-sec-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "WebAuthn / FIDO2 is phishing-resistant because of which design property?",
      options: [
        "One-time passwords are time-synchronized so they expire in 30 seconds.",
        "The credential (public/private key pair) is bound to a specific relying party origin (domain); the authenticator will not sign a challenge for a different domain, even if the user is tricked.",
        "WebAuthn uses SMS delivery to a phone, making interception difficult.",
        "Biometrics stored on the server verify the user's identity directly.",
      ],
      correctAnswer: 1,
      explanation: "WebAuthn credentials are origin-bound: the authenticator (security key, platform biometric) includes the relying party ID (the website's registered origin) in what it signs. A phishing site at evil.example.com cannot obtain a valid signature for bank.com because the authenticator checks the actual page origin against the registered RP ID and refuses to sign. This is fundamentally different from TOTP (which a phishing site can relay in real time) or SMS OTP. Biometrics in WebAuthn authenticate to the local device, not the server — biometric data never leaves the device.",
      hints: [
        "Why can a phishing site relay a TOTP in real time but NOT a WebAuthn response?",
        "The RP ID is the domain — what stops an authenticator from signing for the wrong domain?",
      ],
    },
  ],

  "sdi-sec-passwords-certs": [
    {
      id: "q-sdi-sec-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is Argon2id preferred over bcrypt for new password hashing implementations?",
      options: [
        "Argon2id is faster than bcrypt, reducing server load during authentication.",
        "Argon2id won the Password Hashing Competition and is memory-hard, making GPU and ASIC-based cracking attacks significantly more expensive than bcrypt which is only compute-hard.",
        "bcrypt is broken by known cryptographic attacks and should not be trusted.",
        "Argon2id produces shorter hashes, reducing database storage costs.",
      ],
      correctAnswer: 1,
      explanation: "bcrypt is compute-hard: attackers can parallelize it using thousands of GPU cores. Argon2id is memory-hard: it requires a configurable amount of RAM per hash, which constrains parallelism on GPUs and is impractical on ASICs. Argon2id (the hybrid variant) additionally provides side-channel resistance. It won PHC in 2015 and is recommended by OWASP and NIST SP 800-63B. bcrypt is not cryptographically broken — it is still acceptable with a high work factor — but Argon2id is the current best practice. Key parameters: time cost, memory cost, parallelism.",
      hints: [
        "GPU cracking farms have abundant compute but limited per-core memory — which property of Argon2id exploits that?",
        "The PHC was specifically a competition to identify the best password hashing function — what criteria did Argon2id win on?",
      ],
    },
    {
      id: "q-sdi-sec-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Let's Encrypt uses the ACME protocol to automate TLS certificate issuance. What does a domain owner prove during the ACME challenge?",
      options: [
        "That they possess the CA's private key.",
        "That they control the domain by satisfying an HTTP-01 challenge (serving a token at a well-known URL) or a DNS-01 challenge (publishing a DNS TXT record).",
        "That their server passes a vulnerability scan with no critical CVEs.",
        "That they have a valid EV (Extended Validation) business identity.",
      ],
      correctAnswer: 1,
      explanation: "ACME (RFC 8555) automates domain-validated (DV) certificate issuance. The CA challenges the client to prove domain control: HTTP-01 requires serving a specific token at `/.well-known/acme-challenge/<token>`; DNS-01 requires publishing a TXT record with the token value. The ACME client (e.g., Certbot, Caddy) handles this automatically and then stores the resulting certificate. Let's Encrypt issues ~5 million certificates per day using this protocol. EV certificates require manual business verification and are unrelated to ACME.",
      hints: [
        "DV certificates only prove domain control, not organizational identity — how can a machine prove it controls a domain?",
        "What two resources can only the true domain owner publish or serve?",
      ],
    },
  ],

  "sdi-sec-network-supply-chain": [
    {
      id: "q-sdi-sec-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When designing network segmentation for a multi-tier web application on AWS, which configuration BEST follows the principle of least privilege?",
      options: [
        "Place all components (web, app, database) in the same public subnet with a single security group.",
        "Place web servers in a public subnet, application servers and databases in private subnets; security groups allow only the specific ports and sources needed between tiers.",
        "Place all components in a private subnet and use a VPN for all user access.",
        "Use a single NACL to block all inbound traffic and rely on the WAF for all filtering.",
      ],
      correctAnswer: 1,
      explanation: "Defense-in-depth network design places internet-facing components (load balancers, web servers) in public subnets and keeps application servers and databases in private subnets with no direct internet route. Security groups act as stateful firewalls: the database security group should only accept traffic from the application server's security group on the specific DB port (e.g., 5432). This limits lateral movement — compromising the web tier does not automatically grant database access. AWS Well-Architected Framework and CIS AWS Foundations Benchmark both mandate this pattern.",
      hints: [
        "What does 'private subnet' mean in AWS? Can instances there receive unsolicited inbound internet traffic?",
        "Security groups reference other security groups as sources — why is that more secure than IP-based rules?",
      ],
    },
    {
      id: "q-sdi-sec-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A software supply chain attack (like SolarWinds) compromises a build pipeline to inject malicious code into a signed artifact. Which combination of controls BEST mitigates this threat?",
      options: [
        "Code signing with a CA certificate and verifying signatures before deployment.",
        "Generating a Software Bill of Materials (SBOM), using Sigstore for keyless signing of artifacts and provenance attestations, and scanning dependencies for known CVEs in the pipeline.",
        "Running all builds in containers to isolate the build environment.",
        "Requiring two-person review on all pull requests to the main branch.",
      ],
      correctAnswer: 1,
      explanation: "Supply chain attacks often compromise the signing key or the build system itself, so a signed artifact alone does not prove the build was untampered. SLSA (Supply-chain Levels for Software Artifacts) addresses this with provenance attestations — cryptographically signed metadata about how an artifact was built (from what source, by what build system). Sigstore provides keyless signing using ephemeral keys tied to OIDC identity, with transparency logs (Rekor) that make signing events auditable. SBOMs enumerate all components, enabling rapid response when a new CVE affects a dependency. Google mandates SLSA level 2+ internally and open-sourced the framework. Container isolation (C) and PR reviews (D) are good hygiene but do not address a compromised build system.",
      hints: [
        "SolarWinds: the attacker had access to the build pipeline and the signing key — what would have detected or prevented injection?",
        "Sigstore's Rekor log is append-only and public — what does that enable for artifact verification?",
      ],
    },
    {
      id: "q-sdi-sec-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A tamper-evident audit log is required for a financial system. Which property MOST critically distinguishes a tamper-evident log from a regular append-only database table?",
      options: [
        "The log is stored in a separate database instance with restricted write access.",
        "Each log entry includes a cryptographic hash that chains it to the previous entry (similar to a blockchain), so any modification or deletion of past entries changes subsequent hashes and is detectable.",
        "The log is encrypted with AES-256 so unauthorized users cannot read it.",
        "The log is replicated across three availability zones for durability.",
      ],
      correctAnswer: 1,
      explanation: "A tamper-evident log uses a hash chain (or a Merkle tree as in Certificate Transparency): each entry's digest includes the hash of the previous entry. Any retroactive modification changes that entry's hash, which cascades forward and breaks verification. AWS CloudTrail uses SHA-256 hash chaining for its log validation feature. SIEM platforms (Splunk, Elastic Security) ingest logs but typically do not implement hash chaining — a separate integrity mechanism is needed. Encryption (C) protects confidentiality, not integrity of the sequence. Replication (D) protects availability, not tamper-evidence.",
      hints: [
        "How does a blockchain prevent modification of past records? The same principle applies here.",
        "If you delete entry #5 from a hash-chained log, what happens to entry #6's verification?",
      ],
    },
  ],

  "sdi-sec-data-masking-compliance": [
    {
      id: "q-sdi-sec-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A payment processor must store references to credit card numbers without storing the raw PAN (Primary Account Number) to reduce PCI-DSS scope. Which technique achieves this?",
      options: [
        "Encrypting the PAN with AES-256 and storing the ciphertext — the stored value is not the real number.",
        "Tokenization: replacing the PAN with a random, opaque token that maps to the real PAN only in a separate, isolated token vault.",
        "Truncating the PAN to the last 4 digits for all storage.",
        "Hashing the PAN with SHA-256 — the hash is irreversible so it is not the real number.",
      ],
      correctAnswer: 1,
      explanation: "Tokenization replaces the PAN with a token (e.g., a random 16-digit number) that has no mathematical relationship to the original. The mapping lives only in a hardened token vault (e.g., Stripe's vault, VGS). Systems that only ever see tokens are out of PCI-DSS scope because they never handle cardholder data. Encrypted PAN (A) keeps the data in scope because the ciphertext can be decrypted — PCI requires protecting the key, but the system that decrypts is still in scope. Truncation (C) is irreversible but destroys data, preventing use cases like displaying the last-4. SHA-256 hashing (D) of a 16-digit number has a tiny brute-force space and is trivially reversible.",
      hints: [
        "Tokenization vs. encryption: which produces a value that cannot be mathematically reversed to the original?",
        "PCI-DSS scope is defined by which systems 'touch' cardholder data — does a system that only sees random tokens touch cardholder data?",
      ],
    },
    {
      id: "q-sdi-sec-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "During incident response, what is the correct order of the NIST phases for handling a confirmed data breach?",
      options: [
        "Eradication, Detection, Containment, Recovery, Post-Incident",
        "Detection & Analysis, Containment, Eradication, Recovery, Post-Incident Activity",
        "Containment, Detection, Recovery, Eradication, Post-Incident",
        "Recovery, Containment, Detection, Eradication, Post-Incident",
      ],
      correctAnswer: 1,
      explanation: "NIST SP 800-61 defines the Incident Response lifecycle: (1) Preparation, (2) Detection & Analysis, (3) Containment — short-term (isolate) then long-term, (4) Eradication — remove root cause (malware, backdoors, compromised credentials), (5) Recovery — restore systems and verify, (6) Post-Incident Activity — lessons learned and report. Rushing to eradication before containment can cause the attacker to pivot or destroy forensic evidence. Google's SRE incident management and Cloudflare's public post-mortems follow this structure.",
      hints: [
        "Why must containment precede eradication? What could an attacker do if they detect you are cleaning up?",
        "Post-incident activity is often skipped under time pressure — what value does a blameless post-mortem provide?",
      ],
    },
    {
      id: "q-sdi-sec-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In penetration testing, what distinguishes a red team engagement from a standard black-box penetration test?",
      options: [
        "Red team testing uses automated scanners while black-box testing is manual.",
        "A red team engagement simulates a real adversary over a longer timeframe with full stealth objectives (evading detection, achieving specific mission goals), while a black-box pen test focuses on finding vulnerabilities within a defined scope and timeline.",
        "Black-box testing has access to source code while red team testing does not.",
        "Red team engagements only test physical security while black-box testing only tests web applications.",
      ],
      correctAnswer: 1,
      explanation: "A red team engagement is adversary simulation: a team attempts to achieve specific business-relevant objectives (exfiltrate sensitive data, compromise an executive account) while remaining undetected by the security team (blue team). It tests both technical controls and detection/response capabilities. A standard black-box pen test has a defined scope, a shorter timeline, and aims to enumerate as many vulnerabilities as possible — it is not specifically trying to evade detection. White-box testing provides source code and architecture documents. Purple teaming involves red and blue teams working collaboratively. Google's Project Zero, Okta's internal security teams, and Cloudflare all conduct red team exercises.",
      hints: [
        "Red team: are they trying to find all bugs, or to achieve a specific goal while evading the security team?",
        "A pen test report lists vulnerabilities; a red team report shows how far an attacker could progress — what does that test differently?",
      ],
    },
    {
      id: "q-sdi-sec-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A SaaS company is pursuing SOC 2 Type II certification. Which statement BEST describes what SOC 2 Type II attests to, compared to SOC 2 Type I?",
      options: [
        "Type II covers all five Trust Service Criteria while Type I only covers Security.",
        "Type I attests that controls are designed effectively at a point in time; Type II attests that those controls operated effectively over a sustained period (typically 6-12 months).",
        "Type II is required for PCI-DSS compliance while Type I satisfies ISO 27001.",
        "Type I is conducted by the company itself; Type II requires a third-party auditor.",
      ],
      correctAnswer: 1,
      explanation: "SOC 2 Type I is a point-in-time audit: the auditor verifies that the described controls are suitably designed as of a specific date. SOC 2 Type II covers an examination period (typically 6-12 months) and tests operating effectiveness — evidence that controls actually ran consistently, not just that they exist on paper. Customers and enterprise buyers prefer Type II because it provides assurance about ongoing security practices. Both types require a CPA firm auditor. The Trust Service Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy) can be included in either type — which criteria are in scope is the company's choice.",
      hints: [
        "Think of Type I as a snapshot and Type II as a film — which gives more confidence about daily operations?",
        "Why would a prospective enterprise customer insist on Type II over Type I?",
      ],
    },
    {
      id: "q-sdi-sec-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Homomorphic encryption allows computation on encrypted data. What is the PRIMARY reason it is not yet widely deployed in production systems despite being theoretically available?",
      options: [
        "Homomorphic encryption has been shown to be mathematically insecure against quantum computers.",
        "Fully homomorphic encryption (FHE) operations are 6-10 orders of magnitude slower than plaintext computation, making it impractical for most real-time workloads.",
        "FHE requires the data owner to share their private key with the computing party.",
        "Homomorphic encryption only works on integer arithmetic, making it useless for machine learning.",
      ],
      correctAnswer: 1,
      explanation: "Fully Homomorphic Encryption (FHE), first constructed by Craig Gentry in 2009, allows arbitrary computation on ciphertexts. The result when decrypted matches what would be obtained by computing on plaintext. However, FHE is roughly 10^6-10^10 times slower than equivalent plaintext operations. A single AES encryption that takes nanoseconds may take seconds or minutes in FHE. Bootstrapping (the key operation that refreshes noise) dominates runtime. Practical deployments are limited to simple, infrequent operations like private set intersection (Google's PSI) or oblivious ML inference on small models. Microsoft SEAL, IBM HElib, and Zama are active in this space. The private key (C) is never shared — that would defeat the purpose. Quantum resistance (A) is actually an advantage of lattice-based FHE.",
      hints: [
        "Estimate: if AES takes 1 nanosecond plaintext, how long might 10^9x overhead make it?",
        "FHE adds 'noise' that grows with each operation — what is bootstrapping, and why does it dominate cost?",
      ],
    },
  ],
};

registerQuestions(questions);
