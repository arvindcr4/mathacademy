import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "climbing-stairs": [
    {
      id: "q-cs-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Climbing 1 or 2 steps at a time, ways to reach step n follows:",
      options: ["Fibonacci", "Factorial", "Binary", "Harmonic"],
      correctAnswer: 0,
      explanation:
        "dp[i] = dp[i-1] + dp[i-2]. Same recurrence as Fibonacci. dp[1]=1, dp[2]=2.",
      hints: [
        "Write the recurrence by looking at the final move into step n.",
        "You can arrive from step n-1 or from step n-2, so the counts add.",
      ],
    },
    {
      id: "q-cs-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Ways to climb 4 steps:",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1,
      explanation:
        "dp[1]=1, dp[2]=2, dp[3]=3, dp[4]=5. Sequences: (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), (2,2).",
      hints: [
        "Build the values from the bottom up: 1, 2, 3, ...",
        "Use dp[4] = dp[3] + dp[2] or enumerate the five valid sequences.",
      ],
    },
    {
      id: "q-cs-3",
      type: "true-false",
      difficulty: "medium",
      question: "dp[i] = dp[i-1] + dp[i-2] for i >= 3.",
      correctAnswer: "true",
      explanation:
        "From step i, last move was either 1 step (from i-1) or 2 steps (from i-2). Sum both ways.",
      hints: [
        "Think about the final move into step i.",
        "Every valid path ends with either a 1-step move or a 2-step move.",
      ],
    },
    {
      id: "q-cs-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time complexity with memoization:",
      options: ["O(1)", "O(n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 1,
      explanation:
        "Each subproblem dp[i] computed once. n subproblems × O(1) each = O(n) total.",
      hints: [
        "Memoization prevents recomputing the same step count.",
        "There are n distinct states and each one does O(1) combine work.",
      ],
    },
    {
      id: "q-cs-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If you can climb 1, 2, or 3 steps, dp[4] = ?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation:
        "dp[1]=1, dp[2]=2, dp[3]=4 (1+2+3 or 1+1+2 or 1+1+1+1 or 2+2 or 3+1). dp[4]=dp[3]+dp[2]+dp[1]=4+2+1=7.",
      hints: [
        "With step sizes 1, 2, and 3, the recurrence uses the previous three states.",
        "Use dp[4] = dp[3] + dp[2] + dp[1] with base values 4, 2, and 1.",
      ],
    },
    {
      id: "q-cs-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Space optimization for climbing stairs uses:",
      options: [
        "O(n) array",
        "O(1) two variables",
        "O(log n) space",
        "O(n log n)",
      ],
      correctAnswer: 1,
      explanation:
        "Only need previous two values. Keep prev1 and prev2, update iteratively. O(1) space.",
      hints: [
        "Look at how many previous DP values the recurrence actually needs.",
        "If only the last two states matter, the full table is unnecessary.",
      ],
    },
  ],

  "coin-change": [
    {
      id: "q-cc-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Coin change (minimum coins) recurrence:",
      options: [
        "dp[i] = min(dp[i], dp[i-coin] + 1)",
        "dp[i] = dp[i-coin] + 1",
        "dp[i] = max(dp[i], dp[i-coin] + 1)",
        "dp[i] = coin count",
      ],
      correctAnswer: 0,
      explanation:
        "For each coin, try using it: dp[i] = min(dp[i], dp[i-coin] + 1). Initialize dp[0]=0, others=∞.",
      hints: [
        "State = minimum coins needed to form amount i.",
        "For each coin c, ask whether 1 + dp[i-c] improves the best answer.",
      ],
    },
    {
      id: "q-cc-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For coins [1,2,5] and amount=11, minimum coins:",
      options: ["2", "3", "5", "11"],
      correctAnswer: 1,
      explanation:
        "11 = 5 + 5 + 1 (3 coins). Could also do 2+2+2+2+2+1 = 6 coins. Best is 3.",
      hints: [
        "Try to form 11 with the fewest pieces, not just any decomposition.",
        "Two 5s and one 1 reach 11 using only three coins.",
      ],
    },
    {
      id: "q-cc-3",
      type: "true-false",
      difficulty: "easy",
      question: "dp[i] represents minimum coins to make amount i.",
      correctAnswer: "true",
      explanation:
        "Tabular DP: dp[j] = min coins for amount j. dp[0] = 0 (base case).",
      hints: [
        "Interpret the DP state before using the recurrence.",
        "dp[0] = 0 and every larger amount stores the best count found so far.",
      ],
    },
    {
      id: "q-cc-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If amount cannot be formed, dp[amount] equals:",
      options: ["0", "-1", "Infinity (represented as amount+1)", "amount"],
      correctAnswer: 2,
      explanation:
        'Use amount+1 as "infinity" sentinel. Final check: if dp[amount] > amount, return -1 (impossible).',
      hints: [
        "Impossible states start as a sentinel larger than any real answer.",
        "If no transition improves dp[amount], it stays at infinity.",
      ],
    },
    {
      id: "q-cc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Unbounded coin change time complexity:",
      options: ["O(amount)", "O(amount × coins)", "O(coins)", "O(2^amount)"],
      correctAnswer: 1,
      explanation:
        "Outer loop over amounts (1 to target), inner loop over coins. O(amount × len(coins)).",
      hints: [
        "There is one dimension for amounts and one for coin types.",
        "Each amount checks every available coin once.",
      ],
    },
  ],

  "house-robber": [
    {
      id: "q-hr-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "House Robber recurrence:",
      options: [
        "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
        "dp[i] = dp[i-1] + nums[i]",
        "dp[i] = min(dp[i-1], dp[i-2] + nums[i])",
        "dp[i] = nums[i] + nums[i-1]",
      ],
      correctAnswer: 0,
      explanation:
        "At house i, either skip (dp[i-1]) or rob (dp[i-2] + nums[i]). Take max.",
      hints: [
        "At each house, choose between skipping it and robbing it.",
        "Robbing house i forces you to combine nums[i] with dp[i-2].",
      ],
    },
    {
      id: "q-hr-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For nums=[2,7,9,3,1], max robbed:",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "Rob houses 0,2,4: 2+9+1=12. Or 1,3: 7+3=10. 12 is optimal.",
      hints: [
        "Try the best non-adjacent combinations explicitly.",
        "Houses 0, 2, and 4 give 2 + 9 + 1.",
      ],
    },
    {
      id: "q-hr-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Cannot rob adjacent houses means circular adjacency for House Robber II.",
      correctAnswer: "true",
      explanation:
        "House Robber II: houses form circle. Solution: max(rob[0..n-2], rob[1..n-1]). Exclude first or last house.",
      hints: [
        "In House Robber II, the first and last houses are adjacent.",
        "Solve two linear cases: exclude the first house or exclude the last house.",
      ],
    },
    {
      id: "q-hr-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Space optimized House Robber uses:",
      options: [
        "O(n) array",
        "O(1) two variables",
        "O(log n) stack",
        "O(1) single variable",
      ],
      correctAnswer: 1,
      explanation:
        "Only need prev1 = dp[i-1] and prev2 = dp[i-2]. Update iteratively. O(1) space.",
      hints: [
        "The recurrence only references the previous two answers.",
        "Rolling values for dp[i-1] and dp[i-2] are enough.",
      ],
    },
    {
      id: "q-hr-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Base cases for House Robber:",
      options: [
        "dp[0]=0",
        "dp[1]=nums[0]",
        "Both A and B",
        "dp[0]=nums[0], dp[1]=max(nums[0],nums[1])",
      ],
      correctAnswer: 3,
      explanation:
        "dp[0]=nums[0] (only house 0). dp[1]=max(nums[0], nums[1]) (rob house 0 or house 1, not both).",
      hints: [
        "Start by solving the one-house and two-house cases.",
        "With two houses, you must choose the larger value because you cannot rob both.",
      ],
    },
  ],

  "longest-increasing-subsequence": [
    {
      id: "q-lis-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "LIS binary search approach time complexity:",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "dp[i] = length of LIS ending at i. Binary search to find position in sorted tails array. O(n log n).",
      hints: [
        "The tails array stays sorted by ending value.",
        "Each new element uses binary search to update one tails position.",
      ],
    },
    {
      id: "q-lis-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For [10,9,2,5,3,7,101,18], LIS length:",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "LIS = [2,3,7,101] or [2,3,7,18]. Length 4.",
      hints: [
        "The subsequence must be increasing but does not need to be contiguous.",
        "One valid LIS is [2,3,7,18].",
      ],
    },
    {
      id: "q-lis-3",
      type: "true-false",
      difficulty: "easy",
      question: "LIS strictly increasing means equal elements do not count.",
      correctAnswer: "true",
      explanation:
        "Strictly increasing subsequence requires each element > previous. Equal elements form non-increasing.",
      hints: [
        "Strict means every next value must be larger, not equal.",
        "Duplicate values cannot extend a strictly increasing subsequence.",
      ],
    },
    {
      id: "q-lis-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Binary search in LIS uses:",
      options: [
        "Stack",
        "Binary indexed tree",
        "Sorted array of tails",
        "Heap",
      ],
      correctAnswer: 2,
      explanation:
        "tails[i] = smallest ending value of LIS of length i+1. Binary search to find position to replace.",
      hints: [
        "tails[len-1] stores the smallest possible ending value for that length.",
        "Binary search finds the first tails entry that is >= the current number.",
      ],
    },
    {
      id: "q-lis-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To reconstruct LIS, you need:",
      options: [
        "Just tails array",
        "Parent tracking array",
        "Both tails and predecessor",
        "Original array only",
      ],
      correctAnswer: 2,
      explanation:
        "Track predecessor index for each element. When updating tails, record prev[i]. Backtrack from last element to reconstruct.",
      hints: [
        "The tails array gives lengths but not the chosen path.",
        "Store predecessor links so you can backtrack the subsequence at the end.",
      ],
    },
  ],

  "word-break": [
    {
      id: "q-wb-1",
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
      id: "q-wb-2",
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
      id: "q-wb-3",
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
      id: "q-wb-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DP solution time complexity:",
      options: ["O(n)", "O(n²)", "O(n × maxWordLength)", "O(2ⁿ)"],
      correctAnswer: 2,
      explanation:
        "For each i, try up to maxWordLength substrings. O(n × L) where L = max word length.",
      hints: [
        "There are n end positions to consider.",
        "At each position, you only need to test substrings up to the maximum word length.",
      ],
    },
    {
      id: "q-wb-5",
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
  ],

  // ── NUMBER THEORY ────────────────────────────────────────────────
  "prime-sieve": [
    {
      id: "q-nt-sieve-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the time complexity of the Sieve of Eratosthenes to find all primes up to n?",
      options: ["O(n)", "O(n log log n)", "O(n log n)", "O(n^2)"],
      correctAnswer: 1,
      explanation: "The Sieve of Eratosthenes runs in O(n log log n) time.",
    },
    {
      id: "q-nt-sieve-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The Sieve of Eratosthenes only works for finding primes up to a fixed limit n.",
      correctAnswer: "true",
      explanation:
        "The Sieve requires knowing n upfront to allocate the array and mark multiples.",
    },
    {
      id: "q-nt-sieve-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which optimization skips marking multiples of primes that are less than the square root of n?",
      options: [
        "Only odd numbers optimization",
        "Wheel factorization",
        "Segmented sieve",
        "No optimization needed",
      ],
      correctAnswer: 2,
      explanation:
        "In the segmented sieve, we only mark multiples of primes up to sqrt(n) in each segment.",
    },
    {
      id: "q-nt-sieve-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What does isPrime[i] represent after the Sieve finishes?",
      options: [
        "i is prime",
        "i is composite",
        "i is either prime or composite",
        "i is neither prime nor composite",
      ],
      correctAnswer: 0,
      explanation:
        "After the Sieve completes, isPrime[i] correctly indicates whether i is prime for all i <= n.",
    },
    {
      id: "q-nt-sieve-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Sieve can be modified to generate all prime factors of numbers up to n in O(n log log n).",
      correctAnswer: "false",
      explanation:
        "Finding prime factors requires more work; the Sieve only tells us if a number is prime, not its factors.",
    },
  ],
  "prime-factorization": [
    {
      id: "q-nt-pf-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the prime factorization of 360?",
      options: [
        "2^3 × 3^2 × 5",
        "2^2 × 3^2 × 5",
        "2^3 × 3 × 5^2",
        "2 × 3^3 × 5",
      ],
      correctAnswer: 0,
      explanation: "360 = 8 × 45 = 2^3 × 9 × 5 = 2^3 × 3^2 × 5.",
    },
    {
      id: "q-nt-pf-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the time complexity of trial division up to sqrt(n)?",
      options: ["O(sqrt(n))", "O(n)", "O(log n)", "O(n log n)"],
      correctAnswer: 0,
      explanation:
        "We try dividing by all numbers up to sqrt(n) in the worst case.",
    },
    {
      id: "q-nt-pf-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prime factorization of a number is unique up to the order of factors.",
      correctAnswer: "true",
      explanation:
        "This is the Fundamental Theorem of Arithmetic - every integer > 1 has a unique prime factorization.",
    },
    {
      id: "q-nt-pf-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Using Sieve to precompute smallest prime factor (SPF) allows factorization in:",
      options: [
        "O(log n) per query",
        "O(sqrt(n)) per query",
        "O(n) per query",
        "O(1) per query",
      ],
      correctAnswer: 0,
      explanation:
        "With SPF array, we can divide n by its SPF repeatedly, giving O(log n) factorization.",
    },
    {
      id: "q-nt-pf-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How many distinct prime factors does 2^10 × 3^5 × 7 have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation:
        "The distinct primes are 2, 3, and 7 - three distinct prime factors.",
    },
  ],
  "gcd-lcm": [
    {
      id: "q-nt-gcd-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "gcd(a, b) × lcm(a, b) = ?",
      options: ["a + b", "a - b", "a × b", "max(a, b)"],
      correctAnswer: 2,
      explanation:
        "The identity gcd(a,b) × lcm(a,b) = a × b holds for all integers a and b.",
    },
    {
      id: "q-nt-gcd-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "gcd(a, b) = gcd(b, a mod b) is the basis of the Euclidean algorithm.",
      correctAnswer: "true",
      explanation:
        "Euclidean algorithm recursively applies gcd(a, b) = gcd(b, a % b) until b = 0.",
    },
    {
      id: "q-nt-gcd-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is gcd(48, 18)?",
      options: ["6", "8", "12", "24"],
      correctAnswer: 0,
      explanation: "48 = 2×24, 18 = 2×9, gcd(48,18) = 2×gcd(24,9) = 2×3 = 6.",
    },
    {
      id: "q-nt-gcd-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "If a divides bc and gcd(a, b) = 1, then:",
      options: ["a divides c", "a divides b", "a divides bc", "a = bc"],
      correctAnswer: 0,
      explanation:
        "This is Euclid\'s lemma: if prime p divides ab and p does not divide a, then p divides b.",
    },
    {
      id: "q-nt-gcd-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The extended Euclidean algorithm finds integers x, y such that ax + by = gcd(a, b). What is x for a=35, b=15?",
      options: ["1", "-1", "2", "-2"],
      correctAnswer: 1,
      explanation: "35 × (-1) + 15 × 3 = -35 + 45 = 10 = gcd(35, 15).",
    },
    {
      id: "q-nt-gcd-6",
      type: "true-false",
      difficulty: "hard",
      question:
        "gcd(a, b) can be computed in O(log min(a, b)) time using the Euclidean algorithm.",
      correctAnswer: "true",
      explanation:
        "The Euclidean algorithm runs in logarithmic time since the numbers reduce quickly.",
    },
  ],
  "modular-arithmetic": [
    {
      id: "q-nt-mod-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "(a + b) mod n = ?",
      options: [
        "(a mod n) + (b mod n)",
        "(a + b) mod n",
        "a + (b mod n)",
        "Depends on a and b",
      ],
      correctAnswer: 0,
      explanation:
        "Modular addition: ((a % n) + (b % n)) % n gives the same result as (a + b) % n.",
    },
    {
      id: "q-nt-mod-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In modular arithmetic, (a × b) mod n = ((a mod n) × (b mod n)) mod n.",
      correctAnswer: "true",
      explanation:
        "Modular multiplication also distributes: (a % n) × (b % n) % n = (a × b) % n.",
    },
    {
      id: "q-nt-mod-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is 17^5 mod 7 using repeated squaring?",
      options: ["2", "3", "5", "1"],
      correctAnswer: 0,
      explanation: "17 ≡ 3 (mod 7), 3^2=9≡2, 3^4≡4, 3^5≡3×4=12≡5 mod 7.",
    },
    {
      id: "q-nt-mod-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For what values of n does a modular inverse of a exist?",
      options: [
        "All n",
        "Only when gcd(a, n) = 1",
        "Only when n is prime",
        "Only when a < n",
      ],
      correctAnswer: 1,
      explanation:
        "Modular inverse of a mod n exists iff gcd(a, n) = 1 (a and n are coprime).",
    },
    {
      id: "q-nt-mod-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Fermat little theorem states: if p is prime, then a^p ≡ a (mod p) for all a.",
      correctAnswer: "true",
      explanation:
        "Fermat\'s Little Theorem: a^p ≡ a (mod p) for all integers a when p is prime.",
    },
  ],
  "fermat-little-theorem": [
    {
      id: "q-nt-flt-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Fermat\'s Little Theorem states: for prime p and integer a not divisible by p:",
      options: [
        "a^p ≡ 1 (mod p)",
        "a^p ≡ a (mod p)",
        "a^(p-1) ≡ 1 (mod p)",
        "ap ≡ a (mod p)",
      ],
      correctAnswer: 2,
      explanation:
        "The common form: a^(p-1) ≡ 1 (mod p) when p is prime and gcd(a,p)=1.",
    },
    {
      id: "q-nt-flt-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Fermat\'s Little Theorem can be used to test primality with certainty.",
      correctAnswer: "false",
      explanation:
        "Carmichael numbers fool Fermat primality test - it only gives probabilistic primality testing.",
    },
    {
      id: "q-nt-flt-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is 2^10 mod 11 using Fermat little theorem?",
      options: ["1", "10", "5", "3"],
      correctAnswer: 0,
      explanation:
        "2^10 ≡ 1 (mod 11) by FLT since 11 is prime and 2 is not divisible by 11.",
    },
    {
      id: "q-nt-flt-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using FLT, if p is prime and a^(p-1) ≡ 1 (mod p), then:",
      options: [
        "p is definitely prime",
        "p is probably prime",
        "a is definitely prime",
        "a is probably prime",
      ],
      correctAnswer: 1,
      explanation:
        "If the test fails, p is composite. If it passes, p is probably prime (needs more tests).",
    },
    {
      id: "q-nt-flt-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Miller-Rabin primality test is a deterministic version of Fermat method.",
      correctAnswer: "false",
      explanation:
        "Miller-Rabin is probabilistic but can be made deterministic for certain range of numbers.",
    },
  ],
  "euler-totient": [
    {
      id: "q-nt-euler-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "φ(n) counts the number of integers 1 to n-1 that are:",
      options: [
        "Divisible by n",
        "Prime to n",
        "Greater than n/2",
        "Even numbers",
      ],
      correctAnswer: 1,
      explanation:
        "Euler\'s totient function φ(n) counts integers in [1, n] that are coprime to n.",
    },
    {
      id: "q-nt-euler-2",
      type: "true-false",
      difficulty: "easy",
      question: "If p is prime, then φ(p) = p - 1.",
      correctAnswer: "true",
      explanation:
        "All numbers 1 to p-1 are coprime to prime p, so φ(p) = p - 1.",
    },
    {
      id: "q-nt-euler-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is φ(12)?",
      options: ["4", "6", "8", "10"],
      correctAnswer: 0,
      explanation: "Numbers coprime to 12 are {1, 5, 7, 11} - only 4 numbers.",
    },
    {
      id: "q-nt-euler-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "If n = p^a × q^b (p, q distinct primes), φ(n) = ?",
      options: ["(p^a - 1)(q^b - 1)", "n(1-1/p)(1-1/q)", "p^a + q^b - 2", "pq"],
      correctAnswer: 1,
      explanation:
        "For n = p^a × q^b, φ(n) = n × (1 - 1/p) × (1 - 1/q) = p^a q^b (1-1/p)(1-1/q).",
    },
    {
      id: "q-nt-euler-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Euler\'s theorem states a^φ(n) ≡ 1 (mod n) when gcd(a, n) = 1.",
      correctAnswer: "true",
      explanation:
        "Euler\'s theorem generalizes Fermat\'s Little Theorem to any modulus n (not just prime).",
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
        "C(n, k) = C(n, n-k) follows from the symmetry of binomial coefficients.",
    },
    {
      id: "q-nt-binom-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "C(n, k) = C(n-1, k-1) + C(n-1, k) is the Pascal triangle recurrence.",
      correctAnswer: "true",
      explanation:
        "This is the fundamental recurrence that generates Pascal triangle.",
    },
    {
      id: "q-nt-binom-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is C(5, 2)?",
      options: ["5", "10", "15", "20"],
      correctAnswer: 1,
      explanation: "C(5, 2) = 5! / (2! × 3!) = 120 / (2 × 6) = 10.",
    },
    {
      id: "q-nt-binom-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The sum of all binomial coefficients for (a + b)^n is:",
      options: ["2^n", "n^2", "n!", "2n"],
      correctAnswer: 0,
      explanation: "Setting a = b = 1: (1+1)^n = 2^n = sum of all C(n, k).",
    },
    {
      id: "q-nt-binom-5",
      type: "true-false",
      difficulty: "hard",
      question: "Computing C(n, k) using dynamic programming is O(n × k).",
      correctAnswer: "true",
      explanation:
        "DP builds Pascal triangle row by row, requiring O(n × k) time and space.",
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
        "Catalan numbers count binary trees, parenthesizations, Dyck paths, and many more structures.",
    },
    {
      id: "q-nt-catalan-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "C_n = (2n)! / ((n+1)! × n!) is the closed form for Catalan numbers.",
      correctAnswer: "true",
      explanation:
        "This is the binomial coefficient formula: C_n = C(2n, n) / (n+1).",
    },
    {
      id: "q-nt-catalan-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is C_3 (third Catalan number)?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 2,
      explanation: "C_3 = C(6, 3) / 4 = 20 / 4 = 5.",
    },
    {
      id: "q-nt-catalan-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The recurrence C_n = sum(C_i × C_{n-1-i}) is called:",
      options: [
        "Convolution recurrence",
        "Catalan recurrence",
        "Nested recurrence",
        "Binary recurrence",
      ],
      correctAnswer: 0,
      explanation:
        "The Catalan recurrence uses convolution of previous Catalan numbers.",
    },
    {
      id: "q-nt-catalan-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Catalan numbers grow exponentially as ~4^n / (n^(3/2) × sqrt(pi)).",
      correctAnswer: "true",
      explanation:
        "Catalan numbers have exponential growth rate approximately 4^n / (n^(3/2) × sqrt(pi)).",
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
      explanation: "This is the standard Fibonacci sequence definition.",
    },
    {
      id: "q-nt-fib-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "F_n ≈ φ^n / sqrt(5) where φ = (1 + sqrt(5)) / 2 is Binet formula.",
      correctAnswer: "true",
      explanation:
        "Binet\'s formula expresses Fibonacci numbers using the golden ratio φ.",
    },
    {
      id: "q-nt-fib-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Computing F_n using naive recursion is:",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 2,
      explanation:
        "Naive recursion computes the same Fibonacci numbers exponentially many times.",
    },
    {
      id: "q-nt-fib-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using matrix exponentiation, F_n can be computed in:",
      options: ["O(n)", "O(log n)", "O(2^n)", "O(n^2)"],
      correctAnswer: 1,
      explanation:
        "Matrix [[1,1],[1,0]]^n gives F_n in O(log n) using exponentiation.",
    },
    {
      id: "q-nt-fib-5",
      type: "true-false",
      difficulty: "hard",
      question: "The sum of first n Fibonacci numbers equals F_{n+2} - 1.",
      correctAnswer: "true",
      explanation:
        "Sum_{i=0}^{n} F_i = F_{n+2} - 1 can be proven by induction.",
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
        "Binary exponentiation halves the exponent at each step, giving O(log n).",
    },
    {
      id: "q-nt-power-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In binary exponentiation, if n is even we square the base; if odd we multiply by base and reduce exponent.",
      correctAnswer: "true",
      explanation:
        "Even: a^n = (a^{n/2})^2. Odd: a^n = a × a^{n-1} = a × (a^{(n-1)/2})^2.",
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
        "3^13 = 1594323 - binary exponentiation computes this efficiently in ~5 multiplications.",
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
        "To prevent overflow, apply modulo after each multiplication: (a × b) mod m = ((a mod m) × (b mod m)) mod m.",
    },
    {
      id: "q-nt-power-5",
      type: "true-false",
      difficulty: "hard",
      question:
        "Matrix exponentiation uses the same binary exponentiation principle as scalar exponentiation.",
      correctAnswer: "true",
      explanation:
        "Matrix multiplication is associative, so we can apply binary exponentiation to matrices.",
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
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation:
        "Binary search halves the search space each iteration, giving O(log n) time complexity.",
      hints: [
        "Search space reduces by half each step",
        "Divide and conquer pattern",
      ],
    },
    {
      id: "q-dc-binary-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a rotated sorted array [4,5,6,7,0,1,2], what is the minimum element?",
      options: ["0", "1", "4", "7"],
      correctAnswer: 0,
      explanation:
        "The minimum element in a rotated sorted array is the pivot point where the rotation occurred. Here it is 0.",
      hints: [
        "Look for the point where sequence breaks",
        "Pivot is the smallest element",
      ],
    },
    {
      id: "q-dc-binary-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Binary search can be implemented iteratively with O(1) space complexity.",
      correctAnswer: "true",
      explanation:
        "Iterative binary search uses only pointers (left, right, mid) requiring O(1) space, while recursive implementation requires O(log n) call stack space.",
      hints: [
        "Loop-based approach needs no extra space",
        "Recursive version uses call stack",
      ],
    },
    {
      id: "q-dc-binary-4",
      type: "coding",
      difficulty: "medium",
      question:
        "Implement binary search to find target in rotated sorted array.",
      codeSnippet: `function searchRotated(nums: number[], target: number): number {
  // Returns index of target, or -1 if not found
}`,
      correctAnswer: 0,
      explanation:
        "Modified binary search: at each step, determine which half is sorted, then check if target lies in that half.",
      hints: [
        "Check which half is normally ordered",
        "Compare target with boundaries",
      ],
    },
  ],

  "merge-sort-divide": [
    {
      id: "q-dc-merge-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the time complexity of merge sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation:
        "Merge sort divides the array in half (log n divisions) and merges each division (O(n) per level), giving O(n log n).",
      hints: [
        "Divide into single elements, then merge",
        "Each level processes all n elements",
      ],
    },
    {
      id: "q-dc-merge-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What causes counting inversions in an array?",
      options: [
        "Elements out of order",
        "Duplicate elements",
        "Negative numbers",
        "Large values",
      ],
      correctAnswer: 0,
      explanation:
        "An inversion is a pair (i,j) where i < j but arr[i] > arr[j]. Merge sort can count inversions in O(n log n).",
      hints: [
        "i < j but arr[i] > arr[j]",
        "Measure of how far array is from being sorted",
      ],
    },
    {
      id: "q-dc-merge-3",
      type: "true-false",
      difficulty: "easy",
      question: "Merge sort is a stable sorting algorithm.",
      correctAnswer: "true",
      explanation:
        "During merge, equal elements from the left subarray are placed before those from the right, preserving relative order.",
      hints: [
        "Equal elements maintain their original order",
        "Left subarray elements come first during merge",
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
        "During merge, count inversions where element from left half > element from right half.",
      hints: [
        "Count when left element > right element",
        "Inversions = remaining left elements when right element is smaller",
      ],
    },
  ],

  "quick-sort-divide": [
    {
      id: "q-dc-quick-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the average time complexity of quicksort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
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
      options: ["O(n²)", "O(n^2.81)", "O(n³)", "O(n log n)"],
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
  ],

  "closest-pair": [
    {
      id: "q-dc-closest-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of the closest pair algorithm using divide and conquer?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
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
  ],

  "majority-element": [
    {
      id: "q-dc-majority-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the time complexity of Boyer-Moore majority vote algorithm?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1) extra space"],
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
  ],

  "karatsuba-multiplication": [
    {
      id: "q-dc-karatsuba-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the time complexity of Karatsuba integer multiplication?",
      options: ["O(n)", "O(n log 3)", "O(n²)", "O(n^2.81)"],
      correctAnswer: 1,
      explanation:
        "Karatsuba achieves O(n^log2(3)) ≈ O(n^1.585) by reducing 4 multiplications to 3.",
      hints: ["log2(3) ≈ 1.585", "Reduces multiplication count from 4 to 3"],
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
      options: ["O(nk)", "O(n log n)", "O(kn log n)", "O(n²)"],
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
        "Knuth optimization applies when opt[i][j-1] <= opt[i][j] <= opt[i+1][j], reducing DP from O(n²) to O(n log n).",
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
  ],

  // Bit Manipulation
  "bit-operators": [
    {
      id: "q-bit-ops-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the result of 5 & 3 in binary?",
      options: [
        "101 & 011 = 001 (1)",
        "101 & 011 = 111 (7)",
        "101 & 011 = 110 (6)",
        "101 & 011 = 100 (4)",
      ],
      correctAnswer: 0,
      explanation:
        "5 = 101, 3 = 011. ANDing bit-by-bit: 1&1=1, 0&1=0, 1&0=0 → 001 = 1.",
    },
    {
      id: "q-bit-ops-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does the XOR operation achieve with identical bits?",
      options: [
        "Returns 1",
        "Returns 0",
        "Returns the same bit",
        "Causes an overflow",
      ],
      correctAnswer: 1,
      explanation:
        "a XOR a = 0. XOR returns 1 only when bits differ. Identical bits give 0.",
    },
    {
      id: "q-bit-ops-3",
      type: "true-false",
      difficulty: "easy",
      question: "In JavaScript, ~5 evaluates to -6.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "~ is bitwise NOT (one\'s complement). ~5 = -6 because ~x = -(x+1).",
    },
    {
      id: "q-bit-ops-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is 1 << 3 (left shift by 3)?",
      options: ["3", "8", "16", "4"],
      correctAnswer: 1,
      explanation: "Left shift multiplies by 2^n. 1 << 3 = 1 * 2^3 = 8.",
    },
    {
      id: "q-bit-ops-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is 0xFF << 8 in decimal?",
      options: ["255", "65280", "65535", "4096"],
      correctAnswer: 1,
      explanation: "0xFF = 255. << 8 shifts left 8 bits: 255 * 256 = 65280.",
    },
    {
      id: "q-bit-ops-6",
      type: "true-false",
      difficulty: "medium",
      question:
        "XOR can be used to swap two numbers without a temporary variable.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "a = a ^ b; b = a ^ b; a = a ^ b swaps values using XOR properties.",
    },
  ],
  "single-number": [
    {
      id: "q-bit-single-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In an array where every element appears twice except one, the XOR of all elements yields:",
      options: [
        "0",
        "The duplicate value",
        "The unique element",
        "Twice the unique element",
      ],
      correctAnswer: 2,
      explanation:
        "a ^ a = 0, and a ^ 0 = a. So all pairs cancel out, leaving only the unique element.",
    },
    {
      id: "q-bit-single-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "For [2, 3, 2, 4, 3], what is the single number?",
      options: ["2", "3", "4", "1"],
      correctAnswer: 2,
      explanation: "XOR all: 2^3^2^4^3 = (2^2)^(3^3)^4 = 0^0^4 = 4.",
    },
    {
      id: "q-bit-single-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "The XOR trick only works when the duplicate appears exactly twice.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Yes, XOR cancels in pairs. If an element appears 4 times, it still cancels: a^a^a^a = 0.",
    },
    {
      id: "q-bit-single-4",
      type: "coding",
      difficulty: "easy",
      question:
        "Write a function singleNumber(nums) that returns the element appearing once.",
      options: [],
      correctAnswer: 0,
      explanation:
        "Use XOR accumulator. Iterate through nums, accumulate ^= element, return result.",
      codeSnippet:
        "function singleNumber(nums) {\n  let result = 0;\n  for (const num of nums) {\n    result ^= num;\n  }\n  return result;\n}",
      hints: [
        "Initialize result to 0",
        "XOR is commutative and associative",
        "Pairs cancel out",
      ],
    },
  ],
  "power-of-two": [
    {
      id: "q-bit-pow2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which number is a power of 2?",
      options: ["15", "16", "18", "20"],
      correctAnswer: 1,
      explanation:
        "16 = 2^4. Powers of 2 in binary are a single 1 followed by zeros.",
    },
    {
      id: "q-bit-pow2-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is n & (n-1) for n = 16?",
      options: ["0", "16", "32", "8"],
      correctAnswer: 0,
      explanation:
        "16 = 10000, 15 = 01111. 10000 & 01111 = 00000 = 0. This clears the lowest set bit.",
    },
    {
      id: "q-bit-pow2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A number n is a power of 2 iff:",
      options: [
        "n & (n-1) == n",
        "n & (n-1) == 0",
        "n | (n-1) == n",
        "n ^ (n-1) == 2*n-1",
      ],
      correctAnswer: 1,
      explanation:
        "n & (n-1) == 0 checks if n is a power of 2. For powers of 2, only the MSB is set.",
    },
    {
      id: "q-bit-pow2-4",
      type: "true-false",
      difficulty: "medium",
      question: "0 is a power of 2.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "0 is NOT a power of 2. Powers of 2 are 1, 2, 4, 8, 16...",
    },
    {
      id: "q-bit-pow2-5",
      type: "coding",
      difficulty: "easy",
      question: "Write isPowerOfTwo(n) that returns true if n is a power of 2.",
      options: [],
      correctAnswer: 0,
      explanation: "Return n > 0 && (n & (n - 1)) === 0.",
      codeSnippet:
        "function isPowerOfTwo(n) {\n  return n > 0 && (n & (n - 1)) === 0;\n}",
      hints: [
        "n > 0 check is required",
        "(n & n-1) clears the lowest set bit",
        "If result is 0, n was power of 2",
      ],
    },
  ],
  "bit-counting": [
    {
      id: "q-bit-count-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "How many set bits (1s) in binary 100100?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation: "100100 has 1s at positions 5 and 2. Total = 2 set bits.",
    },
    {
      id: "q-bit-count-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What does Brian Kernighan\'s algorithm compute?",
      options: [
        "Set bits count",
        "Position of MSB",
        "XOR of all bits",
        "Bit reversal",
      ],
      correctAnswer: 0,
      explanation:
        "n & (n-1) clears the lowest set bit. Loop until n=0 counts iterations = set bit count.",
    },
    {
      id: "q-bit-count-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Using Brian Kernighan, countBits(15) returns:",
      options: ["1", "2", "4", "8"],
      correctAnswer: 2,
      explanation:
        "15 = 1111 has 4 set bits. n & (n-1): 1111→1110→1100→1000→0 (4 iterations).",
    },
    {
      id: "q-bit-count-4",
      type: "true-false",
      difficulty: "hard",
      question: "n & (-n) isolates the lowest set bit.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "-n is two\'s complement. n & (-n) gives only the lowest set bit (e.g., 12(1100)&(-12)(0100)=0100).",
    },
    {
      id: "q-bit-count-5",
      type: "coding",
      difficulty: "medium",
      question: "Write countBits(n) to return the number of set bits.",
      options: [],
      correctAnswer: 0,
      explanation: "Brian Kernighan: while(n){count++; n&=n-1;} return count;",
      codeSnippet:
        "function countBits(n) {\n  let count = 0;\n  while (n) {\n    count++;\n    n &= n - 1;\n  }\n  return count;\n}",
      hints: [
        "Use n &= n-1 to clear lowest set bit",
        "Count how many times until n becomes 0",
        "O(k) where k = number of set bits",
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
        "Reverse order: 11001000 → 00010011. Read bits right-to-left.",
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
      options: ["True", "False"],
      correctAnswer: 0,
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
      options: ["True", "False"],
      correctAnswer: 0,
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
        "n elements → 2^n subsets. 2^3 = 8 subsets (including empty set).",
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
      options: ["True", "False"],
      correctAnswer: 0,
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
      options: ["True", "False"],
      correctAnswer: 0,
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
      options: ["True", "False"],
      correctAnswer: 0,
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
      options: ["True", "False"],
      correctAnswer: 0,
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
        "Sum of n/(n-i+1) for i=1 to n = n * H_n = n * (log n + gamma) ≈ n log n.",
      hints: ["What is the nth harmonic number H_n?", "How does it grow?"],
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
  ],
};

registerQuestions(questions);
