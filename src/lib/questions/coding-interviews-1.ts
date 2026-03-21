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
      correctAnswer: "True",
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
    {
      id: "q-ts-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Two Sum, what if the same number appears twice and target = 2 * num?",
      options: [
        "Hash map approach fails",
        "Must use two-pointer approach",
        "Store index in map; verify complement index differs from current",
        "No special handling needed"
      ],
      correctAnswer: 2,
      hints: [
        "If nums[i] == target - nums[i], the complement is the number itself",
        "Storing the index lets us verify we use two different positions"
      ],
      explanation:
        "Store value-to-index mappings. When the complement is found, verify the stored index differs from the current index i. Example: nums=[3,3], target=6. At i=0, complement=3 not in map, store {3:0}. At i=1, complement=3 found at index 0, and 0 != 1, so return [0,1].",
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
            hints: [
        'Think about how many times we iterate through the array',
        'Is there any nested looping or do we do constant work per element?',
      ],
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
            hints: [
        'What happens when all numbers are negative and we reset maxEndingHere to 0?',
        'The standard version that resets to 0 misses the case where max subarray is all negative',
      ],
explanation:
        "With all negative numbers, the algorithm must be modified to track the maximum (least negative) rather than resetting.",
    },
    {
      id: "q-ms-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Kadane\'s algorithm works in O(n) time using dynamic programming.",
      correctAnswer: "True",
            hints: [
        'What does DP mean for array problems?',
        'Is maxEndingHere at position i dependent only on maxEndingHere at position i-1?',
      ],
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
            hints: [
        'Trace through: at each index, compute maxEndingHere = max(prev + nums[i], nums[i])',
        'Track maxSoFar as the running maximum',
      ],
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
            hints: [
        'What is the recurrence for divide-and-conquer on arrays?',
        'Apply the Master Theorem: T(n) = 2T(n/2) + O(n)',
      ],
explanation:
        "Divide array in half, find max in left, right, and crossing subarrays. Recurrence T(n) = 2T(n/2) + O(n) = O(n log n).",
    },
    {
      id: "q-ms-6",
      type: "true-false",
      difficulty: "easy",
      question: "Kadane's algorithm can also track the start and end indices of the maximum subarray.",
      correctAnswer: "True",
      hints: [
        "When maxEndingHere resets (starts a new subarray), record the new candidate start index",
        "When maxSoFar is updated, record the current index as the end index"
      ],
      explanation:
        "True. We track startTemp (candidate start) that resets when we begin a new subarray, and update start/end whenever maxSoFar improves. This adds only O(1) overhead while maintaining O(n) time and O(1) space.",
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
            hints: [
        'Consider what information you need for each position',
        'Prefix products give everything to the left; suffix products give everything to the right',
      ],
explanation:
        "Compute prefix[i] = product of all elements left of i, suffix[i] = product of all elements right of i. Result[i] = prefix[i] * suffix[i].",
    },
    {
      id: "q-pe-2",
      type: "true-false",
      difficulty: "medium",
      question: "Division approach works when zero is present in the array.",
      correctAnswer: "False",
            hints: [
        'What happens mathematically when you divide by zero?',
        'Think about an array like [1, 0, 2]',
      ],
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
            hints: [
        'Result[0] = 2*3*4 (everything except nums[0])',
        'Compute prefix and suffix products and multiply them',
      ],
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
            hints: [
        'When two zeros exist, every position\'s product includes at least one zero',
        'A product that includes zero is always zero',
      ],
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
            hints: [
        'Right rotation by k moves the last k elements to the front',
        'Rotating [1,2,3,4,5,6,7] by 3 moves elements 5,6,7 to the front',
      ],
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
            hints: [
        'We must visit every element at least once',
        'Think about the reversal trick: reverse entire, then each half',
      ],
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
            hints: [
        'What does rotating by n+k give compared to rotating by k?',
        'Rotation is periodic with period n',
      ],
explanation:
        "k %= nums.length handles rotation wraparound. Rotating by n+k is same as rotating by k.",
    },
    {
      id: "q-ra-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "Juggling algorithm (cyclic replacements) uses O(1) extra space.",
      correctAnswer: "True",
            hints: [
        'Does the juggling algorithm allocate any extra arrays?',
        'How many variables does it use?',
      ],
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
    {
      id: "q-ra-6",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Rotating an array of length 7 by k=7 results in:",
      options: [
        "All zeros",
        "The original array",
        "Reversed array",
        "Undefined behavior"
      ],
      correctAnswer: 1,
      hints: [
        "What does k % n equal when k equals n?",
        "Rotating by the array's own length brings everything back to its original position"
      ],
      explanation:
        "The original array. Since k % n = 7 % 7 = 0, rotation by 0 is a no-op. Every element returns to its starting position. This is why we always compute k = k % n before rotating — any multiple of n is equivalent to no rotation.",
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
            hints: [
        'What is the time complexity of sorting?',
        'After sorting, how do we check for duplicates?',
      ],
explanation:
        "Sorting costs O(n log n), then single pass checks adjacent elements for duplicates.",
    },
    {
      id: "q-cd-2",
      type: "true-false",
      difficulty: "easy",
      question: "Using a hash set gives O(n) time complexity.",
      correctAnswer: "True",
            hints: [
        'What is the average-case time complexity of hash set lookup?',
        'How many elements do we process?',
      ],
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
            hints: [
        'In the worst case (no duplicates), how many elements are in the set?',
        'The set holds all elements that haven\'t been seen before',
      ],
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
            hints: [
        'In a sorted array, where are duplicate elements located relative to each other?',
        'Can we check neighbors without extra space?',
      ],
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
            hints: [
        'Check character by character: \'f\' matches for all three, \'l\' matches for all three...',
        'What is the first character where two strings disagree?',
      ],
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
            hints: [
        'How many characters could we check in the worst case?',
        'Think about n strings each of length m',
      ],
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
            hints: [
        'After sorting, the lexicographically smallest and largest strings differ the most',
        'Why do only the first and last sorted strings need to be compared?',
      ],
explanation:
        "Sorting O(n log n) comparisons, each comparison O(m). Then only compare adjacent strings (2 strings), so O(m) for final comparison.",
    },
    {
      id: "q-lcp-4",
      type: "true-false",
      difficulty: "easy",
      question: "If any string is empty, the LCP is an empty string.",
      correctAnswer: "True",
            hints: [
        'An empty string has length 0',
        'You can\'t share any characters with a string of length 0',
      ],
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
      correctAnswer: "True",
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
    {
      id: "q-vp-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the minimum number of bracket additions to make ')((' valid?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      hints: [
        "Count unmatched closing brackets and unmatched opening brackets separately",
        "Each unmatched ) needs one ( added before it; each unmatched ( needs one ) added after"
      ],
      explanation:
        "3 additions needed. Trace: ) has no opener (unmatched closer, +1 addition), ( has no closer, ( has no closer (+2 additions for unmatched openers). Total = 1 + 2 = 3. The general formula: additions = unmatched_closers + unmatched_openers.",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
      hints: [
        "Think about identifying the boundaries of the sublist",
        "You can disconnect the sublist, reverse it, then reconnect",
        "What data structure helps track positions in a linked list?"
      ],
      explanation:
        "This is true. We locate the node before the sublist start (startPrev), disconnect it, reverse just the sublist portion, then reconnect. For example, reversing nodes 2 to 4 in 1 -> 2 -> 3 -> 4 -> 5 gives 1 -> 4 -> 3 -> 2 -> 5.",
    },
    {
      id: "q-rll-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the space complexity of the recursive approach to reverse a linked list?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      hints: [
        "Each recursive call uses stack frame memory",
        "How deep does the recursion go for a list of n nodes?"
      ],
      explanation:
        "O(n) space due to the call stack. For a list of n nodes, the recursion goes n levels deep before hitting the base case. Each level holds a stack frame with a reference to the current node. The iterative approach uses O(1) space, making it preferable when memory is constrained.",
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
      correctAnswer: "True",
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
    {
      id: "q-dc-6",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does Floyd's algorithm return when there is NO cycle?",
      options: [
        "The last node",
        "null (fast pointer reaches end of list)",
        "The middle node",
        "The head node"
      ],
      correctAnswer: 1,
      hints: [
        "Fast pointer moves 2 steps at a time through the list",
        "In an acyclic list, fast pointer eventually falls off the end"
      ],
      explanation:
        "When there is no cycle, the fast pointer reaches the end of the list (null). The while loop condition fast != null && fast.next != null fails, and we return false/null. There is no cycle to bring the fast pointer back around.",
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
            hints: [
        'Both lists are sorted, so the minimum is always at one of the two heads',
        'Which pointer do we advance after picking an element?',
      ],
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
            hints: [
        'A min-heap of size k lets us efficiently find the minimum across k lists',
        'Each heap operation costs O(log k)',
      ],
explanation:
        "Min-heap of size k gives O(n log k) total. Each of n elements is pushed/popped from heap of size k.",
    },
    {
      id: "q-msl-3",
      type: "true-false",
      difficulty: "medium",
      question: "Divide and conquer merging k lists takes O(n log k) time.",
      correctAnswer: "True",
            hints: [
        'After round 1, we have k/2 lists. After round 2, k/4 lists...',
        'How many rounds until one list remains?',
      ],
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
            hints: [
        'Compare heads at each step and pick the smaller',
        'Trace: compare 1 and 1, then 2 and 1, then 2 and 3...',
      ],
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
            hints: [
        'The first pass determines the list length n',
        'The target node is at position n - k + 1 from the start',
      ],
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
            hints: [
        'If fast is n+1 ahead and we move both until fast reaches null...',
        'Where is slow when fast.next == null?',
      ],
explanation:
        "Fast pointer starts n+1 ahead. When fast reaches end, slow is at node before target. Delete slow.next.",
    },
    {
      id: "q-rnn-3",
      type: "true-false",
      difficulty: "medium",
      question: "Dummy head node simplifies edge case of removing head.",
      correctAnswer: "True",
            hints: [
        'What happens when the node to delete is the original head?',
        'Dummy.next = head lets us handle the head case uniformly',
      ],
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
            hints: [
        'Count from the end: position 1 is node 5, position 2 is node 4',
        'The node to remove has value 4',
      ],
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
            hints: [
        'A palindrome reads the same forwards and backwards',
        'If we reverse the second half, it should equal the first half',
      ],
explanation:
        "Reverse the second half and compare with first half. If same, palindrome.",
    },
    {
      id: "q-pll-2",
      type: "true-false",
      difficulty: "medium",
      question: "Stack approach for palindrome uses O(n) extra space.",
      correctAnswer: "True",
            hints: [
        'We push all n values and then compare by popping',
        'How much memory does the stack use?',
      ],
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
            hints: [
        'Recursion builds a call stack as it goes deeper',
        'As recursion unwinds, we can compare the left side (from parameters) with the right side',
      ],
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
            hints: [
        'Write out the sequence: 1, 2, 1',
        'Is this the same forwards and backwards?',
      ],
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
            hints: [
        'Which data structure has LIFO access?',
        'The most recently seen opener should be matched first',
      ],
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
            hints: [
        'How many characters does a single pass process?',
        'Is each character processed a constant number of times?',
      ],
explanation:
        "Single pass through string of length n. O(n) time, O(n) worst-case space for stack.",
    },
    {
      id: "q-bp-3",
      type: "true-false",
      difficulty: "easy",
      question: "Stack empty at end means parentheses are balanced.",
      correctAnswer: "True",
            hints: [
        'If every opener was matched with a closer, what does the stack look like at the end?',
        'What does an empty stack signify?',
      ],
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
            hints: [
        'Trace through "([)]" using a stack',
        'When ) appears, what is on top of the stack?',
      ],
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
            hints: [
        'Think about what happens at each character, not at the end',
        'Do we wait until the end to pop?',
      ],
explanation:
        "Each character processed: push opening, pop and match closing. Result: stack empty at end.",
    },
    {
      id: "q-bp-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the minimum number of bracket removals to make '(()' valid?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      hints: [
        "Trace through using a counter for unmatched openers",
        "How many opening brackets remain unmatched at the end?"
      ],
      explanation:
        "1 removal needed. Trace: first ( unmatched (+1), second ( unmatched (+2), ) matches the second ( (-1, count=1). At the end, 1 unmatched opener remains. Removing it gives () which is valid. The answer is the number of unmatched opening brackets.",
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
            hints: [
        'A single min variable doesn\'t track history — what happens when you pop the current min?',
        'We need to know the minimum AT EACH STATE of the stack',
      ],
explanation:
        "Push (value, currentMin) as pair. getMin() returns top.min in O(1). Space O(n) worst case.",
    },
    {
      id: "q-mns-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using two stacks, the min stack tracks all minima historically.",
      correctAnswer: "True",
            hints: [
        'When do we push to the min stack? When the new value is <= current minimum',
        'When do we pop from the min stack? When the popped value equals the current minimum',
      ],
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
            hints: [
        'Track the minimum after each push operation',
        'After push(3), min = 3. After push(7), min = 3. After push(2), min = 2',
      ],
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
            hints: [
        'Not every pop changes the minimum',
        'Only pop from the min stack when the value being removed IS the current minimum',
      ],
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
            hints: [
        'Enqueue always goes to stack1 — what is the cost of pushing?',
        'Each element is transferred at most once across stacks',
      ],
explanation:
        "enqueue: push to stack1 (O(1)). dequeue: if stack2 empty, transfer all from stack1 (O(n)) then pop (amortized O(1) since n pops per n pushes).",
    },
    {
      id: "q-iq-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "With two stacks, the order of elements is preserved correctly.",
      correctAnswer: "True",
            hints: [
        'When we transfer from stack1 to stack2, the order is reversed',
        'After transfer, stack2 top is the front of the queue',
      ],
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
            hints: [
        'What happens when we pop from stack1 and push to stack2 repeatedly?',
        'Stack1 bottom becomes stack2 top',
      ],
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
            hints: [
        'Where is the front element in a single stack?',
        'Getting to the bottom of a stack requires removing all elements above it',
      ],
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
            hints: [
        'We want to find the next element to the RIGHT that is greater',
        'The stack helps us track elements waiting for their next greater',
      ],
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
            hints: [
        'Start at index 0 (value 2), scan right for first value > 2',
        'Value 1 is not greater than 2; value 5 is',
      ],
explanation:
        "Scanning right from index 0, 1 is smaller than 2, 5 is first greater. So NGE(2) = 5.",
    },
    {
      id: "q-nge-3",
      type: "true-false",
      difficulty: "medium",
      question: "If no greater element exists, return -1.",
      correctAnswer: "True",
            hints: [
        'What do we assign when the stack is not empty at the end?',
        'Elements that are never popped have no greater element to their right',
      ],
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
            hints: [
        'This is an increasing array — every element\'s next greater is the element immediately after it',
        'What about the last element?',
      ],
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
            hints: [
        'Each element is pushed onto the stack at most once',
        'Each element is popped from the stack at most once',
      ],
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
  // ── NEW SECTIONS ─────────────────────────────────────────────────────────

  "spiral-matrix": [
    {
      id: "q-sm-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of printing an m×n matrix in spiral order?",
      options: ["O(m + n)", "O(m * n)", "O((m * n) log(m * n))", "O(m² + n²)"],
      correctAnswer: 1,
      hints: [
        "Every element in the matrix must be visited exactly once",
        "No element is revisited during the spiral traversal",
      ],
      explanation:
        "Spiral order visits every element exactly once. With m rows and n columns there are m*n elements, giving O(m*n) time. Space is O(1) auxiliary if we update boundary pointers (top, bottom, left, right) in-place, or O(m*n) if we collect results in an output list.",
    },
    {
      id: "q-sm-2",
      type: "true-false",
      difficulty: "easy",
      question: "In the boundary-shrinking approach for spiral traversal, after processing the top row we increment the `top` pointer.",
      correctAnswer: "True",
      hints: [
        "The top row has been fully consumed, so we move the boundary inward",
        "The same logic applies to each of the four boundaries after their row/column is processed",
      ],
      explanation:
        "True. After traversing the top row left-to-right, we shrink the top boundary by doing top++. Similarly, after right column: right--; after bottom row: bottom--; after left column: left++. This keeps all four boundaries converging until top > bottom or left > right, giving O(1) extra space.",
    },
    {
      id: "q-sm-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When generating a spiral matrix (filling values 1..n² into an n×n grid), what is the direction rotation sequence?",
      options: [
        "right → down → left → up → repeat",
        "up → right → down → left → repeat",
        "right → left → up → down → repeat",
        "down → right → up → left → repeat",
      ],
      correctAnswer: 0,
      hints: [
        "Spiral starts at top-left and moves right first",
        "After hitting a boundary or visited cell, rotate 90° clockwise",
      ],
      explanation:
        "The canonical clockwise spiral uses direction vectors: right (0,+1) → down (+1,0) → left (0,-1) → up (-1,0), repeating cyclically. When the next cell is out-of-bounds or already filled, rotate direction. Time: O(n²); Space: O(n²) for the output grid.",
    },
  ],

  "rotate-image": [
    {
      id: "q-ri-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The in-place 90° clockwise rotation of an n×n matrix uses which two operations?",
      options: [
        "Transpose then reverse each column",
        "Transpose then reverse each row",
        "Reverse each row then transpose",
        "Rotate each ring independently",
      ],
      correctAnswer: 1,
      hints: [
        "Transpose swaps matrix[i][j] with matrix[j][i]",
        "After transposing, reversing each row produces a clockwise rotation",
      ],
      explanation:
        "In-place clockwise rotation = transpose + reverse each row. Transpose: swap matrix[i][j] ↔ matrix[j][i] for i<j (O(n²/2) swaps). Reverse each row: O(n/2) per row × n rows = O(n²/2). Total: O(n²) time, O(1) space since both operations are in-place.",
    },
    {
      id: "q-ri-2",
      type: "true-false",
      difficulty: "easy",
      question: "Rotating an image 90° counter-clockwise in-place can be done by transposing then reversing each column.",
      correctAnswer: "True",
      hints: [
        "Counter-clockwise is the mirror of clockwise",
        "Instead of reversing rows after transpose, reverse columns",
      ],
      explanation:
        "True. Counter-clockwise rotation = transpose + reverse each column. Alternatively: reverse each row first, then transpose. Both achieve O(n²) time and O(1) space. Clockwise uses transpose → reverse rows; counter-clockwise uses transpose → reverse columns (or reverse rows → transpose).",
    },
    {
      id: "q-ri-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A four-way cycle rotation (no transpose) rotates a ring of an n×n matrix with how many swaps per element group?",
      options: ["2", "3", "4", "n"],
      correctAnswer: 1,
      hints: [
        "One element from each of the four sides participates in each cycle",
        "Moving 4 elements in a ring requires 3 swaps (like a 3-element rotation needing 2)",
      ],
      explanation:
        "The four-way cycle approach saves a temp variable: temp = top-left, then shift left←bottom, bottom←right, right←top, top←temp. That is 3 assignment steps (3 swaps equivalent). Each group of 4 symmetric positions is handled in O(1). Total swaps: 3 × (n/2)² ≈ O(n²). Space: O(1).",
    },
  ],

  "word-break": [
    {
      id: "q-wb-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of the tabulation DP solution for Word Break with string length n and dictionary size d?",
      options: ["O(n * d)", "O(n² * d)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 1,
      hints: [
        "We have n+1 DP states and for each state we check all words in the dictionary",
        "Checking if a substring matches a word is O(word length) ≈ O(n) worst case",
      ],
      explanation:
        "dp[i] = true if s[0..i-1] can be segmented. For each position i (0..n), we try every word in the dictionary (size d): check if s[i-len..i] matches the word — O(n) substring comparison. Overall: O(n * d * n) = O(n² * d). Using a trie reduces dictionary lookup to O(n), giving O(n²) total.",
    },
    {
      id: "q-wb-2",
      type: "true-false",
      difficulty: "medium",
      question: "Memoized DFS (top-down) and tabulation DP (bottom-up) for Word Break have the same asymptotic time complexity.",
      correctAnswer: "True",
      hints: [
        "Both explore the same subproblems: can we segment s[i..n-1]?",
        "Memoization caches results to avoid recomputation, same as tabulation",
      ],
      explanation:
        "True. Both approaches have O(n²) unique subproblems (start index i × end index j). Memoized DFS caches memo[i] = result for suffix s[i..n-1]. Tabulation fills dp[0..n] bottom-up. Both achieve O(n² * d) time and O(n) space for the memo/dp array, ignoring dictionary storage.",
    },
    {
      id: "q-wb-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Word Break II (return all valid sentences) has what worst-case time complexity?",
      options: ["O(n²)", "O(n³)", "O(2ⁿ)", "O(n * 2ⁿ)"],
      correctAnswer: 3,
      hints: [
        "In the worst case, every partition of the string is valid",
        "The number of sentences can be exponential",
      ],
      explanation:
        "Word Break II must enumerate all valid segmentations. In the worst case (e.g., s = 'aaa...a' with dictionary {'a','aa','aaa',...}), the number of valid sentences is exponential — O(2ⁿ). Building each sentence takes O(n) time, so total is O(n * 2ⁿ). Memoization of intermediate lists helps prune but cannot improve the worst case.",
    },
  ],

  "jump-game-variants": [
    {
      id: "q-jg-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Jump Game I greedy: what variable tracks the furthest reachable index?",
      options: ["A queue of positions", "A 'maxReach' variable updated at each step", "A DP array of booleans", "A stack of jump lengths"],
      correctAnswer: 1,
      hints: [
        "At each index i, you can jump up to nums[i] steps forward",
        "Track the maximum index reachable so far with one variable",
      ],
      explanation:
        "The greedy solution maintains maxReach = max(maxReach, i + nums[i]) for each i ≤ maxReach. If at any i we find i > maxReach, we cannot proceed. Return maxReach >= n-1. Time: O(n), Space: O(1).",
    },
    {
      id: "q-jg-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Jump Game II (minimum jumps) greedy approach uses which key insight?",
      options: [
        "BFS layer-by-layer where each layer is one jump",
        "DP recurrence: dp[i] = min(dp[j] + 1) for all reachable j",
        "Sort indices by jump length",
        "Binary search on the answer",
      ],
      correctAnswer: 0,
      hints: [
        "Treat each jump count as a BFS level",
        "The 'frontier' at each BFS level is the range of reachable indices",
      ],
      explanation:
        "Jump Game II greedy is isomorphic to BFS: current range [lo, hi] is one level. Scan [lo, hi] to find farthest reachable index (next hi). Increment jump count and set lo = hi+1. This is O(n) time, O(1) space — faster than O(n²) DP.",
    },
    {
      id: "q-jg-3",
      type: "true-false",
      difficulty: "hard",
      question: "For Jump Game II, the greedy approach is guaranteed to find the minimum number of jumps.",
      correctAnswer: "True",
      hints: [
        "The greedy always extends the boundary as far as possible with each jump",
        "No local choice can lead to a globally better solution",
      ],
      explanation:
        "True. The greedy is optimal: at each jump, we choose the farthest reachable position. If an alternative sequence reaches position p in k jumps, the greedy reaches at least as far in k jumps (by induction on jump count). This exchange argument proves optimality. Time O(n), Space O(1).",
    },
  ],

  "interval-scheduling": [
    {
      id: "q-is-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Activity Selection Problem (maximize non-overlapping intervals) uses which greedy criterion?",
      options: [
        "Sort by start time, pick earliest start",
        "Sort by end time, pick earliest finishing activity that doesn't conflict",
        "Sort by duration, pick shortest activity",
        "Sort by start time, pick latest start",
      ],
      correctAnswer: 1,
      hints: [
        "Picking the activity that finishes earliest leaves the most room for future activities",
        "This is the classic greedy exchange argument for interval scheduling",
      ],
      explanation:
        "Sort intervals by end time. Greedily select an interval if its start > last selected end. Time: O(n log n) for sort + O(n) scan = O(n log n). This maximizes the number of non-overlapping intervals. Proof by exchange argument: swapping any other choice with the earliest-finish choice never decreases the count.",
    },
    {
      id: "q-is-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Weighted Job Scheduling (maximize total weight of non-overlapping jobs) is solved by:",
      options: [
        "Greedy by end time (same as activity selection)",
        "DP with binary search: dp[i] = max(dp[i-1], w[i] + dp[p(i)]) where p(i) is latest non-overlapping job",
        "Greedy by weight descending",
        "BFS on an interval graph",
      ],
      correctAnswer: 1,
      hints: [
        "When jobs have weights, greedy by finish time is no longer optimal",
        "dp[i] represents best value using jobs sorted by finish time up to job i",
      ],
      explanation:
        "Sort jobs by finish time. Define dp[i] = max weight using jobs 1..i. For each job i, find p(i) = latest job that doesn't overlap (binary search on start times). dp[i] = max(dp[i-1], weight[i] + dp[p(i)]). Time: O(n log n) sort + O(n log n) binary searches = O(n log n). Space: O(n).",
    },
    {
      id: "q-is-3",
      type: "true-false",
      difficulty: "medium",
      question: "Merging overlapping intervals requires sorting by start time first.",
      correctAnswer: "True",
      hints: [
        "If intervals are unsorted, we cannot efficiently find which ones overlap",
        "After sorting by start, overlapping intervals are adjacent",
      ],
      explanation:
        "True. Sort by start time: O(n log n). Then one linear pass merges adjacent overlapping intervals by comparing current interval's start with the last merged interval's end. If start <= last_end, extend last_end = max(last_end, current_end). Total: O(n log n) time, O(n) space for output.",
    },
  ],

  "stock-profit-variants": [
    {
      id: "q-spv-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Best Time to Buy and Sell Stock with at most k transactions: what is the DP state space?",
      options: ["O(n)", "O(k * n)", "O(k²)", "O(n²)"],
      correctAnswer: 1,
      hints: [
        "We need to track both the day index and remaining transactions",
        "dp[i][j] = max profit on day i with j transactions remaining",
      ],
      explanation:
        "dp[i][j] = max profit on day i with at most j transactions. State space: O(k * n). Transition: dp[i][j] = max(dp[i-1][j], prices[i] + max over m<i of (dp[m][j-1] - prices[m])). Optimized with a running max: O(k * n) time, O(k * n) space (reducible to O(k) with rolling arrays).",
    },
    {
      id: "q-spv-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Stock with cooldown (1-day cooldown after sell): the recurrence is best expressed as:",
      options: [
        "dp[i] = max(dp[i-1], dp[i-2] + prices[i] - prices[i-1])",
        "Three states: held, sold, rest. held[i] = max(held[i-1], rest[i-1] - prices[i]); sold[i] = held[i-1] + prices[i]; rest[i] = max(rest[i-1], sold[i-1])",
        "dp[i] = max profit on day i with exactly one cooldown",
        "Greedy: buy low, sell high, skip one day after each sell",
      ],
      correctAnswer: 1,
      hints: [
        "Model three states: currently holding a stock, just sold (cooldown), or resting",
        "Transitions between states capture the cooldown constraint",
      ],
      explanation:
        "Three-state DP: held[i] = max profit while holding on day i = max(held[i-1], rest[i-1] - prices[i]); sold[i] = held[i-1] + prices[i] (sell today); rest[i] = max(rest[i-1], sold[i-1]). Answer = max(sold[n-1], rest[n-1]). Time: O(n), Space: O(1) with rolling variables.",
    },
    {
      id: "q-spv-3",
      type: "true-false",
      difficulty: "medium",
      question: "Stock with transaction fee: adding a fee per transaction can be handled greedily in O(n) time.",
      correctAnswer: "True",
      hints: [
        "DP with two states (hold, cash) handles the fee naturally",
        "The fee is subtracted when selling, reducing effective profit",
      ],
      explanation:
        "True. Two-state DP: cash = max profit without holding; hold = max profit while holding. Transitions: hold = max(hold, cash - prices[i]); cash = max(cash, hold + prices[i] - fee). Each day is O(1), total O(n) time, O(1) space. The fee is deducted on sell, naturally limiting unnecessary transactions.",
    },
  ],

  "longest-palindrome-substring": [
    {
      id: "q-lps-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Expand-around-center approach for Longest Palindromic Substring has what complexity?",
      options: ["O(n) time, O(1) space", "O(n²) time, O(1) space", "O(n²) time, O(n²) space", "O(n log n) time, O(n) space"],
      correctAnswer: 1,
      hints: [
        "For each of n centers (including gaps between characters), we expand outward",
        "Expansion at each center takes O(n) in the worst case",
      ],
      explanation:
        "There are 2n-1 centers (n single chars + n-1 gaps). For each center, expand while characters match: O(n) worst case. Total: O(n²) time. No auxiliary array needed: O(1) space (just track best start/length). This beats the O(n²) space DP solution which builds an n×n table.",
    },
    {
      id: "q-lps-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Manacher's algorithm finds the longest palindromic substring in:",
      options: ["O(n log n) time, O(n) space", "O(n) time, O(n) space", "O(n²) time, O(1) space", "O(n) time, O(1) space"],
      correctAnswer: 1,
      hints: [
        "Manacher's reuses previously computed palindrome radii",
        "It processes each position amortized O(1) using a 'center' and 'right boundary' trick",
      ],
      explanation:
        "Manacher's algorithm uses a transformed string (insert '#' between chars) and an array p[] where p[i] = palindrome radius at i. It maintains (center, right) — the rightmost palindrome's center and right boundary. For each i < right, mirror symmetry gives p[i] ≥ min(p[mirror], right-i), then expand. Each position is touched at most twice: O(n) time, O(n) space for p[] array.",
    },
    {
      id: "q-lps-3",
      type: "true-false",
      difficulty: "easy",
      question: "A palindrome can be even-length (e.g., 'abba') or odd-length (e.g., 'aba').",
      correctAnswer: "True",
      hints: [
        "Odd-length palindromes have a single center character",
        "Even-length palindromes have a center between two characters",
      ],
      explanation:
        "True. Palindromes exist in both forms. 'aba' is odd-length (center = 'b'); 'abba' is even-length (center is the gap between two b's). The expand-around-center algorithm handles both: for odd, expand from each character; for even, expand from each pair of adjacent characters. Both must be checked for completeness.",
    },
  ],

  "anagram-variants": [
    {
      id: "q-av-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Find All Anagrams in a String (LeetCode 438) — optimal approach and complexity?",
      options: [
        "Sort each window: O(n * k log k) time",
        "Sliding window with character count array: O(n) time, O(1) space",
        "Hash map comparison per window: O(26n) time",
        "Two-pointer with set: O(n log n) time",
      ],
      correctAnswer: 1,
      hints: [
        "Keep a fixed-size window of length |pattern| and slide it across the string",
        "Maintain a frequency count; when counts match, record an anagram start",
      ],
      explanation:
        "Sliding window: maintain a count array of size 26 for the pattern, and a window count array. Slide window of size |p| across s: add right char, remove left char. Compare counts in O(26) = O(1). Total: O(n) time, O(1) space (two fixed-size arrays of 26). Better than sorting each window (O(nk log k)).",
    },
    {
      id: "q-av-2",
      type: "true-false",
      difficulty: "easy",
      question: "Two strings are anagrams if and only if their sorted character arrays are equal.",
      correctAnswer: "True",
      hints: [
        "Sorting rearranges characters into canonical order",
        "Anagrams contain the same characters with the same frequencies",
      ],
      explanation:
        "True. Sorting is a correct but suboptimal anagram check: O(n log n). The optimal check uses a frequency array: count chars in s1 (increment) and s2 (decrement); if all counts are zero, they're anagrams. O(n) time, O(1) space (26-element array for lowercase letters).",
    },
    {
      id: "q-av-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Group Anagrams: grouping n strings of average length k has what time complexity using sorted-key approach?",
      options: ["O(n * k)", "O(n * k log k)", "O(n²)", "O(n * k²)"],
      correctAnswer: 1,
      hints: [
        "Sorting each string takes O(k log k)",
        "We do this for n strings and use the sorted string as a hash map key",
      ],
      explanation:
        "For each of n strings, sort it in O(k log k) to get the canonical key, then insert into a hash map. Total: O(n * k log k) time. Alternative: use a frequency tuple as key (O(n * k) time but larger constant). Space: O(n * k) for storing all strings.",
    },
  ],

  "string-compression": [
    {
      id: "q-sc-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Run-length encoding of 'aaabbc' produces:",
      options: ["'a3b2c1'", "'3a2b1c'", "'3a2bc'", "'aaabbc6'"],
      correctAnswer: 1,
      hints: [
        "Run-length encoding outputs count then character",
        "Count of 1 is typically omitted in some variants, but standard RLE includes it",
      ],
      explanation:
        "Standard run-length encoding: count followed by character. 'aaabbc' → 'a' appears 3 times → '3a', 'b' appears 2 times → '2b', 'c' appears 1 time → '1c'. Result: '3a2b1c'. Time: O(n), Space: O(n) for output. The compressed form is shorter only when runs are long enough.",
    },
    {
      id: "q-sc-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In-place string compression (LeetCode 443) returns the new length with what space complexity?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctAnswer: 2,
      hints: [
        "The problem asks to modify the char array in-place using only constant extra space",
        "A write pointer tracks where to write the compressed result",
      ],
      explanation:
        "In-place compression uses two pointers: read (scanning runs) and write (recording compressed output into chars[]). Count is written digit by digit (requiring O(log count) digits, but no extra array). Space: O(1) auxiliary. Time: O(n) — one pass to count runs, writing digits in-place.",
    },
    {
      id: "q-sc-3",
      type: "true-false",
      difficulty: "medium",
      question: "Run-length encoding always reduces string size compared to the original.",
      correctAnswer: "False",
      hints: [
        "What happens with a string like 'abcde' where each character appears once?",
        "A count of 1 adds an extra character per unique char",
      ],
      explanation:
        "False. For strings with no repeated consecutive characters (e.g., 'abcde'), RLE produces '1a1b1c1d1e' — twice as long. RLE is only beneficial when runs are sufficiently long (run length > 2 for single-digit counts). This is why compression algorithms use adaptive techniques.",
    },
  ],

  "matrix-search": [
    {
      id: "q-ms-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Search a 2D Matrix where rows and columns are independently sorted (LeetCode 240) — best approach?",
      options: [
        "Binary search each row: O(m log n)",
        "Staircase search from top-right corner: O(m + n)",
        "Flatten and binary search: O(log(mn))",
        "DFS from top-left: O(mn)",
      ],
      correctAnswer: 1,
      hints: [
        "Start at top-right: values to the left are smaller, values below are larger",
        "Each comparison eliminates an entire row or column",
      ],
      explanation:
        "Staircase search: start at matrix[0][n-1]. If target == val: found. If target < val: move left (col--). If target > val: move down (row++). Each step eliminates a row or column, giving O(m + n) time, O(1) space. This is optimal for independently sorted matrix; for row-major sorted (each row continues from prev), binary search gives O(log(mn)).",
    },
    {
      id: "q-ms-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "For a strictly row-major sorted 2D matrix (row i's last element < row i+1's first element), binary search complexity is:",
      options: ["O(m + n)", "O(log(m * n))", "O(m log n)", "O(log m + log n)"],
      correctAnswer: 1,
      hints: [
        "The matrix can be treated as a flattened sorted array of m*n elements",
        "Map 1D index mid to 2D: row = mid / n, col = mid % n",
      ],
      explanation:
        "The matrix is a sorted array of m*n elements. Binary search: lo=0, hi=m*n-1. mid = (lo+hi)/2; map to 2D: row=mid/n, col=mid%n. Compare matrix[row][col] with target. Total: O(log(mn)) = O(log m + log n) time, O(1) space.",
    },
    {
      id: "q-ms-3",
      type: "true-false",
      difficulty: "hard",
      question: "The staircase search for a matrix with sorted rows and columns runs in O(m + n) regardless of matrix dimensions.",
      correctAnswer: "True",
      hints: [
        "Each step moves either left or down, never backtracking",
        "Starting from top-right, we can move at most n-1 times left and m-1 times down",
      ],
      explanation:
        "True. Starting at position (0, n-1), each comparison either decrements col (at most n-1 times) or increments row (at most m-1 times). Total moves ≤ (m-1) + (n-1) = m+n-2, giving O(m+n) time. This holds for any m×n matrix with independently sorted rows and columns.",
    },
  ],
};

registerQuestions(questions);
