import type { Question } from "@/lib/curriculum";

const questions: Record<string, Question[]> = {
  slam: [
    {
      id: "q-rob-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "EKF-SLAM linearizes the nonlinear motion and observation models using first-order Taylor expansion. What is the primary computational bottleneck that makes EKF-SLAM scale poorly to large maps?",
      options: [
        "The number of laser scan points per frame exceeds GPU memory",
        "The covariance matrix grows as O(N²) in the number of landmarks N, making updates O(N²) per step",
        "EKF requires computing the Jacobian of the neural network policy at each step",
        "The linearization error accumulates multiplicatively, not additively, with map size",
      ],
      correctAnswer: 1,
      explanation:
        "In EKF-SLAM, the state vector contains the robot pose and all N landmark positions. The covariance matrix is (3+2N) × (3+2N), growing quadratically with landmarks. Each observation update requires O(N²) operations, making EKF-SLAM impractical beyond a few hundred landmarks. Factor graph SLAM (e.g., iSAM2, GTSAM) overcomes this by exploiting sparsity in the information matrix.",
      hints: [
        "The state vector in EKF-SLAM grows linearly with N landmarks; the covariance matrix (state × state) grows quadratically.",
        "Compare to factor graph SLAM where the information (Fisher) matrix is sparse, enabling efficient incremental updates.",
      ],
    },
    {
      id: "q-rob-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In factor graph SLAM (as implemented in GTSAM or g2o), the key computational advantage over EKF-SLAM is that the information (Fisher) matrix is sparse, enabling efficient incremental updates via methods like iSAM2 without full matrix inversion.",
      correctAnswer: "true",
      explanation:
        "Factor graphs represent SLAM as a bipartite graph of variable nodes (poses, landmarks) and factor nodes (motion, measurement). The resulting information matrix is sparse because each factor connects only a small number of variables. iSAM2 exploits this sparsity with a Bayes tree data structure, enabling O(log N) incremental updates for most steps rather than O(N²) full relinearization.",
      hints: [
        "In EKF, every new measurement updates the full covariance matrix; in factor graph SLAM, only the variables directly connected to the new factor are affected.",
        "iSAM2 uses a Bayes tree (a junction tree over the factor graph) to efficiently update only the affected cliques when new measurements arrive.",
      ],
    },
    {
      id: "q-rob-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Loop closure in graph-based SLAM resolves long-term drift. After a loop closure constraint is added to the pose graph, which algorithm is used for the back-end optimization to correct all accumulated poses?",
      options: [
        "Gauss-Newton or Levenberg-Marquardt nonlinear least-squares minimizing the sum of squared pose-constraint residuals",
        "A* search to find the shortest path through the pose graph",
        "Particle filter with loop closure likelihood weighting",
        "Expectation-Maximization over Gaussian mixture pose distributions",
      ],
      correctAnswer: 0,
      explanation:
        "After loop closure detection adds a new edge to the pose graph, the back-end solves a nonlinear least-squares problem: minimize Σ eᵢᵀ Ωᵢ eᵢ over all poses, where eᵢ is the residual between the constraint and the current pose estimate and Ωᵢ is the information matrix. Gauss-Newton (or Levenberg-Marquardt) iteratively linearizes and solves this system; g2o and GTSAM implement these solvers efficiently on sparse systems.",
      hints: [
        "Loop closure turns an open-chain trajectory into a cycle, introducing a constraint that requires globally redistributing the accumulated error.",
        "The optimization objective is a sum of squared Mahalanobis distances over all edges — a classic nonlinear least-squares form.",
      ],
    },
  ],

  "point-cloud-processing": [
    {
      id: "q-rob-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What data structure does PointNet use to process 3D point clouds, avoiding the need for voxelization?",
      options: [
        "Raw unordered point sets processed with shared MLPs and global max pooling",
        "Octrees with recursive convolutional kernels",
        "KD-trees with neighborhood graph convolutions",
        "Voxel grids with 3D sparse convolutions",
      ],
      correctAnswer: 0,
      explanation:
        "PointNet operates directly on raw, unordered point sets by applying shared multi-layer perceptrons (MLPs) per point and aggregating with a symmetric global max-pooling function, making it permutation-invariant.",
      hints: [
        "The key insight is using an operation that is invariant to input ordering.",
        "Think about what pooling function produces the same result regardless of point order.",
      ],
    },
    {
      id: "q-rob-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Voxel-based 3D object detection methods such as VoxelNet partition the point cloud into a regular 3D grid and apply 3D convolutions within each voxel.",
      correctAnswer: "true",
      explanation:
        "VoxelNet divides the point cloud into equally-spaced 3D voxels, encodes points within each voxel using a Voxel Feature Encoding layer, and then applies 3D convolutional layers on the resulting dense feature volume.",
      hints: [
        "Consider how images are organized in 2D grids — the analogy extends to 3D for point clouds.",
        "Think about what structured representation allows standard convolution to apply.",
      ],
    },
    {
      id: "q-rob-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In point cloud registration (e.g., ICP), what is the main problem that causes convergence to local minima?",
      options: [
        "The correspondence-finding step and the transformation-optimization step are alternated without global guarantees, making the solution sensitive to initialization.",
        "Point clouds are too sparse to compute surface normals accurately.",
        "The rotation matrix search space is non-convex only in 2D, not 3D.",
        "ICP requires ground-truth correspondences which are unavailable in practice.",
      ],
      correctAnswer: 0,
      explanation:
        "ICP alternates between finding nearest-neighbor correspondences and optimizing the rigid transform; because correspondences change at each step, the algorithm is not globally convergent and can get trapped in local minima when the initial alignment is poor.",
      hints: [
        "Think about what happens when the assumed correspondences are wrong at early iterations.",
        "Consider why a good initial estimate is always recommended before running ICP.",
      ],
    },
  ],

  "visual-odometry": [
    {
      id: "q-rob-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Visual odometry (VO) estimates robot motion by:",
      options: [
        "Tracking feature correspondences between consecutive camera frames and solving for the relative pose",
        "Fusing GPS and IMU signals with a Kalman filter",
        "Building a dense voxel map and comparing consecutive occupancy grids",
        "Using wheel encoder ticks to integrate displacement over time",
      ],
      correctAnswer: 0,
      explanation:
        "Visual odometry extracts and matches features (or computes photometric residuals) across successive image frames and then solves the relative camera pose (rotation and translation) from those correspondences.",
      hints: [
        "VO relies on images rather than physical wheel encoders or GPS.",
        "Think about how two views of the same scene constrain relative camera motion.",
      ],
    },
    {
      id: "q-rob-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Monocular visual odometry can recover the absolute metric scale of translation without any additional sensor or known reference.",
      correctAnswer: "false",
      explanation:
        "A single camera observing a scene has an inherent scale ambiguity: the same image sequence is consistent with a small scene close-up or a large scene far away, so absolute metric scale cannot be recovered from monocular images alone without extra information (e.g., known object size, stereo baseline, or IMU).",
      hints: [
        "Think about whether doubling the scene size and camera distance changes the images.",
        "Consider what additional sensor or constraint is needed to fix the scale.",
      ],
    },
    {
      id: "q-rob-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Self-supervised monocular depth estimation methods like Monodepth2 are trained using which supervision signal?",
      options: [
        "Photometric reprojection error between frames using predicted depth and estimated camera ego-motion",
        "Dense LiDAR ground truth aligned with camera frames",
        "Stereo disparity maps converted to depth via the known baseline",
        "Human-annotated depth labels on a held-out validation set",
      ],
      correctAnswer: 0,
      explanation:
        "Self-supervised methods train a depth network and a pose network jointly: the depth network predicts per-pixel depth, the pose network estimates camera ego-motion, and the loss is the photometric error of pixels reprojected from one frame into another — requiring no ground-truth depth labels.",
      hints: [
        'The key word is "self-supervised" — the supervision comes from the video frames themselves.',
        "Think about what you can check if you know depth and camera motion between two frames.",
      ],
    },
  ],

  "sensor-fusion": [
    {
      id: "q-rob-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In sim-to-real transfer for robot locomotion policies trained with RL, domain randomization randomizes which set of parameters during simulation training?",
      options: [
        "Only the visual texture of the environment floor",
        "Physical parameters such as link masses, joint damping, friction coefficients, actuator delays, and observation noise",
        "Only the reward function coefficients used during training",
        "The network architecture and learning rate during each episode",
      ],
      correctAnswer: 1,
      explanation:
        "Domain randomization for sim-to-real transfer randomizes physical simulation parameters (masses, inertias, joint damping, friction, motor torque limits, contact parameters, sensor noise, latency) across episodes. The policy must learn to perform well across all randomized conditions, forcing it to develop a strategy robust enough to transfer to the real robot\'s unknown-but-fixed dynamics.",
      hints: [
        "The key insight is that the real robot is just one instance in the distribution of randomized simulations — if the policy works for all, it works for the real one.",
        "OpenAI\'s Dactyl used domain randomization over 100+ physics parameters to successfully transfer a dexterous manipulation policy to a real Shadow Hand.",
      ],
    },
    {
      id: "q-rob-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Camera-LiDAR fusion requires extrinsic calibration to transform point cloud data into the camera coordinate frame before projecting onto the image plane.",
      correctAnswer: "true",
      explanation:
        "Extrinsic calibration determines the rigid body transformation (rotation R and translation t) between the LiDAR and camera frames; without it, LiDAR points cannot be accurately projected onto the image, making pixel-level fusion impossible. Intrinsic calibration (camera matrix K, distortion coefficients) is additionally required to map 3D camera-frame points to 2D pixel coordinates via perspective projection: p = K[R|t]P.",
      hints: [
        "The transformation from LiDAR frame to image pixels requires two steps: extrinsic (LiDAR→camera 3D) then intrinsic (camera 3D→pixel).",
        "Target-based calibration (checkerboard visible to both sensors) is the standard approach for determining the extrinsic transform.",
      ],
    },
    {
      id: "q-rob-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "BEVFusion achieves camera-LiDAR fusion by:",
      options: [
        "Transforming both camera features and LiDAR features into a shared Bird\'s-Eye-View (BEV) representation and concatenating them for downstream detection heads",
        "Projecting LiDAR points onto the image and using image pixels as LiDAR feature descriptors",
        "Training separate detection heads for each modality and ensembling predictions at inference time",
        "Using cross-attention between image patch tokens and LiDAR voxel tokens in a joint transformer",
      ],
      correctAnswer: 0,
      explanation:
        "BEVFusion lifts camera features into BEV space using a depth prediction network (via LSS or similar view transformer) and transforms LiDAR features into BEV via voxelization and sparse convolutions. Both modality BEV feature maps are then concatenated and fed to shared task heads, enabling tight spatial fusion without requiring precise depth at every pixel.",
      hints: [
        "BEV (Bird\'s-Eye View) is a natural common space: the ground plane is shared by both sensors.",
        "Camera→BEV requires predicting per-pixel depth (underdetermined from monocular camera); LiDAR→BEV is straightforward via voxelization.",
      ],
    },
  ],

  "robot-scene-understanding": [
    {
      id: "q-rob-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the goal of semantic scene understanding for robots?",
      options: [
        "Assigning category labels (e.g., chair, table, floor) to regions of the environment to enable higher-level reasoning",
        "Computing exact 3D bounding boxes for all moving objects only",
        "Generating a topological map of room connectivity",
        "Estimating the robot\'s global GPS coordinates in indoor environments",
      ],
      correctAnswer: 0,
      explanation:
        "Semantic scene understanding goes beyond geometry by labeling regions or objects with semantic categories, allowing a robot to reason about affordances, navigation targets, and task-relevant objects.",
      hints: [
        "Think about what information a robot needs beyond just obstacle locations.",
        "Knowing what something is (not just where it is) enables task planning.",
      ],
    },
    {
      id: "q-rob-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Panoptic segmentation unifies semantic segmentation (stuff classes) and instance segmentation (thing classes) into a single output.",
      correctAnswer: "true",
      explanation:
        "Panoptic segmentation assigns every pixel a semantic label and, for countable objects (things), a unique instance ID, while uncountable regions (stuff like floor or sky) receive only a category label — combining both tasks in one framework.",
      hints: [
        "Think about what is different between labeling a floor region and labeling individual chairs.",
        'Consider what "stuff" vs "things" means in the context of visual perception.',
      ],
    },
    {
      id: "q-rob-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Semantic SLAM systems such as Kimera extend geometric SLAM by additionally:",
      options: [
        "Fusing per-frame 2D semantic segmentation into a 3D semantic mesh or volumetric map",
        "Using object detection bounding boxes as landmarks in the pose graph",
        "Replacing geometric loop closure with semantic place recognition only",
        "Training an end-to-end network to jointly predict pose and segmentation without any map",
      ],
      correctAnswer: 0,
      explanation:
        "Kimera and similar semantic SLAM systems run a standard geometric SLAM backend while projecting dense 2D semantic segmentations (from a CNN) into 3D and fusing them into a volumetric or mesh map, yielding a metric-semantic world model.",
      hints: [
        "Think about how per-frame 2D segmentation labels can be lifted into 3D given known camera poses.",
        "The geometric map provides the structure; semantics are layered on top via projection.",
      ],
    },
  ],

  "grasp-planning": [
    {
      id: "q-rob-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "An antipodal grasp is defined as one where:",
      options: [
        "The contact forces from two opposing fingertips are collinear and directed through the object, satisfying force closure with friction",
        "The gripper approaches from directly above the object\'s center of mass",
        "Three or more fingers contact the object to form a stable polygon",
        "The gripper\'s fingers are parallel to the object\'s longest axis",
      ],
      correctAnswer: 0,
      explanation:
        "An antipodal grasp places two contact points on opposite sides such that the normal forces (with friction) oppose each other along a common line of action, guaranteeing force closure and stability under external perturbations.",
      hints: [
        "Think about two contacts where each pushes toward the other — what geometric property does that imply?",
        "The friction cone must allow the contact normals to align with the grasp axis.",
      ],
    },
    {
      id: "q-rob-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GraspNet-1Billion and similar large-scale grasp datasets provide grasp annotations in 6-DoF pose (position + orientation) rather than only top-down 2D pixel grasp rectangles.",
      correctAnswer: "true",
      explanation:
        "Modern grasp datasets like GraspNet-1Billion annotate 6-DoF grasps (3D position and 3D orientation) sampled on object point clouds, enabling methods that plan grasps from any approach direction rather than only overhead planar grasps.",
      hints: [
        "Think about what degrees of freedom are needed for a robot arm to grasp objects on a cluttered table from any angle.",
        "A 2D rectangle in the image plane only captures top-down approaching grasps.",
      ],
    },
    {
      id: "q-rob-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'In grasp quality metrics, the "epsilon" quality (ε) measures:',
      options: [
        "The radius of the largest ball that fits inside the grasp wrench space, indicating robustness to external wrenches",
        "The minimum distance between gripper fingers and the object surface",
        "The ratio of normal force to friction force at each contact point",
        "The volume of the convex hull of contact points on the object",
      ],
      correctAnswer: 0,
      explanation:
        "The epsilon metric is the radius of the largest wrench-space ball centered at the origin that fits inside the convex hull of grasp wrenches; a larger epsilon means the grasp can resist larger external forces/torques in all directions.",
      hints: [
        "Wrench space captures both forces and torques a grasp can resist.",
        'Think about how a "worst-case" external disturbance would be measured against the grasp capability.',
      ],
    },
  ],

  "dexterous-manipulation": [
    {
      id: "q-rob-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes dexterous in-hand manipulation from simple pick-and-place manipulation?",
      options: [
        "Dexterous manipulation involves regrasping, rotating, or repositioning objects within the hand using finger gaits, without releasing the object",
        "Dexterous manipulation uses two robot arms instead of one",
        "Dexterous manipulation only operates on rigid objects, never deformable ones",
        "Dexterous manipulation always requires tactile sensors, whereas pick-and-place does not",
      ],
      correctAnswer: 0,
      explanation:
        "Dexterous in-hand manipulation exploits multi-fingered hands to reposition or reorient an object within the grasp through coordinated finger movements (rolling, sliding, pivoting) without placing the object down.",
      hints: [
        "Think about how a human rolls a pen between their fingers versus picking it up and setting it down.",
        "The key is continuous contact management within a single grasp.",
      ],
    },
    {
      id: "q-rob-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "OpenAI\'s Dactyl system demonstrated dexterous cube manipulation by training entirely in simulation with domain randomization and then transferring the policy to a physical Shadow Hand.",
      correctAnswer: "true",
      explanation:
        "Dactyl trained a deep RL policy in the OpenAI Gym / MuJoCo simulator with extensive domain randomization (physics parameters, visual appearance) and successfully transferred it zero-shot to a real Shadow Hand robot, solving the Rubik\'s cube face rotation task.",
      hints: [
        "Think about how simulation-to-real transfer can work without any real-world training data.",
        "Domain randomization is the key technique that bridges the sim-to-real gap here.",
      ],
    },
    {
      id: "q-rob-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main challenge of applying model-free RL to dexterous manipulation compared to locomotion tasks?",
      options: [
        "Extremely high-dimensional contact dynamics with many fingers make reward shaping and exploration very difficult, and the system is far more sensitive to small state errors",
        "Dexterous hands have fewer degrees of freedom than legged robots, making the problem underconstrained",
        "Simulation of finger contacts is accurate enough that sim-to-real is trivial for dexterous tasks",
        "Dexterous manipulation reward functions are always dense and easy to specify",
      ],
      correctAnswer: 0,
      explanation:
        "Dexterous manipulation involves many interacting contacts (fingertip, pad, side) with high sensitivity to contact geometry and friction; this creates sparse rewards, difficult exploration, and large sim-to-real gaps compared to the relatively simple foot-ground contacts in locomotion.",
      hints: [
        "Think about how many contact points and degrees of freedom are involved with five fingers vs a walking foot.",
        "Consider what makes reward design and exploration harder when contact is critical.",
      ],
    },
  ],

  "deformable-objects": [
    {
      id: "q-rob-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is manipulating deformable objects (e.g., cloth, rope) significantly harder than manipulating rigid objects?",
      options: [
        "Deformable objects have infinite-dimensional configuration spaces and complex, state-dependent dynamics that are hard to model",
        "Deformable objects are always heavier than rigid objects of the same size",
        "Standard grippers cannot grasp deformable objects at all",
        "Deformable objects move faster than rigid objects during manipulation",
      ],
      correctAnswer: 0,
      explanation:
        "Unlike rigid objects that are fully described by 6-DoF pose, deformable objects have high-dimensional (effectively infinite) shape states and exhibit complex dynamics (elasticity, plasticity, friction) that vary with the object\'s current configuration.",
      hints: [
        "Think about how many numbers you need to describe the position of every point on a cloth sheet.",
        "Consider how pulling one part of a rope affects all other parts in a history-dependent way.",
      ],
    },
    {
      id: "q-rob-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Representing deformable object state as a learned low-dimensional latent embedding can make manipulation planning tractable by reducing the effective state space dimensionality.",
      correctAnswer: "true",
      explanation:
        "Learning a compact latent representation (e.g., via a variational autoencoder or graph neural network) of the high-dimensional deformable object configuration enables planning and control algorithms that would be infeasible in the full configuration space.",
      hints: [
        "Think about how dimensionality reduction is used in other domains to make problems tractable.",
        "A neural encoder can compress visual or point-cloud observations of cloth into a small vector.",
      ],
    },
    {
      id: "q-rob-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In cloth manipulation research, which representation is commonly used to model cloth dynamics for simulation and planning?",
      options: [
        "Mass-spring systems or finite element method (FEM) meshes that simulate inter-particle forces",
        "Signed distance fields that track the cloth surface implicitly",
        "Occupancy grids that discretize the 3D volume containing the cloth",
        "Markov chains over discrete cloth states sampled from demonstrations",
      ],
      correctAnswer: 0,
      explanation:
        "Cloth is commonly simulated with mass-spring networks (fast, approximate) or FEM (physically accurate) that model stretch, shear, and bending forces between mesh vertices, enabling physics-based prediction of cloth dynamics under robot actions.",
      hints: [
        "Think about what physical forces govern how cloth deforms when pulled at one corner.",
        "These representations are the same ones used in computer graphics for cloth animation.",
      ],
    },
  ],

  "contact-rich": [
    {
      id: "q-rob-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What information does a tactile sensor provide that a vision-based system cannot easily measure?",
      options: [
        "Local contact force distribution, shear, and slip at the point of contact between the finger and object",
        "The global 3D shape of the object being grasped",
        "The color and texture of the object surface from a distance",
        "The object\'s mass and center of gravity through visual inspection",
      ],
      correctAnswer: 0,
      explanation:
        "Tactile sensors (e.g., GelSight, DIGIT) measure forces, pressures, and deformations at the contact interface — information that is occluded from cameras and critical for detecting slip, estimating grip stability, and performing fine manipulation.",
      hints: [
        "Think about what a human fingertip senses that eyes alone cannot provide during grasping.",
        "The key is information at the contact surface, not about the global object geometry.",
      ],
    },
    {
      id: "q-rob-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Impedance control allows a robot to regulate the relationship between end-effector force and position, making it suitable for contact-rich tasks where pure position control would cause large, damaging forces.",
      correctAnswer: "true",
      explanation:
        "Impedance control sets a desired mechanical impedance (spring-damper relationship) between the robot\'s end-effector and the environment; when contact occurs, forces are regulated naturally rather than fighting against a stiff position controller.",
      hints: [
        "Think about what happens if a perfectly stiff position-controlled robot touches a rigid wall.",
        "Impedance control is analogous to a compliant spring connecting the robot to its target position.",
      ],
    },
    {
      id: "q-rob-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In peg-in-hole tasks, which control strategy explicitly uses contact force/torque feedback to guide the peg into the hole when visual alignment is insufficient?",
      options: [
        "Force-torque (F/T) sensor-based spiral search or admittance control that adjusts position based on measured contact wrenches",
        "Open-loop feedforward trajectory replay without any sensor feedback",
        "Pure visual servoing that tracks the hole location in the image plane",
        "Cartesian space PD control with gravity compensation only",
      ],
      correctAnswer: 0,
      explanation:
        "Admittance or F/T-guided search strategies use wrist force-torque measurements to detect contact and guide insertion: when the peg contacts the hole edge, the measured forces drive a corrective motion (e.g., spiral search) until the peg finds and enters the hole.",
      hints: [
        "Think about how a human uses fingertip feel to insert a USB plug in the dark.",
        "Force feedback provides guidance when visual uncertainty makes precise positioning impossible.",
      ],
    },
  ],

  "task-and-motion-planning": [
    {
      id: "q-rob-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key challenge that Task and Motion Planning (TAMP) addresses compared to pure task planning?",
      options: [
        "TAMP jointly considers symbolic task-level decisions (e.g., pick object A) and continuous motion-level feasibility (e.g., whether a collision-free path exists), ensuring plans are geometrically executable",
        "TAMP replaces motion planning entirely with symbolic search over discrete action sequences",
        "TAMP focuses only on trajectory optimization without any symbolic reasoning",
        "TAMP eliminates the need for a world model by using model-free RL for all decisions",
      ],
      correctAnswer: 0,
      explanation:
        "Pure task planners ignore geometry; TAMP couples symbolic planning with motion planning so that each high-level action is checked for geometric feasibility (reachability, collision-free paths), preventing plans that are logically valid but physically impossible.",
      hints: [
        'Imagine a plan that says "pick object A" but A is occluded and unreachable — task planning alone would not catch this.',
        "TAMP bridges the gap between abstract symbolic decisions and continuous physical execution.",
      ],
    },
    {
      id: "q-rob-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PDDLStream is a TAMP framework that extends PDDL with streams — functions that lazily sample continuous values (e.g., grasp poses, IK solutions) conditioned on symbolic bindings.",
      correctAnswer: "true",
      explanation:
        "PDDLStream augments PDDL with certified streams that produce continuous parameter values (poses, trajectories) on demand; the planner interleaves symbolic search with stream evaluation, avoiding exhaustive pre-enumeration of continuous parameter spaces.",
      hints: [
        "Think about how symbolic planning needs concrete geometric values (positions, poses) to verify feasibility.",
        "Streams are generators: they produce samples lazily only when needed by the planner.",
      ],
    },
    {
      id: "q-rob-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'In TAMP, what is the "skeleton" approach and why is it used?',
      options: [
        "A skeleton is a sequence of symbolic operators (with free continuous parameters) that is first committed to at the task level, then refined by motion planners that fill in the continuous parameters — separating task search from motion optimization",
        "A skeleton is a simplified geometric mesh used to approximate robot collision geometry during planning",
        "A skeleton is a graph of all possible motion trajectories precomputed offline for fast online lookup",
        "A skeleton is an abstract task hierarchy used only in hierarchical RL, not in classical TAMP",
      ],
      correctAnswer: 0,
      explanation:
        "The skeleton approach commits to a task-level symbolic plan structure first and then calls motion planners to instantiate continuous parameters (grasps, placements, trajectories) for each action in the skeleton, enabling separation of combinatorial symbolic search from continuous optimization.",
      hints: [
        'Think of the skeleton as the "what to do" part and the motion planner as the "how to do it" part.',
        "Fixing the task sequence first reduces the continuous search space that motion planning must solve.",
      ],
    },
  ],

  "behavior-cloning": [
    {
      id: "q-rob-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Behavior cloning trains a robot policy by:",
      options: [
        "Supervised learning on (state, action) pairs collected from expert demonstrations",
        "Rewarding the robot with +1 whenever it matches an expert trajectory exactly",
        "Combining Q-learning with a demonstration replay buffer",
        "Having the robot explore randomly and filtering successful episodes as training data",
      ],
      correctAnswer: 0,
      explanation:
        "Behavior cloning treats imitation learning as supervised regression or classification: the policy is trained to predict the expert\'s action given the current state, using standard supervised learning on a demonstration dataset. No reward signal or environment interaction is needed during training.",
      hints: [
        "Think about the simplest way to copy expert behavior — just replicate their (state, action) pairs.",
        "No reward signal or environment interaction is needed during training.",
      ],
    },
    {
      id: "q-rob-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DAgger (Dataset Aggregation) addresses the compounding error problem of behavior cloning by iteratively collecting new demonstrations at states the learned policy actually visits.",
      correctAnswer: "true",
      explanation:
        "DAgger\'s algorithm: (1) Train initial policy π₁ on expert dataset D. (2) Roll out πᵢ to collect states visited by the current policy. (3) Query the expert oracle for correct actions at those visited states. (4) Aggregate new labeled data into D. (5) Retrain policy on the full aggregated dataset D. Repeat steps 2–5. By training on states the policy actually visits, DAgger closes the distribution shift gap that causes compounding errors in standard behavior cloning.",
      hints: [
        "Behavior cloning suffers from distribution shift: the policy visits states not in the expert demo and has no guidance there.",
        "DAgger iteratively labels the states the current policy visits with expert actions — the dataset grows to cover the policy\'s actual distribution.",
      ],
    },
    {
      id: "q-rob-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DAgger requires querying the expert oracle at every training iteration. In practice, what is the main challenge of applying DAgger to physical robot learning?",
      options: [
        "Compounding errors cannot occur in physical robots because proprioception corrects drift automatically",
        "Physical expert querying requires a human operator to provide correct actions at every state the robot visits, which is time-consuming and burdensome — making fully interactive DAgger impractical for long-horizon tasks",
        "DAgger cannot be applied to continuous action spaces such as robot joint torques",
        "The aggregated dataset always overfits to early demonstrations, preventing the policy from improving",
      ],
      correctAnswer: 1,
      explanation:
        "DAgger\'s theoretical guarantee relies on being able to query the expert at any visited state. For physical robots, this means a human must be present and responsive during every rollout to label states in real time — a significant operational burden. Variants like HG-DAgger (human-gated) and SafeDAgger address this by only requesting interventions when the policy is uncertain or unsafe.",
      hints: [
        "The expert oracle in the original DAgger paper is assumed to be always available — this is trivial in simulation but costly with physical robots and human experts.",
        "HG-DAgger lets the human intervene only when they judge it necessary, reducing annotation burden while still providing corrective labels.",
      ],
    },
  ],

  "inverse-rl": [
    {
      id: "q-rob-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does Inverse Reinforcement Learning (IRL) aim to recover from expert demonstrations?",
      options: [
        "The reward function that best explains the expert\'s observed behavior",
        "The optimal policy directly, without learning any reward",
        "The transition dynamics of the environment from state-action sequences",
        "The value function of the expert\'s policy by Monte Carlo estimation",
      ],
      correctAnswer: 0,
      explanation:
        "IRL takes expert trajectories as input and infers the underlying reward function that makes the expert\'s behavior optimal, enabling the robot to generalize to new situations governed by the same learned reward.",
      hints: [
        "Think about what a human designer would need to specify to train a robot — the reward function.",
        "IRL reverses the RL process: given behavior, find what objective would produce it.",
      ],
    },
    {
      id: "q-rob-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Maximum Entropy IRL (MaxEnt IRL) resolves the ambiguity in reward function recovery by choosing the reward that makes all expert trajectories equally likely under a maximum entropy distribution over trajectories.",
      correctAnswer: "true",
      explanation:
        "MaxEnt IRL applies the maximum entropy principle: among all reward functions consistent with observed expert feature expectations, it selects the one that produces a maximum entropy distribution over trajectories, avoiding overfitting to a single deterministic explanation.",
      hints: [
        "Think about the maximum entropy principle: when uncertain, prefer the least-biased distribution.",
        'Feature matching constraints are satisfied, but the reward is otherwise as "uninformative" as possible.',
      ],
    },
    {
      id: "q-rob-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GAIL (Generative Adversarial Imitation Learning) sidesteps explicit reward recovery by:",
      options: [
        "Training a discriminator to distinguish expert from policy trajectories and using the discriminator\'s output as a reward signal to update the policy via RL",
        "Fitting a Gaussian process to expert trajectories and sampling new trajectories from it",
        "Directly minimizing the KL divergence between policy and expert action distributions without any RL update",
        "Using the expert demonstrations as a replay buffer in a standard off-policy RL algorithm",
      ],
      correctAnswer: 0,
      explanation:
        "GAIL adapts the GAN framework: a discriminator learns to tell expert and policy trajectories apart, and its output (occupancy measure matching loss) serves as a reward that drives the policy (generator) to produce trajectories indistinguishable from the expert.",
      hints: [
        "Think about how GANs work — generator and discriminator competing — and apply that to imitation.",
        "The discriminator score is the reward that pushes the policy to match expert state-action occupancy.",
      ],
    },
  ],

  "diffusion-policy": [
    {
      id: "q-rob-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Diffusion Policy generates robot actions by:",
      options: [
        "Iteratively denoising a Gaussian noise sample conditioned on the current observation to produce an action sequence",
        "Sampling actions from a Gaussian policy and selecting the one with the highest Q-value",
        "Directly predicting the next action in a single forward pass of an MLP conditioned on visual observations",
        "Solving an optimization problem online to find the action that minimizes predicted cost",
      ],
      correctAnswer: 0,
      explanation:
        "Diffusion Policy applies denoising diffusion probabilistic models to action generation: starting from Gaussian noise, a learned denoiser conditioned on robot observations iteratively refines the noisy action over T denoising steps to produce a coherent action sequence.",
      hints: [
        "Think about how image diffusion models generate images from noise — the same process applies to actions.",
        "The conditioning on observation is what makes the generated action appropriate for the current state.",
      ],
    },
    {
      id: "q-rob-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A key advantage of Diffusion Policy over standard behavior cloning with an MSE loss is its ability to represent multimodal action distributions without explicitly modeling the mixture components.",
      correctAnswer: "true",
      explanation:
        "MSE-based behavior cloning averages over multiple valid actions, producing blurry, averaged predictions. Diffusion Policy models the full action distribution implicitly via the denoising process and can capture multiple modes (e.g., go left or go right) without requiring explicit mixture modeling.",
      hints: [
        "Think about what happens when you average two distinct expert demonstrations that disagree on direction.",
        "Diffusion models learn the full distribution, not just its mean.",
      ],
    },
    {
      id: "q-rob-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Diffusion Policy can be implemented with either a DDPM (Denoising Diffusion Probabilistic Model) or DDIM (Denoising Diffusion Implicit Model) scheduler. What is the main practical difference for robot deployment?",
      options: [
        "DDIM allows deterministic sampling with far fewer denoising steps (e.g., 10 vs 100), greatly reducing inference latency for real-time robot control",
        "DDPM produces higher-quality actions than DDIM at the cost of more GPU memory",
        "DDIM requires a separate value function to score action candidates, whereas DDPM does not",
        "DDPM supports continuous action spaces while DDIM is limited to discrete action tokens",
      ],
      correctAnswer: 0,
      explanation:
        "DDIM reformulates the reverse process as a deterministic ODE, enabling high-quality samples in 10–50 steps instead of the 1000 steps typical for DDPM, which is critical for robot policies that must act at 10–50 Hz.",
      hints: [
        "Real-time robot control has strict latency requirements — how many denoising steps can you afford?",
        "DDIM trades stochasticity for speed by using a deterministic reverse process.",
      ],
    },
  ],

  "act-policy": [
    {
      id: "q-rob-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'What does "action chunking" mean in the context of the ACT policy?',
      options: [
        "Predicting a sequence of future actions at once and executing them open-loop before re-querying the policy, reducing the effective decision frequency",
        "Breaking the robot\'s task into discrete sub-tasks and assigning a separate policy to each",
        "Quantizing continuous joint angles into discrete action bins for easier prediction",
        "Chunking long demonstrations into fixed-length windows before training",
      ],
      correctAnswer: 0,
      explanation:
        "Action chunking predicts a chunk of K future actions at once; the robot executes these open-loop, then re-queries the policy. This reduces the temporal precision required at inference time and helps handle compounding errors in reactive closed-loop control.",
      hints: [
        "Think about what happens when the assumed correspondences are wrong at early iterations.",
        "Consider why a good initial estimate is always recommended before running ICP.",
      ],
    },
    {
      id: "q-rob-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ACT uses a Conditional Variational Autoencoder (CVAE) during training to capture the style or variation in demonstrations, and at inference time the CVAE encoder is replaced by a fixed zero latent vector.",
      correctAnswer: "true",
      explanation:
        "The CVAE style encoder captures demonstration variability during training, providing the decoder with a latent code; at inference (without access to future actions), the encoder is replaced by a zero vector, and the decoder generates actions conditioned only on the current observation.",
      hints: [
        "Think about what is different between labeling a floor region and labeling individual chairs.",
        'Consider what "stuff" vs "things" means in the context of visual perception.',
      ],
    },
    {
      id: "q-rob-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the original ACT paper (Chi et al., 2023), what encoder architecture processes the visual observations from multiple cameras before being passed to the transformer decoder?",
      options: [
        "A ResNet-based CNN backbone whose feature maps are flattened into token sequences and input to the transformer",
        "A Vision Transformer (ViT) with patch embeddings operating on concatenated multi-camera images",
        "A 3D convolutional network that fuses temporal context across multiple frames before tokenization",
        "A frozen CLIP image encoder with a learned linear projection head",
      ],
      correctAnswer: 0,
      explanation:
        "ACT uses a ResNet backbone (shared across cameras) to extract spatial feature maps; these are flattened and position-encoded to create visual token sequences that, along with proprioception tokens, are fed to the CVAE decoder transformer.",
      hints: [
        "The original ACT implementation follows common robotics vision practice for camera feature extraction.",
        "Think about the standard CNN-to-transformer pipeline used in many robot learning works of that era.",
      ],
    },
  ],

  teleoperation: [
    {
      id: "q-rob-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of teleoperation in robot learning systems like those used with ACT or Diffusion Policy?",
      options: [
        "To collect high-quality demonstration data by having a human operator control the robot in the real environment",
        "To allow real-time remote control of deployed robots during production tasks",
        "To replace reinforcement learning entirely with human supervision at each timestep",
        "To debug robot software by manually stepping through code on the robot controller",
      ],
      correctAnswer: 0,
      explanation:
        "In learning from demonstration pipelines, teleoperation is the primary data collection method: a human operator controls the robot (via joystick, VR controllers, or motion capture) to generate demonstration trajectories that are then used to train imitation learning policies.",
      hints: [
        "Think about how systems like ACT and Diffusion Policy get their training data.",
        "The human-in-the-loop provides task demonstrations in the actual deployment environment.",
      ],
    },
    {
      id: "q-rob-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ALOHA (A Low-cost Open-source Hardware System for Bimanual Teleoperation) uses leader-follower arm pairs where the human moves the leader arms and the follower arms on the robot replicate the motion.",
      correctAnswer: "true",
      explanation:
        "ALOHA uses two pairs of low-cost robot arms: the operator physically moves the lightweight leader arms, and joint-angle commands are mirrored to the follower arms that perform the actual manipulation task, enabling intuitive bilateral teleoperation for bimanual tasks.",
      hints: [
        "Think about how the human operator\'s arm movements are translated into robot commands.",
        "Leader-follower systems provide direct kinematic correspondence without complex motion mapping.",
      ],
    },
    {
      id: "q-rob-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main bottleneck that limits the scalability of learning from teleoperation data compared to internet-scale data for language models?",
      options: [
        "Robot demonstrations are expensive and slow to collect (human operator time, real hardware), resulting in datasets orders of magnitude smaller than text or image datasets",
        "Robot demonstration data is always too noisy to train neural networks effectively",
        "Teleoperation hardware is not yet commercially available, limiting who can collect data",
        "Robot demonstrations cannot be shared across different robot morphologies, limiting data reuse",
      ],
      correctAnswer: 0,
      explanation:
        "Unlike text or images that can be scraped from the internet at scale, robot demonstrations require a human operator, physical hardware, and real-world task setup; this bottleneck limits current robot learning datasets to thousands of episodes versus billions of tokens for LLMs.",
      hints: [
        "Think about why language models could be trained on internet-scale data but robot policies cannot.",
        "The fundamental constraint is the cost and speed of human-robot interaction in the physical world.",
      ],
    },
  ],

  "motion-planning": [
    {
      id: "q-rob-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "RRT (Rapidly-exploring Random Tree) builds a motion plan by:",
      options: [
        "Randomly sampling configurations in the configuration space and extending the tree toward each sample, growing toward unexplored regions",
        "Exhaustively searching all configurations on a regular grid using BFS",
        "Solving a polynomial trajectory optimization between start and goal with obstacle constraints",
        "Decomposing free space into convex cells and computing shortest paths through the decomposition",
      ],
      correctAnswer: 0,
      explanation:
        "RRT grows a tree rooted at the start configuration by repeatedly sampling random configurations and extending the nearest tree node toward the sample; this randomized strategy efficiently explores high-dimensional configuration spaces without pre-computing the full space.",
      hints: [
        'Think about what "rapidly-exploring" means — the tree should spread out to cover unexplored space quickly.',
        "Random sampling is what makes RRT practical in high-dimensional spaces where grids are intractable.",
      ],
    },
    {
      id: "q-rob-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PRM (Probabilistic Roadmap Method) has two phases: a learning phase that builds a roadmap of collision-free configurations, and a query phase that connects start/goal to the roadmap and finds a path.",
      correctAnswer: "true",
      explanation:
        "PRM first samples many random configurations, checks them for collision-free status, and connects nearby valid configurations with local planners to build a roadmap graph; subsequent queries then simply connect start and goal to the graph and run a graph search (e.g., Dijkstra\'s).",
      hints: [
        "Think about the advantage of pre-computing a roadmap when many queries share the same environment.",
        "The roadmap is built once and reused for multiple start-goal pairs.",
      ],
    },
    {
      id: "q-rob-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "RRT* differs from standard RRT in that it:",
      options: [
        "Rewires the tree by checking whether newly sampled nodes provide shorter paths to existing nodes, ensuring asymptotic optimality as the number of samples grows",
        "Uses bidirectional search from both start and goal simultaneously to speed up planning",
        "Restricts sampling to a dynamic sampling region that shrinks as the tree matures",
        "Applies a learned heuristic to bias sampling toward the goal, replacing uniform random sampling",
      ],
      correctAnswer: 0,
      explanation:
        "RRT* adds a rewiring step: when a new node is added, the algorithm checks if it offers a lower-cost path to nearby nodes and updates parent pointers accordingly; this guarantees that the solution cost converges to the optimum as the sample count increases.",
      hints: [
        "Standard RRT finds a feasible path but not necessarily the shortest one.",
        "The key addition in RRT* is the ability to improve existing tree connections after each new sample.",
      ],
    },
  ],

  "neural-motion-planning": [
    {
      id: "q-rob-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MPNets (Motion Planning Networks) speed up sampling-based planning by:",
      options: [
        "Using a neural network trained on demonstration paths to predict next waypoints toward the goal, biasing sampling into promising regions of the configuration space",
        "Replacing the collision checker with a neural network that is 100x faster than geometric methods",
        "Learning a value function over configuration space and using gradient ascent to plan paths",
        "Training a GAN to generate entire collision-free trajectories in a single forward pass",
      ],
      correctAnswer: 0,
      explanation:
        "MPNets train a neural planner on expert paths to predict task-relevant waypoints given the current configuration and goal; this learned bias drastically reduces the number of random samples needed by traditional planners like RRT, enabling much faster planning in cluttered environments.",
      hints: [
        "Think about what expert demonstrations encode about which regions of space are useful.",
        "A learned model can replace purely random sampling with informed, goal-directed proposals.",
      ],
    },
    {
      id: "q-rob-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Neural motion planners trained in simulation can generalize to novel unseen environments at test time because they learn to encode environment context (e.g., obstacle point clouds) as part of their input.",
      correctAnswer: "true",
      explanation:
        "Neural planners like MPNets encode the current environment (as a point cloud or occupancy map) alongside start and goal configurations; this conditioning allows generalization to new obstacle configurations not seen during training, unlike planners tied to a fixed environment.",
      hints: [
        "Think about what information the neural planner needs to produce valid, collision-free paths.",
        "Encoding the environment as input is what allows generalization beyond training scenes.",
      ],
    },
    {
      id: "q-rob-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main limitation of purely end-to-end neural motion planners that predict full trajectories without any traditional planning components?",
      options: [
        "They cannot provide completeness or safety guarantees, may predict paths with collisions, and often fail to generalize to configurations far outside the training distribution",
        "They are slower than RRT at inference time due to large neural network computation",
        "They require full 3D scene reconstruction as input, which is not available in real-time robotics",
        "They can only plan in 2D configuration spaces and cannot scale to 7-DoF robot arms",
      ],
      correctAnswer: 0,
      explanation:
        "Purely neural planners are not provably complete or safe: they can hallucinate collision-free paths that actually pass through obstacles, and performance degrades on out-of-distribution environments; hybrid approaches that use neural networks to warm-start or bias traditional planners are therefore preferred for safety-critical applications.",
      hints: [
        "Think about the formal guarantees (completeness, safety) that traditional planners like RRT* provide.",
        "Neural networks generalize from training data — what happens when the test environment is very different?",
      ],
    },
  ],

  "social-navigation": [
    {
      id: "q-rob-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes social navigation from standard robot navigation?",
      options: [
        "Social navigation requires the robot to plan paths that respect human proxemics, predict pedestrian motion, and behave in socially acceptable ways (e.g., not cutting through groups)",
        "Social navigation uses social media data to select robot destinations",
        "Social navigation only applies to humanoid robots, not wheeled robots",
        "Social navigation focuses on navigating indoor environments versus outdoor ones",
      ],
      correctAnswer: 0,
      explanation:
        "Social navigation extends collision avoidance to account for human behavior norms: robots must predict where people will move, maintain appropriate personal space (proxemics), avoid disruptive paths through groups, and signal intent — all beyond standard geometric obstacle avoidance.",
      hints: [
        "Think about how humans navigate crowded spaces — they do more than just avoid physical collisions.",
        "Social acceptability involves respecting personal space, social groups, and expected movement patterns.",
      ],
    },
    {
      id: "q-rob-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Social Force Model (SFM) represents pedestrian interaction as attractive forces toward goals and repulsive forces from obstacles and other pedestrians.",
      correctAnswer: "true",
      explanation:
        "The Social Force Model by Helbing & Molnar models pedestrian dynamics using social forces: a motivational force toward the destination, repulsive forces that keep pedestrians away from walls and each other, and optional attractive forces for groups — together reproducing emergent crowd behavior.",
      hints: [
        "Think about the analogy to physical forces — attraction toward a goal, repulsion from obstacles.",
        'The "social" aspect comes from the repulsion between pedestrians modeling personal space.',
      ],
    },
    {
      id: "q-rob-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SARL (Crowd-Aware Robot Navigation with Attention-Based Deep Reinforcement Learning) improves over CADRL by:",
      options: [
        "Using a graph attention network to model interactions between all humans jointly and compute interaction-aware state representations before the RL policy",
        "Adding a long-horizon planner on top of CADRL to reduce myopic behavior",
        "Replacing simulated crowd training with real-world crowd data collected from overhead cameras",
        "Decomposing navigation into separate obstacle avoidance and social compliance modules trained independently",
      ],
      correctAnswer: 0,
      explanation:
        "SARL introduces a crowd-robot and human-human interaction module based on attention that computes weighted influence of each human on the robot\'s decision, allowing the policy to reason about the entire crowd context rather than considering each human independently as in CADRL.",
      hints: [
        "CADRL handles each human independently; think about what is lost by ignoring human-human interactions.",
        "Attention mechanisms are well-suited to aggregating variable-size sets — like a crowd of any size.",
      ],
    },
  ],

  "visual-navigation": [
    {
      id: "q-rob-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Vision-Language Navigation (VLN), what inputs does the agent receive to determine its actions?",
      options: [
        "A natural language instruction describing the navigation path and egocentric visual observations from the robot\'s camera",
        "A complete pre-built 3D map and GPS coordinates of the destination",
        "A sequence of waypoint images showing the target location from multiple viewpoints",
        "Tactile and proprioceptive signals without any visual or language input",
      ],
      correctAnswer: 0,
      explanation:
        'VLN agents must follow natural language instructions (e.g., "go past the couch and turn left at the kitchen") using only egocentric visual observations, requiring grounding of language to visual scenes and navigation decisions.',
      hints: [
        "Think about how a human would navigate using verbal directions — what senses would they use?",
        "The challenge is connecting words in the instruction to what the robot actually sees.",
      ],
    },
    {
      id: "q-rob-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "EmbodiedBERT and similar pre-trained transformers for embodied navigation are trained on room-to-room navigation datasets and fine-tuned for downstream tasks such as object goal navigation.",
      correctAnswer: "true",
      explanation:
        "Large pre-trained transformer models for embodied navigation learn representations from large-scale navigation datasets (e.g., R2R) and can be fine-tuned on downstream embodied tasks, following the pre-train/fine-tune paradigm from NLP.",
      hints: [
        "Think about how BERT is pre-trained on text and fine-tuned on downstream NLP tasks.",
        "Embodied navigation models follow the same paradigm, but for instruction-following agents.",
      ],
    },
    {
      id: "q-rob-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The main challenge of generalizing VLN agents from seen to unseen environments is:",
      options: [
        "Agents overfit to the visual appearances and path structures in training environments and fail to ground language to novel scene layouts and object arrangements",
        "Language instructions are too ambiguous for any model to follow reliably",
        "Navigation graphs in unseen environments have fewer nodes, making paths trivially shorter",
        "Pre-trained visual encoders do not process first-person views, only third-person images",
      ],
      correctAnswer: 0,
      explanation:
        "VLN models tend to memorize shortcuts in training environments (specific visual landmarks, common path patterns); in unseen environments, they encounter novel layouts and appearances, exposing overfitting and poor language-to-scene grounding generalization.",
      hints: [
        "Think about the standard train/test split concern — how would a model that memorizes training rooms perform in a new building?",
        "Generalization requires robust language grounding, not just route memorization.",
      ],
    },
  ],

  "outdoor-navigation": [
    {
      id: "q-rob-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes off-road autonomous navigation significantly harder than on-road driving?",
      options: [
        "Unstructured terrain with no lane markings, unpredictable surface conditions (mud, grass, rocks), and the need for terrain traversability estimation rather than rule-based lane following",
        "Off-road vehicles have fewer sensors than on-road vehicles",
        "Off-road environments have higher traffic density requiring faster reaction times",
        "GPS is unavailable in outdoor environments, eliminating all position information",
      ],
      correctAnswer: 0,
      explanation:
        "Off-road navigation lacks the structured assumptions of roads (lanes, signs, paved surfaces); the robot must estimate terrain traversability from raw sensor data, handle dynamic obstacles (animals, branches), and adapt to unpredictable surface conditions like mud or steep slopes.",
      hints: [
        "Think about what rules-of-the-road a self-driving car can rely on that an off-road robot cannot.",
        "Traversability is the key additional challenge: not all areas are safe to drive through.",
      ],
    },
    {
      id: "q-rob-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Terrain traversability estimation for off-road robots can be performed by analyzing geometric properties of LiDAR point clouds (e.g., local surface normals, slope, roughness) without any learned semantic labels.",
      correctAnswer: "true",
      explanation:
        "Geometry-based traversability analysis computes local surface properties — normal vectors, slope angles, step heights, and roughness metrics — directly from LiDAR point clouds to classify terrain as drivable or not, without requiring semantic scene understanding.",
      hints: [
        "Think about what makes a slope dangerous to drive on — it\'s primarily about geometry (steepness, roughness).",
        "LiDAR provides precise 3D geometry; semantic labels are an additional layer but not strictly required.",
      ],
    },
    {
      id: "q-rob-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BADGR (Berkeley Autonomous Driving Ground Robot) learns traversability and navigation cost in the real world by:",
      options: [
        "Self-supervised learning from the robot\'s own experience: predicting future events (e.g., collision, bumpiness) from egocentric images and using these predictions as navigation cost",
        "Training on a large simulated off-road dataset with diverse terrain types and transferring with domain randomization",
        "Annotating LiDAR scans with human traversability labels and training a semantic segmentation network",
        "Using GPS track logs from previous robots navigating the same trails as supervision",
      ],
      correctAnswer: 0,
      explanation:
        "BADGR uses self-supervised learning from the robot\'s own experience: it collects real-world data by driving around, labels future events (bumps, collisions, getting stuck) automatically from onboard sensors, and learns to predict these events from images — enabling navigation planning without human annotation.",
      hints: [
        'The key word is "self-supervised" — the robot provides its own training signal from what happens to it.',
        "Think about what the robot can measure automatically during driving (IMU vibration, wheel slip) as labels.",
      ],
    },
  ],

  "domain-randomization": [
    {
      id: "q-rob-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the purpose of domain randomization in sim-to-real transfer?",
      options: [
        "To vary simulation parameters (physics, appearance, lighting) during training so the policy learns to be robust to a wide range of conditions, including the real world",
        "To generate multiple reward functions and train separate policies for each",
        "To randomly initialize the neural network weights to avoid local minima",
        "To augment the real-world training data by randomly cropping and flipping images",
      ],
      correctAnswer: 0,
      explanation:
        "Domain randomization deliberately randomizes simulation parameters (friction, mass, texture, lighting) during training; the real world then becomes just another sample from this broad distribution, allowing policies trained in simulation to transfer to hardware without real-world data.",
      hints: [
        "Think about why a policy trained on one specific simulation setting fails on the real robot.",
        "If the policy sees many variations during training, the real world is less likely to be out-of-distribution.",
      ],
    },
    {
      id: "q-rob-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Visual domain randomization (randomizing textures, colors, and lighting) is most effective when the downstream policy uses visual observations, as it prevents the policy from overfitting to simulation-specific visual features.",
      correctAnswer: "true",
      explanation:
        "When policies receive raw image observations, they can overfit to simulation-specific colors, textures, and lighting; visual domain randomization trains the perception module to be invariant to these low-level visual variations, improving real-world generalization.",
      hints: [
        "Think about how a policy might use the specific green color of a simulation grass texture as a navigation cue.",
        "Randomizing visual properties forces the network to learn semantically meaningful features instead.",
      ],
    },
    {
      id: "q-rob-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Adaptive Domain Randomization (ADR) as used in OpenAI\'s Dactyl expands the randomization range adaptively. What criterion does it use to decide whether to expand or contract the randomization distribution?",
      options: [
        "The performance of the policy on a fixed evaluation environment: if performance exceeds a threshold, randomization is widened; if it drops below a lower threshold, it is narrowed",
        "The gradient magnitude of the policy loss with respect to randomization parameters",
        "The KL divergence between the simulation and real-world state distributions measured with domain adaptation",
        "A human operator manually expanding the randomization range after each training run",
      ],
      correctAnswer: 0,
      explanation:
        "ADR monitors policy performance on a fixed reference environment; when performance stays above a high threshold, randomization bounds are expanded (harder); when performance drops below a low threshold, bounds are contracted (easier) — automatically curriculum-learning the randomization difficulty.",
      hints: [
        "Think about how you would gradually increase task difficulty based on whether the agent is succeeding.",
        "The fixed evaluation environment provides a stable signal to measure whether the agent is keeping up.",
      ],
    },
  ],

  "physics-simulators": [
    {
      id: "q-rob-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which physics simulator was developed by DeepMind and is widely used for continuous control and robot manipulation research due to its accurate contact modeling?",
      options: [
        "MuJoCo (Multi-Joint dynamics with Contact)",
        "Isaac Gym",
        "PyBullet",
        "Gazebo",
      ],
      correctAnswer: 0,
      explanation:
        "MuJoCo (Multi-Joint dynamics with Contact) was developed by Emo Todorov at the University of Washington (later acquired by DeepMind/Google) and is the standard simulator for continuous control RL research, known for its fast, accurate contact and constraint dynamics.",
      hints: [
        "This simulator\'s name literally encodes its two main design focuses: joints and contact.",
        "Think about which simulator is used by nearly all OpenAI and DeepMind robot learning papers.",
      ],
    },
    {
      id: "q-rob-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Isaac Gym (NVIDIA) achieves massive simulation throughput by running thousands of physics environments in parallel entirely on the GPU, eliminating CPU-GPU data transfer bottlenecks.",
      correctAnswer: "true",
      explanation:
        "Isaac Gym moves the full simulation loop (physics stepping, observation generation, reward computation) onto the GPU using NVIDIA PhysX; with thousands of parallel environments on a single GPU, it achieves training throughputs orders of magnitude higher than CPU-based simulators like MuJoCo.",
      hints: [
        "Think about the bottleneck in standard RL: CPU-GPU data transfer for each environment step.",
        "Keeping everything on the GPU allows near-zero latency between simulation and neural network updates.",
      ],
    },
    {
      id: "q-rob-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main limitation of current physics simulators that makes sim-to-real transfer still an open research problem?",
      options: [
        'The "reality gap": simulators cannot perfectly model real-world contact mechanics, friction, deformation, and sensor noise, so policies trained in simulation encounter dynamics mismatches on real hardware',
        "Simulators cannot represent rigid body dynamics accurately for any object shape",
        "Simulators run too slowly to generate enough training data even with GPU acceleration",
        "Sim-to-real transfer is a solved problem — modern simulators are physically accurate enough for all robot tasks",
      ],
      correctAnswer: 0,
      explanation:
        'Even state-of-the-art simulators simplify or approximate contact dynamics, material properties, and sensor characteristics; these inaccuracies cause the "reality gap" where policies that perform well in simulation fail on real robots, motivating research into domain randomization, system identification, and adaptive control.',
      hints: [
        "Think about how difficult it is to simulate the exact friction coefficient of a rubber gripper on a plastic bottle.",
        "The gap between simulation and reality is the core challenge that domain randomization and system ID try to bridge.",
      ],
    },
  ],

  "real-to-sim": [
    {
      id: "q-rob-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'What is the "real-to-sim" problem in robot learning?',
      options: [
        "Reconstructing a photorealistic and physically accurate simulation of a real environment from sensor data, to use as a training environment for robot policies",
        "Transferring robot policies trained in simulation to real hardware",
        "Collecting real-world data to fine-tune simulation-trained policies",
        "Calibrating simulation physics parameters to match real robot dynamics",
      ],
      correctAnswer: 0,
      explanation:
        'Real-to-sim (as opposed to sim-to-real) refers to creating a high-fidelity simulation from real-world scans or images; the resulting "digital twin" can serve as a personalized training environment matching the robot\'s actual deployment setting.',
      hints: [
        "Sim-to-real goes from simulation to the real world — real-to-sim is the reverse direction.",
        "Think about using a 3D scan of a real room to build a simulator for training a robot in that specific room.",
      ],
    },
    {
      id: "q-rob-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "3D Gaussian Splatting can be used for real-to-sim by reconstructing a scene from multi-view images into a set of 3D Gaussians that can be rendered photorealistically from novel viewpoints for robot training.",
      correctAnswer: "true",
      explanation:
        "3D Gaussian Splatting reconstructs scenes as collections of 3D Gaussian primitives optimized to match multi-view photographs; these representations render at real-time speeds and produce photorealistic novel views, making them attractive for building visual robot training environments from real-world scans.",
      hints: [
        "Think about what properties a rendering method needs to be useful as a robot training simulator.",
        "3D Gaussian Splatting is notable for fast rendering and high visual fidelity from real captured images.",
      ],
    },
    {
      id: "q-rob-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary technical challenge of using NeRF or Gaussian Splatting scenes as physics-enabled robot simulators (beyond just visual rendering)?",
      options: [
        "Neural radiance fields and Gaussian splats represent appearance but not physical properties (mass, friction, rigidity), so collision geometry and dynamics must be separately extracted or approximated",
        "NeRF and Gaussian Splatting cannot produce images from the robot\'s camera viewpoint",
        "These representations require hundreds of hours of compute to render each training frame",
        "They can only represent static scenes and cannot model movable objects",
      ],
      correctAnswer: 0,
      explanation:
        "NeRF and Gaussian Splatting are purely appearance models — they model color and density/opacity but contain no physical properties; to use them for robot training with physics (grasping, pushing), one must separately extract collision meshes, estimate masses and friction, and integrate with a physics engine.",
      hints: [
        "Think about what information a physics engine needs that a rendering model does not provide.",
        "Visual realism and physical simulation are separate concerns — appearance models do not encode dynamics.",
      ],
    },
  ],

  "system-identification": [
    {
      id: "q-rob-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the goal of system identification in robotics?",
      options: [
        "Estimating the physical parameters (e.g., link masses, inertias, friction coefficients) of a robot or its environment from observed input-output data",
        "Identifying which control algorithm is best for a given robot without any real hardware testing",
        "Classifying robot hardware configurations from their serial numbers",
        "Detecting sensor failures by comparing redundant sensor readings",
      ],
      correctAnswer: 0,
      explanation:
        "System identification estimates the parameters of a mathematical model of the robot (dynamics model, actuator model) from experimental data — for example, swinging a robot arm and measuring joint torques and accelerations to fit inertial parameters.",
      hints: [
        "Think about how a control engineer determines the exact dynamics of a physical system.",
        'The "system" is the robot, and "identification" means estimating its model parameters from data.',
      ],
    },
    {
      id: "q-rob-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Online adaptive control methods can adjust controller parameters in real-time as the robot\'s dynamics change (e.g., due to payload variation or wear), without requiring an offline re-identification procedure.",
      correctAnswer: "true",
      explanation:
        "Adaptive controllers (e.g., MRAC — Model Reference Adaptive Control, or online Gaussian process-based methods) continuously update model or controller parameters based on real-time prediction errors, enabling the robot to compensate for changing dynamics without stopping for offline recalibration.",
      hints: [
        "Think about a robot arm that picks up objects of different unknown weights — it must adapt its control online.",
        "Online adaptation is the key distinction from offline system identification.",
      ],
    },
    {
      id: "q-rob-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "RMA (Rapid Motor Adaptation) uses a two-phase training approach for adaptive legged locomotion. What is the structure of this two-phase approach?",
      options: [
        "Phase 1: train a base policy with privileged extrinsics (mass, friction) via RL in simulation; Phase 2: train an adaptation module to estimate extrinsics from a short window of proprioceptive history, replacing privileged access at deployment",
        "Phase 1: collect real-world data for system identification; Phase 2: fine-tune the simulation-trained policy on real data using the identified model",
        "Phase 1: train separate expert policies for each terrain type; Phase 2: train a gating network to select among experts based on terrain classification",
        "Phase 1: train the policy with full-state observations; Phase 2: distill the policy into a partial-observation policy via supervised learning",
      ],
      correctAnswer: 0,
      explanation:
        "RMA first trains a base policy in simulation with access to privileged environmental extrinsics (friction, mass, terrain); then trains a lightweight adaptation module that estimates those extrinsics purely from recent proprioceptive history — enabling robust real-world deployment without privileged sensor access.",
      hints: [
        "Think about what information is available in simulation that is not available on a real robot at test time.",
        "The adaptation module bridges the gap by learning to infer hidden dynamics from proprioception alone.",
      ],
    },
  ],

  "privileged-learning": [
    {
      id: "q-rob-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In asymmetric actor-critic training, what information asymmetry exists between the actor and the critic?",
      options: [
        "The critic receives privileged full-state observations (e.g., exact object poses, hidden physics) during training, while the actor only receives the observations available at deployment (e.g., images or partial state)",
        "The actor has access to more parameters than the critic, making it a larger network",
        "The critic receives delayed rewards while the actor receives immediate rewards",
        "The actor operates on raw sensors while the critic operates on rendered simulation images",
      ],
      correctAnswer: 0,
      explanation:
        "Asymmetric actor-critic exploits the fact that at training time (in simulation) we have access to privileged information unavailable at deployment; the critic uses this extra information to provide better value estimates that guide the actor, while the actor learns a policy conditioned only on deployment-available observations.",
      hints: [
        "Think about what extra information is available in simulation but not on a real robot.",
        "The asymmetry is between training-time information (for the critic) and deployment-time information (for the actor).",
      ],
    },
    {
      id: "q-rob-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Privileged learning in robot locomotion often provides the critic with exteroceptive information like ground contact forces and terrain height maps, which would be unavailable from a robot\'s onboard sensors at deployment.",
      correctAnswer: "true",
      explanation:
        "In simulation, privileged information such as exact foot contact forces, terrain height fields, and object masses is directly accessible; providing this to the critic during RL training produces a better teacher signal, enabling the actor — trained on only proprioceptive observations — to learn more robust policies.",
      hints: [
        "Think about how the human operator\'s arm movements are translated into robot commands.",
        "Leader-follower systems provide direct kinematic correspondence without complex motion mapping.",
      ],
    },
    {
      id: "q-rob-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main bottleneck that limits the scalability of learning from teleoperation data compared to internet-scale data for language models?",
      options: [
        "Robot demonstrations are expensive and slow to collect (human operator time, real hardware), resulting in datasets orders of magnitude smaller than text or image datasets",
        "Robot demonstration data is always too noisy to train neural networks effectively",
        "Teleoperation hardware is not yet commercially available, limiting who can collect data",
        "Robot demonstrations cannot be shared across different robot morphologies, limiting data reuse",
      ],
      correctAnswer: 0,
      explanation:
        "Unlike text or images that can be scraped from the internet at scale, robot demonstrations require a human operator, physical hardware, and real-world task setup; this bottleneck limits current robot learning datasets to thousands of episodes versus billions of tokens for LLMs.",
      hints: [
        "Think about why language models could be trained on internet-scale data but robot policies cannot.",
        "The fundamental constraint is the cost and speed of human-robot interaction in the physical world.",
      ],
    },
  ],

  "rt-2": [
    {
      id: "q-rob-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "RT-2 (Robotic Transformer 2) is a Vision-Language-Action model. What is the key innovation of RT-2 compared to earlier robot learning systems?",
      options: [
        "RT-2 co-fine-tunes a large pre-trained vision-language model (PaLI or PaLM-E) on robot action data, representing actions as text tokens, enabling the VLM\'s internet-scale knowledge to transfer to physical manipulation",
        "RT-2 trains a robot policy entirely from scratch on robot demonstration data without any pre-trained components",
        "RT-2 uses a diffusion model to generate robot trajectories conditioned on language instructions",
        "RT-2 is trained using reinforcement learning with human feedback (RLHF) on physical robot interactions",
      ],
      correctAnswer: 0,
      explanation:
        "RT-2 takes a pre-trained vision-language model and fine-tunes it on robot trajectory data, representing discretized robot actions as additional text tokens; this allows the model to generalize to novel instructions using the VLM\'s rich semantic and commonsense knowledge learned from web-scale training.",
      hints: [
        "Think about how a language model\'s internet-trained knowledge (what a banana is, where knives are dangerous) could help a robot.",
        "The key technical trick is treating robot actions as tokens in the same vocabulary as language.",
      ],
    },
    {
      id: "q-rob-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "RT-2 demonstrates emergent capabilities in robot manipulation, such as reasoning about novel object categories and multi-step semantic reasoning, that were not present in the robot training data.",
      correctAnswer: "true",
      explanation:
        'Because RT-2 leverages a pre-trained VLM\'s internet-scale knowledge, it exhibits emergent behaviors at test time — for example, identifying which object is "recyclable" or understanding "move the banana to the dinosaur" — tasks not explicitly present in the robot demonstration data.',
      hints: [
        "Emergent means capabilities not directly trained for.",
        "Scaling laws that work for language might not straightforwardly apply across very different task modalities.",
      ],
    },
    {
      id: "q-rob-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main technical challenge of training a single policy on the Open X-Embodiment dataset given that different robots have different action spaces and observation spaces?",
      options: [
        "Action and observation space heterogeneity requires either a universal action representation (e.g., end-effector delta commands in Cartesian space) or modality-specific tokenization to handle differing joint configurations, camera setups, and gripper designs",
        "Different robots have different computational constraints, requiring separate model sizes for each embodiment",
        "The dataset is too small to train a neural network at the scale needed for generalization",
        "Labeling actions with consistent semantic meanings across embodiments is straightforward and has already been solved",
      ],
      correctAnswer: 0,
      explanation:
        "Cross-embodiment training requires a common interface: RT-X and similar work use standardized action representations (e.g., Cartesian end-effector commands with open/close gripper) and observation spaces (image + language instruction) to bridge the gap between robots with different joints, sensors, and gripper designs.",
      hints: [
        "Think about what happens when a humanoid reaches far to one side without adjusting its stance.",
        "Underactuation means the robot cannot independently control all degrees of freedom.",
      ],
    },
  ],

  "open-x-embodiment": [
    {
      id: "q-rob-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main technical challenge of training a single policy on the Open X-Embodiment dataset given that different robots have different action spaces and observation spaces?",
      options: [
        "Action and observation space heterogeneity requires either a universal action representation (e.g., end-effector delta commands in Cartesian space) or modality-specific tokenization to handle differing joint configurations, camera setups, and gripper designs",
        "Different robots have different computational constraints, requiring separate model sizes for each embodiment",
        "The dataset is too small to train a neural network at the scale needed for generalization",
        "Labeling actions with consistent semantic meanings across embodiments is straightforward and has already been solved",
      ],
      correctAnswer: 0,
      explanation:
        "Cross-embodiment training requires a common interface: RT-X and similar work use standardized action representations (e.g., Cartesian end-effector commands with open/close gripper) and observation spaces (image + language instruction) to bridge the gap between robots with different joints, sensors, and gripper designs.",
      hints: [
        "Think about what happens when a humanoid reaches far to one side without adjusting its stance.",
        "Underactuation means the robot cannot independently control all degrees of freedom.",
      ],
    },
  ],

  "humanoid-robots": [
    {
      id: "q-rob-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes whole-body control for humanoid robots significantly harder than controlling a fixed-base robot arm?",
      options: [
        "Humanoids are underactuated systems that must maintain dynamic balance while simultaneously performing manipulation tasks, requiring joint optimization over locomotion and arm motion",
        "Humanoid robots have fewer degrees of freedom than robot arms, making them less capable",
        "Whole-body control only applies to outdoor navigation and is not used for manipulation",
        "Humanoid balance is simpler than arm control because gravity always acts in the same direction",
      ],
      correctAnswer: 0,
      explanation:
        "Humanoids are underactuated — they cannot directly control their center of mass position — so maintaining balance while moving arms requires careful coordination of the entire body; this couples manipulation and locomotion, vastly increasing the complexity of planning and control.",
      hints: [
        "Think about what happens when a humanoid reaches far to one side without adjusting its stance.",
        "Underactuation means the robot cannot independently control all degrees of freedom.",
      ],
    },
    {
      id: "q-rob-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Learning-based humanoid locomotion controllers trained with deep RL in simulation (e.g., on Unitree H1 or Figure robots) have demonstrated robust real-world walking and running without relying on simplified ZMP (Zero Moment Point) controllers.",
      correctAnswer: "true",
      explanation:
        "Recent RL-trained humanoid controllers (e.g., from Carnegie Mellon, ETH, and robot companies) have surpassed traditional ZMP-based control in agility and robustness by learning complex whole-body dynamics directly from simulation, enabling running, jumping, and recovery from pushes.",
      hints: [
        "ZMP controllers rely on simplified linear inverted pendulum models — deep RL can learn richer dynamics.",
        "Think about the success of deep RL for quadruped locomotion and whether similar results are possible for humanoids.",
      ],
    },
    {
      id: "q-rob-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In humanoid robot learning, what is the key challenge of transferring mobile manipulation policies (walk + manipulate simultaneously) from simulation to the real world?",
      options: [
        "Locomotion and manipulation are tightly coupled — errors in base motion propagate to the arm, and the sim-to-real gap in contact dynamics is the primary bottleneck for policy transfer",
        "Real humanoid robots cannot carry their own compute, requiring all inference to run on external servers with high latency",
        "Mobile manipulation tasks are always one-shot and cannot benefit from the iterative RL training loops used for locomotion",
        "Humanoid robots cannot mount cameras at sufficient resolution for manipulation tasks during walking",
      ],
      correctAnswer: 0,
      explanation:
        "Mobile manipulation on humanoids couples the inaccuracies of foot contact dynamics (hard to simulate) with the precision requirements of manipulation (millimeter-level accuracy); base motion disturbances propagate to the arm, and the sim-to-real gap in contact dynamics is the primary bottleneck for policy transfer.",
      hints: [
        "Think about what happens to arm position accuracy when the robot is also walking and its base is moving.",
        "The coupling between locomotion and manipulation makes the sim-to-real gap multiply across both tasks.",
      ],
    },
  ],
};

export default questions;
