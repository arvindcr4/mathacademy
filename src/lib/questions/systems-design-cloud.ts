import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-cloud-containers": [
    {
      id: "q-sdi-cloud-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the key architectural difference between a Docker container and a virtual machine?",
      options: [
        "Containers include a full OS kernel per instance; VMs share the host kernel.",
        "Containers share the host OS kernel; VMs include a separate full guest OS kernel per instance.",
        "Containers are slower to start than VMs because they bundle more dependencies.",
        "VMs are lighter weight because they use hardware-level virtualization exclusively.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand what each technology packages. A VM packages a full guest operating system including the kernel, so each VM instance has its own isolated kernel. A container only packages the application and its dependencies, sharing the host system's kernel.\n\n**Step 2:** Consider the implications of shared vs. separate kernels. Since containers share the host kernel, they avoid the overhead of running a separate OS per instance. This makes containers much smaller (MB vs. GB) and faster to start (seconds vs. minutes).\n\n**Step 3:** Apply this to real-world scenarios. Containers excel for microservices and rapid scaling where you need many lightweight, fast-starting instances. VMs are better when you need strong isolation, different OS types, or full OS customization.\n\nContainers share the host OS kernel, making them lightweight (MB in size, seconds to start). VMs include a full guest OS kernel per instance, providing stronger isolation but at the cost of GB of overhead and minute-level boot times. This is why containers are preferred for microservices and rapid scaling, while VMs are preferred when strong isolation or different OS kernels are required.",
      hints: [
        "Think about what each technology includes in each isolated unit - does it include an OS kernel or just the application?",
        "Which approach results in smaller artifact sizes and faster startup times?",
      ],
    },
    {
      id: "q-sdi-cloud-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Docker image is built with instructions: FROM ubuntu, RUN apt-get install python3, COPY app.py /, CMD python3 app.py. If you change only app.py and rebuild, which layers are rebuilt?",
      options: [
        "All four layers are rebuilt from scratch every time.",
        "Only the COPY and CMD layers are rebuilt; FROM and RUN layers are served from cache.",
        "Only the CMD layer is rebuilt since the file change is reflected there.",
        "Only the RUN layer is rebuilt because the package dependency changed.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand Docker layer caching mechanics. Each Dockerfile instruction creates a layer. Docker checks if it can use a cached layer by comparing the instruction and all preceding instructions to previous builds.\n\n**Step 2:** Determine the invalidation chain. Changing app.py only affects the COPY instruction. Since COPY depends on app.py, this layer must be rebuilt. Any layer after COPY (in this case, CMD) also becomes invalid because Docker cannot use cached layers for subsequent instructions.\n\n**Step 3:** Analyze the unchanged layers. The FROM instruction defines the base image and is never rebuilt. The RUN instruction installs packages and does not depend on app.py, so it remains cached. Only the COPY and CMD layers are rebuilt.\n\nDocker builds are cache-aware and layer-based. Each instruction creates a layer. If an instruction and all preceding instructions are unchanged, Docker reuses the cached layer. Changing app.py invalidates the COPY layer and all layers after it (CMD), but FROM and RUN are unaffected and served from cache. This is why you should order Dockerfile instructions from least to most frequently changing to maximize cache hits.",
      hints: [
        "Docker layer caching invalidates a layer and all subsequent layers when a layer changes.",
        "Which instructions come before the COPY of app.py, and do they depend on app.py?",
      ],
    },
    {
      id: "q-sdi-cloud-3",
      type: "true-false",
      difficulty: "medium",
      question: "Multi-stage Docker builds reduce the final image size by allowing build tools and intermediate artifacts to be discarded, keeping only the runtime binaries in the final image.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand what multi-stage builds are. A multi-stage Dockerfile uses multiple FROM instructions to define separate build environments within a single file.\n\n**Step 2:** Identify what each stage contains. Early stages typically include compilers, build tools, and test dependencies (e.g., a Go compiler, Maven, npm packages). The final stage contains only the minimal runtime needed to execute the application.\n\n**Step 3:** Recognize what gets discarded. The magic of multi-stage builds is that only the final stage's filesystem contents are included in the output image. All layers, tools, and artifacts from earlier stages are discarded. For example, a Go application built in a stage requiring an 800MB build environment can produce a final image under 10MB containing only the compiled binary.\n\nTrue. Multi-stage builds use multiple FROM instructions in a single Dockerfile. Early stages can include compilers, build tools, and test dependencies (e.g., the Go compiler, Maven, npm). The final stage copies only compiled binaries or production assets from earlier stages, discarding all build-time tooling. A Go application that needs a 800MB build environment can produce a final image of under 10MB containing only the compiled binary.",
      hints: [
        "What tools are needed to build software vs. what is needed to run it at runtime?",
        "Can you use artifacts from one Docker build stage in a later stage without carrying over all build-stage layers?",
      ],
    },
    {
      id: "q-sdi-cloud-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which combination of container security hardening measures provides the strongest defense-in-depth for a production container running a public-facing API?",
      options: [
        "Run as root for simplicity; use a firewall to restrict external access.",
        "Run as non-root user, use a read-only filesystem for the container, and avoid privileged mode.",
        "Use privileged mode to allow the container to manage its own security policies.",
        "Rely solely on network segmentation; container-level security settings are optional.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Consider the threat model for a public-facing container. If an application vulnerability (e.g., remote code execution) is exploited, an attacker gains the privileges of the container process.\n\n**Step 2:** Apply defense-in-depth principles. First, run as non-root: if compromised, the attacker has limited OS privileges rather than root access to the host. Second, use a read-only filesystem: this prevents the attacker from writing malware, modifying configuration files, or persisting exploits on the container filesystem. Third, avoid privileged mode: privileged containers can access host kernel capabilities and potentially escape to the host system.\n\n**Step 3:** Understand the combined effect. These three measures work together to significantly limit the blast radius of a successful exploit, even if an application vulnerability is exploited.\n\nDefense-in-depth for containers requires multiple layers: (1) non-root user - if the process is compromised, the attacker has limited OS privileges; (2) read-only filesystem - prevents attackers from writing malware or modifying configs post-compromise; (3) no privileged mode - privileged containers can access host kernel capabilities and escape to the host. Together these significantly limit blast radius even if an application vulnerability is exploited.",
      hints: [
        "What is the principle of least privilege, and how does it apply to container processes?",
        "What can an attacker do if a container runs in privileged mode with a writable filesystem as root?",
      ],
    },
  ],

  "sdi-cloud-kubernetes": [
    {
      id: "q-sdi-cloud-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In Kubernetes, what is the relationship between a Pod, a container, a Deployment, and a Service?",
      options: [
        "A Service wraps a Deployment which wraps a container which wraps a Pod.",
        "A Pod is the smallest deployable unit holding one or more containers; a Deployment manages multiple Pod replicas; a Service provides stable network access to Pods.",
        "A Deployment is the smallest unit; Pods are abstract groupings of Deployments.",
        "A Service directly manages containers without needing Pods or Deployments.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the Pod concept. A Pod is the smallest deployable unit in Kubernetes. It contains one or more tightly coupled containers that share a network namespace and storage. Containers in the same Pod always land on the same node and can communicate via localhost.\n\n**Step 2:** Understand the Deployment role. A Deployment is a controller that manages the desired state of Pods. It ensures you always have N running replicas of your Pod template, handling rollouts (updating to a new version) and rollbacks (reverting to a previous version).\n\n**Step 3:** Understand the Service role. Pods have ephemeral IPs that change when they are rescheduled. A Service provides a stable virtual IP and DNS name that load-balances traffic across all Pods matching a label selector, abstracting away individual Pod IPs.\n\nIn Kubernetes: a Pod is the smallest deployable unit, containing one or more tightly coupled containers sharing a network namespace and storage. A Deployment is a controller that manages a desired number of Pod replicas, handling rollouts and rollbacks. A Service provides a stable virtual IP and DNS name that load-balances traffic across the Pods selected by a label selector, abstracting away individual Pod IPs which change as Pods are rescheduled.",
      hints: [
        "Pods can die and be rescheduled with new IPs - what provides stable addressing?",
        "Which resource ensures you always have N running copies of your application Pods?",
      ],
    },
    {
      id: "q-sdi-cloud-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Kubernetes Pod with a memory request of 256Mi and a memory limit of 512Mi is scheduled on a node. What happens if the Pod's memory usage exceeds 512Mi?",
      options: [
        "The Pod is evicted immediately when it hits the request (256Mi).",
        "The kubelet OOM-kills the container when it exceeds the limit (512Mi).",
        "Kubernetes automatically increases the limit to accommodate the usage.",
        "The Pod is rescheduled to a node with more available memory.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the distinction between requests and limits. Requests are used by the scheduler to find a suitable node with sufficient available resources. The node guarantees the requested resources to the Pod. Limits are enforced at runtime by the Linux kernel.\n\n**Step 2:** Understand what happens at the limit. When a container exceeds its memory limit, the Linux kernel's Out-of-Memory (OOM) killer terminates the process inside the container. This is a hard limit enforced by the kernel, not something Kubernetes can override.\n\n**Step 3:** Understand the consequences. The kubelet will then restart the container based on the Pod's restart policy. This cycle continues if the application continues to exceed its memory limit.\n\nResource requests are used by the scheduler to find a node with sufficient available resources - the Pod is guaranteed those resources. Resource limits are enforced at runtime: for memory, if a container exceeds its limit, the Linux kernel OOM killer terminates the container process. The kubelet then restarts the container according to the Pod's restart policy. Requests affect scheduling; limits affect runtime enforcement.",
      hints: [
        "Requests are for scheduling decisions; limits are for runtime enforcement.",
        "What does the Linux OOM killer do when a process exceeds its memory allocation?",
      ],
    },
    {
      id: "q-sdi-cloud-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You want your Kubernetes Deployment to automatically scale from 2 to 50 replicas based on message queue depth (e.g., SQS queue length). Which component enables this and what is required?",
      options: [
        "HorizontalPodAutoscaler with CPU metric only - queue depth cannot be used.",
        "HorizontalPodAutoscaler with a custom metrics adapter (e.g., KEDA) that exposes queue depth as a Kubernetes custom metric.",
        "VerticalPodAutoscaler - it automatically adds replicas when CPU is high.",
        "Cluster Autoscaler - it scales Pods based on external queue depth natively.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the scaling requirement. You need to scale based on an external metric (SQS queue depth) that is not natively available to Kubernetes.\n\n**Step 2:** Evaluate available options. The HorizontalPodAutoscaler (HPA) natively supports CPU and memory metrics only. The VerticalPodAutoscaler adjusts Pod resource sizes, not replica counts. The Cluster Autoscaler scales nodes, not Pods.\n\n**Step 3:** Identify the correct solution. KEDA (Kubernetes Event-driven Autoscaling) is the standard solution for external metrics. It integrates with SQS, Kafka, Redis, and other event sources, exposing their metrics to HPA via a custom metrics API. This enables HPA to scale based on queue depth.\n\nHorizontalPodAutoscaler (HPA) natively supports CPU and memory metrics. For external metrics like SQS queue depth, you need a custom metrics adapter. KEDA (Kubernetes Event-driven Autoscaling) is the standard solution - it integrates with SQS, Kafka, Redis, and other event sources, exposing their metrics to HPA. KEDA can scale to zero when the queue is empty and back up as messages arrive, making it ideal for event-driven workloads.",
      hints: [
        "HPA can use custom metrics beyond CPU/memory if a metrics adapter is installed.",
        "What tool specifically bridges external event sources like SQS to Kubernetes autoscaling?",
      ],
    },
    {
      id: "q-sdi-cloud-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You deploy a Kubernetes Service of type LoadBalancer for a web application. Your internal microservices need to call each other without going through the cloud load balancer. Which Service type should internal services use?",
      options: [
        "LoadBalancer - always use cloud load balancers for all traffic for consistency.",
        "ClusterIP - provides a stable internal virtual IP accessible only within the cluster.",
        "NodePort - exposes a port on every node IP for internal communication.",
        "ExternalName - maps the service to an external DNS name.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Consider the requirements for internal service communication. Internal microservices need to call each other using stable addresses that exist only within the cluster, without incurring the cost or complexity of cloud load balancers.\n\n**Step 2:** Evaluate the Service types. LoadBalancer provisions a cloud load balancer (expensive, slow to provision) and is designed for external-facing traffic. NodePort exposes a port on every node's external IP, which is not appropriate for internal service mesh. ExternalName maps to an external DNS name, not for internal services.\n\n**Step 3:** Select the correct type. ClusterIP is the default Service type that assigns a stable internal virtual IP. Kubernetes DNS resolves service-name.namespace.svc.cluster.local to this IP, providing reliable internal service discovery.\n\nClusterIP is the default and most appropriate Service type for internal microservice communication. It assigns a virtual IP reachable only within the cluster, and Kubernetes DNS resolves service-name.namespace.svc.cluster.local to that IP. LoadBalancer provisions a cloud load balancer (costly, slow to provision), NodePort exposes on every node's external IP (not intended for internal service mesh), and ExternalName is for routing to external DNS names.",
      hints: [
        "Which Service type creates a virtual IP that only exists inside the cluster's network?",
        "What is the cost implication of using LoadBalancer type for every internal service?",
      ],
    },
  ],

  "sdi-cloud-serverless": [
    {
      id: "q-sdi-cloud-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Lambda function handling user authentication experiences 'cold start' latency spikes of 2-5 seconds on the first invocation. What is the root cause and what is the most effective mitigation for latency-sensitive workloads?",
      options: [
        "Cold starts are caused by slow network; use a faster VPC configuration.",
        "Cold starts occur when Lambda initializes a new container (downloading code, starting runtime, running init code). Provisioned Concurrency pre-initializes execution environments to eliminate cold starts.",
        "Cold starts only happen with Python runtimes; switching to Node.js eliminates them.",
        "Cold starts are caused by large function payloads; reduce request size to fix them.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the Lambda execution lifecycle. Lambda is stateless and reuses execution environments across invocations when possible. However, when a new environment is needed, Lambda must initialize it: downloading the function code, starting the runtime (JVM, Python interpreter, etc.), and running any initialization code outside the handler.\n\n**Step 2:** Identify the latency impact. This initialization phase adds 100ms to 10+ seconds depending on the runtime and package size. JVM-based languages (Java, Kotlin) have the longest cold starts due to JVM startup time. Larger deployment packages also increase cold start duration.\n\n**Step 3:** Identify the mitigation. Provisioned Concurrency keeps a specified number of execution environments pre-initialized and ready to handle invocations immediately, eliminating cold starts for those environments. The trade-off is paying for the provisioned concurrency regardless of actual usage.\n\nLambda cold starts occur when a new execution environment must be initialized: Lambda downloads your function code, starts the runtime (JVM, Python interpreter, etc.), and runs your initialization code outside the handler. This takes 100ms to 10+ seconds depending on runtime and package size. Provisioned Concurrency keeps a specified number of environments pre-initialized, eliminating cold starts for those invocations at extra cost. Keeping functions warm via periodic pings is a cheaper alternative for low-traffic functions.",
      hints: [
        "What must Lambda do the first time a function is invoked vs. when reusing a warm container?",
        "Which Lambda feature guarantees pre-warmed execution environments at the cost of always paying for them?",
      ],
    },
    {
      id: "q-sdi-cloud-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When should you choose AWS Lambda over a containerized service (ECS/EKS) for a new workload?",
      options: [
        "Always choose Lambda - it is cheaper and simpler in all scenarios.",
        "Choose Lambda for event-driven tasks under 15 minutes that have variable/spiky traffic. Choose containers for long-running, stateful, or custom runtime workloads with consistently high traffic.",
        "Choose containers only when you need more than 10 GB of memory.",
        "Choose Lambda only for batch processing jobs that run overnight.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Consider Lambda's constraints. Lambda has a 15-minute maximum execution time, charges per invocation plus GB-seconds, and is designed for stateless, event-driven workloads. It excels when traffic is variable or spiky because you only pay for what you use.\n\n**Step 2:** Consider container strengths. Containers (ECS/EKS) are better for long-running processes (exceeding 15 minutes), stateful applications requiring persistent connections, custom runtime requirements (specific GPU drivers, specialized OS configurations), or consistently high traffic where always-on compute is more cost-effective than per-invocation pricing.\n\n**Step 3:** Match the workload to the technology. Lambda is ideal for S3 triggers, API calls, SQS message processing, and other event-driven scenarios. Containers are better for web applications with sustained traffic, background workers, and applications requiring persistent state.\n\nLambda is ideal for event-driven workloads (S3 triggers, API calls, SQS messages) with variable traffic patterns, tasks under 15 minutes, and stateless functions. At low-to-moderate utilization, Lambda's per-invocation pricing is cheaper than always-on compute. Containers (ECS/EKS) are better for long-running processes (>15 min), stateful applications, custom runtime requirements (e.g., specific GPU drivers), or high-throughput workloads where always-on containers are cheaper than per-invocation Lambda pricing.",
      hints: [
        "Lambda has a 15-minute maximum execution time limit - what workloads violate this?",
        "Compare pricing models: Lambda charges per invocation + GB-seconds vs. containers charge for uptime regardless of traffic.",
      ],
    },
    {
      id: "q-sdi-cloud-11",
      type: "true-false",
      difficulty: "easy",
      question: "AWS Lambda pricing is based on the number of invocations plus the duration of execution measured in GB-seconds, meaning a function using 512 MB of memory for 1 second costs the same as a function using 1 GB of memory for 0.5 seconds.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand Lambda pricing components. Lambda pricing has two parts: a per-invocation charge (\\$0.20 per 1 million requests) and a compute charge measured in GB-seconds (memory allocated multiplied by execution time in seconds).\n\n**Step 2:** Calculate both scenarios. For the first function: 512 MB = 0.5 GB, so 0.5 GB \\times 1 second = 0.5 GB-seconds. For the second function: 1 GB \\times 0.5 seconds = 0.5 GB-seconds.\n\n**Step 3:** Compare the results. Both scenarios result in 0.5 GB-seconds of compute, meaning they cost the same in compute charges. This illustrates that allocating more memory (which also increases CPU) does not necessarily increase total cost if execution time decreases proportionally.\n\nTrue. Lambda pricing has two components: (1) per-invocation cost (\\$0.20 per 1M requests) and (2) compute cost measured in GB-seconds (memory allocated \\times duration in seconds). 512 MB \\times 1 second = 0.5 GB-seconds. 1024 MB \\times 0.5 seconds = 0.5 GB-seconds. Both cost the same in compute charges. This means allocating more memory (which speeds up CPU-bound functions) does not necessarily increase cost if execution time decreases proportionally.",
      hints: [
        "GB-seconds = memory in GB \\times execution time in seconds. Calculate both scenarios.",
        "Does doubling memory and halving execution time change the GB-seconds value?",
      ],
    },
    {
      id: "q-sdi-cloud-12",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You are designing a serverless REST API to handle 10,000 requests/second with sub-100ms p99 latency. The architecture uses API Gateway + Lambda + DynamoDB. Which limitation most threatens the latency SLO?",
      options: [
        "DynamoDB has a maximum throughput of 1,000 reads/second per table.",
        "Lambda cold starts can add 100ms-10s of latency for infrequently invoked functions, violating sub-100ms p99 latency.",
        "API Gateway does not support more than 1,000 concurrent connections.",
        "DynamoDB single-digit millisecond latency makes it too slow for sub-100ms APIs.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Analyze the latency characteristics of each component. DynamoDB delivers single-digit millisecond latency at any scale. API Gateway supports 10,000 RPS by default. Both are consistent and fast. Lambda cold starts, however, are variable and can range from 100ms to 10 seconds.\n\n**Step 2:** Consider p99 metrics. At p99, you are measuring the worst 1% of requests. At 10,000 RPS, most requests hit warm Lambda instances. However, Lambda environments that have been idle are subject to cold starts, and these cold start outliers will dominate the p99 latency metric.\n\n**Step 3:** Identify the threat to the SLO. Cold starts will consistently blow the sub-100ms p99 budget. Mitigations include Provisioned Concurrency (pre-warmed environments), minimizing package size, using lighter runtimes (Node.js over Java), and minimizing initialization-phase work.\n\nFor a sub-100ms p99 SLO, Lambda cold starts are the primary threat. At 10,000 RPS, most requests hit warm Lambda instances, but cold starts (100ms to 10s) will consistently blow the p99 budget. Mitigations include Provisioned Concurrency, minimizing package size, using lighter runtimes (Node.js over Java), and minimizing init-phase work. DynamoDB delivers single-digit millisecond latency at any scale, and API Gateway supports 10,000 RPS by default with limit increases available.",
      hints: [
        "At p99, you are measuring the worst 1% of requests. What event affects only a small fraction of Lambda invocations?",
        "Which part of the serverless stack has variable initialization latency vs. consistent single-digit millisecond latency?",
      ],
    },
  ],

  "sdi-cloud-networking": [
    {
      id: "q-sdi-cloud-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You are designing a VPC for a three-tier web application (load balancer, application servers, RDS database). How should you distribute resources across public and private subnets?",
      options: [
        "Put everything in a public subnet for simplicity and use security groups to restrict access.",
        "Put the internet-facing ALB in public subnets, application servers and RDS in private subnets, and use a NAT Gateway for private subnets to initiate outbound internet connections.",
        "Put the ALB and application servers in public subnets; only RDS needs to be private.",
        "Use only private subnets and access everything via VPN - public subnets are a security risk.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify which components need public internet access. The Application Load Balancer (ALB) must be publicly accessible to receive internet traffic and needs public IPs. Application servers and the RDS database should never have direct public internet access.\n\n**Step 2:** Design the subnet architecture. Place the ALB in public subnets (which have internet gateways attached). Place application servers and RDS in private subnets that have no direct internet access.\n\n**Step 3:** Handle outbound connectivity for private subnets. Private subnet instances need outbound internet access for things like package updates and API calls. A NAT Gateway in the public subnet allows private instances to initiate outbound connections without being reachable from the internet.\n\nBest practice VPC design: the ALB in public subnets receives internet traffic (requires public IPs). Application servers in private subnets can only be reached from the ALB, not directly from the internet. RDS in private subnets is never internet-accessible. A NAT Gateway in the public subnet allows private instances to initiate outbound connections (for package updates, API calls) without being reachable inbound. This separation minimizes attack surface.",
      hints: [
        "Which tier needs to be reachable from the public internet, and which should never have a public IP?",
        "How do private subnet instances make outbound internet calls (e.g., to download updates) without being internet-accessible?",
      ],
    },
    {
      id: "q-sdi-cloud-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A security team wants to block all traffic from a specific IP range at the subnet level and allow all traffic from the application subnet to the database subnet. Which AWS network controls should they use and why?",
      options: [
        "Use Security Groups for both - they support both allow and deny rules at the instance level.",
        "Use Network ACLs to block the IP range at the subnet level (NACLs support explicit deny); use Security Groups to allow app-to-database traffic (stateful, simpler to manage for allow rules).",
        "Use Security Groups for the IP block deny rule; NACLs cannot block specific IP ranges.",
        "Use Route Tables to block IP ranges and Security Groups for service-to-service allow rules.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the key difference. Security Groups are stateful and only support ALLOW rules (no explicit DENY). Network ACLs (NACLs) are stateless and support both ALLOW and DENY rules.\n\n**Step 2:** Determine the right tool for blocking. To block a specific IP range, you need NACLs because Security Groups cannot explicitly deny traffic. NACLs evaluate rules in numerical order and can have an explicit deny rule for the blocked IP range at the subnet level.\n\n**Step 3:** Determine the right tool for allowing. For the application-to-database allow rule, Security Groups are preferred because they are stateful (return traffic is automatically allowed) and simpler to manage for allow rules. NACLs require explicit inbound AND outbound rules for stateless evaluation.\n\nNetwork ACLs (NACLs) operate at the subnet level, are stateless (must explicitly allow both inbound and outbound for return traffic), and support both ALLOW and DENY rules evaluated in numerical order. This makes them ideal for blocking specific IP ranges across an entire subnet. Security Groups operate at the instance/ENI level, are stateful (return traffic is automatically allowed), but only support ALLOW rules - you cannot explicitly deny with a Security Group. Use NACLs for coarse-grained subnet-level deny rules, Security Groups for fine-grained instance-level allow rules.",
      hints: [
        "Do Security Groups support explicit DENY rules, or only ALLOW rules?",
        "NACLs are stateless - what does that mean for return traffic on allowed connections?",
      ],
    },
    {
      id: "q-sdi-cloud-15",
      type: "true-false",
      difficulty: "medium",
      question: "AWS PrivateLink allows you to consume services hosted in another VPC or AWS service privately without the traffic traversing the public internet, even if the two VPCs have overlapping CIDR ranges.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand PrivateLink's mechanism. PrivateLink creates an interface endpoint (an ENI) in your VPC that connects privately to a service endpoint. Traffic flows through AWS's internal network and never traverses the public internet.\n\n**Step 2:** Consider the overlapping CIDR advantage. Unlike VPC Peering which requires non-overlapping CIDR ranges (because it creates direct routing between VPCs), PrivateLink works with overlapping IP CIDR ranges. This is because you are connecting to an endpoint service, not routing between VPC networks.\n\n**Step 3:** Identify the use cases. PrivateLink is ideal for consuming SaaS services, shared internal services across accounts, and AWS service endpoints (S3, DynamoDB, etc.) without requiring internet gateways, NAT gateways, or public IPs.\n\nTrue. AWS PrivateLink creates an interface endpoint (an ENI in your VPC) that connects privately to a service endpoint. Traffic flows through AWS's internal network and never traverses the public internet. Unlike VPC Peering, PrivateLink works even with overlapping IP CIDR ranges because you are connecting to an endpoint, not routing between VPC CIDRs. This makes PrivateLink ideal for SaaS services, shared internal services, and AWS service endpoints (S3, DynamoDB, etc.) without requiring internet gateways.",
      hints: [
        "VPC Peering requires non-overlapping CIDR ranges because it routes IP traffic directly. Does PrivateLink have this constraint?",
        "Through which network does PrivateLink traffic flow - the public internet or AWS internal network?",
      ],
    },
    {
      id: "q-sdi-cloud-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your company needs to connect its on-premises data center to AWS. Workloads require consistent sub-10ms latency and predictable bandwidth for large data transfers. Which connectivity option is most appropriate?",
      options: [
        "Site-to-Site VPN - it is encrypted and provides consistent low latency over the internet.",
        "AWS Direct Connect - a dedicated fiber connection with consistent bandwidth, predictable latency, and no internet traversal.",
        "AWS Transit Gateway - it routes traffic between on-premises and cloud automatically.",
        "VPC Peering - directly connects the on-premises network to the cloud VPC.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Analyze latency requirements. Sub-10ms latency with predictable performance requires a dedicated connection, not shared infrastructure. Site-to-Site VPN runs over the public internet, which is subject to variable latency due to congestion, routing inefficiencies, and shared bandwidth.\n\n**Step 2:** Evaluate Direct Connect benefits. AWS Direct Connect provides a dedicated private fiber connection between your data center and AWS. It delivers consistent bandwidth (1 Gbps to 100 Gbps), predictable low latency (not subject to internet congestion), and often lower data transfer costs for high-volume transfers.\n\n**Step 3:** Consider the trade-off. Direct Connect costs more upfront (dedicated port fees) but is the right choice for production workloads requiring consistent network performance. VPN is suitable for development, disaster recovery, or non-latency-sensitive workloads.\n\nAWS Direct Connect provides a dedicated private fiber connection between your data center and AWS. It delivers consistent bandwidth (1 Gbps to 100 Gbps), predictable low latency (not subject to internet congestion), and often lower data transfer costs for high-volume transfers. Site-to-Site VPN runs over the public internet with variable latency and is susceptible to congestion - unsuitable for latency-sensitive or high-throughput workloads. Direct Connect costs more upfront but is the right choice for production workloads requiring consistent network performance.",
      hints: [
        "What causes variable latency over VPN that does not apply to Direct Connect?",
        "Which option provides a dedicated physical link vs. an encrypted tunnel over shared infrastructure?",
      ],
    },
  ],

  "sdi-cloud-storage": [
    {
      id: "q-sdi-cloud-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A media company stores video files that are accessed frequently for 30 days after upload, then rarely accessed for 90 days, then archived for 7 years for compliance. Which S3 storage strategy minimizes cost?",
      options: [
        "Store everything in S3 Standard for simplicity and predictable performance.",
        "Use S3 Lifecycle rules: Standard (0-30 days) -> Standard-Infrequent Access (31-120 days) -> Glacier Deep Archive (121+ days).",
        "Use S3 Intelligent-Tiering for all objects to automatically optimize cost.",
        "Use Glacier for all objects from day one since most data will eventually be archived.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Analyze the access pattern. The data has three distinct phases: frequent access (0-30 days), infrequent access (31-120 days), and long-term archive (121+ days, 7 years for compliance).\n\n**Step 2:** Match storage classes to access patterns. S3 Standard is optimized for frequent access with full performance and higher storage cost. Standard-Infrequent Access has lower storage cost but charges a minimum 30-day duration and per-GB retrieval fee. Glacier Deep Archive has the lowest storage cost but 12-hour retrieval time, ideal for compliance archives.\n\n**Step 3:** Implement automated transitions. S3 Lifecycle rules automate these transitions automatically, reducing management overhead and ensuring cost optimization throughout the data lifecycle.\n\nS3 Lifecycle rules automate cost-optimal transitions. S3 Standard for days 0-30 handles frequent access at full performance. Standard-IA (30-day minimum charge, lower storage price but per-GB retrieval fee) fits infrequently accessed data. Glacier Deep Archive (12-hour retrieval, lowest cost storage) is ideal for 7-year compliance archives that are rarely if ever retrieved. This tiered approach balances access performance with storage cost at each lifecycle stage.",
      hints: [
        "Match each phase (frequent, infrequent, compliance archive) to the S3 storage class with the appropriate cost/retrieval tradeoff.",
        "S3 Lifecycle rules automate transitions - you define the rules once and S3 moves objects automatically.",
      ],
    },
    {
      id: "q-sdi-cloud-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You need to upload a 50 GB video file to S3. Which upload strategy should you use and what benefit does it provide beyond reliability?",
      options: [
        "Single PUT request - S3 supports up to 5 TB in a single request.",
        "S3 multipart upload: split the file into parts, upload parts in parallel, complete with a single CompleteMultipartUpload call. Benefits include parallel throughput and per-part checksum verification.",
        "Use S3 Transfer Acceleration - it automatically parallelizes uploads internally.",
        "Upload to an EC2 instance first, then copy to S3 using the AWS CLI for large files.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Check S3 size limits. S3 PUT requests support objects up to 5 GB. A 50 GB file exceeds this limit, so multipart upload is required.\n\n**Step 2:** Understand multipart upload benefits. Multipart upload splits the file into parts (typically 5-100 MB each) that are uploaded in parallel over multiple connections. This maximizes bandwidth utilization and significantly reduces upload time.\n\n**Step 3:** Consider integrity and fault tolerance. Each part has an independent checksum (MD5/CRC32) for integrity verification, catching corruption during transit. Failed parts can be retried without restarting the entire upload. The final CompleteMultipartUpload call atomically assembles the object.\n\nS3 multipart upload is required for objects over 5 GB and recommended above 100 MB. Benefits: (1) parallel upload of parts over multiple connections maximizes bandwidth utilization; (2) failed parts can be retried without restarting the entire upload; (3) each part has an independent checksum (MD5/CRC32) for integrity verification, catching corruption during transit; (4) the final CompleteMultipartUpload call atomically assembles the object. Single PUT is limited to 5 GB. S3 Transfer Acceleration uses CloudFront edge locations to speed up transfers but still uses multipart under the hood for large files.",
      hints: [
        "What is the maximum size for a single S3 PUT request, and what does multipart upload enable that a single PUT cannot?",
        "How does uploading parts in parallel affect total upload time compared to a sequential single upload?",
      ],
    },
    {
      id: "q-sdi-cloud-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You need shared filesystem access for a stateful application running on 10 EC2 instances simultaneously, allowing all instances to read and write the same files. Which AWS storage service is appropriate?",
      options: [
        "EBS (Elastic Block Store) - attach the same EBS volume to all 10 instances.",
        "EFS (Elastic File System) - NFS-based shared filesystem mountable by multiple EC2 instances concurrently.",
        "S3 - mount S3 as a filesystem using s3fs on all instances.",
        "Instance store - local NVMe storage on each EC2 instance for shared access.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Evaluate shared storage requirements. You need multiple EC2 instances to simultaneously read and write the same files, which requires a network-accessible shared filesystem.\n\n**Step 2:** Assess each option. EBS volumes can only be attached to one EC2 instance at a time (except EBS Multi-Attach, which is limited to io1/io2 volumes and specific use cases). Instance store is local to each EC2 instance and cannot be shared across instances. S3 via s3fs is not a true filesystem (eventual consistency, high latency for small files).\n\n**Step 3:** Select the correct service. EFS provides a managed NFS (Network File System) filesystem that can be mounted concurrently by thousands of EC2 instances across multiple Availability Zones, making it ideal for shared workloads.\n\nEFS provides a managed NFS filesystem that can be mounted concurrently by thousands of EC2 instances across multiple AZs. It automatically scales capacity and is ideal for shared workloads (web servers sharing static assets, HPC scratch space, shared configuration files). EBS volumes can only be attached to one EC2 instance at a time (except EBS Multi-Attach, which is limited to io1/io2 volumes and specific use cases). S3 via s3fs is not a true filesystem (eventual consistency, high latency for small files). Instance store is local to each EC2 instance and not shared.",
      hints: [
        "EBS is block storage attached to one instance at a time. Which service provides a shared network filesystem?",
        "NFS (Network File System) is a protocol for mounting shared storage over a network - which AWS service implements this?",
      ],
    },
    {
      id: "q-sdi-cloud-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You want to automatically resize images whenever a new file is uploaded to an S3 bucket, without managing any servers. What is the correct serverless architecture?",
      options: [
        "Poll the S3 bucket with a Lambda function every minute to check for new files.",
        "Configure S3 Event Notifications to trigger a Lambda function on ObjectCreated events; the Lambda resizes the image and writes the output back to S3.",
        "Use CloudWatch Events to monitor S3 bucket metrics and trigger Lambda on high upload counts.",
        "Use SQS to queue S3 upload confirmations, then have EC2 workers poll the queue.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Consider the push-based notification option. S3 Event Notifications can trigger Lambda directly on events like s3:ObjectCreated:*. This is a push mechanism - S3 notifies Lambda immediately when an object is created, requiring no polling.\n\n**Step 2:** Evaluate the Lambda function's role. When triggered, S3 passes event metadata (bucket name, object key, size) to the Lambda function. The function downloads the object, processes it (resizes the image), and writes the result back to S3.\n\n**Step 3:** Consider the output destination. To avoid an infinite trigger loop (uploading output triggers another invocation), the Lambda should write processed output to a different S3 prefix or bucket than the input.\n\nS3 Event Notifications can trigger Lambda directly on events like s3:ObjectCreated:*. This serverless pattern requires no polling, no servers, and no queue management. When an object is uploaded, S3 invokes the Lambda function with event metadata (bucket, key, size). The Lambda downloads the object, processes it, and writes the result back to S3 (typically a different bucket or prefix to avoid infinite trigger loops). This pattern handles any scale automatically - Lambda scales concurrently with upload rate.",
      hints: [
        "Polling wastes resources and adds latency. What push-based mechanism does S3 provide for reacting to uploads?",
        "Why should the Lambda write processed output to a different S3 prefix or bucket than the input?",
      ],
    },
  ],

  "sdi-cloud-cicd": [
    {
      id: "q-sdi-cloud-21",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the correct order of stages in a production CI/CD pipeline?",
      options: [
        "Deploy to production -> run tests -> build -> deploy to staging.",
        "Build -> unit tests -> integration tests -> deploy to staging -> smoke tests -> deploy to production.",
        "Build -> deploy to production -> run all tests in production.",
        "Unit tests -> build -> deploy to production -> integration tests.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the purpose of staging gates. Each stage in a CI/CD pipeline exists to catch failures before they reach a more expensive or user-facing stage. Running tests earlier (before deploying) is cheaper than fixing issues in production.\n\n**Step 2:** Order stages from fastest/cheapest to slowest/most expensive. Build compiles and packages the artifact (fast, no infrastructure needed). Unit tests validate individual components quickly. Integration tests validate component interactions (slower, requires test environment). Staging deploy tests the artifact in a production-like environment.\n\n**Step 3:** Add validation gates before production. Smoke tests validate critical paths post-deploy. Only after all these validations pass does the pipeline deploy to production, preventing broken code from reaching users.\n\nA production CI/CD pipeline gates each stage: Build compiles and packages the artifact. Unit tests validate individual components quickly (fast feedback). Integration tests validate component interactions (slower). Staging deploy tests the artifact in a production-like environment. Smoke tests validate critical paths post-deploy. Only after staging validation does the pipeline deploy to production. Running tests before production deployment catches regressions early and prevents broken code from reaching users.",
      hints: [
        "The purpose of each stage is to catch failures before they reach the next, more expensive stage.",
        "Why would you deploy to staging before running integration tests against a live environment?",
      ],
    },
    {
      id: "q-sdi-cloud-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your team needs to deploy a new version of a critical payment service with zero downtime and the ability to instantly roll back if errors spike. Which deployment strategy achieves this?",
      options: [
        "Rolling deployment - replace instances one at a time, accepting mixed versions during rollout.",
        "Blue-green deployment - run two identical environments; switch all traffic from blue (old) to green (new) at once; roll back by switching back to blue.",
        "Recreate deployment - terminate all old instances, then start new ones (causes downtime).",
        "Canary deployment - route 100% of traffic to the new version immediately.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the requirements. Zero downtime means the deployment cannot temporarily reduce capacity. Instant rollback means you need a fully provisioned idle environment with the previous version ready to go.\n\n**Step 2:** Evaluate deployment strategies. Rolling deployment creates mixed-version states and rollback requires rolling back instance by instance. Recreate deployment causes downtime. Canary deployment routes a small percentage to the new version but does not provide instant full rollback capability.\n\n**Step 3:** Select the correct strategy. Blue-green deployment maintains two identical production environments. The new version is deployed to the idle environment (green) and validated. Traffic is switched instantly at the load balancer level. If errors occur, rolling back means switching traffic back to blue - a seconds-level operation.\n\nBlue-green deployment maintains two identical production environments. The new version is deployed to the idle environment (green) and validated. Traffic is switched at the load balancer level instantly (DNS swap or weighted routing to 100% green). If errors occur, rolling back means switching traffic back to blue - a seconds-level operation. The key advantage is instant, full rollback capability. The cost is running two full production environments simultaneously during deployment.",
      hints: [
        "What does 'two identical environments' enable that a rolling deployment cannot do as quickly?",
        "How does a blue-green rollback differ from a rolling deployment rollback in terms of speed?",
      ],
    },
    {
      id: "q-sdi-cloud-23",
      type: "true-false",
      difficulty: "medium",
      question: "Feature flags allow teams to deploy new code to production without activating the feature for users, enabling gradual rollouts to specific user segments and instant disabling without redeployment.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand the key separation. Feature flags decouple deployment from release. Code containing a new feature is deployed to production behind a flag that is initially disabled. The code exists in production but is not visible or functional for any users.\n\n**Step 2:** Understand gradual rollouts. The flag can be toggled to enable the feature for a percentage of users (1% -> 10% -> 100%), specific user cohorts (beta users, internal employees), or geographic regions. This allows real-world testing with minimal risk.\n\n**Step 3:** Understand instant disable capability. If the feature causes issues, the flag is disabled instantly - no redeployment, no rollback procedure. This is faster and lower risk than traditional code rollback.\n\nTrue. Feature flags (also called feature toggles) decouple deployment from release. Code containing a new feature is deployed to production behind a flag. The flag can be toggled to enable the feature for a percentage of users (1% -> 10% -> 100%), specific user cohorts (beta users, internal employees), or geographic regions. If the feature causes issues, the flag is disabled instantly - no redeployment, no rollback. Services like LaunchDarkly, Unleash, or simple database-backed flags implement this pattern.",
      hints: [
        "What is the difference between 'deploying code' and 'releasing a feature' when using feature flags?",
        "How does turning off a feature flag compare to a code rollback in terms of speed and risk?",
      ],
    },
    {
      id: "q-sdi-cloud-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your team adopts GitOps for Kubernetes. A developer directly kubectl-applies a config change to the production cluster that differs from what is in Git. What happens, and why is this a problem?",
      options: [
        "Nothing happens - GitOps is just a workflow convention, not an enforced system.",
        "The GitOps operator (Argo CD or Flux) detects the drift between the cluster state and Git state and automatically reverts the manual change to match Git.",
        "The kubectl apply succeeds permanently and Git becomes out of sync, which is the desired behavior for hotfixes.",
        "Kubernetes rejects manual kubectl applies when GitOps is enabled.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand GitOps principles. In GitOps, Git is the single source of truth for infrastructure state. All configuration changes must go through Git (via pull requests), ensuring an audit trail and review process.\n\n**Step 2:** Understand the reconciliation loop. GitOps tools like Argo CD and Flux continuously monitor both the Git repository and the cluster state, detecting any drift between them.\n\n**Step 3:** Understand what happens on drift. When a developer makes a manual kubectl change, the GitOps operator detects the drift and automatically reverts the cluster to match the Git-defined state (configurable: auto-sync or alert-only). This enforces that no change can persist without going through Git.\n\nIn GitOps, Git is the single source of truth for infrastructure state. Tools like Argo CD and Flux continuously reconcile the cluster state to match the Git repository. A manual kubectl change creates 'drift' - the cluster state diverges from Git. The GitOps operator detects this drift and reverts the cluster to the Git-defined state (configurable behavior: auto-sync or alert on drift). This is a feature: it prevents configuration drift, ensures auditability (all changes go through Git history), and enforces review processes (PRs) for infrastructure changes.",
      hints: [
        "What does 'Git as single source of truth' mean in practice when someone makes a change outside of Git?",
        "How do Argo CD or Flux reconcile loops behave when they detect a difference between the cluster and the Git repository?",
      ],
    },
  ],

  "sdi-cloud-cost-optimization": [
    {
      id: "q-sdi-cloud-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your company runs 100 EC2 instances continuously for a core banking application with predictable load. Which purchasing model minimizes cost while meeting the reliability requirement of guaranteed instance availability?",
      options: [
        "Spot Instances - up to 90% discount; use Spot for all workloads to maximize savings.",
        "Reserved Instances (1-year or 3-year commitment) - 40-60% discount vs on-demand with guaranteed capacity reservation.",
        "On-Demand Instances - flexible pricing without commitment, best for predictable workloads.",
        "Savings Plans without Reserved Instances - maximum flexibility with moderate discounts.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Analyze the workload characteristics. Core banking requires predictable, continuous operation with guaranteed availability. Spot Instances can be interrupted with only 2 minutes warning, which is unacceptable for core banking systems.\n\n**Step 2:** Evaluate purchasing options. Reserved Instances (RIs) offer 40-60% savings vs. on-demand with a 1-3 year commitment. Critically, Capacity Reservations within RIs guarantee instance availability in a specific Availability Zone.\n\n**Step 3:** Select the appropriate model. For steady-state, predictable workloads like core banking, RIs provide the best balance of cost savings and reliability guarantees. On-demand is more expensive. Savings Plans offer similar discounts to RIs but without the capacity reservation guarantee.\n\nReserved Instances (RIs) are ideal for steady-state, predictable workloads: 1-year RIs save ~40%, 3-year RIs save ~60% vs. on-demand. Critically, Capacity Reservations guarantee instance availability in a specific AZ - important for banking systems. Spot Instances offer up to 90% discount but can be interrupted with only 2 minutes warning, making them unsuitable for core banking. On-demand provides no discount. Savings Plans offer similar discounts to RIs but with more flexibility across instance types.",
      hints: [
        "Spot Instances can be reclaimed by AWS with 2 minutes notice - is this acceptable for a core banking system?",
        "Reserved Instances trade flexibility (commitment) for a significant price discount. Is a 1-3 year commitment reasonable for core infrastructure?",
      ],
    },
    {
      id: "q-sdi-cloud-26",
      type: "true-false",
      difficulty: "easy",
      question: "CloudWatch CPU and memory utilization metrics can identify over-provisioned EC2 instances, and right-sizing (moving to a smaller instance type) is often the highest-impact cloud cost optimization action.",
      correctAnswer: "true",
      explanation: "**Step 1:** Understand how to identify over-provisioning. CloudWatch provides CPU utilization metrics natively for all EC2 instances. If an instance averages 5-10% CPU utilization, it is likely over-provisioned for its workload.\n\n**Step 2:** Note the memory metric caveat. Memory utilization requires the CloudWatch Agent to be installed on the instance, as EC2 does not natively report memory metrics to CloudWatch.\n\n**Step 3:** Understand right-sizing impact. AWS studies show that 30-40% of cloud spend is wasted on over-provisioned resources. Right-sizing moving an instance to a smaller, appropriately-sized instance type can provide immediate and significant cost savings without any architectural changes.\n\nTrue. Right-sizing is frequently the highest ROI cost optimization activity. AWS studies show that 30-40% of cloud spend is wasted on over-provisioned resources. If CloudWatch shows an instance averaging 5-10% CPU utilization, it is likely over-provisioned. AWS Compute Optimizer analyzes 14 days of CloudWatch metrics and recommends right-sized instance types. Note that memory metrics require the CloudWatch Agent to be installed, as EC2 does not natively report memory utilization to CloudWatch.",
      hints: [
        "If an instance uses 5% CPU on average, what fraction of its compute resources are being wasted?",
        "Does CloudWatch natively collect memory metrics from EC2 instances without any additional configuration?",
      ],
    },
    {
      id: "q-sdi-cloud-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "S3 Intelligent-Tiering automatically moves objects between storage tiers. What is the primary use case where it outperforms manually configured Lifecycle rules?",
      options: [
        "When all objects follow a predictable access pattern known at upload time.",
        "When access patterns are unknown or unpredictable - Intelligent-Tiering monitors access frequency per object and automatically moves it between frequent-access and infrequent-access tiers.",
        "When objects are always accessed within 30 days and then deleted.",
        "When objects are larger than 5 GB and require multipart upload.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the limitation of Lifecycle rules. Lifecycle rules require you to know the access pattern upfront. If your prediction is wrong (e.g., you move objects to Infrequent Access but they are actually accessed frequently), you pay unnecessary retrieval fees.\n\n**Step 2:** Understand Intelligent-Tiering's advantage. Intelligent-Tiering monitors actual access frequency per object and automatically moves it between tiers. Objects not accessed for 30 consecutive days move to Infrequent Access; the next access moves them back to Frequent Access. There are no retrieval fees.\n\n**Step 3:** Identify the best use case. Intelligent-Tiering excels when access patterns are unknown, unpredictable, or fluctuate over time. It eliminates the risk of misconfigured Lifecycle rules and associated retrieval fees.\n\nS3 Intelligent-Tiering is designed for data with unknown or unpredictable access patterns. It automatically moves objects to the Infrequent Access tier after 30 consecutive days without access, and back to Frequent Access tier on the next access. There is no retrieval fee for objects in Intelligent-Tiering. It is less optimal than well-tuned Lifecycle rules for predictable access patterns (e.g., 'all objects accessed heavily for 30 days then archived'), but eliminates the risk of paying infrequent access retrieval fees for data that is accessed more frequently than expected.",
      hints: [
        "When would you know upfront that data will be accessed infrequently vs. when would you not know?",
        "What is the cost disadvantage of putting frequently-accessed objects in Standard-IA using Lifecycle rules?",
      ],
    },
    {
      id: "q-sdi-cloud-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your application transfers 10 TB of data daily between an EC2 instance in us-east-1 and an S3 bucket in eu-west-1. What is the cost implication and how should you redesign to minimize data transfer costs?",
      options: [
        "Data transfer is always free between AWS services regardless of region.",
        "Cross-region data transfer is charged (typically \\$0.02/GB for egress). Move the EC2 instance or S3 bucket to the same region as the other, or use S3 replication to create a regional replica.",
        "Only inbound (ingress) data transfer is charged; outbound is free.",
        "Use CloudFront in front of S3 to eliminate all data transfer costs.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand AWS data transfer pricing. AWS charges for data egress (data leaving AWS to the internet or between AWS regions). Ingress (data into AWS) is free. Cross-region transfer is charged at approximately \\$0.02/GB.\n\n**Step 2:** Calculate the daily cost. 10 TB = 10,000 GB \\times \\$0.02/GB = \\$200/day = \\$6,000/month in data transfer costs alone.\n\n**Step 3:** Redesign for cost minimization. The fix is to co-locate compute and storage in the same region. If global distribution is required, use S3 Cross-Region Replication to maintain regional replicas, then access the local replica. The goal is to minimize cross-region and internet-bound data transfers.\n\nAWS data transfer pricing: ingress (data into AWS) is free. Egress (data out of AWS to the internet) is charged (\\$0.09/GB typical). Cross-region transfer (between AWS regions) is also charged (~$0.02/GB). 10 TB/day \\times \\$0.02/GB = \\$200/day = \\$6,000/month in data transfer costs alone. The fix: co-locate compute and storage in the same region. If global distribution is needed, use S3 Cross-Region Replication to maintain regional replicas, then access the local replica. The goal is to minimize cross-region and internet-bound data transfers.",
      hints: [
        "Calculate: 10 TB = 10,000 GB \\times \\$0.02/GB cross-region transfer. What is the monthly cost?",
        "What is the general principle for minimizing data transfer costs in cloud architectures?",
      ],
    },
  ],

  "sdi-cloud-reliability": [
    {
      id: "q-sdi-cloud-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your team must decide between Multi-AZ and Multi-Region deployment for a customer database. What is the key tradeoff?",
      options: [
        "Multi-AZ is for disaster recovery; Multi-Region is for high availability within a region.",
        "Multi-AZ provides high availability within a region (millisecond synchronous replication, automatic failover in seconds). Multi-Region provides disaster recovery and global distribution but with second-level replication lag and higher complexity.",
        "Multi-Region always has synchronous replication with no additional latency.",
        "Multi-AZ and Multi-Region are interchangeable - choose based on cost alone.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand Multi-AZ characteristics. Multi-AZ deploys database replicas in physically separate Availability Zones within the same AWS region. Synchronous replication ensures zero data loss on failover (RPO=0), and automatic failover typically completes in 30-60 seconds. This handles datacenter-level failures but not regional outages.\n\n**Step 2:** Understand Multi-Region characteristics. Multi-Region places replicas in different geographic regions for true disaster recovery against regional failures (earthquakes, region-wide outages). However, cross-region replication is asynchronous due to network latency, resulting in potential data loss (RPO > 0) and requiring application-level logic for failover.\n\n**Step 3:** Recognize the tradeoff. Multi-AZ provides HA with zero data loss but no protection against regional outages. Multi-Region provides DR and global distribution but with replication lag and higher complexity.\n\nMulti-AZ deploys database replicas in physically separate datacenters within the same AWS region. Synchronous replication means zero data loss on failover (RPO=0), and automatic failover typically completes in 30-60 seconds. This handles datacenter-level failures but not regional outages. Multi-Region places replicas in different geographic regions for true disaster recovery against regional failures (earthquakes, region-wide outages). The tradeoff: cross-region replication is asynchronous (latency prevents synchronous cross-region writes), resulting in potential data loss (RPO > 0) and requiring application-level logic for failover.",
      hints: [
        "What is the replication lag between two AZs in the same region vs. two regions on different continents?",
        "Multi-AZ protects against datacenter failure; what additional failure scenario does Multi-Region protect against?",
      ],
    },
    {
      id: "q-sdi-cloud-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A system has an RTO of 4 hours and an RPO of 1 hour. What do these objectives require from a backup and recovery strategy?",
      options: [
        "RTO=4h means backups must be taken every 4 hours; RPO=1h means recovery must complete in 1 hour.",
        "RPO=1h requires backups taken at least every hour (to limit data loss to 1 hour); RTO=4h requires the system to be fully restored within 4 hours of a failure event.",
        "Both RTO and RPO measure the same thing - maximum acceptable downtime.",
        "RTO=4h means the last 4 hours of data may be lost; RPO=1h means recovery takes 1 hour.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand RTO definition. RTO (Recovery Time Objective) is the maximum acceptable time from failure detection to system restoration - how long the business can tolerate being down. RTO=4h means all recovery procedures must complete within 4 hours.\n\n**Step 2:** Understand RPO definition. RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time - how far back in time the recovery can restore to. RPO=1h means backups must run at least every hour so that at most 1 hour of data is lost.\n\n**Step 3:** Apply to backup strategy. RPO drives backup frequency (hourly backups to meet 1-hour RPO). RTO drives recovery automation investments (faster recovery procedures, rehearsed runbooks, pre-provisioned infrastructure).\n\nRTO (Recovery Time Objective) is the maximum acceptable time from failure detection to system restoration - how long the business can tolerate being down. RTO=4h means recovery procedures must complete within 4 hours. RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time - the furthest point in the past that recovery can restore to. RPO=1h means backups must run at least every hour so that at most 1 hour of data is lost. These drive backup frequency (RPO) and recovery automation investments (RTO).",
      hints: [
        "RPO answers: 'How much data can we afford to lose?' RTO answers: 'How long can we be down?'",
        "If RPO is 1 hour, how frequently must backups run to guarantee no more than 1 hour of data loss?",
      ],
    },
    {
      id: "q-sdi-cloud-31",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Netflix's Chaos Monkey randomly terminates EC2 instances in production. Why is deliberately introducing failures in production a reliability engineering best practice?",
      options: [
        "It reduces costs by identifying unused instances for termination.",
        "It validates that the system's fault tolerance mechanisms work under real conditions, forces engineers to build resilient systems, and surfaces hidden dependencies before real failures do.",
        "It is a security practice to rotate instances regularly and prevent persistent threats.",
        "It is only useful for testing auto-scaling - it has no other reliability benefit.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the principle behind chaos engineering. Failures are inevitable in distributed systems. Rather than hoping systems are resilient, chaos engineering deliberately tests them under failure conditions to prove their resilience.\n\n**Step 2:** Identify what chaos engineering validates. By injecting failures (instance termination, network partitions, disk failures) in production under real traffic conditions, teams can validate that retry logic, failover, and redundancy actually work when needed.\n\n**Step 3:** Recognize the organizational benefits. Chaos engineering surfaces hidden single points of failure and undocumented dependencies before they cause real outages. It also builds organizational muscle memory for incident response.\n\nChaos engineering, pioneered by Netflix, operates on the principle that failures are inevitable, so systems must be designed to tolerate them. By deliberately injecting failures (instance termination, network partitions, disk failures) in production, teams: (1) validate that retry logic, failover, and redundancy actually work under real traffic conditions; (2) surface hidden single points of failure or undocumented dependencies; (3) build organizational muscle memory for incident response. Systems that are never tested under failure conditions often have latent reliability bugs discovered only during real outages - at the worst possible time.",
      hints: [
        "What is the difference between a system that is designed to be resilient vs. one that has been proven resilient under real conditions?",
        "If you never test your failover mechanisms, how do you know they will work when a real failure occurs?",
      ],
    },
  ],

  "sdi-cloud-security": [
    {
      id: "q-sdi-cloud-32",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An EC2 instance needs to read from an S3 bucket and write to DynamoDB. What is the most secure way to provide these AWS API credentials?",
      options: [
        "Hardcode the AWS access key and secret key in the application configuration file.",
        "Store credentials in environment variables on the EC2 instance.",
        "Attach an IAM Role to the EC2 instance with a policy granting only the required S3 read and DynamoDB write permissions. The instance retrieves temporary credentials automatically via the instance metadata service.",
        "Use the root account access keys for maximum permissions to avoid permission errors.",
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Identify the risks of credential-based approaches. Hardcoded credentials in configuration files risk exposure in version control, logs, and process listings. Environment variables are similarly exposed. Root account keys should never be used for applications.\n\n**Step 2:** Understand IAM Roles for EC2. When you attach an IAM Role to an EC2 instance, the instance retrieves temporary credentials from the Instance Metadata Service (IMDS). These credentials rotate automatically every few hours and are never stored in the instance's filesystem or code.\n\n**Step 3:** Apply least privilege. The role policy should grant only the specific permissions needed: s3:GetObject on the specific bucket and dynamodb:PutItem on the specific table. This limits the blast radius if credentials are somehow compromised.\n\nIAM Roles for EC2 instances are the correct approach: the EC2 instance automatically retrieves temporary credentials from the instance metadata service (IMDS) that rotate every few hours. No credentials are stored in code, environment variables, or configuration files. The role policy should follow least privilege - grant only s3:GetObject on the specific bucket and only dynamodb:PutItem on the specific table. Hardcoded keys or environment variables are security risks (exposed in logs, version control, or process listings). Root account keys should never be used for applications.",
      hints: [
        "Where are hardcoded credentials at risk of being exposed in a software development lifecycle?",
        "IAM Roles provide temporary, auto-rotating credentials - how does this differ from long-lived access keys?",
      ],
    },
    {
      id: "q-sdi-cloud-33",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your application needs a database password and a third-party API key at runtime. A developer suggests using Lambda environment variables for these secrets. What is the security concern and what is the recommended alternative?",
      options: [
        "Environment variables are encrypted at rest by default in Lambda - there is no security concern.",
        "Environment variables are visible in the Lambda console and included in deployment packages/IaC templates, risking exposure. Use AWS Secrets Manager or HashiCorp Vault: retrieve secrets at runtime via API, rotate automatically, and audit access via CloudTrail.",
        "The only concern is performance - secrets managers add latency. Use environment variables for speed.",
        "Environment variables are only a concern for database passwords, not API keys.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the exposure risks. Lambda environment variables are visible in plaintext in the AWS Console, can be committed to IaC templates (Terraform, CloudFormation), appear in Lambda deployment packages, and are logged in CloudWatch Logs if logging is enabled.\n\n**Step 2:** Understand the recommended alternative. AWS Secrets Manager stores secrets encrypted (using KMS), retrieves them via API call at runtime (never stored in code or templates), and can automatically rotate credentials (e.g., RDS password rotation).\n\n**Step 3:** Understand the audit benefits. All access to Secrets Manager is logged in CloudTrail, providing an audit trail of which resource accessed which secret and when. The Lambda function only needs an IAM permission to call secretsmanager:GetSecretValue.\n\nLambda environment variables are stored encrypted at rest (KMS), but are visible in plaintext in the AWS Console, can be committed to IaC templates (Terraform, CloudFormation), and appear in Lambda deployment packages. AWS Secrets Manager addresses these risks: secrets are stored encrypted, retrieved via API call at runtime (never stored in code or templates), can be automatically rotated (e.g., RDS password rotation), and all access is logged in CloudTrail for auditability. The Lambda function needs only an IAM permission to call secretsmanager:GetSecretValue.",
      hints: [
        "Where could an environment variable value be accidentally exposed during the software development lifecycle?",
        "What additional capabilities does AWS Secrets Manager provide beyond just secret storage, particularly around credential rotation?",
      ],
    },
    {
      id: "q-sdi-cloud-34",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A financial services company must ensure that all data in RDS and S3 is encrypted, with encryption keys managed entirely by the company (not AWS). Which encryption configuration meets this requirement?",
      options: [
        "Use S3 server-side encryption with S3-managed keys (SSE-S3) - AWS manages everything automatically.",
        "Use Customer Managed Keys (CMK) in AWS KMS for both RDS and S3. The company controls key rotation, access policies, and can revoke AWS's ability to decrypt data.",
        "Enable TLS in transit only - in-transit encryption satisfies compliance requirements.",
        "Store encrypted data and manage decryption in the application layer to avoid using AWS KMS.",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the encryption key management spectrum. AWS offers three options: S3-managed keys (SSE-S3) where AWS fully manages the keys; AWS-managed keys (SSE-KMS with AWS-managed key) where AWS manages the key but provides audit logs; Customer Managed Keys (CMK) where the customer fully controls the key lifecycle.\n\n**Step 2:** Evaluate what CMK provides. With CMK in AWS KMS, the customer controls: key rotation policy (manual or automatic annual rotation); key access policies (who can use the key for encryption/decryption); key grants for cross-account access; and the ability to disable or delete the key, effectively revoking access to all data encrypted with it.\n\n**Step 3:** Recognize compliance implications. Many regulatory requirements (PCI-DSS, HIPAA, SOC2) mandate that the customer, not the cloud provider, must control encryption keys. CMK satisfies these requirements. Both RDS and S3 support CMK via KMS integration.\n\nCustomer Managed Keys (CMK) in AWS KMS give the customer control over: (1) key rotation policy (manual or automatic annual rotation); (2) key access policies (who can use the key for encryption/decryption); (3) key grants for cross-account access; (4) the ability to disable or delete the key (effectively revoking access to all data encrypted with it). With AWS-managed keys (SSE-S3 or SSE-KMS with AWS-managed key), AWS retains control. CMK satisfies regulatory requirements like PCI-DSS, HIPAA, and SOC2 that require customer-controlled encryption keys. Both RDS and S3 support CMK via KMS integration.",
      hints: [
        "Who controls the encryption key lifecycle when using S3-managed keys (SSE-S3) vs. Customer Managed Keys?",
        "What compliance requirement might mandate that only the customer, not the cloud provider, can decrypt sensitive data?",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
