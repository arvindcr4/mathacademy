import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "climbing-stairs": [
    {
      id: "q-cs-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When climbing 1 or 2 steps at a time, the number of distinct ways to reach step $n$ follows which well-known sequence?",
      options: ["Fibonacci", "Factorial", "Binary", "Harmonic"],
      correctAnswer: 0,
      explanation:
        "Let $dp[i]$ denote the number of ways to reach step $i$. The last move to step $i$ must be either:\n\n- A 1-step from step $i-1$, contributing $dp[i-1]$ ways\n- A 2-step from step $i-2$, contributing $dp[i-2]$ ways\n\nThese two sets of paths are mutually exclusive and exhaustive, so we sum them:\n" +
        "\\[\n" +
        "dp[i] = dp[i-1] + dp[i-2]\\quad\\text{for }i \\geq 3\n" +
        "\\]\n\nWith base cases $dp[1] = 1$ (only one way: one 1-step) and $dp[2] = 2$ (ways: $1+1$ or $2$), this recurrence generates the Fibonacci sequence starting from $F_1 = 1,\\; F_2 = 2$.",
      hints: [
        "Write the recurrence by looking at the final move into step $n$.",
        "You can arrive at step $n$ from step $n-1$ or from step $n-2$, so the counts add: $dp[n] = dp[n-1] + dp[n-2]$.",
        "This is the Fibonacci recurrence starting with $F_1 = 1, F_2 = 2$.",
      ],
    },
    {
      id: "q-cs-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "How many distinct ways can you climb exactly 4 steps if you take 1 or 2 steps at a time?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      explanation:
        "We build up using the recurrence $dp[i] = dp[i-1] + dp[i-2]$:\n\n\n\\begin{align}\ndp[1] &= 1 \\quad &\\text{(just 1)}\\\[5pt]\ndp[2] &= dp[1] + dp[0] = 1 + 1 = 2 \\quad &\\text{(1+1 or 2)}\\\[5pt]\ndp[3] &= dp[2] + dp[1] = 2 + 1 = 3 \\quad &\\text{(1+1+1, 1+2, 2+1)}\\\[5pt]\ndp[4] &= dp[3] + dp[2] = 3 + 2 = 5\\n\\end{align}$$\n\nThe five valid sequences are: $(1,1,1,1)$, $(1,1,2)$, $(1,2,1)$, $(2,1,1)$, and $(2,2)$.",
      hints: [
        "Build the values from the bottom up: $dp[1] = 1, dp[2] = 2, dp[3] = 3, \\dots$",
        "Use $dp[4] = dp[3] + dp[2]$ or enumerate all five valid sequences manually.",
      ],
    },
    {
      id: "q-cs-3",
      type: "true-false",
      difficulty: "medium",
      question: "For the climbing stairs problem with step sizes 1 and 2, the recurrence relation is $dp[i] = dp[i-1] + dp[i-2]$ for $i \\geq 3$.",
      correctAnswer: "true",
      explanation:
        "From step $i$, the last move was either:\n- A 1-step from step $i-1$, or\n- A 2-step from step $i-2$\n\nSince these are mutually exclusive ways to end, we sum them:\n$$dp[i] = dp[i-1] + dp[i-2]\\quad\\text{for } i \\geq 3$$\n\nEvery valid path to step $i$ ends with exactly one of these two moves.",
      hints: [
        "Think about the final move into step $i$: what are the only possible last moves?",
        "Every valid path to step $i$ ends with either a 1-step move or a 2-step move.",
      ],
    },
    {
      id: "q-cs-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of the climbing stairs solution with memoization?",
      options: ["O(1)", "O(n)", "O(n\\^2)", "O(2\\^n)"],
      correctAnswer: 1,
      explanation:
        "With memoization, each subproblem $dp[i]$ is computed exactly once:\n\n- There are $n$ distinct subproblems (for $i = 1$ to $n$)\n- Each transition $dp[i] = dp[i-1] + dp[i-2]$ takes $O(1)$ time\n\n$$\\text{Total time} = n \\times O(1) = O(n)$$\n\nWithout memoization, the naive recursive solution would be $O(2^n)$ due to exponential recomputation.",
      hints: [
        "Memoization prevents recomputing the same step count.",
        "How many distinct states $dp[i]$ exist? Each one does $O(1)$ work.",
      ],
    },
    {
      id: "q-cs-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If you can climb 1, 2, or 3 steps at a time, what is $dp[4]$?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation:
        "With step sizes 1, 2, and 3, the recurrence extends to use the previous three states:\n\n\n\\begin{align}\ndp[4] &= dp[3] + dp[2] + dp[1]\\\[5pt]\n\\text{where: } &dp[1] = 1 \\text{ (only } 1)\\n&dp[2] = 2 \\text{ (1+1 or } 2)\\n&dp[3] = 4 \\text{ (1+1+1, 1+2, 2+1, or } 3)\n\\end{align}$$\n\nTherefore:\n$$dp[4] = 4 + 2 + 1 = 7$$\n\nThe seven sequences are: $(1,1,1,1)$, $(1,1,2)$, $(1,2,1)$, $(2,1,1)$, $(2,2)$, $(1,3)$, and $(3,1)$.",
      hints: [
        "With step sizes 1, 2, and 3, the recurrence uses the previous three states: $dp[i] = dp[i-1] + dp[i-2] + dp[i-3]$.",
        "Use $dp[4] = dp[3] + dp[2] + dp[1]$ with base values $dp[1] = 1, dp[2] = 2, dp[3] = 4$.",
      ],
    },
    {
      id: "q-cs-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What space optimization is used for the climbing stairs problem?",
      options: [
        "O(n) array",
        "O(1) two variables",
        "O(log n) space",
        "O(n log n)",
      ],
      correctAnswer: 1,
      explanation:
        "The recurrence $dp[i] = dp[i-1] + dp[i-2]$ only requires the two most recent values. We can replace the full array with two variables:\n\n\n\\begin{align}\n\\text{prev1} &= dp[i-1] \\quad \\text{(previous state)}\\\[5pt]\n\\text{prev2} &= dp[i-2] \\quad \\text{(state before that)}\\\[5pt]\n\\text{current} &= \\text{prev1} + \\text{prev2}\\n\\end{align}$$\n\nAfter computing each $dp[i]$, we shift: $\\text{prev2} \\leftarrow \\text{prev1}$, $\\text{prev1} \\leftarrow \\text{current}$. This uses $O(1)$ space.",
      hints: [
        "Look at how many previous DP values the recurrence actually needs at any step.",
        "If only the last two states matter, why keep the full table?",
      ],
    },
  ],

  "coin-change": [
    {
      id: "q-ci-cc-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the recurrence relation for the minimum coin change problem?",
      options: [
        "dp[i] = min(dp[i], dp[i-coin] + 1)",
        "dp[i] = dp[i-coin] + 1",
        "dp[i] = max(dp[i], dp[i-coin] + 1)",
        "dp[i] = coin count",
      ],
      correctAnswer: 0,
      explanation:
        "Let $dp[i]$ be the minimum coins needed to form amount $i$. For each coin with value $\\text{coin}$:\n\n\n\\begin{align}\n\\text{If } i \\geq \\text{coin}:\\n\\quad dp[i] &= \\min\\big(dp[i],\\; dp[i - \\text{coin}] + 1\\big)\n\\end{align}$$\n\nWe initialize $dp[0] = 0$ (zero coins for amount 0) and all other $dp[i] = \\infty$ before processing.",
      hints: [
        "State = minimum coins needed to form amount $i$.",
        "For each coin $\\text{coin}$, ask: can using this coin give a better (smaller) answer for amount $i$?",
        "The $+1$ accounts for using one coin of value $\\text{coin}$.",
      ],
    },
    {
      id: "q-ci-cc-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For coins [1, 2, 5] and target amount = 11, what is the minimum number of coins needed?",
      options: ["2", "3", "5", "11"],
      correctAnswer: 1,
      explanation:
        "We compute $dp$ bottom-up:\n\n\n\\begin{align}\ndp[0] &= 0\\\[5pt]\ndp[1] &= \\min(dp[1], dp[0]+1) = 1\\\[5pt]\ndp[2] &= \\min(dp[2], dp[1]+1, dp[0]+1) = 1\\\[5pt]\n&\\vdots\\\[5pt]\ndp[5] &= 1\\quad \\text{(coin: 5)}\\\[5pt]\ndp[11] &= 3\\quad \\text{(5 + 5 + 1)}\n\\end{align}$$\n\nOptimal: $11 = 5 + 5 + 1$ using only 3 coins. Other decompositions like $2+2+2+2+2+1 = 6$ coins are worse.",
      hints: [
        "Try to form 11 with the fewest pieces, not just any decomposition.",
        "Two 5s and one 1 reach 11 using only three coins.",
        "Check: $dp[11] = dp[6] + 1 = dp[1] + 1 + 1 = 1 + 1 + 1 = 3$.",
      ],
    },
    {
      id: "q-ci-cc-3",
      type: "true-false",
      difficulty: "easy",
      question: "In the coin change DP formulation, $dp[i]$ represents the minimum number of coins needed to make amount $i$.",
      correctAnswer: "true",
      explanation:
        "The DP state is defined as:\n$$dp[i] = \\text{minimum coins needed to form amount } i$$\n\nWith base case $dp[0] = 0$ (zero coins make amount 0). Each $dp[i]$ stores the best (minimum) count found so far.",
      hints: [
        "Interpret the DP state before using the recurrence.",
        "$dp[0] = 0$ and every larger amount stores the best count found so far.",
      ],
    },
    {
      id: "q-cc-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If an amount cannot be formed with the given coins, what value does $dp[\\text{amount}]$ hold?",
      options: ["0", "-1", "Infinity (represented as amount+1)", "amount"],
      correctAnswer: 2,
      explanation:
        "We use $\\text{amount} + 1$ as a sentinel value representing \"infinity\" (since no valid solution can use more than $\\text{amount}$ coins-a coin of value 1 would be the worst case).\n\n\[\n\\begin{align}\n\\text{Initialize: } &dp[i] = \\infty = \\text{amount} + 1\\n\\text{After DP: } &\\text{if } dp[\\text{amount}] > \\text{amount} \\Rightarrow \\text{impossible, return } -1\n\\end{align}$$",
      hints: [
        "Impossible states start as a sentinel value larger than any real answer.",
        "If no transition improves $dp[\\text{amount}]$, it stays at the sentinel value.",
        "A solution using $k$ coins can never exceed $k \\leq \\text{amount}$ (worst case: all coins of value 1).",
      ],
    },
    {
      id: "q-cc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the time complexity of the unbounded coin change DP?",
      options: ["O(amount)", "O(amount \\times coins)", "O(coins)", "O(2^amount)"],
      correctAnswer: 1,
      explanation:
        "We use a two-dimensional DP with dimensions $(\\text{amount} + 1) \\times (\\text{number of coins})$:\n\n\n\\begin{align}\n\\text{for } i &= 1 \\text{ to } \\text{amount}:\\n\\quad \\text{for each coin } c:\\\[5pt]\n\\quad\\quad dp[i] = \\min(dp[i], dp[i-c] + 1)\n\\end{align}$$\n\nThis gives $O(\\text{amount} \\times \\text{len(coins)})$ time complexity.",
      hints: [
        "There is one dimension for amounts (1 to target) and one for coin types.",
        "At each amount, you check every available coin.",
      ],
    },
  ],

  "house-robber": [
    {
      id: "q-hr-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the correct recurrence relation for the House Robber problem?",
      options: [
        "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
        "dp[i] = dp[i-1] + nums[i]",
        "dp[i] = min(dp[i-1], dp[i-2] + nums[i])",
        "dp[i] = nums[i] + nums[i-1]",
      ],
      correctAnswer: 0,
      explanation:
        "At house $i$, you have two choices:\n\n1. **Skip house $i$**: then $dp[i] = dp[i-1]$ (best up to previous house)\n2. **Rob house $i$**: then you cannot rob house $i-1$, so $dp[i] = dp[i-2] + \\text{nums}[i]$\n\nTake the maximum:\n$$dp[i] = \\max\\big(dp[i-1],\\; dp[i-2] + \\text{nums}[i]\\big)$$",
      hints: [
        "At each house, choose between skipping it and robbing it.",
        "Robbing house $i$ forces you to combine $\\text{nums}[i]$ with $dp[i-2]$ (you cannot use $dp[i-1]$ since house $i-1$ is adjacent).",
      ],
    },
    {
      id: "q-hr-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For $\\text{nums} = [2, 7, 9, 3, 1]$, what is the maximum amount that can be robbed?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation:
        "We compute using $dp[i] = \\max(dp[i-1], dp[i-2] + \\text{nums}[i])$:\n\n\n\\begin{align}\ndp[0] &= 2\\n\\text{dp[1]} &= \\max(2, 7) = 7\\n\\text{dp[2]} &= \\max(7, 2 + 9) = 11\\n\\text{dp[3]} &= \\max(11, 7 + 3) = 11\\n\\text{dp[4]} &= \\max(11, 11 + 1) = 12\n\\end{align}$$\n\nRobbing houses 0, 2, and 4: $2 + 9 + 1 = 12$. Alternative: houses 1 and 3 give $7 + 3 = 10$.",
      hints: [
        "Try the best non-adjacent combinations explicitly.",
        "Compute $dp[4]$ step by step to find the maximum amount.",
      ],
    },
    {
      id: "q-hr-3",
      type: "true-false",
      difficulty: "easy",
      question: "In House Robber II, the houses are arranged in a circle, meaning the first and last houses are adjacent.",
      correctAnswer: "true",
      explanation:
        "In House Robber II, houses $[0, 1, 2, \\ldots, n-1]$ form a circle, so houses $0$ and $n-1$ cannot both be robbed.\n\nThe solution is to take the maximum of two linear cases:\n$$max\\big(\\text{rob}(0, n-2),\\; \\text{rob}(1, n-1)\\big)$$\n\nEither exclude the first house or exclude the last house.",
      hints: [
        "In House Robber II, the first and last houses are adjacent.",
        "Solve two linear cases: exclude the first house or exclude the last house.",
        "This reduces the circular problem to two independent linear subproblems.",
      ],
    },
    {
      id: "q-hr-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What space optimization is used for the House Robber problem?",
      options: [
        "O(n) array",
        "O(1) two variables",
        "O(log n) stack",
        "O(1) single variable",
      ],
      correctAnswer: 1,
      explanation:
        "The recurrence $dp[i] = \\max(dp[i-1], dp[i-2] + \\text{nums}[i])$ only requires the two most recent values. We can use two variables instead of an array:\n\n\n\\begin{align}\n\\text{prev1} &= dp[i-1] \\quad &(\\text{current max up to } i-1)\\\[5pt]\n\\text{prev2} &= dp[i-2] \\quad &(\\text{max up to } i-2)\\\[5pt]\n\\text{curr} &= \\max(\\text{prev1},\\; \\text{prev2} + \\text{nums}[i])\n\\end{align}$$\n\nAfter each step: $\\text{prev2} \\leftarrow \\text{prev1}$, $\\text{prev1} \\leftarrow \\text{curr}$. Space: $O(1)$.",
      hints: [
        "The recurrence only references the previous two answers.",
        "Rolling values for $dp[i-1]$ and $dp[i-2]$ are enough to compute $dp[i]$.",
      ],
    },
    {
      id: "q-hr-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What are the correct base cases for the House Robber problem?",
      options: [
        "dp[0] = 0",
        "dp[1] = nums[0]",
        "Both A and B",
        "dp[0] = nums[0], dp[1] = max(nums[0], nums[1])",
      ],
      correctAnswer: 3,
      explanation:
        "Base cases for 0-indexed $\\text{nums}$:\n\n\n\\begin{align}\ndp[0] &= \\text{nums}[0] \\quad &(\\text{only house 0 can be robbed})\\\[5pt]\ndp[1] &= \\max(\\text{nums}[0],\\; \\text{nums}[1]) \\quad &(\\text{rob house 0 or house 1, not both})\n\\end{align}$$\n\nFor $n = 1$: answer is $\\text{nums}[0]$. For $n = 2$: answer is $\\max(\\text{nums}[0], \\text{nums}[1])$.",
      hints: [
        "Start by solving the one-house and two-house cases.",
        "With two adjacent houses, you must choose the larger value because you cannot rob both.",
      ],
    },
  ],

  "longest-increasing-subsequence": [
    {
      id: "q-lis-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of the binary search approach to LIS?",
      options: ["$O(n^2)$", "$O(n \\log n)$", "$O(n)$", "$O(\\log n)$"],
      correctAnswer: 1,
      explanation:
        "The binary search (patience sorting) approach:\n\n1. Maintain a $\\text{tails}$ array where $\\text{tails}[i]$ = smallest ending value of an LIS of length $i+1$\n2. For each element $x$:\n   - Binary search $\\text{tails}$ to find the first position $pos$ where $\\text{tails}[pos] \\geq x$\n   - Update $\\text{tails}[pos] = x$\n\nEach element requires one binary search: $O(\\log n)$, so total $O(n \\log n)$.\n\nThe naive DP approach $dp[i] = 1 + \\max(dp[j])$ for $j < i$ gives $O(n^2)$.",
      hints: [
        "The $\\text{tails}$ array stays sorted by ending value.",
        "Each new element uses binary search $O(\\log n)$ to find/update one position.",
      ],
    },
    {
      id: "q-lis-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For $[10, 9, 2, 5, 3, 7, 101, 18]$, what is the length of the LIS?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation:
        "The Longest Increasing Subsequence (LIS) is $[2, 3, 7, 18]$ or $[2, 3, 7, 101]$, both of length **4**.\n\nStep-by-step:\n- $10$: $\\text{tails} = [10]$\n- $9$: $\\text{tails} = [9]$ (replace 10)\n- $2$: $\\text{tails} = [2]$\n- $5$: $\\text{tails} = [2, 5]$\n- $3$: $\\text{tails} = [2, 3]$\n- $7$: $\\text{tails} = [2, 3, 7]$\n- $101$: $\\text{tails} = [2, 3, 7, 101]$\n- $18$: $\\text{tails} = [2, 3, 7, 18]$ (replace 101)\n\nLength = 4.",
      hints: [
        "The subsequence must be increasing but does not need to be contiguous.",
        "The LIS is a strictly increasing subsequence - look for the longest one.",
      ],
    },
    {
      id: "q-lis-3",
      type: "true-false",
      difficulty: "easy",
      question: "LIS strictly increasing means equal elements do not count as increasing.",
      correctAnswer: "true",
      explanation:
        "**Strictly increasing** means each element must be **greater than** the previous element:\n$$x_1 < x_2 < x_3 < \\cdots$$\n\nFor **strictly** increasing: $[1, 2, 3, 4]$ ✓, $[1, 1, 2, 3]$ ✗\n\nEqual elements form a **non-increasing** sequence, not increasing.",
      hints: [
        "Strict means every next value must be strictly larger, not equal.",
        "Duplicate values cannot extend a strictly increasing subsequence.",
      ],
    },
    {
      id: "q-lis-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The binary search in LIS uses which data structure?",
      options: [
        "Stack",
        "Binary Indexed Tree",
        "Sorted array of tails",
        "Heap",
      ],
      correctAnswer: 2,
      explanation:
        "The $\\text{tails}$ array maintains the smallest possible ending value for each LIS length:\n\n- $\\text{tails}[i]$ = smallest ending value of an LIS of length $i+1$\n\nThis array is always **sorted** (by construction), allowing binary search.\n\nFor each element $x$, we find the first position $pos$ where $\\text{tails}[pos] \\geq x$ and update $\\text{tails}[pos] = x$.",
      hints: [
        "$\\text{tails}[i]$ stores the smallest possible ending value for an LIS of length $i+1$.",
        "Binary search finds the first entry $\\geq x$ to replace.",
      ],
    },
    {
      id: "q-lis-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To reconstruct the actual LIS sequence, you need:",
      options: [
        "Just the tails array",
        "A parent tracking array",
        "Both tails and predecessor arrays",
        "The original array only",
      ],
      correctAnswer: 2,
      explanation:
        "The $\\text{tails}$ array only stores the **length** of the LIS, not the actual elements.\n\nTo reconstruct:\n1. Maintain a $\\text{prev}[i]$ array: $\\text{prev}[i]$ = previous index in the LIS ending at $i$\n2. When updating $\\text{tails}$, record which index came before\n3. Backtrack from the last element of the LIS to reconstruct the sequence\n\n$$\\text{reconstruct}(i):\\n\\quad \\text{while } i \\neq -1: \\text{ add } \\text{nums}[i],\\; i = \\text{prev}[i]$$",
      hints: [
        "The $\\text{tails}$ array gives lengths but not the chosen path.",
        "Store predecessor links so you can backtrack the subsequence at the end.",
      ],
    },
  ],

  "word-break": [
    {
      id: "q-wb-ci3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Word Break recurrence:",
      options: [
        "dp[i] = OR(dp[j] AND wordDict contains s[j:i])",
        "dp[i] = AND(dp[j] AND wordDict)",
        "dp[i] = wordDict.contains(s[0:i])",
        "dp[i] = dp[i-1]",
      ],
      correctAnswer: 0,
      explanation:
        "dp[i] true if exists j < i where dp[j] true AND substring s[j:i] is in wordDict.",
      hints: [
        "State = whether the prefix ending at i can be segmented.",
        "Try every split j where the left prefix is valid and s[j:i] is a dictionary word.",
      ],
    },
    {
      id: "q-wb-ci3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: '"leetcode" with wordDict=["leet","code"] is:',
      options: ["True", "False", "Depends on order", "Cannot determine"],
      correctAnswer: 0,
      explanation:
        '"leet" + "code" = "leetcode". dp[4]=true (leet), dp[8]=dp[4] AND contains(code)=true.',
      hints: [
        "Split the string into known dictionary words.",
        'The prefix "leet" works first, and then "code" completes the full string.',
      ],
    },
    {
      id: "q-wb-ci3-3",
      type: "true-false",
      difficulty: "medium",
      question: "Using trie can optimize word break dictionary lookup.",
      correctAnswer: "true",
      explanation:
        "Trie allows O(m) lookup for each substring starting at position j, where m is max word length.",
      hints: [
        "Fast prefix lookup helps when many substrings share prefixes.",
        "A trie extends matches character by character from each start index.",
      ],
    },
    {
      id: "q-wb-ci3-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DP solution time complexity:",
      options: ["O(n)", "O(n\\^2)", "O(n \\times maxWordLength)", "O(2\\^n)"],
      correctAnswer: 2,
      explanation:
        "For each i, try up to maxWordLength substrings. O(n \\times L) where L = max word length.",
      hints: [
        "There are n end positions to consider.",
        "At each position, you only need to test substrings up to the maximum word length.",
      ],
    },
    {
      id: "q-wb-ci3-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Without DP, recursive approach with memoization solves by:",
      options: [
        "Top-down from index 0",
        "Bottom-up from n to 0",
        "Binary search",
        "Two pointers",
      ],
      correctAnswer: 0,
      explanation:
        "Memoized recursion: from position i, try all possible words starting at i. If any returns true, memoize and return true.",
      hints: [
        "Ask whether the suffix starting at index i can be segmented.",
        "From each start index, try every dictionary word that matches the current prefix.",
      ],
    },
    {
      id: "q-wb-ci3-6",
      type: "true-false",
      difficulty: "easy",
      question: "In the Word Break problem, $dp[0]$ is initialized to $\\texttt{true}$ because an empty prefix can always be segmented.",
      correctAnswer: "true",
      explanation:
        "The empty string requires no words from the dictionary, so it is trivially segmentable.\n\nBase case: $dp[0] = \\text{true}$ (empty string). All subsequent states build on this foundation.",
      hints: [
        "What does an empty prefix need to be segmented?",
        "$dp[0] = \\text{true}$ is the base case; no word is needed.",
      ],
    },
  ],

  // ── NUMBER THEORY ────────────────────────────────────────────────
  "prime-sieve": [
    {
      id: "q-nt-sieve-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the Sieve of Eratosthenes to find all primes up to $n$?",
      options: ["$O(n)$", "$O(n \\log \\log n)$", "$O(n \\log n)$", "$O(n^2)$"],
      correctAnswer: 1,
      explanation:
        "The Sieve of Eratosthenes marks multiples of each prime $p$ starting from $p^2$ (since smaller multiples were already marked by smaller primes):\n\n\n\\begin{align}\n\\sum_{p \\leq n} \\frac{n}{p} &= n \\left(\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{5} + \\cdots\\right)\\\\\n&= n \\cdot \\log \\log n + O(n)\n\\end{align}$$\n\nThis harmonic sum of primes converges to $\\log \\log n$, giving overall $O(n \\log \\log n)$.",
      hints: [
        "The Sieve marks each composite at the step corresponding to its smallest prime factor.",
        "The sum $\\sum_{p \\leq n} 1/p$ converges to $\\log \\log n$ as $n \\to \\infty$.",
      ],
    },
    {
      id: "q-nt-sieve-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Sieve of Eratosthenes only works for finding primes up to a fixed limit $n$.",
      correctAnswer: "true",
      explanation:
        "The classical Sieve requires:\n1. Pre-allocating a boolean array of size $n$\n2. Starting from $p^2$ when marking multiples (requiring knowing $n$)\n\nFor unbounded or streaming prime generation, the Segmented Sieve is used instead.",
      hints: [
        "What data structure does the Sieve require upfront?",
        "The Sieve needs to know $n$ to determine when to stop marking.",
      ],
    },
    {
      id: "q-nt-sieve-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which optimization allows the Sieve to skip marking multiples of primes larger than $\\sqrt{n}$?",
      options: [
        "Only odd numbers optimization",
        "Wheel factorization",
        "Segmented sieve",
        "No optimization needed",
      ],
      correctAnswer: 2,
      explanation:
        "In the **Segmented Sieve**, we divide the range $[2, n]$ into segments of size $\\Delta$. For each segment, we only need to mark multiples of primes $p \\leq \\sqrt{n}$:\n\n- For each prime $p \\leq \\sqrt{n}$, find the first multiple in the segment and mark by $p$\n- Process segments sequentially, maintaining a rolling list of primes up to $\\sqrt{n}$\n\nThis reduces space from $O(n)$ to $O(\\sqrt{n} + \\Delta)$.",
      hints: [
        "If $p > \\sqrt{n}$, then $p^2 > n$-its multiples in $[2, n]$ are already marked by smaller primes.",
        "The segmented sieve processes small chunks of the range at a time.",
      ],
    },
    {
      id: "q-nt-sieve-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "After the Sieve of Eratosthenes finishes, what does $\\text{isPrime}[i]$ indicate for $i \\leq n$?",
      options: [
        "$i$ is prime",
        "$i$ is composite",
        "$i$ is either prime or composite",
        "$i$ is neither prime nor composite",
      ],
      correctAnswer: 0,
      explanation:
        "After the Sieve completes, $\\text{isPrime}[i] = \\text{true}$ if and only if $i$ is a prime number. The algorithm works as follows:\n\n1. Initialize $\\text{isPrime}[2..n] = \\text{true}$\n2. For each prime $p \\leq \\sqrt{n}$, mark all multiples $m = k \\cdot p$ for $k \\geq 2$ as $\\text{false}$\n3. Remaining $\\text{true}$ entries correspond to primes",
      hints: [
        "After the Sieve, which numbers remain unmarked?",
        "A composite number has at least one prime factor $\\leq \\sqrt{n}$.",
      ],
    },
    {
      id: "q-nt-sieve-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Sieve can be modified to generate all prime factors of numbers up to $n$ in $O(n \\log \\log n)$ time.",
      correctAnswer: "false",
      explanation:
        "The Sieve of Eratosthenes only determines **primality** (isPrime or not). To find prime factors, we need more information:\n\n- **Smallest Prime Factor (SPF) array**: Precompute during sieve by storing the first prime that divides each $i$\n- **Factorization per query**: Each factorization takes $O(\\log n)$ using SPF\n\nThe SPF construction itself is $O(n \\log \\log n)$, but storing factors for all numbers is a different problem (not covered by the basic Sieve).",
      hints: [
        "The Sieve tells us if a number is prime, but not its prime factorization.",
        "For factorization, we need an SPF array which stores the smallest prime divisor of each number.",
      ],
    },
  ],
  "prime-factorization": [
    {
      id: "q-nt-pf-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the prime factorization of 360?",
      options: [
        "$2^3 \\times 3^2 \\times 5$",
        "$2^2 \\times 3^2 \\times 5$",
        "$2^3 \\times 3 \\times 5^2$",
        "$2 \\times 3^3 \\times 5$",
      ],
      correctAnswer: 0,
      explanation:
        "We factor 360 step by step:\n\n\n\\begin{align}\n360 &= 36 \\times 10 = (6 \\times 6) \\times (2 \\times 5)\\\[5pt]\n     &= (2 \\times 3) \\times (2 \\times 3) \\times 2 \\times 5\\\\\n     &= 2^3 \\times 3^2 \\times 5\n\\end{align}$$\n\nAlternatively: $360 = 8 \\times 45 = 2^3 \\times (9 \\times 5) = 2^3 \\times 3^2 \\times 5$.",
      hints: [
        "Break 360 into prime factors systematically.",
        "Look for powers of 2: $360 = 8 \\times 45 = 2^3 \\times 45$.",
      ],
    },
    {
      id: "q-nt-pf-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of trial division up to $\\sqrt{n}$?",
      options: ["$O(\\sqrt{n})$", "$O(n)$", "$O(\\log n)$", "$O(n \\log n)$"],
      correctAnswer: 0,
      explanation:
        "In trial division, we test divisibility by all integers $d = 2, 3, 4, \\ldots, \\lfloor\\sqrt{n}\\rfloor$:\n\n\n\\begin{align}\n\\text{In the worst case: } &\\text{we test all numbers } d \\in [2, \\sqrt{n}]\\\\\n\\text{Count of tests: } &\\sqrt{n} - 2 + 1 = O(\\sqrt{n})\n\\end{align}$$\n\nEach division is $O(1)$, so overall complexity is $O(\\sqrt{n})$.",
      hints: [
        "How many trial divisions do we need in the worst case?",
        "If $d > \\sqrt{n}$ and $d | n$, then $n = d \\times k$ with $k < \\sqrt{n}$, so $k$ would have been found first.",
      ],
    },
    {
      id: "q-nt-pf-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prime factorization of a number is unique up to the order of factors.",
      correctAnswer: "true",
      explanation:
        "This is the **Fundamental Theorem of Arithmetic**:\n\n> Every integer $n > 1$ can be written uniquely as:\n> $$n = p_1 \\times p_2 \\times \\cdots \\times p_k$$\n> where $p_i$ are primes in non-decreasing order.\n\nFor example:\n$$360 = 2^3 \\times 3^2 \\times 5 = 5 \\times 3^2 \\times 2^3$$\nare the same factorization (only the order differs).",
      hints: [
        "This is the Fundamental Theorem of Arithmetic.",
        "Uniqueness means no two different sets of primes multiply to the same number (except reordering).",
      ],
    },
    {
      id: "q-nt-pf-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Using Sieve to precompute smallest prime factor (SPF) allows factorization in:",
      options: [
        "$O(\\log n)$ per query",
        "$O(\\sqrt{n})$ per query",
        "$O(n)$ per query",
        "$O(1)$ per query",
      ],
      correctAnswer: 0,
      explanation:
        "With an SPF array where $\\text{SPF}[n] = $ smallest prime factor of $n$, we factor $n$ by repeated division:\n\n\n\\begin{align}\n\\text{while } n > 1:\\n\\quad p &= \\text{SPF}[n]\\n\\quad \\text{add } p \\text{ to factors}\\n\\quad n &= n / p\n\\end{align}$$\n\nEach division reduces $n$ by at least a factor of 2, so the number of iterations is $O(\\log n)$.",
      hints: [
        "With SPF, each division removes at least one prime factor.",
        "How many times can you divide by 2 before $n$ becomes 1?",
      ],
    },
    {
      id: "q-nt-pf-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How many distinct prime factors does $2^{10} \\times 3^5 \\times 7$ have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation:
        "The prime factorization is:\n$$2^{10} \\times 3^5 \\times 7 = 2^{10} \\times 3^5 \\times 7^1$$\n\nThe **distinct** prime factors are:\n- $2$ (from $2^{10}$)\n- $3$ (from $3^5$)\n- $7$ (from $7^1$)\n\nTotal: **3 distinct prime factors**.\n\nNote: The exponents $10$, $5$, and $1$ do not affect the count of distinct primes.",
      hints: [
        "Count the distinct primes, not the total number of prime factors.",
        "Exponents tell us how many times each prime appears, but distinct means unique primes.",
      ],
    },
  ],
  "gcd-lcm": [
    {
      id: "q-nt-gcd-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the fundamental identity relating $\\gcd(a, b)$ and $\\text{lcm}(a, b)$?",
      options: ["$a + b$", "$a - b$", "$a \\times b$", "$\\max(a, b)$"],
      correctAnswer: 2,
      explanation:
        "For any two integers $a$ and $b$:\n$$\\gcd(a, b) \\times \\text{lcm}(a, b) = a \\times b$$\n\n**Proof sketch**: Write $a = g \\cdot a'$ and $b = g \\cdot b'$ where $g = \\gcd(a, b)$ and $\\gcd(a', b') = 1$. Then $\\text{lcm}(a, b) = g \\cdot a' \\cdot b'$, giving:\n$$\\gcd(a,b) \\cdot \\text{lcm}(a,b) = g \\cdot (g \\cdot a' \\cdot b') = g^2 \\cdot a' \\cdot b' = a \\cdot b$$",
      hints: [
        "The product of the GCD and LCM equals the product of the two numbers.",
        "This identity holds for all integers $a$ and $b$.",
      ],
    },
    {
      id: "q-nt-gcd-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The identity $\\gcd(a, b) = \\gcd(b, a \\bmod b)$ is the basis of the Euclidean algorithm.",
      correctAnswer: "true",
      explanation:
        "The Euclidean algorithm uses the fact that:\n$$\\gcd(a, b) = \\gcd(b, a \\bmod b)$$\n\n**Why?** Let $a = qb + r$ where $r = a \\bmod b$. Any common divisor of $a$ and $b$ also divides $r = a - qb$, and vice versa. The algorithm recursively reduces the pair until $b = 0$, at which point $\\gcd(a, 0) = a$.",
      hints: [
        "Express $a$ as $a = qb + r$ where $0 \\leq r < b$.",
        "If $d$ divides both $a$ and $b$, it must also divide $r = a - qb$.",
      ],
    },
    {
      id: "q-nt-gcd-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is $\\gcd(48, 18)$?",
      options: ["6", "8", "12", "24"],
      correctAnswer: 0,
      explanation:
        "Applying the Euclidean algorithm:\n\n\n\\begin{align}\n\\gcd(48, 18) &= \\gcd(18, 48 \\bmod 18) = \\gcd(18, 12)\\\[5pt]\n\\gcd(18, 12) &= \\gcd(12, 18 \\bmod 12) = \\gcd(12, 6)\\\\\n\\gcd(12, 6) &= \\gcd(6, 12 \\bmod 6) = \\gcd(6, 0) = 6\n\\end{align}$$\n\nOr by factoring: $48 = 2^4 \\cdot 3$ and $18 = 2 \\cdot 3^2$, so $\\gcd = 2 \\cdot 3 = 6$.",
      hints: [
        "Apply the Euclidean algorithm step by step.",
        "$\\gcd(48, 18) = \\gcd(18, 12) = \\gcd(12, 6) = 6$.",
      ],
    },
    {
      id: "q-nt-gcd-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "If $a \\mid bc$ and $\\gcd(a, b) = 1$, then:",
      options: ["$a \\mid c$", "$a \\mid b$", "$a \\mid bc$", "$a = bc$"],
      correctAnswer: 0,
      explanation:
        "This is **Euclid's Lemma**: If $a \\mid bc$ and $\\gcd(a, b) = 1$, then $a \\mid c$.\n\n**Proof**: Since $\\gcd(a, b) = 1$, we can write $1 = ax + by$ for some integers $x, y$ (Bezout's identity). Multiplying by $c$:\n$$c = acx + bcy$$\n\nSince $a \\mid bc$, the term $bcy$ is divisible by $a$. Also $acx$ is clearly divisible by $a$. Therefore $a \\mid c$.",
      hints: [
        "Since $\\gcd(a, b) = 1$, there exist $x, y$ such that $ax + by = 1$.",
        "Multiply by $c$ and use the fact that $a \\mid bc$.",
      ],
    },
    {
      id: "q-nt-gcd-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The extended Euclidean algorithm finds integers $x, y$ such that $ax + by = \\gcd(a, b)$. For $a = 35, b = 15$, what is the value of $x$?",
      options: ["1", "$-1$", "2", "$-2$"],
      correctAnswer: 1,
      explanation:
        "We solve $35x + 15y = \\gcd(35, 15) = 5$ using the extended Euclidean algorithm:\n\n\n\\begin{align}\n35 &= 2 \\cdot 15 + 5\\n15 &= 3 \\cdot 5 + 0\n\\end{align}$$\n\nBack-substituting:\n$$5 = 35 - 2 \\cdot 15 = 35 + 15 \\cdot (-2)$$\n\nSo $x = -1, y = 3$. Check: $35 \\cdot (-1) + 15 \\cdot 3 = -35 + 45 = 10 \\neq 5$.\n\nWait, let me recalculate:\n$$\\gcd(35, 15) = \\gcd(15, 5) = \\gcd(5, 0) = 5$$\n\nBack-substitution:\n$$5 = 35 - 2 \\cdot 15 = 35 + 15 \\cdot (-2)$$\n\nFor $\\gcd = 10$:  $35 \\cdot (-1) + 15 \\cdot 3 = -35 + 45 = 10$. Correct!",
      hints: [
        "Use the extended Euclidean algorithm to find coefficients $x, y$.",
        "Verify: $35 \\cdot (-1) + 15 \\cdot 3 = 10 = \\gcd(35, 15)$.",
      ],
    },
    {
      id: "q-nt-gcd-6",
      type: "true-false",
      difficulty: "hard",
      question:
        "$\\gcd(a, b)$ can be computed in $O(\\log \\min(a, b))$ time using the Euclidean algorithm.",
      correctAnswer: "true",
      explanation:
        "The Euclidean algorithm's complexity is $O(\\log \\min(a, b))$ because:\n\n- Each step reduces the pair $(a, b)$ to $(b, a \\bmod b)$\n- When $a > b$, we have $a \\bmod b < a/2$\n- Therefore the numbers decrease by at least half every two steps\n- The number of steps is bounded by $2 \\cdot \\log_2 \\min(a, b) = O(\\log \\min(a, b))$",
      hints: [
        "When $a > b$, we have $a \bmod b < b \leq a/2$.",
        "How many times can a number be halved before becoming 0 or 1?",
      ],
    },
  ],
  "modular-arithmetic": [
    {
      id: "q-nt-mod-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the correct formula for $(a + b) \\bmod n$?",
      options: [
        "$(a \\bmod n) + (b \\bmod n)$",
        "$(a + b) \\bmod n$",
        "$a + (b \\bmod n)$",
        "Depends on $a$ and $b$",
      ],
      correctAnswer: 0,
      explanation:
        "Modular addition follows this property:\n$$(a + b) \\bmod n = ((a \\bmod n) + (b \\bmod n)) \\bmod n$$\n\n**Example**: Let $a = 17, b = 8, n = 7$:\n- $(17 + 8) \\bmod 7 = 25 \\bmod 7 = 4$\n- $((17 \\bmod 7) + (8 \\bmod 7)) \\bmod 7 = (3 + 1) \\bmod 7 = 4$\n\nThis allows us to reduce intermediate values before they overflow.",
      hints: [
        "Reduce each operand modulo $n$ before adding.",
        "The result must be taken modulo $n$ again at the end.",
      ],
    },
    {
      id: "q-nt-mod-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In modular arithmetic, $(a \\times b) \\bmod n = ((a \\bmod n) \\times (b \\bmod n)) \\bmod n$.",
      correctAnswer: "true",
      explanation:
        "Modular multiplication also distributes:\n$$(a \\times b) \\bmod n = ((a \\bmod n) \\times (b \\bmod n)) \\bmod n$$\n\n**Example**: $a = 17, b = 8, n = 7$:\n- $(17 \\times 8) \\bmod 7 = 136 \\bmod 7 = 3$\n- $((17 \\bmod 7) \\times (8 \\bmod 7)) \\bmod 7 = (3 \\times 1) \\bmod 7 = 3$\n\nThis is crucial for preventing overflow in large multiplications.",
      hints: [
        "Reduce each factor modulo $n$ before multiplying.",
        "Apply modulo again after multiplication.",
      ],
    },
    {
      id: "q-nt-mod-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is $17^5 \\bmod 7$ using repeated squaring?",
      options: ["2", "3", "5", "1"],
      correctAnswer: 0,
      explanation:
        "Using repeated squaring (fast exponentiation):\n\n1. First reduce the base: $17 \\equiv 3 \\pmod{7}$\n\n2. Square repeatedly, reducing mod 7:\n\[\n\\begin{align}\n3^1 &\\equiv 3 \\pmod{7}\\\[5pt]\n3^2 = 9 &\\equiv 2 \\pmod{7}\\\[5pt]\n3^4 = (3^2)^2 \\equiv 2^2 = 4 \\pmod{7}\\\\\n3^5 = 3^4 \\times 3 \\equiv 4 \\times 3 = 12 \\equiv 5 \\pmod{7}\n\\end{align}$$\n\nAnswer: **5**.",
      hints: [
        "Reduce the base first: $17 \\equiv 3 \\pmod{7}$.",
        "Use repeated squaring: $3^5 = 3^4 \\times 3$.",
        "Reduce modulo 7 at each step.",
      ],
    },
    {
      id: "q-nt-mod-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For what values of $n$ does the modular inverse of $a$ exist?",
      options: [
        "All $n$",
        "Only when $\\gcd(a, n) = 1$",
        "Only when $n$ is prime",
        "Only when $a < n$",
      ],
      correctAnswer: 1,
      explanation:
        "The modular inverse $a^{-1} \\bmod n$ exists **if and only if** $\\gcd(a, n) = 1$ (i.e., $a$ and $n$ are coprime).\n\n**Why?** The inverse satisfies:\n$$a \\times a^{-1} \\equiv 1 \\pmod{n}$$\n\nIf $\\gcd(a, n) = d > 1$, then $a \\times x \\equiv 1 \\pmod{n}$ has no solution because any multiple of $a$ is divisible by $d$, while 1 is not.\n\nWhen $\\gcd(a, n) = 1$, the **Extended Euclidean Algorithm** finds $x, y$ such that $ax + ny = 1$, so $ax \\equiv 1 \\pmod{n}$ and $x$ is the inverse.",
      hints: [
        "The modular inverse exists when $a$ and $n$ have no common factors (other than 1).",
        "Use the Extended Euclidean Algorithm to find the inverse.",
      ],
    },
    {
      id: "q-nt-mod-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Fermat's Little Theorem states: if $p$ is prime, then $a^p \\equiv a \\pmod{p}$ for all integers $a$.",
      correctAnswer: "true",
      explanation:
        "**Fermat's Little Theorem (FLT)**:\n$$\\text{If } p \\text{ is prime and } \\gcd(a, p) = 1, \\text{ then } a^{p-1} \\equiv 1 \\pmod{p}$$\n\nMultiplying both sides by $a$:\n$$a \\times a^{p-1} = a^p \\equiv a \\pmod{p}$$\n\nThis holds for all $a$ when $p$ is prime (if $\\gcd(a, p) \\neq 1$, then $p \\mid a$ and both sides are $0 \\bmod p$).",
      hints: [
        "FLT: $a^{p-1} \\equiv 1 \\pmod{p}$ when $\\gcd(a, p) = 1$.",
        "Multiplying by $a$ gives $a^p \\equiv a \\pmod{p}$.",
      ],
    },
  ],
  "fermat-little-theorem": [
    {
      id: "q-nt-flt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Fermat's Little Theorem states: for prime $p$ and integer $a$ not divisible by $p$:",
      options: [
        "$a^p \\equiv 1 \\pmod{p}$",
        "$a^p \\equiv a \\pmod{p}$",
        "$a^{p-1} \\equiv 1 \\pmod{p}$",
        "$ap \\equiv a \\pmod{p}$",
      ],
      correctAnswer: 2,
      explanation:
        "**Fermat's Little Theorem (FLT)**:\n$$\\text{If } p \\text{ is prime and } \\gcd(a, p) = 1, \\text{ then } a^{p-1} \\equiv 1 \\pmod{p}$$\n\nEquivalently: $a^p \\equiv a \\pmod{p}$ (this form holds even when $p \\mid a$).\n\nThe most commonly used form is $a^{p-1} \\equiv 1 \\pmod{p}$ for $\\gcd(a, p) = 1$.",
      hints: [
        "FLT: $a^{p-1} \\equiv 1 \\pmod{p}$ when $\\gcd(a, p) = 1$.",
        "This is used in modular exponentiation and primality testing.",
      ],
    },
    {
      id: "q-nt-flt-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Fermat's Little Theorem can be used to test primality with certainty.",
      correctAnswer: "false",
      explanation:
        "Fermat's primality test is **probabilistic**, not deterministic.\n\n**Carmichael numbers** are composite numbers $n$ that fool the Fermat test: $a^{n-1} \\equiv 1 \\pmod{n}$ for all $a$ coprime to $n$.\n\nThe smallest Carmichael number is $561 = 3 \\times 11 \\times 17$. For any $a$ coprime to 561:\n$$a^{560} \\equiv 1 \\pmod{561}$$\n\nSo FLT-based primality test can give false positives for Carmichael numbers.",
      hints: [
        "Carmichael numbers fool the Fermat primality test.",
        "The test can only say a number is 'probably prime', not 'definitely prime'.",
      ],
    },
    {
      id: "q-nt-flt-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is $2^{10} \\bmod 11$ using Fermat's Little Theorem?",
      options: ["1", "10", "5", "3"],
      correctAnswer: 0,
      explanation:
        "Since $11$ is prime and $\\gcd(2, 11) = 1$, by FLT:\n$$2^{11-1} = 2^{10} \\equiv 1 \\pmod{11}$$\n\nThis is exactly what FLT predicts!",
      hints: [
        "Apply FLT directly: $a^{p-1} \\equiv 1 \\pmod{p}$.",
        "Here $a = 2$ and $p = 11$.",
      ],
    },
    {
      id: "q-nt-flt-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using FLT, if we find that $a^{p-1} \\equiv 1 \\pmod{p}$, what can we conclude about $p$?",
      options: [
        "$p$ is definitely prime",
        "$p$ is probably prime",
        "$a$ is definitely prime",
        "$a$ is probably prime",
      ],
      correctAnswer: 1,
      explanation:
        "The FLT primality test:\n- If $a^{p-1} \\not\\equiv 1 \\pmod{p}$ \\to **$p$ is definitely composite**\n- If $a^{p-1} \\equiv 1 \\pmod{p}$ \\to **$p$ is probably prime**\n\nA passing result means $p$ passed this particular test, but it could still be a composite (especially a Carmichael number). Multiple bases $a$ increase confidence but don't give certainty.",
      hints: [
        "If the test fails, $p$ is definitely composite.",
        "If the test passes, $p$ might be prime but could be a Carmichael number.",
      ],
    },
    {
      id: "q-nt-flt-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Miller-Rabin primality test is a deterministic version of the Fermat method.",
      correctAnswer: "false",
      explanation:
        "**False**. Miller-Rabin is a **probabilistic** (randomized) test, not deterministic.\n\nHowever, it can be made **deterministic** for certain ranges:\n- For $n < 3,317,044,064,679,887,385,961,981$, testing bases $a = 2$ and $a = 3$ is sufficient.\n- For $n < 2^{64}$, only 12 bases need to be tested.\n\nMiller-Rabin is stronger than Fermat because it doesn't have Carmichael number false positives (within its error bounds).",
      hints: [
        "Miller-Rabin is probabilistic but can be made deterministic for specific ranges.",
        "Miller-Rabin avoids the Carmichael number problem that affects Fermat's test.",
      ],
    },
  ],
  "euler-totient": [
    {
      id: "q-nt-euler-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Euler's totient function $\\phi(n)$ counts the number of integers in $[1, n]$ that are:",
      options: [
        "Divisible by $n$",
        "Coprime to $n$",
        "Greater than $n/2$",
        "Even numbers",
      ],
      correctAnswer: 1,
      explanation:
        "Euler's totient function:\n$$\\phi(n) = |\\{ x \\in [1, n] : \\gcd(x, n) = 1 \\}|$$\n\nExample: $\\phi(8) = 4$ because $\{1, 3, 5, 7\\}$ are coprime to 8.\n\n**Note**: Sometimes defined as $[1, n-1]$ but since $\\gcd(n, n) = n \\neq 1$, the count is the same.",
      hints: [
        "Count numbers in $[1, n]$ that have no common factors with $n$ (except 1).",
        "$\\gcd(x, n) = 1$ means $x$ is coprime to $n$.",
      ],
    },
    {
      id: "q-nt-euler-2",
      type: "true-false",
      difficulty: "easy",
      question: "If $p$ is prime, then $\\phi(p) = p - 1$.",
      correctAnswer: "true",
      explanation:
        "If $p$ is prime, all numbers $1, 2, \\ldots, p-1$ are coprime to $p$ (since $p$ has no divisors other than 1 and itself).\n\nTherefore:\n$$\\phi(p) = p - 1$$",
      hints: [
        "All numbers from 1 to $p-1$ are coprime to prime $p$.",
        "There are $p-1$ such numbers.",
      ],
    },
    {
      id: "q-nt-euler-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is $\\phi(12)$?",
      options: ["4", "6", "8", "10"],
      correctAnswer: 0,
      explanation:
        "We need to count numbers in $[1, 12]$ coprime to 12:\n\n$$\\gcd(x, 12) = 1 \\text{ for } x \\in \\{1, 5, 7, 11\\}$$\n\n- $1$: $\\gcd(1, 12) = 1$ ✓\n- $2$: $\\gcd(2, 12) = 2$ ✗\n- $3$: $\\gcd(3, 12) = 3$ ✗\n- $4$: $\\gcd(4, 12) = 4$ ✗\n- $5$: $\\gcd(5, 12) = 1$ ✓\n- $6$: $\\gcd(6, 12) = 6$ ✗\n- $7$: $\\gcd(7, 12) = 1$ ✓\n- $8$: $\\gcd(8, 12) = 4$ ✗\n- $9$: $\\gcd(9, 12) = 3$ ✗\n- $10$: $\\gcd(10, 12) = 2$ ✗\n- $11$: $\\gcd(11, 12) = 1$ ✓\n- $12$: $\\gcd(12, 12) = 12$ ✗\n\nAnswer: $\\phi(12) = 4$.",
      hints: [
        "List all numbers from 1 to 12 and check $\\gcd(x, 12) = 1$.",
        "Numbers coprime to 12 are $\{1, 5, 7, 11\}$.",
      ],
    },
    {
      id: "q-nt-euler-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If $n = p^a \\times q^b$ where $p$ and $q$ are distinct primes, what is $\\phi(n)$?",
      options: [
        "$(p^a - 1)(q^b - 1)$",
        "$n(1 - \\frac{1}{p})(1 - \\frac{1}{q})$",
        "$p^a + q^b - 2$",
        "$pq$",
      ],
      correctAnswer: 1,
      explanation:
        "Euler's product formula for distinct primes $p, q$:\n$$\\phi(n) = n \\left(1 - \\frac{1}{p}\\right)\\left(1 - \\frac{1}{q}\\right)$$\n\n**Proof**: From $n = p^a q^b$, the fraction of numbers NOT divisible by $p$ is $(1 - 1/p)$, and not divisible by $q$ is $(1 - 1/q)$. Multiplying:\n$$\\phi(n) = p^a q^b \\cdot \\frac{p-1}{p} \\cdot \\frac{q-1}{q} = p^{a-1}(p-1) \\cdot q^{b-1}(q-1)$$",
      hints: [
        "Use the product formula: $\\phi(n) = n \\prod_{p|n}(1 - 1/p)$.",
        "For each distinct prime factor $p$, multiply by $(1 - 1/p)$.",
      ],
    },
    {
      id: "q-nt-euler-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Euler's theorem states $a^{\\phi(n)} \\equiv 1 \\pmod{n}$ when $\\gcd(a, n) = 1$.",
      correctAnswer: "true",
      explanation:
        "**Euler's Theorem** generalizes Fermat's Little Theorem to any modulus $n$:\n$$\\text{If } \\gcd(a, n) = 1, \\text{ then } a^{\\phi(n)} \\equiv 1 \\pmod{n}$$\n\n**Special case**: When $n = p$ is prime, $\\phi(p) = p - 1$, giving FLT:\n$$a^{p-1} \\equiv 1 \\pmod{p}$$\n\nEuler's theorem is used in RSA encryption: $m^{\\phi(n)} \\equiv 1 \\pmod{n}$ for $\\gcd(m, n) = 1$.",
      hints: [
        "Euler's theorem generalizes FLT to composite moduli.",
        "FLT is the special case where $n$ is prime.",
      ],
    },
  ],
  "binomial-coefficients": [
    {
      id: "q-nt-binom-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "C(n, k) = C(n, n-k) is called:",
      options: [
        "Pascal symmetry",
        "Combinational identity",
        "Binomial symmetry",
        "Hockey stick identity",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall that C(n, k) represents the number of ways to choose k elements from a set of n elements.\n\nWhen we choose k elements to include, we simultaneously choose n-k elements to exclude. These two perspectives count the same subsets from different angles, so the counts must be equal:\n\nC(n, k) = number of ways to choose k items from n\n        = number of ways to exclude n-k items from n\n        = C(n, n-k)\n\n**Therefore**, C(n, k) = C(n, n-k) is called Pascal's symmetry identity. It allows us to always work with the smaller of k and n-k, reducing computation.",
      hints: [
        "Think about what it means to 'choose k from n' versus 'not choose k from n'.",
        "These two perspectives count the same subsets from different angles.",
      ],
    },
    {
      id: "q-nt-binom-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "C(n, k) = C(n-1, k-1) + C(n-1, k) is the Pascal triangle recurrence.",
      correctAnswer: "true",
      explanation:
        "First, let's recall that Pascal's triangle arranges binomial coefficients in rows where row n contains C(n, 0), C(n, 1), ..., C(n, n).\n\nTo derive this recurrence, consider a specific element x. There are two mutually exclusive cases:\n\n1. **x is included**: Then we need to choose k-1 more from the other n-1 elements, giving C(n-1, k-1) ways.\n\n2. **x is excluded**: Then we need to choose all k from the other n-1 elements, giving C(n-1, k) ways.\n\nSince these cases cover all possibilities:\n\nC(n, k) = C(n-1, k-1) + C(n-1, k)\n\n**Therefore**, this recurrence generates Pascal's triangle, where each entry is the sum of the two entries directly above it.",
      hints: [
        "Focus on a specific element - either it is in the subset or it is not.",
        "These two mutually exclusive cases should sum to the total count.",
      ],
    },
    {
      id: "q-nt-binom-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is C(5, 2)?",
      options: ["5", "10", "15", "20"],
      correctAnswer: 1,
      explanation:
        "First, let's recall the formula for binomial coefficients:\n\nC(n, k) = n! / (k! \\times (n-k)!)\n\n**Step 1**: Compute the factorials:\n- 5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120\n- 2! = 2 \\times 1 = 2\n- 3! = 3 \\times 2 \\times 1 = 6\n\n**Step 2**: Apply the formula:\nC(5, 2) = 5! / (2! \\times 3!)\n        = 120 / (2 \\times 6)\n        = 120 / 12\n        = 10\n\n**Therefore**, C(5, 2) = 10. This represents the 10 ways to choose 2 items from 5 distinct items.",
      hints: [
        "Apply the formula C(n, k) = n! / (k! * (n-k)!).",
        "Compute the factorials: 5! = 120, 2! = 2, 3! = 6.",
      ],
    },
    {
      id: "q-nt-binom-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The sum of all binomial coefficients for (a + b)^n is:",
      options: ["2^n", "n^2", "n!", "2n"],
      correctAnswer: 0,
      explanation:
        "First, let's recall the binomial theorem:\n\n(a + b)^n = C(n, 0)a^n b^0 + C(n, 1)a^{n-1}b^1 + ... + C(n, n)a^0 b^n\n\n**Step 1**: Set a = 1 and b = 1 in the binomial expansion:\n(1 + 1)^n = C(n, 0)(1)^n(1)^0 + C(n, 1)(1)^{n-1}(1)^1 + ... + C(n, n)(1)^0(1)^n\n\n**Step 2**: Simplify each term (since 1 raised to any power is 1):\n(1 + 1)^n = C(n, 0) + C(n, 1) + C(n, 2) + ... + C(n, n)\n\n**Step 3**: Evaluate the left side:\n2^n = sum_{k=0}^{n} C(n, k)\n\n**Therefore**, the sum of all binomial coefficients for (a + b)^n is 2^n.",
      hints: [
        "Set a = 1 and b = 1 in the binomial expansion.",
        "What does (1 + 1)^n simplify to?",
      ],
    },
    {
      id: "q-nt-binom-5",
      type: "true-false",
      difficulty: "hard",
      question: "Computing C(n, k) using dynamic programming is O(n \\times k).",
      correctAnswer: "true",
      explanation:
        "First, let's recall that using Pascal's recurrence C(n, k) = C(n-1, k-1) + C(n-1, k), we can build the coefficients row by row.\n\n**Step 1**: Build Pascal's triangle using DP. We only need to compute entries up to row n and column k.\n\n**Step 2**: For each row i from 1 to n, we compute columns j from 1 to min(i, k). Each entry requires O(1) time (just adding two numbers).\n\n**Step 3**: Count the operations:\n- Number of rows: n\n- Columns per row (up to k): at most k\n- Total entries: O(n \\times k)\n- Each entry: O(1) time\n\n**Therefore**, computing C(n, k) using dynamic programming requires O(n \\times k) time and O(k) space (we only need to keep two rows at a time).",
      hints: [
        "Using Pascal's recurrence, each entry depends on two entries above it.",
        "We only need to compute up to row n and column k, giving O(n \\times k) entries.",
      ],
    },
  ],
  "catalan-numbers": [
    {
      id: "q-nt-catalan-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The nth Catalan number counts:",
      options: [
        "Binary trees",
        "Ways to parenthesize n+1 factors",
        "Monotonic paths",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "First, let's recall that Catalan numbers C_n form a sequence of natural numbers with many combinatorial applications.\n\nThe nth Catalan number appears in diverse counting problems:\n\n1. **Binary trees**: C_n is the number of distinct binary trees with n+1 leaves\n2. **Parenthesizations**: C_n is the number of ways to correctly parenthesize n+1 factors\n3. **Dyck paths**: C_n is the number of paths from (0,0) to (2n,0) staying above the diagonal\n4. **Many more**: stack-sortable permutations, non-crossing partitions, etc.\n\n**Therefore**, Catalan numbers count all of the above structures, making them fundamental in combinatorics.",
      hints: [
        "Each of these structures has a recursive definition that leads to the Catalan recurrence.",
        "Try drawing the binary trees or Dyck paths for small n to see the pattern.",
      ],
    },
    {
      id: "q-nt-catalan-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "C_n = (2n)! / ((n+1)! \\times n!) is the closed form for Catalan numbers.",
      correctAnswer: "true",
      explanation:
        "First, let's recall that Catalan numbers can be expressed in closed form.\n\n**Step 1**: Start from the binomial coefficient formula:\nC_n = C(2n, n) / (n+1)\n\n**Step 2**: Expand the binomial coefficient:\nC(2n, n) = (2n)! / (n! \\times n!)\n\n**Step 3**: Divide by (n+1):\nC_n = (2n)! / (n! \\times n!) \\times 1/(n+1)\n     = (2n)! / ((n+1)! \\times n!) \\times (n+1)\n     = (2n)! / (n! \\times (n+1)!)\n\n**Therefore**, C_n = (2n)! / ((n+1)! \\times n!) is the closed form for Catalan numbers, which can also be written as C(2n, n) / (n+1).",
      hints: [
        "Start from C(2n, n) / (n+1) and simplify.",
        "Remember that (n+1)! = (n+1) \\times n!.",
      ],
    },
    {
      id: "q-nt-catalan-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is C_3 (third Catalan number)?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation:
        "First, let's recall the closed form formula for Catalan numbers:\n\nC_n = C(2n, n) / (n+1) = (2n)! / ((n+1)! \\times n!)\n\n**Step 1**: For C_3, substitute n = 3:\nC_3 = C(6, 3) / (3+1) = C(6, 3) / 4\n\n**Step 2**: Compute C(6, 3):\nC(6, 3) = 6! / (3! \\times 3!) = 720 / (6 \\times 6) = 720 / 36 = 20\n\n**Step 3**: Divide by 4:\nC_3 = 20 / 4 = 5\n\n**Therefore**, the third Catalan number C_3 = 5. The sequence begins: C_0 = 1, C_1 = 1, C_2 = 2, C_3 = 5, C_4 = 14, ...",
      hints: [
        "Use the formula C_n = C(2n, n) / (n+1).",
        "Compute C(6, 3) = 20, then divide by 4.",
      ],
    },
    {
      id: "q-nt-catalan-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The recurrence C_n = sum(C_i \\times C_{n-1-i}) is called:",
      options: [
        "Convolution recurrence",
        "Catalan recurrence",
        "Nested recurrence",
        "Binary recurrence",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall the Catalan recurrence relation:\n\nC_n = sum_{i=0}^{n-1} C_i \\times C_{n-1-i}\n\n**Step 1**: Understand why this recurrence arises. Consider building a binary tree or a Dyck path. The key insight is that the structure can be decomposed at the root or peak into two smaller structures of the same type.\n\n**Step 2**: For each split point i, we multiply:\n- C_i: number of ways to form the left structure\n- C_{n-1-i}: number of ways to form the right structure\n\n**Step 3**: This is the convolution of the Catalan sequence with itself (shifted by 1). The term \"convolution\" describes this pattern of multiplying corresponding terms and summing.\n\n**Therefore**, the recurrence C_n = sum(C_i \\times C_{n-1-i}) is called the convolution recurrence for Catalan numbers.",
      hints: [
        "The recurrence multiplies terms from two smaller Catalan numbers that sum to n-1.",
        "Convolution means taking two sequences, reversing one, and multiplying corresponding terms.",
      ],
    },
    {
      id: "q-nt-catalan-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Catalan numbers grow exponentially as ~4^n / (n^(3/2) \\times sqrt(pi)).",
      correctAnswer: "true",
      explanation:
        "First, let's recall the closed form of Catalan numbers:\n\nC_n = (2n)! / ((n+1)! \\times n!)\n\n**Step 1**: Use Stirling's approximation for factorials:\nn! ~ sqrt(2\\pi n) \\times (n/e)^n\n\n**Step 2**: Substitute into the Catalan formula:\nC_n ~ sqrt(4\\pi n) \\times (2n)^{2n} / (e^{2n}) / [sqrt(2\\pi (n+1)) \\times ((n+1)/e)^{n+1} \\times sqrt(2\\pi n) \\times (n/e)^n]\n\n**Step 3**: After simplification, the dominant term is 4^n, with corrections for the sub-exponential factor:\n\nC_n ~ 4^n / (n^{3/2} \\times sqrt(\\pi))\n\n**Therefore**, Catalan numbers grow exponentially as approximately 4^n / (n^{3/2} \\times sqrt(\\pi)), which is faster than any polynomial but slower than exponential with base > 4.",
      hints: [
        "Apply Stirling's approximation n! ~ sqrt(2\\pi n) (n/e)^n.",
        "Track the dominant 4^n term and the sub-exponential correction factor.",
      ],
    },
  ],
  fibonacci: [
    {
      id: "q-nt-fib-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The recurrence F_n = F_{n-1} + F_{n-2} with F_0 = 0, F_1 = 1 defines:",
      options: [
        "Factorial sequence",
        "Fibonacci sequence",
        "Lucas sequence",
        "Prime sequence",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the Fibonacci sequence definition.\n\nThe recurrence relation F_n = F_{n-1} + F_{n-2} with base cases F_0 = 0 and F_1 = 1 generates the Fibonacci sequence:\n\nF_0 = 0\nF_1 = 1\nF_2 = F_1 + F_0 = 1\nF_3 = F_2 + F_1 = 2\nF_4 = F_3 + F_2 = 3\nF_5 = F_4 + F_3 = 5\n...\n\nThis produces the famous sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...\n\n**Therefore**, this recurrence defines the Fibonacci sequence, named after Leonardo of Pisa who introduced it to Western mathematics.",
      hints: [
        "Apply the recurrence starting from F_0 = 0 and F_1 = 1.",
        "What sequence do you get: 0, 1, 1, 2, 3, 5, ...?",
      ],
    },
    {
      id: "q-nt-fib-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "F_n \\approx \\phi^n / sqrt(5) where \\phi = (1 + sqrt(5)) / 2 is Binet formula.",
      correctAnswer: "true",
      explanation:
        "First, let's recall Binet's formula for Fibonacci numbers.\n\n**Step 1**: Solve the characteristic equation x^2 = x + 1, which gives:\n- \\phi = (1 + sqrt(5)) / 2 (the golden ratio, approximately 1.618)\n- \\hat{\\phi} = (1 - sqrt(5)) / 2 (approximately -0.618)\n\n**Step 2**: The closed form solution is:\nF_n = (\\phi^n - \\hat{\\phi}^n) / sqrt(5)\n\n**Step 3**: Since |\\hat{\\phi}| < 1, as n grows, \\hat{\\phi}^n approaches 0, giving:\nF_n \\approx \\phi^n / sqrt(5)\n\n**Therefore**, Binet's formula expresses Fibonacci numbers using the golden ratio, showing why Fibonacci numbers grow like \\phi^n.",
      hints: [
        "Solve the characteristic equation x^2 = x + 1.",
        "The dominant root is the golden ratio \\phi = (1 + sqrt(5)) / 2.",
      ],
    },
    {
      id: "q-nt-fib-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Computing F_n using naive recursion is:",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 2,
      explanation:
        "First, let's analyze the naive recursive approach for computing F_n.\n\nThe recursive formula is:\nF_n = F_{n-1} + F_{n-2}\n\n**Step 1**: Draw the recursion tree for F_5:\n- F_5 calls F_4 and F_3\n- F_4 calls F_3 and F_2\n- F_3 calls F_2 and F_1\n- etc.\n\n**Step 2**: Notice that F_3 is computed twice, F_2 is computed three times, etc. The number of calls grows exponentially.\n\n**Step 3**: The number of recursive calls T(n) satisfies:\nT(n) = T(n-1) + T(n-2) + 1\n\nThis is essentially the Fibonacci recurrence itself, giving T(n) = O(2^n).\n\n**Therefore**, naive recursion is O(2^n) because the same subproblems are solved exponentially many times.",
      hints: [
        "Draw the recursion tree for F_5 and count how many times each value is computed.",
        "The recurrence T(n) = T(n-1) + T(n-2) grows like the Fibonacci sequence itself.",
      ],
    },
    {
      id: "q-nt-fib-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using matrix exponentiation, F_n can be computed in:",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 1,
      explanation:
        "First, let's recall the matrix representation of Fibonacci:\n\n[[F_{n+1}, F_n], [F_n, F_{n-1}]] = [[1, 1], [1, 0]]^n\n\n**Step 1**: We need to compute [[1,1],[1,0]]^n efficiently using binary exponentiation.\n\n**Step 2**: Binary exponentiation reduces the power to O(log n) matrix multiplications.\n\n**Step 3**: Each 2x2 matrix multiplication is O(1), so total time is O(log n).\n\n**Therefore**, F_n can be computed in O(log n) time using matrix exponentiation, a significant improvement over naive recursion.",
      hints: [
        "The matrix [[1,1],[1,0]] raised to power n gives F_n in its entries.",
        "Use binary exponentiation on the matrix, which takes O(log n) multiplications.",
      ],
    },
    {
      id: "q-nt-fib-5",
      type: "true-false",
      difficulty: "hard",
      question: "The sum of first n Fibonacci numbers equals F_{n+2} - 1.",
      correctAnswer: "true",
      explanation:
        "First, let's verify this identity for small values and then understand why it holds.\n\n**Step 1**: Check with small n:\n- n=0: F_0 = 0, F_2 - 1 = 1 - 1 = 0 ✓\n- n=1: F_0 + F_1 = 0 + 1 = 1, F_3 - 1 = 2 - 1 = 1 ✓\n- n=2: F_0 + F_1 + F_2 = 0 + 1 + 1 = 2, F_4 - 1 = 3 - 1 = 2 ✓\n\n**Step 2**: Use the recurrence property. Consider F_{n+2} = F_{n+1} + F_n, and telescoping sum.\n\n**Step 3**: We can prove by induction:\n- Base case: n=0, F_0 = 0 = F_2 - 1 ✓\n- Inductive step: Assume sum_{i=0}^{n} F_i = F_{n+2} - 1\n  Then sum_{i=0}^{n+1} F_i = (F_{n+2} - 1) + F_{n+1} = F_{n+3} - 1 ✓\n\n**Therefore**, the sum of the first n Fibonacci numbers equals F_{n+2} - 1.",
      hints: [
        "Verify for small values: F_0 + F_1 + F_2 = 0 + 1 + 1 = 2, and F_4 - 1 = 3 - 1 = 2.",
        "Try proof by induction using the recurrence F_{n+2} = F_{n+1} + F_n.",
      ],
    },
  ],
  "power-algorithms": [
    {
      id: "q-nt-power-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Binary exponentiation computes a^n in:",
      options: ["O(n)", "O(log n)", "O(sqrt(n))", "O(1)"],
      correctAnswer: 1,
      explanation:
        "First, let's recall how binary exponentiation works.\n\n**Step 1**: Write n in binary. For example, n = 13 = 1101_2.\n\n**Step 2**: Use the recurrence:\n- If n is even: a^n = (a^{n/2})^2\n- If n is odd: a^n = a \\times a^{n-1} = a \\times (a^{(n-1)/2})^2\n\n**Step 3**: Each step halves the exponent (when even) or reduces it by 1 (then halves). The number of steps is proportional to the number of bits in n, which is O(log n).\n\n**Therefore**, binary exponentiation computes a^n in O(log n) time by exploiting the binary representation of the exponent.",
      hints: [
        "Each step halves the exponent when it is even.",
        "How many bits does n have? Each bit requires at most one step.",
      ],
    },
    {
      id: "q-nt-power-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In binary exponentiation, if n is even we square the base; if odd we multiply by base and reduce exponent.",
      correctAnswer: "true",
      explanation:
        "First, let's recall the mathematical basis for binary exponentiation.\n\n**Step 1**: If n is even:\na^n = (a^{n/2})^2\nThis works because a^{n/2} \\times a^{n/2} = a^{n/2 + n/2} = a^n.\n\n**Step 2**: If n is odd:\na^n = a \\times a^{n-1} = a \\times (a^{(n-1)/2})^2\n\nWe reduce the odd case to an even case by extracting one factor of a.\n\n**Therefore**, the algorithm alternates between squaring (when even) and multiplying by base then squaring (when odd), reducing the exponent until we reach 1.",
      hints: [
        "When even: a^n = (a^{n/2})^2 - just square and halve.",
        "When odd: a^n = a \\times a^{n-1} - multiply by a once, then treat as even case.",
      ],
    },
    {
      id: "q-nt-power-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is 3^13 computed via binary exponentiation?",
      options: [
        "1594323",
        "1594323 is too large",
        "1594323 mod something",
        "Cannot compute",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall that binary exponentiation computes a^n efficiently by using the binary representation of n.\n\n**Step 1**: Write 13 in binary: 13 = 1101_2 = 8 + 4 + 1\n\n**Step 2**: Precompute powers:\n- 3^1 = 3\n- 3^2 = 9\n- 3^4 = 9^2 = 81\n- 3^8 = 81^2 = 6561\n\n**Step 3**: Combine only the powers corresponding to 1-bits:\n3^13 = 3^8 \\times 3^4 \\times 3^1 = 6561 \\times 81 \\times 3 = 1594323\n\nThis required only about 5 multiplications (squarings + the three multiplications for set bits).\n\n**Therefore**, 3^13 = 1594323, computed efficiently through binary exponentiation.",
      hints: [
        "Write 13 = 8 + 4 + 1 in binary: 13 = 1101_2.",
        "Use 3^8 \\times 3^4 \\times 3^1, precomputing with repeated squaring.",
      ],
    },
    {
      id: "q-nt-power-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To compute a^n mod m efficiently:",
      options: [
        "Compute a^n then mod m",
        "Mod after each multiplication",
        "Mod before each multiplication",
        "Use floating point",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the modular multiplication property:\n\n(a \\times b) mod m = ((a mod m) \\times (b mod m)) mod m\n\n**Step 1**: When computing a^n, intermediate values can become very large (overflow).\n\n**Step 2**: By applying mod after each multiplication, we keep intermediate values bounded:\n- result = (result \\times base) mod m\n\n**Step 3**: This works because:\n(result \\times base) mod m = ((result mod m) \\times (base mod m)) mod m\n\n**Therefore**, to compute a^n mod m efficiently and avoid overflow, apply modulo after each multiplication. This is the key insight behind modular exponentiation.",
      hints: [
        "Apply the property: (a \\times b) mod m = ((a mod m) \\times (b mod m)) mod m.",
        "Keep intermediate results small by taking mod after each multiplication.",
      ],
    },
    {
      id: "q-nt-power-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Matrix exponentiation uses the same binary exponentiation principle as scalar exponentiation.",
      correctAnswer: "true",
      explanation:
        "First, let's recall that binary exponentiation relies on the associativity of multiplication.\n\nFor scalars: (a \\times b) \\times c = a \\times (b \\times c)\nFor matrices: (A \\times B) \\times C = A \\times (B \\times C)\n\n**Step 1**: Binary exponentiation splits the power:\na^{13} = a^8 \\times a^4 \\times a^1\n\n**Step 2**: This works because multiplication is associative:\na^{2 \\times 4} = (a^4)^2 = a^4 \\times a^4\n\n**Step 3**: Matrix multiplication is also associative, so the same splitting works:\nA^{13} = A^8 \\times A^4 \\times A^1\n\n**Therefore**, matrix exponentiation uses the same binary exponentiation principle because matrix multiplication is associative.",
      hints: [
        "Binary exponentiation requires associativity of the multiplication operation.",
        "Matrix multiplication is associative: (AB)C = A(BC).",
      ],
    },
  ],

  // ── DIVIDE & CONQUER ──────────────────────────────────────────────────
  "binary-search-divide": [
    {
      id: "q-dc-binary-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of binary search on a sorted array?",
      options: ["$O(n)$", "$O(\\log n)$", "$O(n \\log n)$", "$O(1)$"],
      correctAnswer: 1,
      explanation:
        "Binary search follows a divide-and-conquer pattern:\n\n1. Compare target with middle element\n2. If equal, found\n3. If target < middle, search left half\n4. If target > middle, search right half\n\nAt each step, the search space is halved:\n$$T(n) = T(n/2) + O(1) \\Rightarrow T(n) = O(\\log n)$$\n\nFor an array of size $n = 2^k$, exactly $k$ comparisons are needed.",
      hints: [
        "Search space reduces by half each step.",
        "The recurrence is $T(n) = T(n/2) + O(1)$.",
      ],
    },
    {
      id: "q-dc-binary-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a rotated sorted array $[4, 5, 6, 7, 0, 1, 2]$, what is the minimum element?",
      options: ["0", "1", "4", "7"],
      correctAnswer: 0,
      explanation:
        "A rotated sorted array is a sorted array that has been \"rotated\" by some offset. The minimum element is the **pivot point** where the rotation occurred.\n\nIn this array:\n- The sorted original was $[0, 1, 2, 4, 5, 6, 7]$\n- After rotation, the smallest element ($0$) ends up at position $4$\n\nThe minimum is **0** because it is where the sorted order \"wraps around.\"",
      hints: [
        "Look for the point where the sequence breaks (stops being increasing).",
        "The pivot is the smallest element in the rotated array.",
      ],
    },
    {
      id: "q-dc-binary-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Binary search can be implemented iteratively with $O(1)$ space complexity.",
      correctAnswer: "true",
      explanation:
        "**Iterative implementation** uses only three pointers:\n- $\\text{left}$: start index\n- $\\text{right}$: end index\n- $\\text{mid} = \\lfloor(\\text{left} + \\text{right})/2\\rfloor$\n\nEach iteration updates only the pointers, requiring **constant extra space** $O(1)$.\n\n**Recursive implementation** uses $O(\\log n)$ space due to the call stack depth.",
      hints: [
        "Loop-based (iterative) approach needs no extra space beyond the pointers.",
        "Recursive version uses the call stack proportional to the number of recursive calls.",
      ],
    },
    {
      id: "q-dc-binary-4",
      type: "coding",
      difficulty: "medium",
      question:
        "Implement binary search to find target in a rotated sorted array.",
      codeSnippet: `function searchRotated(nums: number[], target: number): number {
  // Returns index of target, or -1 if not found
}`,
      correctAnswer: 0,
      explanation:
        "Modified binary search: at each step, determine which half is sorted, then check if target lies in that half.\n\n\[\n\\begin{align}\n\\text{mid} &= (\\text{left} + \\text{right}) / 2\\\[5pt]\n\\text{If } \\text{nums}[\\text{left}] &\\leq \\text{nums}[\\text{mid}]:\\n&\\quad \\text{left half is sorted}\\n&\\quad \\text{check if target } \\in [\\text{nums}[\\text{left}], \\text{nums}[\\text{mid}]]\\n\\text{Else}:\\n&\\quad \\text{right half is sorted}\\n&\\quad \\text{check if target } \\in (\\text{nums}[\\text{mid}], \\text{nums}[\\text{right}]]\n\\end{align}$$",
      hints: [
        "At each step, check which half $[\\text{left}, \\text{mid}]$ or $[\\text{mid}, \\text{right}]$ is normally sorted.",
        "Compare target with the boundaries of the sorted half to decide which half to search.",
      ],
    },
    {
      id: "q-dc-binary-5",
      type: "true-false",
      difficulty: "easy",
      question: "Binary search requires the input array to be sorted.",
      correctAnswer: "true",
      explanation:
        "Binary search relies on the sorted order to decide whether to search the left or right half after each comparison.\n\nIf the array is unsorted, the decision rule $\\text{target} < \\text{mid}$ \\Rightarrow \\text{search left}$ is invalid.",
      hints: [
        "Why do we eliminate half the search space each step?",
        "That elimination is only valid when the array is sorted.",
      ],
    },
    {
      id: "q-dc-binary-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When using binary search to find the first element satisfying a monotone predicate $P$, the loop invariant is:",
      options: [
        "$P(\\text{left} - 1)$ is false and $P(\\text{right} + 1)$ is true",
        "$P(\\text{mid})$ is always true",
        "The target is always at $\\text{mid}$",
        "$P(\\text{left})$ equals $P(\\text{right})$",
      ],
      correctAnswer: 0,
      explanation:
        "The invariant keeps the answer in $[\\text{left}, \\text{right}]$:\n\n\n\\begin{align}\nP(\\text{left} - 1) &= \\text{false} \\quad (\\text{everything before left fails})\\\[5pt]\nP(\\text{right} + 1) &= \\text{true} \\quad (\\text{everything after right succeeds})\n\\end{align}$$\n\nEach mid-point check narrows the interval until $\\text{left} = \\text{right}$, which is the answer.",
      hints: [
        "Think of the array as FFFF...TTTT. The answer is the first T.",
        "The invariant ensures $[\\text{left}, \\text{right}]$ always contains the first T.",
      ],
    },
  ],

  "merge-sort-divide": [
    {
      id: "q-dc-merge-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the time complexity of merge sort?",
      options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(\\log n)$"],
      correctAnswer: 1,
      explanation:
        "Merge sort follows a divide-and-conquer pattern:\n\n1. **Divide**: Split array into two halves: $T(n) = 2T(n/2)$\n2. **Conquer**: Recursively sort each half\n3. **Combine**: Merge the two sorted halves in $O(n)$\n\nThe recurrence relation is:\n$$T(n) = 2T(n/2) + O(n)$$\n\nBy the Master Theorem (case 2), this gives $T(n) = O(n \\log n)$.\n\nAt each of the $\\log n$ levels, we process all $n$ elements during the merge step.",
      hints: [
        "Divide into single elements, then merge back up.",
        "Each level (divide + merge) processes all $n$ elements, and there are $\\log n$ levels.",
      ],
    },
    {
      id: "q-dc-merge-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An inversion in an array is defined as a pair $(i, j)$ where:",
      options: [
        "$i < j$ and $\\text{arr}[i] > \\text{arr}[j]$",
        "$i < j$ and $\\text{arr}[i] < \\text{arr}[j]$",
        "$i > j$ and $\\text{arr}[i] > \\text{arr}[j]$",
        "$i = j$ and $\\text{arr}[i] > \\text{arr}[j]$",
      ],
      correctAnswer: 0,
      explanation:
        "An **inversion** counts pairs of elements that are **out of order** relative to each other:\n\n$$\\text{inversion} = (i, j) \\text{ where } i < j \\text{ and } \\text{arr}[i] > \\text{arr}[j]$$\n\nExample: In $[3, 1, 2]$, the inversions are $(3, 1)$ and $(3, 2)$ because $3 > 1$ and $3 > 2$.\n\nMerge sort can count inversions in $O(n \\log n)$ because during the merge step, when an element from the right half is placed before an element from the left half, we count all remaining elements in the left half as inversions.",
      hints: [
        "Inversion means the earlier element is larger than the later element.",
        "$i < j$ but $\\text{arr}[i] > \\text{arr}[j]$.",
      ],
    },
    {
      id: "q-dc-merge-3",
      type: "true-false",
      difficulty: "easy",
      question: "Merge sort is a stable sorting algorithm.",
      correctAnswer: "true",
      explanation:
        "Merge sort is **stable** because during the merge step, when we have equal elements from both halves, we always take the element from the **left half first**:\n\n\n\\begin{align}\n\\text{Merge}(L, R):\\n&\\text{while } L \\text{ and } R \\text{ not empty:}\\\[5pt]\n&\\quad \\text{if } L[0] \\leq R[0]: \\text{ take from } L\\n&\\quad \\text{else}: \\text{ take from } R\n\\end{align}$$\n\nThe $\\leq$ comparison ensures that equal elements from the left subarray are placed before those from the right, preserving their original relative order.",
      hints: [
        "Equal elements maintain their original relative order.",
        "When both halves have equal elements, take from the left half first to maintain stability.",
      ],
    },
    {
      id: "q-dc-merge-4",
      type: "coding",
      difficulty: "medium",
      question: "Implement merge sort that counts the number of inversions.",
      codeSnippet: `function mergeSortCount(arr: number[]): { sorted: number[], inversions: number } {
  // Return sorted array and inversion count
}`,
      correctAnswer: 0,
      explanation:
        "During the merge step, when we take an element from the right half before an element from the left half, all remaining elements in the left half form inversions with that element:\n\n\n\\begin{align}\n\\text{while merging:}\\\[5pt]\n&\\text{if } L[i] \\leq R[j]:\\n&\\quad \\text{take } L[i]\\n&\\text{else}:\\n&\\quad \\text{take } R[j]\\n&\\quad \\text{inversions += remaining elements in } L\\n&\\quad (L[i...end] \\text{ are all > } R[j])\n\\end{align}$$",
      hints: [
        "Count inversions when the left element is greater than the right element during merge.",
        "When you take from the right half, add the count of remaining left elements to the inversion total.",
        "Inversions = remaining left elements when right element is smaller.",
      ],
    },
    {
      id: "q-dc-merge-5",
      type: "true-false",
      difficulty: "hard",
      question: "The merge sort algorithm requires $O(n)$ auxiliary space for the merge step.",
      correctAnswer: "true",
      explanation:
        "During the merge step, we combine two sorted halves into a single sorted array.\n\nWe cannot merge in-place efficiently (in-place merge runs in $O(n \\log n)$ time or requires complex logic), so the standard implementation uses an auxiliary buffer of size $n$.\n\n$$\\text{Space: } O(n) \\text{ for the auxiliary array} + O(\\log n) \\text{ for the call stack}$$",
      hints: [
        "Where do merged elements go before they are written back?",
        "Two sorted halves need a temporary buffer during merge.",
      ],
    },
  ],

  "quick-sort-divide": [
    {
      id: "q-dc-quick-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the average time complexity of quicksort?",
      options: ["O(n)", "O(n log n)", "O(n\\^2)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Average case: pivot divides array roughly in half each recursion, giving O(n log n) average time.",
      hints: ["Depends on pivot selection", "Average case divides evenly"],
    },
    {
      id: "q-dc-quick-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which pivot selection strategy gives O(n log n) worst-case for quicksort?",
      options: [
        "Always pick first element",
        "Always pick last element",
        "Random pivot",
        "Median-of-three",
      ],
      correctAnswer: 3,
      explanation:
        "Median-of-three (first, middle, last) reduces chance of worst-case by avoiding sorted order issues.",
      hints: [
        "First/last can degrade with sorted input",
        "Random also works well in practice",
      ],
    },
    {
      id: "q-dc-quick-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Quicksort is not stable because partition step can change relative order of equal elements.",
      correctAnswer: "true",
      explanation:
        "During partition, elements are moved around based on comparison with pivot, potentially reorder equal elements.",
      hints: [
        "Stability requires equal elements stay in order",
        "In-place partition reorders elements",
      ],
    },
    {
      id: "q-dc-quick-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does random pivot help quicksort avoid worst-case on adversarial input?",
      options: [
        "Random is faster",
        "Random makes input order irrelevant",
        "Random reduces recursion depth",
        "Random is required by algorithm",
      ],
      correctAnswer: 1,
      explanation:
        "An adversary cannot predict the random pivot, preventing them from constructing worst-case inputs that always pick min/max.",
      hints: [
        "Adversary needs to know pivot in advance",
        "Randomness breaks input patterns",
      ],
    },
  ],

  "strassen-algorithm": [
    {
      id: "q-dc-strassen-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of Strassen matrix multiplication?",
      options: ["O(n\\^2)", "O(n^2.81)", "O(n\\^3)", "O(n log n)"],
      correctAnswer: 1,
      explanation:
        "Strassen achieves O(n^2.81) by reducing 8 multiplications to 7 via the Strassen formulas.",
      hints: [
        "Uses divide and conquer on matrices",
        "Reduces multiplication count from 8 to 7",
      ],
    },
    {
      id: "q-dc-strassen-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "Strassen algorithm uses 7 multiplications instead of 8 to multiply two 2x2 matrices.",
      correctAnswer: "true",
      explanation:
        "The key insight: compute 7 products (P1-P7) instead of 8, then combine them to get the result matrix entries.",
      hints: [
        "Standard uses 8 products",
        "Strassen reduces by 1 multiplication",
      ],
    },
    {
      id: "q-dc-strassen-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What trade-off does Strassen algorithm make compared to standard matrix multiplication?",
      options: [
        "More space for less time",
        "Less space for more time",
        "More additions but fewer multiplications",
        "Less numerical stability",
      ],
      correctAnswer: 2,
      explanation:
        "Strassen trades more addition/subtraction operations for fewer multiplication operations, since multiplication is more expensive.",
      hints: [
        "Multiplications are the expensive operation",
        "Adds/subtracts are cheaper",
      ],
    },
    {
      id: "q-dc-strassen-4",
      type: "true-false",
      difficulty: "easy",
      question: "Standard matrix multiplication of two $n \\times n$ matrices runs in $O(n^3)$ time.",
      correctAnswer: "true",
      explanation:
        "For each of the $n^2$ entries in the result matrix, we compute a dot product of two length-$n$ vectors:\n\n$$n^2 \\times n = n^3 \\text{ multiplications and additions}$$\n\nStrassen's algorithm improves on this with $O(n^{\\log_2 7}) \\approx O(n^{2.81})$.",
      hints: [
        "How many entries does the result matrix have?",
        "Each entry requires a dot product of two $n$-element vectors.",
      ],
    },
  ],

  "closest-pair": [
    {
      id: "q-dc-closest-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of the closest pair algorithm using divide and conquer?",
      options: ["O(n)", "O(n log n)", "O(n\\^2)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Divide and conquer for closest pair: sort by x-coordinate O(n log n), then recursively find closest pair in O(n log n).",
      hints: ["Sorting step dominates", "Divide and conquer handles the rest"],
    },
    {
      id: "q-dc-closest-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the divide step of closest pair, the recursive calls handle:",
      options: [
        "Left half only",
        "Right half only",
        "Both halves independently",
        "Strip region only",
      ],
      correctAnswer: 2,
      explanation:
        "After dividing, we find closest pairs in left and right halves independently, then combine to find cross-strip pairs.",
      hints: ["Each half is solved recursively", "Then combine the results"],
    },
    {
      id: "q-dc-closest-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "When checking the strip region for closer pairs, we only need to examine points within delta distance of the dividing line.",
      correctAnswer: "true",
      explanation:
        "If a pair has distance < delta, both points must be within delta of the dividing line in the strip region.",
      hints: [
        "Delta = minimum of left and right closest pairs",
        "Points must be close to the dividing line",
      ],
    },
    {
      id: "q-dc-closest-4",
      type: "true-false",
      difficulty: "easy",
      question: "The brute-force algorithm for finding the closest pair of points in a 2D plane runs in $O(n^2)$ time.",
      correctAnswer: "true",
      explanation:
        "The brute-force approach checks every pair of points:\n\n$$\\binom{n}{2} = \\frac{n(n-1)}{2} = O(n^2) \\text{ pairs}$$\n\nFor each pair, distance is computed in $O(1)$. The divide and conquer approach achieves $O(n \\log n)$.",
      hints: [
        "How many pairs of $n$ points are there?",
        "Each pair requires a constant-time distance calculation.",
      ],
    },
    {
      id: "q-dc-closest-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In the closest pair algorithm, after finding minimum distance $\\delta$ in each half, we check the strip of width $2\\delta$ around the dividing line. Within this strip, how many points does each point need to be compared with?",
      options: ["$O(n)$", "$O(\\log n)$", "At most 7", "At most $\\sqrt{n}$"],
      correctAnswer: 2,
      explanation:
        "Within the strip, points are sorted by $y$-coordinate. For any point $p$, only points within $\\delta$ in the $y$ direction could be closer than $\\delta$.\n\nBy a packing argument, at most 7 other points can lie in this $2\\delta \\times \\delta$ rectangle. So each point is compared with at most 7 others, giving $O(n)$ total for the strip check.",
      hints: [
        "Pack $\\delta$-separated points in a $2\\delta \\times \\delta$ rectangle.",
        "How many can fit with minimum inter-point distance $\\delta$?",
      ],
    },
  ],

  "majority-element": [
    {
      id: "q-dc-majority-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of Boyer-Moore majority vote algorithm?",
      options: ["O(n)", "O(n log n)", "O(n\\^2)", "O(1) extra space"],
      correctAnswer: 0,
      explanation:
        "Boyer-Moore runs in O(n) time and O(1) space, making it optimal for finding majority elements.",
      hints: ["Single pass with counter", "Only O(1) additional space"],
    },
    {
      id: "q-dc-majority-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Boyer-Moore algorithm finds an element appearing more than:",
      options: ["25%", "33%", "50%", "75%"],
      correctAnswer: 2,
      explanation:
        "By definition, a majority element appears more than n/2 times (strictly more than 50%).",
      hints: ["More than half", "Not just plurality but majority"],
    },
    {
      id: "q-dc-majority-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "The candidate returned by Boyer-Moore is always the majority element if one exists.",
      correctAnswer: "true",
      explanation:
        "The algorithm guarantees the candidate is the majority element if one exists, due to the cancellation property.",
      hints: [
        "Candidate survives all cancellations",
        "Must verify count in second pass",
      ],
    },
    {
      id: "q-dc-majority-4",
      type: "coding",
      difficulty: "easy",
      question:
        "Implement Boyer-Moore majority vote to find the majority element.",
      codeSnippet: `function majorityElement(nums: number[]): number {
  // Returns the majority element (guaranteed to exist)
}`,
      correctAnswer: 0,
      explanation:
        "Phase 1: candidate selection with cancellation. Phase 2: verification pass to confirm candidate count > n/2.",
      hints: [
        "Keep candidate and counter",
        "Cancel pairs of different elements",
      ],
    },
    {
      id: "q-dc-majority-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To find all elements appearing more than $\\lfloor n/3 \\rfloor$ times (at most 2 such elements), the Boyer-Moore approach uses:",
      options: [
        "One candidate and counter",
        "Two candidates and two counters",
        "A hash map",
        "Sorting first",
      ],
      correctAnswer: 1,
      explanation:
        "There can be at most 2 elements appearing more than $n/3$ times.\n\nExtended Boyer-Moore maintains two candidate-counter pairs $(c_1, k_1)$ and $(c_2, k_2)$:\n- Increment matching counter\n- If different from both candidates and both counters are non-zero, decrement both\n- Otherwise set as new candidate\n\nA verification pass confirms which candidates actually exceed $n/3$.",
      hints: [
        "How many elements can appear more than $n/3$ times?",
        "Generalize Boyer-Moore to maintain two candidates.",
      ],
    },
  ],

  "median-search": [
    {
      id: "q-dc-median-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of finding the median of two sorted arrays?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
      correctAnswer: 2,
      explanation:
        "Using binary search on the smaller array, we can find median in O(log n) time.",
      hints: [
        "Binary search on one array",
        "Eliminate half of remaining elements each step",
      ],
    },
    {
      id: "q-dc-median-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When finding median of [1,3,5] and [2,4,6], what is the combined median?",
      options: ["2.5", "3", "3.5", "4"],
      correctAnswer: 2,
      explanation:
        "Combined sorted array is [1,2,3,4,5,6]. Median of 6 elements = average of 3rd and 4th elements = (3+4)/2 = 3.5.",
      hints: [
        "6 elements, median is avg of 3rd and 4th",
        "Merged array: 1,2,3,4,5,6",
      ],
    },
    {
      id: "q-dc-median-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "We can binary search on either array to find median of two sorted arrays.",
      correctAnswer: "true",
      explanation:
        "We binary search on the shorter array to reduce search space faster, but mathematically either works.",
      hints: [
        "Usually search on shorter array",
        "Both approaches yield O(log n)",
      ],
    },
    {
      id: "q-dc-median-4",
      type: "true-false",
      difficulty: "easy",
      question: "For a single sorted array of odd length $n$, the median is the element at index $\\lfloor n/2 \\rfloor$.",
      correctAnswer: "true",
      explanation:
        "For a sorted array of odd length $n$, the median is the middle element at index $\\lfloor n/2 \\rfloor$ (0-indexed).\n\nExample: $[1, 3, 5, 7, 9]$ has $n = 5$, median at index $2$ is $5$.\n\nFor even $n$, the median is the average of elements at indices $n/2 - 1$ and $n/2$.",
      hints: [
        "For $n = 5$: positions 0, 1, 2, 3, 4. The middle is index 2.",
        "$\\lfloor n / 2 \\rfloor$ gives the center index for odd $n$.",
      ],
    },
    {
      id: "q-dc-median-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When finding the median of two sorted arrays $A$ (size $m$) and $B$ (size $n$), we binary search on the smaller array to partition. If we place $i$ elements from $A$ in the left half, how many do we take from $B$?",
      options: [
        "$n - i$",
        "$(m + n) / 2 - i$",
        "$m - i$",
        "$(m + n + 1) / 2 - i$",
      ],
      correctAnswer: 3,
      explanation:
        "The total left partition size is $\\lfloor (m + n + 1) / 2 \\rfloor$.\n\nIf we take $i$ elements from $A$, we take $j = \\lfloor (m + n + 1) / 2 \\rfloor - i$ from $B$.\n\nThe $+1$ handles both odd and even total lengths uniformly.",
      hints: [
        "Total elements in the left half: $\\lfloor (m + n + 1) / 2 \\rfloor$.",
        "Subtract the $i$ from $A$ to get the count from $B$.",
      ],
    },
  ],

  "exponentiation-divide": [
    {
      id: "q-dc-exp-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of fast exponentiation (exponentiation by squaring)?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Fast exponentiation halves the exponent each step, giving O(log n) multiplications.",
      hints: [
        "Exponent reduces by half each step",
        "Logarithmic number of steps",
      ],
    },
    {
      id: "q-dc-exp-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In fast exponentiation, when exponent is even, we:",
      options: [
        "Multiply base by 2",
        "Square the base and halve the exponent",
        "Decrement the exponent",
        "Double the result",
      ],
      correctAnswer: 1,
      explanation:
        "When n is even: a^n = (a^(n/2))^2. Square the result of recursive call on n/2.",
      hints: [
        "Even case: square and halve",
        "Odd case: multiply by base and decrement",
      ],
    },
    {
      id: "q-dc-exp-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Fast exponentiation can be implemented recursively or iteratively.",
      correctAnswer: "true",
      explanation:
        "Recursive: divide and conquer. Iterative: use binary representation of exponent to process bits.",
      hints: [
        "Recursive is natural divide and conquer",
        "Iterative uses bit manipulation",
      ],
    },
    {
      id: "q-dc-exp-4",
      type: "coding",
      difficulty: "easy",
      question: "Implement fast exponentiation (a^b mod m) efficiently.",
      codeSnippet: `function powMod(a: number, b: number, m: number): number {
  // Return a^b mod m
}`,
      correctAnswer: 0,
      explanation:
        "Use exponentiation by squaring: if b is even, pow(a,b) = pow(a*a % m, b/2); if odd, result = a * pow(a, b-1) % m.",
      hints: ["Square and halve when even", "Multiply by base when odd"],
    },
    {
      id: "q-dc-exp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using fast exponentiation, how many multiplications are needed to compute $a^{31}$?",
      options: ["5", "6", "8", "31"],
      correctAnswer: 1,
      explanation:
        "Using the binary of $31 = 11111_2$, we need:\n- 4 squarings: $a \\to a^2 \\to a^4 \\to a^8 \\to a^{16}$\n- 5 multiplications by $a$ for each set bit: $a^1, a^3, a^7, a^{15}, a^{31}$\n\nAlternatively, using repeated squaring with the right-to-left method: $31 = 16 + 8 + 4 + 2 + 1$, requiring 4 squarings and 4 extra multiplies for a total of 8. The addition chain method finds 6 as the optimal count.",
      hints: [
        "Express 31 in binary: $11111_2$.",
        "Count squarings and multiplications separately in the binary method.",
      ],
    },
    {
      id: "q-dc-exp-6",
      type: "true-false",
      difficulty: "hard",
      question: "Matrix exponentiation using fast exponentiation can compute the $n$-th Fibonacci number in $O(\\log n)$ time.",
      correctAnswer: "true",
      explanation:
        "The Fibonacci recurrence can be written as a matrix equation:\n\n\n\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$$\n\nUsing fast (binary) exponentiation on the $2 \\times 2$ matrix:\n- Each matrix multiplication: $O(1)$ (fixed size)\n- Number of multiplications: $O(\\log n)$\n\nTotal: $O(\\log n)$.",
      hints: [
        "Express the Fibonacci recurrence as matrix multiplication.",
        "Apply binary exponentiation to compute the $n$-th power of the matrix.",
      ],
    },
  ],

  "karatsuba-multiplication": [
    {
      id: "q-dc-karatsuba-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of Karatsuba integer multiplication?",
      options: ["O(n)", "O(n log 3)", "O(n\\^2)", "O(n^2.81)"],
      correctAnswer: 1,
      explanation:
        "Karatsuba achieves O(n^log2(3)) \\approx O(n^1.585) by reducing 4 multiplications to 3.",
      hints: ["log2(3) \\approx 1.585", "Reduces multiplication count from 4 to 3"],
    },
    {
      id: "q-dc-karatsuba-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Karatsuba reduces the number of recursive multiplications from 4 to:",
      options: ["2", "3", "5", "1"],
      correctAnswer: 1,
      explanation:
        "The key insight: compute 3 products (z0, z1, z2) instead of 4 for two-digit multiplication, then combine.",
      hints: ["Standard: 4 multiplications", "Karatsuba: 3 multiplications"],
    },
    {
      id: "q-dc-karatsuba-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "For small numbers, standard multiplication is faster than Karatsuba due to overhead.",
      correctAnswer: "true",
      explanation:
        "Karatsuba has significant overhead from recursive calls and additions. Below a threshold (often ~16-64 bits), naive multiplication wins.",
      hints: [
        "Overhead of recursion and addition",
        "Threshold varies by implementation",
      ],
    },
    {
      id: "q-dc-karatsuba-4",
      type: "true-false",
      difficulty: "easy",
      question: "Standard long multiplication of two $n$-digit numbers requires $O(n^2)$ digit multiplications.",
      correctAnswer: "true",
      explanation:
        "In long multiplication, each digit of the first number is multiplied by each digit of the second:\n\n$$n \\times n = n^2 \\text{ single-digit multiplications}$$\n\nKaratsuba reduces this to $O(n^{\\log_2 3}) \\approx O(n^{1.585})$ using a clever divide-and-conquer approach.",
      hints: [
        "How many digits does each number have?",
        "Each digit of the first must multiply each digit of the second.",
      ],
    },
  ],

  "dp-divide-optimize": [
    {
      id: "q-dc-dpopt-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the divide and conquer DP optimization condition?",
      options: [
        "Monotonicity",
        "Convexity",
        "Quadrangle inequality",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "Divide and conquer DP applies when the optimal decision boundary exhibits monotonicity/quadrangle inequality/convexity.",
      hints: ["opt[i][j] <= opt[i][j+1]", "Also called monotone matrix chain"],
    },
    {
      id: "q-dc-dpopt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Divide and conquer DP reduces complexity from O(n^2k) to:",
      options: ["O(nk)", "O(n log n)", "O(kn log n)", "O(n\\^2)"],
      correctAnswer: 2,
      explanation:
        "With divide and conquer optimization, DP transitions are computed in O(kn log n) instead of O(kn^2).",
      hints: ["Uses monotonicity of opt", "Log factor from divide and conquer"],
    },
    {
      id: "q-dc-dpopt-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Knuth optimization requires the quadrangle inequality and monotonicity conditions.",
      correctAnswer: "true",
      explanation:
        "Knuth optimization applies when opt[i][j-1] <= opt[i][j] <= opt[i+1][j], reducing DP from O(n\\^2) to O(n log n).",
      hints: [
        "Special case of divide and conquer",
        "Both conditions must hold",
      ],
    },
    {
      id: "q-dc-dpopt-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which problem benefits from divide and conquer DP optimization?",
      options: [
        "0/1 Knapsack",
        "Edit Distance",
        "Optimal BST",
        "Longest Common Subsequence",
      ],
      correctAnswer: 2,
      explanation:
        "Optimal Binary Search Tree (OBST) satisfies the quadrangle inequality, allowing divide and conquer optimization.",
      hints: [
        "DP[i][j] = DP[i][k-1] + DP[k+1][j] + weight",
        "Weight function must be convex",
      ],
    },
    {
      id: "q-dc-dpopt-5",
      type: "true-false",
      difficulty: "easy",
      question: "The divide and conquer DP optimization applies when the optimal split point $\\text{opt}(i, j)$ is monotone in $j$.",
      correctAnswer: "true",
      explanation:
        "When $\\text{opt}(i, j) \\leq \\text{opt}(i, j+1)$ (monotonicity), the divide and conquer approach works:\n\n- Compute $\\text{opt}$ for the midpoint $\\text{mid}$ of $[l, r]$\n- Left half: restrict $\\text{opt}$ search to $[\\text{opt}_L, \\text{opt}(\\text{mid})]$\n- Right half: restrict to $[\\text{opt}(\\text{mid}), \\text{opt}_R]$\n\nThis reduces the overall cost from $O(n^2)$ to $O(n \\log n)$ per DP layer.",
      hints: [
        "Monotonicity means the optimal split never decreases as $j$ increases.",
        "This allows each half to search a restricted range.",
      ],
    },
    {
      id: "q-dc-dpopt-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Knuth-Yao speedup reduces the complexity of the optimal BST problem from $O(n^3)$ to:",
      options: ["$O(n \\log n)$", "$O(n^2)$", "$O(n^2 \\log n)$", "$O(n)$"],
      correctAnswer: 1,
      explanation:
        "The Knuth-Yao optimization for interval DP (including optimal BST) uses the monotonicity of the optimal split point:\n\n$$\\text{opt}(i, j-1) \\leq \\text{opt}(i, j) \\leq \\text{opt}(i+1, j)$$\n\nThis restricts the inner loop search, reducing the total transitions from $O(n^3)$ to $O(n^2)$.",
      hints: [
        "The standard interval DP is $O(n^3)$ for each pair $(i, j)$.",
        "Monotonicity of the optimal split bounds the search range.",
      ],
    },
  ],

  // Bit Manipulation
  "bit-operators": [
    {
      id: "q-bit-ops-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the result of $5 \\; \\& \\; 3$ (bitwise AND) in binary?",
      options: [
        "$101 \\; \\& \\; 011 = 001_2 \\; (1)$",
        "$101 \\; \\& \\; 011 = 111_2 \\; (7)$",
        "$101 \\; \\& \\; 011 = 110_2 \\; (6)$",
        "$101 \\; \\& \\; 011 = 100_2 \\; (4)$",
      ],
      correctAnswer: 0,
      explanation:
        "In binary:\n\[\n\\begin{align}\n5 &= 101_2\\\\\n3 &= 011_2\\\\\n\\hline\n5 \\; \\& \\; 3 &= 001_2 = 1\n\\end{align}$$\n\nBit-by-bit AND: $1\\&1=1$, $0\\&1=0$, $1\\&0=0$.",
      hints: [
        "Write both numbers in binary with aligned bits.",
        "AND produces 1 only when both bits are 1.",
      ],
    },
    {
      id: "q-bit-ops-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the result of $a \\; \\text{XOR} \\; a$ (XOR of identical values)?",
      options: [
        "Returns 1",
        "Returns 0",
        "Returns the same bit",
        "Causes an overflow",
      ],
      correctAnswer: 1,
      explanation:
        "XOR (exclusive OR) truth table:\n\[\n\\begin{array}{c|c|c}\\na & b & a \\oplus b\\\\\\hline\n0 & 0 & 0\\\\\n0 & 1 & 1\\\\\n1 & 0 & 1\\\\\n1 & 1 & 0\n\\end{array}$$\n\nWhen both inputs are identical ($a \\oplus a$):\n$$a \\oplus a = 0 \\quad \\text{(for any bit)}$$\n\nXOR returns 1 only when bits differ, and 0 when they are the same.",
      hints: [
        "XOR returns 1 only when bits are different.",
        "When identical bits XOR, they cancel out to 0.",
      ],
    },
    {
      id: "q-bit-ops-3",
      type: "true-false",
      difficulty: "easy",
      question: "In JavaScript (and most languages using two's complement), $\\sim 5$ evaluates to $-6$.",
      correctAnswer: "true",
      explanation:
        "The bitwise NOT operator $\\sim$ computes the **one's complement** (invert all bits).\n\nFor a 32-bit integer:\n\[\n\\begin{align}\n5 &\\text{ (in binary)} = 0000\\;0000\\;0000\\;0000\\;0000\\;0000\\;0000\\;0101\\\[5pt]\n\\sim 5 &\\text{ (invert all bits)} = 1111\\;1111\\;1111\\;1111\\;1111\\;1111\\;1111\\;1010\\\\\n     &\\text{ (two's complement)} = -6\n\\end{align}$$\n\n**Identity**: $\\sim x = -(x + 1)$",
      hints: [
        "~ is bitwise NOT (one's complement).",
        "In two's complement representation, inverting all bits of 5 gives -6.",
      ],
    },
    {
      id: "q-bit-ops-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is $1 \\ll 3$ (left shift by 3 bits)?",
      options: ["3", "8", "16", "4"],
      correctAnswer: 1,
      explanation:
        "Left shift by $n$ bits multiplies by $2^n$:\n$$1 \\ll 3 = 1 \\times 2^3 = 8$$\n\nIn binary:\n\[\n\\begin{align}\n1 &\\text{ (binary)} = 0001_2\\\\\n1 \\ll 3 &\\text{ (shifted)} = 1000_2 = 8\n\\end{align}$$\n\nZeros shift in from the right; the leftmost bits are discarded.",
      hints: [
        "Left shift multiplies by $2^n$ where $n$ is the shift amount.",
        "$1 \\ll 3 = 1 \\times 2^3 = 8$.",
      ],
    },
    {
      id: "q-bit-ops-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is $0xFF \\ll 8$ in decimal?",
      options: ["255", "65280", "65535", "4096"],
      correctAnswer: 1,
      explanation:
        "First, $0xFF$ in decimal is:\n$$0xFF = 15 \\times 16 + 15 = 240 + 15 = 255$$\n\nLeft shift by 8 bits multiplies by $2^8 = 256$:\n$$0xFF \\ll 8 = 255 \\times 256 = 65280$$\n\nIn binary: $1111\\;1111_2 \\ll 8 = 1111\\;1111\\;0000\\;0000_2$.",
      hints: [
        "$0xFF = 255$ in decimal.",
        "Left shift by 8 multiplies by $2^8 = 256$.",
      ],
    },
    {
      id: "q-bit-ops-6",
      type: "true-false",
      difficulty: "medium",
      question:
        "XOR can be used to swap two numbers without a temporary variable.",
      correctAnswer: "true",
      explanation:
        "XOR swap works using three XOR operations:\n\n\n\\begin{align}\na &= a \\oplus b \\quad &(\\text{now } a \\text{ holds } a \\oplus b)\\\[5pt]\nb &= a \\oplus b \\quad &(\\text{now } b = (a \\oplus b) \\oplus b = a)\\\\\na &= a \\oplus b \\quad &(\\text{now } a = (a \\oplus b) \\oplus a = b)\n\\end{align}$$\n\n**Caution**: This fails if $a$ and $b$ point to the same memory location (e.g., `swap(x, x)` gives 0).",
      hints: [
        "Three XOR operations in sequence: $a = a \\oplus b$, $b = a \\oplus b$, $a = a \\oplus b$.",
        "All properties of XOR ($a \\oplus a = 0$, $a \\oplus 0 = a$, commutativity, associativity) make this work.",
      ],
    },
    {
      id: "q-bit-ops-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which expression efficiently computes the number of set bits in $n$ using bit manipulation (Brian Kernighan's algorithm)?",
      options: [
        "Count iterations of $n \\mathbin{\\&}= (n - 1)$ until $n = 0$",
        "Shift right until $n = 0$, counting 1-bits",
        "Count until $n \\mathbin{|} (n - 1) = 0$",
        "XOR $n$ with $n - 1$ repeatedly",
      ],
      correctAnswer: 0,
      explanation:
        "Brian Kernighan's algorithm uses the fact that $n \\; \[5pt]& \\; (n-1)$ **clears the lowest set bit** each iteration:\n\n\n\\begin{align}\nn = 12 &= 1100_2\\\[5pt]\nn \\; \[5pt]& \\; 11 &= 1000_2 \\quad \\text{(cleared bit 2)}\\\\\nn \\; \\& \\; 7  &= 0000_2 \\quad \\text{(cleared bit 3)}\n\\end{align}$$\n\nTwo iterations $\\Rightarrow$ two set bits. Time: $O(k)$ where $k$ = number of set bits.",
      hints: [
        "$n \\; \\& \\; (n-1)$ clears the lowest set bit.",
        "Count how many operations until $n$ becomes 0.",
      ],
    },
  ],
  "single-number": [
    {
      id: "q-bit-single-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In an array where every element appears twice except one unique element, the XOR of all elements yields:",
      options: [
        "0",
        "The duplicate value",
        "The unique element",
        "Twice the unique element",
      ],
      correctAnswer: 2,
      explanation:
        "XOR has two key properties:\n\n1. **Identity**: $a \\oplus 0 = a$\n2. **Self-inverse**: $a \\oplus a = 0$\n3. **Commutative and associative**\n\nWhen we XOR all elements:\n$$\\bigoplus_{i=1}^{n} \\text{nums}[i] = (\\underbrace{a \\oplus a}_{\\text{pair}} \\oplus \\cdots \\oplus \\underbrace{b \\oplus b}_{\\text{pair}}) \\oplus \\text{unique}$$\n\nAll pairs cancel to 0, leaving only the unique element.",
      hints: [
        "XOR all elements in the array.",
        "$a \\oplus a = 0$, and $a \\oplus 0 = a$.",
        "Pairs cancel out, leaving only the element that appears once.",
      ],
    },
    {
      id: "q-bit-single-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "For $[2, 3, 2, 4, 3]$, what is the single number?",
      options: ["2", "3", "4", "1"],
      correctAnswer: 2,
      explanation:
        "XOR all elements:\n\n\n\\begin{align}\n2 \\oplus 3 \\oplus 2 \\oplus 4 \\oplus 3\n&= (2 \\oplus 2) \\oplus (3 \\oplus 3) \\oplus 4\\\\\n&= 0 \\oplus 0 \\oplus 4\\\\\n&= 4\n\\end{align}$$\n\nThe element appearing only once is **4**.",
      hints: [
        "Group the pairs: $2 \\oplus 2 = 0$ and $3 \\oplus 3 = 0$.",
        "XOR is commutative and associative, so we can reorder.",
        "The remaining element is the answer.",
      ],
    },
    {
      id: "q-bit-single-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "The XOR trick only works when the duplicate appears exactly twice.",
      correctAnswer: "true",
      explanation:
        "XOR cancels in **pairs**: $a \\oplus a = 0$.\n\nIf an element appears $k$ times, it cancels completely only when $k$ is even:\n- $k = 2$: $a \\oplus a = 0$ ✓\n- $k = 4$: $a \\oplus a \\oplus a \\oplus a = (a \\oplus a) \\oplus (a \\oplus a) = 0 \\oplus 0 = 0$ ✓\n- $k = 3$: $a \\oplus a \\oplus a = a$ ✗ (does not cancel)\n\nSo the XOR trick requires elements to appear an **even number of times** to cancel out.",
      hints: [
        "XOR cancels in pairs: $a \\oplus a = 0$.",
        "If an element appears 4 times, it still cancels: $a \\oplus a \\oplus a \\oplus a = 0$.",
        "The trick requires even count for each duplicated element.",
      ],
    },
    {
      id: "q-bit-single-4",
      type: "coding",
      difficulty: "easy",
      question:
        "Write a function $\\texttt{singleNumber}$ that returns the element appearing exactly once in an array where all others appear twice.",
      options: [],
      correctAnswer: 0,
      explanation:
        "We use an XOR accumulator. XOR is commutative and associative, so order doesn't matter.\n\n```typescript\nfunction singleNumber(nums: number[]): number {\n  let result = 0;\n  for (const num of nums) {\n    result ^= num;  // XOR each element\n  }\n  return result;   // Only the unique element remains\n}\n```\n\nTime: $O(n)$, Space: $O(1)$.",
      hints: [
        "Initialize result to 0 (XOR identity).",
        "XOR is commutative and associative, so order doesn't matter.",
        "Pairs cancel out, leaving only the unique element.",
      ],
    },
    {
      id: "q-bit-single-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In an array where every element appears **three** times except one (which appears once), how do you find the unique element efficiently without using a hash map?",
      options: [
        "XOR all elements",
        "Sum all elements mod 3",
        "Use two bit accumulators tracking bit counts mod 3",
        "Sort and scan",
      ],
      correctAnswer: 2,
      explanation:
        "Standard XOR cancels in pairs ($a \\oplus a = 0$) but not in triples.\n\nUse two integers $\\text{ones}$ and $\\text{twos}$ tracking how many times each bit has appeared mod 3:\n\n\n\\begin{align}\n\\text{ones}  &= \\text{bits seen 1 time mod 3}\\\\\n\\text{twos}  &= \\text{bits seen 2 times mod 3}\n\\end{align}$$\n\nUpdate rule per element $x$:\n1. $\\text{ones} = (\\text{ones} \\oplus x) \\; \\& \\; \\sim\\text{twos}$\n2. $\\text{twos} = (\\text{twos} \\oplus x) \\; \\& \\; \\sim\\text{ones}$\n\nAfter processing, $\\text{ones}$ holds the unique element.",
      hints: [
        "XOR only cancels pairs. You need a counter mod 3 for each bit position.",
        "Maintain $\\text{ones}$ and $\\text{twos}$ to track bit frequencies.",
      ],
    },
  ],
  "power-of-two": [
    {
      id: "q-bit-pow2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of the following is a power of 2?",
      options: ["15", "16", "18", "20"],
      correctAnswer: 1,
      explanation:
        "A power of 2 in binary is a single 1 followed by all zeros:\n\[\n\\begin{align}\n2^0 &= 1 = 1_2\\\\\n2^1 &= 2 = 10_2\\\\\n2^2 &= 4 = 100_2\\\\\n2^3 &= 8 = 1000_2\\\\\n2^4 &= 16 = 10000_2\n\\end{align}$$\n\n$16 = 2^4$ is a power of 2. 15, 18, and 20 have multiple 1-bits in binary.",
      hints: [
        "Powers of 2 have exactly one '1' bit in binary.",
        "Check binary representations: $15 = 1111_2$, $16 = 10000_2$, $18 = 10010_2$, $20 = 10100_2$.",
      ],
    },
    {
      id: "q-bit-pow2-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is $n \\; \\& \\; (n-1)$ for $n = 16$?",
      options: ["0", "16", "32", "8"],
      correctAnswer: 0,
      explanation:
        "The operation $n \\; \[5pt]& \\; (n-1)$ **clears the lowest set bit**.\n\nFor $n = 16 = 10000_2$:\n\[\n\\begin{align}\nn     &= 10000_2\\\\\nn-1   &= 01111_2\\\\\n\\hline\nn\\&(n-1) &= 00000_2 = 0\n\\end{align}$$\n\nThis property is fundamental for many bit manipulation algorithms.",
      hints: [
        "Write $n = 16$ and $n-1 = 15$ in binary.",
        "$n \\; \\& \\; (n-1)$ clears the lowest set bit.",
      ],
    },
    {
      id: "q-bit-pow2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A number $n$ is a power of 2 if and only if:",
      options: [
        "$n \\; \\& \\; (n-1) = n$",
        "$n \\; \\& \\; (n-1) = 0$",
        "$n \\; | \\; (n-1) = n$",
        "$n \\; \\oplus \\; (n-1) = 2n-1$",
      ],
      correctAnswer: 1,
      explanation:
        "A power of 2 has exactly one set bit: $n = 100\\ldots0_2$.\n\nThen $n-1 = 011\\ldots1_2$, so:\n$$n \\; \\& \\; (n-1) = 100\\ldots0_2 \\; \\& \\; 011\\ldots1_2 = 0$$\n\nFor a non-power-of-2 (e.g., $12 = 1100_2$):\n$$12 \\; \\& \\; 11 = 1100_2 \\; \\& \\; 1011_2 = 1000_2 \\neq 0$$",
      hints: [
        "For powers of 2, only the MSB is set.",
        "$n \\; \\& \\; (n-1) = 0$ if and only if $n$ is a power of 2 (and $n > 0$).",
      ],
    },
    {
      id: "q-bit-pow2-4",
      type: "true-false",
      difficulty: "medium",
      question: "0 is a power of 2.",
      correctAnswer: "false",
      explanation:
        "**False**. Zero is NOT a power of 2.\n\nPowers of 2 are: $2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8, \\ldots$\n\nNote that $n > 0$ is a required condition for the $n \\; \\& \\; (n-1) = 0$ check.",
      hints: [
        "Powers of 2 are $1, 2, 4, 8, 16, \\ldots$",
        "The condition $n > 0$ is necessary for the power-of-2 test.",
      ],
    },
    {
      id: "q-bit-pow2-5",
      type: "coding",
      difficulty: "easy",
      question: "Write $\\texttt{isPowerOfTwo}(n)$ that returns $\\texttt{true}$ if $n$ is a power of 2.",
      options: [],
      correctAnswer: 0,
      explanation:
        "A number $n > 0$ is a power of 2 if and only if $n \\; \\& \\; (n-1) = 0$:\n\n```typescript\nfunction isPowerOfTwo(n: number): boolean {\n  return n > 0 && (n & (n - 1)) === 0;\n}\n```\n\nThe $n > 0$ check is essential because for $n = 0$: $0 \\; \\& \\; (-1) = 0$, which would incorrectly return true.",
      hints: [
        "$n > 0$ check is required to exclude $n = 0$.",
        "$n \\; \\& \\; (n-1)$ clears the lowest set bit.",
        "If the result is 0, $n$ was a power of 2.",
      ],
    },
    {
      id: "q-bit-pow2-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which bit operation quickly rounds a positive integer $n$ up to the nearest power of 2?",
      options: [
        "$n \\; \\& \\; (n - 1)$, then add 1",
        "Set all bits below the MSB, then add 1",
        "Use $n \\; | \\; (n - 1)$",
        "$n << 1$",
      ],
      correctAnswer: 1,
      explanation:
        "To round up to the nearest power of 2:\n1. Decrease $n$ by 1\n2. Fill all lower bits: $n |= n >> 1$; $n |= n >> 2$; $n |= n >> 4$; ... $n |= n >> 16$\n3. Add 1\n\nThis creates a mask $0\\ldots0111\\ldots1$, then $+1$ flips to the next power of 2.\n\nExample: $n = 9 = 1001_2 \\to 1111_2 \\to 10000_2 = 16$.",
      hints: [
        "First make all bits below the MSB equal to 1, then add 1.",
        "Fill lower bits with OR-shift operations.",
      ],
    },
  ],
  "bit-counting": [
    {
      id: "q-bit-count-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "How many set bits (1s) are in the binary number $100100_2$?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "The binary number $100100_2$ has 1s at two positions:\n- Position 5: $1 \\times 2^5 = 32$\n- Position 2: $1 \\times 2^2 = 4$\n\nTotal = $1 + 1 = 2$ set bits.",
      hints: [
        "Count the 1s in the binary representation.",
        "$100100_2$ has 1s at positions 5 and 2.",
      ],
    },
    {
      id: "q-bit-count-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What does Brian Kernighan's algorithm compute?",
      options: [
        "Count of set bits",
        "Position of MSB",
        "XOR of all bits",
        "Bit reversal",
      ],
      correctAnswer: 0,
      explanation:
        "Brian Kernighan's algorithm counts the number of set bits (1s) in a binary number.\n\nThe key operation $n \\; \[5pt]& \\; (n-1)$ **clears the lowest set bit**:\n\[\n\\begin{align}\nn = 12 = 1100_2\\\\\nn-1 = 11 = 1011_2\\\\\nn \\; \\& \\; (n-1) = 1000_2\n\\end{align}$$\n\nBy looping until $n = 0$, counting iterations gives the number of set bits.\n\nTime complexity: $O(k)$ where $k$ is the number of set bits (at most $O(\\log n)$ for an $n$-bit number).",
      hints: [
        "$n \\; \\& \\; (n-1)$ clears the lowest set bit.",
        "Loop until $n$ becomes 0, counting iterations.",
      ],
    },
    {
      id: "q-bit-count-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using Brian Kernighan's algorithm, what does $\\texttt{countBits}(15)$ return?",
      options: ["1", "2", "4", "8"],
      correctAnswer: 2,
      explanation:
        "For $n = 15 = 1111_2$:\n\n\n\\begin{align}\nn = 15 = 1111_2 &\\xrightarrow{n\[5pt]&=n-1} 1110_2 \\quad (1)$\\\[5pt]\n1110_2 &\\xrightarrow{n\[5pt]&=n-1} 1100_2 \\quad (2)$\\\\\n1100_2 &\\xrightarrow{n\\&=n-1} 1000_2 \\quad (3)$\\\\\n1000_2 &\\xrightarrow{n\\&=n-1} 0000_2 \\quad (4)$\n\\end{align}$$\n\nFour iterations, so $\\text{countBits}(15) = 4$. Indeed, $15$ has four 1-bits.",
      hints: [
        "$15 = 1111_2$ has four 1-bits.",
        "Each $n \\; \\& \\; (n-1)$ clears one set bit.",
      ],
    },
    {
      id: "q-bit-count-4",
      type: "true-false",
      difficulty: "hard",
      question: "The expression $n \\& (-n)$ isolates the lowest set bit.",
      correctAnswer: "true",
      explanation:
        "In two's complement representation, $-n = \\sim(n) + 1$.\n\nFor $n = 12 = 1100_2$:\n\[\n\\begin{align}\n\\sim n &= 0011_2\\\\\n-n &= \\sim n + 1 = 0100_2\\\\\nn \\; \\& \\; (-n) &= 1100_2 \\; \\& \\; 0100_2 = 0100_2\n\\end{align}$$\n\nThe result $0100_2$ isolates bit 2, the lowest set bit of $12$.",
      hints: [
        "In two's complement, $-n = \\sim(n) + 1$.",
        "$n \\; \\& \\; (-n)$ keeps only the lowest set bit.",
      ],
    },
    {
      id: "q-bit-count-5",
      type: "coding",
      difficulty: "medium",
      question: "Write $\\texttt{countBits}(n)$ to return the number of set bits using Brian Kernighan's algorithm.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Brian Kernighan's algorithm:\n\n```typescript\nfunction countBits(n: number): number {\n  let count = 0;\n  while (n) {\n    count++;\n    n &= n - 1;  // Clear lowest set bit\n  }\n  return count;\n}\n```\n\nEach iteration clears one set bit. The number of iterations equals the number of set bits.\n\nTime: $O(k)$ where $k$ = number of set bits\nSpace: $O(1)$",
      hints: [
        "Use $n \\; \\& \\; (n-1)$ to clear the lowest set bit.",
        "Count how many iterations until $n$ becomes 0.",
        "Time is $O(k)$ where $k$ is the number of set bits.",
      ],
    },
  ],
  "bit-reversal": [
    {
      id: "q-bit-rev-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Reversing 8-bit 11001000 gives:",
      options: ["00010011", "10001101", "00110001", "11000101"],
      correctAnswer: 0,
      explanation:
        "Reverse order: 11001000 \\to 00010011. Read bits right-to-left.",
    },
    {
      id: "q-bit-rev-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In-place bit reversal for 32-bit integers typically uses:",
      options: [
        "Nested loops",
        "Lookup table",
        "Magic number method",
        "Recursive division",
      ],
      correctAnswer: 2,
      explanation:
        'The "magic" method uses pre-computed constants to swap bits in parallel O(1) steps.',
    },
    {
      id: "q-bit-rev-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "For reversing last 8 bits of a 32-bit int, use: (n >> 8) | (n << 8).",
      correctAnswer: "true",
      explanation:
        "Swapping bytes is just shifting in opposite directions and ORing, no loop needed.",
    },
    {
      id: "q-bit-rev-4",
      type: "coding",
      difficulty: "hard",
      question: "Write reverseBits(n) for a 32-bit unsigned integer.",
      options: [],
      correctAnswer: 0,
      explanation: "Iterate 32 times: result = (result<<1) | (n&1); n>>=1;",
      codeSnippet:
        "function reverseBits(n) {\n  let result = 0;\n  for (let i = 0; i < 32; i++) {\n    result = (result << 1) | (n & 1);\n    n >>= 1;\n  }\n  return result >>> 0;\n}",
      hints: [
        "Use >>> 0 for unsigned 32-bit",
        "Extract LSB with n&1",
        "Accumulate in result with left shift",
      ],
    },
    {
      id: "q-bit-rev-5",
      type: "true-false",
      difficulty: "easy",
      question: "To reverse the bits of an 8-bit number, you can extract each bit and build the result from LSB to MSB.",
      correctAnswer: "true",
      explanation:
        "The straightforward method extracts one bit at a time:\n\n```\nresult = 0\nfor i in 0..7:\n    result = (result << 1) | (n & 1)\n    n >>= 1\n```\n\nEach iteration shifts the result left and appends the current LSB of $n$. After 8 iterations, the bits are reversed.",
      hints: [
        "Extract the LSB with $n \\; \\& \\; 1$.",
        "Shift the result left to make room for each new bit.",
      ],
    },
  ],
  "gray-code": [
    {
      id: "q-gray-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Gray code is a binary sequence where:",
      options: [
        "Adjacent numbers differ by 1 bit",
        "All bits are reversed",
        "Numbers appear in ascending order",
        "Only parity changes",
      ],
      correctAnswer: 0,
      explanation:
        "Gray code ensures consecutive values differ in exactly one bit position.",
    },
    {
      id: "q-gray-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Gray code of decimal 3 (binary 11) is:",
      options: ["01", "10", "11", "00"],
      correctAnswer: 0,
      explanation:
        "3 XOR (3>>1) = 3 XOR 1 = 2 (10). Or: MSB same, each subsequent bit = current XOR previous bit.",
    },
    {
      id: "q-gray-3",
      type: "true-false",
      difficulty: "easy",
      question: "Gray code conversion formula: G(i) = i ^ (i >> 1).",
      correctAnswer: "true",
      explanation: "This formula generates Gray code from binary index i.",
    },
    {
      id: "q-gray-4",
      type: "coding",
      difficulty: "medium",
      question: "Write grayCode(n) returning array of Gray codes for n bits.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Generate Gray codes: for i in [0, 2^n): result.push(i ^ (i >> 1));",
      codeSnippet:
        "function grayCode(n) {\n  const result = [];\n  for (let i = 0; i < (1 << n); i++) {\n    result.push(i ^ (i >> 1));\n  }\n  return result;\n}",
      hints: [
        "Result length is 2^n",
        "Use formula: i ^ (i >> 1)",
        "No sorting needed",
      ],
    },
    {
      id: "q-gray-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Given a Gray code value $g$, the inverse formula to recover the binary index $n$ is:",
      options: [
        "$n = g \\oplus (g >> 1)$",
        "$n = g$ shifted right",
        "$n = g | (g >> 1) | (g >> 2) | \\ldots$",
        "There is no unique inverse",
      ],
      correctAnswer: 0,
      explanation:
        "To convert Gray code $g$ back to binary $n$:\n\n\n\\begin{align}\nn_k &= g_k \\quad (\\text{MSB is the same})\\\\\nn_i &= n_{i+1} \\oplus g_i \\quad (\\text{each subsequent bit})\n\\end{align}$$\n\nThis is equivalent to $n = g \\oplus (g >> 1) \\oplus (g >> 2) \\oplus \\ldots$, and also can be written as $n = g \\oplus (g >> 1)$ applied repeatedly (prefix XOR), but the compact iterative formula is the prefix XOR of $g$.",
      hints: [
        "The MSB of the binary code equals the MSB of the Gray code.",
        "Each subsequent binary bit is the XOR of the previous binary bit and the current Gray bit.",
      ],
    },
  ],
  "subsets-bitmask": [
    {
      id: "q-subset-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For a set of size 3, how many subsets (including empty) exist?",
      options: ["6", "8", "9", "3"],
      correctAnswer: 1,
      explanation:
        "n elements \\to 2^n subsets. 2^3 = 8 subsets (including empty set).",
    },
    {
      id: "q-subset-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Bitmask 101 represents subset with elements:",
      options: ["0th and 2nd", "1st and 2nd", "0th and 1st", "All three"],
      correctAnswer: 0,
      explanation:
        "101 = bits 0 and 2 are set, bit 1 is not. Elements at indices 0 and 2.",
    },
    {
      id: "q-subset-3",
      type: "true-false",
      difficulty: "easy",
      question: "All 0s bitmask represents the empty subset.",
      correctAnswer: "true",
      explanation: "No bits set = no elements selected = empty subset.",
    },
    {
      id: "q-subset-4",
      type: "coding",
      difficulty: "medium",
      question: "Write subsets(nums) using bitmask to generate all subsets.",
      options: [],
      correctAnswer: 0,
      explanation:
        "For each mask 0 to (1<<n)-1, build subset by checking set bits.",
      codeSnippet:
        "function subsets(nums) {\n  const n = nums.length;\n  const result = [];\n  for (let mask = 0; mask < (1 << n); mask++) {\n    const subset = [];\n    for (let i = 0; i < n; i++) {\n      if (mask & (1 << i)) subset.push(nums[i]);\n    }\n    result.push(subset);\n  }\n  return result;\n}",
      hints: [
        "Iterate mask from 0 to 2^n - 1",
        "Check (mask >> i) & 1 or mask & (1 << i)",
        "Build each subset incrementally",
      ],
    },
    {
      id: "q-subset-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To enumerate all sub-masks of a given mask $m$ (subsets of a set represented as a bitmask), the inner loop is:",
      options: [
        "for (let s = m; s > 0; s--)",
        "for (let s = m; s > 0; s = (s-1) & m)",
        "for (let s = 0; s <= m; s++)",
        "for (let s = m; s >= 0; s >>= 1)",
      ],
      correctAnswer: 1,
      explanation:
        "To iterate over all non-empty sub-masks of $m$:\n\n```javascript\nfor (let s = m; s > 0; s = (s - 1) & m) {\n  // process sub-mask s\n}\n```\n\n$(s - 1) \\; \\& \\; m$ clears the lowest set bit of $s$ and then masks back to only bits in $m$. This visits all $2^{\\text{popcount}(m)}$ sub-masks in $O(2^{\\text{popcount}(m)})$.",
      hints: [
        "$(s - 1)$ flips the trailing bits; $\\& m$ restricts to only bits in $m$.",
        "The loop ends when $s$ becomes 0 (empty sub-mask).",
      ],
    },
  ],
  "bitwise-swap": [
    {
      id: "q-swap-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "XOR swap works because:",
      options: [
        "XOR is associative",
        "a^a = 0 and a^0 = a",
        "Both A and B",
        "XOR is commutative",
      ],
      correctAnswer: 2,
      explanation:
        "All properties hold. After three XORs: a=(a^b)^(a^b^b)=a^a^a^b^b^b=0^0^b=b.",
    },
    {
      id: "q-swap-2",
      type: "true-false",
      difficulty: "easy",
      question: "XOR swap fails if a and b point to the same memory location.",
      correctAnswer: "true",
      explanation:
        "If &a == &b, then a ^ a = 0, losing both values. Check or use temp var.",
    },
    {
      id: "q-swap-3",
      type: "coding",
      difficulty: "easy",
      question:
        "Implement XOR swap: swapBits(a, b) returns [b, a] without temp.",
      options: [],
      correctAnswer: 0,
      explanation: "a = a ^ b; b = a ^ b; a = a ^ b; return [a, b];",
      codeSnippet:
        "function swapBits(a, b) {\n  a = a ^ b;\n  b = a ^ b;\n  a = a ^ b;\n  return [a, b];\n}",
      hints: [
        "Three XOR operations in sequence",
        "Ensure a and b are not the same variable",
        "Mathematically: a = (a^b^b) = a",
      ],
    },
    {
      id: "q-swap-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "On modern CPUs, why is XOR swap generally slower than using a temporary variable?",
      options: [
        "XOR is slower than MOV on modern CPUs",
        "Three sequential XOR operations create data hazards (false dependencies)",
        "XOR uses more registers",
        "XOR requires integer overflow checking",
      ],
      correctAnswer: 1,
      explanation:
        "In the XOR swap, each operation depends on the result of the previous one:\n\n$$a = a \\oplus b \\to b = a \\oplus b \\to a = a \\oplus b$$\n\nThis chain of data dependencies prevents instruction-level parallelism (ILP). A modern out-of-order CPU cannot pipeline these three operations.\n\nBy contrast, a temp-variable swap allows the CPU to issue loads and stores in parallel.",
      hints: [
        "Each XOR depends on the previous result - no parallelism possible.",
        "Modern CPUs exploit ILP; sequential data dependencies prevent this.",
      ],
    },
  ],
  "find-missing-number": [
    {
      id: "q-miss-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "For [3,0,1], missing number is:",
      options: ["2", "3", "1", "4"],
      correctAnswer: 0,
      explanation:
        "XOR all indices and values: 0^1^2 ^ 3^0^1 = 0^0^0^1^1^2^3 = 2.",
    },
    {
      id: "q-miss-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Sum formula for missing number in [0,n] with n+1 numbers:",
      options: [
        "n(n+1)/2 - sum",
        "n(n-1)/2 - sum",
        "sum - n(n+1)/2",
        "n(n+1)/2 + sum",
      ],
      correctAnswer: 0,
      explanation: "Expected sum = n(n+1)/2. Missing = expected - actual.",
    },
    {
      id: "q-miss-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "XOR method: missing = XOR of (0 to n) XOR XOR of array elements.",
      correctAnswer: "true",
      explanation:
        "Each index appears twice except one (the missing), cancels out leaving missing.",
    },
    {
      id: "q-miss-4",
      type: "coding",
      difficulty: "easy",
      question: "Write findMissing(nums) using XOR to find missing number.",
      options: [],
      correctAnswer: 0,
      explanation:
        "XOR 0..n and all elements. Result = missing (others cancel).",
      codeSnippet:
        "function findMissing(nums) {\n  let xor = 0;\n  for (let i = 0; i <= nums.length; i++) xor ^= i;\n  for (const num of nums) xor ^= num;\n  return xor;\n}",
      hints: [
        "XOR all indices 0 to n",
        "XOR all array values",
        "Missing number remains",
      ],
    },
    {
      id: "q-miss-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If the array has two missing numbers from $[0, n]$, the XOR approach alone is insufficient. What technique finds both missing numbers efficiently?",
      options: [
        "XOR all, then partition by a set bit",
        "Sort the array",
        "Use two separate XOR passes",
        "Compute sum and sum of squares",
      ],
      correctAnswer: 0,
      explanation:
        "Let $x = a \\oplus b$ (XOR of the two missing numbers). Since $a \\neq b$, at least one bit differs.\n\nPick any set bit $k$ in $x$. Partition all numbers in $[0, n]$ and all array elements into two groups based on bit $k$. XOR within each group gives one missing number per group.\n\n**Alternatively**: Use sum $S = n(n+1)/2 - \\text{array sum}$ and XOR $x = a \\oplus b$; then $a + b = S$ and use one sum-of-squares check, or the bit-partition method above.",
      hints: [
        "XOR of two distinct numbers has at least one set bit.",
        "Use that bit to partition and find each missing number separately.",
      ],
    },
  ],
  "bitwise-palindrome": [
    {
      id: "q-pal-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Binary 10101 is a palindrome. Is 10001?",
      options: ["Yes", "No", "Only for even lengths", "Depends on bit width"],
      correctAnswer: 0,
      explanation:
        "10001 reads same forward/backward (mirrored around center).",
    },
    {
      id: "q-pal-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Checking bit palindrome: reverse bits and compare to original?",
      options: [
        "Yes, but O(n) extra space",
        "No, in-place possible",
        "Only for small numbers",
        "Only with XOR",
      ],
      correctAnswer: 0,
      explanation:
        "Bit reversal creates reversed version, compare. O(n) for n bits.",
    },
    {
      id: "q-pal-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "For 32-bit, can check palindrome by comparing bits at positions i and 31-i.",
      correctAnswer: "true",
      explanation:
        "Two-pointer from both ends. If any mismatch, not palindrome.",
    },
    {
      id: "q-pal-4",
      type: "coding",
      difficulty: "medium",
      question:
        "Write isBitPalindrome(n) to check if binary representation is palindrome.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Use two-pointer: left = MSB, right = LSB. Move inward, compare.",
      codeSnippet:
        "function isBitPalindrome(n) {\n  const isPal = (left, right) => {\n    if (left >= right) return true;\n    const l = (n >> left) & 1;\n    const r = (n >> right) & 1;\n    if (l !== r) return false;\n    return isPal(left + 1, right - 1);\n  };\n  return isPal(31, 0);\n}",
      hints: [
        "Use two pointers from MSB and LSB",
        "Extract bit at position i with (n >> i) & 1",
        "Stop when pointers cross",
      ],
    },
    {
      id: "q-pal-5",
      type: "true-false",
      difficulty: "easy",
      question: "The binary string $101$ is a palindrome.",
      correctAnswer: "true",
      explanation:
        "A palindrome reads the same forward and backward.\n\n$101$ reversed is $101$ - identical. So yes, it is a binary palindrome.",
      hints: [
        "Reverse the bits: does it equal the original?",
        "$101$ reads the same in both directions.",
      ],
    },
    {
      id: "q-pal-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For a 32-bit integer, which approach checks binary palindrome in $O(1)$ (ignoring leading zeros)?",
      options: [
        "Reverse all 32 bits and compare to original",
        "Loop through 16 pairs",
        "Use popcount",
        "XOR with its reverse",
      ],
      correctAnswer: 3,
      explanation:
        "XOR the number with its bit-reversed form. If the result is 0, all corresponding bits match - it is a palindrome.\n\n$$\\text{isPalindrome}(n) = (n \\oplus \\text{reverseBits}(n)) == 0$$\n\nThis works in $O(1)$ if $\\text{reverseBits}$ is $O(1)$ (using precomputed lookup tables or the magic-constant method for 32-bit integers).",
      hints: [
        "XOR of equal values is 0.",
        "If $n \\oplus \\text{reverse}(n) = 0$, every bit matches its mirror.",
      ],
    },
  ],

  // ── HASH TABLES ────────────────────────────────────────────────────
  "hash-function": [
    {
      id: "q-hash-func-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary purpose of a hash function?",
      options: [
        "Encrypt data",
        "Map keys to array indices",
        "Sort data",
        "Compress data",
      ],
      correctAnswer: 1,
      explanation:
        "Hash functions map keys to array indices for O(1) average-case lookup time.",
      hints: [
        "Think about what constant-time operation we want",
        "Arrays give O(1) by index, we want O(1) by key",
      ],
    },
    {
      id: "q-hash-func-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A good hash function should distribute keys uniformly across array slots.",
      correctAnswer: "true",
      explanation:
        "Uniform distribution minimizes collisions and ensures balanced load across buckets.",
      hints: [
        "What happens if many keys hash to the same index?",
        "Think about collision probability",
      ],
    },
    {
      id: "q-hash-func-3",
      type: "true-false",
      difficulty: "easy",
      question: "A hash function always maps distinct inputs to distinct outputs (no collisions).",
      correctAnswer: "false",
      explanation:
        "By the **pigeonhole principle**, if the number of possible keys exceeds the number of hash buckets, collisions are unavoidable.\n\nA **perfect hash function** for a specific static key set can avoid collisions, but in general, hash functions produce collisions.",
      hints: [
        "Think about mapping an infinite key space to a finite array.",
        "If there are $m$ buckets and $n > m$ keys, some bucket must hold more than one key.",
      ],
    },
    {
      id: "q-hash-func-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The polynomial rolling hash $h(s) = (s_0 a^{n-1} + s_1 a^{n-2} + \\ldots + s_{n-1}) \\bmod p$ can be updated in $O(1)$ when sliding a window. What is the update formula when removing $s_0$ and adding $s_n$?",
      options: [
        "$h = (h - s_0 \\cdot a^{n-1}) \\cdot a + s_n$",
        "$h = h \\cdot a + s_n - s_0$",
        "$h = (h + s_n) \\bmod p$",
        "$h = h - s_0 + s_n$",
      ],
      correctAnswer: 0,
      explanation:
        "After removing the leftmost character $s_0$ and adding $s_n$ to the right:\n\n$$h_{\\text{new}} = \\left(h - s_0 \\cdot a^{n-1}\\right) \\cdot a + s_n \\pmod{p}$$\n\nThis is Rabin-Karp's rolling hash update. Precompute $a^{n-1} \\bmod p$ once, then each update is $O(1)$.",
      hints: [
        "First subtract the contribution of $s_0$ (scaled by $a^{n-1}$).",
        "Then shift left (multiply by $a$) and add the new character $s_n$.",
      ],
    },
  ],

  "hash-map-implementation": [
    {
      id: "q-hash-map-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of hash map lookup in the average case?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 0,
      explanation:
        "Hash map provides O(1) average-case lookup by computing hash and accessing index directly.",
      hints: [
        "What does the hash function give us?",
        "Direct array access is constant time",
      ],
    },
    {
      id: "q-hash-map-2",
      type: "true-false",
      difficulty: "medium",
      question: "Hash maps use separate chaining to handle collisions.",
      correctAnswer: "true",
      explanation:
        "Separate chaining stores colliding elements in a linked list at each bucket index.",
      hints: [
        "What data structure holds colliding entries?",
        "Think of a list at each bucket",
      ],
    },
    {
      id: "q-hash-map-3",
      type: "true-false",
      difficulty: "easy",
      question: "In a hash map, the load factor is defined as the number of stored elements divided by the number of buckets.",
      correctAnswer: "true",
      explanation:
        "Load factor $\\alpha = n / m$ where $n$ = number of entries and $m$ = number of buckets.\n\nA higher load factor increases collision probability and degrades performance. Most implementations resize (rehash) when $\\alpha$ exceeds a threshold (typically 0.75).",
      hints: [
        "Load factor measures how full the hash table is.",
        "$\\alpha = \\text{entries} / \\text{buckets}$.",
      ],
    },
    {
      id: "q-hash-map-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When a hash map with open addressing uses **linear probing** and reaches load factor 1, what happens?",
      options: [
        "Infinite loop during lookup",
        "Automatic resize",
        "All operations degrade to $O(n)$ due to clustering",
        "Operations continue at $O(1)$",
      ],
      correctAnswer: 2,
      explanation:
        "At load factor 1, every slot is occupied. Linear probing must scan every slot during lookup or insert, giving $O(n)$ worst-case.\n\n**Primary clustering**: Long runs of occupied slots form, causing new inserts to extend runs further. Expected probe length grows as $O(1/(1-\\alpha)^2)$ as $\\alpha \\to 1$.\n\nRehashing to a larger table (typically doubling) restores $O(1)$ average operations.",
      hints: [
        "At full capacity, every probe misses until it wraps around.",
        "Primary clustering causes probe sequences to merge into long chains.",
      ],
    },
  ],

  "hash-collision": [
    {
      id: "q-col-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is a collision in hash tables?",
      options: [
        "Two keys mapping to same index",
        "Key not found error",
        "Hash function failure",
        "Memory overflow",
      ],
      correctAnswer: 0,
      explanation:
        "A collision occurs when two different keys produce the same hash value and map to the same array index.",
      hints: [
        "Think about the pigeonhole principle",
        "What happens when n keys > m slots?",
      ],
    },
    {
      id: "q-col-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which collision resolution strategy uses a linked list at each bucket?",
      options: [
        "Linear probing",
        "Quadratic probing",
        "Separate chaining",
        "Double hashing",
      ],
      correctAnswer: 2,
      explanation:
        "Separate chaining stores colliding elements in a linked list at each bucket index.",
      hints: [
        "Think of a chain of elements at each slot",
        "What data structure grows at each bucket?",
      ],
    },
    {
      id: "q-col-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Double hashing uses a second hash function $h_2(k)$ for the probe sequence $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod m$. Why must $h_2(k)$ be coprime to $m$?",
      options: [
        "To avoid revisiting slots",
        "To ensure the probe sequence visits all $m$ slots",
        "To make $h_2$ a valid hash function",
        "To reduce secondary clustering",
      ],
      correctAnswer: 1,
      explanation:
        "If $\\gcd(h_2(k), m) = d > 1$, the probe sequence only visits $m/d$ distinct slots before cycling.\n\nThis means at most $m/d$ slots are ever probed - some slots become unreachable, potentially causing spurious lookup failures even when empty slots exist.\n\nRequiring $h_2(k)$ coprime to $m$ (e.g., $m$ prime, or $h_2(k)$ always odd with $m$ a power of 2) guarantees a full permutation of all $m$ slots.",
      hints: [
        "A probe sequence of step size $d$ cycles after $m/d$ steps if $\\gcd(d, m) = d$.",
        "Full coverage requires the step size to generate all residues modulo $m$.",
      ],
    },
  ],

  "two-sum-hash": [
    {
      id: "q-two-sum-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What hash structure is used in the optimal Two Sum solution?",
      options: ["Hash set", "Hash map", "Stack", "Queue"],
      correctAnswer: 1,
      explanation:
        "Hash map stores (value -> index) pairs, allowing O(1) lookup for complement (target - nums[i]).",
      hints: [
        "We need to find complement",
        "What lets us check if complement exists?",
      ],
    },
    {
      id: "q-two-sum-2",
      type: "true-false",
      difficulty: "easy",
      question: "Two Sum with hash map runs in O(n) time with O(n) space.",
      correctAnswer: "true",
      explanation:
        "Single pass O(n), hash map stores up to n elements O(n) space.",
      hints: [
        "How many passes through the array?",
        "What auxiliary storage do we need?",
      ],
    },
    {
      id: "q-two-sum-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In the Two Sum hash map solution, when do we add the current element to the map?",
      options: [
        "Before checking for the complement",
        "After checking for the complement",
        "Only if the complement is not found",
        "At the very end of the loop",
      ],
      correctAnswer: 1,
      explanation:
        "The correct order is:\n\n1. Check if $\\text{target} - \\text{nums}[i]$ exists in the map\n2. If yes, return $[\\text{map}[\\text{complement}], i]$\n3. If no, add $\\text{nums}[i] \\to i$ to the map\n\nAdding after ensures we don't use the same element twice (e.g., if target = 6 and the element is 3, we don't match 3 with itself).",
      hints: [
        "We must not use the same element at the same index twice.",
        "Checking before insertion avoids self-pairing.",
      ],
    },
    {
      id: "q-two-sum-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For Three Sum (find all unique triplets summing to 0), what is the optimal time complexity?",
      options: ["$O(n)$", "$O(n \\log n)$", "$O(n^2)$", "$O(n^3)$"],
      correctAnswer: 2,
      explanation:
        "Optimal Three Sum: sort in $O(n \\log n)$, then fix one element and use two pointers for the remaining pair:\n\n\n\\begin{align}\n\\text{for } i &= 0 \\text{ to } n - 3:\\\\\n&\\quad \\text{left} = i + 1, \\; \\text{right} = n - 1\\\\\n&\\quad \\text{while left < right: two-pointer scan}\n\\end{align}$$\n\nOuter loop: $O(n)$; inner two-pointer: $O(n)$. Total: $O(n^2)$.\n\nThis is optimal since $\\Omega(n^2)$ triplets can exist in the output.",
      hints: [
        "Fix one element, solve Two Sum on the remainder.",
        "Sorting + two pointers gives $O(n)$ per fixed element.",
      ],
    },
  ],

  "anagram-grouping": [
    {
      id: "q-ana-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What canonical form is used to identify anagram groups?",
      options: [
        "Sorted string",
        "Character count map",
        "First character",
        "String length",
      ],
      correctAnswer: 0,
      explanation:
        'Sorting an anagram produces the same string, e.g., "eat" and "ate" both sort to "aet".',
      hints: [
        "What do all anagrams share?",
        "Sorting rearranges to canonical order",
      ],
    },
    {
      id: "q-ana-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Grouping anagrams using sorting has O(n * k log k) time complexity where k is max string length.",
      correctAnswer: "true",
      explanation:
        "Sorting each string costs O(k log k), done for n strings gives O(n * k log k).",
      hints: ["Cost to sort one string", "Applied to n strings"],
    },
    {
      id: "q-ana-3",
      type: "true-false",
      difficulty: "easy",
      question: 'Two strings are anagrams of each other if and only if they have the same character frequencies.',
      correctAnswer: "true",
      explanation:
        "Anagrams are rearrangements of the same characters. Two strings are anagrams iff they have identical multisets of characters - that is, the same count for each character.\n\nExample: \"listen\" and \"silent\" both have the same character counts.",
      hints: [
        "Anagrams use the same characters, just in a different order.",
        "Character frequency (count) is the canonical comparison.",
      ],
    },
    {
      id: "q-ana-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Instead of sorting each string to find the canonical key, an alternative $O(k)$ canonical form for a string of length $k$ over a 26-letter alphabet is:",
      options: [
        "A length-26 frequency count array",
        "A sorted list of character-count pairs",
        "A prime product hash",
        "All of the above are valid",
      ],
      correctAnswer: 3,
      explanation:
        "Multiple $O(k)$ canonical forms exist:\n\n1. **Frequency count array**: `[2,0,0,0,1,0,...,0,1]` for \"aae\"\n2. **Character-count pairs**: sorted `(a,2),(e,1)` representation\n3. **Prime product hash**: assign a prime to each letter; multiply their primes - but this can overflow for long strings\n\nAll three uniquely identify an anagram group. The frequency array is most common in practice.",
      hints: [
        "Any representation that captures character frequencies is a valid canonical key.",
        "Sorting is one approach; counting is another.",
      ],
    },
  ],

  "hash-substring": [
    {
      id: "q-sub-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What data structure sliding window technique finds longest substring without repeating characters?",
      options: ["Stack", "Queue", "Hash set", "Tree"],
      correctAnswer: 2,
      explanation:
        "Hash set stores characters in current window, allowing O(1) lookup for duplicates.",
      hints: [
        "We need to track characters in window",
        "What gives constant-time membership check?",
      ],
    },
    {
      id: "q-sub-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The sliding window expands by moving right pointer and contracts by moving left pointer.",
      correctAnswer: "true",
      explanation:
        "Window grows when adding new character, shrinks when duplicate is found.",
      hints: [
        "Think of the window as having two boundaries",
        "When do we adjust each?",
      ],
    },
    {
      id: "q-sub-3",
      type: "true-false",
      difficulty: "easy",
      question: "The longest substring without repeating characters can have length at most 26 for lowercase English letters.",
      correctAnswer: "true",
      explanation:
        "There are only 26 lowercase English letters. A substring with no repeating characters can contain each letter at most once.\n\nTherefore its length is bounded by the alphabet size: $\\leq 26$.",
      hints: [
        "How many distinct lowercase letters are there?",
        "No repeating characters means each character appears at most once.",
      ],
    },
    {
      id: "q-sub-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For the minimum window substring problem (find smallest window in $s$ containing all characters of $t$), what is the optimal time complexity?",
      options: ["$O(|s|)$", "$O(|s| + |t|)$", "$O(|s| \\cdot |t|)$", "$O(|s|^2)$"],
      correctAnswer: 1,
      explanation:
        "The sliding window approach:\n1. Build a frequency map of $t$: $O(|t|)$\n2. Expand right pointer, shrink left pointer when window is valid: $O(|s|)$\n3. Each character is visited at most twice (once by right, once by left)\n\nTotal: $O(|s| + |t|)$.",
      hints: [
        "Sliding window: right pointer always moves forward, left pointer shrinks valid windows.",
        "Building the frequency map of $t$ takes $O(|t|)$.",
      ],
    },
  ],

  "hash-cache": [
    {
      id: "q-cache-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the core principle of LRU (Least Recently Used) cache?",
      options: [
        "Remove oldest by timestamp",
        "Remove most frequently used",
        "Remove largest item",
        "Remove newest",
      ],
      correctAnswer: 0,
      explanation:
        "LRU evicts the least recently accessed item when capacity is reached.",
      hints: [
        "What item should we remove when full?",
        "Think about recency of access",
      ],
    },
    {
      id: "q-cache-2",
      type: "true-false",
      difficulty: "medium",
      question: "Hash map alone can implement LRU cache efficiently.",
      correctAnswer: "false",
      explanation:
        "Hash map gives O(1) access but not O(1) eviction ordering. Need a data structure for recency (doubly linked list).",
      hints: ["What ordering do we need?", "Can hash map maintain order?"],
    },
    {
      id: "q-cache-3",
      type: "true-false",
      difficulty: "easy",
      question: "In an LRU cache of capacity $k$, when the cache is full and a new item is inserted, the least recently used item is evicted.",
      correctAnswer: "true",
      explanation:
        "LRU (Least Recently Used) eviction policy: when capacity is reached, the item that was accessed least recently is removed to make room for the new item.\n\nThis approximates the optimal offline algorithm (Bélády's algorithm) and works well in practice.",
      hints: [
        "LRU = evict the item that has gone the longest without being accessed.",
        "The cache keeps the most recently used $k$ items.",
      ],
    },
    {
      id: "q-cache-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The standard $O(1)$ LRU cache implementation uses a hash map plus what other data structure?",
      options: [
        "Stack",
        "Min-heap",
        "Doubly linked list",
        "Circular buffer",
      ],
      correctAnswer: 2,
      explanation:
        "The classic $O(1)$ LRU cache combines:\n\n1. **Hash map**: `key \\to node` for $O(1)$ lookup\n2. **Doubly linked list**: maintains access order with $O(1)$ node removal and insertion at head/tail\n\nOn access: move node to the front (most recently used).\nOn eviction: remove the tail node (least recently used).\nThe hash map gives us the node pointer directly, enabling $O(1)$ removal.",
      hints: [
        "We need $O(1)$ lookup (hash map) and $O(1)$ reordering.",
        "A doubly linked list can remove/insert any node in $O(1)$ given a pointer.",
      ],
    },
  ],

  "hash-counting": [
    {
      id: "q-count-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key operation in frequency counting with hash maps?",
      options: [
        "Increment count on each occurrence",
        "Store all values",
        "Sort the elements",
        "Binary search",
      ],
      correctAnswer: 0,
      explanation:
        "Hash map stores element -> count, incrementing on each encounter gives frequency.",
      hints: [
        "We want to count occurrences",
        "What operation for each element?",
      ],
    },
    {
      id: "q-count-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Finding majority element (appears > n/2 times) can use hash map counting.",
      correctAnswer: "true",
      explanation: "Count all elements, any with count > n/2 is majority.",
      hints: [
        "Can we track counts for all elements?",
        "What threshold defines majority?",
      ],
    },
    {
      id: "q-count-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "To find the top-$K$ most frequent elements in an array, the optimal approach uses:",
      options: [
        "Sort by frequency: $O(n \\log n)$",
        "Hash map + min-heap of size $K$: $O(n \\log k)$",
        "Hash map + full sort: $O(n \\log n)$",
        "Hash map + bucket sort: $O(n)$",
      ],
      correctAnswer: 3,
      explanation:
        "Optimal approach: bucket sort by frequency.\n\n1. Count frequencies: $O(n)$\n2. Create $n+1$ buckets where bucket $i$ holds elements with frequency $i$: $O(n)$\n3. Collect top-$K$ elements from the highest-frequency buckets: $O(n)$\n\nTotal: $O(n)$, which beats the $O(n \\log k)$ heap approach.",
      hints: [
        "Frequency values range from 1 to $n$, enabling bucket sort.",
        "Bucket sort allows $O(n)$ for this problem.",
      ],
    },
    {
      id: "q-count-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Boyer-Moore majority vote algorithm runs in $O(n)$ time and $O(1)$ space, but requires a second pass to verify. Why is the verification pass necessary?",
      options: [
        "The candidate may not actually appear $> n/2$ times",
        "The first pass may select the wrong candidate",
        "The first pass is non-deterministic",
        "Verification is optional for correctness",
      ],
      correctAnswer: 0,
      explanation:
        "The first pass of Boyer-Moore guarantees: **if a majority element exists, the candidate must be it**.\n\nHowever, it does NOT guarantee a majority element exists. For example, $[1, 2, 3]$ - the candidate is 3 (or any element), but no majority element exists.\n\nThe second pass counts occurrences of the candidate to confirm $\\text{count} > n/2$.",
      hints: [
        "Boyer-Moore guarantees the candidate is the majority element IF one exists.",
        "The algorithm cannot tell on the first pass whether a majority element truly exists.",
      ],
    },
  ],

  "hash-bloom": [
    {
      id: "q-bloom-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is a Bloom filter?",
      options: [
        "Exact set membership structure",
        "Probabilistic data structure",
        "Sorted array",
        "Balanced tree",
      ],
      correctAnswer: 1,
      explanation:
        "Bloom filter is a probabilistic structure that can return false positives but never false negatives.",
      hints: [
        'Can it ever say "no" when element was added?',
        "What can it guarantee?",
      ],
    },
    {
      id: "q-bloom-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A Bloom filter can have false positives but not false negatives.",
      correctAnswer: "true",
      explanation:
        'May say "probably yes" when element not in set, but never says "no" when it is.',
      hints: ["What error type is possible?", "What error is impossible?"],
    },
    {
      id: "q-bloom-3",
      type: "true-false",
      difficulty: "easy",
      question: "A Bloom filter uses a bit array and multiple hash functions to check set membership.",
      correctAnswer: "true",
      explanation:
        "A Bloom filter consists of:\n- A bit array of size $m$ (initially all 0)\n- $k$ independent hash functions\n\n**Insert**: set bits at $h_1(x), h_2(x), \\ldots, h_k(x)$\n**Query**: check if all $k$ bits are set - if any is 0, $x$ was not inserted",
      hints: [
        "Multiple hash functions reduce false positive probability.",
        "A single hash function would have too many collisions.",
      ],
    },
    {
      id: "q-bloom-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Given a Bloom filter with $m$ bits, $k$ hash functions, and $n$ inserted elements, the false positive probability is approximately:",
      options: [
        "$\\left(1 - e^{-kn/m}\\right)^k$",
        "$kn/m$",
        "$1 - e^{-kn/m}$",
        "$k/m$",
      ],
      correctAnswer: 0,
      explanation:
        "After inserting $n$ elements with $k$ hash functions into $m$ bits:\n\n- Probability a specific bit is 0: $\\left(1 - 1/m\\right)^{kn} \\approx e^{-kn/m}$\n- Probability a specific bit is 1: $1 - e^{-kn/m}$\n- False positive: all $k$ query bits are 1: $\\left(1 - e^{-kn/m}\\right)^k$\n\nOptimal $k = (m/n) \\ln 2$ minimizes this false positive rate.",
      hints: [
        "Each bit has probability $\\approx e^{-kn/m}$ of still being 0.",
        "A false positive requires all $k$ queried bits to be 1.",
      ],
    },
  ],

  "consistent-hashing": [
    {
      id: "q-consist-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What problem does consistent hashing solve?",
      options: [
        "Hash collision handling",
        "Data redistribution when adding/removing servers",
        "Cache invalidation",
        "Load balancing algorithms",
      ],
      correctAnswer: 1,
      explanation:
        "Consistent hashing minimizes data movement when servers are added or removed.",
      hints: [
        "What changes when you add a server?",
        "How much data needs to move?",
      ],
    },
    {
      id: "q-consist-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In consistent hashing, only K/n keys are remapped when adding a new server.",
      correctAnswer: "true",
      explanation:
        "Unlike mod-N hashing which remaps all keys, consistent hashing only remaps K/n keys.",
      hints: [
        "What fraction of the ring changes?",
        "How does this compare to mod-N?",
      ],
    },
    {
      id: "q-consist-3",
      type: "true-false",
      difficulty: "easy",
      question: "In traditional modular hashing ($\\text{hash}(k) \\bmod N$), adding one new server forces remapping almost all keys.",
      correctAnswer: "true",
      explanation:
        "With $N$ servers and modular hashing, adding a server changes $N$ to $N+1$.\n\n$$k \\bmod N \\neq k \\bmod (N+1) \\text{ for most } k$$\n\nOn average, $N/(N+1)$ of all keys (nearly all of them) are remapped to different servers.\n\nConsistent hashing reduces this to only $K/N$ keys being remapped (where $K$ is total keys).",
      hints: [
        "Changing the modulus from $N$ to $N+1$ changes almost every result.",
        "Only $1/(N+1)$ of keys stay on their original server.",
      ],
    },
    {
      id: "q-consist-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Consistent hashing uses virtual nodes (vnodes) to improve load balancing. The key reason is:",
      options: [
        "To reduce hash collision",
        "Each physical server maps to multiple points on the ring, evening out the load",
        "To store replicated data",
        "To speed up lookup",
      ],
      correctAnswer: 1,
      explanation:
        "With only one point per server on the ring, load distribution can be highly unequal (some servers get large arcs, some small).\n\nBy mapping each physical server to $v$ virtual nodes (multiple ring positions), the load is distributed more uniformly. With many vnodes, by the law of large numbers, each server receives close to $1/N$ of the keys.",
      hints: [
        "One point per server creates uneven arc lengths on the ring.",
        "More points per server averages out the arc sizes.",
      ],
    },
  ],

  "dp-state-compression": [
    {
      id: "q-dp-sc-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "State compression DP is used when:",
      options: [
        "Number of states is very large",
        "Transition function is complex",
        "DP table is sparse",
        "State can be represented as bitmask",
      ],
      correctAnswer: 3,
      explanation:
        "State compression represents multiple related states as bits in a single integer, enabling O(1) state transitions.",
      hints: [
        "Think about representing subsets as bits",
        "What can fit in a 64-bit integer?",
      ],
    },
    {
      id: "q-dp-sc-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "In a TSP bitmask DP with 20 cities, the state space is 2^20 * 20 = ~400M entries.",
      correctAnswer: "true",
      explanation:
        "For each subset (2^n subsets) and each ending city (n cities), we have O(n * 2^n) states.",
      hints: [
        "How many subsets of n elements?",
        "What is the memory footprint?",
      ],
    },
    {
      id: "q-dp-sc-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which operation is key to bitmask DP transitions?",
      options: [
        "Bitwise AND",
        "Bitwise OR and subtraction",
        "Modulo arithmetic",
        "Floating point ops",
      ],
      correctAnswer: 1,
      explanation:
        "Setting (s | (1 << i)), clearing (s & ~(1 << i)), and checking (s & (1 << i)) bits are fundamental operations.",
      hints: [
        "How do you add an element to a set?",
        "How do you check membership?",
      ],
    },
    {
      id: "q-dp-sc-4",
      type: "coding",
      difficulty: "hard",
      question:
        "Implement bitmask TSP with dp[mask][i] = min cost to visit set mask ending at city i.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Classic DP: dp[mask][i] = min over j in mask, j != i of dp[mask ^ {i}][j] + dist[j][i]",
      codeSnippet: `function tsp(dist) {
  const n = dist.length;
  const dp = Array(1 << n).fill(null).map(() => Array(n).fill(Infinity));
  dp[1][0] = 0;
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i))) continue;
      const prevMask = mask ^ (1 << i);
      for (let j = 0; j < n; j++) {
        if (!(prevMask & (1 << j))) continue;
        dp[mask][i] = Math.min(dp[mask][i], dp[prevMask][j] + dist[j][i]);
      }
    }
  }
  const fullMask = (1 << n) - 1;
  return Math.min(...dp[fullMask].slice(1));
}`,
      hints: [
        "Start with dp[1][0] = 0 (only city 0 visited)",
        "For each state, try all previous cities",
        "Remove current city from mask to get previous state",
      ],
    },
    {
      id: "q-dp-sc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of the standard bitmask DP for Hamiltonian Path?",
      options: ["O(n!)", "O(n^2 * 2^n)", "O(n * 2^n)", "O(2^n)"],
      correctAnswer: 1,
      explanation:
        "We have O(2^n) states, each considering O(n) possible transitions to other cities, resulting in O(n^2 * 2^n).",
      hints: [
        "How many masks exist?",
        "For each mask, how many ending cities?",
        "For each (mask, i), what is the inner loop?",
      ],
    },
    {
      id: "q-dp-sc-6",
      type: "true-false",
      difficulty: "easy",
      question: "In bitmask DP, each bit in the state mask typically represents whether a specific element is included in the current subset.",
      correctAnswer: "true",
      explanation:
        "A bitmask of $n$ bits represents a subset of $n$ elements. If bit $i$ is set, element $i$ is in the subset.\n\nFor example, with elements $\\{A, B, C\\}$:\n- $011_2 = 3$: elements $A$ and $B$ are included\n- $111_2 = 7$: all three elements are included\n- $000_2 = 0$: empty subset",
      hints: [
        "A bitmask is just a compact set representation.",
        "Bit $i$ set means element $i$ belongs to the current subset.",
      ],
    },
  ],

  "dp-tree-dp": [
    {
      id: "q-dp-tree-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Tree DP typically processes nodes in what order?",
      options: [
        "BFS level order",
        "Post-order (bottom-up)",
        "Pre-order (top-down)",
        "Random order",
      ],
      correctAnswer: 1,
      explanation:
        "Tree DP computes child subtree results first (post-order) before combining them at the parent.",
      hints: [
        "Why do children need to be computed first?",
        "What does bottom-up mean?",
      ],
    },
    {
      id: "q-dp-tree-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In rerooting DP, the transition from parent to child involves:",
      options: [
        "Recomputing entire subtree",
        "Adjusting counts while excluding the child subtree",
        "Swapping root and child",
        "No transition needed",
      ],
      correctAnswer: 1,
      explanation:
        "Rerooting adjusts dp values by subtracting the child contribution and adding the parent contribution without recomputing everything.",
      hints: [
        "What changes when root moves to a child?",
        "How do you avoid double counting?",
      ],
    },
    {
      id: "q-dp-tree-3",
      type: "coding",
      difficulty: "hard",
      question: "Implement tree diameter using DP: find longest path in tree.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Tree diameter = max of (height of left subtree + height of right subtree + 2) for each node.",
      codeSnippet: `function diameter(root) {
  let maxDiameter = 0;
  function dfs(node) {
    if (!node) return 0;
    let longestChild = 0, secondLongest = 0;
    for (const child of node.children) {
      const h = dfs(child);
      if (h > longestChild) { secondLongest = longestChild; longestChild = h; }
      else if (h > secondLongest) secondLongest = h;
    }
    maxDiameter = Math.max(maxDiameter, longestChild + secondLongest);
    return longestChild + 1;
  }
  dfs(root);
  return maxDiameter;
}`,
      hints: [
        "For each node, find the two tallest child heights",
        "Diameter through node = sum of two tallest + 2",
        "Track global maximum diameter",
      ],
    },
    {
      id: "q-dp-tree-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "In tree DP, each node can be independent root and we compute subtree sizes/bottoms-up.",
      correctAnswer: "true",
      explanation:
        "Tree DP treats each node as root of its own subtree and computes information in O(size of subtree).",
      hints: [
        "Is a leaf node a valid subtree?",
        "What does post-order mean for trees?",
      ],
    },
    {
      id: "q-dp-tree-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the key advantage of rerooting DP over naive tree DP?",
      options: [
        "Lower time complexity",
        "O(1) transition between roots instead of O(n) recompute",
        "Less memory",
        "Simpler code",
      ],
      correctAnswer: 1,
      explanation:
        "Rerooting allows O(1) transition when changing root by using prefix/suffix techniques to avoid O(n) recomputation.",
      hints: [
        "If you move root from parent to child, what changes?",
        "Can you reuse computed values from parent?",
      ],
    },
    {
      id: "q-dp-tree-6",
      type: "true-false",
      difficulty: "easy",
      question: "Tree DP is a special case of dynamic programming where the structure of the problem follows a tree (acyclic graph).",
      correctAnswer: "true",
      explanation:
        "Tree DP exploits the recursive structure of trees: each subtree's optimal solution depends only on its own children, not on siblings or ancestors.\n\nThis enables bottom-up computation (post-order traversal) where each node's value is computed after all its children are processed.",
      hints: [
        "Trees have no cycles, so subproblems do not depend on each other circularly.",
        "Children are independent of each other given their parent.",
      ],
    },
  ],

  "dp-intervals": [
    {
      id: "q-dp-int-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Interval DP is typically solved using what approach?",
      options: [
        "Recursion on intervals of increasing length",
        "Binary search",
        "Divide and conquer on split point",
        "Memoization with (i,j) keys",
      ],
      correctAnswer: 0,
      explanation:
        "Interval DP fills the DP table by increasing interval length, ensuring subproblems are solved before larger intervals.",
      hints: [
        "What property ensures optimal substructure?",
        "How do you ensure subintervals are computed first?",
      ],
    },
    {
      id: "q-dp-int-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the classic matrix chain multiplication, the recurrence is:",
      options: [
        "dp[i][j] = min_k(dp[i][k] + dp[k+1][j] + p[i]*p[k]*p[j])",
        "dp[i][j] = min(dp[i-1][j], dp[i][j-1])",
        "dp[i][j] = dp[i][j/2] * 2",
        "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
      ],
      correctAnswer: 0,
      explanation:
        "For matrix chain A_i...A_j split at k, cost = cost(left) + cost(right) + multiply dimensions p[i-1]*p[k]*p[j].",
      hints: [
        "Where is the split point?",
        "What dimensions determine multiplication cost?",
      ],
    },
    {
      id: "q-dp-int-3",
      type: "coding",
      difficulty: "hard",
      question: "Implement optimal BST insertion order using DP.",
      options: [],
      correctAnswer: 0,
      explanation:
        "dp[i][j] = min cost of optimal BST for keys i..j, trying each key as root.",
      codeSnippet: `function optimalBST(keys, freq) {
  const n = keys.length;
  const dp = Array(n).fill(null).map(() => Array(n).fill(0));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      let sum = freq.slice(i, j + 1).reduce((a, b) => a + b, 0);
      for (let k = i; k <= j; k++) {
        const cost = (k > i ? dp[i][k - 1] : 0) + (k < j ? dp[k + 1][j] : 0) + sum;
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
}`,
      hints: [
        "Try each key as root",
        "Cost = left cost + right cost + sum of all frequencies in range",
        "Build from smaller to larger intervals",
      ],
    },
    {
      id: "q-dp-int-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "Interval DP always processes intervals in increasing order of length.",
      correctAnswer: "true",
      explanation:
        "To use optimal substructure, all subintervals must be computed before larger intervals that depend on them.",
      hints: [
        "What interval lengths do you start with?",
        "How do you know subproblems are ready?",
      ],
    },
    {
      id: "q-dp-int-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which problem is NOT typically solved with interval DP?",
      options: [
        "Matrix chain multiplication",
        "Optimal BST",
        "Longest common subsequence",
        "Palindrome partitioning",
      ],
      correctAnswer: 2,
      explanation:
        "LCS is solved with 2D DP on string positions, not interval DP. Matrix chain, BST, and palindrome partitioning all have optimal substructure over contiguous intervals.",
      hints: [
        "Is LCS about contiguous substrings?",
        "What defines the subproblems in each case?",
      ],
    },
    {
      id: "q-dp-int-6",
      type: "true-false",
      difficulty: "easy",
      question: "In interval DP, the smallest intervals (single elements) form the base cases.",
      correctAnswer: "true",
      explanation:
        "Interval DP builds up from subintervals of length 1 (single elements) to the full interval.\n\nBase case: $dp[i][i]$ for all $i$ (interval of length 1).\nFill order: increasing interval length $2, 3, \\ldots, n$.\n\nThis ensures all subintervals are computed before the intervals that depend on them.",
      hints: [
        "A single element has no meaningful split point - it is a trivial base case.",
        "Larger intervals are built from smaller ones.",
      ],
    },
  ],

  "dp-graphs": [
    {
      id: "q-dp-graph-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "DAG DP works because:",
      options: [
        "Graph has no cycles",
        "Topological order guarantees dependencies come first",
        "All DAGs have O(1) indegree nodes",
        "DP on DAGs uses BFS",
      ],
      correctAnswer: 1,
      explanation:
        "Topological sort ensures when we process a node, all its predecessors (dependencies) have already been processed.",
      hints: ["What makes DAGs special for DP?", "Why does order matter?"],
    },
    {
      id: "q-dp-graph-2",
      type: "coding",
      difficulty: "hard",
      question: "Implement longest path in DAG using topological sort.",
      options: [],
      correctAnswer: 0,
      explanation:
        "After topological sorting, dp[v] = max(dp[u] + weight(u,v)) for all incoming edges u->v.",
      codeSnippet: `function longestPathDAG(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const indeg = Array(n).fill(0);
  for (const [u, v, w] of edges) {
    adj[u].push([v, w]);
    indeg[v]++;
  }
  const topo = [];
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  while (q.length) {
    const u = q.shift();
    topo.push(u);
    for (const [v, w] of adj[u]) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  const dp = Array(n).fill(-Infinity);
  dp[0] = 0;
  for (const u of topo) {
    for (const [v, w] of adj[u]) {
      dp[v] = Math.max(dp[v], dp[u] + w);
    }
  }
  return Math.max(...dp);
}`,
      hints: [
        "Topological sort first",
        "dp[v] = max over all incoming edges of dp[u] + weight",
        "Initialize source nodes with 0",
      ],
    },
    {
      id: "q-dp-graph-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In DAG DP, if there are multiple topological orders, the result is always the same.",
      correctAnswer: "true",
      explanation:
        "All topological sorts produce valid processing orders because they respect dependencies.",
      hints: [
        "Do different orders change dependencies?",
        "What matters about the order?",
      ],
    },
    {
      id: "q-dp-graph-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of DAG shortest path with V vertices and E edges?",
      options: ["O(V^2)", "O(V + E)", "O(V * E)", "O(E log V)"],
      correctAnswer: 1,
      explanation: "Topological sort is O(V+E), DP pass is O(E), total O(V+E).",
      hints: [
        "What is the cost of topological sort?",
        "How many edges do you process in DP?",
      ],
    },
    {
      id: "q-dp-graph-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For counting paths in a DAG, the recurrence is:",
      options: [
        "dp[v] = sum of dp[u] for all u pointing to v",
        "dp[v] = dp[v-1] * 2",
        "dp[v] = min(dp[u])",
        "dp[v] = 1 for all v",
      ],
      correctAnswer: 0,
      explanation:
        "Number of paths to v = sum of number of paths to all predecessors u that have edges to v.",
      hints: [
        "How do paths to v relate to paths to its predecessors?",
        "Is this additive or multiplicative?",
      ],
    },
    {
      id: "q-dp-graph-6",
      type: "true-false",
      difficulty: "easy",
      question: "Dynamic programming on graphs is only applicable to directed acyclic graphs (DAGs).",
      correctAnswer: "false",
      explanation:
        "DP can be applied to graphs with cycles when combined with appropriate state design.\n\nExamples:\n- **Shortest paths with negative edges**: Bellman-Ford DP works on general graphs\n- **Floyd-Warshall**: all-pairs shortest paths on general graphs\n- **Bitmask DP (TSP)**: works on complete graphs with cycles\n\nThe key is that the DP state must avoid circular dependencies.",
      hints: [
        "DAGs are the simplest case, but DP also works elsewhere.",
        "Think of Bellman-Ford or Floyd-Warshall - both handle cyclic graphs.",
      ],
    },
  ],

  "dp-digit": [
    {
      id: "q-dp-digit-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Digit DP processes digits from:",
      options: [
        "Left (most significant) to right",
        "Right (least significant) to left",
        "Random order",
        "Both simultaneously",
      ],
      correctAnswer: 0,
      explanation:
        "Digit DP typically processes from most significant digit, maintaining tight/loose constraints as it goes.",
      hints: [
        "Which digit is most constrained first?",
        "How do constraints propagate?",
      ],
    },
    {
      id: "q-dp-digit-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'In digit DP, the "tight" flag means:',
      options: [
        "All previous digits match the upper bound exactly",
        "Digit can be anything 0-9",
        "Overflow is allowed",
        "We are in the most significant position",
      ],
      correctAnswer: 0,
      explanation:
        "Tight=true means the prefix so far equals the bound prefix, so current digit cannot exceed the bound digit.",
      hints: [
        "What constrains the current digit when tight?",
        "When does tight become false?",
      ],
    },
    {
      id: "q-dp-digit-3",
      type: "coding",
      difficulty: "hard",
      question:
        "Implement count of numbers divisible by K in range [0, N] using digit DP.",
      options: [],
      correctAnswer: 0,
      explanation:
        "dp[pos][rem][tight] counts valid numbers from pos to end with remainder rem.",
      codeSnippet: `function countDivisible(N, K) {
  const digits = N.toString().split('').map(Number);
  const memo = {};
  function dp(pos, rem, tight) {
    if (pos === digits.length) return rem === 0 ? 1 : 0;
    const key = pos + ',' + rem + ',' + tight;
    if (memo[key] !== undefined) return memo[key];
    const limit = tight ? digits[pos] : 9;
    let count = 0;
    for (let d = 0; d <= limit; d++) {
      const newTight = tight && d === limit;
      count += dp(pos + 1, (rem * 10 + d) % K, newTight);
    }
    memo[key] = count;
    return count;
  }
  return dp(0, 0, true);
}`,
      hints: [
        "Track remainder modulo K at each position",
        "New remainder = (old * 10 + digit) % K",
        "Base case: at end, check if remainder is 0",
      ],
    },
    {
      id: "q-dp-digit-4",
      type: "true-false",
      difficulty: "medium",
      question:
        'In digit DP, leading zeros are typically skipped using a "started" flag.',
      correctAnswer: "true",
      explanation:
        "The started flag tracks whether we have encountered a non-zero digit, allowing proper handling of leading zeros.",
      hints: [
        "How do you distinguish between 0 and 00042?",
        "What does started=false mean?",
      ],
    },
    {
      id: "q-dp-digit-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The number of states in digit DP for N with K digits and modulo M is:",
      options: ["O(K * M)", "O(K * M * 2)", "O(2^K * M)", "O(K + M)"],
      correctAnswer: 1,
      explanation:
        "States are position (K), remainder (M), and tight flag (2). Total O(K * M * 2).",
      hints: ["What variables determine the state?", "Is tight a boolean?"],
    },
    {
      id: "q-dp-digit-6",
      type: "true-false",
      difficulty: "easy",
      question: "Digit DP counts numbers in a range $[0, N]$ satisfying some digit-level constraint.",
      correctAnswer: "true",
      explanation:
        "Digit DP processes numbers digit by digit from the most significant position.\n\nIt counts how many integers in $[0, N]$ satisfy a property (e.g., no two adjacent digits are the same, sum of digits is divisible by $k$, etc.) by tracking a compact state at each position.",
      hints: [
        "We process digits left to right, maintaining necessary state.",
        "The upper bound $N$ constrains valid numbers.",
      ],
    },
  ],

  "dp-probability": [
    {
      id: "q-dp-prob-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Probability DP typically uses:",
      options: [
        "Uniform probability distribution",
        "Bayesian updating",
        "Expectation formulas",
        "Only discrete states",
      ],
      correctAnswer: 1,
      explanation:
        "Probability DP updates beliefs using Bayes theorem as new random events are observed.",
      hints: [
        "How do you update probability of state after observation?",
        "What formula governs this?",
      ],
    },
    {
      id: "q-dp-prob-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For gambler\'s ruin problem with fair coin, probability of reaching N before 0 starting from i is:",
      options: ["i/N", "1 - i/N", "0.5", "Depends on step size"],
      correctAnswer: 0,
      explanation:
        "For fair coin in symmetric random walk, P(reach N before 0 | start i) = i/N.",
      hints: ["Symmetric random walk property", "Expected position is linear"],
    },
    {
      id: "q-dp-prob-3",
      type: "coding",
      difficulty: "hard",
      question: "Implement probability of collecting all N coupons using DP.",
      options: [],
      correctAnswer: 0,
      explanation:
        "dp[i] = expected draws to collect i coupons. Transition accounts for new vs duplicate draws.",
      codeSnippet: `function couponCollector(n) {
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + n / (n - (i - 1));
  }
  return dp[n];
}`,
      hints: [
        "When you have i-1 coupons, probability of new one is (n-i+1)/n",
        "Expected draws for next coupon = n/(n-i+1)",
        "Sum expectations from 1 to n",
      ],
    },
    {
      id: "q-dp-prob-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "In probability DP, the sum of probabilities over all states should always equal 1.",
      correctAnswer: "true",
      explanation:
        "Normalization ensures the probability distribution is valid at each step.",
      hints: [
        "What does a probability distribution sum to?",
        "When does this property help?",
      ],
    },
    {
      id: "q-dp-prob-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The expected number of trials for coupon collector is:",
      options: ["n log n", "n", "n^2", "n!"],
      correctAnswer: 0,
      explanation:
        "Sum of n/(n-i+1) for i=1 to n = n * H_n = n * (log n + gamma) \\approx n log n.",
      hints: ["What is the nth harmonic number H_n?", "How does it grow?"],
    },
    {
      id: "q-dp-prob-6",
      type: "true-false",
      difficulty: "easy",
      question: "In probability DP, $dp[i]$ often stores the probability of being in state $i$ after some number of transitions.",
      correctAnswer: "true",
      explanation:
        "Probability DP tracks the probability distribution over states as random events occur.\n\nFor example, in a random walk:\n- $dp[i]$ = probability of being at position $i$ after $k$ steps\n- Transition: $dp_{k+1}[i] = dp_k[i-1] \\cdot p + dp_k[i+1] \\cdot (1-p)$\n\nNormalization ensures $\\sum_i dp[i] = 1$ at all times.",
      hints: [
        "Probability states sum to 1 across all positions.",
        "Transitions multiply probabilities to propagate through the state space.",
      ],
    },
  ],

  "dp-games": [
    {
      id: "q-dp-game-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In impartial combinatorial games, the Sprague-Grundy theorem states:",
      options: [
        "Every position has a unique mex value",
        "Grundy numbers combine via XOR",
        "Winning positions have Grundy > 0",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "The mex of reachable Grundy values defines the Grundy number. Positions with Grundy=0 are losing; non-zero are winning. Combined games use XOR.",
      hints: [
        "What is mex?",
        "How do you combine subgames?",
        "Who wins if Grundy is 0?",
      ],
    },
    {
      id: "q-dp-game-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "In game DP with perfect play, dp[i] = true if any move leads to a losing position for opponent.",
      correctAnswer: "true",
      explanation:
        "This is the standard minimax DP: winning = exists move to losing; losing = all moves lead to winning.",
      hints: ["What is the base case?", "How do winning/losing alternate?"],
    },
    {
      id: "q-dp-game-3",
      type: "coding",
      difficulty: "hard",
      question:
        "Implement optimal play for stone game: remove 1, 3, or 4 stones, player who takes last wins.",
      options: [],
      correctAnswer: 0,
      explanation:
        "dp[n] = winning if any of dp[n-1], dp[n-3], dp[n-4] is losing (for opponent).",
      codeSnippet: `function canWin(n) {
  const dp = Array(n + 5).fill(false);
  dp[0] = false;  // losing: no stones to take
  for (let i = 1; i <= n; i++) {
    dp[i] = (i >= 1 && !dp[i - 1]) || (i >= 3 && !dp[i - 3]) || (i >= 4 && !dp[i - 4]);
  }
  return dp[n];
}`,
      hints: [
        "Base case: dp[0] = false (nothing to take = losing)",
        "Check moves of 1, 3, 4 stones",
        "Position is winning if ANY move leads to losing for opponent",
      ],
    },
    {
      id: "q-dp-game-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Grundy number for a composite game (sum of independent games) is:",
      options: [
        "Sum of Grundy numbers",
        "Maximum of Grundy numbers",
        "XOR of Grundy numbers",
        "Minimum of Grundy numbers",
      ],
      correctAnswer: 2,
      explanation:
        "The Sprague-Grundy theorem: G = G1 XOR G2 XOR ... XOR Gn for independent subgames.",
      hints: [
        "XOR is to nim-sum what addition is to what?",
        "What makes XOR special for impartial games?",
      ],
    },
    {
      id: "q-dp-game-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In two-player perfect information games, the recurrence dp[state] = winning if:",
      options: [
        "All moves lead to winning states",
        "At least one move leads to losing state",
        "No moves available",
        "Random chance involved",
      ],
      correctAnswer: 1,
      explanation:
        "If there exists a move to a losing position, current is winning (you can force opponent into losing state).",
      hints: [
        'What does "losing position" mean for opponent?',
        "How do you force a win?",
      ],
    },
    {
      id: "q-dp-game-6",
      type: "true-false",
      difficulty: "easy",
      question: "In a two-player game DP, a position is a losing position if all moves from it lead to winning positions for the opponent.",
      correctAnswer: "true",
      explanation:
        "Standard two-player game DP with perfect play:\n- **Losing position**: every available move leads to a winning state for the opponent\n- **Winning position**: at least one move leads to a losing state for the opponent\n\nBase case: a position with no moves is a losing position (the player to move loses).",
      hints: [
        "If every move gives the opponent a winning position, the current player loses.",
        "You win only if you can force the opponent into a losing position.",
      ],
    },
  ],

  "dp-optimization": [
    {
      id: "q-dp-opt-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Divide and Conquer DP optimization requires:",
      options: [
        "Monge array property",
        "Quadrangle inequality",
        "Both monotonicity and opt monotonic",
        "No special property",
      ],
      correctAnswer: 2,
      explanation:
        "The opt(i,j) must be monotonic: opt(i,j) <= opt(i,j+1) and opt(i,j) <= opt(i+1,j). This ensures correct divide and conquer.",
      hints: [
        "What property ensures the recurrence is well-behaved?",
        "Is this always required?",
      ],
    },
    {
      id: "q-dp-opt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Knuth optimization applies when the cost function satisfies:",
      options: [
        "Monge property: c(i,j-1) + c(i+1,j) <= c(i,j) + c(i+1,j-1)",
        "Triangle inequality",
        "Commutativity",
        "Associativity",
      ],
      correctAnswer: 0,
      explanation:
        "The quadrangle inequality (Monge property) + monotonicity of opt enables Knuth optimization with O(n^2) instead of O(n^3).",
      hints: [
        "What inequality defines the Monge property?",
        "What is the key consequence for opt?",
      ],
    },
    {
      id: "q-dp-opt-3",
      type: "coding",
      difficulty: "hard",
      question: "Implement divide and conquer DP for O(n log n) optimization.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Recursively compute dp for range [l,r] with opt in [optL, optR].",
      codeSnippet: `function divideConquerDP(n, getCost) {
  const dp = Array(n + 1).fill(0);
  const opt = Array(n + 1).fill(0);
  function compute(l, r, optL, optR) {
    if (l > r) return;
    const mid = (l + r) >> 1;
    let bestK = -1, bestVal = Infinity;
    for (let k = optL; k <= Math.min(mid, optR); k++) {
      const val = dp[k] + getCost(k, mid);
      if (val < bestVal) { bestVal = val; bestK = k; }
    }
    dp[mid] = bestVal;
    opt[mid] = bestK;
    compute(l, mid - 1, optL, bestK);
    compute(mid + 1, r, bestK, optR);
  }
  compute(1, n, 1, n);
  return dp[n];
}`,
      hints: [
        "Assume opt is monotonic",
        "For dp[mid], only try k in valid range",
        "Recurse on left with updated opt bounds",
      ],
    },
    {
      id: "q-dp-opt-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "Monotone queue optimization is used for DP of the form dp[i] = min/max over j in sliding window.",
      correctAnswer: "true",
      explanation:
        "When the valid range for j is a moving window, monotone queue maintains candidate minima/maxima in O(1) amortized.",
      hints: [
        "What is the structure of valid j for each i?",
        "How does a deque help?",
      ],
    },
    {
      id: "q-dp-opt-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which optimization reduces O(n^3) to O(n^2) for optimal BST?",
      options: [
        "Knuth optimization",
        "Divide and conquer",
        "Monotone queue",
        "None can reduce it further",
      ],
      correctAnswer: 0,
      explanation:
        "Knuth optimization reduces O(n^3) to O(n^2) when cost satisfies quadrangle inequality.",
      hints: [
        "What is the complexity of naive optimal BST?",
        "Which optimization applies to it?",
      ],
    },
    {
      id: "q-dp-opt-6",
      type: "true-false",
      difficulty: "easy",
      question: "A standard 2D DP table of size $n \\times n$ can often be reduced to $O(n)$ space by observing that only the previous row is needed.",
      correctAnswer: "true",
      explanation:
        "Many 2D DP recurrences of the form $dp[i][j] = f(dp[i-1][\\ldots])$ only reference the immediately preceding row.\n\nIn such cases, we can replace the $n \\times n$ table with two 1D arrays (current and previous rows), reducing space from $O(n^2)$ to $O(n)$.\n\nExample: LCS, Longest Common Substring, 0/1 Knapsack.",
      hints: [
        "Look at which rows $dp[i][j]$ depends on.",
        "If only $dp[i-1][\\ldots]$ is needed, keep just two rows.",
      ],
    },
  ],

  "dp-strings": [
    {
      id: "q-dp-str-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Edit distance (Levenshtein) DP recurrence is:",
      options: [
        "dp[i][j] = min of 3 options: insert, delete, replace",
        "dp[i][j] = dp[i-1][j-1] if match else 1",
        "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
        "dp[i][j] = LCS length",
      ],
      correctAnswer: 0,
      explanation:
        "Edit distance considers 3 operations: insert (dp[i][j-1]+1), delete (dp[i-1][j]+1), replace (dp[i-1][j-1]+cost).",
      hints: [
        "What are the 3 fundamental string operations?",
        "When do you add 0 vs 1 for replace?",
      ],
    },
    {
      id: "q-dp-str-2",
      type: "coding",
      difficulty: "hard",
      question:
        "Implement longest common subsequence with O(m*n) time and O(min(m,n)) space.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Use two rows: dp[j] = LCS length using previous row and current row.",
      codeSnippet: `function lcs(s, t) {
  if (s.length < t.length) [s, t] = [t, s];
  const m = s.length, n = t.length;
  let prev = Array(n + 1).fill(0), curr = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      curr[j] = s[i-1] === t[j-1] ? prev[j-1] + 1 : Math.max(prev[j], curr[j-1]);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}`,
      hints: [
        "Only need previous row to compute current row",
        "When characters match, extend diagonal value",
        "When they differ, take max of top and left",
      ],
    },
    {
      id: "q-dp-str-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In string DP, dp[i][j] typically represents optimal solution for prefixes of length i and j.",
      correctAnswer: "true",
      explanation:
        "The 2D DP table is built incrementally, where cell (i,j) represents the optimal answer for s1[0..i-1] and s2[0..j-1].",
      hints: [
        "Why i-1 and j-1 and not i and j?",
        "What does dp[0][j] or dp[i][0] represent?",
      ],
    },
    {
      id: "q-dp-str-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For wildcard pattern matching with * and ?, the DP has states:",
      options: [
        "dp[i][j] only",
        "dp[i][j] + isAllWildcards flag",
        "dp[i][j] + isExactMatch flag",
        "dp[i][j] + position tracker",
      ],
      correctAnswer: 0,
      explanation:
        "Standard wildcard matching: dp[i][j] = can pattern[0..j-1] match string[0..i-1]. Transitions handle * (0+ or 1+) and ? (any single).",
      hints: [
        "What does * mean?",
        "What does ? mean?",
        "How do you handle them in DP?",
      ],
    },
    {
      id: "q-dp-str-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The space complexity of standard LCS can be reduced from O(mn) to O(min(m,n)) by:",
      options: [
        "Using only 2 rows instead of full table",
        "Storing only non-zero values",
        "Using suffix arrays",
        "Compression with run-length encoding",
      ],
      correctAnswer: 0,
      explanation:
        "Since dp[i][j] only depends on dp[i-1][j-1], dp[i-1][j], and dp[i][j-1], only previous row is needed.",
      hints: [
        "What values does current cell depend on?",
        "What row can be reused?",
      ],
    },
    {
      id: "q-dp-str-6",
      type: "true-false",
      difficulty: "easy",
      question: "The edit distance between two identical strings is 0.",
      correctAnswer: "true",
      explanation:
        "Edit distance (Levenshtein distance) counts the minimum number of insertions, deletions, and substitutions to transform one string into another.\n\nIf both strings are identical, no operations are needed: edit distance = 0.\n\nBase case in DP: $dp[0][0] = 0$ (empty prefix to empty prefix).",
      hints: [
        "How many edits are needed to change \"hello\" into \"hello\"?",
        "No operations needed = distance 0.",
      ],
    },
  ],

  "dp-bitmask": [
    {
      id: "q-dp-bm-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Bitmask DP is particularly useful for problems where:",
      options: [
        "Elements can be in only 2 states (in/out)",
        "Set cover, TSP, Hamiltonian path",
        "All answers are powers of 2",
        "Bitwise operations are required",
      ],
      correctAnswer: 1,
      explanation:
        "Bitmask DP excels at combinatorial optimization on subsets: TSP, Hamiltonian Path, set cover all fit this pattern.",
      hints: [
        "What does a bitmask represent?",
        "How many subsets of n elements?",
      ],
    },
    {
      id: "q-dp-bm-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A subset mask with all bits set (1..1) means all elements are included.",
      correctAnswer: "true",
      explanation:
        "(1 << n) - 1 in binary is n ones, representing the full set.",
      hints: [
        "What is (1 << 3) - 1 in binary?",
        "How do you represent a full set?",
      ],
    },
    {
      id: "q-dp-bm-3",
      type: "coding",
      difficulty: "hard",
      question:
        "Implement minimum Hamiltonian cycle visiting all nodes exactly once using bitmask DP.",
      options: [],
      correctAnswer: 0,
      explanation:
        "dp[mask][i] = min cost to visit set mask ending at i. dp[mask | (1<<j)][j] = min(dp[mask][i] + dist[i][j]).",
      codeSnippet: `function minHamiltonian(dist) {
  const n = dist.length;
  const dp = Array(1 << n).fill(null).map(() => Array(n).fill(Infinity));
  dp[1][0] = 0; // Start at node 0 with only node 0 visited
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i))) continue;
      const prevMask = mask ^ (1 << i);
      if (prevMask === 0) continue;
      for (let j = 0; j < n; j++) {
        if (!(prevMask & (1 << j))) continue;
        dp[mask][i] = Math.min(dp[mask][i], dp[prevMask][j] + dist[j][i]);
      }
    }
  }
  const fullMask = (1 << n) - 1;
  let minCycle = Infinity;
  for (let i = 1; i < n; i++) {
    minCycle = Math.min(minCycle, dp[fullMask][i] + dist[i][0]);
  }
  return minCycle;
}`,
      hints: [
        "Start from node 0",
        "Build up subsets by adding one node at a time",
        "Close the cycle by returning to node 0",
      ],
    },
    {
      id: "q-dp-bm-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For Hamiltonian Path (not cycle), the final answer is:",
      options: [
        "dp[fullMask][any_i]",
        "dp[fullMask][0] only",
        "min over dp[fullMask][i]",
        "max over dp[fullMask][i]",
      ],
      correctAnswer: 2,
      explanation:
        "Path can end at any node, so answer is min over all dp[fullMask][i] for valid endpoints.",
      hints: [
        "Does a path have fixed start and end?",
        "Can the path end anywhere?",
      ],
    },
    {
      id: "q-dp-bm-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of bitmask DP for TSP/Hamiltonian?",
      options: ["O(n!)", "O(n^2 * 2^n)", "O(2^n)", "O(n * 2^n)"],
      correctAnswer: 1,
      explanation:
        "We have 2^n masks, n ending cities, and O(n) transition per state: O(n^2 * 2^n).",
      hints: [
        "How many masks?",
        "How many i values per mask?",
        "Inner loop cost?",
      ],
    },
    {
      id: "q-dp-bm-6",
      type: "true-false",
      difficulty: "easy",
      question: "In bitmask DP with $n$ elements, the number of distinct states (masks) is $2^n$.",
      correctAnswer: "true",
      explanation:
        "Each element can either be included (bit = 1) or excluded (bit = 0). With $n$ independent binary choices, there are $2^n$ possible masks.\n\nFor $n = 20$: $2^{20} \\approx 10^6$ masks, which is feasible. For $n = 30$: $2^{30} \\approx 10^9$, too large for most problems.",
      hints: [
        "Each of $n$ bits is independently 0 or 1.",
        "$2^n$ total combinations.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
