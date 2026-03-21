import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // ── ARRAYS & STRINGS ────────────────────────────────────────────────────
  "two-sum": [
    {
      id: "q-ts-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the optimal Two Sum solution using a hash map?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(1)$"],
      correctAnswer: 1,
      hints: [
        "For each element, compute its complement as $\\text{target} - \\text{nums}[i]$, then check whether that complement already exists in the map.",
        "Hash map lookup and insertion are both $\\mathrm{O}(1)$ on average."
      ],
      explanation:
        "**Step 1:** Make a single pass through the array. At each index $i$, compute the complement $c = \\text{target} - \\text{nums}[i]$.\n\n" +
        "**Step 2:** Check in $\\mathrm{O}(1)$ time whether $c$ is already in the map. If it is, we have found our pair; if not, store $\\{\\text{nums}[i]: i\\}$ and continue.\n\n" +
        "Since each of the $n$ elements is processed exactly once, and each map operation costs $\\mathrm{O}(1)$ on average:\n\n" +
        "\\[\n\\text{Time complexity} = \\mathrm{O}(n) \\quad \\text{and} \\quad \\text{Space complexity} = \\mathrm{O}(n).\n\\]\n\n" +
        "This is optimal — any algorithm must examine every element at least once, giving a lower bound of $\\Omega(n)$."
    },
    {
      id: "q-ts-2",
      type: "true-false",
      difficulty: "easy",
      question: "The Two Sum hash-map solution requires $\\mathrm{O}(n)$ extra space.",
      correctAnswer: "True",
      hints: [
        "The hash map stores one entry per array element in the worst case.",
        "In the worst case (no solution found until the last element), every element is stored before the algorithm terminates."
      ],
      explanation:
        "True. In the worst case - when no valid pair exists until the very last element - the hash map holds all $n$ entries of the form $\\{\\text{value}: \\text{index}\\}$. This is $\\mathrm{O}(n)$ space.\n\n" +
        "This is the fundamental space-time trade-off of the hash-map approach: we spend $\\mathrm{O}(n)$ auxiliary space to buy ourselves $\\mathrm{O}(n)$ time."
    },
    {
      id: "q-ts-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For the input array $[3, 3]$ and target $= 6$, what indices does the hash-map Two Sum algorithm return?",
      options: ["$[0, 0]$", "$[0, 1]$", "$[1, 1]$", "No valid pair (returns empty)"],
      correctAnswer: 1,
      hints: [
        "Step through the algorithm explicitly. At $i=0$, the complement is $6-3=3$. Is 3 already in the map?",
        "At $i=1$, the complement is again $6-3=3$. Now 3 is in the map (from step $i=0$), at index 0. Does this form a valid pair?"
      ],
      explanation:
        "**Step 1:** Trace through the algorithm. At $i = 0$: $\\text{nums}[0] = 3$, $\\text{complement} = 6 - 3 = 3$. The map is empty, so store $\\{3: 0\\}$.\n\n" +
        "**Step 2:** At $i = 1$: $\\text{nums}[1] = 3$, $\\text{complement} = 6 - 3 = 3$. The map contains 3 at index 0. Since $0 \\neq 1$, this is a valid pair. Return $[0, 1]$, since $3 + 3 = 6 = \\text{target}$.\n\n" +
        "\\[\n[0, 1] \\text{ is returned, since } 3 + 3 = 6.\n\\]\n\n" +
        "Note that the algorithm must verify the stored index differs from the current index $i$ to handle the case where $\\text{target} = 2 \\times \\text{nums}[i]$ and the same element appears twice."
    },
    {
      id: "q-ts-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "If you sort the array before applying the two-pointer technique to solve Two Sum, what is the resulting time and space complexity?",
      options: [
        "$\\mathrm{O}(n)$ time, $\\mathrm{O}(1)$ space",
        "$\\mathrm{O}(n \\log n)$ time, $\\mathrm{O}(1)$ space",
        "$\\mathrm{O}(n^2)$ time, $\\mathrm{O}(n)$ space",
        "$\\mathrm{O}(n)$ time, $\\mathrm{O}(n)$ space"
      ],
      correctAnswer: 1,
      hints: [
        "What is the time cost of a comparison-based sort?",
        "Two pointers work correctly on a sorted array, but what happened to the original indices?"
      ],
      explanation:
        "**Step 1:** Sorting costs $\\mathrm{O}(n \\log n)$ time and $\\mathrm{O}(1)$ extra space. Two pointers then solve Two Sum in $\\mathrm{O}(n)$ on the sorted array.\n\n" +
        "**Step 2:** However, the Two Sum problem requires returning the original indices of the pair. After sorting, the elements are in new positions — we no longer know which original indices they came from. To recover the original indices we would need additional bookkeeping costing $\\mathrm{O}(n)$ space.\n\n" +
        "Therefore, the sorting approach yields:\n" +
        "\\[\n\\text{Time} = \\mathrm{O}(n \\log n), \\quad \\text{Space} = \\mathrm{O}(1).\n\\]\n\n" +
        "The hash-map approach is preferred because it gives $\\mathrm{O}(n)$ time while correctly tracking original indices."
    },
    {
      id: "q-ts-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why can Two Sum not be solved in $\\mathrm{O}(1)$ space and $\\mathrm{O}(n)$ time without a hash map?",
      options: [
        "Because we must store complements to check them later",
        "Because sorting changes the original index order",
        "Because the array might not be sorted",
        "Because of how duplicate values are handled"
      ],
      correctAnswer: 1,
      hints: [
        "To check whether a complement exists in constant time, what must we have already stored?",
        "Two pointers on a sorted array require $\\mathrm{O}(n \\log n)$ time just for the sort."
      ],
      explanation:
        "**Step 1:** Without a hash map, the only other way to achieve $\\mathrm{O}(n)$ lookup of complements is the two-pointer technique, which requires a sorted array. But sorting itself costs $\\mathrm{O}(n \\log n)$, not $\\mathrm{O}(n)$.\n\n" +
        "**Step 2:** Once sorted, the original indices are lost, and recovering them requires $\\mathrm{O}(n)$ additional storage.\n\n" +
        "**Step 3:** More formally, a comparison-based sort has a lower bound of $\\Omega(n \\log n)$. Therefore any algorithm that sorts before using two pointers cannot beat $\\Omega(n \\log n)$ in time without using $\\Omega(n)$ extra space for index bookkeeping. This is a fundamental time-space trade-off: $\\mathrm{O}(n)$ time with $\\mathrm{O}(1)$ space for Two Sum is impossible.\n\n" +
        "\\[\n\\text{Answer: sorting changes the original index order.}\n\\]"
    },
    {
      id: "q-ts-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the hash-map Two Sum, when the target equals twice some array element (e.g., $\\text{target} = 2 \\times 3$), what special handling is required when that element appears twice?",
      options: [
        "The hash-map approach fails for this case",
        "The two-pointer technique must be used instead",
        "Store each element's index in the map; when a complement is found, verify its stored index differs from the current index",
        "No special handling is needed - the algorithm works as-is"
      ],
      correctAnswer: 2,
      hints: [
        "When $\\text{target} = 2 \\times 3$ and the array is $[3, 3]$, what is the complement of the element at index 0?",
        "If we naively check whether the complement (3) exists in the map, what would happen at index 0?"
      ],
      explanation:
        "**Step 1:** The algorithm stores $\\{\\text{value}: \\text{index}\\}$ mappings. When we reach index $i$, we compute $\\text{complement} = \\text{target} - \\text{nums}[i]$. If $\\text{complement} = \\text{nums}[i]$, we must verify that the stored index of that value differs from $i$.\n\n" +
        "**Step 2:** Example with $\\text{nums} = [3, 3]$, $\\text{target} = 6$: at $i = 0$, store $\\{3: 0\\}$. At $i = 1$, the complement is 3, found in the map at index 0. Since $0 \\neq 1$, the pair $[0, 1]$ is valid.\n\n" +
        "\\[\n\\text{Return } [0, 1], \\text{ since } 3 + 3 = 6 = \\text{target}.\n\\]\n\n" +
        "Without this verification, we might incorrectly return $[0, 0]$ when an element is paired with itself — which is not a valid distinct-pair solution."
    },
  ],

  "maximum-subarray": [
    {
      id: "q-ms-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Kadane's algorithm runs in what time complexity?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(1)$"],
      correctAnswer: 1,
      hints: [
        "Kadane's algorithm makes exactly one pass through the array.",
        "At each element, we perform only a constant amount of work (one comparison and one max operation)."
      ],
      explanation:
        "**Step 1:** Kadane's algorithm makes a single left-to-right pass through the array, maintaining two variables:\n\n" +
        "\\[\n\\text{maxEndingHere} = \\max\\bigl(\\text{maxEndingHere} + \\text{num},\\; \\text{num}\\bigr)\n\\]\n" +
        "\\[\n\\text{maxSoFar} = \\max\\bigl(\\text{maxSoFar},\\; \\text{maxEndingHere}\\bigr)\n\\]\n\n" +
        "**Step 2:** Since we visit each of the $n$ elements exactly once and perform $\\mathrm{O}(1)$ work per element, the time complexity is $\\mathrm{O}(n)$. The space complexity is $\\mathrm{O}(1)$."
    },
    {
      id: "q-ms-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The standard version of Kadane's algorithm (which resets $\\text{maxEndingHere}$ to 0 at each step) fails when the input array consists entirely of:",
      options: ["Positive numbers", "Negative numbers", "Zeros", "Mixed positive and negative numbers"],
      correctAnswer: 1,
      hints: [
        "When the algorithm resets $\\text{maxEndingHere}$ to 0, it effectively starts a fresh subarray. What happens if all numbers are negative?",
        "Consider the array $[-5, -3, -1]$. What does the standard algorithm return? What should it return?"
      ],
      explanation:
        "**Step 1:** The standard Kadane's algorithm resets $\\text{maxEndingHere} = \\max(\\text{maxEndingHere} + \\text{num}, 0)$, which assumes the maximum subarray never consists entirely of negative numbers. When all numbers are negative, this always resets to 0 and returns 0 — even though the correct answer is the largest (least negative) element.\n\n" +
        "**Step 2:** Example: for $[-5, -3, -1]$, the standard algorithm returns 0 (by picking nothing), but the correct answer is $-1$.\n\n" +
        "**Step 3:** The fix is to change the reset condition to:\n" +
        "\\[\n\\text{maxEndingHere} = \\max\\bigl(\\text{maxEndingHere} + \\text{num},\\; \\text{num}\\bigr)\n\\]\n" +
        "so that a single-element subarray is always a valid candidate."
    },
    {
      id: "q-ms-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Kadane's algorithm can be viewed as a dynamic programming approach that runs in $\\mathrm{O}(n)$ time.",
      correctAnswer: "True",
      hints: [
        "Dynamic programming on arrays typically involves computing each state from the previous state in O(1) time.",
        "At position $i$, does $\\text{maxEndingHere}$ depend only on $\\text{maxEndingHere}$ at position $i-1$?"
      ],
      explanation:
        "**Step 1:** Kadane's algorithm is a DP algorithm because the optimal subarray ending at position $i$ depends only on the optimal subarray ending at position $i-1$:\n\n" +
        "\\[\n\\text{maxEndingHere}_i = \\max\\bigl(\\text{maxEndingHere}_{i-1} + \\text{nums}[i],\\; \\text{nums}[i]\\bigr)\n\\]\n\n" +
        "**Step 2:** This recurrence satisfies the optimal substructure and overlapping subproblems properties. Each of the $n$ states is computed in $\\mathrm{O}(1)$, giving $\\mathrm{O}(n)$ total time."
    },
    {
      id: "q-ms-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For the array $[-2, 1, -3, 4, -1, 2, 1, -5, 4]$, what maximum subarray sum does Kadane's algorithm (standard version) return?",
      options: ["$5$", "$6$", "$7$", "$8$"],
      correctAnswer: 1,
      hints: [
        "Trace through step by step, maintaining $\\text{maxEndingHere}$ and $\\text{maxSoFar}$.",
        "At $i=3$ (value 4), a new subarray begins with value 4 as the only element. At $i=4$ (value $-1$), $\\text{maxEndingHere}$ stays at 4 since $4 + (-1) = 3 < 4$."
      ],
      explanation:
        "**Step 1:** Trace through the array with the standard (reset-to-0) version:\n\n" +
        "\\[\n" +
        "\\begin{array}{c|c|c|c}\n" +
        "i & \\text{nums}[i] & \\text{maxEndingHere} & \\text{maxSoFar} \\\\\n" +
        "\\hline\n" +
        "0 & -2 & 0 & 0 \\\\\n" +
        "1 & 1 & 1 & 1 \\\\\n" +
        "2 & -3 & 0 & 1 \\\\\n" +
        "3 & 4 & 4 & 4 \\\\\n" +
        "4 & -1 & 3 & 4 \\\\\n" +
        "5 & 2 & 5 & 5 \\\\\n" +
        "6 & 1 & 6 & 6 \\\\\n" +
        "7 & -5 & 1 & 6 \\\\\n" +
        "8 & 4 & 5 & 6\n" +
        "\\end{array}\n" +
        "\\]\n\n" +
        "**Step 2:** The maximum subarray is $[4, -1, 2, 1]$ with sum:\n" +
        "\\[\n4 + (-1) + 2 + 1 = 6.\n\\]"
    },
    {
      id: "q-ms-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The divide-and-conquer approach for the maximum subarray problem has what time complexity?",
      options: ["$\\mathrm{O}(n)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(n^2)$", "$\\mathrm{O}(\\log n)$"],
      correctAnswer: 1,
      hints: [
        "The recurrence for divide-and-conquer on the max subarray is $T(n) = 2T(n/2) + \\mathrm{O}(n)$.",
        "Apply the Master Theorem: $a=2, b=2, f(n)=\\Theta(n)$. Since $\\log_b a = 1 = d$, we have $T(n) = \\Theta(n \\log n)$."
      ],
      explanation:
        "**Step 1:** The divide-and-conquer algorithm splits the array in half, recursively finds the maximum subarray in the left half, right half, and the crossing subarray. The crossing case requires $\\mathrm{O}(n)$ time to examine all elements that cross the midpoint.\n\n" +
        "**Step 2:** The recurrence relation is:\n" +
        "\\[\nT(n) = 2T\\!\\left(\\frac{n}{2}\\right) + \\Theta(n)\n\\]\n\n" +
        "**Step 3:** Applying the Master Theorem: $a = 2$, $b = 2$, $f(n) = \\Theta(n)$, and $\\log_b a = 1$. Since $f(n) = \\Theta\\bigl(n^1\\bigr)$, we have $T(n) = \\Theta(n \\log n)$.\n\n" +
        "\\[\n\\text{Divide-and-conquer: } \\Theta(n \\log n) \\quad \\text{vs. Kadane's: } \\mathrm{O}(n)\n\\]\n\n" +
        "The divide-and-conquer approach is asymptotically slower, but it is a natural fit when the problem is part of a broader divide-and-conquer framework."
    },
    {
      id: "q-ms-6",
      type: "true-false",
      difficulty: "easy",
      question:
        "Kadane's algorithm can be extended to also return the start and end indices of the maximum subarray, while maintaining $\\mathrm{O}(n)$ time and $\\mathrm{O}(1)$ space.",
      correctAnswer: "True",
      hints: [
        "When $\\text{maxEndingHere}$ is reset (a new subarray begins), what index should become the candidate start?",
        "When $\\text{maxSoFar}$ is updated, which index marks the end of the current best subarray?"
      ],
      explanation:
        "**Step 1:** We maintain two additional variables alongside $\\text{maxEndingHere}$ and $\\text{maxSoFar}$:\n\n" +
        "\\[\n" +
        "\\begin{aligned}\n" +
        "\\text{startTemp} &= \\text{the candidate start index (resets when a new subarray begins)},\\\\\n" +
        "\\text{start} &= \\text{start index of the best subarray found so far},\\\\\n" +
        "\\text{end} &= \\text{end index of the best subarray found so far}.\n" +
        "\\end{aligned}\n" +
        "\\]\n\n" +
        "**Step 2:** When $\\text{maxEndingHere}$ resets (i.e., $\\text{maxEndingHere} + \\text{num} < \\text{num}$), we set $\\text{startTemp} = i$. When $\\text{maxSoFar}$ is updated, we set $\\text{start} = \\text{startTemp}$ and $\\text{end} = i$. Both operations are $\\mathrm{O}(1)$, so the overall algorithm remains $\\mathrm{O}(n)$ time and $\\mathrm{O}(1)$ space."
    },
  ],

  "product-except-self": [
    {
      id: "q-pe-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Product Except Self can be solved in $\\mathrm{O}(n)$ time and $\\mathrm{O}(1)$ extra space (excluding the output array) using which approach?",
      options: [
        "Division by each element",
        "Prefix and suffix products",
        "Recursion",
        "Sorting"
      ],
      correctAnswer: 1,
      hints: [
        "For each position $i$, the answer is the product of everything to the LEFT of $i$ times everything to the RIGHT of $i$.",
        "Can you compute all left-products in one pass and all right-products in another pass?"
      ],
      explanation:
        "**Step 1:** Pass 1 (left to right). Compute $\\text{prefix}[i] = \\prod_{j=0}^{i-1} \\text{nums}[j]$, the product of all elements strictly to the left of $i$.\n\n" +
        "**Step 2:** Pass 2 (right to left). Compute $\\text{suffix}[i] = \\prod_{j=i+1}^{n-1} \\text{nums}[j]$, the product of all elements strictly to the right of $i$, and multiply it by $\\text{prefix}[i]$ to get the final result:\n\n" +
        "\\[\n\\text{result}[i] = \\left(\\prod_{j=0}^{i-1} \\text{nums}[j]\\right) \\cdot \\left(\\prod_{j=i+1}^{n-1} \\text{nums}[j]\\right)\n\\]\n\n" +
        "Two passes $\\Rightarrow \\mathrm{O}(n)$ time. Only $\\mathrm{O}(1)$ extra variables besides the output array."
    },
    {
      id: "q-pe-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The division-based solution for Product Except Self handles arrays containing zeros correctly.",
      correctAnswer: "False",
      hints: [
        "What is the product of all elements in an array containing one or more zeros?",
        "What happens when you try to divide by zero?"
      ],
      explanation:
        "False. If the array contains even a single zero, the total product of all elements is zero. Dividing by zero is undefined, so the division approach fails immediately.\n\n" +
        "Example: for $[1, 0, 2]$, the correct answer is $[0, 0, 0]$ (each position excludes the zero at index 1, whose product with everything else is 0). The division approach would attempt $0/0$, which is undefined.\n\n" +
        "The prefix/suffix approach handles zeros correctly because it never performs division - it multiplies selected factors instead."
    },
    {
      id: "q-pe-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For the array $[1, 2, 3, 4]$, what is the Product Except Self result?",
      options: ["$[24, 12, 8, 6]$", "$[2, 3, 4, 1]$", "$[24, 12, 6, 4]$", "$[6, 8, 12, 24]$"],
      correctAnswer: 0,
      hints: [
        "For position $i$, exclude $\\text{nums}[i]$ from the product.",
        "$\\text{result}[0] = 2 \\times 3 \\times 4 = 24$; $\\text{result}[1] = 1 \\times 3 \\times 4 = 12$; $\\text{result}[2] = 1 \\times 2 \\times 4 = 8$; $\\text{result}[3] = 1 \\times 2 \\times 3 = 6$."
      ],
      explanation:
        "**Step 1:** Using the prefix/suffix method:\n\n" +
        "\\[\n\\text{result}[i] = \\left(\\prod_{j < i} \\text{nums}[j]\\right) \\cdot \\left(\\prod_{j > i} \\text{nums}[j]\\right)\n\\]\n\n" +
        "**Step 2:** Compute each result:\n\n" +
        "\\[\n" +
        "\\begin{aligned}\n" +
        "\\text{result}[0] &= 2 \\cdot 3 \\cdot 4 = 24,\\\\\n" +
        "\\text{result}[1] &= 1 \\cdot 3 \\cdot 4 = 12,\\\\\n" +
        "\\text{result}[2] &= 1 \\cdot 2 \\cdot 4 = 8,\\\\\n" +
        "\\text{result}[3] &= 1 \\cdot 2 \\cdot 3 = 6.\n" +
        "\\end{aligned}\n" +
        "\\]\n\n" +
        "**Answer:** $[24, 12, 8, 6]$."
    },
    {
      id: "q-pe-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When the input array contains more than one zero, the prefix/suffix Product Except Self approach returns:",
      options: [
        "Zeros for all positions",
        "The full product (ignoring zeros)",
        "An error or NaN",
        "Zeros for some positions and the product of non-zero elements for others"
      ],
      correctAnswer: 0,
      hints: [
        "If there are two zeros, then for every position, at least one zero is excluded from the product.",
        "What is any non-zero number multiplied by zero?"
      ],
      explanation:
        "If more than one zero is present in the array, then for every position $i$, at least one zero is excluded from the product (since the excluded element at position $i$ is not zero, but some other zero is excluded). Any product that includes even a single zero evaluates to zero.\n\n" +
        "Therefore, every entry in the result array is 0.\n\n" +
        "If exactly one zero is present, then the result is: zero at the zero's own position (since the product of all non-zero elements is non-zero), and zero everywhere else (since each position excludes the zero). If there are no zeros, each position gets the full product divided by $\\text{nums}[i]$."
    },
    {
      id: "q-pe-5",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the prefix/suffix approach for Product Except Self?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(1)$"],
      correctAnswer: 2,
      hints: [
        "How many passes through the array are made?",
        "At each position, is the work done constant or linear in $n$?"
      ],
      explanation:
        "Two linear passes are made:\n\n" +
        "1. **Left-to-right pass:** builds the prefix product for each position. $\\mathrm{O}(n)$ time.\n" +
        "2. **Right-to-left pass:** multiplies the suffix product into the result. $\\mathrm{O}(n)$ time.\n\n" +
        "Total time: $\\mathrm{O}(n)$. Extra space (excluding the output array): $\\mathrm{O}(1)$."
    },
  ],

  "rotate-array": [
    {
      id: "q-ra-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Rotating the array $[1, 2, 3, 4, 5, 6, 7]$ to the right by $k = 3$ yields:",
      options: [
        "$[4, 5, 6, 7, 1, 2, 3]$",
        "$[5, 6, 7, 1, 2, 3, 4]$",
        "$[3, 4, 5, 6, 7, 1, 2]$",
        "$[1, 2, 3, 4, 5, 6, 7]$ (no change)"
      ],
      correctAnswer: 1,
      hints: [
        "Right rotation by $k$ moves each element $k$ positions to the right, with elements at the end wrapping to the beginning.",
        "The last $k=3$ elements ($5, 6, 7$) move to the front, preserving their internal order."
      ],
      explanation:
        "**Step 1:** A right rotation by $k$ moves the last $k$ elements to the front, preserving their relative order, and shifts the remaining elements to the right.\n\n" +
        "**Step 2:** For $[1, 2, 3, 4, 5, 6, 7]$ with $k = 3$:\n\n" +
        "\\[\n\\underbrace{[1, 2, 3, 4]}_{\\text{shifts right}} \\quad \\underbrace{[5, 6, 7]}_{\\text{moves to front}}\n\\]\n\n" +
        "**Result:** $[5, 6, 7, 1, 2, 3, 4]$."
    },
    {
      id: "q-ra-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the optimal time and space complexity of the reversal-based array rotation algorithm?",
      options: [
        "$\\mathrm{O}(n^2)$ time, $\\mathrm{O}(1)$ space",
        "$\\mathrm{O}(n)$ time",
        "$\\mathrm{O}(n)$ time, $\\mathrm{O}(1)$ space via reversal",
        "$\\mathrm{O}(\\log n)$ time"
      ],
      correctAnswer: 2,
      hints: [
        "The reversal algorithm performs exactly three reversals. Each reversal visits every element exactly once.",
        "No additional arrays are allocated - just pointer swaps within the existing array."
      ],
      explanation:
        "**Step 1:** Reverse the entire array:\n" +
        "\\[[1, 2, 3, 4, 5, 6, 7] \\longrightarrow [7, 6, 5, 4, 3, 2, 1]\\]\n\n" +
        "**Step 2:** Reverse the first $k$ elements:\n" +
        "\\[[7, 6, 5] \\longrightarrow [5, 6, 7]\\]\n\n" +
        "**Step 3:** Reverse the remaining $n - k$ elements:\n" +
        "\\[[4, 3, 2, 1] \\longrightarrow [1, 2, 3, 4]\\]\n\n" +
        "**Result:** $[5, 6, 7, 1, 2, 3, 4]$. Each reversal is $\\mathrm{O}(n)$, giving $\\mathrm{O}(n)$ total time. Only $\\mathrm{O}(1)$ extra space is used (the swaps are in-place)."
    },
    {
      id: "q-ra-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When the rotation amount $k$ is greater than the array length $n$, the correct approach is to:",
      options: [
        "Throw an error",
        "Reduce $k$ by computing $k \\bmod n$ before rotating",
        "Rotate by $k$ anyway (the algorithm handles it naturally)",
        "Return the original array unchanged"
      ],
      correctAnswer: 1,
      hints: [
        "What does rotating by $n$ positions return? What about $n+1$?",
        "Rotation is periodic with period $n$. After $n$ steps, every element returns to its original position."
      ],
      explanation:
        "**Step 1:** Rotating by $k$ positions where $k \\geq n$ is equivalent to rotating by $k \\bmod n$ positions. This is because the array wraps around — after $n$ right rotations, every element is back in its original position.\n\n" +
        "\\[\nk_{\\text{effective}} = k \\bmod n\n\\]\n\n" +
        "**Step 2:** For example, rotating $[1, 2, 3]$ by $k = 7$ is equivalent to $k = 7 \\bmod 3 = 1$. The reversal algorithm (and all standard implementations) should normalize $k$ this way before proceeding."
    },
    {
      id: "q-ra-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "The juggling algorithm (cyclic replacements) for array rotation uses $\\mathrm{O}(1)$ extra space.",
      correctAnswer: "True",
      hints: [
        "The juggling algorithm moves elements in directed cycles, reusing a single temporary variable.",
        "How many extra variables does it use regardless of the array size?"
      ],
      explanation:
        "True. The juggling algorithm moves elements in cycles: for each position $i$, it stores $\\text{nums}[i]$ in a temporary variable, finds the destination index $(i + k) \\bmod n$, and shifts the element there. This repeats until the cycle returns. Only one temporary variable is needed, giving $\\mathrm{O}(1)$ space.\n\n" +
        "The trade-off is that it requires $\\gcd(n, k)$ cycles to be processed, making it more complex to implement correctly than the reversal approach."
    },
    {
      id: "q-ra-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "The three-step reversal algorithm for array rotation preserves the relative order of elements within each segment (the first $n-k$ elements and the last $k$ elements).",
      correctAnswer: "True",
      hints: [
        "Trace through the three reversal steps: what happens to the order within each segment?",
        "Reversing a sequence twice restores its original order. Does each segment get reversed twice?"
      ],
      explanation:
        "**Step 1:** The entire array is reversed.\n\n" +
        "**Step 2:** The first $k$ elements are reversed again — restoring their original relative order.\n\n" +
        "**Step 3:** The remaining $n - k$ elements are reversed again — restoring their original relative order.\n\n" +
        "Each segment is reversed twice, which returns it to its original order. The net effect is that the last $k$ elements are moved to the front as a block, and the first $n - k$ elements are moved to the back as a block, with internal order preserved."
    },
    {
      id: "q-ra-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Rotating an array of length $7$ by $k = 7$ positions results in:",
      options: [
        "All elements become zero",
        "The original array (unchanged)",
        "The array in reverse order",
        "Undefined behavior"
      ],
      correctAnswer: 1,
      hints: [
        "What is $k \\bmod n$ when $k = n$?",
        "After $n$ right rotations, where does each element end up?"
      ],
      explanation:
        "**Step 1:** Compute the effective rotation: $k \\bmod n = 7 \\bmod 7 = 0$.\n\n" +
        "**Step 2:** Rotating by 0 positions is a no-op — every element returns to its original position.\n\n" +
        "In general, rotating by any integer multiple of $n$ (i.e., $k = m \\cdot n$) leaves the array unchanged."
    },
  ],

  "contains-duplicate": [
    {
      id: "q-cd-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the sorting-based approach for the Contains Duplicate problem?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(n^2)$"],
      correctAnswer: 2,
      hints: [
        "What is the time cost of a comparison-based sort?",
        "After sorting, how do you check for duplicates?"
      ],
      explanation:
        "The sorting approach works in two steps:\n\n" +
        "1. Sort the array: $\\mathrm{O}(n \\log n)$.\n" +
        "2. Scan adjacent pairs to detect duplicates: $\\mathrm{O}(n)$.\n\n" +
        "Total: $\\mathrm{O}(n \\log n) + \\mathrm{O}(n) = \\mathrm{O}(n \\log n)$."
    },
    {
      id: "q-cd-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The hash-set approach for Contains Duplicate achieves $\\mathrm{O}(n)$ average time complexity.",
      correctAnswer: "True",
      hints: [
        "For each element, what hash-set operation is performed, and what is its average cost?",
        "What happens when a duplicate is found during insertion?"
      ],
      explanation:
        "True. As we iterate through the array, we attempt to insert each element into a hash set. If the element is already present, insertion fails (or we detect it via lookup) and we return true.\n\n" +
        "Each insertion and lookup is $\\mathrm{O}(1)$ on average. Since we perform at most $n$ insertions and $n$ lookups, the total average time is $\\mathrm{O}(n)$."
    },
    {
      id: "q-cd-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the space complexity of the hash-set approach for Contains Duplicate?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$"],
      correctAnswer: 2,
      hints: [
        "In the worst case (no duplicates), when does the algorithm terminate?",
        "How many elements are in the hash set at that point?"
      ],
      explanation:
        "$\\mathrm{O}(n)$ in the worst case. If there are no duplicates, the algorithm reaches the end of the array having inserted all $n$ elements into the set before returning false. Each element costs one hash-table entry, so the space usage grows linearly with $n$."
    },
    {
      id: "q-cd-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a **sorted** array, duplicate detection can be performed in $\\mathrm{O}(1)$ extra space. Which approach achieves this?",
      options: [
        "Hash set",
        "Two pointers",
        "Sorting first",
        "Both hash set and sorting first"
      ],
      correctAnswer: 1,
      hints: [
        "In a sorted array, where do duplicate elements appear relative to each other?",
        "Do we need any additional data structures to check neighbors in a sorted array?"
      ],
      explanation:
        "Two pointers (or a single pass with index comparison) suffices.\n\n" +
        "Since the array is sorted, duplicate elements are adjacent. A single pass comparing $\\text{nums}[i]$ with $\\text{nums}[i+1]$ for all valid $i$ will detect any duplicate in $\\mathrm{O}(n)$ time and $\\mathrm{O}(1)$ extra space.\n\n" +
        "No hash set is needed (space $\\mathrm{O}(n)$ avoided), and no sorting is needed (already sorted)."
    },
    {
      id: "q-cd-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the best (lowest) time complexity achievable for the Contains Duplicate problem?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n \\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(\\log n)$"],
      correctAnswer: 2,
      hints: [
        "What is the information-theoretic lower bound on the number of elements you must examine?",
        "Is $\\mathrm{O}(n)$ achievable?"
      ],
      explanation:
        "$\\mathrm{O}(n)$ is the best achievable. We must examine every element at least once in the worst case (e.g., when the duplicate is at the very end), giving a lower bound of $\\Omega(n)$. The hash-set approach achieves exactly $\\mathrm{O}(n)$ average time."
    },
  ],

  "longest-common-prefix": [
    {
      id: "q-lcp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'For the string array $["flower", "flow", "flight"]$, the longest common prefix (LCP) is:',
      options: ['"fl"', '"flow"', '"f"', '"flight"'],
      correctAnswer: 0,
      hints: [
        'Check the strings character by character from left to right.',
        '"flow" and "flight" match on "fl" but diverge at position 2: "o" vs "i".'
      ],
      explanation:
        'Scanning character by character:\n\n' +
        '\\begin{align*}\n' +
        '\\text{Position 0:} &\\quad f, f, f \\; \\checkmark \\\\\n' +
        '\\text{Position 1:} &\\quad l, l, l \\; \\checkmark \\\\\n' +
        '\\text{Position 2:} &\\quad o, o, i \\; \\text{(mismatch: } o \\neq i \\text{)}\n' +
        '\\end{align*}\n\n' +
        'The common prefix stops at position 2. The LCP is "fl".'
    },
    {
      id: "q-lcp-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The vertical scanning approach for Longest Common Prefix has worst-case time complexity:",
      options: [
        "$\\mathrm{O}(n \\log n)$",
        "$\\mathrm{O}(n \\cdot m)$ where $m$ is the length of the shortest string",
        "$\\mathrm{O}(n \\cdot m)$ where $m$ is the length of the longest string",
        "$\\mathrm{O}(m)$"
      ],
      correctAnswer: 2,
      hints: [
        "In the worst case, how many characters are examined?",
        "Vertical scanning examines each character at position $i$ across all $n$ strings until a mismatch is found."
      ],
      explanation:
        "**Step 1:** Vertical scanning examines character $i$ of every string, stopping when a mismatch is found.\n\n" +
        "**Step 2:** In the worst case (all strings are identical or the LCP is the entire shortest string), we examine every character of every string:\n\n" +
        "\\[\n\\text{Worst case} = n \\cdot m \\quad \\text{where } m = \\text{length of the longest string}\n\\]\n\n" +
        "Note: if $m$ denotes the length of the shortest string, the bound becomes $\\mathrm{O}(n \\cdot m)$ where $m = \\min_i |s_i|$, which is also a valid characterization."
    },
    {
      id: "q-lcp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "After sorting the strings, finding the LCP by comparing only the lexicographically smallest and largest strings reduces the complexity to:",
      options: [
        "$\\mathrm{O}(n \\cdot m)$",
        "$\\mathrm{O}(n \\cdot m \\log n)$",
        "$\\mathrm{O}(m \\log n)$",
        "$\\mathrm{O}(n \\log n \\cdot m)$"
      ],
      correctAnswer: 1,
      hints: [
        "Sorting $n$ strings of maximum length $m$ costs how much?",
        "After sorting, only two strings (first and last) are compared for the LCP. How much does that comparison cost?"
      ],
      explanation:
        "Sorting $n$ strings with maximum length $m$ costs $\\mathrm{O}(n \\log n)$ string comparisons. Each comparison may cost up to $\\mathrm{O}(m)$, giving $\\mathrm{O}(n \\log n \\cdot m)$ for sorting.\n\n" +
        "After sorting, the most divergent pair is the first and last strings in lexicographic order. Their LCP is the LCP of the entire array. Comparing these two strings costs $\\mathrm{O}(m)$.\n\n" +
        "Total: $\\mathrm{O}(n \\log n \\cdot m) + \\mathrm{O}(m) = \\mathrm{O}(n \\log n \\cdot m)$."
    },
    {
      id: "q-lcp-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "If any string in the input array is empty, the longest common prefix is an empty string.",
      correctAnswer: "True",
      hints: [
        "What is the length of an empty string?",
        "Can an empty string share any prefix characters with a non-empty string?"
      ],
      explanation:
        'True. An empty string shares no common prefix with any string (except itself). By definition, the LCP of any set containing an empty string and at least one non-empty string is "".\n\n' +
        "This is also handled naturally by the vertical scanning algorithm: scanning position 0 immediately exceeds the length of the empty string, so the algorithm returns \"\"."
    },
    {
      id: "q-lcp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The trie (prefix tree) approach for LCP has what primary advantage over other methods?",
      options: [
        "Lower time complexity than $\\mathrm{O}(n \\cdot m)$ for a single LCP query",
        "$\\mathrm{O}(1)$ space usage",
        "Efficient for repeated LCP queries on the same set of strings",
        "Superior Unicode handling"
      ],
      correctAnswer: 2,
      hints: [
        "Building a trie from $n$ strings of length $m$ costs upfront work.",
        "Once the trie is built, what is the cost of an LCP query? How does this compare to doing the work from scratch?"
      ],
      explanation:
        "The primary advantage of the trie approach is efficient repeated querying.\n\n" +
        "Building the trie costs $\\mathrm{O}(n \\cdot m)$ upfront. However, once built, answering an LCP query for any subset of strings (or the full set) costs $\\mathrm{O}(m)$ - walking down the trie to the deepest common node.\n\n" +
        "If you need to compute the LCP only once, the trie offers no asymptotic advantage. But if $q$ LCP queries are needed on the same string set, naive repeated queries cost $\\mathrm{O}(q \\cdot n \\cdot m)$ while the trie approach costs $\\mathrm{O}(n \\cdot m + q \\cdot m)$."
    },
  ],

  "valid-parentheses": [
    {
      id: "q-vp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which data structure is optimal for validating a string of parentheses?",
      options: ["Queue", "Stack", "Dynamic array", "Linked list"],
      correctAnswer: 1,
      hints: [
        "When we encounter an opening bracket, we want to remember it and match it with a future closing bracket.",
        "When we encounter a closing bracket, which opening bracket should it match - the most recent or the oldest unmatched one?"
      ],
      explanation:
        "The **stack** is the optimal data structure. Its LIFO (Last In, First Out) property matches the semantics of bracket matching: the most recently seen opening bracket must be matched by the next closing bracket.\n\n" +
        "Algorithm: push each opening bracket onto the stack; when a closing bracket is encountered, pop the top and verify it is the corresponding opener. If at any point the stack is empty on a close or the types don't match, the string is invalid.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(n) \\text{ (worst case, all openers)}.\]"
    },
    {
      id: "q-vp-2",
      type: "true-false",
      difficulty: "easy",
      question: 'The string "${[()]}$" is a valid parentheses string.',
      correctAnswer: "True",
      hints: [
        "Trace through each character: push openers, pop and match on closers.",
        "At the end, is the stack empty?"
      ],
      explanation:
        'True. Step-by-step:\n\n' +
        "\\begin align*\n" +
        "\\text{Read } '{': &\\quad \\text{push } \\{ \\quad &\\quad \\text{Stack: } \\{ \\\\\n" +
        "\\text{Read } '[': &\\quad \\text{push } \\[ \\quad &\\quad \\text{Stack: } \\{ \\[ \\\\\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } \\{ \\[ ( \\\\\n" +
        "\\text{Read } ')': &\\quad \\text{pop } (, \\text{ matches } ) \\quad &\\quad \\text{Stack: } \\{ \\[ \\\\\n" +
        "\\text{Read } ']': &\\quad \\text{pop } \\[ , \\text{ matches } ] \\quad &\\quad \\text{Stack: } \\{ \\\\\n" +
        "\\text{Read } '}': &\\quad \\text{pop } \\{, \\text{ matches } \\} \\quad &\\quad \\text{Stack: } \\epsilon\n" +
        "\\end align*\n\n" +
        "Stack is empty at the end - the string is valid."
    },
    {
      id: "q-vp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The stack-based approach for Valid Parentheses has what time and space complexity?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$", "$\\mathrm{O}(\\log n)$"],
      correctAnswer: 1,
      hints: [
        "How many characters are processed?",
        "What is the cost of each push and pop operation?"
      ],
      explanation:
        "Each of the $n$ characters is processed exactly once with at most one stack push or pop. Both operations are $\\mathrm{O}(1)$.\n\n" +
        "\\[\\text{Time complexity: } \\mathrm{O}(n)\\]\n" +
        "\\[\\text{Space complexity: } \\mathrm{O}(n) \\text{ in the worst case (e.g., } \"(((((\" \\text{)}\]\n\n" +
        "No nested loops - this is optimal since we must look at every character at least once."
    },
    {
      id: "q-vp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following is NOT a valid parentheses string?",
      options: ['"${[()]}$"', '"([)]"', '"()[]{}"', '"{{}}"'],
      correctAnswer: 1,
      hints: [
        "Trace through \"([)]\" character by character using a stack.",
        "When you encounter ')', what is on top of the stack? Does it match?"
      ],
      explanation:
        '"([)]" is NOT valid.\n\n' +
        "\\begin align*\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } ( \\\\\n" +
        "\\text{Read } '[': &\\quad \\text{push } \\[ \\quad &\\quad \\text{Stack: } ( \\[ \\\\\n" +
        "\\text{Read } ')': &\\quad \\text{Top of stack is } \\[ \\neq ( \\Rightarrow \\text{MISMATCH}\n" +
        "\\end align*\n\n" +
        "The stack reveals the error immediately: when ')' appears, the top of the stack is '[', not '('. The other three strings are all valid."
    },
    {
      id: "q-vp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "An empty string (length 0) is considered:",
      options: ["Valid", "Invalid", "Implementation-dependent", "Neither valid nor invalid"],
      correctAnswer: 0,
      hints: [
        "What is the definition of a \"balanced\" or \"valid\" parentheses string?",
        "Can you find any violated condition in an empty string?"
      ],
      explanation:
        "The empty string is **valid**. It is vacuously true: there are no brackets to mismatch, no nesting violations, and the stack is empty at the end. Every condition that defines validity is trivially satisfied.\n\n" +
        "This is consistent with the algorithm: with zero characters, the loop terminates immediately and the empty stack correctly leads to a \"valid\" return."
    },
    {
      id: "q-vp-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the minimum number of bracket insertions needed to make the string ")((" valid?',
      options: ["$1$", "$2$", "$3$", "$4$"],
      correctAnswer: 2,
      hints: [
        "Track unmatched closing brackets and unmatched opening brackets separately.",
        "Each unmatched ')' needs one '(' inserted before it; each unmatched '(' needs one ')' inserted after it."
      ],
      explanation:
        "3 insertions are needed.\n\n" +
        "Scanning the string:\n\n" +
        "\\begin align*\n" +
        "\\text{Read } ')': &\\quad \\text{stack empty - unmatched closer, add 1 opening bracket} \\Rightarrow \\text{total} = 1 \\\\\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } ( \\\\\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } (( \\\\\n" +
        "\\text{End}: &\\quad \\text{2 unmatched openers in stack} \\Rightarrow \\text{add 2 closers} \\Rightarrow \\text{total} = 3\n" +
        "\\end align*\n\n" +
        "General formula: minimum insertions = (number of unmatched closers) + (number of unmatched openers) at the end of a single left-to-right scan."
    },
  ],

  // ── LINKED LISTS ─────────────────────────────────────────────────────
  "reverse-linked-list": [
    {
      id: "q-rll-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Iterative linked list reversal uses how many pointer variables?",
      options: ["$1$", "$2$", "$3$", "$4$"],
      correctAnswer: 2,
      hints: [
        "We need a pointer to track the node before the current one (for reversing the link).",
        "We need a pointer to the current node being processed.",
        "When we reverse the current node's next pointer, what do we lose? What must we save?"
      ],
      explanation:
        "Three pointers are needed: $\\text{prev}$, $\\text{curr}$, and $\\text{next}$.\n\n" +
        "At each step, we:\n" +
        "1. Save $\\text{next} = \\text{curr.next}$ (otherwise we lose the rest of the list)\n" +
        "2. Reverse: $\\text{curr.next} = \\text{prev}$\n" +
        "3. Advance: $\\text{prev} = \\text{curr}$, $\\text{curr} = \\text{next}$\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(1).\\]"
    },
    {
      id: "q-rll-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Recursive linked list reversal uses $\\mathrm{O}(n)$ stack space due to the call stack.",
      correctAnswer: "True",
      hints: [
        "For a list of $n$ nodes, how many recursive calls are made before hitting the base case?",
        "Each recursive call consumes stack space. How deep does the recursion go?"
      ],
      explanation:
        "True. For a list of $n$ nodes, the recursive algorithm makes $n$ consecutive calls before reaching the base case (the null node). Each call frame occupies space on the call stack. At the deepest point, there are $n$ active stack frames.\n\n" +
        "\\[\\text{Space complexity: } \\mathrm{O}(n) \\text{ (call stack)}\\]\n\n" +
        "The iterative approach achieves $\\mathrm{O}(1)$ space by using explicitly managed pointer variables instead of the call stack."
    },
    {
      id: "q-rll-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of reversing a linked list iteratively?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$", "$\\mathrm{O}(\\log n)$"],
      correctAnswer: 1,
      hints: [
        "How many nodes are visited during reversal?",
        "Is there any nested looping?"
      ],
      explanation:
        "$\\mathrm{O}(n)$. Each of the $n$ nodes is visited exactly once. At each node, a constant number of pointer operations are performed. This is optimal - any algorithm must examine every node at least once, giving a lower bound of $\\Omega(n)$."
    },
    {
      id: "q-rll-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "After reversing the linked list $1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$, what is the new head node?",
      options: ["Node with value $1$", "Node with value $5$", "Node with value $4$", "null"],
      correctAnswer: 1,
      hints: [
        "In the original list, which node's next pointer becomes null after reversal?",
        "Which node was originally at the end of the list?"
      ],
      explanation:
        "Node 5 becomes the new head.\n\n" +
        "After reversal, the direction of every link is inverted:\n\n" +
        "$1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5 \\rightarrow \\text{null}$\n\n" +
        "becomes:\n\n" +
        "$\\text{null} \\leftarrow 1 \\leftarrow 2 \\leftarrow 3 \\leftarrow 4 \\leftarrow 5$\n\n" +
        "Node 1's next pointer is set to null, and Node 5 is now at the head of the reversed list."
    },
    {
      id: "q-rll-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "A sublist (a contiguous portion) of a linked list can be reversed without reversing the entire list.",
      correctAnswer: "True",
      hints: [
        "Think about identifying the boundary nodes before and after the sublist.",
        "After reversing the sublist portion, how do you reconnect it to the rest of the list?"
      ],
      explanation:
        "True. The key steps are:\n\n" +
        "1. Locate the node $\\text{beforeStart}$ immediately before the sublist's start node.\n" +
        "2. Disconnect the sublist: $\\text{beforeStart.next} = \\text{null}$.\n" +
        "3. Reverse the sublist in place using the standard three-pointer technique.\n" +
        "4. Reconnect: $\\text{beforeStart.next}$ now points to the new head of the reversed sublist, and the sublist's tail points to the node that originally followed it.\n\n" +
        "Example: reversing nodes $2$ to $4$ in $1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$ gives $1 \\rightarrow 4 \\rightarrow 3 \\rightarrow 2 \\rightarrow 5$."
    },
    {
      id: "q-rll-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the space complexity of the recursive approach to reversing a linked list?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$"],
      correctAnswer: 2,
      hints: [
        "How many recursive calls are on the call stack at the deepest point of the recursion?",
        "For a list of $n$ nodes, how deep does the recursion go?"
      ],
      explanation:
        "$\\mathrm{O}(n)$ space due to the call stack. The recursion depth equals the number of nodes $n$: the function recurses all the way to the last node before beginning to return and reverse links.\n\n" +
        "Each of the $n$ stack frames stores the current node pointer and the return address. This linear space usage is the main trade-off versus the iterative approach, which uses only a constant number of pointer variables ($\\mathrm{O}(1)$ space)."
    },
  ],

  "detect-cycle": [
    {
      id: "q-dc-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Floyd's cycle detection algorithm uses:",
      options: ["Two stacks", "Two pointers", "Hash set", "Sorting"],
      correctAnswer: 1,
      hints: [
        "Think of the \"tortoise and hare\" story: one moves slowly, the other moves quickly.",
        "If there is a cycle, the faster pointer eventually laps the slower one."
      ],
      explanation:
        "Two pointers (Floyd's algorithm, also called the Tortoise and Hare algorithm). The slow pointer advances one node at a time; the fast pointer advances two nodes at a time. If a cycle exists, the fast pointer laps the slow pointer - they must meet inside the cycle.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(1).\\]"
    },
    {
      id: "q-dc-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The hash-set approach for cycle detection has $\\mathrm{O}(n)$ time and $\\mathrm{O}(n)$ space complexity.",
      correctAnswer: "True",
      hints: [
        "How many nodes can be stored in the hash set in the worst case?",
        "What happens when a node is visited for the second time?"
      ],
      explanation:
        "True. Each visited node is added to the hash set. If we encounter a node already in the set, a cycle exists. In the worst case (no cycle), all $n$ nodes are inserted before the algorithm terminates.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(n).\\]\n\n" +
        "This matches Floyd's $\\mathrm{O}(n)$ time but uses $\\mathrm{O}(n)$ space instead of $\\mathrm{O}(1)$. The hash-set approach is conceptually simpler."
    },
    {
      id: "q-dc-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Floyd's cycle detection algorithm has what time complexity?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n \\log n)$"],
      correctAnswer: 1,
      hints: [
        "Let $u$ be the distance from the head to the cycle entrance, and $k$ be the cycle length.",
        "After the slow pointer enters the cycle (at step $u$), the fast pointer is already inside. How many steps until they meet?"
      ],
      explanation:
        "$\\mathrm{O}(n)$. Let $u$ be the distance from the head to the cycle entrance, and $k$ be the cycle length. The slow pointer enters the cycle after $u$ steps. At that moment, the fast pointer is somewhere inside the cycle.\n\n" +
        "The fast pointer gains 1 step on the slow pointer per iteration. They meet after at most $k$ additional iterations. Since $u + k \\leq 2n$:\n\n" +
        "\\[T(n) = \\mathrm{O}(n + k) = \\mathrm{O}(n).\\]"
    },
    {
      id: "q-dc-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If the slow and fast pointers of Floyd's algorithm meet inside the cycle, the cycle length can be found by:",
      options: [
        "Keeping one pointer stationary, moving the other until it returns",
        "Counting nodes from the meeting point until returning to the start of the cycle",
        "Binary searching the list length",
        "Computing the distance from the head to the meeting point"
      ],
      correctAnswer: 0,
      hints: [
        "Both pointers are at the same node inside the cycle when they meet.",
        "If one pointer stays put and the other traverses the cycle, when does it return to the starting point?"
      ],
      explanation:
        "From the meeting point, keep one pointer fixed and move the other step by step until it returns to the same node. The number of steps taken is exactly the cycle length $k$.\n\n" +
        "Example: if the meeting point is $M$ and traversing $M \\rightarrow A \\rightarrow B \\rightarrow C \\rightarrow M$ takes 4 steps, then the cycle length is 4."
    },
    {
      id: "q-dc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "After the slow and fast pointers meet inside the cycle, to find the cycle entrance node, you should move one pointer to the head and then:",
      options: [
        "Keep the other pointer stationary",
        "Move both pointers one step at a time until they meet",
        "Move the fast pointer one step at a time",
        "Reset both pointers to the head"
      ],
      correctAnswer: 1,
      hints: [
        "After the meeting, one pointer is at the meeting point and one is at the head.",
        "Both pointers should travel the same distance. Where do they meet?"
      ],
      explanation:
        "Move both pointers one step at a time. When they meet again, that node is the cycle entrance.\n\n" +
        "Mathematical justification: let $u$ be the distance from head to cycle entrance, and $k$ be the cycle length. At the meeting point, the slow pointer has traveled $u + a$ steps and the fast pointer $u + a + b$ steps where $b$ is some multiple of $k$. Since fast travels twice slow: $2(u + a) = u + a + b \\Rightarrow u = b - a$. The pointer from the head travels $u$ steps; the pointer from the meeting point also travels $u$ steps (since $b - a \\equiv -a \\pmod{k}$). They meet at the cycle entrance."
    },
    {
      id: "q-dc-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does Floyd's algorithm return when the linked list has no cycle?",
      options: [
        "The last node of the list",
        "null (the fast pointer reaches the end of the list)",
        "The middle node",
        "The head node"
      ],
      correctAnswer: 1,
      hints: [
        "The fast pointer moves 2 steps at a time. In an acyclic list, where does it eventually arrive?",
        "What condition terminates the while loop?"
      ],
      explanation:
        "null (or equivalently, the fast pointer reaches the end of the list).\n\n" +
        "The loop condition is $\\text{fast} \\neq \\text{null} \\land \\text{fast.next} \\neq \\text{null}$. In an acyclic list, the fast pointer eventually skips past the last node (null), and the condition fails. The algorithm returns false/null - no cycle detected."
    },
  ],

  "merge-sorted-lists": [
    {
      id: "q-msl-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Merging two sorted linked lists uses which technique?",
      options: ["Two stacks", "Two pointers", "Recursion only", "Sorting both lists"],
      correctAnswer: 1,
      hints: [
        "Both input lists are already sorted. Where is the minimum element at any step?",
        "After picking an element from one list, which pointer advances?"
      ],
      explanation:
        "Two pointers. At each step, compare the values at the heads of both lists, attach the smaller node to the result, and advance that list's pointer. This is essentially the merge step of merge sort.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(m + n), \\quad \\text{Space: } \\mathrm{O}(1) \\text{ (in-place, just pointer rewiring)}.\]"
    },
    {
      id: "q-msl-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Merging $k$ sorted lists of total $n$ elements using a min-heap has what time complexity?",
      options: ["$\\mathrm{O}(kn)$", "$\\mathrm{O}(n \\log k)$", "$\\mathrm{O}(kn \\log k)$", "$\\mathrm{O}(k + n)$"],
      correctAnswer: 1,
      hints: [
        "The heap holds at most $k$ elements at any time.",
        "Each of the $n$ total elements is inserted into and removed from the heap at most once. What is the cost per heap operation?"
      ],
      explanation:
        "$\\mathrm{O}(n \\log k)$. Each of the $n$ elements is pushed into and popped from a min-heap of size at most $k$. Each heap operation costs $\\mathrm{O}(\\log k)$.\n\n" +
        "\\[\\text{Total time} = n \\times \\mathrm{O}(\\log k) = \\mathrm{O}(n \\log k).\\]\n\n" +
        "This is significantly better than the naive $\\mathrm{O}(kn)$ approach (repeatedly scanning across all $k$ lists)."
    },
    {
      id: "q-msl-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "The divide-and-conquer approach to merging $k$ sorted lists takes $\\mathrm{O}(n \\log k)$ time.",
      correctAnswer: "True",
      hints: [
        "In round 1, $k$ lists are paired into $k/2$ merged lists. In round 2, $k/4$ lists. How many rounds until one list remains?",
        "Each round processes all $n$ elements. How many rounds?"
      ],
      explanation:
        "True. Divide and conquer works in $\\log k$ rounds:\n\n" +
        "Round 1: pair up $k$ lists, merge each pair $\\Rightarrow k/2$ lists.\n" +
        "Round 2: pair up $k/2$ lists, merge each pair $\\Rightarrow k/4$ lists.\n" +
        "...\n" +
        "After $\\log k$ rounds: 1 merged list.\n\n" +
        "Each round scans all $n$ elements once: $\\mathrm{O}(n)$ per round. Total: $\\mathrm{O}(n \\log k)$.\n\n" +
        "This matches the heap-based approach asymptotically, but the heap approach is often simpler to implement."
    },
    {
      id: "q-msl-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Merging $[1, 2, 4]$ and $[1, 3, 4]$ gives:",
      options: ["$[1, 1, 2, 3, 4, 4]$", "$[1, 2, 3, 4]$", "$[1, 4, 3, 2, 1, 4]$", "$[1, 1, 4, 4, 2, 3]$"],
      correctAnswer: 0,
      hints: [
        "At each step, compare the heads of both lists and pick the smaller value.",
        "When values are equal, you may pick from either list - the result is the same."
      ],
      explanation:
        "\\begin align*\n" +
        "\\text{Compare } 1 \\text{ and } 1: &\\quad \\text{pick } 1 \\text{ (from list 1 or 2)} \\\\\n" +
        "\\text{Compare } 2 \\text{ and } 1: &\\quad \\text{pick } 1 \\text{ (from list 2)} \\\\\n" +
        "\\text{Compare } 2 \\text{ and } 3: &\\quad \\text{pick } 2 \\text{ (from list 1)} \\\\\n" +
        "\\text{Compare } 4 \\text{ and } 3: &\\quad \\text{pick } 3 \\text{ (from list 2)} \\\\\n" +
        "\\text{Compare } 4 \\text{ and } 4: &\\quad \\text{pick } 4 \\text{ (from list 1)} \\\\\n" +
        "\\text{List 2 remaining: } 4: &\\quad \\text{pick } 4\n" +
        "\\end align*\n\n" +
        "Result: $[1, 1, 2, 3, 4, 4]$."
    },
    {
      id: "q-msl-5",
      type: "true-false",
      difficulty: "easy",
      question:
        "Merging two sorted linked lists of lengths $m$ and $n$ requires $\\mathrm{O}(m + n)$ space.",
      correctAnswer: "False",
      hints: [
        "Are new nodes being allocated, or are existing nodes being rewired?",
        "In-place merging changes only the next pointers of existing nodes."
      ],
      explanation:
        "False. We can merge in-place by rewiring the $\\text{next}$ pointers of the existing nodes - no new nodes are allocated. The algorithm uses only two pointer variables.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(m + n), \\quad \\text{Space: } \\mathrm{O}(1).\\]\n\n" +
        "The $\\mathrm{O}(m + n)$ term refers to the time complexity (each node is processed once), not the space usage."
    },
  ],

  "remove-nth-node": [
    {
      id: "q-rnn-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Removing the $n$-th node from the end of a singly linked list can be done in how many passes?",
      options: [
        "One pass (using two pointers)",
        "Two passes",
        "Three passes",
        "Binary search on the list"
      ],
      correctAnswer: 0,
      hints: [
        "Can you determine which node to delete with a single traversal?",
        "The two-pointer technique keeps a fixed distance of $n+1$ between the two pointers."
      ],
      explanation:
        "One pass (using two pointers). The two-pointer approach maintains a gap of exactly $n+1$ nodes between the fast and slow pointers. When the fast pointer reaches the end, the slow pointer is positioned at the node immediately before the target node, ready for deletion.\n\n" +
        "Specifically: advance fast $n+1$ steps ahead of slow, then advance both until fast reaches null. At that point, $\\text{slow.next}$ is the node to delete."
    },
    {
      id: "q-rnn-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the two-pointer approach to remove the $n$-th node from the end, the fast pointer should start how many positions ahead of the slow pointer?",
      options: [
        "Both pointers start at the same position",
        "Fast pointer is $n+1$ positions ahead",
        "Fast pointer is $n$ positions ahead",
        "Slow pointer is $n$ positions ahead"
      ],
      correctAnswer: 1,
      hints: [
        "If fast is $n+1$ ahead and both advance until fast reaches null, where is slow?",
        "At that point, slow.next points to the node to delete. What is the distance from head to slow?"
      ],
      explanation:
        "The fast pointer starts $n+1$ positions ahead of the slow pointer.\n\n" +
        "When fast reaches null (i.e., fast.next = null), slow is positioned such that slow.next is the $n$-th node from the end. This is because:\n\n" +
        "\\[\\text{distance from slow to end} = (n+1) + (\\text{distance fast traveled}) - (\\text{distance slow traveled}) = n+1.\\]\n\n" +
        "So deleting slow.next correctly removes the $n$-th node from the end."
    },
    {
      id: "q-rnn-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using a dummy head node simplifies the edge case of removing the head node of a linked list.",
      correctAnswer: "True",
      hints: [
        "What happens when the node to delete is the original head?",
        "With a dummy node, does the real head need special-case handling?"
      ],
      explanation:
        "True. Without a dummy head, removing the first node requires a special case: $\\text{head} = \\text{head.next}$.\n\n" +
        "With a dummy node ($\\text{dummy.next} = \\text{head}$), the node to delete is always found by advancing the pointers $\\log n$ times and then executing $\\text{slow.next} = \\text{slow.next.next}$. The head removal is handled uniformly because the dummy node provides a preceding node in all cases.\n\n" +
        "This pattern (dummy head) is standard for single-linked list deletion problems."
    },
    {
      id: "q-rnn-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For the list $1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$, removing the 2nd node from the end yields:",
      options: ["$1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4$", "$1 \\rightarrow 2 \\rightarrow 4 \\rightarrow 5$", "$1 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$", "$2 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$"],
      correctAnswer: 2,
      hints: [
        "Number the positions from the end: position 1 = node 5, position 2 = node 4.",
        "Which node's value is 4? Which node precedes it?"
      ],
      explanation:
        "Counting from the end: position 1 is node 5, position 2 is node 4. Removing the 2nd from the end means removing node 4.\n\n" +
        "The predecessor of node 4 is node 3. After removal:\n\n" +
        "$1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 5$.\n\n" +
        "Answer: $1 \\rightarrow 3 \\rightarrow 4 \\rightarrow 5$."
    },
    {
      id: "q-rnn-5",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the two-pointer approach to remove the $n$-th node from the end?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(1)$"],
      correctAnswer: 1,
      hints: [
        "How far does the fast pointer travel? How far does the slow pointer travel?",
        "Is there any nested traversal?"
      ],
      explanation:
        "$\\mathrm{O}(n)$. The fast pointer advances $n+1$ steps, then both pointers advance simultaneously until fast reaches null. In the worst case (removing near the head), the slow pointer travels at most $n$ steps total. Each node is visited at most once.\n\n" +
        "This is more efficient than the two-pass solution (which would traverse the list twice), though both are $\\mathrm{O}(n)$."
    },
  ],

  "palindrome-linked-list": [
    {
      id: "q-pll-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "To check whether a linked list is a palindrome, a valid approach is to:",
      options: [
        "Compare only the head and tail nodes",
        "Reverse the second half and compare with the first half",
        "Use a stack only",
        "Sort the list and compare"
      ],
      correctAnswer: 1,
      hints: [
        "A palindrome reads the same forwards and backwards. If you reverse the second half, what should it equal?",
        "What does reversing the second half of a palindrome produce?"
      ],
      explanation:
        "Reverse the second half and compare with the first half. If they match node-by-node, the list is a palindrome.\n\n" +
        "Steps: (1) find the middle using slow/fast pointers, (2) reverse the second half, (3) compare the two halves, (4) optionally restore the second half by reversing again.\n\n" +
        "The stack-only approach also works (push all values, compare while popping) but uses $\\mathrm{O}(n)$ space. The reverse-and-compare approach can achieve $\\mathrm{O}(1)$ space."
    },
    {
      id: "q-pll-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The stack-based palindrome check uses $\\mathrm{O}(n)$ extra space.",
      correctAnswer: "True",
      hints: [
        "How many values are pushed onto the stack?",
        "What is the maximum size of the stack?"
      ],
      explanation:
        "True. The stack-based approach pushes all $n$ node values onto the stack (using $\\mathrm{O}(n)$ space), then pops and compares with a second traversal. This detects mismatches from the ends inward.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(n).\\]\n\n" +
        "The space can be reduced to $\\mathrm{O}(1)$ by reversing the second half in-place instead."
    },
    {
      id: "q-pll-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An alternative to reversing the second half for palindrome checking is:",
      options: [
        "It is impossible without extra data structures",
        "Using the recursion call stack",
        "Using two pointers starting from the center and moving outward",
        "Using a hash map"
      ],
      correctAnswer: 1,
      hints: [
        "Recursion builds up a call stack as it traverses deeper into the list.",
        "As the recursion unwinds, what is being compared against the forward traversal?"
      ],
      explanation:
        "Using the recursion call stack. The recursive function returns the current node as it unwinds. As it returns, it compares the node from the parameter (moving forward) with the node being returned (moving backward from the end). A mismatch indicates non-palindrome.\n\n" +
        "This still uses $\\mathrm{O}(n)$ space (the call stack), but it achieves palindrome checking without explicit data structure allocation. However, it risks stack overflow for very long lists."
    },
    {
      id: "q-pll-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Is the linked list $1 \\rightarrow 2 \\rightarrow 1$ a palindrome?",
      options: ["Yes", "No", "Depends on list length", "Cannot be determined"],
      correctAnswer: 0,
      hints: [
        "Write out the sequence of values in order and in reverse.",
        "Do they match?"
      ],
      explanation:
        "Yes. Reading forward: $1, 2, 1$. Reading backward: $1, 2, 1$. Since the sequence is identical in both directions, $1 \\rightarrow 2 \\rightarrow 1$ is a palindrome."
    },
    {
      id: "q-pll-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the optimal (minimum) space complexity for checking whether a linked list is a palindrome?",
      options: ["$\\mathrm{O}(n)$", "$\\mathrm{O}(n/2)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(1)$"],
      correctAnswer: 3,
      hints: [
        "Can we check a palindrome without storing any elements?",
        "What does reversing the second half in-place use?"
      ],
      explanation:
        "$\\mathrm{O}(1)$ is achievable. The approach:\n\n" +
        "1. Find the middle using slow/fast pointers (O(n) time).\n" +
        "2. Reverse the second half in-place (O(n) time, O(1) space).\n" +
        "3. Compare the first half with the reversed second half.\n" +
        "4. (Optional) Restore the list by reversing the second half again.\n\n" +
        "This uses only a constant number of pointer variables: $\\mathrm{O}(1)$ extra space."
    },
  ],

  // ── STACKS & QUEUES ──────────────────────────────────────────────────
  "balanced-parentheses": [
    {
      id: "q-bp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which data structure is used to check whether a parentheses string is balanced?",
      options: ["Queue", "Stack", "Dynamic array", "Min-heap"],
      correctAnswer: 1,
      hints: [
        "When you see an opening bracket, you want to remember it. When you see a closing bracket, which opener should it match - the most recent or the oldest?",
        "LIFO = Last In, First Out"
      ],
      explanation:
        "Stack. The LIFO property perfectly matches bracket matching: the most recently opened bracket must be closed first. Push openers, pop and verify on closers.\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(n).\\]"
    },
    {
      id: "q-bp-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the balanced parentheses check?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$", "$\\mathrm{O}(\\log n)$"],
      correctAnswer: 1,
      hints: [
        "Each character is processed exactly once.",
        "Push and pop are both $\\mathrm{O}(1)$ operations."
      ],
      explanation:
        "$\\mathrm{O}(n)$. A single left-to-right pass processes each of the $n$ characters. Each character triggers at most one push or one pop, both $\\mathrm{O}(1)$. No nested loops."
    },
    {
      id: "q-bp-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "If the stack is empty at the end of processing the string (and no mismatches were found), the parentheses are balanced.",
      correctAnswer: "True",
      hints: [
        "An empty stack at the end means every opening bracket had a matching closing bracket.",
        "What condition is violated if the stack is non-empty?"
      ],
      explanation:
        "True. An empty stack at the end with no rejections means every opening bracket pushed was matched and popped by a corresponding closing bracket. This is precisely the definition of a balanced parentheses string."
    },
    {
      id: "q-bp-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following strings is NOT balanced?",
      options: ['"${[()]}$"', '"((()))"', '"([)]"', '"{}[]()[]"'],
      correctAnswer: 2,
      hints: [
        "Trace through '([)]' character by character with a stack.",
        "When ')' is read, what is on top of the stack?"
      ],
      explanation:
        '"([)]" is not balanced.\n\n' +
        "\\begin align*\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } ( \\\\\n" +
        "\\text{Read } '[': &\\quad \\text{push } \\[ \\quad &\\quad \\text{Stack: } ( \\[ \\\\\n" +
        "\\text{Read } ')': &\\quad \\text{Top of stack is } \\[ \\neq ( \\Rightarrow \\text{REJECT}\n" +
        "\\end align*\n\n" +
        "The other three are all balanced."
    },
    {
      id: "q-bp-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'For the string "${[]()}$", the stack operations at each character are:',
      options: [
        "Push all openers, then pop all closers at the end",
        "Push on each opener, pop and match on each closer",
        "Alternate between push and pop for each character",
        "Push openers, then conditionally pop based on lookahead"
      ],
      correctAnswer: 1,
      hints: [
        "Is there any buffering or deferring? Or is each closer matched immediately when encountered?",
        "Processing is character-by-character: push for openers, pop-and-verify for closers."
      ],
      explanation:
        "Push on each opener, pop and verify on each closer.\n\n" +
        "\\begin align*\n" +
        "\\text{Read } '{': &\\quad \\text{push } \\{ \\\\\n" +
        "\\text{Read } '[': &\\quad \\text{push } \\[ \\\\\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\\\\n" +
        "\\text{Read } ')': &\\quad \\text{pop } (, \\text{ matches } ) \\\\\n" +
        "\\text{Read } ']': &\\quad \\text{pop } \\[ , \\text{ matches } ] \\\\\n" +
        "\\text{Read } '}': &\\quad \\text{pop } \\{, \\text{ matches } \\}\n" +
        "\\end align*\n\n" +
        "Stack is empty at end - balanced."
    },
    {
      id: "q-bp-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is the minimum number of bracket removals needed to make the string "((" valid?',
      options: ["$0$", "$1$", "$2$", "$3$"],
      correctAnswer: 1,
      hints: [
        "How many unmatched opening brackets remain at the end of a single scan?",
        "Each unmatched '(' needs one ')' added after it. How many such additions are needed?"
      ],
      explanation:
        "1 removal (or equivalently, 1 addition) is needed.\n\n" +
        "\\begin align*\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } ( \\\\\n" +
        "\\text{Read } '(': &\\quad \\text{push } ( \\quad &\\quad \\text{Stack: } (( \\\\\n" +
        "\\text{End}: &\\quad 2 \\text{ unmatched openers} \\Rightarrow \\text{add 2 closers} \\Rightarrow \\text{or remove 2 openers} \\\\\n" +
        "\\text{But: removing 1 opener} '(' \\text{ gives } '()' \\text{ which is balanced}\n" +
        "\\end align*\n\n" +
        "The minimum is 1: remove one of the openers, or add one closer after one of them."
    },
  ],

  "min-stack": [
    {
      id: "q-mns-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The most space-efficient design for a MinStack that supports $\\mathrm{O}(1)$ $\\text{getMin}()$ uses:",
      options: [
        "A single stack with a single min variable",
        "Two stacks (one for values, one for tracking minima)",
        "A single stack of $(value, currentMin)$ pairs",
        "A min-heap"
      ],
      correctAnswer: 2,
      hints: [
        "A single min variable loses history. When the current minimum is popped, what is the next minimum?",
        "We need to know the minimum at every state of the stack, not just the current global minimum."
      ],
      explanation:
        "A single stack of $(value, currentMin)$ pairs.\n\n" +
        "When pushing $(v)$: the stored $\\text{currentMin} = \\min(v, \\text{minAtTop})$. When popping: the previous minimum is now at the top of the stack as its $\\text{currentMin}$.\n\n" +
        "Space: $\\mathrm{O}(n)$ in the worst case. Time: all operations are $\\mathrm{O}(1)$.\n\n" +
        "The two-stacks variant achieves the same space and time but is conceptually equivalent - both store historical minimums."
    },
    {
      id: "q-mns-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the two-stacks MinStack design, the min stack tracks all historical minima, pushing a new entry only when the newly pushed value is less than or equal to the current minimum.",
      correctAnswer: "True",
      hints: [
        "When do we push to the min stack? When do we pop from it?",
        "If the new value is strictly greater than the current minimum, should the min stack change?"
      ],
      explanation:
        "True. The min stack stores $(value, minSoFar)$ pairs. We push to the min stack only when $\\text{newValue} \\leq \\text{currentMin}$. When the main stack pops a value that equals the top of the min stack, we pop the min stack as well - revealing the previous minimum."
    },
    {
      id: "q-mns-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A MinStack performs: push(5), push(3), push(7), getMin(), push(2), getMin(). The two getMin() calls return:",
      options: ["$3$, then $2$", "$3$, then $3$", "$2$, then $2$", "$5$, then $2$"],
      correctAnswer: 0,
      hints: [
        "Track the minimum after each push. After push(5): min=5. After push(3): min=3. After push(7): min=3. After push(2): min=2."
      ],
      explanation:
        "Step-by-step:\n\n" +
        "\\begin align*\n" +
        "\\text{push}(5): &\\quad \\text{min} = 5 \\\\\n" +
        "\\text{push}(3): &\\quad \\text{min} = 3 \\quad (3 < 5) \\\\\n" +
        "\\text{push}(7): &\\quad \\text{min} = 3 \\quad (7 \\geq 3, \\text{no change}) \\\\\n" +
        "\\text{getMin}(): &\\quad \\text{returns } 3 \\\\\n" +
        "\\text{push}(2): &\\quad \\text{min} = 2 \\quad (2 < 3) \\\\\n" +
        "\\text{getMin}(): &\\quad \\text{returns } 2\n" +
        "\\end align*\n\n" +
        "Results: $3$, then $2$."
    },
    {
      id: "q-mns-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When popping from a MinStack, the min stack should be popped:",
      options: [
        "Always, alongside the main stack",
        "Only when the popped value equals the current minimum (top of min stack)",
        "Never",
        "Only when the minimum changes"
      ],
      correctAnswer: 1,
      hints: [
        "Does popping always change the minimum?",
        "If we pop a value that was not the current minimum, should the min stack change?"
      ],
      explanation:
        "Only when the popped value equals the current minimum.\n\n" +
        "If we pop a value $v$ where $v > \\text{minStack.top}$, then $v$ never affected the minimum - the min stack should remain unchanged. But if $v = \\text{minStack.top}$, then $v$ was the minimum, and popping it reveals the previous minimum (now at the top of the min stack)."
    },
    {
      id: "q-mns-5",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the space complexity of the MinStack using $(value, min)$ pairs?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$"],
      correctAnswer: 2,
      hints: [
        "Each push stores one entry. With $n$ pushes, how many entries are stored?",
        "This is the space cost of achieving $\\mathrm{O}(1)$ getMin."
      ],
      explanation:
        "$\\mathrm{O}(n)$. Each push stores one $(value, currentMin)$ pair. With $n$ push operations, the stack holds $n$ pairs. This is the space-time trade-off: we use $\\mathrm{O}(n)$ space to achieve $\\mathrm{O}(1)$ getMin().\n\n" +
        "The two-stack variant also uses $\\mathrm{O}(n)$ total space (the min-stack holds at most $n$ entries)."
    },
  ],

  "implement-queue": [
    {
      id: "q-iq-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the two-stack queue, what is the amortized cost of the enqueue operation?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(\\log n)$", "Amortized $\\mathrm{O}(1)$"],
      correctAnswer: 3,
      hints: [
        "Enqueue always goes to stack1 via a single push. Is push $\\mathrm{O}(1)$?",
        "Elements are transferred from stack1 to stack2 at most once during the lifetime of the queue."
      ],
      explanation:
        "Amortized $\\mathrm{O}(1)$.\n\n" +
        "Enqueue: push to stack1. This is $\\mathrm{O}(1)$.\n\n" +
        "Dequeue: if stack2 is empty, transfer all elements from stack1 to stack2 by popping from stack1 and pushing to stack2. This costs $\\mathrm{O}(n)$ for $n$ elements. However, each element is transferred at most once. Spreading this cost over $n$ dequeue operations gives amortized $\\mathrm{O}(1)$ per operation."
    },
    {
      id: "q-iq-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "With the two-stack queue, the FIFO order of elements is correctly preserved.",
      correctAnswer: "True",
      hints: [
        "When elements go from stack1 to stack2, what is the reversal effect?",
        "What is the order of elements in stack2 (from top to bottom) after transfer?"
      ],
      explanation:
        "True. Stack1 (for enqueue) maintains elements in insertion order: $[\\text{front}, ..., \\text{back}]$. When transferring to stack2, the reversal produces: $[\\text{back}, ..., \\text{front}]$ with the front at the top. Popping from stack2 therefore yields elements in FIFO order."
    },
    {
      id: "q-iq-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If stack1 contains $[1, 2, 3]$ (where 1 is the front), and we perform one dequeue, stack2 becomes:",
      options: ["$[3, 2, 1]$", "$[1, 2, 3]$", "$[]$ (empty)", "$[1]$"],
      correctAnswer: 0,
      hints: [
        "Transfer from stack1 to stack2 by popping all elements. What is the resulting order in stack2?",
        "Popping from stack1 reverses the order: stack2 top = stack1 bottom = 3."
      ],
      explanation:
        "$[3, 2, 1]$.\n\n" +
        "Transfer: pop 1 from stack1, push to stack2; pop 2, push to stack2; pop 3, push to stack2. Stack2 (top to bottom): $[3, 2, 1]$.\n\n" +
        "The first dequeue returns 1 (the front of the original queue), which is stack1's bottom element - now at stack2's top after reversal."
    },
    {
      id: "q-iq-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is a single stack insufficient for an efficient queue implementation?",
      options: [
        "A stack cannot maintain any ordering",
        "Dequeuing from a single stack requires $\\mathrm{O}(n)$ to access the bottom element",
        "Both A and B",
        "It is sufficient - two stacks are unnecessary"
      ],
      correctAnswer: 2,
      hints: [
        "Where is the front element in a single stack?",
        "Getting to the bottom of a stack requires removing all elements above it. What is the time cost?"
      ],
      explanation:
        "Both A and B.\n\n" +
        "A stack only exposes the top element (LIFO). To dequeue the front of the queue (FIFO), we must remove all elements down to the bottom, which costs $\\mathrm{O}(n)$ per dequeue in the worst case. The two-stack design achieves amortized $\\mathrm{O}(1)$ by reversing the order exactly when needed."
    },
    {
      id: "q-iq-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the two-stack queue, elements may be transferred from stack1 to stack2 multiple times during the queue's lifetime.",
      correctAnswer: "False",
      hints: [
        "Once an element is transferred to stack2, does it ever return to stack1?",
        "What happens to elements in stack2?"
      ],
      explanation:
        "False. Each element flows in one direction only: enqueued into stack1, transferred once to stack2 (when stack2 is empty and a dequeue is needed), then dequeued from stack2 and removed from the queue forever. Elements never move back to stack1.\n\n" +
        "This one-way flow is precisely why the amortized cost per operation is $\\mathrm{O}(1)$: each element is pushed once, transferred once, and popped once."
    },
  ],

  "next-greater-element": [
    {
      id: "q-nge-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Next Greater Element problem is most efficiently solved using:",
      options: ["Queue", "Monotonic decreasing stack", "Array", "Min-heap"],
      correctAnswer: 1,
      hints: [
        "We want to find, for each element, the next element to its right that is strictly greater.",
        "The stack keeps track of elements that are waiting for a greater element to appear to their right."
      ],
      explanation:
        "A monotonic decreasing stack.\n\n" +
        "The stack maintains elements in decreasing order from bottom to top. When a new element $x$ is encountered:\n" +
        "- All elements smaller than $x$ have found their next greater element - pop and assign.\n" +
        "- $x$ is pushed onto the stack (it is now waiting for its own next greater).\n\n" +
        "\\[\\text{Time: } \\mathrm{O}(n), \\quad \\text{Space: } \\mathrm{O}(n).\\]\n" +
        "Each element is pushed and popped at most once."
    },
    {
      id: "q-nge-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For the array $[2, 1, 5, 3, 4]$, what is the Next Greater Element for the element at index 0 (value 2)?",
      options: ["$1$", "$5$", "$3$", "$4$"],
      correctAnswer: 1,
      hints: [
        "Scanning right from index 0, find the first element strictly greater than 2.",
        "1 is not greater than 2. 5 is greater than 2. The first greater element wins."
      ],
      explanation:
        "Scanning right from index 0:\n\n" +
        "\\begin align*\n" +
        "\\text{Index 0, value 2:} &\\quad \\text{check } 1 \\; (1 < 2, \\text{skip}) \\\\\n" +
        "                           &\\quad \\text{check } 5 \\; (5 > 2, \\text{found}) \\\\\n" +
        "\\Rightarrow \\text{NGE}(2) &\\quad = 5\n" +
        "\\end align*\n\n" +
        "The answer is 5."
    },
    {
      id: "q-nge-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "If an element has no greater element to its right, the standard NGE algorithm assigns $-1$ as its next greater element.",
      correctAnswer: "True",
      hints: [
        "What remains in the stack at the end of processing?",
        "Elements never popped from the stack have no greater element to their right."
      ],
      explanation:
        "True. Elements that remain in the stack at the end of the single pass have no greater element to their right - they were never popped, so no element greater than them appeared to their right. The standard convention is to assign $-1$ to these elements."
    },
    {
      id: "q-nge-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For the strictly increasing array $[1, 2, 3, 4]$, the next greater elements for all positions are:",
      options: ["$[2, 3, 4, -1]$", "$[2, 3, 4, 4]$", "$[-1, -1, -1, -1]$", "$[2, 3, 4, \\text{null}]$"],
      correctAnswer: 0,
      hints: [
        "In a strictly increasing array, each element's next greater is always the immediately following element.",
        "What about the last element?"
      ],
      explanation:
        "$[2, 3, 4, -1]$.\n\n" +
        "For a strictly increasing array:\n\n" +
        "\\begin align*\n" +
        "\\text{NGE}(1) &= 2 \\quad (\\text{next element}) \\\\\n" +
        "\\text{NGE}(2) &= 3 \\quad (\\text{next element}) \\\\\n" +
        "\\text{NGE}(3) &= 4 \\quad (\\text{next element}) \\\\\n" +
        "\\text{NGE}(4) &= -1 \\quad (\\text{no element to the right})\n" +
        "\\end align*\n\n" +
        "The last element has no next greater, so it gets $-1$."
    },
    {
      id: "q-nge-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of the Next Greater Element algorithm using a monotonic stack?",
      options: ["$\\mathrm{O}(n^2)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n \\log n)$", "Amortized $\\mathrm{O}(n)$"],
      correctAnswer: 3,
      hints: [
        "Each element is pushed onto the stack exactly once and popped at most once.",
        "Since each element participates in at most two stack operations, the total is O(n)."
      ],
      explanation:
        "Amortized $\\mathrm{O}(n)$ (which equals $\\mathrm{O}(n)$ without amortization).\n\n" +
        "Each of the $n$ elements is pushed onto the stack exactly once. Each element is popped at most once (when a greater element is found to its right). Therefore:\n\n" +
        "\\[\\text{Total stack operations} \\leq 2n \\Rightarrow \\mathrm{O}(n) \\text{ time}.\\]\n\n" +
        "This is tight - we must examine every element at least once."
    },
    {
      id: "q-nge-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For the circular array $[1, 2, 1]$, the Next Greater Element for index 2 (value 1) is:",
      options: ["$-1$", "$1$", "$2$", "null"],
      correctAnswer: 2,
      hints: [
        "In a circular array, after the last element we wrap around to index 0.",
        "From index 2, look at index 0 (value 1, not greater), then index 1 (value 2, greater)."
      ],
      explanation:
        "$2$.\n\n" +
        "In a circular array, we wrap around after the last index. From index 2 (value 1):\n\n" +
        "\\begin align*\n" +
        "\\text{Next: index } (2+1) \\bmod 3 = 0, &\\quad \\text{value } 1 \\; (1 \\not> 1) \\\\\n" +
        "\\text{Then: index } (0+1) \\bmod 3 = 1, &\\quad \\text{value } 2 \\; (2 > 1, \\text{found})\n" +
        "\\end align*\n\n" +
        "The next greater element for index 2 is 2.\n\n" +
        "Implementation note: we iterate through the array twice (indices $0$ to $2n-1$, using $i \\bmod n$) to simulate circular wrapping."
    },
    {
      id: "q-nge-7",
      type: "true-false",
      difficulty: "hard",
      question:
        "The monotonic stack for Next Greater Element maintains elements in strictly decreasing order.",
      correctAnswer: "True",
      hints: [
        "When a new element $x$ arrives, all elements smaller than $x$ are popped. What remains in the stack?",
        "The remaining elements are all $\\geq x$. Is the stack strict or non-strict?"
      ],
      explanation:
        "True. The stack is monotonically decreasing from bottom to top. When a new element $x$ arrives, we pop all elements smaller than $x$ - they have found their next greater. We then push $x$. The push keeps the decreasing invariant since $x \\leq$ all remaining elements.\n\n" +
        "Note: for the Next Greater Element problem (strictly greater), we use a strictly decreasing stack (pop on $<$). For the Next Greater or Equal problem, we would pop on $\\leq$."
    },
    {
      id: "q-nge-8",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the worst-case space complexity of the Next Greater Element algorithm using a monotonic stack?",
      options: ["$\\mathrm{O}(1)$", "$\\mathrm{O}(\\log n)$", "$\\mathrm{O}(n)$", "$\\mathrm{O}(n^2)$"],
      correctAnswer: 2,
      hints: [
        "Consider a strictly decreasing input array (e.g., $[5, 4, 3, 2, 1]$). How many elements are on the stack at the end?",
        "Each element is pushed before any are popped."
      ],
      explanation:
        "$\\mathrm{O}(n)$. In the worst case (a strictly decreasing array), each new element is smaller than the stack top, so no popping occurs. All $n$ elements accumulate on the stack before the final $-1$ assignments.\n\n" +
        "The output array also uses $\\mathrm{O}(n)$ space, but even without it, the stack alone can hold $n$ entries in the worst case."
    },
  ],

  // ── NEW SECTIONS ─────────────────────────────────────────────────────────

  "spiral-matrix": [
    {
      id: "q-sm-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of printing an m x n matrix in spiral order?",
      options: ["O(m + n)", "O(m * n)", "O((m * n) log(m * n))", "O(m^2 + n^2)"],
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
      question: "In the boundary-shrinking approach for spiral traversal, after processing the top row we increment the top pointer.",
      correctAnswer: "True",
      hints: [
        "The top row has been fully consumed, so we move the boundary inward",
        "The same logic applies to each of the four boundaries after their row or column is processed",
      ],
      explanation:
        "True. After traversing the top row left-to-right, we shrink the top boundary by doing top++. Similarly: after right column right--; after bottom row bottom--; after left column left++. This keeps all four boundaries converging until top > bottom or left > right, giving O(1) extra space.",
    },
    {
      id: "q-sm-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When generating a spiral matrix (filling values 1..n^2 into an n x n grid), what is the direction rotation sequence?",
      options: [
        "right -> down -> left -> up -> repeat",
        "up -> right -> down -> left -> repeat",
        "right -> left -> up -> down -> repeat",
        "down -> right -> up -> left -> repeat",
      ],
      correctAnswer: 0,
      hints: [
        "Spiral starts at top-left and moves right first",
        "After hitting a boundary or visited cell, rotate 90 degrees clockwise",
      ],
      explanation:
        "The canonical clockwise spiral uses direction vectors: right (0,+1) -> down (+1,0) -> left (0,-1) -> up (-1,0), repeating cyclically. When the next cell is out-of-bounds or already filled, rotate direction. Time: O(n^2); Space: O(n^2) for the output grid.",
    },
  ],

  "rotate-image": [
    {
      id: "q-ri-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The in-place 90 degree clockwise rotation of an n x n matrix uses which two operations?",
      options: [
        "Transpose then reverse each column",
        "Transpose then reverse each row",
        "Reverse each row then transpose",
        "Rotate each ring independently with 4-way swap",
      ],
      correctAnswer: 1,
      hints: [
        "Transpose swaps matrix[i][j] with matrix[j][i]",
        "After transposing, reversing each row produces a clockwise rotation",
      ],
      explanation:
        "In-place clockwise rotation = transpose + reverse each row. Transpose: swap matrix[i][j] with matrix[j][i] for i < j (O(n^2 / 2) swaps). Reverse each row: O(n/2) per row times n rows = O(n^2 / 2). Total: O(n^2) time, O(1) space since both operations are in-place.",
    },
    {
      id: "q-ri-2",
      type: "true-false",
      difficulty: "easy",
      question: "Rotating an image 90 degrees counter-clockwise in-place can be done by transposing then reversing each column.",
      correctAnswer: "True",
      hints: [
        "Counter-clockwise is the mirror of clockwise",
        "Instead of reversing rows after transpose, reverse columns",
      ],
      explanation:
        "True. Counter-clockwise rotation = transpose + reverse each column. Alternatively: reverse each row first, then transpose. Both achieve O(n^2) time and O(1) space. Clockwise uses transpose then reverse rows; counter-clockwise uses transpose then reverse columns.",
    },
    {
      id: "q-ri-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A four-way cycle rotation (no transpose) for a ring of an n x n matrix requires how many swaps per element group of 4?",
      options: ["2", "3", "4", "n"],
      correctAnswer: 1,
      hints: [
        "One element from each of the four sides participates in each cycle",
        "Moving 4 elements in a ring requires 3 swaps (like rotating 4 items using 1 temp)",
      ],
      explanation:
        "The four-way cycle approach: temp = top-left, shift left <- bottom, bottom <- right, right <- top, top <- temp. That is 3 assignment steps. Each group of 4 symmetric positions is handled in O(1). Total swaps: 3 * (n/2)^2 which is O(n^2). Space: O(1).",
    },
  ],

  "word-break": [
    {
      id: "q-wb-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of the tabulation DP solution for Word Break with string length n and dictionary size d?",
      options: ["O(n * d)", "O(n^2 * d)", "O(n^2)", "O(2^n)"],
      correctAnswer: 1,
      hints: [
        "We have n+1 DP states and for each state we check all words in the dictionary",
        "Checking if a substring matches a word is O(word length) which is O(n) worst case",
      ],
      explanation:
        "dp[i] = true if s[0..i-1] can be segmented. For each position i (0..n), we try every word in the dictionary (size d): check if s[i-len..i] matches the word in O(n). Overall: O(n * d * n) = O(n^2 * d). Using a trie reduces dictionary lookup to O(n), giving O(n^2) total.",
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
        "True. Both approaches have O(n^2) unique subproblems. Memoized DFS caches memo[i] = result for suffix s[i..n-1]. Tabulation fills dp[0..n] bottom-up. Both achieve O(n^2 * d) time and O(n) space for the memo/dp array, ignoring dictionary storage.",
    },
    {
      id: "q-wb-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Word Break II (return all valid sentences) has what worst-case time complexity?",
      options: ["O(n^2)", "O(n^3)", "O(2^n)", "O(n * 2^n)"],
      correctAnswer: 3,
      hints: [
        "In the worst case, every partition of the string is valid",
        "The number of sentences can be exponential in n",
      ],
      explanation:
        "Word Break II must enumerate all valid segmentations. In the worst case (e.g., s = 'aaa...a' with dictionary containing 'a', 'aa', 'aaa', ...), the number of valid sentences is exponential O(2^n). Building each sentence takes O(n) time, so total is O(n * 2^n). Memoization of intermediate lists helps prune but cannot improve the worst case.",
    },
  ],

  "jump-game-variants": [
    {
      id: "q-jg-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Jump Game I greedy: what variable tracks the furthest reachable index?",
      options: ["A queue of positions", "A maxReach variable updated at each step", "A DP array of booleans", "A stack of jump lengths"],
      correctAnswer: 1,
      hints: [
        "At each index i, you can jump up to nums[i] steps forward",
        "Track the maximum index reachable so far with one variable",
      ],
      explanation:
        "The greedy solution maintains maxReach = max(maxReach, i + nums[i]) for each i <= maxReach. If at any i we find i > maxReach, we cannot proceed. Return maxReach >= n-1. Time: O(n), Space: O(1).",
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
        "The frontier at each BFS level is the range of reachable indices",
      ],
      explanation:
        "Jump Game II greedy is isomorphic to BFS: current range [lo, hi] is one level. Scan [lo, hi] to find farthest reachable index (next hi). Increment jump count and set lo = hi+1. This is O(n) time, O(1) space - faster than O(n^2) DP.",
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
        "Sort by end time, pick earliest finishing activity that does not conflict",
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
        "Sort jobs by finish time. Define dp[i] = max weight using jobs 1..i. For each job i, find p(i) = latest job that does not overlap (binary search on start times). dp[i] = max(dp[i-1], weight[i] + dp[p(i)]). Time: O(n log n) sort + O(n log n) binary searches = O(n log n). Space: O(n).",
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
        "True. Sort by start time: O(n log n). Then one linear pass merges adjacent overlapping intervals by comparing current interval start with the last merged interval end. If start <= last_end, extend last_end = max(last_end, current_end). Total: O(n log n) time, O(n) space for output.",
    },
  ],

  "stock-profit-variants": [
    {
      id: "q-spv-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Best Time to Buy and Sell Stock with at most k transactions: what is the DP state space?",
      options: ["O(n)", "O(k * n)", "O(k^2)", "O(n^2)"],
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
        "Three-state DP: held[i] = max(held[i-1], rest[i-1] - prices[i]); sold[i] = held[i-1] + prices[i] (sell today); rest[i] = max(rest[i-1], sold[i-1]). Answer = max(sold[n-1], rest[n-1]). Time: O(n), Space: O(1) with rolling variables.",
    },
    {
      id: "q-spv-3",
      type: "true-false",
      difficulty: "medium",
      question: "Stock with transaction fee: adding a fee per transaction can be handled in O(n) time with a two-state DP.",
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
      options: ["O(n) time, O(1) space", "O(n^2) time, O(1) space", "O(n^2) time, O(n^2) space", "O(n log n) time, O(n) space"],
      correctAnswer: 1,
      hints: [
        "For each of n centers (including gaps between characters), we expand outward",
        "Expansion at each center takes O(n) in the worst case",
      ],
      explanation:
        "There are 2n-1 centers (n single chars + n-1 gaps). For each center, expand while characters match: O(n) worst case. Total: O(n^2) time. No auxiliary array needed: O(1) space (just track best start and length). This beats the O(n^2) space DP solution which builds an n x n table.",
    },
    {
      id: "q-lps-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Manacher algorithm finds the longest palindromic substring in:",
      options: ["O(n log n) time, O(n) space", "O(n) time, O(n) space", "O(n^2) time, O(1) space", "O(n) time, O(1) space"],
      correctAnswer: 1,
      hints: [
        "Manacher reuses previously computed palindrome radii",
        "It processes each position amortized O(1) using a center and right boundary trick",
      ],
      explanation:
        "Manacher algorithm uses a transformed string (insert # between chars) and an array p[] where p[i] = palindrome radius at i. It maintains (center, right) - the rightmost palindrome center and right boundary. For each i < right, mirror symmetry gives p[i] >= min(p[mirror], right-i), then expand. Each position is touched at most twice: O(n) time, O(n) space for p[] array.",
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
        "True. Palindromes exist in both forms. 'aba' is odd-length (center = 'b'); 'abba' is even-length (center is the gap between the two b characters). The expand-around-center algorithm handles both by checking single characters (odd) and adjacent pairs (even). Both must be checked for a complete solution.",
    },
  ],

  "anagram-variants": [
    {
      id: "q-av-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Find All Anagrams in a String (LeetCode 438) - optimal approach and complexity?",
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
        "Sliding window: maintain a count array of size 26 for the pattern, and a window count array. Slide window of size |p| across s: add right char, remove left char. Compare counts in O(26) = O(1). Total: O(n) time, O(1) space (two fixed-size arrays of 26). Better than sorting each window O(nk log k).",
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
        "True. Sorting is a correct but suboptimal anagram check: O(n log n). The optimal check uses a frequency array: count chars in s1 (increment) and s2 (decrement); if all counts are zero, they are anagrams. O(n) time, O(1) space (26-element array for lowercase letters).",
    },
    {
      id: "q-av-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Group Anagrams: grouping n strings of average length k has what time complexity using sorted-key approach?",
      options: ["O(n * k)", "O(n * k log k)", "O(n^2)", "O(n * k^2)"],
      correctAnswer: 1,
      hints: [
        "Sorting each string takes O(k log k)",
        "We do this for n strings and use the sorted string as a hash map key",
      ],
      explanation:
        "For each of n strings, sort it in O(k log k) to get the canonical key, then insert into a hash map. Total: O(n * k log k) time. Alternative: use a frequency tuple as key O(n * k) time but larger constant. Space: O(n * k) for storing all strings.",
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
        "Standard RLE outputs count followed by character for each run",
      ],
      explanation:
        "Standard run-length encoding: count followed by character. 'aaabbc' -> 'a' appears 3 times -> '3a', 'b' appears 2 times -> '2b', 'c' appears 1 time -> '1c'. Result: '3a2b1c'. Time: O(n), Space: O(n) for output. The compressed form is shorter only when runs are long enough.",
    },
    {
      id: "q-sc-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In-place string compression (LeetCode 443) returns the new length with what space complexity?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
      correctAnswer: 2,
      hints: [
        "The problem asks to modify the char array in-place using only constant extra space",
        "A write pointer tracks where to write the compressed result",
      ],
      explanation:
        "In-place compression uses two pointers: read (scanning runs) and write (recording compressed output into chars[]). Count is written digit by digit. Space: O(1) auxiliary. Time: O(n) - one pass to count runs, writing digits in-place.",
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
        "False. For strings with no repeated consecutive characters (e.g., 'abcde'), RLE produces '1a1b1c1d1e' - twice as long. RLE is only beneficial when runs are sufficiently long (run length > 2 for single-digit counts). This is why compression algorithms use adaptive techniques.",
    },
  ],

  "matrix-search": [
    {
      id: "q-ms-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Search a 2D Matrix where rows and columns are independently sorted (LeetCode 240) - best approach?",
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
        "Staircase search: start at matrix[0][n-1]. If target == val: found. If target < val: move left (col--). If target > val: move down (row++). Each step eliminates a row or column, giving O(m + n) time, O(1) space. This is optimal for independently sorted matrix; for row-major sorted matrix, binary search gives O(log(mn)).",
    },
    {
      id: "q-ms-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "For a strictly row-major sorted 2D matrix (row i last element < row i+1 first element), binary search complexity is:",
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
        "True. Starting at position (0, n-1), each comparison either decrements col (at most n-1 times) or increments row (at most m-1 times). Total moves <= (m-1) + (n-1) = m+n-2, giving O(m+n) time. This holds for any m x n matrix with independently sorted rows and columns.",
    },
  ],
};

registerQuestions(questions);
