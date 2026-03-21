import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  // ── TREES ─────────────────────────────────────────────────────────────
  "binary-tree-inorder": [
    {
      id: "q-bti-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Inorder traversal of a binary tree visits nodes in what order?",
      options: [
        "Root, left, right",
        "Left, root, right",
        "Left, right, root",
        "Right, root, left",
      ],
      correctAnswer: 1,
      explanation:
        "Inorder traversal follows the recursive definition:\n\n\\[\n\\text{inorder}(T) = \\text{inorder}(T.\\text{left}) \\;\\to\\; T.\\text{root} \\;\\to\\; \\text{inorder}(T.\\text{right})\n\\]\n\nFor a Binary Search Tree (BST), this ordering produces nodes in strictly ascending sorted order — a fundamental property exploited by many BST algorithms.",
      hints: [
        "Think of 'inorder' as meaning 'in sorted order' for a BST.",
        'Mnemonic: "Left then Root then Right" — L before R.',
      ],
    },
    {
      id: "q-bti-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the inorder traversal of the BST below?\n\n```\n    4\n   / \\\\\n  2   5\n / \\\\\n1   3\n```",
      options: ["[1, 2, 3, 4, 5]", "[4, 2, 5, 1, 3]", "[1, 3, 2, 5, 4]", "[5, 4, 3, 2, 1]"],
      correctAnswer: 0,
      explanation:
        "Applying the inorder rule recursively:\n\n\\[\n\\begin{align}\n\\text{inorder}(1) &= [1] \\\\\n\\text{inorder}(3) &= [3] \\\\\n\\text{inorder}(2) &= [1] + [2] + [3] = [1, 2, 3] \\\\\n\\text{inorder}(5) &= [5] \\\\\n\\text{inorder}(4) &= [1, 2, 3] + [4] + [5] = [1, 2, 3, 4, 5]\n\\end{align}\n\\]\n\nThe BST property guarantees this sorted output.",
      hints: [
        "Apply inorder to each subtree from the bottom up.",
        "For a BST, inorder is always sorted ascending.",
      ],
    },
    {
      id: "q-bti-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which traversal order is defined as: visit Root first, then recursively traverse Left, then Right?",
      options: ["Inorder", "Preorder", "Postorder", "Level order"],
      correctAnswer: 1,
      explanation:
        "Preorder is defined by the recurrence:\n\n\\[\n\\text{preorder}(T) = T.\\text{root} \\to \\text{preorder}(T.\\text{left}) \\to \\text{preorder}(T.\\text{right})\n\\]\n\nThe root is visited 'before' its subtrees. This order is critical for tree serialization and cloning (e.g., LeetCode 105, 226).",
      hints: [
        '"Pre" = before. Root comes before subtrees.',
        "Preorder is useful when you need the root before its children.",
      ],
    },
    {
      id: "q-bti-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Iterative inorder traversal using an explicit stack follows what pattern?",
      options: ["Queue", "Explicit stack", "Priority queue", "Deque"],
      correctAnswer: 1,
      explanation:
        "The algorithm simulates the call stack explicitly:\n\n\\[\n\\begin{align}\n\\text{while }(stack \\neq \\emptyset \\text{ OR } curr \\neq null)&: \\\\\n\\quad &\\text{if } curr \\neq null: push(curr), curr = curr.\\text{left} \\quad &(\\text{go left})\\\\\n\\quad &\\text{else: } curr = pop(), \\text{visit}(curr), curr = curr.\\text{right} \\quad &(\\text{go right})\n\\end{align}\n\\]\n\nEach node is pushed once and popped once: O(n) time, O(h) space.",
      hints: [
        "Inorder is a depth-first traversal. DFS uses a stack.",
        "Keep pushing left until null, then pop, visit, and go right.",
      ],
    },
    {
      id: "q-bti-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Inorder traversal of a BST can be used to verify whether the tree satisfies the BST property.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "A valid BST produces a strictly increasing inorder sequence. During traversal, track the previously visited node value (prev). At each step:\n\n\\[\n\\text{if } current.\\text{val} \\leq prev: \\text{invalid BST}\n\\]\n\nCounterexample: root=10, right.left=3. Each node passes the local check (left<root<right) but inorder gives [..., 3, 10, ...] where 3 < 10 — a violation.",
      hints: [
        "BST inorder is strictly ascending. Track prev and check current > prev.",
        "The moment you see a decrease, the tree is invalid.",
      ],
    },
    {
      id: "q-bti-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of iterative inorder traversal?",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(h) where h is height"],
      correctAnswer: 1,
      explanation:
        "Each of the n nodes is visited exactly once:\n\n\\[\n\\#\\text{pushes} = \\#\\text{pops} = n \\implies O(n) \\text{ time}\n\\]\n\nThe stack holds at most h nodes (the leftmost root-to-leaf path):\n\n\\[\n\\text{space} = O(h) = O(\\log n) \\text{ (balanced)} \\dots O(n) \\text{ (skewed)}\n\\]",
      hints: [
        "Every node enters and leaves the stack exactly once.",
        "The stack depth equals the tree height.",
      ],
    },
    {
      id: "q-bti-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Morris inorder traversal achieves what time and space complexities?",
      options: [
        "O(n log n) time, O(1) space",
        "O(n) time, O(1) space",
        "O(n) time, O(n) space",
        "O(n^2) time, O(1) space",
      ],
      correctAnswer: 1,
      explanation:
        "Morris traversal exploits threaded binary tree theory:\n\n\\[\n\\text{for each node } x:\\quad \\text{find inorder predecessor } p \\text{ (rightmost in left subtree)}\n\\]\n\n- If p has no right child: set p.right = x (thread), move to x.left\n- If p.right already points to x: remove thread (p.right = null), visit x, move to x.right\n\nEach edge traversed at most twice; no stack or recursion: O(n) time, O(1) space.",
      hints: [
        "Morris threading temporarily modifies right pointers to avoid the stack.",
        "Each node's predecessor is found by going right once, then left to the end.",
      ],
    },
    {
      id: "q-bti-8",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Morris inorder traversal, when does the algorithm output (visit) a node's value?",
      options: [
        "When the node has no left child, or when returning via the threaded right pointer",
        "When both children are null",
        "Only when the node is a leaf",
        "When the right pointer is null",
      ],
      correctAnswer: 0,
      explanation:
        "Two visit conditions:\n\n\\[\n\\begin{cases}\n\\text{Case 1 (no left subtree):} & \\text{visit now, go right} \\\\\n\\text{Case 2 (arrived via thread):} & \\text{visit now, remove thread, go right}\n\\end{cases}\n\\]\n\nThe thread from the inorder predecessor points back to the current node. Detecting Case 2: checking if p.right == x.",
      hints: [
        "Find the inorder predecessor (rightmost node in left subtree).",
        "If its right pointer is null, thread it to current. If it's already threaded, you've returned.",
      ],
    },
    {
      id: "q-bti-9",
      type: "true-false",
      difficulty: "hard",
      question:
        "Given both inorder and preorder traversal arrays of a binary tree with distinct node values, the original tree can be uniquely reconstructed.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Preorder's first element is always the root. Finding this root's index in inorder splits the tree:\n\n\\[\n\\underbrace{\\text{inorder}[0..i-1]}_{\\text{left subtree}} \\; \\underbrace{\\text{root } r}_{\\text{root}} \\; \\underbrace{\\text{inorder}[i+1..]}_{\\text{right subtree}}\n\\]\n\nRecurse on each subarray. The partition sizes match the preorder segments (LeetCode 105).\n\n\\[\n\\text{preorder}[0] = r, \\quad \\text{preorder}[1..i] = \\text{left preorder}, \\quad \\text{preorder}[i+1..] = \\text{right preorder}\n\\]",
      hints: [
        "Preorder gives you the root (first element).",
        "Inorder tells you exactly which elements belong to the left vs. right subtree.",
      ],
    },
  ],

  "binary-tree-level-order": [
    {
      id: "q-blo-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Level order traversal (BFS on a tree) uses which data structure?",
      options: ["Stack", "Queue", "Heap", "Recursion only"],
      correctAnswer: 1,
      explanation:
        "A queue ensures FIFO order so nodes are processed level by level, left to right:\n\n\\[\n\\text{enqueue}(root);\; \\text{while } queue \\neq \\emptyset:\; \\{\\; n = \\text{dequeue}();\; \\text{visit}(n);\; \\text{enqueue}(n.\\text{left});\; \\text{enqueue}(n.\\text{right}) \\}\n\\]\n\nThis is the standard BFS pattern adapted for trees.",
      hints: [
        "BFS uses a queue. DFS uses a stack.",
        "FIFO order naturally processes level by level.",
      ],
    },
    {
      id: "q-blo-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Level order traversal produces nodes in the same order as the LeetCode tree array representation.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "LeetCode array format: index 0 is the root, children of index i are at 2i+1 (left) and 2i+2 (right). This encodes the tree level by level, left to right — exactly BFS order:\n\n\\[\n[1, 2, 3, 4, 5] \\implies\n\\begin{array}{c}\n1\\\\\n2 \\quad 3\\\\\n4 \\quad 5\n\\end{array}\n\\]",
      hints: [
        "The LeetCode array IS a level-order encoding of the tree.",
      ],
    },
    {
      id: "q-blo-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "For the tree below, level order grouped by level yields:\n\n```\n    1\n   / \\\\\n  2   3\n / \\\\\n4   5\n```",
      options: [
        "[[1],[2,3],[4,5]]",
        "[[1],[3,2],[5,4]]",
        "[[4,5],[2,3],[1]]",
        "[[1,2,3,4,5]]",
      ],
      correctAnswer: 0,
      explanation:
        "Level 0: [1] (root)\nLevel 1: [2, 3] (root's children)\nLevel 2: [4, 5] (children of node 2)\n\n\\[\n\\text{result} = [[1], [2, 3], [4, 5]]\n\\]",
      hints: [
        "Process level by level: root first, then root's children, then their children.",
      ],
    },
    {
      id: "q-blo-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "To obtain level-order traversal grouped by level, which approaches work?",
      options: [
        "Use two queues alternating per level",
        "Track queue size before processing each level",
        "Add a null sentinel after each level in the queue",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "All three methods are valid:\n\n\\[\n\\textbf{Method B (preferred): } \\text{At each level's start, } size = queue.length. \\text{ Process exactly } size \\text{ nodes before moving to the next level.}\n\\]\n\nMethod A: Two queues, drain one into the other per level. Method C: Enqueue a null marker after each level to detect boundaries.",
      hints: [
        "At the start of each level, the queue contains exactly all nodes at that level.",
        "Queue size at level start = number of nodes at that level.",
      ],
    },
    {
      id: "q-blo-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Zigzag level order alternates direction each level. What is the simplest correct implementation?",
      options: [
        "Use two stacks alternating per level",
        "Use deque, add to front vs back based on level parity",
        "Collect normally, then reverse odd-numbered levels",
        "B and C both work; A does not",
      ],
      correctAnswer: 2,
      explanation:
        "The simplest approach collects standard left-to-right BFS, then reverses odd-indexed levels:\n\n\\[\n\\text{for } level = 0..:\\quad \\{\\text{if } level \\% 2 == 1: \\text{reverse}(result[level])\\}\n\\]\n\nThis costs O(n) extra time but avoids complex deque logic or stack management.",
      hints: [
        "Even levels: left→right. Odd levels: right→left.",
        "Collect all left→right, then flip the odd levels.",
      ],
    },
    {
      id: "q-blo-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time and space complexity of grouped level-order traversal:",
      options: [
        "O(n) time, O(1) space",
        "O(n) time, O(n) space",
        "O(n log n) time, O(n) space",
        "O(n^2) time, O(n) space",
      ],
      correctAnswer: 1,
      explanation:
        "\\[\n\\#\\text{enqueues} = \\#\\text{dequeues} = n \\implies O(n) \\text{ time}\n\\]\n\nThe queue holds at most one full level. A complete binary tree's widest level has n/2 nodes:\n\n\\[\n\\text{max queue size} = O(n) \\text{ (for a complete tree's bottom level)}\n\\]",
      hints: [
        "Each node is enqueued and dequeued exactly once.",
        "The widest level of a complete binary tree contains n/2 nodes.",
      ],
    },
    {
      id: "q-blo-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Right side view of a binary tree using level-order traversal: which node from each level is selected?",
      options: [
        "First node",
        "Last node",
        "Rightmost leaf only",
        "Middle node",
      ],
      correctAnswer: 1,
      explanation:
        "In left-to-right BFS, the last node processed at depth d is the rightmost node visible from the right side:\n\n\\[\n\\text{For each level: take } result[level][\\text{last}]\n\\]\n\nThis is equivalent to recording the last node seen at each depth during BFS.",
      hints: [
        "In left-to-right BFS, what is the last node you process at each depth?",
        "That last node is the rightmost visible node.",
      ],
    },
    {
      id: "q-blo-8",
      type: "true-false",
      difficulty: "hard",
      question:
        "Level-order traversal grouped by level can be implemented recursively without an explicit queue.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "A depth-parameterized DFS achieves the same grouping:\n\n\\[\n\\text{dfs}(node, depth):\; \\text{if } node:\\; \\text{append}(node.\\text{val}, result[depth]);\; \\text{dfs}(node.\\text{left}, depth+1);\; \\text{dfs}(node.\\text{right}, depth+1)\n\\]\n\nPre-order DFS visits left before right, but grouping by depth gives the same level array as BFS (different internal order within levels is acceptable).",
      hints: [
        "Pass depth as a parameter. Append node.val to result[depth].",
        "Pre-order DFS naturally groups by depth.",
      ],
    },
    {
      id: "q-blo-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Maximum width of a binary tree (LeetCode 662) counts null nodes between leftmost and rightmost nodes. What is the key insight?",
      options: [
        "Width = number of non-null nodes in the widest level",
        "Assign heap-style indices (left=2i, right=2i+1); width = rightmost_index - leftmost_index + 1",
        "Use two queues with sentinel values",
        "DFS and track column positions with a hash map",
      ],
      correctAnswer: 1,
      explanation:
        "Map each node to a heap-style position index:\n\n\\[\n\\text{root} = 1, \\quad \\text{left}(i) = 2i, \\quad \\text{right}(i) = 2i+1\n\\]\n\nThe width of a level is:\n\n\\[\nwidth = \\text{rightmost\\_index} - \\text{leftmost\\_index} + 1\n\\]\n\nThis correctly accounts for null gaps. Normalize by subtracting the minimum index per level to prevent overflow.",
      hints: [
        "Treat the tree as a heap array. Each null is a 'gap' in the index sequence.",
        "Width = last_index - first_index + 1 includes all nulls between them.",
      ],
    },
  ],

  "validate-bst": [
    {
      id: "q-vbst-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following correctly defines a valid Binary Search Tree?",
      options: [
        "Left child < node and right child > node for each node",
        "All left descendants < node value AND all right descendants > node value",
        "Inorder traversal produces sorted array",
        "All of the above (all equivalent definitions)",
      ],
      correctAnswer: 3,
      explanation:
        "All three conditions define BST validity and are mathematically equivalent:\n\n\\[\n\\text{BST property: } \\forall x \\in \\text{left subtree}: x < node.\\text{val} < \\forall y \\in \\text{right subtree}: y\n\\]\n\nThe local check (immediate children) is insufficient on its own — the constraint must hold for ALL descendants. Inorder being sorted ascending is a consequence of this property, not an alternative definition.",
      hints: [
        'The naive "left child < root < right child" is insufficient — it must hold for ALL descendants.',
        "All three statements are equivalent formulations of the same BST property.",
      ],
    },
    {
      id: "q-vbst-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why does the naive check (left.val < node.val < right.val for each node locally) fail for some trees?",
      options: [
        "It does not handle equal values",
        "A node in the right subtree could have a value smaller than the root even if it is locally valid",
        "The check is too slow",
        "It does not work for trees with height > 3",
      ],
      correctAnswer: 1,
      explanation:
        "Consider the counterexample tree:\n\n\\[\n\\begin{array}{c}\n\\phantom{1}10\\\\\n/ \\\\ \\\\\n5 \\quad 15\\\\\n\\phantom{1} \\backslash\\\\\n\\phantom{11}3\n\\end{array}\n\\]\n\nEach node passes the local check: 5<10 (left), 15>10 (right), and 3<15 (right.left). But 3 < 10 — violating the BST property since 3 is in the RIGHT subtree of 10.\n\nThe correct approach propagates min/max bounds down the tree.",
      hints: [
        "A node 3 in the right subtree of root 10 would pass local check but violate the global BST invariant.",
        "The constraint is not just about immediate children — it applies to all descendants.",
      ],
    },
    {
      id: "q-vbst-3",
      type: "true-false",
      difficulty: "easy",
      question: "For BST validation, null nodes are considered valid BSTs.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Base case: null is a valid BST (vacuously satisfies all properties):\n\n\\[\n\\forall x \\in \\emptyset: x < node.\\text{val} \\quad \\text{(true)}\n\\]\n\nEvery recursive BST algorithm returns true for null nodes. This is the terminating condition that stops the recursion.",
      hints: [
        "An empty tree is a valid BST.",
        "Null satisfies all constraints vacuously.",
      ],
    },
    {
      id: "q-vbst-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The bounds approach to BST validation passes (min, max) at each node. What is the initial call?",
      options: [
        "isValid(root, -Infinity, Infinity)",
        "isValid(root, 0, root.val)",
        "isValid(root, root.val, root.val)",
        "isValid(root, null, null)",
      ],
      correctAnswer: 0,
      explanation:
        "The root has no constraints — any value is valid. Recurse with tightening bounds:\n\n\\[\n\\text{isValid}(node, min, max):\\quad \\text{check } min < node.\\text{val} < max\n\\]\n\n\\[\n\\text{Left child: } (min, node.\\text{val}), \\quad \\text{Right child: } (node.\\text{val}, max)\n\\]\n\nUsing -Infinity and +Infinity as initial bounds avoids special-casing the root.",
      hints: [
        "The root can be any value. Children get tighter constraints based on the parent.",
        "-Infinity and +Infinity are sentinels representing 'no bound'.",
      ],
    },
    {
      id: "q-vbst-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When validating a BST using inorder traversal, what is tracked?",
      options: [
        "The minimum value seen so far",
        "The previous node value — current must be strictly greater",
        "The tree height",
        "The sum of all node values",
      ],
      correctAnswer: 1,
      explanation:
        "During inorder traversal, the sequence must be strictly increasing. Track the previously visited node value (prev):\n\n\\[\n\\text{if } current.\\text{val} \\leq prev \\implies \\text{invalid BST}\n\\]\n\nThis works because inorder of a BST yields a sorted sequence. A strictly increasing check catches any violation.",
      hints: [
        "Inorder of BST is sorted ascending. Verify each step is strictly greater than the previous.",
        "Track prev. The moment current <= prev, the tree is invalid.",
      ],
    },
    {
      id: "q-vbst-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Time and space complexity of BST validation using bounds recursion:",
      options: [
        "O(n) time, O(1) space",
        "O(n) time, O(h) space where h is height",
        "O(n log n) time, O(n) space",
        "O(n^2) time, O(1) space",
      ],
      correctAnswer: 1,
      explanation:
        "Every node is visited exactly once: O(n) time.\n\n\\[\n\\text{Space} = \\text{recursion stack depth} = O(h)\n\\]\n\n- Balanced tree: h = O(log n)\n- Skewed tree: h = O(n)\n\nThis is the standard analysis for depth-first recursive tree algorithms.",
      hints: [
        "You visit each node once. The recursion depth equals tree height.",
        "O(h) where h = O(log n) for balanced, O(n) for skewed.",
      ],
    },
    {
      id: "q-vbst-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BST validation must handle equal values. Typically, BST requires:",
      options: [
        "Duplicates placed in the right subtree (left < node <= right)",
        "No duplicates allowed (strictly less on left, strictly greater on right)",
        "Duplicates can go either left or right",
        "It depends on the problem statement",
      ],
      correctAnswer: 3,
      explanation:
        "Standard definitions vary:\n\n\\[\n\\text{LeetCode 98: } left < node < right \\quad \\text{(strict — no duplicates)}\n\\]\n\n\\[\n\\text{Option A definition: } left \\leq node \\leq right\n\\]\n\nAlways read the problem constraints. LeetCode 98 uses strict inequalities, which is the most common convention in coding interviews.",
      hints: [
        "LeetCode 98 uses strict inequalities. Real-world BST implementations vary.",
        "When in doubt, assume strict unless stated otherwise.",
      ],
    },
    {
      id: "q-vbst-8",
      type: "true-false",
      difficulty: "hard",
      question:
        "Iterative BST validation using an explicit stack (simulating inorder traversal) uses O(h) space in the worst case.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "The iterative inorder stack holds at most h nodes (the leftmost path from current node):\n\n\\[\n\\text{Stack holds nodes on the path: } root \\to node.\\text{left} \\to node.\\text{left}.\\text{left} \\to \\dots\n\\]\n\n- Balanced BST: O(log n)\n- Skewed tree: O(n)\n\nThis is O(h) in all cases, and O(h) = O(n) for skewed trees.",
      hints: [
        "The stack at any point holds the path from root to current node (going left).",
        "Depth of leftmost path = tree height.",
      ],
    },
    {
      id: "q-vbst-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are given a sorted array and need to construct a height-balanced BST. The strategy is:",
      options: [
        "Insert elements left to right into an empty BST",
        "Pick the middle element as root, recursively build left from left-half and right from right-half",
        "Use a max-heap and heapify",
        "Pick the first element as root, then insert remaining",
      ],
      correctAnswer: 1,
      explanation:
        "Picking the median as root ensures the tree stays balanced:\n\n\\[\n\\text{Let } arr = [1,2,3,4,5,6,7],\\; mid = 4\n\\]\n\n\\[\n\\text{root} = 4, \\quad \\text{left} = \\text{build}([1,2,3]), \\quad \\text{right} = \\text{build}([5,6,7])\n\\]\n\nRecursing on each half gives O(n) time and O(h) = O(log n) height.\n\n\\[\n\\text{Height balance: } |h_\\text{left} - h_\\text{right}| \\leq 1\n\\]",
      hints: [
        "The root of a balanced BST from sorted array should be the median.",
        "Recursively pick medians of each subarray to maintain balance.",
      ],
    },
  ],

  "lowest-common-ancestor": [
    {
      id: "q-lca-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The Lowest Common Ancestor (LCA) of two nodes p and q is:",
      options: [
        "The deepest node that is an ancestor of both p and q",
        "The root of the tree",
        "The parent of p",
        "The node immediately above q",
      ],
      correctAnswer: 0,
      explanation:
        "Formally:\n\n\\[\n\\text{LCA}(p, q) = \\text{deepest } n \\text{ such that } p \\in \\text{descendants}(n) \\text{ AND } q \\in \\text{descendants}(n)\n\\]\n\nA node is a descendant of itself, so if p is an ancestor of q, then LCA(p, q) = p.",
      hints: [
        "All ancestors of p, all ancestors of q — the deepest intersection is LCA.",
        "The deepest common ancestor is the one closest to p and q.",
      ],
    },
    {
      id: "q-lca-2",
      type: "true-false",
      difficulty: "easy",
      question: "If p is an ancestor of q, then LCA(p, q) = p.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "By definition, a node is a descendant of itself. If p is on the path from root to q:\n\n\\[\n\\text{root} \\to \\dots \\to p \\to \\dots \\to q\n\\]\n\nThen p is a common ancestor of p and q, and there is no deeper common ancestor (since p is above q). Hence LCA(p, q) = p.",
      hints: [
        "Draw p above q — the deepest common ancestor is p itself.",
        "A node is its own descendant.",
      ],
    },
    {
      id: "q-lca-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a BST, if p.val < root.val and q.val < root.val, where is the LCA?",
      options: [
        "At root",
        "In the left subtree",
        "In the right subtree",
        "Cannot be determined",
      ],
      correctAnswer: 1,
      explanation:
        "Both values are less than root.val, so both nodes must be in the left subtree (BST property: left < root < right):\n\n\\[\n\\text{BST rule: } p < root \\text{ and } q < root \\implies p, q \\in \\text{left subtree}\n\\]\n\nTherefore, the LCA (which must also be in the left subtree) is found by recursing left.",
      hints: [
        "BST: values less than root go left. Both p and q go left means LCA is in left subtree.",
        "The BST property constrains where each node can be.",
      ],
    },
    {
      id: "q-lca-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BST LCA algorithm: when do you return the current node as LCA?",
      options: [
        "When either p or q equals current node",
        "When p is in the left subtree and q is in the right subtree (or vice versa)",
        "Only when current node equals the root",
        "When current node is greater than both p and q",
      ],
      correctAnswer: 1,
      explanation:
        "If p and q are in different subtrees, the current node is the first point where their paths diverge — making it their LCA:\n\n\\[\n\\text{If } p < root < q \\text{ (or } q < root < p\\text{): } \\text{LCA} = root\n\\]\n\nAdditionally, if root.val == p.val or root.val == q.val, then root is the LCA (a node is its own descendant).",
      hints: [
        "Walk from root: if both values go same direction, recurse that way. If they split, current is LCA.",
        "Different subtrees → current node is the LCA.",
      ],
    },
    {
      id: "q-lca-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "General binary tree LCA recursive function — when both left and right recursive calls return non-null:",
      options: [
        "Return left result",
        "Return right result",
        "Return current node as LCA",
        "Return null",
      ],
      correctAnswer: 2,
      explanation:
        "This is the key insight of the recursive formulation:\n\n\\[\n\\text{If } \\text{LCA}(p, q) \\text{ found in left AND in right } \\implies \\text{current node is LCA}\n\\]\n\n- left result ≠ null: one of p or q is in the left subtree\n- right result ≠ null: the other is in the right subtree\n- Since they split across subtrees, current = LCA",
      hints: [
        "p is in left subtree, q is in right subtree (or vice versa). Their LCA = current node.",
        "When both children return a valid result, current is the LCA.",
      ],
    },
    {
      id: "q-lca-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Time and space complexity of general binary tree LCA (recursive, no parent pointers):",
      options: [
        "O(log n) time, O(1) space",
        "O(n) time, O(h) space",
        "O(n) time, O(n) space",
        "O(n log n) time, O(log n) space",
      ],
      correctAnswer: 1,
      explanation:
        "One DFS traversal visiting each node at most once: O(n) time.\n\n\\[\n\\text{Space} = \\text{recursion stack} = O(h)\n\\]\n\n- Balanced tree: O(log n)\n- Skewed tree: O(n)\n\nThe recursion explores subtrees only until both p and q are found, but in the worst case (LCA = root) we visit all nodes.",
      hints: [
        "One DFS pass visits all n nodes; stack depth = height.",
        "Worst case: LCA = root, requiring full tree traversal.",
      ],
    },
    {
      id: "q-lca-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Time complexity of LCA with parent pointers (hash set approach):",
      options: ["O(1)", "O(log n)", "O(h) where h is height", "O(n^2)"],
      correctAnswer: 2,
      explanation:
        "Algorithm:\n1. Walk from p to root, storing all ancestors in a hash set: O(h)\n2. Walk from q to root until hitting an ancestor in the set: O(h)\n\n\\[\n\\text{Total: } O(h), \\quad \\text{Space: } O(h)\n\\]\n\nWorst case h = n (completely skewed tree). For a balanced tree h = O(log n).",
      hints: [
        "Height of skewed tree is O(n). Balanced tree: O(log n).",
        "Two walks up the tree, each O(h).",
      ],
    },
    {
      id: "q-lca-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Euler Tour + Sparse Table approach for LCA achieves:",
      options: [
        "O(n) preprocessing, O(n) query",
        "O(n log n) preprocessing, O(1) query",
        "O(n^2) preprocessing, O(log n) query",
        "O(log n) preprocessing, O(log n) query",
      ],
      correctAnswer: 1,
      explanation:
        "Euler Tour flattens the tree to 2n-1 nodes (each edge traversed twice). Sparse Table on depths answers Range Minimum Queries (RMQ) in O(1):\n\n\\[\n\\text{LCA}(u, v) = \\text{min-depth node on path from } u \\text{ to } v \\text{ in Euler Tour}\n\\]\n\nPreprocessing: O(n log n) to build Sparse Table.\nQuery: O(1) RMQ on the Euler Tour interval [first[u], first[v]].",
      hints: [
        "LCA = minimum-depth node on the Euler Tour path between two nodes.",
        "Sparse Table converts depth array into a range minimum query structure.",
      ],
    },
    {
      id: "q-lca-9",
      type: "true-false",
      difficulty: "hard",
      question:
        "The iterative two-pointer LCA algorithm (both start at p and q, advance to parent, switch to other start when reaching null) works correctly without computing heights explicitly.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Two pointers pa and pb start at p and q. Each step:\n- Advance pa to parent(pa), or\n- Advance pb to parent(pb), or\n- If at null, switch to the other starting node\n\nThey meet at the LCA after traversing equal total distance (p→root + q→root). Analogous to the linked list cycle detection / intersection trick:\n\n\\[\n\\text{Total distance} = dist(p, LCA) + dist(LCA, root) + dist(q, LCA) = dist(p, root) + dist(q, root)\n\\]\n\nBoth pointers travel the same total distance, so they meet at the LCA.",
      hints: [
        'Same trick as "intersection of two linked lists" — both pointers travel equal total distance.',
        "The sum of distances from p and q to LCA equals the sum from p and q to root.",
      ],
    },
  ],

  "insert-into-bst": [
    {
      id: "q-ibst-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When inserting a value into a BST, if the value is less than the current node, you go:",
      options: [
        "Right subtree",
        "Left subtree",
        "Replace current node",
        "Insert at root",
      ],
      correctAnswer: 1,
      explanation:
        "BST property: smaller values go left. Recurse left until finding a null position to insert.",
      hints: ["BST invariant: left < node < right."],
    },
    {
      id: "q-ibst-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Standard BST insertion always places the new node as:",
      options: [
        "The new root",
        "An internal node",
        "A leaf node",
        "The left child of root",
      ],
      correctAnswer: 2,
      explanation:
        "Standard BST insertion traverses down until a null pointer — that null position becomes the new leaf.",
      hints: [
        "You traverse until you hit null. That null becomes the new leaf.",
      ],
    },
    {
      id: "q-ibst-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Inserting n elements in sorted order (1, 2, 3, ...) into an empty BST produces a balanced tree.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Sorted insertion produces a skewed chain (degenerates to a linked list). Balanced BSTs require explicit rebalancing (AVL, Red-Black).",
      hints: [
        "What happens inserting 1, 2, 3, 4, 5 in order? Each becomes a right child.",
      ],
    },
    {
      id: "q-ibst-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time complexity of BST insertion is:",
      options: [
        "O(1)",
        "O(log n) always",
        "O(h) where h is tree height",
        "O(n) always",
      ],
      correctAnswer: 2,
      explanation:
        "Insertion follows one root-to-leaf path: O(h). Balanced tree: h = O(log n). Skewed tree: h = O(n). Average random data: O(log n).",
      hints: ["You traverse at most one path from root to leaf."],
    },
    {
      id: "q-ibst-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a recursive BST insert that returns the (possibly new) root, the base case is:",
      options: [
        "root.val == val → return root",
        "root == null → return new TreeNode(val)",
        "root.left == null → insert left",
        "root.right == null → insert right",
      ],
      correctAnswer: 1,
      explanation:
        "When we reach null, create a new TreeNode and return it. The caller links it as left or right child.",
      hints: [
        "Recursive pattern: root.left = insert(root.left, val) or root.right = insert(root.right, val).",
      ],
    },
    {
      id: "q-ibst-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Iterative BST insertion approach:",
      options: [
        "BFS until null node found, insert there",
        "Walk following BST property; when reaching a null child, set parent.left or parent.right",
        "Find the leftmost null and insert",
        "Always insert at the leftmost available position",
      ],
      correctAnswer: 1,
      explanation:
        "Track current node and parent. Go left/right per BST rules. When current is null, set parent.left or parent.right to the new node.",
      hints: [
        "Track both current and parent. When current becomes null, link to parent.",
      ],
    },
    {
      id: "q-ibst-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BST deletion of a node with two children — what is the standard approach?",
      options: [
        "Remove the node and promote the left child",
        "Remove the node and promote the right child",
        "Replace the node\'s value with its inorder successor value, then delete that successor",
        "Split the tree into two separate BSTs",
      ],
      correctAnswer: 2,
      explanation:
        "Find inorder successor (smallest in right subtree). Copy its value to current node. Recursively delete the successor (which has at most one child — it has no left child).",
      hints: [
        "Inorder successor = leftmost node in right subtree. After copying, delete it (simpler case).",
      ],
    },
    {
      id: "q-ibst-8",
      type: "true-false",
      difficulty: "hard",
      question:
        "A balanced BST (AVL or Red-Black) guarantees O(log n) worst-case insertion.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AVL and Red-Black trees maintain balance through rotations after each insertion. Height is kept O(log n), guaranteeing O(log n) for insert, delete, and search.",
      hints: [
        "Rotations are O(1). At most O(log n) rotations needed per insert.",
      ],
    },
    {
      id: "q-ibst-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which insertion sequence creates the most balanced BST from values {1,2,3,4,5,6,7}?",
      options: [
        "Sorted: 1,2,3,4,5,6,7",
        "Reverse sorted: 7,6,5,4,3,2,1",
        "Middle-out: 4,2,6,1,3,5,7",
        "Random order (expected balanced)",
      ],
      correctAnswer: 2,
      explanation:
        "Inserting the median (4) first, then medians of each half recursively, creates a perfectly balanced BST of height 3. This is the pre-order of a balanced tree.",
      hints: [
        "What value should be root of a balanced BST containing 1-7? The median: 4.",
      ],
    },
  ],

  "trie-prefix-tree": [
    {
      id: "q-trie-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A Trie (prefix tree) is primarily optimized for:",
      options: [
        "Sorting numbers efficiently",
        "Storing and searching strings by prefix",
        "Finding shortest paths in graphs",
        "Balancing binary search trees",
      ],
      correctAnswer: 1,
      explanation:
        "A Trie stores strings character by character. Common uses: autocomplete, spell-check, prefix search. Every root-to-marked-node path represents a stored word.",
      hints: ['The name "prefix tree" is a direct clue.'],
    },
    {
      id: "q-trie-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a standard Trie for lowercase English letters, each node\'s children array has how many slots?",
      options: ["10", "26", "52", "128"],
      correctAnswer: 1,
      explanation:
        "One slot per letter a-z: 26 total. children[0] = 'a', ..., children[25] = 'z'.",
      hints: ["Lowercase English: a through z = 26 characters."],
    },
    {
      id: "q-trie-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Inserting a word of length L into a Trie takes O(L) time regardless of how many words are already stored.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Each of L characters creates or traverses one node. Existing words share prefixes but do not slow insertion — we always visit exactly L nodes.",
      hints: [
        "You touch exactly one node per character: L characters = L nodes.",
      ],
    },
    {
      id: "q-trie-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does a Trie distinguish a complete word from a prefix stored in the path?",
      options: [
        "Stores word length at the root node",
        "Each node has an isEnd (isWord) boolean flag set true at word endings",
        "Complete words are stored only at leaf nodes",
        "Word boundaries tracked in a separate hash set",
      ],
      correctAnswer: 1,
      explanation:
        'isEnd=true on the last character\'s node marks a complete word. "app" and "apple" can both be stored with isEnd=true at their respective terminal nodes.',
      hints: [
        '"app" is a prefix of "apple" — the node for the second \'p\' must indicate it ends a word.',
      ],
    },
    {
      id: "q-trie-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: 'startsWith("pre") vs. search("pre") in a Trie:',
      options: [
        'startsWith returns true only if "pre" is a stored complete word',
        'startsWith returns true if any stored word begins with "pre"; search requires "pre" to be a complete stored word',
        "They are identical",
        "search is faster because it stops earlier",
      ],
      correctAnswer: 1,
      explanation:
        'startsWith("pre") = traverse p→r→e nodes, return true if all exist. search("pre") = same traversal + check isEnd=true at \'e\'.',
      hints: [
        "Distinguish prefix existence (startsWith) from complete word existence (search).",
      ],
    },
    {
      id: "q-trie-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Worst-case space complexity of a Trie storing n words of average length L with alphabet size A:",
      options: ["O(n)", "O(n * L)", "O(n * L * A)", "O(A^L)"],
      correctAnswer: 2,
      explanation:
        "Worst case (no shared prefixes): n * L nodes, each with A child pointers. O(n * L * A). In practice shared prefixes reduce this significantly.",
      hints: [
        "Each node stores A child pointers. Worst case: n words, each L nodes, no sharing.",
      ],
    },
    {
      id: "q-trie-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A compressed Trie (Patricia Trie / Radix Tree) differs from standard Trie by:",
      options: [
        "Storing only leaf nodes",
        "Merging chains of single-child nodes into one edge with a string label",
        "Using hash maps instead of arrays for children",
        "Only supporting prefix queries",
      ],
      correctAnswer: 1,
      explanation:
        "Patricia Trie compresses long single-child chains into one edge labeled with the entire substring. Reduces O(total chars) nodes to O(number of keys) nodes.",
      hints: [
        "If a node has only one child, why not merge it with the parent edge?",
      ],
    },
    {
      id: "q-trie-8",
      type: "true-false",
      difficulty: "hard",
      question: "A Trie can sort n strings of max length L in O(n * L) time.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Insert all strings O(n * L), then DFS pre-order collecting words at isEnd nodes. Children are ordered alphabetically (children[0]='a', ...), so DFS yields lexicographic order.",
      hints: [
        "DFS on Trie visits characters alphabetically. Collecting isEnd nodes during DFS gives sorted strings.",
      ],
    },
    {
      id: "q-trie-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Word Search II, using a Trie for the dictionary vs. a hash set allows:",
      options: [
        "Faster individual cell access in the grid",
        "Pruning DFS branches when the current path is not a prefix of any dictionary word",
        "Reducing grid traversal from O(mn) to O(log mn)",
        "Parallel searching from multiple starting cells",
      ],
      correctAnswer: 1,
      explanation:
        "Advancing a Trie pointer during grid DFS lets us detect dead-ends early: if no child exists for the next character, no dictionary word can extend this path. Hash set requires full word completion before checking.",
      hints: [
        "The Trie tells you if the current prefix can lead to any dictionary word — enabling pruning.",
      ],
    },
  ],

  "word-search-ii": [
    {
      id: "q-ws2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Word Search II (find all dictionary words in a 2D grid) uses which primary algorithm?",
      options: [
        "BFS from every cell",
        "DFS backtracking with a Trie for pruning",
        "Dynamic programming on grid cells",
        "Binary search on sorted words",
      ],
      correctAnswer: 1,
      explanation:
        "DFS backtracking explores all paths in the grid. A Trie enables early pruning: if the current prefix is not in the Trie, backtrack immediately.",
      hints: [
        "Word Search I (single word) = DFS backtracking. Word Search II adds Trie for multiple words.",
      ],
    },
    {
      id: "q-ws2-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Word Search II, the same cell can be used multiple times within a single word path.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Each cell is used at most once per word path. Mark board[r][c] = '#' before recursing, restore after backtracking.",
      hints: [
        "You must mark cells visited to avoid using them twice in one path.",
      ],
    },
    {
      id: "q-ws2-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The four directions explored from cell (r, c) in Word Search II are:",
      options: [
        "(r-1,c), (r+1,c), (r,c-1), (r,c+1)",
        "(r-1,c-1), (r-1,c+1), (r+1,c-1), (r+1,c+1)",
        "(r-2,c), (r+2,c), (r,c-2), (r,c+2)",
        "(r-1,c) and (r,c+1) only",
      ],
      correctAnswer: 0,
      explanation:
        "Only horizontal and vertical neighbors (up, down, left, right) — not diagonals. Words are formed by sequentially adjacent cells sharing an edge.",
      hints: ["Adjacent = sharing an edge, not a corner."],
    },
    {
      id: "q-ws2-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "After finding a word during DFS, how do you prevent reporting duplicates?",
      options: [
        "Use a separate visited set for found words",
        "Set the Trie node\'s isEnd = false after recording the word",
        "Stop the entire DFS immediately",
        "Filter duplicates at the end with a hash set",
      ],
      correctAnswer: 1,
      explanation:
        "Setting isEnd = false prevents finding the same word via a different path. More efficient than post-processing deduplication.",
      hints: [
        "The Trie marks word boundaries. Clear isEnd once found to skip future re-findings.",
      ],
    },
    {
      id: "q-ws2-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of the Trie-based Word Search II solution?",
      options: [
        "O(m * n * 4^L) where L = max word length (independent of dictionary size W)",
        "O(W * m * n)",
        "O(m * n * L * W)",
        "O(4^(m*n))",
      ],
      correctAnswer: 0,
      explanation:
        "With the Trie, one DFS from each cell branches only where Trie has children. Total: O(m * n * 4^L). Building Trie: O(W * L). Key win: all words searched simultaneously.",
      hints: [
        "The Trie replaces W independent word searches with one simultaneous search.",
      ],
    },
    {
      id: "q-ws2-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What prevents the DFS from revisiting the same cell within a single word path?",
      options: [
        "A global visited array reset between each starting cell",
        "Temporarily replacing board[r][c] with sentinel '#' and restoring after recursion",
        "Only allowing moves right and down",
        "Checking if cell index is in the recursion stack explicitly",
      ],
      correctAnswer: 1,
      explanation:
        "Set board[r][c] = '#' before recursing (prevents children from revisiting). Restore board[r][c] = originalChar after backtracking. O(1) in-place marking.",
      hints: ["Classic backtracking pattern: modify → recurse → undo."],
    },
    {
      id: "q-ws2-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Pruning Trie nodes after finding a word (removing empty branches) helps because:",
      options: [
        "It reduces memory usage only",
        "Future DFS calls skip dead Trie branches immediately, reducing work",
        "It improves Trie construction time",
        "It is required for correctness (without it duplicates occur)",
      ],
      correctAnswer: 1,
      explanation:
        "Once a word is found and its Trie node has no remaining word endings below it, pruning that branch prevents future DFS calls from traversing into it. This optimization is significant when many words share prefixes.",
      hints: [
        "Dead branches = nodes with no words left. No reason to traverse them. Pruning prevents it.",
      ],
    },
    {
      id: "q-ws2-8",
      type: "true-false",
      difficulty: "hard",
      question:
        "Storing complete word strings in Trie leaf nodes (instead of reconstructing during DFS) is a valid optimization.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Storing the word string in the Trie node allows O(1) retrieval when found. Without it, you reconstruct the path character by character during DFS backtracking (O(L) per match).",
      hints: [
        "Reconstruction requires building the string as you backtrack. Storing it at the node avoids this.",
      ],
    },
    {
      id: "q-ws2-9",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Brute force Word Search II (run Word Search I per dictionary word) has complexity:",
      options: [
        "O(W * m * n * 4^L)",
        "O(m * n * 4^L)",
        "O(W * L * m * n)",
        "O(W * (m * n)^2)",
      ],
      correctAnswer: 0,
      explanation:
        "For each of W words: DFS from each of m*n cells, branching up to 4 directions for L steps. Per word: O(m * n * 4^L). Total: O(W * m * n * 4^L). Trie approach eliminates the W multiplier.",
      hints: ["Brute force = Word Search I run W times independently."],
    },
  ],
};

registerQuestions(questions);
