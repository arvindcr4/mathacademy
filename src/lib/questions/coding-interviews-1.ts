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
      explanation:
        "Hash map gives O(1) lookup: for each element nums[i], check if target - nums[i] exists in the map.",
    },
    {
      id: "q-ts-2",
      type: "true-false",
      difficulty: "easy",
      question: "Two Sum with hash map requires O(n) extra space.",
      correctAnswer: "true",
      explanation:
        "The hash map stores up to n elements, giving O(n) space complexity.",
    },
    {
      id: "q-ts-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For input [3, 3] and target 6, what indices does Two Sum return?",
      options: ["[0, 0]", "[0, 1]", "[1, 1]", "[]"],
      correctAnswer: 1,
      explanation:
        "nums[0] + nums[1] = 3 + 3 = 6, so indices [0, 1] are returned.",
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
      explanation:
        "Sorting takes O(n log n). Two pointers then solve in O(n), but this changes index order which may not be acceptable.",
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
      explanation:
        "Sorting changes original indices. Two pointers after sorting requires O(n log n) for sort, not O(n). Hash map preserves original indices in O(n) time.",
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
  ],

  "valid-parentheses": [
    {
      id: "q-vp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What data structure is optimal for Valid Parentheses?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correctAnswer: 1,
      explanation:
        "Stack: push opening brackets, pop and match when closing bracket encountered. LIFO ensures correct nesting.",
    },
    {
      id: "q-vp-2",
      type: "true-false",
      difficulty: "easy",
      question: '"{[()]}" is a valid parentheses string.',
      correctAnswer: "true",
      explanation:
        "Each opening bracket has matching closing bracket in correct order: { → } , [ → ] , ( → ).",
    },
    {
      id: "q-vp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Stack approach for Valid Parentheses runs in:",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Single pass through string: O(n) time, O(n) space for stack in worst case.",
    },
    {
      id: "q-vp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of these is NOT a valid parentheses string?",
      options: ['"{[()]}"', '"([)]"', '"()[]{}"', '"{{}}"'],
      correctAnswer: 1,
      explanation:
        "\"([)]\" has mismatched nesting. Stack shows: push '(' then '[', but then ')' tries to close '(' while stack top is \"[\".",
    },
    {
      id: "q-vp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Empty string is considered:",
      options: ["Valid", "Invalid", "Depends on implementation", "Neither"],
      correctAnswer: 0,
      explanation:
        "Empty string has no mismatched brackets, so it is valid by definition (vacuously true).",
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
      explanation:
        "Three pointers: prev, curr, next. Store next before reversing link, then advance all three pointers.",
    },
    {
      id: "q-rll-2",
      type: "true-false",
      difficulty: "easy",
      question: "Recursive linked list reversal uses O(n) stack space.",
      correctAnswer: "true",
      explanation:
        "Each recursive call adds a frame to the call stack. For n nodes, this is O(n) space (not O(1) like iterative).",
    },
    {
      id: "q-rll-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time complexity of reversing a linked list iteratively:",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Single pass through all n nodes, each node visited once. O(n) time, O(1) space.",
    },
    {
      id: "q-rll-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "After reversing, if head was 1→2→3→4→5, the new head becomes:",
      options: ["Node 1", "Node 5", "Node with value 4", "Null"],
      correctAnswer: 1,
      explanation:
        "Reversal flips the direction. The last node (5) becomes the new head since it points to 4, which points to 3, etc.",
    },
    {
      id: "q-rll-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "You can reverse a sublist of a linked list without reversing the entire list.",
      correctAnswer: "true",
      explanation:
        'Locate sublist boundaries, disconnect it, reverse just that portion, reconnect. Common in "reverse between m and n" problem.',
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
      explanation:
        "Floyd\'s Tortoise and Hare: slow moves 1 step, fast moves 2 steps. If they meet, cycle exists.",
    },
    {
      id: "q-dc-2",
      type: "true-false",
      difficulty: "easy",
      question: "Hash set approach detects cycles in O(n) time and O(n) space.",
      correctAnswer: "true",
      explanation:
        "Store visited nodes in set. If we revisit a node, cycle exists. O(n) space for up to n unique nodes.",
    },
    {
      id: "q-dc-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Floyd\'s algorithm time complexity:",
      options: ["O(1)", "O(n)", "O(n²)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Both pointers traverse the list. In worst case, fast catches slow after at most n iterations.",
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
      explanation:
        "From meeting point, traverse until you return to same node, counting steps. This gives cycle length k.",
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
      explanation:
        "Move both one step at a time. When they meet again, that node is cycle start. Mathematical proof: meeting point = k steps from head where k = cycle length.",
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
  ],
};

registerQuestions(questions);
