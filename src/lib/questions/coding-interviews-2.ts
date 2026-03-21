import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  //
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
        "What is the inorder traversal of the BST shown below?\n\n```\n    4\n   / \\\n  2   5\n / \\\n1   3\n```",
      options: ["[1, 2, 3, 4, 5]", "[4, 2, 5, 1, 3]", "[1, 3, 2, 5, 4]", "[5, 4, 3, 2, 1]"],
      correctAnswer: 0,
      explanation:
        "Inorder visits nodes in the order: left subtree, root, right subtree. Applying this recursively:\n\n\\[\n\\begin{aligned}\n\\text{inorder}(1) &= [1] &&\\text{(node 1 — leaf, no children)} \\\\\n\\text{inorder}(3) &= [3] &&\\text{(node 3 — leaf, no children)} \\\\\n\\text{inorder}(2) &= [1] + [2] + [3] = [1, 2, 3] &&\\text{(left=1, root=2, right=3)} \\\\\n\\text{inorder}(5) &= [5] &&\\text{(node 5 — leaf, no children)} \\\\\n\\text{inorder}(4) &= [1, 2, 3] + [4] + [5] = [1, 2, 3, 4, 5] &&\\text{(left=2, root=4, right=5)}\n\\end{aligned}\n\\]\n\nThe BST property (left \\lt root \\lt right at every node) guarantees that inorder traversal visits nodes in strictly ascending sorted order.",
      hints: [
        "Start from the bottom-left leaf and work your way up recursively.",
        "For a BST, inorder traversal always produces nodes in ascending sorted order.",
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
        "Level order traversal (BFS on a tree) uses which underlying data structure?",
      options: ["Stack", "Queue", "Heap", "Binary search tree"],
      correctAnswer: 1,
      explanation:
        "A queue enforces FIFO (first-in, first-out) order, which naturally processes nodes level by level, left to right:\n\n\\[\n\\begin{aligned}\n&\\text{enqueue}(root) \\\\[3pt]\n&\\text{while } queue \\neq \\emptyset: \\\\[3pt]\n&\\quad n = \\text{dequeue}();\\; \\text{visit}(n) \\\\[3pt]\n&\\quad \\text{if } n.\\text{left} \\neq null: \\text{enqueue}(n.\\text{left}) \\\\[3pt]\n&\\quad \\text{if } n.\\text{right} \\neq null: \\text{enqueue}(n.\\text{right})\n\\end{aligned}\n\\]\n\nEach node is enqueued once and dequeued once — O(n) total time. The queue holds at most one full level, so O(w) space where w is the maximum level width.",
      hints: [
        "BFS = queue, DFS = stack. Breadth First Search uses a queue.",
        "FIFO order ensures all nodes at depth d are processed before any node at depth d+1.",
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
        "BST duplicate handling varies across implementations. In the standard LeetCode convention (LeetCode 98), the rule is:",
      options: [
        "Duplicates in the right subtree only (left < node <= right)",
        "Strict inequality on both sides (left < node < right, no duplicates)",
        "Duplicates allowed on either side",
        "No duplicates are allowed, but equal values may be placed in either subtree",
      ],
      correctAnswer: 1,
      explanation:
        "LeetCode 98 (the canonical BST validation problem) uses strict inequalities:\n\n\\[\n\\text{valid BST: } \\forall x \\in \\text{left subtree}: x < node.\\text{val} \\quad \\text{and} \\quad \\forall y \\in \\text{right subtree}: y > node.\\text{val}\n\\]\n\nSome textbook BST definitions allow duplicates in the right subtree with left <= node <= right, but the coding interview standard is strict. Always check the problem constraints — when not specified, default to strict inequalities.",
      hints: [
        "LeetCode 98 is the canonical BST problem. It enforces strict left < root < right with no duplicates allowed.",
        "When problem statements don't specify, assume strict inequality unless the problem context implies otherwise.",
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
        "When inserting a value into a BST, if the value is less than the current node's value, you descend to the:",
      options: [
        "Right subtree",
        "Left subtree",
        "Parent node",
        "Root node",
      ],
      correctAnswer: 1,
      explanation:
        "The BST invariant requires all values in the left subtree to be strictly less than the parent node's value. Starting from the root, we compare the target value with each node and descend left or right accordingly:\n\n\\[\n\\text{if } val < node.val: node = node.\\text{left} \\\\\n\\text{else: } node = node.\\text{right}\n\\]\n\nWe continue until reaching a null child, which becomes the insertion point — always as a leaf node.",
      hints: [
        "BST invariant: all values in the left subtree must be strictly less than the parent node.",
        "Insertion always happens at a leaf position: traverse until reaching a null child.",
      ],
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
        "Standard BST insertion follows the BST invariant (left < node < right) from the root downward until reaching a null child:\n\n\\[\n\\text{while }(current \\neq null):\\quad \\{\\;parent = current;\\; current = (val < current.val) ? current.\\text{left} : current.\\text{right} \\}\n\\]\n\nThe null position where traversal stops becomes the new leaf. No existing nodes are displaced or converted to internal nodes.",
      hints: [
        "Standard BST insertion never reorganizes existing nodes — it only adds a new leaf.",
        "Traverse from root, following the BST invariant left/right decision at each step, until hitting a null child.",
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
        "Sorted insertion into a standard BST produces a completely skewed (degenerate) chain:\n\n\\[\n\\text{Insert } 1 \\to \\text{tree}=1\\quad\n\\text{Insert } 2 \\to \\text{tree}=1 \\rightarrow 2\\quad\n\\text{Insert } 3 \\to \\text{tree}=1 \\rightarrow 2 \\rightarrow 3\\quad\n\\dots\n\\]\n\nEach new element becomes the right child of the previous leaf. Height = n − 1 = O(n). A balanced BST requires explicit rebalancing mechanisms such as AVL rotations or Red-Black tree rules.",
      hints: [
        "Trace it out: inserting 1, then 2 (both go right since 2 > 1), then 3, etc. The tree becomes a right-skewed chain.",
        "Standard BSTs do not self-balance. Balanced variants (AVL, Red-Black) are needed to maintain O(log n) height.",
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
        "The recursive function either continues descending or creates a new node:\n\n\\[\n\\text{insert}(node, val) = \\begin{cases}\n\\text{new } TreeNode(val) & \\text{if } node = null \\\\\nnode.\\text{left} = \\text{insert}(node.\\text{left}, val) & \\text{if } val < node.val \\\\\nnode.\\text{right} = \\text{insert}(node.\\text{right}, val) & \\text{if } val > node.val\n\\end{cases}\n\\]\n\nThe base case (root == null) creates and returns the new TreeNode. The caller assigns it as either the left or right child of the previous node.",
      hints: [
        "The base case creates a new TreeNode and returns it upward to be linked as a child.",
        "After the recursive call returns, assign the result to root.left or root.right.",
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
        "Iterative insertion uses two pointers: current and parent. Descend the tree following the BST invariant:\n\n\\[\n\\begin{aligned}\n&parent = null;\\; current = root \\\\[3pt]\n&\\text{while }(current \\neq null): \\\\[3pt]\n&\\quad parent = current \\\\[3pt]\n&\\quad current = (val < current.val) ? current.\\text{left} : current.\\text{right} \\\\[5pt]\n&\\text{// current is now null} \\\\[3pt]\n&\\text{if }(val < parent.val):\\; parent.\\text{left} = \\text{new } TreeNode(val) \\\\[3pt]\n&\\text{else: } parent.\\text{right} = \\text{new } TreeNode(val)\n\\end{aligned}\n\\]\n\nThis is O(h) time and O(1) extra space (no recursion stack).",
      hints: [
        "Use two pointers: one to track the current node and one to remember the parent.",
        "When current becomes null, the parent is where we attach the new node as a left or right child.",
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
        "Which insertion sequence, applied to a standard BST, creates the most balanced tree from the sorted set {1, 2, 3, 4, 5, 6, 7}?",
      options: [
        "Sorted ascending order: 1, 2, 3, 4, 5, 6, 7",
        "Reverse sorted order: 7, 6, 5, 4, 3, 2, 1",
        "Middle-first order: 4, 2, 6, 1, 3, 5, 7",
        "Random order (expected to be balanced)",
      ],
      correctAnswer: 2,
      explanation:
        "The middle-first sequence (4, 2, 6, 1, 3, 5, 7) is the preorder traversal of a perfectly balanced BST:\n\n\\[\n\\text{Step 1: Insert 4} \\to 4\\quad \\text{root}\n\\]\n\\[\n\\text{Step 2: Insert 2} \\to \\text{goes left of 4}\\quad \\text{Step 3: Insert 6} \\to \\text{goes right of 4}\n\\]\n\\[\n\\text{Step 4: Insert 1} \\to \\text{left of 2}\\quad \\text{Step 5: Insert 3} \\to \\text{right of 2}\n\\]\n\\[\n\\text{Step 6: Insert 5} \\to \\text{left of 6}\\quad \\text{Step 7: Insert 7} \\to \\text{right of 6}\n\\]\n\nEach insertion places the median of the remaining elements at the root of the current subtree — giving height = floor(log2 n) = 3. Sorted order creates a chain (height = 7); random order has expected O(log n) height but is not guaranteed.",
      hints: [
        "The median element of a sorted array should be the root of a balanced BST built from that array.",
        "Middle-first insertion mimics the recursive 'build from sorted array' strategy: median = root, recurse on halves.",
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

  //
  "serialize-deserialize-tree": [
    {
      id: "q-sdt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In BFS serialization of a binary tree, null children are represented by:",
      options: [
        "Omitting them entirely from the output",
        "A sentinel marker (e.g., 'null' or '#') in the output string",
        "Storing -1 at those positions",
        "Doubling the value of the parent node",
      ],
      correctAnswer: 1,
      explanation:
        'BFS serialization encodes every node position, including absent children, using a sentinel so deserialization knows the exact tree shape:\n\n\\[\n\\text{Tree: } 1 \\to 2, 3 \\to 4, null, null, 5\n\\]\n\\[\n\\text{Serialized: "1,2,3,4,null,null,5"}\n\\]\n\nWithout sentinels the decoder cannot distinguish a missing left child from a present one.',
      hints: [
        "Think of the LeetCode array representation — it includes nulls to mark absent children.",
        "Null markers preserve structural information that pure value lists lose.",
      ],
    },
    {
      id: "q-sdt-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "During BFS deserialization, nodes are linked to their children using:",
      options: [
        "A stack that holds pending parent nodes",
        "A queue that tracks nodes whose children have not yet been assigned",
        "A hash map from index to node",
        "Recursive calls that consume the string left to right",
      ],
      correctAnswer: 1,
      explanation:
        "The deserializer maintains a queue of nodes waiting for children. Each token from the string either creates a new node (non-null) or skips assignment (null):\n\n\\[\n\\text{while queue not empty: } parent = dequeue();\n\\]\n\\[\n\\text{left\\_token} \\to parent.\\text{left};\\ \\text{right\\_token} \\to parent.\\text{right};\\ \\text{enqueue non-null children}\n\\]\n\nTime: O(n), Space: O(n) for the queue (widest level).",
      hints: [
        "BFS serialization pairs naturally with a BFS deserialization queue.",
        "Each dequeued node is the parent of the next two tokens.",
      ],
    },
    {
      id: "q-sdt-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Compared to BFS serialization, preorder (DFS) serialization of a binary tree:",
      options: [
        "Cannot handle null nodes correctly",
        "Produces a shorter output for balanced trees",
        "Supports unique reconstruction with null markers and is often simpler to implement recursively",
        "Requires O(n^2) time for deserialization",
      ],
      correctAnswer: 2,
      explanation:
        "Preorder DFS with null markers uniquely encodes any binary tree:\n\n\\[\n\\text{serialize}(node):\\; \\text{if null → emit \'#\';}\\; \\text{else emit val, recurse left, recurse right}\n\\]\n\nDeserialization consumes one token at a time via a pointer or iterator:\n\n\\[\n\\text{deserialize}(iter):\\; tok = next(iter);\\; \\text{if \'#\' → null;}\\; \\text{else node(tok, left=des(iter), right=des(iter))}\n\\]\n\nBoth BFS and DFS approaches are O(n) time and O(n) space. DFS is often simpler to code recursively.",
      hints: [
        "Preorder emits root before children — the first token is always the root during deserialization.",
        "Null markers in preorder serialization make the tree shape unambiguous without needing level information.",
      ],
    },
  ],

  //
  "binary-tree-max-path": [
    {
      id: "q-btmp-1",
      type: "true-false",
      difficulty: "easy",
      question:
        "In the binary tree maximum path sum problem (LeetCode 124), the path must pass through the root of the tree.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "The path can start and end at any nodes in the tree — it does not need to pass through the root:\n\n\\[\n\\text{answer} = \\max_{\\text{all paths}} \\sum_{v \\in path} v.\\text{val}\n\\]\n\nA path is any sequence of nodes where each adjacent pair shares an edge. The optimal path could be entirely within a subtree.",
      hints: [
        "Consider a tree where all large values are in the left subtree — the best path stays there.",
        "The path must be contiguous along edges but can start and end anywhere.",
      ],
    },
    {
      id: "q-btmp-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the max path sum DFS helper, the function returns the maximum gain from the current node going in ONE direction. Why?",
      options: [
        "Because paths must always go left",
        "Because a subtree can only contribute one branch to its parent\'s path — the parent connects both branches",
        "Because the right subtree is always ignored",
        "Because only leaf nodes contribute to the answer",
      ],
      correctAnswer: 1,
      explanation:
        "When a node n is used as an intermediate node in a path above it, only one branch (left or right) can extend upward. The maximum path through n combining both children is:\n\n\\[\n\\text{path\\_through\\_n} = \\text{left\\_gain} + n.\\text{val} + \\text{right\\_gain}\n\\]\n\nThis is recorded in the global max, but the return value to n\'s parent is:\n\n\\[\n\\text{return} = n.\\text{val} + \\max(\\text{left\\_gain},\\; \\text{right\\_gain})\n\\]\n\nTime: O(n), Space: O(h) recursion stack.",
      hints: [
        "A node can be the 'elbow' of a path (using both branches) but can only extend one branch upward.",
        "The global max is updated at every node; the return value extends only one branch.",
      ],
    },
    {
      id: "q-btmp-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When all node values are negative, the max path sum equals:",
      options: [
        "0 (empty path allowed)",
        "The value of the single node with the largest (least negative) value",
        "Negative infinity",
        "The sum of all negative values",
      ],
      correctAnswer: 1,
      explanation:
        "LeetCode 124 requires the path to contain at least one node, so an empty path is not valid:\n\n\\[\n\\text{If all values} < 0:\\; \\text{answer} = \\max_{v} v.\\text{val}\n\\]\n\nIn the DFS helper, gains from children are clamped to zero:\n\n\\[\n\\text{left\\_gain} = \\max(0,\\; \\text{dfs}(node.\\text{left}))\n\\]\n\nThis ensures that a subtree with negative sum is simply not included in the path. However, the node itself must still be counted, so the local max is initialized to the node\'s value (not 0).",
      hints: [
        "Clamping child gains to zero (max(0, gain)) handles negative subtrees automatically.",
        "Initialize the global maximum to -Infinity (or the root\'s value) to handle all-negative cases.",
      ],
    },
  ],

  //
  "construct-from-traversals": [
    {
      id: "q-cft-1",
      type: "true-false",
      difficulty: "easy",
      question:
        "Given only the inorder traversal of a binary tree with distinct values, the original tree can be uniquely reconstructed.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Inorder traversal alone is insufficient to determine a unique tree. Many different tree shapes yield the same inorder sequence:\n\n\\[\n\\text{Inorder: } [1, 2, 3] \\text{ could be: root=2 (balanced) or root=1 (right-skewed) or root=3 (left-skewed)}\n\\]\n\nUniqueness requires inorder paired with EITHER preorder or postorder (not two copies of the same traversal type).",
      hints: [
        "Inorder gives sorted order for BSTs but does not reveal the root position.",
        "You need at least two different traversal types to reconstruct a general binary tree.",
      ],
    },
    {
      id: "q-cft-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the preorder + inorder tree construction algorithm, how is the root\'s index in the inorder array used?",
      options: [
        "To compute the height of the tree",
        "To split inorder into left and right subtrees, determining the number of nodes in each subtree",
        "To decide whether the tree is balanced",
        "To skip null nodes in preorder",
      ],
      correctAnswer: 1,
      explanation:
        "Preorder[0] is the root. Finding its index i in inorder:\n\n\\[\n\\text{inorder}[0..i-1] \\to \\text{left subtree} \\quad (i \\text{ nodes})\n\\]\n\\[\n\\text{inorder}[i+1..] \\to \\text{right subtree}\n\\]\n\nThe left subtree size i tells us the corresponding preorder slice:\n\n\\[\n\\text{preorder}[1..i] \\to \\text{left preorder}, \\quad \\text{preorder}[i+1..] \\to \\text{right preorder}\n\\]\n\nUsing a hash map for inorder index lookup: O(n) total time, O(n) space.",
      hints: [
        "The root splits inorder into left and right halves. The size of each half partitions preorder too.",
        "Use a HashMap<value, index> on inorder to avoid O(n) scans — reduces total to O(n).",
      ],
    },
    {
      id: "q-cft-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Constructing a binary tree from postorder + inorder: compared to preorder + inorder, the key difference is:",
      options: [
        "Postorder approach is O(n^2) while preorder is O(n)",
        "In postorder the root is the LAST element; left/right subtree sizes are computed the same way from inorder",
        "Postorder cannot handle trees with null children",
        "Postorder requires an additional stack to determine root position",
      ],
      correctAnswer: 1,
      explanation:
        "In postorder, the root is always the last element (vs. first in preorder):\n\n\\[\n\\text{postorder} = [\\ldots\\text{left subtree}\\ldots,\\;\\ldots\\text{right subtree}\\ldots,\\;\\text{root}]\n\\]\n\nThe algorithm mirrors preorder construction:\n1. root = postorder[end]\n2. Find root in inorder → i\n3. Right subtree size = len(inorder) - i - 1 (important: build right before left when iterating postorder in reverse)\n\nBoth approaches are O(n) with a hash map. Complexity analysis:\n\n\\[\nT(n) = 2T(n/2) + O(1) \\implies O(n)\n\\]",
      hints: [
        "Postorder root is at the END of the array, not the beginning.",
        "Build right subtree before left when consuming postorder array from right to left.",
      ],
    },
  ],

  //
  "binary-search-tree-iterator": [
    {
      id: "q-bsti-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A BST iterator that calls next() in order returns nodes in what sequence?",
      options: [
        "Preorder (root, left, right)",
        "Inorder (left, root, right) — ascending sorted order",
        "Postorder (left, right, root)",
        "Level order (breadth-first)",
      ],
      correctAnswer: 1,
      explanation:
        "A BST iterator simulates inorder traversal, which for a BST produces ascending sorted order:\n\n\\[\n\\text{Inorder}(BST) = \\text{sorted ascending sequence}\n\\]\n\nThis is LeetCode 173. The challenge is doing it lazily (one node per next() call) rather than materializing the full list.",
      hints: [
        "BST inorder = sorted order. The iterator exposes this one element at a time.",
        "Think of it as a lazy inorder traversal.",
      ],
    },
    {
      id: "q-bsti-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The stack-based BST iterator: what does the constructor push onto the stack initially?",
      options: [
        "The root and all its right descendants",
        "The root and all nodes on the leftmost path from root",
        "All leaf nodes",
        "Nothing — the stack starts empty",
      ],
      correctAnswer: 1,
      explanation:
        "The constructor pushes all nodes along the leftmost path (root, root.left, root.left.left, …) until null:\n\n\\[\n\\text{pushLeft}(node): \\text{while } node \\neq null:\\; \\text{push}(node);\\; node = node.\\text{left}\n\\]\n\nnext() pops the top node (smallest not yet returned), pushes its right child\'s leftmost path, and returns the value. Amortized O(1) per next(): each node is pushed and popped exactly once across all calls → O(n) total.",
      hints: [
        "The stack top is always the next smallest element — the leftmost unprocessed node.",
        "After popping a node, push its right child\'s leftmost path to maintain the invariant.",
      ],
    },
    {
      id: "q-bsti-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The stack-based BST iterator uses O(h) space. An alternative achieving O(1) space uses:",
      options: [
        "A pre-built sorted array (O(n) space)",
        "Morris traversal — threading right pointers temporarily to avoid a stack",
        "A doubly linked list embedded in the BST nodes",
        "Recursion with a global counter",
      ],
      correctAnswer: 1,
      explanation:
        "Morris inorder traversal achieves O(1) auxiliary space by temporarily creating threads (back-edges via right pointers) to the inorder successor:\n\n\\[\n\\text{For each node } x:\\; \\text{find predecessor } p = \\text{rightmost in } x.\\text{left}\n\\]\n\\[\n\\text{if } p.\\text{right} = null: \\text{thread } p.\\text{right} = x,\\; x = x.\\text{left}\n\\]\n\\[\n\\text{if } p.\\text{right} = x: \\text{remove thread},\\; \\text{visit } x,\\; x = x.\\text{right}\n\\]\n\nEach node is visited at most twice → O(n) total, O(1) space. The iterator state is just the current pointer.",
      hints: [
        "Morris traversal modifies right pointers temporarily and restores them — no stack needed.",
        "O(1) space comes at the cost of temporarily mutating the tree structure.",
      ],
    },
  ],

  //
  "count-complete-tree-nodes": [
    {
      id: "q-cctn-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A complete binary tree is defined as:",
      options: [
        "Every node has exactly 0 or 2 children",
        "All levels are fully filled except possibly the last, which is filled from left to right",
        "The tree is both full and balanced",
        "Every leaf is at the same depth",
      ],
      correctAnswer: 1,
      explanation:
        "A complete binary tree fills levels top-to-bottom, left-to-right. The last level may be partially filled but all present nodes are as far left as possible:\n\n\\[\n\\text{Nodes at depth } d < h:\\; 2^d \\quad \\text{(fully filled)}\n\\]\n\\[\n\\text{Nodes at depth } h:\\; 1 \\leq k \\leq 2^h \\quad \\text{(left-aligned)}\n\\]\n\nTotal nodes: between 2^h and 2^(h+1)-1.",
      hints: [
        "Complete ≠ perfect. Perfect means every level is fully filled.",
        "Heap arrays represent complete binary trees: parent at i, children at 2i+1 and 2i+2.",
      ],
    },
    {
      id: "q-cctn-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Counting nodes in a complete binary tree in O(log^2 n) exploits:",
      options: [
        "The fact that one subtree is always a perfect binary tree",
        "Dynamic programming on subtree sizes",
        "A hash map from node to depth",
        "Sorting nodes by value",
      ],
      correctAnswer: 0,
      explanation:
        "Compare the leftmost height h_L (go left until null) and rightmost height h_R (go right until null):\n\n\\[\n\\text{if } h_L = h_R:\\; \\text{left subtree is perfect} \\implies \\text{count} = 2^{h_L} - 1 + 1 + \\text{count}(\\text{right})\n\\]\n\\[\n\\text{if } h_L \\neq h_R:\\; \\text{right subtree is perfect one level smaller} \\implies \\text{count} = 2^{h_R} - 1 + 1 + \\text{count}(\\text{left})\n\\]\n\nHeight computation: O(log n). Recursion depth: O(log n). Total: O(log^2 n) vs. O(n) brute force.",
      hints: [
        "In a complete binary tree, at least one of the two subtrees must be a perfect binary tree.",
        "Perfect binary tree with height h has exactly 2^h - 1 nodes.",
      ],
    },
    {
      id: "q-cctn-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The O(log^2 n) algorithm for counting nodes in a complete binary tree uses binary search on the last level to determine how many nodes are present there.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "An alternative O(log^2 n) approach uses binary search on the last level:\n\n\\[\n\\text{Height } h = \\text{leftmost path length}\n\\]\n\\[\n\\text{Binary search } k \\in [0, 2^h - 1]:\\; \\text{does node at position } k \\text{ exist?}\n\\]\n\nChecking node existence at position k: follow O(log n) bits of k as a path from root. Binary search makes O(log n) such checks → O(log^2 n) total. The recursive height-comparison method arrives at the same complexity through a different route.",
      hints: [
        "Position k on the last level can be checked by treating k\'s bits as left/right directions from root.",
        "O(log n) checks × O(log n) each = O(log^2 n).",
      ],
    },
  ],

  //
  "flatten-binary-tree": [
    {
      id: "q-fbt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Flattening a binary tree to a linked list (LeetCode 114) produces the list in what traversal order?",
      options: [
        "Inorder",
        "Preorder",
        "Postorder",
        "Level order",
      ],
      correctAnswer: 1,
      explanation:
        "The problem requires flattening to a right-skewed linked list where the order matches the preorder traversal:\n\n\\[\n\\text{preorder: } root \\to \\text{left} \\to \\text{right}\n\\]\n\\[\n\\text{Flattened: } root.\\text{right} \\to \\text{left\\_subtree\\_preorder} \\to \\text{right\\_subtree\\_preorder}\n\\]\n\nAll left pointers are set to null; the list is encoded entirely through right pointers.",
      hints: [
        "Root comes first, then left subtree, then right subtree — that\'s preorder.",
        "The flattened tree has all nodes in the right spine with null left pointers.",
      ],
    },
    {
      id: "q-fbt-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The O(1) space (Morris-like) approach to flatten a binary tree works by:",
      options: [
        "Using recursion and returning the tail of the flattened list",
        "Iteratively finding the rightmost node of the left subtree and rerouting pointers",
        "Converting to an array and rebuilding as a right-skewed tree",
        "Using a stack to simulate preorder traversal",
      ],
      correctAnswer: 1,
      explanation:
        "The in-place iterative algorithm (analogous to Morris traversal):\n\n\\[\n\\text{while } node \\neq null:\n\\]\n\\[\n\\text{if node.left} \\neq null:\n\\]\n\\[\n\\quad pred = \\text{rightmost}(node.\\text{left}) \\quad \\text{O(h) per node}\n\\]\n\\[\n\\quad pred.\\text{right} = node.\\text{right}\n\\]\n\\[\n\\quad node.\\text{right} = node.\\text{left};\\; node.\\text{left} = null\n\\]\n\\[\n\\text{node} = node.\\text{right}\n\\]\n\nTotal: O(n) time (each node\'s rightmost path traversed at most twice), O(1) space (no stack, no recursion).",
      hints: [
        "Find the rightmost node of the left subtree — it becomes the predecessor of the original right subtree.",
        "This is the same threading idea as Morris traversal applied to flattening.",
      ],
    },
    {
      id: "q-fbt-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "A reverse postorder approach (process right, then left, then root) can flatten a binary tree in-place in O(n) time and O(h) space using a single pointer.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Processing in reverse preorder (right → left → root) allows linking nodes using a trailing pointer:\n\n\\[\n\\text{flatten}(node):\\;\n\\]\n\\[\n\\text{if null → return;}\n\\]\n\\[\n\\text{flatten}(node.\\text{right});\\ \\text{flatten}(node.\\text{left});\n\\]\n\\[\nnode.\\text{right} = prev;\\; node.\\text{left} = null;\\; prev = node\n\\]\n\nProcessing in reverse preorder means when we set node.right = prev, prev is already the correct next node. O(n) time, O(h) stack space.",
      hints: [
        "Reverse preorder = right subtree first, then left, then root.",
        "Maintaining a \'prev\' pointer in reverse-preorder links each node to its preorder successor.",
      ],
    },
  ],

  //
  "path-sum-variants": [
    {
      id: "q-psv-1",
      type: "true-false",
      difficulty: "easy",
      question:
        "Path Sum I (LeetCode 112) requires the path to run from root to a leaf node.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Path Sum I specifically checks root-to-leaf paths:\n\n\\[\n\\text{leaf: both } node.\\text{left} = null \\text{ AND } node.\\text{right} = null\n\\]\n\\[\n\\text{hasPathSum}(node, target) = node.\\text{val} == target \\text{ (at leaf)}\n\\]\n\nPath Sum II (LeetCode 113) finds all such root-to-leaf paths. Path Sum III (LeetCode 437) allows paths between any two nodes (not necessarily root-to-leaf).",
      hints: [
        "A leaf has no children. Check both left and right are null to confirm it\'s a leaf.",
        "Path Sum II and III relax this root-to-leaf constraint.",
      ],
    },
    {
      id: "q-psv-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Path Sum III (paths between any two nodes summing to target) uses prefix sums and a hash map. What does the hash map store?",
      options: [
        "Node values mapped to their depths",
        "Prefix sum totals mapped to how many times that sum has appeared on the current root-to-node path",
        "Target values mapped to their node positions",
        "Node depths mapped to running sums",
      ],
      correctAnswer: 1,
      explanation:
        "At each node, the running prefix sum from root is curr_sum. Any path ending here with sum = target started from a node where prefix_sum = curr_sum - target:\n\n\\[\n\\text{count} += \\text{freq}[curr\\_sum - target]\n\\]\n\nThe hash map tracks how many times each prefix sum value has appeared on the current path (root-to-current):\n\n\\[\n\\text{freq}[0] = 1 \\quad (\\text{empty prefix — path starting from root})\n\\]\n\nO(n) time (one DFS), O(n) space (hash map + stack).",
      hints: [
        "This is analogous to the subarray-sum-equals-k problem using prefix sums.",
        "freq[curr_sum - target] tells you how many valid path starts exist above the current node.",
      ],
    },
    {
      id: "q-psv-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Path Sum II (collect all root-to-leaf paths summing to target): what is the time complexity?",
      options: [
        "O(n) always",
        "O(n^2) in the worst case because copying paths takes O(n) per leaf",
        "O(n log n) for balanced trees",
        "O(n * L) where L is max path length, same as O(n log n) for balanced",
      ],
      correctAnswer: 1,
      explanation:
        "The DFS visits all n nodes in O(n). However, when a leaf is reached, the current path is copied into the result:\n\n\\[\n\\text{copy cost} = O(h) \\text{ per leaf}\n\\]\n\nIn the worst case (a complete binary tree), there are O(n) leaves and h = O(log n), giving O(n log n). But for a skewed tree with one path, h = O(n) and one copy gives O(n). In the truly worst case for the copy operation (a complete tree with n/2 leaves of depth O(log n)):\n\n\\[\n\\frac{n}{2} \\times O(\\log n) = O(n \\log n)\n\\]\n\nHowever LeetCode marks this O(n^2) for the pathological case where height = O(n).",
      hints: [
        "The DFS itself is O(n), but copying the path at each leaf adds O(h) per leaf.",
        "n/2 leaves × h path length = worst-case copy cost.",
      ],
    },
  ],

  //
  "diameter-binary-tree": [
    {
      id: "q-dbt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The diameter of a binary tree is defined as:",
      options: [
        "The number of nodes in the longest root-to-leaf path",
        "The length of the longest path between any two nodes (measured in edges)",
        "The height of the tree",
        "The maximum level-order width",
      ],
      correctAnswer: 1,
      explanation:
        "The diameter is the number of edges on the longest path between any two nodes:\n\n\\[\n\\text{diameter} = \\max_{\\text{all node pairs } (u,v)} \\text{dist}(u, v)\n\\]\n\nThe path may or may not pass through the root. For a single-node tree, the diameter is 0 (no edges). LeetCode 543 measures edges, not nodes.",
      hints: [
        "Diameter = edges on longest path. A single node has diameter 0.",
        "The longest path might bypass the root entirely.",
      ],
    },
    {
      id: "q-dbt-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the diameter DFS algorithm, the helper function returns the height of the subtree. At each node, the diameter candidate through that node is:",
      options: [
        "left_height + right_height + 2",
        "left_height + right_height",
        "max(left_height, right_height) + 1",
        "left_height * right_height",
      ],
      correctAnswer: 1,
      explanation:
        "At each node n, the longest path passing through n goes:\n\n\\[\n\\text{deepest leaf in left} \\to n \\to \\text{deepest leaf in right}\n\\]\n\\[\n\\text{length} = \\text{left\\_height} + \\text{right\\_height} \\quad (\\text{edges})\n\\]\n\nThe return value to the parent (height) is:\n\n\\[\n\\text{height}(n) = 1 + \\max(\\text{left\\_height},\\; \\text{right\\_height})\n\\]\n\nUpdate global_max = max(global_max, left_height + right_height) at each node. O(n) time, O(h) space.",
      hints: [
        "Height = edges from node to deepest leaf (a leaf has height 0).",
        "Diameter through node = edges going left + edges going right.",
      ],
    },
    {
      id: "q-dbt-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The diameter of a binary tree can be found in a single O(n) DFS pass without computing heights separately.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The single DFS pass computes height and updates the diameter simultaneously:\n\n\\[\n\\text{dfs}(node):\n\\]\n\\[\n\\text{if null → return } -1 \\quad (\\text{height of null = -1 so leaf height = 0})\n\\]\n\\[\nL = \\text{dfs}(node.\\text{left}) + 1;\\; R = \\text{dfs}(node.\\text{right}) + 1\n\\]\n\\[\n\\text{global\\_max} = \\max(\\text{global\\_max},\\; L + R);\\ \\text{return } \\max(L, R)\n\\]\n\nNo separate height pass needed. The diameter and height computations are interleaved in one O(n) traversal with O(h) stack space.",
      hints: [
        "The helper returns height AND updates global max as a side effect.",
        "Setting null height to -1 makes leaf height = 0 without a special case.",
      ],
    },
  ],

  //
  "recover-bst": [
    {
      id: "q-rbst-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the recover BST problem (LeetCode 99), exactly how many nodes have been swapped?",
      options: [
        "One node",
        "Exactly two nodes",
        "Up to three nodes",
        "An unknown number of nodes",
      ],
      correctAnswer: 1,
      explanation:
        "The problem guarantees that exactly two nodes have been swapped:\n\n\\[\n\\text{Correct BST inorder: } [\\ldots, a, \\ldots, b, \\ldots] \\text{ where } a < b\n\\]\n\\[\n\\text{After swap: } [\\ldots, b, \\ldots, a, \\ldots] \\text{ — two inversions detected}\n\\]\n\nThe recovery is straightforward: identify the two misplaced nodes and swap their values back.",
      hints: [
        "Two swapped nodes create either one or two inversions in the inorder sequence.",
        "Adjacent swap → one inversion pair. Non-adjacent swap → two inversion pairs.",
      ],
    },
    {
      id: "q-rbst-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Detecting the two swapped BST nodes via inorder traversal requires tracking:",
      options: [
        "The minimum and maximum nodes seen so far",
        "The previous node (prev) to detect where current < prev (an inversion)",
        "The tree height at each node",
        "A sorted copy of all node values",
      ],
      correctAnswer: 1,
      explanation:
        "During inorder traversal, track prev (the last visited node). An inversion occurs when current.val < prev.val:\n\n\\[\n\\text{First inversion:}\\; first = prev,\\; second = current\n\\]\n\\[\n\\text{Second inversion (if present):}\\; second = current \\quad (\\text{update second only})\n\\]\n\nAfter full traversal, swap first.val and second.val. If nodes are adjacent in inorder, only one inversion occurs (first != null, second is set once). O(n) time, O(h) space for the recursion stack.",
      hints: [
        "The first inversion: first = the larger node (prev), second = the smaller (current).",
        "For a second inversion, update only \'second\' (prev becomes the new candidate).",
      ],
    },
    {
      id: "q-rbst-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Morris traversal-based BST recovery achieves O(1) extra space. Which statement correctly describes its advantage?",
      options: [
        "It is faster than O(n) time",
        "It eliminates the O(h) recursion stack, making space complexity O(1) regardless of tree shape",
        "It can recover more than two swapped nodes",
        "It avoids modifying node values",
      ],
      correctAnswer: 1,
      explanation:
        "Standard inorder recursion uses O(h) stack space (O(n) for a skewed tree). Morris traversal replaces the stack with temporary right-pointer threads:\n\n\\[\n\\text{Space: } O(1) \\text{ auxiliary (only first, second, prev pointers)}\n\\]\n\nThe same inversion-detection logic (tracking prev) is applied, but the traversal itself uses Morris threading. Time complexity remains O(n) since each node is visited at most twice (once when threading, once when unthreading). For a skewed BST of n nodes, this reduces space from O(n) to O(1).",
      hints: [
        "Morris threading avoids recursion entirely — the tree\'s right pointers serve as the implicit stack.",
        "Space O(1) means only a constant number of pointers regardless of n.",
      ],
    },
  ],

  // ── NEW SECTIONS ─────────────────────────────────────────────────────────

  "lowest-common-ancestor-advanced": [
    {
      id: "q-lcaa-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LCA in a DAG (directed acyclic graph) differs from binary tree LCA because:",
      options: [
        "A node can have multiple parents, so we cannot rely on a single upward path",
        "DAGs have cycles that must be handled",
        "DAG LCA always equals the root",
        "Binary search can be applied to DAGs",
      ],
      correctAnswer: 0,
      hints: [
        "In a tree each node has exactly one parent; in a DAG a node can have multiple parents",
        "Finding ancestors requires tracking all paths, not just one upward chain",
      ],
      explanation:
        "In a DAG, a node can have multiple parents, so ancestor is the set of all nodes reachable in reverse. LCA(u,v) = deepest node in ancestors(u) intersect ancestors(v). Approach: BFS/DFS from both u and v in reverse-edge graph, intersect ancestor sets. Time: O(V + E); Space: O(V). No simple O(log n) binary lifting since there is no unique root-to-node path.",
    },
    {
      id: "q-lcaa-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Binary Lifting for LCA preprocessing allows queries in O(log n). What is the preprocessing time?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      correctAnswer: 1,
      hints: [
        "We precompute 2^k-th ancestors for each node across log n levels",
        "Each level takes O(n) to fill using the previous level",
      ],
      explanation:
        "Binary lifting stores anc[node][k] = 2^k-th ancestor for k = 0..log n. Preprocessing: for each of n nodes and log n levels, anc[node][k] = anc[anc[node][k-1]][k-1], costing O(n log n) time and space. Query: bring both nodes to same depth and jump in O(log n). Total: O(n log n) preprocess, O(log n) per query.",
    },
    {
      id: "q-lcaa-3",
      type: "true-false",
      difficulty: "medium",
      question: "LCA of two nodes in a binary tree can be found in O(h) time using recursive DFS without extra space (beyond the call stack).",
      correctAnswer: "True",
      hints: [
        "The recursive solution returns the LCA naturally when both nodes are found",
        "O(h) is the recursion stack depth; h = O(log n) balanced, O(n) worst case",
      ],
      explanation:
        "True. The standard recursive LCA: if root is null or equals p or q, return root. Recurse left and right. If both return non-null, current root is LCA. If one is null, return the non-null side. Time: O(n) in worst case; Space: O(h) call stack.",
    },
  ],

  "binary-tree-cameras": [
    {
      id: "q-btc-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Minimum Camera Cover (LeetCode 968) uses a greedy DFS with how many states per node?",
      options: ["2", "3", "4", "n"],
      correctAnswer: 1,
      hints: [
        "Each node can be: not covered, covered without a camera, or has a camera",
        "Parent decisions depend on which state a child returns",
      ],
      explanation:
        "Three states: 0 = not covered (needs camera from parent), 1 = covered without a camera, 2 = has a camera. Bottom-up DFS: if any child returns 0, place camera at current (state 2). If any child returns 2, current is covered (state 1). Else current is uncovered (state 0). At root, if state 0, add one more camera. Time: O(n), Space: O(h).",
    },
    {
      id: "q-btc-2",
      type: "true-false",
      difficulty: "medium",
      question: "In the greedy camera placement for binary trees, cameras are preferably placed at leaf nodes.",
      correctAnswer: "False",
      hints: [
        "Cameras at leaves only cover their immediate parent",
        "Placing cameras one level above leaves maximizes coverage",
      ],
      explanation:
        "False. The greedy prefers placing cameras at parents of leaves. A camera at a leaf covers only its parent and itself; a camera at the leaf parent covers the leaf, the parent, and potentially the grandparent. Bottom-up greedy: leaves return uncovered, their parents are forced to install cameras.",
    },
    {
      id: "q-btc-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the time and space complexity of the greedy camera solution?",
      options: [
        "O(n^2) time, O(n) space",
        "O(n) time, O(h) space",
        "O(n log n) time, O(n) space",
        "O(n) time, O(n) space",
      ],
      correctAnswer: 1,
      hints: [
        "We visit each node exactly once in a DFS",
        "Space is determined by the recursion stack depth",
      ],
      explanation:
        "The DFS visits each of the n nodes exactly once: O(n) time. Space is O(h) for the recursion stack — O(log n) for balanced trees, O(n) for skewed trees. No additional data structures are needed beyond the three integer states returned per node.",
    },
  ],

  "maximum-binary-tree": [
    {
      id: "q-mbt-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Constructing a Maximum Binary Tree (LeetCode 654) naively has what time complexity?",
      options: ["O(n log n)", "O(n^2)", "O(n)", "O(n^2 log n)"],
      correctAnswer: 1,
      hints: [
        "At each recursive call we scan the current subarray to find the maximum",
        "In the worst case (sorted array), we make n, n-1, n-2, ... comparisons",
      ],
      explanation:
        "Naive recursive approach: find max in range [l, r] in O(n), recursively build left and right subtrees. Worst case (sorted input): T(n) = T(n-1) + O(n), solving to O(n^2). Average case (random input): O(n log n).",
    },
    {
      id: "q-mbt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The monotonic stack O(n) approach for Maximum Binary Tree maintains:",
      options: [
        "A min-stack of current path",
        "A decreasing stack where each popped node becomes the new element left child",
        "A queue of level-order nodes",
        "A stack of (index, value) pairs for binary search",
      ],
      correctAnswer: 1,
      hints: [
        "The stack maintains nodes in decreasing order of value",
        "When a new larger element is encountered, it becomes the parent of previous smaller nodes",
      ],
      explanation:
        "Monotonic decreasing stack: for each nums[i], create node v. While stack top value < v value: pop node t, t becomes v.left. Push v; if stack non-empty, v becomes the new right child of the stack top. Result: stack bottom is the root. Each element pushed and popped at most once: O(n) time, O(n) space.",
    },
    {
      id: "q-mbt-3",
      type: "true-false",
      difficulty: "medium",
      question: "The maximum binary tree satisfies the max-heap ordering property (every parent value is larger than its children values).",
      correctAnswer: "True",
      hints: [
        "The root of each subtree is the maximum of its subarray",
        "By construction, every parent is the max of its range and thus larger than any child",
      ],
      explanation:
        "True. By definition, the root of each subarray is its maximum. So every parent is larger than all values in its left and right subtrees, satisfying the max-heap ordering property. However, it does NOT satisfy the shape property (complete binary tree), so it is not a max-heap in the traditional sense.",
    },
  ],

  "find-duplicate-number": [
    {
      id: "q-fdn-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Floyd cycle detection finds the duplicate in an array of n+1 integers in [1,n] with what complexity?",
      options: [
        "O(n log n) time, O(1) space",
        "O(n) time, O(1) space",
        "O(n) time, O(n) space",
        "O(n^2) time, O(1) space",
      ],
      correctAnswer: 1,
      hints: [
        "Treat nums[i] as a pointer to index nums[i], forming a linked list with a cycle",
        "The duplicate entry creates two edges into the same node, causing a cycle",
      ],
      explanation:
        "Model the array as a linked list: index i points to nums[i]. The duplicate value creates two edges into the same node — a cycle. Floyd algorithm phase 1 finds the intersection point (tortoise and hare), phase 2 finds the cycle entrance (the duplicate). Time: O(n), Space: O(1). No array modification required.",
    },
    {
      id: "q-fdn-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Binary search approach for finding the duplicate: count elements <= mid. If count > mid, duplicate is in [1..mid]. Time complexity?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"],
      correctAnswer: 1,
      hints: [
        "Binary search runs log n iterations",
        "Each iteration scans all n elements to count those <= mid",
      ],
      explanation:
        "Binary search on value range [1..n]. For each midpoint mid, count elements in nums that are <= mid: O(n) scan. If count > mid, duplicate is in [1..mid]; else in [mid+1..n]. Repeat log n times. Total: O(n log n) time, O(1) space. Slower than Floyd O(n) but uses a different paradigm.",
    },
    {
      id: "q-fdn-3",
      type: "true-false",
      difficulty: "easy",
      question: "Sorting the array to find the duplicate works in O(n log n) time and O(1) extra space (using in-place sort).",
      correctAnswer: "True",
      hints: [
        "After sorting, duplicates will be adjacent",
        "In-place sorting algorithms like heapsort use O(1) extra space",
      ],
      explanation:
        "True. Sort in-place (e.g., heapsort): O(n log n) time, O(1) space. Scan adjacent pairs to find the duplicate: O(n). However, this modifies the original array, which the problem often disallows. Floyd O(n)/O(1) and binary search O(n log n)/O(1) both preserve the original array.",
    },
  ],

  "kth-smallest-bst": [
    {
      id: "q-ksb-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Finding the k-th smallest element in a BST via inorder traversal has what complexity?",
      options: [
        "O(k) time, O(k) space",
        "O(n) time, O(h) space",
        "O(log n) time, O(1) space",
        "O(k log n) time, O(h) space",
      ],
      correctAnswer: 1,
      hints: [
        "Inorder traversal visits all n nodes in sorted order",
        "We stop after visiting k nodes, but worst case is O(n)",
      ],
      explanation:
        "Inorder traversal yields BST elements in sorted order. Stop after visiting k nodes. Worst case (k = n or unbalanced tree): O(n) time. Space: O(h) for the recursion stack or explicit stack. For repeated queries, an augmented BST storing subtree sizes enables O(log n) per query.",
    },
    {
      id: "q-ksb-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An augmented BST storing subtree sizes enables k-th smallest in O(log n). The key recurrence is:",
      options: [
        "If leftSize == k, return root; if k < leftSize, go left; else go right with k -= leftSize",
        "If leftSize + 1 == k, return root; if k <= leftSize, go left; else go right with k -= (leftSize + 1)",
        "Binary search on node values with O(log n) depth",
        "Count all nodes then subtract from n",
      ],
      correctAnswer: 1,
      hints: [
        "If left subtree has L nodes, the root is the (L+1)-th smallest element",
        "Adjust k when recursing right: subtract L+1 elements already accounted for",
      ],
      explanation:
        "Store leftSize = size of left subtree. k-th smallest: if leftSize+1 == k, return root; if k <= leftSize, recurse left; else recurse right with k = k - leftSize - 1. Time: O(log n) balanced, O(n) worst case. Space: O(n) for the extra field per node.",
    },
    {
      id: "q-ksb-3",
      type: "true-false",
      difficulty: "medium",
      question: "Morris traversal can find the k-th smallest BST element in O(n) time and O(1) space.",
      correctAnswer: "True",
      hints: [
        "Morris traversal performs inorder traversal without a stack or recursion",
        "It uses the tree right pointers temporarily, restoring them afterward",
      ],
      explanation:
        "True. Morris inorder traversal visits nodes in sorted order using O(1) auxiliary space (threading right pointers temporarily). Count nodes visited; stop at k. Time: O(n) since each node is visited at most twice. Space: O(1) — no stack or recursion needed.",
    },
  ],

  "right-side-view": [
    {
      id: "q-rsv-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Binary Tree Right Side View (LeetCode 199) via BFS: at each level, which node do we record?",
      options: ["First node dequeued", "Last node dequeued", "Node with maximum value", "Rightmost leaf"],
      correctAnswer: 1,
      hints: [
        "BFS processes nodes level by level from left to right",
        "The rightmost visible node at each level is the last one in that level",
      ],
      explanation:
        "BFS level-order traversal: process each level completely. The last node dequeued per level is the rightmost visible node. Time: O(n) since all nodes are visited once. Space: O(w) where w is max level width — up to O(n) for a complete binary tree.",
    },
    {
      id: "q-rsv-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "DFS approach for Right Side View visits nodes in what order to naturally produce the rightmost view?",
      options: [
        "Preorder left-first: record first node at each depth",
        "Preorder right-first: record first node seen at each new depth",
        "Postorder right-first: record last node at each depth",
        "Inorder: record middle node at each depth",
      ],
      correctAnswer: 1,
      hints: [
        "Visit right child before left child in DFS",
        "The first node encountered at each depth level in right-first DFS is the rightmost",
      ],
      explanation:
        "DFS right-first preorder: visit root, then right subtree, then left subtree. Track current depth. When depth == result.length, this is the first node seen at this depth — it is the rightmost. Append to result. Time: O(n), Space: O(h) for the recursion call stack.",
    },
    {
      id: "q-rsv-3",
      type: "true-false",
      difficulty: "medium",
      question: "The right side view of a binary tree always contains exactly as many nodes as the tree height.",
      correctAnswer: "True",
      hints: [
        "Each level of the tree contributes exactly one node to the right side view",
        "The number of levels equals the tree height",
      ],
      explanation:
        "True. The right side view collects one node per level (the rightmost visible). The number of levels equals the tree height h (counting root as level 1). So the result always has exactly h elements. Height ranges from O(log n) for balanced to O(n) for skewed trees.",
    },
  ],

  "cousins-in-binary-tree": [
    {
      id: "q-cbt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Two nodes are cousins in a binary tree if they have the same depth but different parents. Which data captures this in BFS?",
      options: [
        "Node value and left child pointer",
        "Node depth and parent node reference",
        "Node index in level-order array",
        "Subtree size of each node",
      ],
      correctAnswer: 1,
      hints: [
        "To check same depth, track the depth of each node during BFS",
        "To check different parents, track each node parent",
      ],
      explanation:
        "Track (depth, parent) for the two target nodes x and y. Nodes are cousins iff depth(x) == depth(y) AND parent(x) != parent(y). BFS approach: for each node, record depth and parent when the target value is found. Time: O(n), Space: O(n) for the BFS queue.",
    },
    {
      id: "q-cbt-2",
      type: "true-false",
      difficulty: "easy",
      question: "Two sibling nodes (same parent) cannot be cousins.",
      correctAnswer: "True",
      hints: [
        "Cousins must have different parents by definition",
        "Siblings share the same parent",
      ],
      explanation:
        "True. The definition of cousins requires different parents. Siblings share a parent, so they fail the different parents criterion. They do share the same depth, but that alone is insufficient. Cousins are: same depth AND different parents.",
    },
    {
      id: "q-cbt-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "DFS solution for Cousins in Binary Tree (LeetCode 993) passes what information through recursion?",
      options: [
        "Only the node value",
        "Current node, its parent, and its depth",
        "Subtree heights for both targets",
        "In-order position of each node",
      ],
      correctAnswer: 1,
      hints: [
        "We need to find the depth and parent of each target node",
        "DFS passes parent and depth down through recursive calls",
      ],
      explanation:
        "DFS signature: dfs(node, parent, depth). When node.val == x or node.val == y, record (depth, parent). After full DFS, compare: cousins iff depthX == depthY AND parentX != parentY. Time: O(n), Space: O(h) recursion stack.",
    },
  ],

  "all-nodes-distance-k": [
    {
      id: "q-ank-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "All Nodes Distance K in Binary Tree (LeetCode 863): converting the tree to an undirected graph allows what traversal?",
      options: [
        "Binary search on node values",
        "BFS from the target node to find all nodes at exactly distance k",
        "DFS with backtracking to enumerate all paths",
        "Topological sort",
      ],
      correctAnswer: 1,
      hints: [
        "In an undirected graph, BFS from a source visits nodes at distance 1, 2, 3, ...",
        "Adding parent edges allows traveling upward in the tree",
      ],
      explanation:
        "Build adjacency list (undirected) from the tree: add both parent-to-child and child-to-parent edges. BFS from target node: collect all nodes at exactly distance k. Time: O(n) for graph build + O(n) for BFS = O(n). Space: O(n) for the adjacency list and BFS queue.",
    },
    {
      id: "q-ank-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DFS approach for All Nodes Distance K without graph conversion returns what from each call?",
      options: [
        "The number of nodes in the subtree",
        "The distance from the subtree root to the target, or -1 if target not in subtree",
        "The height of the subtree",
        "Whether the target is in left or right subtree",
      ],
      correctAnswer: 1,
      hints: [
        "Once target is found, we know distances going downward into subtrees",
        "Going upward: distance from target through current node is 1 + child returned distance",
      ],
      explanation:
        "DFS returns dist = distance from current node to target (-1 if not in subtree). When target found: collect nodes at distance k downward. When a child returns dist >= 0: collect nodes at distance k - dist - 1 from the other child and from nodes reachable upward via the parent. Time: O(n), Space: O(h).",
    },
    {
      id: "q-ank-3",
      type: "true-false",
      difficulty: "medium",
      question: "BFS from the target node after building an undirected graph produces correct results even if k equals 0.",
      correctAnswer: "True",
      hints: [
        "Distance 0 means the node itself; BFS starts at the target so it is at level 0",
        "If k=0, BFS returns just the target node itself",
      ],
      explanation:
        "True. BFS levels: level 0 = {target}. When k=0, we output the target itself — no traversal beyond the starting node. The visited set prevents revisiting. For k>0, BFS correctly expands level by level in the undirected graph. Time: O(n), Space: O(n).",
    },
  ],

  "check-completeness": [
    {
      id: "q-cc-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Check Completeness of a Binary Tree (LeetCode 958): the BFS null-termination rule states:",
      options: [
        "If we see a node with a missing child, all subsequent nodes must also be null",
        "If we see a null node, the tree is immediately incomplete",
        "Null nodes can appear anywhere in BFS order",
        "Only leaf nodes can be null",
      ],
      correctAnswer: 0,
      hints: [
        "In a complete binary tree, all levels are fully filled except possibly the last",
        "In BFS order, once a null slot appears, no non-null node should follow",
      ],
      explanation:
        "BFS with null enqueuing: enqueue children even if null. If we dequeue a null and subsequently dequeue a non-null, the tree is not complete. A complete binary tree in BFS order has all non-null nodes before the first null. Time: O(n), Space: O(n) for the queue.",
    },
    {
      id: "q-cc-2",
      type: "true-false",
      difficulty: "easy",
      question: "A complete binary tree of n nodes always has height floor(log2(n)).",
      correctAnswer: "True",
      hints: [
        "A complete binary tree fills levels left to right",
        "All levels except the last are completely filled",
      ],
      explanation:
        "True. A complete binary tree has all levels fully filled except the last, which is filled left-to-right. Height = floor(log2(n)). This property enables counting complete tree nodes in O(log^2 n): compare left and right subtree heights to determine if the last level falls in the left or right half.",
    },
    {
      id: "q-cc-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the time complexity to count nodes in a complete binary tree (LeetCode 222)?",
      options: ["O(n)", "O(log^2 n)", "O(n log n)", "O(log n)"],
      correctAnswer: 1,
      hints: [
        "At each level, compute heights of left and right subtrees in O(log n)",
        "Recurse only into one subtree per level — there are O(log n) levels",
      ],
      explanation:
        "For a complete binary tree: compute left height hL and right height hR in O(log n) each. If hL == hR, left subtree is perfect with 2^hL - 1 nodes, add root, recurse right. Else recurse left with 2^hR - 1 right nodes. Recurrence: T(n) = T(n/2) + O(log n), solving to O(log^2 n). Much faster than O(n) generic traversal.",
    },
  ],

  "sum-of-left-leaves": [
    {
      id: "q-sll-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Sum of Left Leaves (LeetCode 404): the recursive solution passes what extra information?",
      options: [
        "Current node value",
        "Whether the current node is a left child",
        "Current depth level",
        "Parent node reference",
      ],
      correctAnswer: 1,
      hints: [
        "We need to know if a node is a left child to identify left leaves",
        "A left leaf is a leaf node that is specifically the left child of its parent",
      ],
      explanation:
        "Recursive approach: dfs(node, isLeft). If node is a leaf AND isLeft is true, add node.val to sum. Else recurse: dfs(node.left, true) and dfs(node.right, false). Time: O(n) — all nodes visited. Space: O(h) recursion stack.",
    },
    {
      id: "q-sll-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Iterative solution for Sum of Left Leaves uses which data structure?",
      options: [
        "Priority queue ordered by node value",
        "Stack or queue storing (node, isLeft) pairs",
        "Hash map of node to parent",
        "Two arrays: one for left children, one for right",
      ],
      correctAnswer: 1,
      hints: [
        "Any iterative tree traversal uses a stack (DFS) or queue (BFS)",
        "We need to track whether each node is a left child alongside the node reference",
      ],
      explanation:
        "Iterative DFS using an explicit stack of (node, isLeft) tuples. Pop (node, isLeft): if leaf and isLeft, add to sum. Else push (node.right, false) and (node.left, true). Time: O(n), Space: O(h) for the stack — O(log n) balanced, O(n) skewed.",
    },
    {
      id: "q-sll-3",
      type: "true-false",
      difficulty: "easy",
      question: "The root node can never be counted as a left leaf, even if the tree has only one node.",
      correctAnswer: "True",
      hints: [
        "The root is not a child of any node — it is neither left nor right",
        "Left leaf means a leaf that is specifically the left child of its parent",
      ],
      explanation:
        "True. A left leaf must be the left child of some parent node. The root has no parent, so it cannot be a left child. Even if the root is a leaf (single-node tree), it does not count as a left leaf. The sum of left leaves for a single-node tree is 0.",
    },
  ],
};

registerQuestions(questions);
