import type { Question } from "@/lib/curriculum";

// Registry: maps kp-slug → questions array
export type QuestionsMap = Record<string, Question[]>;

const registry: QuestionsMap = {};

const difficultyRank: Record<Question["difficulty"], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

type QuestionOverride = Partial<
  Pick<
    Question,
    | "type"
    | "question"
    | "options"
    | "correctAnswer"
    | "explanation"
    | "hints"
    | "codeSnippet"
  >
>;

const questionOverrides: Record<string, QuestionOverride> = {
  "q-ra-1": {
    question: "Rotate [1,2,3,4,5,6,7] to the right by 3. What array do you get?",
    options: [
      "[5,6,7,1,2,3,4]",
      "[4,5,6,7,1,2,3]",
      "[3,4,5,6,7,1,2]",
      "[1,2,3,4,5,6,7]",
    ],
    correctAnswer: 0,
    explanation:
      "A right rotation by 3 moves the last three elements, [5,6,7], to the front. The result is [5,6,7,1,2,3,4].",
    hints: [
      "This is a right rotation, so the tail moves to the front.",
      "Take the last three elements [5,6,7] and place them before [1,2,3,4].",
    ],
  },
  "q-rnn-4": {
    question: "What list remains after removing the 2nd node from the end of 1→2→3→4→5?",
    options: ["1→2→3→5", "1→2→4→5", "1→3→4→5", "2→3→4→5"],
    correctAnswer: 0,
    explanation:
      "Counting from the end gives 5 as first and 4 as second, so the node with value 4 is removed. The remaining list is 1→2→3→5.",
    hints: [
      "Count backward from the tail: 5 is first, 4 is second.",
      "Delete the node with value 4 and reconnect 3 directly to 5.",
    ],
  },
  "q-vbst-2": {
    options: [
      "[10,5,15,null,null,6,20]",
      "[5,3,7,1,4,6,8]",
      "[2,1,3]",
      "[1,null,2]",
    ],
    correctAnswer: 0,
    explanation:
      "The tree [10,5,15,null,null,6,20] passes the immediate-child check at node 15 because 6 < 15, but it is still invalid because 6 lies in the right subtree of 10 and must therefore be greater than 10.",
    hints: [
      "A node in the right subtree must respect every ancestor bound, not only its parent.",
      "Here the value 6 is in the right subtree of 10, so it violates the global lower bound.",
    ],
  },
  "q-mfml-kp12-1": {
    question: "Let f(u) = u³ and u = g(x) = 2x. Compute df/dx at x = 2.",
    correctAnswer: 3,
    explanation:
      "By the chain rule, df/dx = (df/du)(du/dx). Here f(u)=u³ so df/du = 3u², and u=2x so du/dx = 2. At x=2, u=4, so df/dx = 3(4²)·2 = 96.",
  },
  "q-rl-kp12-3": {
    question:
      "A policy starting from state s₁ gets rewards 1, 0, 1, 0, ... forever. If γ = 0.5, what is V^π(s₁)?",
    options: ["2/3", "4/3", "1", "2"],
    correctAnswer: 1,
    explanation:
      "Apply the Bellman equations simultaneously: V^π(s₁) = 1 + 0.5·V^π(s₂) and V^π(s₂) = 0.5·V^π(s₁). Substituting gives V^π(s₁) = 1 + 0.25·V^π(s₁), so 0.75·V^π(s₁) = 1 and V^π(s₁) = 4/3. The same result comes from the return series 1 + 0 + 0.25 + 0 + 0.0625 + … = 1/(1−0.25) = 4/3.",
  },
  "q-dc-kp3-2": {
    type: "multiple-choice",
    question:
      "A balanced binary dataset has 30% of class A mislabeled as class B, while class B labels are clean. Another balanced dataset has 15% symmetric label noise in both classes. Which dataset is usually harder to learn from?",
    options: [
      "The symmetric-noise dataset, because both classes contain errors",
      "The asymmetric-noise dataset, because the one-sided noise shifts the decision boundary toward class B",
      "They are equally hard, because both have 15% overall noise",
      "Neither, because models cannot learn once label noise exceeds 10%",
    ],
    correctAnswer: 1,
    explanation:
      "Asymmetric label noise is generally more damaging because it pushes the decision boundary in one direction instead of adding balanced uncertainty to both classes. If only class A is flipped to class B, the model learns a systematic bias against class A. Under symmetric noise at the same rate, the corruption is more evenly distributed and partially cancels out.",
  },
  "q-eval-kp10-2": {
    type: "multiple-choice",
    question:
      "For one query, relevant documents appear at ranks 3, 5, and 7. What is the reciprocal rank for this query?",
    options: ["1/7", "1/5", "1/3", "3/7"],
    correctAnswer: 2,
    explanation:
      "MRR only uses the rank of the first relevant result for each query. If the first relevant result is at rank 3, the reciprocal rank is 1/3, and later relevant documents at ranks 5 and 7 do not affect that query\'s MRR contribution.",
  },
  "q-bit-single-1": {
    hints: [
      "Use the facts a ^ a = 0 and x ^ 0 = x.",
      "XOR the entire array; every paired value cancels and the leftover value is the answer.",
    ],
  },
  "q-bit-single-2": {
    hints: [
      "XOR is commutative and associative, so you can regroup equal values.",
      "Cancel 2 ^ 2 and 3 ^ 3 first, then read the single value that remains.",
    ],
  },
  "q-bit-single-3": {
    correctAnswer: 1,
    explanation:
      "The XOR trick works whenever every non-unique value appears an even number of times. Values that appear 2, 4, or 6 times still cancel to 0, so the statement is false.",
    hints: [
      "XOR cancels values that appear an even number of times.",
      "Test a value appearing four times: a ^ a ^ a ^ a still reduces to 0.",
    ],
  },
  "q-bit-pow2-1": {
    hints: [
      "A power of 2 has exactly one 1 bit in binary.",
      "Look for the option whose binary form is 1000...0.",
    ],
  },
  "q-bit-pow2-2": {
    hints: [
      "Write 16 and 15 in binary before you AND them.",
      "n & (n - 1) clears the lowest set bit, so a pure power of 2 becomes 0.",
    ],
  },
  "q-bit-pow2-3": {
    question:
      "For a positive integer n, which test correctly checks whether n is a power of 2?",
    options: [
      "n & (n-1) == n",
      "n > 0 && (n & (n-1)) == 0",
      "n | (n-1) == n",
      "n has an odd number of 1 bits",
    ],
    correctAnswer: 1,
    explanation:
      "A positive power of 2 has exactly one set bit. Subtracting 1 turns that bit into 0 and fills the lower bits with 1s, so n & (n - 1) becomes 0 only for positive one-set-bit numbers.",
    hints: [
      "For positive n, a power of 2 has exactly one set bit.",
      "The expression n & (n - 1) removes the lowest set bit, so it becomes 0 only when there was exactly one.",
    ],
  },
  "q-bit-pow2-4": {
    hints: [
      "Powers of 2 start at 1 = 2^0, not at 0.",
      "0 has no set bits, so it does not match the one-set-bit pattern.",
    ],
  },
  "q-bit-count-1": {
    hints: [
      "Count only the 1 bits, not the total number of binary digits.",
      "In 100100, exactly two positions are set.",
    ],
  },
  "q-bit-count-2": {
    hints: [
      "Track what one n & (n - 1) operation does to the binary representation.",
      "Each iteration removes one lowest set bit, so the loop count equals the number of 1s.",
    ],
  },
  "q-bit-count-3": {
    hints: [
      "Rewrite 15 in binary first.",
      "Brian Kernighan runs once per set bit, and 1111 contains four of them.",
    ],
  },
  "q-bit-count-4": {
    explanation:
      "In two\'s complement, -n equals ~n + 1, so all higher bits flip and the lowest set bit stays aligned. As a result, n & (-n) keeps only the least significant 1 bit.",
    hints: [
      "Use the two\'s-complement identity -n = ~n + 1.",
      "n & (-n) zeroes out every other set bit and leaves only the least significant 1.",
    ],
  },
  "q-bit-rev-1": {
    hints: [
      "Reverse the 8-bit string exactly left to right.",
      "The trailing 000 become the leading 000 after reversal.",
    ],
  },
  "q-bit-rev-2": {
    hints: [
      "Think about swapping 1-bit blocks, then 2-bit blocks, then 4-bit blocks.",
      "The standard O(1) method uses fixed masks and shifts to swap groups in parallel.",
    ],
  },
  "q-bit-rev-3": {
    correctAnswer: 1,
    explanation:
      "That expression swaps byte positions, but it does not reverse the bit order inside each byte. Bit reversal must also reverse the order within every byte, so the statement is false.",
    hints: [
      "Shifting by 8 moves a byte; it does not reverse the bits inside that byte.",
      "Test the low byte 00000011: reversed, it should become 11000000, not just shift to another byte position.",
    ],
  },
  "q-bit-rev-4": {
    explanation:
      "Iterate exactly 32 times. Each step shifts result left, appends the current least significant bit of n, then unsigned-shifts n right; return result >>> 0 so the final value is treated as unsigned.",
    hints: [
      "Take the current least significant bit with n & 1 and append it onto result.",
      "Run exactly 32 iterations, then use >>> 0 so the returned 32-bit value is unsigned.",
    ],
  },
  "q-gray-1": {
    hints: [
      "Compare consecutive codes, not their numeric order.",
      "The defining rule is that each step flips exactly one bit.",
    ],
  },
  "q-gray-2": {
    correctAnswer: 1,
    explanation:
      "Use the conversion g = n ^ (n >> 1). For n = 3, binary 11 ^ 01 = 10, so the Gray code is 10.",
    hints: [
      "Use the formula g = n ^ (n >> 1).",
      "For n = 3, compute 11 ^ 01 to get 10.",
    ],
  },
  "q-gray-3": {
    hints: [
      "Test the formula on a small input such as i = 2 or i = 3.",
      "i ^ (i >> 1) is the standard binary-to-Gray conversion.",
    ],
  },
  "q-gray-4": {
    hints: [
      "There are 2^n Gray codes, one for each integer i from 0 to 2^n - 1.",
      "Append i ^ (i >> 1) for each i in order.",
    ],
  },
  "q-subset-1": {
    hints: [
      "Each element has two choices: in or out.",
      "Three independent choices produce 2^3 subsets.",
    ],
  },
  "q-subset-2": {
    hints: [
      "Read each bit as include this index or skip it.",
      "In 101, bits 0 and 2 are set, so those two positions are included.",
    ],
  },
  "q-subset-3": {
    hints: [
      "A 1 bit means that element is selected.",
      "If every bit is 0, no elements are selected, so the subset is empty.",
    ],
  },
  "q-subset-4": {
    hints: [
      "Iterate masks from 0 to 2^n - 1.",
      "For each mask, include nums[i] exactly when bit i is 1.",
    ],
  },
  "q-hash-func-1": {
    hints: [
      "Arrays are fast only after you know the index; string keys are not indices.",
      "A hash function turns a key into a bucket number so lookup can start in constant time.",
    ],
  },
  "q-hash-func-2": {
    hints: [
      "If too many keys pile into the same few buckets, lookup stops behaving like O(1).",
      "Uniform spread keeps chains or probe sequences short, which is why good hash functions aim for it.",
    ],
  },
  "q-hash-map-1": {
    hints: [
      "You do not scan the full table; you jump directly to one bucket from the key.",
      "If the load factor stays controlled, the remaining work inside that bucket is constant on average.",
    ],
  },
  "q-hash-map-2": {
    type: "multiple-choice",
    question: "Which statement about collision handling in hash maps is correct?",
    options: [
      "Hash maps must use separate chaining",
      "Hash maps can use separate chaining or open addressing",
      "Collisions only happen with bad hash functions",
      "A collision means the key is missing",
    ],
    correctAnswer: 1,
    explanation:
      "Separate chaining stores colliding entries in a per-bucket container such as a linked list. It is a common strategy, although open addressing is another valid collision-resolution approach.",
    hints: [
      "A collision means one bucket must hold multiple entries somehow.",
      "If those entries hang off the bucket in a linked list or similar container, that method is separate chaining.",
    ],
  },
  "q-col-1": {
    hints: [
      "Different keys can still land in the same bucket.",
      "That shared-bucket event is a collision, not a lookup miss or a broken table.",
    ],
  },
  "q-col-2": {
    hints: [
      "Linear probing, quadratic probing, and double hashing search other array slots.",
      "The strategy that keeps multiple entries at one bucket in a linked list is separate chaining.",
    ],
  },
  "q-two-sum-1": {
    hints: [
      "At index i, ask whether target - nums[i] was seen earlier.",
      "You need a structure that can answer that lookup quickly and remember the earlier index.",
    ],
  },
  "q-two-sum-2": {
    hints: [
      "In the one-pass solution, each element is queried once and inserted once.",
      "The map can grow to size n, so both time and extra space are linear.",
    ],
  },
  "q-ana-1": {
    question:
      "In the sorting-based approach, what canonical form is used to identify anagram groups?",
    explanation:
      'In the sorting-based solution, each word is sorted so every anagram in the same group shares the same key. For example, "eat" and "ate" both sort to "aet".',
    hints: [
      "Anagrams may differ in order, but they share the same letters with the same counts.",
      "In the sorting-based approach, sorting each word makes every member of a group share one canonical key.",
    ],
  },
  "q-ana-2": {
    hints: [
      "For one string of length k, the expensive step is sorting its characters.",
      "Doing that for n strings gives O(n * k log k) time in the max-length form.",
    ],
  },
  "q-swap-1": {
    explanation:
      "XOR swap relies on the facts that XOR is associative and that x ^ x = 0 and x ^ 0 = x. After a ^= b, b ^= a, a ^= b, the two values exchange without a temporary variable when the storage locations are distinct.",
    hints: [
      "Track the values after each XOR step, not just the final line.",
      "The key cancellations are x ^ x = 0 and x ^ 0 = x.",
    ],
  },
  "q-swap-2": {
    hints: [
      "Pretend both names refer to the same storage cell.",
      "The first XOR becomes x ^ x, so the original value is destroyed immediately.",
    ],
  },
  "q-miss-1": {
    explanation:
      "XOR the full range 0 ^ 1 ^ 2 ^ 3 and then XOR the array values 3 ^ 0 ^ 1. Every present value cancels, leaving 0 ^ 1 ^ 2 ^ 3 ^ 3 ^ 0 ^ 1 = 2.",
    hints: [
      "XOR the full range 0..n, then XOR every array value.",
      "Every value that appears in both places cancels, leaving the missing one.",
    ],
  },
  "q-miss-2": {
    question:
      "For an array of n numbers drawn from [0, n] with one missing value, what sum formula recovers the missing number?",
    hints: [
      "Compute the expected sum 0 + 1 + ... + n first.",
      "The missing value is the gap between the expected sum and the actual array sum.",
    ],
  },
  "q-miss-3": {
    explanation:
      "Compute (0 ^ 1 ^ ... ^ n) ^ (array XOR). Every value in 0..n except the missing one appears once in each group and cancels, so the remaining value is the missing number.",
    hints: [
      "Group the expression as (0 ^ 1 ^ ... ^ n) ^ (array XOR).",
      "Every present value appears twice overall and disappears.",
    ],
  },
  "q-pal-1": {
    hints: [
      "Compare the first and last bit before worrying about the middle.",
      "In 10001, the outer 1s match and the inside is symmetric.",
    ],
  },
  "q-pal-2": {
    question:
      "One way to check whether a binary representation is a palindrome is to reverse the significant bits and compare the result to the original.",
    explanation:
      "Yes. Explicitly reversing the significant bits and comparing works. It takes O(n) time over n bits, and if you materialize the reversed form explicitly it can use O(n) extra space.",
    hints: [
      "Reversing the significant bits and comparing is one valid approach.",
      "A two-pointer bit check avoids building the reversed form explicitly.",
    ],
  },
  "q-pal-3": {
    question:
      "In a fixed 32-bit representation, you can check bit-palindrome by comparing bits at positions i and 31 - i.",
    explanation:
      "For a fixed 32-bit view, a palindrome means bit i must match bit 31 - i for every i. A two-pointer scan from both ends correctly checks that condition.",
    hints: [
      "This works only after you fix the representation width.",
      "In a fixed 32-bit view, bit i must match bit 31 - i.",
    ],
  },
  "q-pal-4": {
    question:
      "Write isBitPalindrome(n) to check whether the significant-bit binary representation of n is a palindrome.",
    explanation:
      "Start from the highest set bit, not automatically from bit 31. Then compare mirrored significant bits while moving inward until the pointers cross.",
    codeSnippet: `function isBitPalindrome(n) {
  if (n === 0) return true;
  let left = 31;
  while (left > 0 && ((n >>> left) & 1) === 0) left--;
  let right = 0;
  while (left > right) {
    const leftBit = (n >>> left) & 1;
    const rightBit = (n >>> right) & 1;
    if (leftBit !== rightBit) return false;
    left--;
    right++;
  }
  return true;
}`,
    hints: [
      "Start from the highest set bit, not automatically from bit 31.",
      "Compare mirrored significant bits while moving inward.",
    ],
  },
  "q-dp-sc-2": {
    correctAnswer: "false",
    explanation:
      "There are 2^20 subsets and 20 possible ending cities, so the state count is 20 * 2^20 = 20,971,520, which is about 21 million, not 400 million.",
    hints: [
      "Count states as (visited subset, last city) pairs.",
      "2^20 is about one million, so multiplying by 20 gives about 21 million states.",
    ],
  },
  "q-dp-sc-3": {
    options: [
      "Bitwise AND",
      "Set / clear / test bit operations",
      "Modulo arithmetic",
      "Floating point ops",
    ],
    correctAnswer: 1,
    explanation:
      "Bitmask DP repeatedly tests membership with mask & (1 << i), sets bits with |, and clears bits with & ~ or XOR when appropriate. Those set / clear / test operations are the core transition tools.",
    hints: [
      "A subset state is just bits inside one integer.",
      "Transitions need three primitives: set a bit, clear a bit, and test a bit.",
    ],
  },
  "q-dp-sc-4": {
    question:
      "Implement bitmask DP for the minimum-cost Hamiltonian path that starts at city 0.",
    explanation:
      "Let dp[mask][i] be the minimum cost to start at city 0, visit exactly the cities in mask, and finish at city i. Transition from a previous city j in mask \\ {i}.",
    hints: [
      "Let dp[mask][i] be the best cost to end at city i after visiting exactly mask.",
      "Decide up front whether the task is a path or a cycle, because the final return step changes the recurrence.",
    ],
  },
  "q-dp-tree-3": {
    explanation:
      "At each node, keep the two largest child heights. The best path through that node is their sum, and the recursive return value is the largest child height plus 1.",
    codeSnippet: `function diameter(root) {
  let maxDiameter = 0;
  function dfs(node) {
    if (!node) return 0;
    let longest = 0;
    let secondLongest = 0;
    for (const child of node.children || []) {
      const h = dfs(child);
      if (h > longest) {
        secondLongest = longest;
        longest = h;
      } else if (h > secondLongest) {
        secondLongest = h;
      }
    }
    maxDiameter = Math.max(maxDiameter, longest + secondLongest);
    return longest + 1;
  }
  dfs(root);
  return maxDiameter;
}`,
    hints: [
      "At each node, only the two largest child depths matter.",
      "Keep one unit throughout: either measure both height and diameter in edges, or both in nodes.",
    ],
  },
  "q-dp-int-2": {
    options: [
      "dp[i][j] = min_k(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])",
      "dp[i][j] = min(dp[i-1][j], dp[i][j-1])",
      "dp[i][j] = dp[i][j/2] * 2",
      "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
    ],
    explanation:
      "For matrix chain A_i...A_j split at k, the cost is dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j]. The scalar multiplication term uses the outer dimensions of the two subchains.",
    hints: [
      "Split the chain at k, then pay left cost + right cost + one final matrix multiply.",
      "That final multiply uses the outer dimensions of the two subchains.",
    ],
  },
  "q-dp-int-3": {
    question:
      "Implement DP to compute the minimum search cost of an optimal BST.",
    explanation:
      "Let dp[i][j] be the minimum search cost for keys i..j. Try each key k as root, pay left cost + right cost + sum(freq[i..j]), and use dp[i][i] = freq[i] as the single-key base case.",
    codeSnippet: `function optimalBST(keys, freq) {
  const n = keys.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  const prefix = [0];
  for (const f of freq) prefix.push(prefix[prefix.length - 1] + f);
  const rangeSum = (i, j) => prefix[j + 1] - prefix[i];
  for (let i = 0; i < n; i++) dp[i][i] = freq[i];
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      const sum = rangeSum(i, j);
      for (let k = i; k <= j; k++) {
        const left = k > i ? dp[i][k - 1] : 0;
        const right = k < j ? dp[k + 1][j] : 0;
        dp[i][j] = Math.min(dp[i][j], left + right + sum);
      }
    }
  }
  return dp[0][n - 1];
}`,
    hints: [
      "Define dp[i][j] as the minimum search cost for keys i..j.",
      "Use prefix sums so the total frequency of an interval is O(1) to query.",
    ],
  },
  "q-dp-graph-2": {
    question:
      "Implement longest path from node 0 in a DAG using topological sort.",
    explanation:
      "After topological sorting, process nodes in that order and relax outgoing edges. In this single-source version, initialize dp[0] = 0 and all other nodes to -Infinity.",
    hints: [
      "Topologically sort first so every predecessor is settled before you relax outgoing edges.",
      "Be explicit about whether paths may start at any source or only at node 0.",
    ],
  },
  "q-dp-prob-1": {
    correctAnswer: 2,
    explanation:
      "Probability DP often uses expectation recurrences or probability-mass transitions between states. In problems like expected trials or coupon collector, the key recurrence is usually an expectation formula rather than Bayesian updating.",
    hints: [
      "Probability DP usually pushes mass across transitions weighted by their probabilities.",
      "If the target is expected steps, write an expectation recurrence.",
    ],
  },
  "q-dp-prob-3": {
    question:
      "Implement the expected number of draws needed to collect all N coupons.",
    explanation:
      "Let dp[i] be the expected draws needed to reach i distinct coupons. When you already have i - 1 distinct coupons, the probability the next draw is new is (n - (i - 1)) / n, so the expected waiting time for that next new coupon is n / (n - (i - 1)).",
    hints: [
      "The natural state is how many distinct coupons you already have.",
      "The wait for the next new coupon is geometric with success probability (n - i) / n.",
    ],
  },
  "q-dp-opt-3": {
    question:
      "Implement one divide-and-conquer DP layer using a fixed previous DP row.",
    explanation:
      "Divide-and-conquer optimization computes currDp[mid] from a fixed prevDp row by searching k in [optL, optR]. The monotone argmin property then narrows the candidate range for the left and right recursive calls.",
    codeSnippet: `function divideConquerDP(prevDp, currDp, left, right, optL, optR, getCost) {
  if (left > right) return;
  const mid = (left + right) >> 1;
  let bestK = -1;
  let bestVal = Infinity;
  for (let k = optL; k <= Math.min(mid, optR); k++) {
    const val = prevDp[k] + getCost(k, mid);
    if (val < bestVal) {
      bestVal = val;
      bestK = k;
    }
  }
  currDp[mid] = bestVal;
  divideConquerDP(prevDp, currDp, left, mid - 1, optL, bestK, getCost);
  divideConquerDP(prevDp, currDp, mid + 1, right, bestK, optR, getCost);
}`,
    hints: [
      "Divide-and-conquer DP optimization computes a new DP row from a fixed previous row.",
      "Monotone argmins let you recurse left and right with narrower candidate ranges.",
    ],
  },
  "q-nt-sieve-1": {
    hints: [
      "Mark multiples of each prime starting from p^2, not from 2p.",
      "You only need base primes up to sqrt(n); larger factors would pair with smaller ones already handled.",
    ],
  },
  "q-nt-sieve-2": {
    hints: [
      "Mark multiples of each prime starting from p^2, not from 2p.",
      "You only need base primes up to sqrt(n); larger factors would pair with smaller ones already handled.",
    ],
  },
  "q-nt-sieve-3": {
    hints: [
      "Mark multiples of each prime starting from p^2, not from 2p.",
      "You only need base primes up to sqrt(n); larger factors would pair with smaller ones already handled.",
    ],
  },
  "q-nt-sieve-4": {
    hints: [
      "Mark multiples of each prime starting from p^2, not from 2p.",
      "You only need base primes up to sqrt(n); larger factors would pair with smaller ones already handled.",
    ],
  },
  "q-nt-sieve-5": {
    hints: [
      "Mark multiples of each prime starting from p^2, not from 2p.",
      "You only need base primes up to sqrt(n); larger factors would pair with smaller ones already handled.",
    ],
  },
  "q-nt-pf-1": {
    hints: [
      "Build the factorization by repeatedly dividing out the smallest prime that still divides n.",
      "Once the remaining value is 1 or prime, the factorization is complete.",
    ],
  },
  "q-nt-pf-2": {
    hints: [
      "Build the factorization by repeatedly dividing out the smallest prime that still divides n.",
      "Once the remaining value is 1 or prime, the factorization is complete.",
    ],
  },
  "q-nt-pf-3": {
    hints: [
      "Build the factorization by repeatedly dividing out the smallest prime that still divides n.",
      "Once the remaining value is 1 or prime, the factorization is complete.",
    ],
  },
  "q-nt-pf-4": {
    hints: [
      "Build the factorization by repeatedly dividing out the smallest prime that still divides n.",
      "Once the remaining value is 1 or prime, the factorization is complete.",
    ],
  },
  "q-nt-pf-5": {
    hints: [
      "Build the factorization by repeatedly dividing out the smallest prime that still divides n.",
      "Once the remaining value is 1 or prime, the factorization is complete.",
    ],
  },
  "q-nt-gcd-1": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-gcd-2": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-gcd-3": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-gcd-4": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-gcd-5": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-gcd-6": {
    hints: [
      "Use gcd(a, b) = gcd(b, a mod b) or the divisibility rule that defines the gcd.",
      "Track which values divide both numbers or how the Euclidean step shrinks the pair.",
    ],
  },
  "q-nt-mod-1": {
    question: "Which expression is always equal to (a + b) mod n?",
    options: [
      "((a mod n) + (b mod n)) mod n",
      "(a mod n) + (b mod n)",
      "a + (b mod n)",
      "((a mod n) * (b mod n)) mod n",
    ],
    correctAnswer: 0,
    hints: [
      "Reduce intermediate values modulo n as soon as possible.",
      "Use the modular rules for addition, subtraction, and multiplication before plugging in the specific numbers.",
    ],
  },
  "q-nt-mod-2": {
    hints: [
      "Reduce intermediate values modulo n as soon as possible.",
      "Use the modular rules for addition, subtraction, and multiplication before plugging in the specific numbers.",
    ],
  },
  "q-nt-mod-3": {
    question: "What is 17^5 mod 7?",
    options: ["2", "4", "5", "6"],
    correctAnswer: 2,
    hints: [
      "Reduce intermediate values modulo n as soon as possible.",
      "Use the modular rules for addition, subtraction, and multiplication before plugging in the specific numbers.",
    ],
  },
  "q-nt-mod-4": {
    hints: [
      "Reduce intermediate values modulo n as soon as possible.",
      "Use the modular rules for addition, subtraction, and multiplication before plugging in the specific numbers.",
    ],
  },
  "q-nt-mod-5": {
    hints: [
      "Reduce intermediate values modulo n as soon as possible.",
      "Use the modular rules for addition, subtraction, and multiplication before plugging in the specific numbers.",
    ],
  },
  "q-nt-flt-1": {
    hints: [
      "Fermat\'s little theorem applies when p is prime and a is not divisible by p.",
      "Rewrite the target into the standard form a^(p-1) ≡ 1 (mod p) or a^p ≡ a (mod p).",
    ],
  },
  "q-nt-flt-2": {
    hints: [
      "Fermat\'s little theorem applies when p is prime and a is not divisible by p.",
      "Rewrite the target into the standard form a^(p-1) ≡ 1 (mod p) or a^p ≡ a (mod p).",
    ],
  },
  "q-nt-flt-3": {
    hints: [
      "Fermat\'s little theorem applies when p is prime and a is not divisible by p.",
      "Rewrite the target into the standard form a^(p-1) ≡ 1 (mod p) or a^p ≡ a (mod p).",
    ],
  },
  "q-nt-flt-4": {
    hints: [
      "Fermat\'s little theorem applies when p is prime and a is not divisible by p.",
      "Rewrite the target into the standard form a^(p-1) ≡ 1 (mod p) or a^p ≡ a (mod p).",
    ],
  },
  "q-nt-flt-5": {
    hints: [
      "Fermat\'s little theorem applies when p is prime and a is not divisible by p.",
      "Rewrite the target into the standard form a^(p-1) ≡ 1 (mod p) or a^p ≡ a (mod p).",
    ],
  },
  "q-nt-euler-1": {
    hints: [
      "Euler\'s totient counts integers up to n that are coprime to n.",
      "Use φ(n) = n∏(1 - 1/p) over the distinct prime factors of n.",
    ],
  },
  "q-nt-euler-2": {
    hints: [
      "Euler\'s totient counts integers up to n that are coprime to n.",
      "Use φ(n) = n∏(1 - 1/p) over the distinct prime factors of n.",
    ],
  },
  "q-nt-euler-3": {
    hints: [
      "Euler\'s totient counts integers up to n that are coprime to n.",
      "Use φ(n) = n∏(1 - 1/p) over the distinct prime factors of n.",
    ],
  },
  "q-nt-euler-4": {
    hints: [
      "Euler\'s totient counts integers up to n that are coprime to n.",
      "Use φ(n) = n∏(1 - 1/p) over the distinct prime factors of n.",
    ],
  },
  "q-nt-euler-5": {
    hints: [
      "Euler\'s totient counts integers up to n that are coprime to n.",
      "Use φ(n) = n∏(1 - 1/p) over the distinct prime factors of n.",
    ],
  },
  "q-nt-binom-1": {
    hints: [
      "Think in terms of choosing k items from n or using Pascal\'s recurrence.",
      "Symmetry and small base cases often eliminate most distractors immediately.",
    ],
  },
  "q-nt-binom-2": {
    hints: [
      "Think in terms of choosing k items from n or using Pascal\'s recurrence.",
      "Symmetry and small base cases often eliminate most distractors immediately.",
    ],
  },
  "q-nt-binom-3": {
    hints: [
      "Think in terms of choosing k items from n or using Pascal\'s recurrence.",
      "Symmetry and small base cases often eliminate most distractors immediately.",
    ],
  },
  "q-nt-binom-4": {
    hints: [
      "Think in terms of choosing k items from n or using Pascal\'s recurrence.",
      "Symmetry and small base cases often eliminate most distractors immediately.",
    ],
  },
  "q-nt-binom-5": {
    hints: [
      "Think in terms of choosing k items from n or using Pascal\'s recurrence.",
      "Symmetry and small base cases often eliminate most distractors immediately.",
    ],
  },
  "q-nt-catalan-1": {
    hints: [
      "Catalan numbers count recursively splittable structures such as balanced parentheses or BST shapes.",
      "Use either the recurrence C_n = Σ C_i C_{n-1-i} or the closed form to test the options.",
    ],
  },
  "q-nt-catalan-2": {
    hints: [
      "Catalan numbers count recursively splittable structures such as balanced parentheses or BST shapes.",
      "Use either the recurrence C_n = Σ C_i C_{n-1-i} or the closed form to test the options.",
    ],
  },
  "q-nt-catalan-3": {
    hints: [
      "Catalan numbers count recursively splittable structures such as balanced parentheses or BST shapes.",
      "Use either the recurrence C_n = Σ C_i C_{n-1-i} or the closed form to test the options.",
    ],
  },
  "q-nt-catalan-4": {
    hints: [
      "Catalan numbers count recursively splittable structures such as balanced parentheses or BST shapes.",
      "Use either the recurrence C_n = Σ C_i C_{n-1-i} or the closed form to test the options.",
    ],
  },
  "q-nt-catalan-5": {
    hints: [
      "Catalan numbers count recursively splittable structures such as balanced parentheses or BST shapes.",
      "Use either the recurrence C_n = Σ C_i C_{n-1-i} or the closed form to test the options.",
    ],
  },
  "q-nt-fib-1": {
    hints: [
      "Start from the Fibonacci recurrence and the first few values 0, 1, 1, 2, 3, 5.",
      "Many Fibonacci identities can be checked quickly on a small n before trusting the algebra.",
    ],
  },
  "q-nt-fib-2": {
    hints: [
      "Start from the Fibonacci recurrence and the first few values 0, 1, 1, 2, 3, 5.",
      "Many Fibonacci identities can be checked quickly on a small n before trusting the algebra.",
    ],
  },
  "q-nt-fib-3": {
    hints: [
      "Start from the Fibonacci recurrence and the first few values 0, 1, 1, 2, 3, 5.",
      "Many Fibonacci identities can be checked quickly on a small n before trusting the algebra.",
    ],
  },
  "q-nt-fib-4": {
    hints: [
      "Start from the Fibonacci recurrence and the first few values 0, 1, 1, 2, 3, 5.",
      "Many Fibonacci identities can be checked quickly on a small n before trusting the algebra.",
    ],
  },
  "q-nt-fib-5": {
    hints: [
      "Start from the Fibonacci recurrence and the first few values 0, 1, 1, 2, 3, 5.",
      "Many Fibonacci identities can be checked quickly on a small n before trusting the algebra.",
    ],
  },
  "q-nt-power-1": {
    hints: [
      "Exponentiation by squaring halves the exponent each step.",
      "Separate the even and odd exponent cases before analyzing the recurrence or runtime.",
    ],
  },
  "q-nt-power-2": {
    hints: [
      "Exponentiation by squaring halves the exponent each step.",
      "Separate the even and odd exponent cases before analyzing the recurrence or runtime.",
    ],
  },
  "q-nt-power-3": {
    hints: [
      "Exponentiation by squaring halves the exponent each step.",
      "Separate the even and odd exponent cases before analyzing the recurrence or runtime.",
    ],
  },
  "q-nt-power-4": {
    hints: [
      "Exponentiation by squaring halves the exponent each step.",
      "Separate the even and odd exponent cases before analyzing the recurrence or runtime.",
    ],
  },
  "q-nt-power-5": {
    hints: [
      "Exponentiation by squaring halves the exponent each step.",
      "Separate the even and odd exponent cases before analyzing the recurrence or runtime.",
    ],
  },
  "q-bit-ops-1": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-bit-ops-2": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-bit-ops-3": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-bit-ops-4": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-bit-ops-5": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-bit-ops-6": {
    hints: [
      "Translate the operation into binary first; bitwise questions are easiest in 0/1 form.",
      "Apply the operator one position at a time or use the standard identity for shifts, XOR, or complement.",
    ],
  },
  "q-msl-2": {
    question:
      "There are N total nodes across k sorted linked lists. Using a min-heap of size k, what is the time complexity to merge them?",
    options: ["O(N)", "O(N log k)", "O(k log N)", "O(N log N)"],
    correctAnswer: 1,
  },
  "q-iq-1": {
    question:
      "In a queue implemented with two stacks, what is the amortized time of dequeue?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
  },
  "q-lcp-3": {
    question:
      "You sort n strings, each of length at most m, before finding the longest common prefix. What is the worst-case time of the sorting step?",
    options: ["O(m)", "O(nm)", "O(n log n)", "O(nm log n)"],
    correctAnswer: 3,
  },
  "q-rnn-1": {
    question:
      "In the one-pass solution to Remove Nth Node From End, how far ahead should fast start from slow when you use a dummy head?",
    options: ["n-1 nodes", "n nodes", "n+1 nodes", "2n nodes"],
    correctAnswer: 2,
  },
  "q-meta-kp3-3": {
    question: 'What makes a Siamese network "Siamese"?',
    options: [
      "Two inputs are encoded by branches that share weights, then compared in embedding space",
      "Two independent classifiers vote on the class",
      "A separate network is trained for each novel class",
      "The model always requires anchor-positive-negative triplets",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp14-1": {
    question: "In MAML, what does the outer loop update?",
    options: [
      "The shared initialization, based on query-set performance after adaptation",
      "The support examples themselves, so later episodes are easier",
      "A separate set of weights for each task, with no shared initialization",
      "Only the inner-loop learning rate, while the model weights stay fixed",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp17-3": {
    question:
      "If randomizing labels in in-context examples barely hurts performance, what are the examples mainly providing?",
    options: [
      "A task format and input distribution for the model to pattern-match",
      "A full supervised signal the model must fit exactly",
      "A reason to ignore the prompt and rely only on pretraining",
      "A guaranteed regularization boost from wrong labels",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp23-1": {
    question:
      "What is the main difference between multi-task learning and meta-learning?",
    options: [
      "Multi-task learning is evaluated on the same tasks it trained on; meta-learning is evaluated on new tasks",
      "Multi-task learning uses unlabeled data, while meta-learning uses labeled data",
      "Multi-task learning trains many models, while meta-learning trains one",
      "Multi-task learning is only for large datasets, while meta-learning is only for small ones",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp25-3": {
    question:
      "Why can head-only adaptation generalize better than full-network adaptation when training tasks are limited?",
    options: [
      "It reduces the task-specific hypothesis class the learner has to fit",
      "It increases the number of support examples in each task",
      "It removes the need for an outer loop",
      "It guarantees the same optimum for every task",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp27-3": {
    question: "What changed in FLAN to improve zero-shot performance?",
    options: [
      "It instruction-tuned the model on many NLP tasks written as natural-language instructions",
      "It added an external memory for task definitions at inference time",
      "It replaced pre-training with MAML-style episodic updates",
      "It improved zero-shot performance only by scaling parameters while keeping the training objective the same",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp30-3": {
    question:
      "Which two MAML hyperparameters most directly control task adaptation?",
    options: [
      "The inner-loop learning rate and the number of inner-loop steps",
      "The meta-batch size and validation frequency",
      "The backbone width and dropout rate",
      "The random seed and number of meta-test tasks",
    ],
    correctAnswer: 0,
  },
  "q-meta-kp39-3": {
    question:
      "For few-shot NLP meta-learning, what kind of meta-training tasks transfer best?",
    options: [
      "A diverse set of auxiliary NLP tasks that is still reasonably similar to the target tasks",
      "Only episodes built from the target dataset itself",
      "Mostly synthetic paraphrase tasks, regardless of the target problem",
      "Any fixed 100-task benchmark, since task choice hardly matters",
    ],
    correctAnswer: 0,
  },
  "q-prod-kp7-3": {
    question:
      "Which protocol is usually the best fit for streaming LLM tokens to a browser client?",
    options: [
      "REST polling",
      "Server-Sent Events (SSE)",
      "WebSockets",
      "gRPC-web streaming",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp9-3": {
    question:
      "In Flink event-time processing, what happens if an event arrives after its window's watermark has passed?",
    options: [
      "It is reassigned by processing time",
      "It is treated as a late event and handled by the late-data policy",
      "Flink rewinds and recomputes later windows",
      "It is always dropped immediately",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp11-3": {
    question:
      "PSI rises from 0.05 to 0.32 and the KS p-value falls below 0.001 for transaction_amount, but fraud rate is unchanged. What is the best interpretation?",
    options: [
      "Concept drift in the fraud relationship",
      "Upstream feature-value drift in the transaction_amount pipeline",
      "Corrupted model weights in the registry",
      "Label drift in the fraud target",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp22-2": {
    question:
      "Which defense pattern best protects a production LLM from indirect prompt injection in retrieved documents or tool output?",
    options: [
      "Use a larger model",
      "Treat retrieved/tool content as untrusted, separate it from instructions, and validate actions before execution",
      "Disable retrieval entirely",
      "Rely on the system prompt to override malicious text",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp25-2": {
    question:
      "INT4 post-training quantization causes too much accuracy loss. What is the best next step?",
    options: [
      "Accept the loss",
      "Try GPTQ/AWQ or W4A16, then use QAT if needed",
      "Quantize only the embedding layer",
      "Increase model size before quantizing",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp26-2": {
    question:
      "A credit model has equal accuracy across groups but unequal false negative rates. Which statement is correct?",
    options: [
      "Equal accuracy is enough to show fairness",
      "Unequal FNR can still indicate a fairness problem and should be reviewed",
      "It is only a fairness issue if overall accuracy also differs",
      "It is only a fairness issue if false positive rates differ too",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp29-1": {
    question:
      "In roofline analysis, what does it mean if an inference kernel is memory-bound?",
    options: [
      "More users can be served without optimization",
      "Reducing memory traffic matters more than increasing peak FLOPs",
      "The model has too many layers",
      "Only quantization can improve it",
    ],
    correctAnswer: 1,
  },
  "q-prod-kp30-2": {
    question:
      "A training job changes after a transitive dependency update. What is the best first move?",
    options: [
      "Reinstall everything and retry",
      "Diff the lockfile, identify the changed dependency, and pin the last known-good version",
      "Upgrade all packages to latest",
      "Rebuild without a lockfile",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp10-1": {
    question:
      "A ranking has relevance grades [3, 0, 2, 0, 1]. Using DCG@5 = Σ(2^rel_i - 1) / log₂(i+1), the ideal ranking [3, 2, 1, 0, 0] has IDCG@5 ≈ 9.39. What is NDCG@5?",
    options: ["0.43", "0.78", "0.95", "1.34"],
    correctAnswer: 2,
  },
  "q-eval-kp33-1": {
    question:
      "For a confidence bin B_m, which term contributes to Expected Calibration Error?",
    options: [
      "|acc(B_m) - conf(B_m)|",
      "(|B_m|/n) * |acc(B_m) - conf(B_m)|",
      "(|B_m|/n) * (acc(B_m) - conf(B_m))^2",
      "KL(p_model || p_data) on B_m",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp34-1": {
    question:
      "A classifier fails on FGSM-perturbed images and also drops on foggy photos from a new city. Which label matches these two failures?",
    options: [
      "Both are adversarial robustness failures",
      "First is adversarial robustness failure; second is distribution-shift robustness failure",
      "First is calibration error; second is adversarial robustness failure",
      "Both are label-noise problems",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp35-1": {
    question:
      "Two models have the same reported FLOPs, but one is 2x slower on the target GPU. What best explains this?",
    options: [
      "FLOPs already capture memory traffic, so latency should be the same",
      "Latency also depends on memory traffic, parallelism, and kernel/compiler efficiency",
      "Equal FLOPs means equal parameter count, which determines latency",
      "FLOPs matter only for training cost, not inference",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp36-1": {
    question:
      "A translation preserves meaning but uses different wording from the reference. Which BLEU weakness does this expose?",
    options: [
      "BLEU rewards paraphrases too strongly",
      "BLEU relies on n-gram overlap and can score a valid paraphrase too low",
      "BLEU cannot be computed on a single test set",
      "BLEU uses only recall, not precision",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp38-1": {
    question:
      "A model scores unusually high on MMLU, and later you find many MMLU questions in its pretraining corpus. What evaluation problem is this?",
    options: [
      "Label noise",
      "Benchmark contamination",
      "Adversarial prompting",
      "Domain shift",
    ],
    correctAnswer: 1,
  },
  "q-eval-kp39-1": {
    question:
      "Two labs evaluate the same LLM on the same benchmark but use different prompt templates and different few-shot examples. Which part of an evaluation harness is meant to prevent this mismatch?",
    options: [
      "A fixed train/validation split",
      "Standardized prompt templates and few-shot example selection",
      "A toxicity filter on outputs",
      "Gradient checkpointing during inference",
    ],
    correctAnswer: 1,
  },
  "q-wb-5": {
    question:
      "In a top-down memoized Word Break solution that recurses on the start index, what should canBreak(i) mean?",
    options: [
      "Whether the suffix s[i:] can be segmented into dictionary words",
      "Whether the prefix s[:i] can be segmented into dictionary words",
      "The minimum number of words needed to form s[i:]",
      "Whether s[i:] itself is a single dictionary word",
    ],
    correctAnswer: 0,
  },
  "q-lca-4": {
    question:
      "In the BST root=6, left=2, right=8, left.left=0, left.right=4, what is LCA(2, 4)?",
    options: ["0", "2", "4", "6"],
    correctAnswer: 1,
  },
  "q-blo-4": {
    question:
      "In BFS level-order traversal, what should you record before processing a level if you want one array per level?",
    options: [
      "The current queue size",
      "The tree height",
      "The value of the first node in the queue",
      "The total number of nodes visited so far",
    ],
    correctAnswer: 0,
  },
  "q-blo-5": {
    question:
      "For the tree root=1, left=2, right=3, left.left=4, left.right=5, right.right=6, what is the zigzag level-order traversal?",
    options: [
      "[[1],[2,3],[4,5,6]]",
      "[[1],[3,2],[4,5,6]]",
      "[[1],[3,2],[6,5,4]]",
      "[[1],[2,3],[6,5,4]]",
    ],
    correctAnswer: 1,
  },
  "q-ws2-4": {
    question:
      "In Trie-based Word Search II, after you add a found word to the answer list, which in-place change prevents reporting that same word again without using a separate result set?",
    options: [
      "Set that Trie node’s isEnd to false",
      "Restart DFS from the Trie root after every match",
      "Stop exploring the board after the first match",
      "Delete the entire Trie root",
    ],
    correctAnswer: 0,
  },
  "q-ws2-5": {
    question:
      "Ignoring Trie construction, which is the standard worst-case upper bound for DFS search in Word Search II on an m x n board when the longest word has length L?",
    options: ["O(mn)", "O(mn * 4^L)", "O(W * mn * 4^L)", "O(4^(mn))"],
    correctAnswer: 1,
  },
  "q-ibst-7": {
    question:
      "A BST node has two children. Which replacement value preserves the BST property before you delete the replacement node from its original position?",
    options: [
      "Any value from the left subtree",
      "The maximum value in the left subtree or the minimum value in the right subtree",
      "Any leaf value in the tree",
      "The value of the parent",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp6-1": {
    question:
      "An NLP team has 100 labeled examples and 10,000 unlabeled examples. It can afford to label only 200 more. Which choice best matches active learning?",
    options: [
      "Label 200 randomly selected unlabeled examples",
      "Label the 200 unlabeled examples on which the current model is most uncertain",
      "Assign pseudo-labels to all 10,000 unlabeled examples and skip human labeling",
      "Relabel the existing 100 examples until every label is unanimous",
    ],
    correctAnswer: 1,
  },
  "q-dc-kp1-3": {
    question:
      "You train logistic regression, random forest, and XGBoost on the same 500-example dataset. They score 0.70, 0.71, and 0.72 F1. A manual audit finds many contradictory labels on near-identical examples. What is the best next step?",
    options: [
      "Keep the data fixed and search a larger hyperparameter grid",
      "Switch to a larger neural network",
      "Improve label consistency and collect a small amount of additional high-quality data",
      "Prioritize distributed training infrastructure",
    ],
    correctAnswer: 2,
  },
  "q-dc-kp5-1": {
    question:
      "An autonomous-vehicle team needs more training examples of pedestrians in dense fog. Which benefit of simulation most directly addresses this need?",
    options: [
      "Simulation guarantees better real-world accuracy than real data",
      "Simulation can generate rare fog scenes on demand and provides automatic ground-truth labels",
      "Simulation removes the need for any real-world testing",
      "Simulation eliminates the sim-to-real gap",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp9-3": {
    question:
      "A churn model's true labels arrive 30 days after prediction. Which metric can the team compute immediately, without labels, to flag that production inputs may have shifted away from the training distribution?",
    options: [
      "Current-batch accuracy",
      "PSI or KL divergence on input features",
      "Confusion matrix on today's predictions",
      "F1 score on today's predictions",
    ],
    correctAnswer: 1,
  },
  "q-mls-kp15-1": {
    question:
      "A new model version is being released with a canary deployment. The service handles 200,000 requests per hour, and the goal is to limit blast radius while collecting live metrics. What initial traffic split is most appropriate?",
    options: ["0%", "1-5%", "50%", "100%"],
    correctAnswer: 1,
  },
  "q-mls-kp11-1": {
    question:
      "You need to create a new feature column on a very large Spark DataFrame, and the logic can be expressed with native Spark SQL functions. Which approach is usually fastest and most scalable?",
    options: [
      "Use built-in Spark functions inside withColumn()",
      "Use a Python UDF inside withColumn()",
      "Call collect() and transform rows in a Python loop",
      "Convert the full DataFrame to Pandas and use apply()",
    ],
    correctAnswer: 0,
  },
  "q-mls-kp30-3": {
    question:
      "A loan-approval system can deploy either (A) a gradient-boosted tree with 94.8% AUC and straightforward monitoring or (B) a large ensemble with 95.0% AUC but much higher debugging and rollback complexity. If both meet business targets, which choice is most defensible?",
    options: [
      "Deploy the ensemble, because any accuracy gain outweighs operational cost in a high-stakes system",
      "Deploy the simpler model, because it meets the target while reducing operational risk",
      "Always prefer the model with more parameters",
      "Choose randomly once both clear the target",
    ],
    correctAnswer: 1,
  },
  "q-rl-kp23-3": {
    question:
      "A target policy always chooses the greedy action. A behavior policy is ε-greedy with ε = 0.1 over 4 actions. If the greedy action was taken, what is the one-step importance-sampling ratio π(a|s)/b(a|s)?",
    options: ["1", "1/0.925 ≈ 1.08", "0.925", "0.025"],
    correctAnswer: 1,
  },
  "q-rl-kp6-1": {
    question: "Which quantity is a policy?",
    options: [
      "V(s): expected return from state s",
      "π(a|s): probability of taking action a in state s",
      "P(s'|s,a): probability of next state s' after action a",
      "G_t: discounted sum of future rewards",
    ],
    correctAnswer: 1,
  },
  "q-rl-kp6-3": {
    question:
      "A robot reaches the same current state s by two different paths. In a fully observed MDP, what should the policy use to choose the next action?",
    options: [
      "The full sequence of past states",
      "Only the current state s",
      "Only the total reward collected so far",
      "Only the step number",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp7-1": {
    question: "Which method is one of Rainbow DQN's components?",
    options: [
      "TRPO",
      "Prioritized experience replay",
      "SAC",
      "REINFORCE",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp13-3": {
    question:
      "In PPO, suppose A_t > 0 and r_t = 1.3 with ε = 0.2. What should clipping do?",
    options: [
      "Use r_t A_t because the ratio is above the clip range",
      "Use (1+ε)A_t so the objective stops rewarding a larger ratio",
      "Set A_t to 0",
      "Switch to the value-function loss",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp9-3": {
    question:
      "An episode gives reward 0 for 99 steps and +10 on the last step. Why is REINFORCE's credit assignment hard?",
    options: [
      "The final reward makes every action in the episode optimal",
      "It is hard to tell which earlier actions actually caused the final reward",
      "The policy gradient becomes exactly zero on long episodes",
      "REINFORCE cannot train on delayed rewards",
    ],
    correctAnswer: 1,
  },
  "q-rla-kp23-2": {
    type: "multiple-choice",
    question:
      "If the same DreamerV3 hyperparameters work across Atari, continuous control, and 3D tasks, what does that mainly show?",
    options: [
      "The method is more robust across domains and needs less task-specific tuning",
      "The method no longer needs a world model",
      "The method trains only from demonstrations",
      "The method is on-policy",
    ],
    correctAnswer: 0,
  },
  "q-mfml-kp2-1": {
    question:
      "For A = [[1, 2], [0, 1]] and B = [[1, 0], [3, 1]], which pair is correct?",
    options: [
      "AB = [[1, 2], [3, 7]] and BA = [[7, 2], [3, 1]]",
      "AB = [[7, 2], [3, 1]] and BA = [[1, 2], [3, 7]]",
      "AB = [[7, 0], [0, 1]] and BA = [[1, 0], [3, 1]]",
      "AB = BA = [[7, 2], [3, 1]]",
    ],
    correctAnswer: 1,
  },
  "q-mfml-kp14-3": {
    question:
      "For one labeled example, define the logistic loss as l(w) = log(1 + exp(-y w^T x)) with y in {+1, -1}. Which statement is true?",
    options: [
      "l(w) is convex in w",
      "l(w) is concave in w",
      "l(w) is linear in w",
      "l(w) is non-convex because it contains an exponential",
    ],
    correctAnswer: 0,
  },
  "q-mfml-kp24-3": {
    question:
      "A spectral GNN uses the full eigenvectors of an n x n graph Laplacian L. For large n, which step is usually the main bottleneck?",
    options: [
      "Applying nonlinearities to node features",
      "Computing the full eigendecomposition of L",
      "Adding self-loops to the graph",
      "Normalizing each feature vector",
    ],
    correctAnswer: 1,
  },
  "q-mfml-kp29-3": {
    question:
      "In a score-based diffusion model, the network takes x_t and t as input. What should it estimate?",
    options: [
      "log p_0(x) only",
      "grad_x log p_t(x)",
      "the Hessian of log p_t(x)",
      "the covariance matrix of the training set",
    ],
    correctAnswer: 1,
  },
  "q-alg-kp5-1": {
    question:
      "Let a = [1, 0] and b = [3, 4]. What is the orthogonal projection of b onto the line spanned by a?",
    options: ["[0, 4]", "[3, 0]", "[1, 4]", "[3, 4]"],
    correctAnswer: 1,
  },
  "q-alg-kp20-3": {
    question:
      "A spectral-clustering embedding places four nodes at (0.0, 0.1), (0.2, 0.0), (3.0, 3.1), and (3.2, 2.9). If k = 2, which clustering should k-means return?",
    options: [
      "{1, 3} and {2, 4}",
      "{1, 2} and {3, 4}",
      "{1, 4} and {2, 3}",
      "{1, 2, 3, 4}",
    ],
    correctAnswer: 1,
  },
  "q-alg-kp21-3": {
    question:
      "A full update to W in R^(1000 x 800) would train 800,000 parameters. With LoRA rank r = 10, where Delta W = BA with B in R^(1000 x 10) and A in R^(10 x 800), how many trainable parameters are added?",
    options: ["18,000", "80,000", "810,000", "8,000"],
    correctAnswer: 0,
  },
  "q-alg-kp27-1": {
    question:
      "If x = np.array([1, 2, 3]) and y = np.array([4, 5, 6]), which NumPy expression returns the scalar dot product 32?",
    options: [
      "np.dot(x, y)",
      "np.concatenate([x, y])",
      "x[:, None] * y[None, :]",
      "np.maximum(x, y)",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp7-1": {
    question:
      "A scaling law says loss is proportional to N^-0.076. If model size increases from 1B to 10B parameters, the loss is multiplied by approximately:",
    options: ["0.84", "0.50", "0.10", "1.00"],
    correctAnswer: 0,
  },
  "q-tr-kp6-2": {
    type: "multiple-choice",
    question:
      "For the same d_model, increasing vocabulary size from 50,000 tokens to 100,000 tokens makes the embedding table:",
    options: [
      "About 2x larger",
      "About 4x larger",
      "The same size",
      "Smaller because larger vocabularies use shorter sequences",
    ],
    correctAnswer: 0,
  },
  "q-dl-kp15-2": {
    question:
      "In a residual block H(x) = F(x) + x, the skip connection gives the gradient a direct identity path in addition to the residual branch.",
    correctAnswer: "true",
  },
  "q-tr-kp30-3": {
    question:
      "In tensor-parallel systems, which collective operation sums partial tensors across all GPUs and returns the summed result to every GPU?",
    options: ["All-reduce", "All-gather", "Broadcast", "Scatter"],
    correctAnswer: 0,
  },
  "q-tr-kp14-3": {
    question:
      "What limits the speedup of self-speculative decoding compared with using a separate small draft model?",
    options: [
      "It still relies on the full target-model backbone to produce draft tokens",
      "It changes the target model's output distribution",
      "It only works for models smaller than 7B",
      "It requires labeled multi-token targets",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp1-1": {
    question: "Why does scaled dot-product attention divide by sqrt(d_k)?",
    options: [
      "To keep attention logits from growing too large and saturating the softmax",
      "To make each attention row sum to 1",
      "To match the dimension of the value vectors",
      "To apply the causal mask",
    ],
    correctAnswer: 0,
  },
  "q-tr-kp5-1": {
    question:
      "In the original transformer learning-rate schedule, when does the learning rate reach its maximum?",
    options: [
      "At step 1",
      "At step = warmup_steps",
      "At step = 2 * warmup_steps",
      "It never reaches a maximum",
    ],
    correctAnswer: 1,
  },
  "q-dl-kp9-1": {
    question:
      "For cross-entropy loss L = -log(p_correct), what is the loss when p_correct = 0.01?",
    options: ["0.01", "1.0", "4.6", "100"],
    correctAnswer: 2,
  },
  "q-tab-kp35-1": {
    question:
      "Production labels arrive 30 days late. Which method can detect feature drift before labels are available?",
    options: [
      "Compare training and production feature distributions with PSI, KS, or chi-squared tests",
      "Compute AUROC on the production set",
      "Tune the classification threshold on production data",
      "Measure training loss on the original training set",
    ],
    correctAnswer: 0,
  },
  "q-tab-kp26-2": {
    question:
      "You are predicting loan default at origination. Which feature is target leakage?",
    options: [
      "Applicant income at origination",
      "Credit score at origination",
      "Number of missed payments in the 90 days after origination",
      "Debt-to-income ratio at origination",
    ],
    correctAnswer: 2,
  },
  "q-tab-kp11-3": {
    question:
      "For a gradient-boosted tree model, why is TreeSHAP usually preferred over KernelSHAP?",
    options: [
      "TreeSHAP uses the tree structure to compute exact SHAP values efficiently",
      "TreeSHAP works only for classification, while KernelSHAP works for regression",
      "TreeSHAP removes low-importance features before explaining the model",
      "TreeSHAP gives only global explanations, while KernelSHAP gives only local explanations",
    ],
    correctAnswer: 0,
  },
  "q-opt-kp4-2": {
    question:
      "A cosine annealing schedule without warm restarts decreases the learning rate smoothly from a maximum to a minimum along a cosine curve.",
    correctAnswer: "true",
  },
  "q-opt-kp35-3": {
    question:
      "What is the main advantage of variance-reduction methods like SVRG over plain SGD on finite-sum objectives?",
    options: [
      "They guarantee the global minimum for non-convex problems",
      "They reduce gradient noise by correcting stochastic gradients with reference information, which can speed convergence",
      "They remove the need for any full-gradient computation",
      "They remove the need for learning-rate tuning",
    ],
    correctAnswer: 1,
  },
  "q-opt-kp36-1": {
    question:
      "Why do zeroth-order gradient estimators become expensive in high dimensions?",
    options: [
      "They require Hessian-vector products at every step",
      "Their gradient estimates get noisier as dimension grows, so they need many more function evaluations",
      "They can optimize only convex objectives",
      "They cannot use random directions in high dimensions",
    ],
    correctAnswer: 1,
  },
  "q-opt-kp37-3": {
    question:
      "For strongly convex objectives, what convergence rate is typical for SGD with a decaying learning rate eta_t = O(1/t)?",
    options: ["O(log t / t)", "O(1/sqrt(t))", "O(1/t^2)", "O(1)"],
    correctAnswer: 0,
  },
  "q-opt-kp40-3": {
    question:
      "What is the practical goal of orthogonalizing a matrix-valued update in Muon?",
    options: [
      "To make the update zero so only momentum changes the weights",
      "To spread the update more evenly across the matrix's directions instead of letting a few large directions dominate",
      "To force the weight matrix itself to stay exactly orthogonal after every step",
      "To turn a dense gradient into a sparse gradient",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp4-3": {
    question: "How are clinical-note de-identification systems usually evaluated?",
    options: [
      "BLEU on the redacted note text",
      "Precision, recall, and F1 on predicted PHI spans",
      "AUROC for classifying whether a note contains PHI",
      "Word error rate after redaction",
    ],
    correctAnswer: 1,
  },
  "q-hc-kp7-3": {
    question: "What does GDT_TS measure in protein structure prediction?",
    options: [
      "Average percentage of C-alpha atoms within 1, 2, 4, and 8 angstroms of the reference structure",
      "Per-residue confidence assigned by the model",
      "RMSD of all heavy atoms after alignment",
      "Sequence identity to the nearest template",
    ],
    correctAnswer: 0,
  },
  "q-hc-kp8-3": {
    question: "What is a common limitation of standard GWAS analyses?",
    options: [
      "They test one variant at a time, so variant interactions can be missed",
      "They cannot use case-control data",
      "They require every significant variant to change a protein sequence",
      "They directly prove causation for each significant variant",
    ],
    correctAnswer: 0,
  },
  "q-hc-kp27-3": {
    question:
      "Which evaluation setup checks whether synthetic health data is useful for training a model that will be used on real patients?",
    options: [
      "Train on real, test on synthetic (TRTS)",
      "Train on synthetic, test on real (TSTR)",
      "Compare average record length only",
      "Compute BLEU between real and synthetic records",
    ],
    correctAnswer: 1,
  },
  "q-sciml-kp1-3": {
    question: "Why are adaptive loss weights used in PINNs?",
    options: [
      "To keep boundary, residual, and data losses learning at similar speeds",
      "To remove the need for boundary conditions",
      "To make automatic differentiation unnecessary",
      "To turn the PINN into a mesh-based solver",
    ],
    correctAnswer: 0,
  },
  "q-sciml-kp25-3": {
    question: "Why add conservation constraints to an ML climate model?",
    options: [
      "To reduce long-rollout drift by keeping mass and energy physically consistent",
      "To remove the need for training data",
      "To guarantee the model works at any spatial resolution",
      "To make forecasts independent of initial conditions",
    ],
    correctAnswer: 0,
  },
  "q-sciml-kp36-3": {
    question: "What does a-posteriori instability mean for an ML turbulence model?",
    options: [
      "It predicts stresses well on frozen validation inputs but destabilizes the CFD solver when used inside the simulation loop",
      "Its training loss oscillates and fails to converge",
      "It can model only laminar flows",
      "It requires double-precision hardware to run",
    ],
    correctAnswer: 0,
  },
  "q-sciml-kp40-3": {
    question:
      "In DreamFusion-style SDS, what signal from the diffusion model is used to update the 3D scene?",
    options: [
      "A denoising direction that pushes rendered views toward images the diffusion model considers likely for the prompt",
      "Pixelwise error against labeled target photos",
      "A classification score for the rendered object",
      "Exact 3D supervision from a reference mesh",
    ],
    correctAnswer: 0,
  },
  "q-adapt-kp4-3": {
    question:
      "In the Ben-David adaptation bound, which term does DANN try to reduce with its domain classifier?",
    options: [
      "Source task loss",
      "The divergence between source and target feature distributions",
      "The irreducible joint error lambda*",
      "The entropy of target labels",
    ],
    correctAnswer: 1,
  },
  "q-ssl-kp4-3": {
    question: "Why does SimCLR typically benefit from very large batch sizes?",
    options: [
      "Each example sees many in-batch negatives in the contrastive loss",
      "Large batches make the projection head unnecessary",
      "Large batches reduce the need for image augmentations",
      "Linear probing only works after large-batch pre-training",
    ],
    correctAnswer: 0,
  },
  "q-ssl-kp38-2": {
    question:
      "Which statement best describes SSL pre-training for molecular GNNs?",
    options: [
      "Several objectives are common in practice; masking, context prediction, and contrastive learning can all work well",
      "Context prediction is the only objective that transfers reliably",
      "Contrastive learning has fully replaced masking-based methods",
      "Most molecular GNNs are pre-trained by reconstructing exact 3D coordinates",
    ],
    correctAnswer: 0,
  },
  "q-cv-kp13-2": {
    question: "What does the brightness constancy assumption say in optical flow?",
    options: [
      "The same scene point keeps approximately the same intensity between consecutive frames",
      "The whole image keeps the same average brightness across frames",
      "All objects move at constant speed",
      "Neighboring pixels always have identical brightness",
    ],
    correctAnswer: 0,
  },
  "q-cv-kp13-3": {
    question:
      "Dense optical flow assigns a 2D motion vector to each pixel in the image.",
    correctAnswer: "true",
  },
  "q-msd-kp1-3": {
    question:
      "A model replica can handle 100 concurrent requests. If p99 latency is 80 ms, about how many replicas are needed to serve 10,000 QPS?",
    options: ["1", "8", "80", "125"],
    correctAnswer: 1,
  },
  "q-msd-kp1-6": {
    question:
      "99.9% availability over a 30-day month allows about how much downtime?",
    options: ["4.3 minutes", "43 minutes", "4.3 hours", "43 hours"],
    correctAnswer: 1,
  },
  "q-msd-kp2-3": {
    question:
      "A fraud model must catch at least 80% of fraud. Which offline metric best matches that requirement?",
    options: [
      "Accuracy",
      "Precision at 80% recall",
      "Mean squared error",
      "R^2",
    ],
    correctAnswer: 1,
  },
  "q-msd-kp5-6": {
    question:
      "A mobile model search produced four candidates: A (92% accuracy, 20 ms), B (94%, 35 ms), C (92%, 28 ms), and D (91%, 18 ms). Which candidate is Pareto-dominated?",
    options: ["A", "B", "C", "D"],
    correctAnswer: 2,
  },
  "q-msd-kp7-6": {
    question:
      "A serving pipeline has four sequential steps: retrieval 5 ms, feature fetch 10 ms, reranking 20 ms, and post-processing 2 ms. If you can cut exactly one step in half, which change reduces end-to-end latency the most?",
    options: [
      "Cut retrieval from 5 ms to 2.5 ms",
      "Cut feature fetch from 10 ms to 5 ms",
      "Cut reranking from 20 ms to 10 ms",
      "Cut post-processing from 2 ms to 1 ms",
    ],
    correctAnswer: 2,
  },
  "q-msd-kp10-3": {
    question:
      "Fraud rate is 0.5%. What accuracy does a model get by predicting 'not fraud' for every transaction?",
    options: ["50%", "95%", "99.5%", "100%"],
    correctAnswer: 2,
  },
  "q-msd-kp13-1": {
    question:
      "A moderation system handles 100,000 posts per second. Harmful rate is 0.1%. Recall is 85%, and precision is 99%. About how many false positives does it produce per second?",
    options: ["About 1", "About 15", "About 85", "About 1,000"],
    correctAnswer: 0,
  },
  "q-msd-kp14-6": {
    question:
      "Scoring one record pair takes 0.1 ms. About how long would it take to score 50 billion pairs on one machine?",
    options: [
      "About 58 minutes",
      "About 58 hours",
      "About 58 days",
      "About 58 years",
    ],
    correctAnswer: 2,
  },
};

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function ensureSentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function cleanExplanation(text: string): string {
  let normalized = normalizeText(text);

  for (const marker of [
    "Wait - let me reconsider:",
    "Wait, let me reconsider:",
    "Wait - let\'s recheck:",
    "Wait, let\'s recheck:",
    "Wait: let\'s recompute.",
    "Wait:",
    "Correction:",
    "Let me restate:",
  ]) {
    const markerIndex = normalized.lastIndexOf(marker);
    if (markerIndex !== -1) {
      normalized = normalized.slice(markerIndex + marker.length).trim();
    }
  }

  return normalized;
}

function firstSentence(text: string): string {
  const normalized = normalizeText(text);
  const match = normalized.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : normalized;
}

function clip(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}...`;
}

function dedupeHints(hints: string[]): string[] {
  const seen = new Set<string>();
  const normalizedHints: string[] = [];

  for (const hint of hints) {
    const normalizedHint = ensureSentence(normalizeText(hint));
    const key = normalizedHint.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      normalizedHints.push(normalizedHint);
    }
  }

  return normalizedHints;
}

function hasConcreteExample(questionText: string): boolean {
  return /\[[^\]]+\]|"[^"]+"|\bgiven\b|\bfor input\b|\bfor nums\b|\bfor coins\b|\bfor tree\b|\bfor\s+[A-Za-z0-9_]+\s*=/.test(
    questionText,
  );
}

function buildRecallHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase();

  if (question.type === "true-false") {
    return "Recall the exact rule the statement is claiming before you try to confirm or disprove it.";
  }

  if (
    /(dynamic programming|dp|recurrence|stairs|coin change|house robber|word break|subsequence)/i.test(
      haystack,
    )
  ) {
    return "Define the state clearly first, then ask how the current answer depends on smaller subproblems.";
  }

  if (/(hash map|hash set|complement|duplicate)/i.test(haystack)) {
    return "Ask what value must be remembered from earlier elements so each new element can be checked in O(1) time.";
  }

  if (/(stack|parentheses|bracket|queue)/i.test(haystack)) {
    return "Track the order in which items must be matched or removed; that usually identifies the right data structure.";
  }

  if (/(linked list|pointer|cycle|node)/i.test(haystack)) {
    return "Sketch the pointer positions before and after one move so you can see which references must be preserved.";
  }

  if (/(tree|bst|inorder|ancestor|level order|traversal)/i.test(haystack)) {
    return "Start from the tree property or traversal order that must stay true at every node.";
  }

  if (/(binary search|sorted|pivot|divide and conquer|half)/i.test(haystack)) {
    return "Identify the condition that lets you discard half of the remaining search space.";
  }

  if (
    /(prime|factor|gcd|lcm|mod|totient|fibonacci|binomial|catalan|logarithm)/i.test(
      haystack,
    )
  ) {
    return "Recall the defining identity or recurrence first, then apply it to the specific numbers in the prompt.";
  }

  return "Pin down the core invariant or rule first, then compare the answer choices against it.";
}

function buildWorkHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase();

  if (question.type === "true-false") {
    return "Test the claim on the smallest confirming example or counterexample you can build.";
  }

  if (hasConcreteExample(question.question)) {
    return "Work the exact example in the prompt step by step before you choose an answer.";
  }

  if (/time complexity|space complexity|optimal/i.test(haystack)) {
    return "Count how many elements, states, or levels the best-known approach has to process.";
  }

  return "Write down one intermediate step by hand; the right choice should match that state change.";
}

function buildConceptHint(question: Question, explanation: string): string {
  const summary = clip(
    firstSentence(explanation).replace(
      /\boption\s+[0-9A-D]+\b/gi,
      "the correct choice",
    ),
    160,
  );
  const prefix =
    question.difficulty === "hard" ? "Key checkpoint" : "Core idea";
  return `${prefix}: ${summary}`;
}

function normalizeHints(question: Question, explanation: string): string[] {
  const authoredHints = question.hints ? dedupeHints(question.hints) : [];
  const fallbackHints = dedupeHints([
    buildRecallHint(question, explanation),
    buildWorkHint(question, explanation),
    buildConceptHint(question, explanation),
  ]);

  if (authoredHints.length === 0) {
    return fallbackHints;
  }

  const combinedHints = dedupeHints([...authoredHints, ...fallbackHints]);
  return combinedHints.slice(0, Math.max(3, authoredHints.length));
}

function normalizeQuestion(question: Question): Question {
  const overriddenQuestion = questionOverrides[question.id]
    ? { ...question, ...questionOverrides[question.id] }
    : question;
  const explanation = ensureSentence(
    cleanExplanation(overriddenQuestion.explanation),
  );

  return {
    ...overriddenQuestion,
    explanation,
    hints: normalizeHints(overriddenQuestion, explanation),
  };
}

function normalizeQuestionSet(questions: Question[]): Question[] {
  return questions
    .map((question, index) => ({
      question: normalizeQuestion(question),
      index,
    }))
    .sort((a, b) => {
      const difficultyDelta =
        difficultyRank[a.question.difficulty] -
        difficultyRank[b.question.difficulty];
      return difficultyDelta !== 0 ? difficultyDelta : a.index - b.index;
    })
    .map(({ question }) => question);
}

export function registerQuestions(map: QuestionsMap) {
  const normalizedEntries = Object.fromEntries(
    Object.entries(map).map(([kpSlug, questions]) => [
      kpSlug,
      normalizeQuestionSet(questions),
    ]),
  );

  Object.assign(registry, normalizedEntries);
}

export function getQuestions(kpSlug: string): Question[] {
  return registry[kpSlug] ?? [];
}

export function getAllQuestions(): QuestionsMap {
  return registry;
}

// ── Course question files ─────────────────────────────────────────────────
import "./rl-fundamentals";
import "./rl-applications";
import "./math-for-ml";
import "./rlhf-alignment";
import "./nlp-fundamentals";
import "./computer-vision";
import "./agentic-ai";
import "./deep-learning-fundamentals";
import "./ml-systems";
import "./transformers-llms";
import "./financial-ml";
import "./production-ml-engineering";
import "./speech-audio";
import "./quantum-ml";
import "./ai-climate";
import "./robotics-embodied";
import "./vision-3d";
import "./ai-healthcare";
import "./scientific-ml";
import "./generative-adversarial-networks";
import "./domain-adaptation-advanced";
import "./ml-system-design";
import "./linear-algebra-deep-dive";
import "./tabular-ml";
import "./ml-evaluation-benchmarking";
import "./data-centric-ai";
import "./advanced-optimization-ml";
import "./meta-learning";
import "./self-supervised-learning";
import "./coding-interviews-1";
import "./coding-interviews-2";
import "./coding-interviews-3";
import "./gemini-multimodal";
import "./karpathy-nn-zero-to-hero";
import "./fastai-deep-learning";
