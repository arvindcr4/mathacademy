import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  // ── ARRAYS & STRINGS ────────────────────────────────────────────────────
  "two-sum": [
    {
      id: "q-ts-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the optimal Two Sum solution using a hash map?",
      options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      hints: [
        "For each element, we check if its complement (target - nums[i]) exists",
        "Hash maps provide O(1) lookup for checking existence",
        "Think about how many passes through the array we need"
      ],
      explanation:
        "The hash map achieves O(n) time with a single pass. For each element nums[i], we compute its complement as target - nums[i], then check if this complement exists in the map using O(1) hash lookup. We traverse the array only once, and each hash map operation (insert/lookup) is O(1) on average. This gives Time: O(n) and Space: O(n) for the hash map.",
    },
    {
      id: "q-ts-2",
      type: "true-false",
      difficulty: "easy",
      question: "Two Sum with hash map requires O(n) extra space.",
      correctAnswer: "true",
      hints: [
        "The hash map stores each element as we traverse",
        "How many elements can be stored in the worst case?"
      ],
      explanation:
        "This is true. The hash map must store up to n elements in the worst case (when no solution is found until the last element). Each entry stores {value: index}, giving O(n) space complexity. This space-time trade-off is fundamental: we use O(n) space to achieve O(n) time.",
    },
    {
      id: "q-ts-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For input [3, 3] and target 6, what indices does Two Sum return?",
      options: ["[0, 0]", "[0, 1]", "[1, 1]", "[]"],
      correctAnswer: 1,
      hints: [
        "Start at index 0: value is 3, complement = 6 - 3 = 3",
        "Check if complement (3) exists in the map (initially empty)",
        "Move to index 1 and check again"
      ],
      explanation:
        "At index 0, nums[0] = 3, complement = 6 - 3 = 3. Map is empty, so we store {3: 0}. At index 1, nums[1] = 3, complement = 6 - 3 = 3. We find 3 exists in our map at index 0. Since nums[0] + nums[1] = 3 + 3 = 6 = target, we return indices [0, 1].",
    },
    {
      id: "q-ts-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What happens if you sort the array first for Two Sum?",
      options: [
        "O(n) time, O(1) space",
        "O(n log n) time, O(1) space",
        "O(n²) time, O(n) space",
        "O(n) time, O(n) space",
      ],
      correctAnswer: 1,
      hints: [
        "Sorting algorithms have an inherent time complexity",
        "Two pointers works after sorting but has limitations",
        "Original indices vs sorted positions matter for the problem"
      ],
      explanation:
        "The correct answer is O(n log n) time, O(1) space. Sorting takes O(n log n). Two pointers then solve in O(n), but this changes index order. The Two Sum problem requires original indices, not sorted positions. The sorted approach is invalid unless additional bookkeeping is done (requiring O(n) space).",
    },
    {
      id: "q-ts-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why can\'t Two Sum be solved in O(1) space with O(n) time without a hash map?",
      options: [
        "Because we need to store complements",
        "Because sorting changes index order",
        "Because the array might not be sorted",
        "Because of duplicate handling",
      ],
      correctAnswer: 1,
      hints: [
        "O(1) space means we cannot store array elements",
        "What data structure gives O(1) lookup? Without storing elements, how do we find complements?",
        "Sorting would be needed to use two pointers without extra space, but sorting itself costs O(n log n)"
      ],
      explanation:
        "The correct answer is Because sorting changes index order. Without a hash map, we cannot check if a complement exists in O(1) time. Sorting changes original indices, and the problem requires original indices. Without storing elements, we'd need to sort first: O(n log n), or search linearly: O(n^2). Achieving O(n) time requires O(n) space for hash map lookup. This is a fundamental time-space trade-off.",
    },
  ],

  "maximum-subarray": [
    {
      id: "q-ms-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Kadane\'s algorithm has time complexity:",
      options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Single pass through array maintaining current sum and max sum in O(n) time.",
    },
    {
      id: "q-ms-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Kadane\'s algorithm fails when all numbers are:",
      options: ["Positive", "Negative", "Zero", "Mixed"],
      correctAnswer: 1,
      explanation:
        "With all negative numbers, the algorithm must be modified to track the maximum (least negative) rather than resetting.",
    },
    {
      id: "q-ms-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Kadane\'s algorithm works in O(n) time using dynamic programming.",
      correctAnswer: "true",
      explanation:
        "DP formulation: maxEndingHere = max(maxEndingHere + num, num); maxSoFar = max(maxSoFar, maxEndingHere).",
    },
    {
      id: "q-ms-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For [-2,1,-3,4,-1,2,1,-5,4], Kadane\'s algorithm returns:",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation:
        "The max subarray is [4,-1,2,1] with sum = 6. Algorithm tracks maxEndingHere and maxSoFar each step.",
    },
    {
      id: "q-ms-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The divide-and-conquer approach for max subarray runs in:",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Divide array in half, find max in left, right, and crossing subarrays. Recurrence T(n) = 2T(n/2) + O(n) = O(n log n).",
    },
  ],

  "product-except-self": [
    {
      id: "q-pe-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Product Except Self requires O(n) time and O(1) extra space (output array not counted). What is the approach?",
      options: [
        "Division by each element",
        "Prefix and suffix products",
        "Recursion",
        "Sorting",
      ],
      correctAnswer: 1,
      explanation:
        "Compute prefix[i] = product of all elements left of i, suffix[i] = product of all elements right of i. Result[i] = prefix[i] * suffix[i].",
    },
    {
      id: "q-pe-2",
      type: "true-false",
      difficulty: "medium",
      question: "Division approach works when zero is present in the array.",
      correctAnswer: "false",
      explanation:
        "Division fails with zeros because you cannot divide by zero. Prefix/suffix approach handles zeros correctly.",
    },
    {
      id: "q-pe-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For [1,2,3,4], Product Except Self yields:",
      options: ["[24,12,8,6]", "[2,3,4,1]", "[24,12,6,4]", "[6,8,12,24]"],
      correctAnswer: 0,
      explanation: "[2*3*4, 1*3*4, 1*2*4, 1*2*3] = [24, 12, 8, 6]",
    },
    {
      id: "q-pe-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does the prefix/suffix approach handle multiple zeros?",
      options: [
        "Returns zeros for all positions",
        "Returns product excluding all zeros",
        "Requires special handling",
        "Fails with multiple zeros",
      ],
      correctAnswer: 0,
      explanation:
        "If more than one zero exists, all result values are 0 because some element excludes that zero. If exactly one zero, all non-zero positions get product and zero positions get 0.",
    },
    {
      id: "q-pe-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the time complexity of the prefix/suffix approach for Product Except Self?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
      correctAnswer: 2,
      hints: [
        "We make one left-to-right pass and one right-to-left pass",
        "Each element is visited a constant number of times"
      ],
      explanation:
        "Two linear passes: one left-to-right to build prefix products, one right-to-left to multiply in suffix products. Total O(n) time and O(1) extra space (output array excluded).",
    },
  ],

  "rotate-array": [
    {
      id: "q-ra-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Rotating [1,2,3,4,5,6,7] by k=3 yields:",
      options: [
        "[4,5,6,7,1,2,3]",
        "[5,6,7,1,2,3,4]",
        "[3,4,5,6,7,1,2]",
        "[1,2,3,4,5,6,7]",
      ],
      correctAnswer: 0,
      explanation:
        "Rotate right by k: last k elements move to front. k=3: [5,6,7] moves front, giving [5,6,7,1,2,3,4]. Wait - let me reconsider: right rotate by 3 means [1,2,3,4] → end, [5,6,7] → front. Result: [5,6,7,1,2,3,4] (option 1).",
    },
    {
      id: "q-ra-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the optimal time complexity for rotating an array?",
      options: [
        "O(n²)",
        "O(n)",
        "O(n) with O(1) space via reversal",
        "O(log n)",
      ],
      correctAnswer: 2,
      explanation:
        "Reversal algorithm: reverse entire array, reverse first k, reverse last n-k. Total O(n) time, O(1) space.",
    },
    {
      id: "q-ra-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For k > array length, we should:",
      options: [
        "Error",
        "Mod k by array length",
        "Rotate by k anyway",
        "Return original array",
      ],
      correctAnswer: 1,
      explanation:
        "k %= nums.length handles rotation wraparound. Rotating by n+k is same as rotating by k.",
    },
    {
      id: "q-ra-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "Juggling algorithm (cyclic replacements) uses O(1) extra space.",
      correctAnswer: "true",
      explanation:
        "Juggling moves elements in cycles using only a temporary variable. However it requires GCD(n, k) cycles and is more complex than reversal.",
    },
    {
      id: "q-ra-5",
      type: "true-false",
      difficulty: "medium",
      question: "The reversal algorithm for array rotation preserves relative order of elements within each half.",
      correctAnswer: "True",
      hints: [
        "Think about what happens when you reverse a subarray and then reverse it again",
        "After reversing the full array, then reversing each half — do elements within each segment maintain order?"
      ],
      explanation:
        "True. The three-step reversal (reverse all, reverse first k, reverse last n-k) correctly moves the last k elements to the front while maintaining their original order. For example, [1,2,3,4,5] rotated by 2 gives [4,5,1,2,3] — elements 4,5 and 1,2,3 each maintain their relative order.",
    },
  ],

  "contains-duplicate": [
    {
      id: "q-cd-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Time complexity of sorting approach for Contains Duplicate:",
      options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Sorting costs O(n log n), then single pass checks adjacent elements for duplicates.",
    },
    {
      id: "q-cd-2",
      type: "true-false",
      difficulty: "easy",
      question: "Using a hash set gives O(n) time complexity.",
      correctAnswer: "true",
      explanation:
        "Hash set provides O(1) average lookup; if adding finds existing element, duplicate exists.",
    },
    {
      id: "q-cd-3",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Space complexity of hash set approach for Contains Duplicate:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Hash set stores at most n elements in worst case (no duplicates found), giving O(n) space.",
    },
    {
      id: "q-cd-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To check duplicates in a sorted array, you only need:",
      options: ["Hash set", "Two pointers", "Sorting first", "Both A and C"],
      correctAnswer: 1,
      explanation:
        "Since array is sorted, duplicates are adjacent. Single pass O(n) without extra space. No hash set needed.",
    },
    {
      id: "q-cd-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the best time complexity achievable for Contains Duplicate?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 2,
      hints: [
        "A hash set allows O(1) average lookup",
        "We must examine every element at least once"
      ],
      explanation:
        "O(n) is achievable using a hash set. We iterate once and for each element check if it already exists in the set. Hash set gives O(1) average-case insert and lookup, yielding O(n) overall. We cannot do better than O(n) since we must examine all elements.",
    },
  ],

  "longest-common-prefix": [
    {
      id: "q-lcp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'For ["flower", "flow", "flight"], the longest common prefix is:',
      options: ["fl", "flow", "f", "flight"],
      correctAnswer: 0,
      explanation:
        '"fl" is common to all three strings. "flow" doesn\'t match "flight" at position 4.',
    },
    {
      id: "q-lcp-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Vertical scanning approach has worst-case time complexity:",
      options: [
        "O(n log n)",
        "O(n*m) where m is shortest string length",
        "O(n*m)",
        "O(m)",
      ],
      correctAnswer: 2,
      explanation:
        "Vertical scan: check char at position i for all strings. If different or index exceeds any string, stop. O(n*m) worst case.",
    },
    {
      id: "q-lcp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Sorting strings before finding LCP reduces complexity to:",
      options: ["O(n*m)", "O(n*m log n)", "O(m log n)", "O(n log n * m)"],
      correctAnswer: 1,
      explanation:
        "Sorting O(n log n) comparisons, each comparison O(m). Then only compare adjacent strings (2 strings), so O(m) for final comparison.",
    },
    {
      id: "q-lcp-4",
      type: "true-false",
      difficulty: "easy",
      question: "If any string is empty, the LCP is an empty string.",
      correctAnswer: "true",
      explanation:
        'Empty string shares no common prefix with any string (except itself). LCP of ["", "abc"] is "".',
    },
    {
      id: "q-lcp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Trie (prefix tree) approach for LCP has what advantage?",
      options: [
        "Lower time complexity than O(n*m)",
        "O(1) space usage",
        "Efficient for repeated LCP queries on same string set",
        "Handles unicode better"
      ],
      correctAnswer: 2,
      hints: [
        "Building a trie costs O(n*m) upfront",
        "Once built, multiple LCP queries are fast"
      ],
      explanation:
        "Building a trie from all strings costs O(n*m). However, once built, finding the LCP for any subset or answering multiple LCP queries is O(m) per query instead of O(n*m). The trie approach shines when you need to perform many LCP queries on the same string set.",
    },
  ],

  "valid-parentheses": [
    {
      id: "q-vp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What data structure is optimal for Valid Parentheses?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      hints: [
        "We need to remember which opening brackets we\'ve seen",
        "The most recent opening bracket should be matched first",
        "What structure gives you \"most recent\" access?"
      ],
      explanation:
        "Stack is optimal. The LIFO (Last In, First Out) property perfectly matches bracket matching: the most recent opener must be closed first. Push opening brackets, pop and match when closing bracket encountered. Time: O(n), Space: O(n) in worst case.",
    },
    {
      id: "q-vp-2",
      type: "true-false",
      difficulty: "easy",
      question: '"{[()]}" is a valid parentheses string.',
      correctAnswer: "true",
      hints: [
        "Trace through each character",
        "Does every closer match the most recent unclosed opener?",
        "At the end, is the stack empty?"
      ],
      explanation:
        "This is true. Each closer matches its corresponding opener in correct order: { -> }, [ -> ], ( -> ). The stack correctly handles nesting: { [ ( ) ] } is properly nested with each closer matching its corresponding opener.",
    },
    {
      id: "q-vp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Stack approach for Valid Parentheses runs in:",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      hints: [
        "How many characters do we process?",
        "Is each character processed a constant number of times?",
        "What\'s the worst-case space usage?"
      ],
      explanation:
        "O(n) time, O(n) space. Single pass through string of length n. Each character triggers at most one O(1) stack operation. Worst case (all openers), we store all n characters in the stack.",
    },
    {
      id: "q-vp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of these is NOT a valid parentheses string?",
      options: ['"{[()]}"', '"([)]"', '"()[]{}"', '"{{}}"'],
      correctAnswer: 1,
      hints: [
        "Use the stack trace method",
        "What happens when you see ) but stack top is [?",
        "The issue is WRONG NESTING ORDER"
      ],
      explanation:
        "([)] is NOT valid. The problem is wrong nesting order. When ) appears, the stack top is [ (not (). Mismatch! The stack reveals this immediately. {[()]}, ((())), and {}[]{} are all valid.",
    },
    {
      id: "q-vp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Empty string is considered:",
      options: ["Valid", "Invalid", "Depends on implementation", "Neither"],
      correctAnswer: 0,
      hints: [
        "Think about the definition of \"balanced\"",
        "Does an empty string have any mismatches?",
        "There\'s no way to find a problem with an empty string"
      ],
      explanation:
        "Valid. The empty string is vacuously true - it contains no brackets, so it cannot have any mismatched pairs. Every closer matches its opener, nesting is correct, and stack is empty at end.",
    },
  ],

  // ── LINKED LISTS ─────────────────────────────────────────────────────
  "reverse-linked-list": [
    {
      id: "q-rll-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Iterative reversal of a linked list uses how many pointers?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      hints: [
        "We need to track the node before current (prev)",
        "We need to track the current node being reversed (curr)",
        "Why do we need a third pointer?"
      ],
      explanation:
        "Iterative reversal uses 3 pointers: prev, curr, and next. When we reverse a link (curr.next = prev), we lose access to curr.next. Without saving this in a 'next' pointer, we would have no way to advance through the list. The algorithm: save next, reverse link, advance all pointers. Time: O(n), Space: O(1).",
    },
    {
      id: "q-rll-2",
      type: "true-false",
      difficulty: "easy",
      question: "Recursive linked list reversal uses O(n) stack space.",
      correctAnswer: "true",
      hints: [
        "Each recursive call creates a stack frame",
        "How many recursive calls are made for n nodes?",
        "What data is stored in each stack frame?"
      ],
      explanation:
        "This is true. For n nodes, we make n recursive calls, each adding a frame to the call stack. At any moment, we have n stack frames active. Space: O(n) for the call stack. The iterative approach achieves O(1) space but recursion uses linear space.",
    },
    {
      id: "q-rll-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time complexity of reversing a linked list iteratively:",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      hints: [
        "How many nodes do we visit?",
        "Is there any nested looping?",
        "Can we do better than visiting each node once?"
      ],
      explanation:
        "O(n). We make a single pass through all n nodes. Each iteration does O(1) work (save next, reverse, advance pointers). Since we visit each node exactly once, this is optimal - no algorithm can do better than O(n) since we must examine each node at least once.",
    },
    {
      id: "q-rll-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "After reversing, if head was 1→2→3→4→5, the new head becomes:",
      options: ["Node 1", "Node 5", "Node with value 4", "Null"],
      correctAnswer: 1,
      hints: [
        "Draw the reversal process step by step",
        "What happens to the first node's next pointer?",
        "What node points to null after reversal?"
      ],
      explanation:
        "Node 5 (the last node) becomes the new head. After reversal: NULL <- 1 <- 2 <- 3 <- 4 <- 5. The original head (Node 1) now points to NULL, and Node 5 is at the start of the reversed chain.",
    },
    {
      id: "q-rll-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "You can reverse a sublist of a linked list without reversing the entire list.",
      correctAnswer: "true",
      hints: [
        "Think about identifying the boundaries of the sublist",
        "You can disconnect the sublist, reverse it, then reconnect",
        "What data structure helps track positions in a linked list?"
      ],
      explanation:
        "This is true. We locate the node before the sublist start (startPrev), disconnect it, reverse just the sublist portion, then reconnect. For example, reversing nodes 2 to 4 in 1 -> 2 -> 3 -> 4 -> 5 gives 1 -> 4 -> 3 -> 2 -> 5.",
    },
  ],

  "detect-cycle": [
    {
      id: "q-dc-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Floyd\'s cycle detection uses:",
      options: ["Two stacks", "Two pointers", "Hash set", "Sorting"],
      correctAnswer: 1,
      hints: [
        "Think about relative speeds",
        "What if one pointer moves faster than the other?",
        "The \"tortoise and hare\" analogy might help"
      ],
      explanation:
        "Floyd\'s algorithm uses two pointers moving at different speeds (Tortoise and Hare). Slow moves 1 step, fast moves 2 steps. If there is a cycle, fast will lap slow and they must meet. Time: O(n), Space: O(1). No extra memory needed.",
    },
    {
      id: "q-dc-2",
      type: "true-false",
      difficulty: "easy",
      question: "Hash set approach detects cycles in O(n) time and O(n) space.",
      correctAnswer: "true",
      hints: [
        "What data structure lets us check if we\'ve visited a node before?",
        "How many nodes can we visit in the worst case?",
        "What\'s the trade-off compared to Floyd\'s algorithm?"
      ],
      explanation:
        "This is true. The hash set approach achieves O(n) time but requires O(n) space. We visit each node, add to set if not seen, or return true if already seen. In worst case (no cycle), we store all n nodes. Floyd\'s is space-optimal O(1) but hash set is simpler.",
    },
    {
      id: "q-dc-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Floyd\'s algorithm time complexity:",
      options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
      correctAnswer: 1,
      hints: [
        "Think about how many iterations until meeting",
        "The cycle length and distance to cycle entrance matter",
        "Can pointers loop forever without meeting?"
      ],
      explanation:
        "O(n). Let u = distance from head to cycle entrance, k = cycle length. When slow enters the cycle (after u steps), fast is already inside. Fast gains 1 step on slow per iteration. They meet after at most k more iterations. Total: u + k <= 2n = O(n).",
    },
    {
      id: "q-dc-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If slow and fast meet inside a cycle, how do you find cycle length?",
      options: [
        "Keep fast stationary, move slow",
        "Count nodes from meeting point until back",
        "Binary search",
        "Calculate distance to head",
      ],
      correctAnswer: 1,
      hints: [
        "Once meeting occurs, both pointers are in the cycle",
        "Think about traversing the cycle until you return to the start",
        "One full loop around the cycle brings you back to the same node"
      ],
      explanation:
        "From the meeting point, keep one pointer stationary and move the other until it returns to the same node, counting steps. This count is the cycle length k. For example, if meeting at M and traversing M -> A -> B -> C -> M, the cycle length is 4.",
    },
    {
      id: "q-dc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "To find cycle start node with Floyd\'s, after meeting, move one pointer to head and:",
      options: [
        "Keep other pointer stationary",
        "Move both one step at a time",
        "Move fast one step",
        "Reset both",
      ],
      correctAnswer: 1,
      hints: [
        "After meeting, one pointer is at the meeting point, one at head",
        "They need to meet at the cycle entrance",
        "Think about distances: both should travel the same distance"
      ],
      explanation:
        "Move both one step at a time. When they meet again, that\'s the cycle entrance. Mathematically, if u = distance to cycle entrance and k = cycle length, after u moves both pointers meet at the entrance. Pointer from head travels u steps, pointer from meeting point also travels u steps to reach the entrance.",
    },
  ],

  "merge-sorted-lists": [
    {
      id: "q-msl-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Merging two sorted linked lists uses:",
      options: ["Two stacks", "Two pointers", "Recursion only", "Sorting"],
      correctAnswer: 1,
      explanation:
        "Compare heads of both lists, attach smaller to result, advance that pointer. O(n+m) time.",
    },
    {
      id: "q-msl-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Time complexity to merge k sorted lists of average length n:",
      options: ["O(kn)", "O(n log k)", "O(kn log k)", "O(k + n)"],
      correctAnswer: 1,
      explanation:
        "Min-heap of size k gives O(n log k) total. Each of n elements is pushed/popped from heap of size k.",
    },
    {
      id: "q-msl-3",
      type: "true-false",
      difficulty: "medium",
      question: "Divide and conquer merging k lists takes O(n log k) time.",
      correctAnswer: "true",
      explanation:
        "Pair up lists, merge each pair. Next round has k/2 lists, continue until one remains. log k rounds × O(n) per merge = O(n log k).",
    },
    {
      id: "q-msl-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For [1,2,4] and [1,3,4], merge result is:",
      options: ["[1,1,2,3,4,4]", "[1,2,3,4]", "[1,4,3,2,1,4]", "[1,1,4,4,2,3]"],
      correctAnswer: 0,
      explanation:
        "Both lists sorted. Compare heads: 1 vs 1 (equal, pick either), then 2 vs 3, then 4 vs 3, then 4 vs 4. Result: [1,1,2,3,4,4].",
    },
    {
      id: "q-msl-5",
      type: "true-false",
      difficulty: "easy",
      question: "Merging two sorted linked lists of lengths m and n requires O(m+n) space.",
      correctAnswer: "False",
      hints: [
        "Are we creating new nodes or rewiring existing ones?",
        "In-place merging just changes the next pointers"
      ],
      explanation:
        "False. We can merge in-place by rewiring the next pointers of existing nodes, using O(1) extra space (just two pointers). No new nodes need to be allocated. Time is O(m+n) but space is O(1).",
    },
  ],

  "remove-nth-node": [
    {
      id: "q-rnn-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "To remove nth node from end, you need:",
      options: ["Single pass", "Two passes", "Three passes", "Binary search"],
      correctAnswer: 1,
      explanation:
        "First pass finds length. Second pass removes node at position len-n+1 from start. Or use two pointers (one pass).",
    },
    {
      id: "q-rnn-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Two-pointer approach to remove nth from end:",
      options: [
        "Both pointers move at same speed",
        "Fast pointer is n+1 ahead",
        "Fast pointer is n ahead",
        "Slow pointer is n ahead",
      ],
      correctAnswer: 1,
      explanation:
        "Fast pointer starts n+1 ahead. When fast reaches end, slow is at node before target. Delete slow.next.",
    },
    {
      id: "q-rnn-3",
      type: "true-false",
      difficulty: "medium",
      question: "Dummy head node simplifies edge case of removing head.",
      correctAnswer: "true",
      explanation:
        "Dummy.next = head. If removing first node, just dummy.next = dummy.next.next. No special case for head.",
    },
    {
      id: "q-rnn-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For 1→2→3→4→5, remove 2nd from end gives:",
      options: ["1→2→3→4", "1→2→4→5", "1→3→4→5", "2→3→4→5"],
      correctAnswer: 2,
      explanation:
        "2nd from end is node with value 4. Remove it: 1→2→3→5. Wait, remove 2nd from end means position 2 in [5,4,3,2,1] = node 4.",
    },
    {
      id: "q-rnn-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the time complexity of the two-pointer approach to remove nth node from end?",
      options: ["O(n²)", "O(n)", "O(log n)", "O(1)"],
      correctAnswer: 1,
      hints: [
        "We make a single pass through the list",
        "Both fast and slow pointers traverse at most n nodes total"
      ],
      explanation:
        "O(n). The fast pointer advances n+1 steps ahead, then both move simultaneously until fast hits the end. Total traversal is at most n steps. This is more efficient than two passes since it only traverses the list once.",
    },
  ],

  "palindrome-linked-list": [
    {
      id: "q-pll-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "To check palindrome in linked list, you can:",
      options: [
        "Compare head and tail only",
        "Reverse and compare",
        "Use stack only",
        "Sort and compare",
      ],
      correctAnswer: 1,
      explanation:
        "Reverse the second half and compare with first half. If same, palindrome.",
    },
    {
      id: "q-pll-2",
      type: "true-false",
      difficulty: "medium",
      question: "Stack approach for palindrome uses O(n) extra space.",
      correctAnswer: "true",
      explanation:
        "Push all values to stack, then compare while popping. O(n) time and space.",
    },
    {
      id: "q-pll-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To find palindrome without reversing:",
      options: [
        "Impossible",
        "Use recursion stack",
        "Use two pointers from center",
        "Use hash map",
      ],
      correctAnswer: 1,
      explanation:
        "Recursive approach reverses as it returns, comparing with original traversal. Still O(n) space for call stack.",
    },
    {
      id: "q-pll-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Is 1→2→1 a palindrome?",
      options: ["Yes", "No", "Depends on list length", "Cannot determine"],
      correctAnswer: 0,
      explanation:
        "Reading forward: 1,2,1. Reading backward: 1,2,1. Same in both directions → palindrome.",
    },
    {
      id: "q-pll-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the optimal space complexity for palindrome linked list check?",
      options: ["O(n)", "O(n/2)", "O(log n)", "O(1)"],
      correctAnswer: 3,
      hints: [
        "Is it possible to check without storing any extra data?",
        "Think about reversing the second half in-place"
      ],
      explanation:
        "O(1) space is achievable. Use slow/fast pointers to find the middle, reverse the second half in-place, compare with the first half, then optionally restore the second half. This requires only a constant number of pointer variables.",
    },
  ],

  // ── STACKS & QUEUES ──────────────────────────────────────────────────
  "balanced-parentheses": [
    {
      id: "q-bp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Balanced Parentheses uses what data structure?",
      options: ["Queue", "Stack", "Array", "Heap"],
      correctAnswer: 1,
      explanation:
        "Push opening brackets, pop and verify match for closing. LIFO ensures correct nesting order.",
    },
    {
      id: "q-bp-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Time complexity of Balanced Parentheses:",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Single pass through string of length n. O(n) time, O(n) worst-case space for stack.",
    },
    {
      id: "q-bp-3",
      type: "true-false",
      difficulty: "easy",
      question: "Stack empty at end means parentheses are balanced.",
      correctAnswer: "true",
      explanation:
        "Every opening bracket was matched with a closing bracket. Empty stack + not rejected = balanced.",
    },
    {
      id: "q-bp-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which string is NOT balanced?",
      options: ['"{[()]}"', '"((()))"', '"([)]"', '"{}[]()[]"'],
      correctAnswer: 2,
      explanation:
        '"([)]" has wrong nesting order. When ")" appears, top of stack is "[", not "(". Mismatch detected.',
    },
    {
      id: "q-bp-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'For "({[]})", the sequence of stack operations:',
      options: [
        "Push all, pop all",
        "Push/pop at each char",
        "Alternate push/pop",
        "Push then conditional pop",
      ],
      correctAnswer: 1,
      explanation:
        "Each character processed: push opening, pop and match closing. Result: stack empty at end.",
    },
  ],

  "min-stack": [
    {
      id: "q-mns-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Design a MinStack that supports O(1) getMin(). Best approach:",
      options: [
        "Single stack with min variable",
        "Two stacks (values + mins)",
        "Single stack of (value, min) pairs",
        "Heap",
      ],
      correctAnswer: 2,
      explanation:
        "Push (value, currentMin) as pair. getMin() returns top.min in O(1). Space O(n) worst case.",
    },
    {
      id: "q-mns-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using two stacks, the min stack tracks all minima historically.",
      correctAnswer: "true",
      explanation:
        "Push to min stack only when new value <= current min. Pop both stacks when value equals min.",
    },
    {
      id: "q-mns-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For MinStack with push(5), push(3), push(7), getMin(), push(2), getMin():",
      options: ["3, 2", "3, 3", "2, 2", "5, 2"],
      correctAnswer: 0,
      explanation:
        "After pushes: stack [5,3,7], min=3. After push(2): stack [5,3,7,2], min=2.",
    },
    {
      id: "q-mns-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When popping from MinStack, when do you pop from min stack?",
      options: [
        "Always",
        "When popped value equals min stack top",
        "Never",
        "When min changes",
      ],
      correctAnswer: 1,
      explanation:
        "If popped value equals current min (top of min stack), pop from min stack too. This reveals previous min.",
    },
    {
      id: "q-mns-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the space complexity of the MinStack with (value, min) pairs?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      hints: [
        "Each push adds one entry to the stack",
        "n push operations create n stack entries"
      ],
      explanation:
        "O(n). Each push stores a (value, currentMin) pair. With n push operations, the stack holds n pairs. This is a space trade-off for O(1) getMin(). The two-stack variant also uses O(n) total space since the min-stack stores at most n entries.",
    },
  ],

  "implement-queue": [
    {
      id: "q-iq-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Queue with two stacks: enqueue is:",
      options: ["O(1)", "O(n)", "O(log n)", "Amortized O(1)"],
      correctAnswer: 3,
      explanation:
        "enqueue: push to stack1 (O(1)). dequeue: if stack2 empty, transfer all from stack1 (O(n)) then pop (amortized O(1) since n pops per n pushes).",
    },
    {
      id: "q-iq-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "With two stacks, the order of elements is preserved correctly.",
      correctAnswer: "true",
      explanation:
        "stack1: [front,...,back] for enqueue. Transfer to stack2 reverses: [back,...,front] for dequeue. FIFO maintained.",
    },
    {
      id: "q-iq-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If stack1 has [1,2,3] (1=front), and we dequeue, stack2 becomes:",
      options: ["[3,2,1]", "[1,2,3]", "[ ]", "[1]"],
      correctAnswer: 0,
      explanation:
        "Transfer from stack1 to stack2 reverses order. stack2 top (pop order): [3,2,1] so dequeue returns 1.",
    },
    {
      id: "q-iq-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Why not just use one stack?",
      options: [
        "Cannot maintain order",
        "O(n) dequeue is inefficient",
        "Both A and B",
        "Memory waste",
      ],
      correctAnswer: 2,
      explanation:
        "Single stack requires O(n) to dequeue (reverse entire stack). Two stacks achieve amortized O(1).",
    },
    {
      id: "q-iq-5",
      type: "true-false",
      difficulty: "medium",
      question: "In the two-stack queue, elements may be transferred from stack1 to stack2 multiple times.",
      correctAnswer: "False",
      hints: [
        "Once an element moves to stack2, when does it come back to stack1?",
        "Elements only flow in one direction: stack1 then stack2 then out"
      ],
      explanation:
        "False. Each element is transferred from stack1 to stack2 exactly once. After transfer, elements are dequeued (popped) from stack2 and never return to stack1. This one-way flow is why the amortized cost per operation is O(1): each element is pushed once, transferred once, and popped once.",
    },
  ],

  "next-greater-element": [
    {
      id: "q-nge-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Next Greater Element uses what data structure?",
      options: ["Queue", "Stack", "Array", "Heap"],
      correctAnswer: 1,
      explanation:
        "Stack maintains candidates in decreasing order. When greater element found, it is next greater for all popped elements.",
    },
    {
      id: "q-nge-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For [2,1,5,3,4], next greater for position 0 (value 2):",
      options: ["1", "5", "3", "4"],
      correctAnswer: 1,
      explanation:
        "Scanning right from index 0, 1 is smaller than 2, 5 is first greater. So NGE(2) = 5.",
    },
    {
      id: "q-nge-3",
      type: "true-false",
      difficulty: "medium",
      question: "If no greater element exists, return -1.",
      correctAnswer: "true",
      explanation:
        "Elements never popped from stack have no greater element to their right. Default value is -1.",
    },
    {
      id: "q-nge-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For [1,2,3,4], all next greater elements are:",
      options: ["[2,3,4,-1]", "[2,3,4,4]", "[-1,-1,-1,-1]", "[2,3,4,None]"],
      correctAnswer: 0,
      explanation:
        "Each element\'s next greater is the next element. Last element has no greater, returns -1.",
    },
    {
      id: "q-nge-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Time complexity of Next Greater Element:",
      options: ["O(n²)", "O(n)", "O(n log n)", "O(n) amortized"],
      correctAnswer: 3,
      explanation:
        "Each element pushed and popped at most once. Overall O(n) time, each operation amortized O(1).",
    },
    {
      id: "q-nge-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For a circular array [1,2,1], next greater for index 2 (value 1) is:",
      options: ["-1", "1", "2", "None"],
      correctAnswer: 2,
      hints: [
        "In a circular array, after the last element we wrap around to index 0",
        "From index 2 (value 1), look at index 0 (value 1), then index 1 (value 2)"
      ],
      explanation:
        "In a circular array, we wrap around. Starting from index 2 (value 1): next is index 0 (value 1, not greater), then index 1 (value 2, which IS greater). So the answer is 2. We can handle circular arrays by iterating 2n times with index % n.",
    },
    {
      id: "q-nge-7",
      type: "true-false",
      difficulty: "hard",
      question: "The monotonic stack for Next Greater Element maintains elements in strictly decreasing order.",
      correctAnswer: "True",
      hints: [
        "Think about what happens when we push a new element that equals the stack top",
        "When we pop elements, what condition must the new element satisfy?"
      ],
      explanation:
        "True. The stack is monotonically decreasing from bottom to top. When we encounter a new element, we pop all elements from the stack that are smaller than (or equal to, in the strict version) the current element. The remaining stack elements are all greater than the current element, maintaining the decreasing property.",
    },
    {
      id: "q-nge-8",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Space complexity of Next Greater Element using monotonic stack:",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      hints: [
        "In the worst case, how many elements could be on the stack?",
        "Consider a strictly decreasing input array"
      ],
      explanation:
        "O(n). In the worst case (e.g., a strictly decreasing array like [5,4,3,2,1]), every element gets pushed onto the stack before any gets popped. The stack can hold all n elements simultaneously. The result array also uses O(n) space.",
    },
  ],
};

registerQuestions(questions);
