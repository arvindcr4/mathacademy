import type { Question } from '@/lib/curriculum'

// Registry: maps kp-slug → questions array
export type QuestionsMap = Record<string, Question[]>

const registry: QuestionsMap = {}

const difficultyRank: Record<Question['difficulty'], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
}

type QuestionOverride = Partial<
  Pick<Question, 'question' | 'options' | 'correctAnswer' | 'explanation' | 'hints' | 'codeSnippet'>
>

const questionOverrides: Record<string, QuestionOverride> = {
  'q-ra-1': {
    correctAnswer: 1,
    explanation: 'A right rotation by 3 moves the last three elements, [5,6,7], to the front. The result is [5,6,7,1,2,3,4].',
    hints: ['This is a right rotation, so the tail moves to the front.', 'Take the last three elements [5,6,7] and place them before [1,2,3,4].'],
  },
  'q-rnn-4': {
    options: ['1→2→3→4', '1→2→3→5', '1→3→4→5', '2→3→4→5'],
    correctAnswer: 1,
    explanation: 'Counting from the end gives 5 as first and 4 as second, so the node with value 4 is removed. The remaining list is 1→2→3→5.',
    hints: ['Count backward from the tail: 5 is first, 4 is second.', 'Delete the node with value 4 and reconnect 3 directly to 5.'],
  },
  'q-vbst-2': {
    options: ['[10,5,15,null,null,6,20]', '[5,3,7,1,4,6,8]', '[2,1,3]', '[1,null,2]'],
    correctAnswer: 0,
    explanation: 'The tree [10,5,15,null,null,6,20] passes the immediate-child check at node 15 because 6 < 15, but it is still invalid because 6 lies in the right subtree of 10 and must therefore be greater than 10.',
    hints: ['A node in the right subtree must respect every ancestor bound, not only its parent.', 'Here the value 6 is in the right subtree of 10, so it violates the global lower bound.'],
  },
  'q-mfml-kp12-1': {
    question: 'Let f(u) = u³ and u = g(x) = 2x. Compute df/dx at x = 2.',
    correctAnswer: 3,
    explanation: 'By the chain rule, df/dx = (df/du)(du/dx). Here f(u)=u³ so df/du = 3u², and u=2x so du/dx = 2. At x=2, u=4, so df/dx = 3(4²)·2 = 96.',
  },
  'q-rl-kp12-3': {
    options: ['1', '1 + 0.5·V^π(s₂)', '4/3', '2'],
    explanation: 'Apply the Bellman equations simultaneously: V^π(s₁) = 1 + 0.5·V^π(s₂) and V^π(s₂) = 0.5·V^π(s₁). Substituting gives V^π(s₁) = 1 + 0.25·V^π(s₁), so 0.75·V^π(s₁) = 1 and V^π(s₁) = 4/3. The same result comes from the return series 1 + 0 + 0.25 + 0 + 0.0625 + … = 1/(1−0.25) = 4/3.',
  },
  'q-dc-kp3-2': {
    correctAnswer: 'true',
    explanation: 'Asymmetric label noise is generally more damaging because it pushes the decision boundary in one direction instead of adding balanced uncertainty to both classes. If only class A is flipped to class B, the model learns a systematic bias against class A. Under symmetric noise at the same rate, the corruption is more evenly distributed and partially cancels out.',
  },
  'q-eval-kp10-2': {
    correctAnswer: 'true',
    explanation: 'MRR only uses the rank of the first relevant result for each query. If the first relevant result is at rank 3, the reciprocal rank is 1/3, and later relevant documents at ranks 5 and 7 do not affect that query\'s MRR contribution.',
  },
  'q-bit-single-1': {
    hints: ['Use the facts a ^ a = 0 and x ^ 0 = x.', 'XOR the entire array; every paired value cancels and the leftover value is the answer.'],
  },
  'q-bit-single-2': {
    hints: ['XOR is commutative and associative, so you can regroup equal values.', 'Cancel 2 ^ 2 and 3 ^ 3 first, then read the single value that remains.'],
  },
  'q-bit-single-3': {
    correctAnswer: 1,
    explanation: 'The XOR trick works whenever every non-unique value appears an even number of times. Values that appear 2, 4, or 6 times still cancel to 0, so the statement is false.',
    hints: ['XOR cancels values that appear an even number of times.', 'Test a value appearing four times: a ^ a ^ a ^ a still reduces to 0.'],
  },
  'q-bit-pow2-1': {
    hints: ['A power of 2 has exactly one 1 bit in binary.', 'Look for the option whose binary form is 1000...0.'],
  },
  'q-bit-pow2-2': {
    hints: ['Write 16 and 15 in binary before you AND them.', 'n & (n - 1) clears the lowest set bit, so a pure power of 2 becomes 0.'],
  },
  'q-bit-pow2-3': {
    question: 'For a positive integer n, which test correctly checks whether n is a power of 2?',
    options: ['n & (n-1) == n', 'n > 0 && (n & (n-1)) == 0', 'n | (n-1) == n', 'n has an odd number of 1 bits'],
    correctAnswer: 1,
    explanation: 'A positive power of 2 has exactly one set bit. Subtracting 1 turns that bit into 0 and fills the lower bits with 1s, so n & (n - 1) becomes 0 only for positive one-set-bit numbers.',
    hints: ['For positive n, a power of 2 has exactly one set bit.', 'The expression n & (n - 1) removes the lowest set bit, so it becomes 0 only when there was exactly one.'],
  },
  'q-bit-pow2-4': {
    hints: ['Powers of 2 start at 1 = 2^0, not at 0.', '0 has no set bits, so it does not match the one-set-bit pattern.'],
  },
  'q-bit-count-1': {
    hints: ['Count only the 1 bits, not the total number of binary digits.', 'In 100100, exactly two positions are set.'],
  },
  'q-bit-count-2': {
    hints: ['Track what one n & (n - 1) operation does to the binary representation.', 'Each iteration removes one lowest set bit, so the loop count equals the number of 1s.'],
  },
  'q-bit-count-3': {
    hints: ['Rewrite 15 in binary first.', 'Brian Kernighan runs once per set bit, and 1111 contains four of them.'],
  },
  'q-bit-count-4': {
    explanation: "In two\'s complement, -n equals ~n + 1, so all higher bits flip and the lowest set bit stays aligned. As a result, n & (-n) keeps only the least significant 1 bit.",
    hints: ["Use the two\'s-complement identity -n = ~n + 1.", 'n & (-n) zeroes out every other set bit and leaves only the least significant 1.'],
  },
  'q-bit-rev-1': {
    hints: ['Reverse the 8-bit string exactly left to right.', 'The trailing 000 become the leading 000 after reversal.'],
  },
  'q-bit-rev-2': {
    hints: ['Think about swapping 1-bit blocks, then 2-bit blocks, then 4-bit blocks.', 'The standard O(1) method uses fixed masks and shifts to swap groups in parallel.'],
  },
  'q-bit-rev-3': {
    correctAnswer: 1,
    explanation: 'That expression swaps byte positions, but it does not reverse the bit order inside each byte. Bit reversal must also reverse the order within every byte, so the statement is false.',
    hints: ['Shifting by 8 moves a byte; it does not reverse the bits inside that byte.', 'Test the low byte 00000011: reversed, it should become 11000000, not just shift to another byte position.'],
  },
  'q-bit-rev-4': {
    explanation: 'Iterate exactly 32 times. Each step shifts result left, appends the current least significant bit of n, then unsigned-shifts n right; return result >>> 0 so the final value is treated as unsigned.',
    hints: ['Take the current least significant bit with n & 1 and append it onto result.', 'Run exactly 32 iterations, then use >>> 0 so the returned 32-bit value is unsigned.'],
  },
  'q-gray-1': {
    hints: ['Compare consecutive codes, not their numeric order.', 'The defining rule is that each step flips exactly one bit.'],
  },
  'q-gray-2': {
    correctAnswer: 1,
    explanation: 'Use the conversion g = n ^ (n >> 1). For n = 3, binary 11 ^ 01 = 10, so the Gray code is 10.',
    hints: ['Use the formula g = n ^ (n >> 1).', 'For n = 3, compute 11 ^ 01 to get 10.'],
  },
  'q-gray-3': {
    hints: ['Test the formula on a small input such as i = 2 or i = 3.', 'i ^ (i >> 1) is the standard binary-to-Gray conversion.'],
  },
  'q-gray-4': {
    hints: ['There are 2^n Gray codes, one for each integer i from 0 to 2^n - 1.', 'Append i ^ (i >> 1) for each i in order.'],
  },
  'q-subset-1': {
    hints: ['Each element has two choices: in or out.', 'Three independent choices produce 2^3 subsets.'],
  },
  'q-subset-2': {
    hints: ['Read each bit as include this index or skip it.', 'In 101, bits 0 and 2 are set, so those two positions are included.'],
  },
  'q-subset-3': {
    hints: ['A 1 bit means that element is selected.', 'If every bit is 0, no elements are selected, so the subset is empty.'],
  },
  'q-subset-4': {
    hints: ['Iterate masks from 0 to 2^n - 1.', 'For each mask, include nums[i] exactly when bit i is 1.'],
  },
  'q-hash-func-1': {
    hints: ['Arrays are fast only after you know the index; string keys are not indices.', 'A hash function turns a key into a bucket number so lookup can start in constant time.'],
  },
  'q-hash-func-2': {
    hints: ['If too many keys pile into the same few buckets, lookup stops behaving like O(1).', 'Uniform spread keeps chains or probe sequences short, which is why good hash functions aim for it.'],
  },
  'q-hash-map-1': {
    hints: ['You do not scan the full table; you jump directly to one bucket from the key.', 'If the load factor stays controlled, the remaining work inside that bucket is constant on average.'],
  },
  'q-hash-map-2': {
    question: 'One common collision-resolution strategy is separate chaining.',
    explanation: 'Separate chaining stores colliding entries in a per-bucket container such as a linked list. It is a common strategy, although open addressing is another valid collision-resolution approach.',
    hints: ['A collision means one bucket must hold multiple entries somehow.', 'If those entries hang off the bucket in a linked list or similar container, that method is separate chaining.'],
  },
  'q-col-1': {
    hints: ['Different keys can still land in the same bucket.', 'That shared-bucket event is a collision, not a lookup miss or a broken table.'],
  },
  'q-col-2': {
    hints: ['Linear probing, quadratic probing, and double hashing search other array slots.', 'The strategy that keeps multiple entries at one bucket in a linked list is separate chaining.'],
  },
  'q-two-sum-1': {
    hints: ['At index i, ask whether target - nums[i] was seen earlier.', 'You need a structure that can answer that lookup quickly and remember the earlier index.'],
  },
  'q-two-sum-2': {
    hints: ['In the one-pass solution, each element is queried once and inserted once.', 'The map can grow to size n, so both time and extra space are linear.'],
  },
  'q-ana-1': {
    question: 'In the sorting-based approach, what canonical form is used to identify anagram groups?',
    explanation: 'In the sorting-based solution, each word is sorted so every anagram in the same group shares the same key. For example, "eat" and "ate" both sort to "aet".',
    hints: ['Anagrams may differ in order, but they share the same letters with the same counts.', 'In the sorting-based approach, sorting each word makes every member of a group share one canonical key.'],
  },
  'q-ana-2': {
    hints: ['For one string of length k, the expensive step is sorting its characters.', 'Doing that for n strings gives O(n * k log k) time in the max-length form.'],
  },
  'q-swap-1': {
    explanation: 'XOR swap relies on the facts that XOR is associative and that x ^ x = 0 and x ^ 0 = x. After a ^= b, b ^= a, a ^= b, the two values exchange without a temporary variable when the storage locations are distinct.',
    hints: ['Track the values after each XOR step, not just the final line.', 'The key cancellations are x ^ x = 0 and x ^ 0 = x.'],
  },
  'q-swap-2': {
    hints: ['Pretend both names refer to the same storage cell.', 'The first XOR becomes x ^ x, so the original value is destroyed immediately.'],
  },
  'q-miss-1': {
    explanation: 'XOR the full range 0 ^ 1 ^ 2 ^ 3 and then XOR the array values 3 ^ 0 ^ 1. Every present value cancels, leaving 0 ^ 1 ^ 2 ^ 3 ^ 3 ^ 0 ^ 1 = 2.',
    hints: ['XOR the full range 0..n, then XOR every array value.', 'Every value that appears in both places cancels, leaving the missing one.'],
  },
  'q-miss-2': {
    question: 'For an array of n numbers drawn from [0, n] with one missing value, what sum formula recovers the missing number?',
    hints: ['Compute the expected sum 0 + 1 + ... + n first.', 'The missing value is the gap between the expected sum and the actual array sum.'],
  },
  'q-miss-3': {
    explanation: 'Compute (0 ^ 1 ^ ... ^ n) ^ (array XOR). Every value in 0..n except the missing one appears once in each group and cancels, so the remaining value is the missing number.',
    hints: ['Group the expression as (0 ^ 1 ^ ... ^ n) ^ (array XOR).', 'Every present value appears twice overall and disappears.'],
  },
  'q-pal-1': {
    hints: ['Compare the first and last bit before worrying about the middle.', 'In 10001, the outer 1s match and the inside is symmetric.'],
  },
  'q-pal-2': {
    question: 'One way to check whether a binary representation is a palindrome is to reverse the significant bits and compare the result to the original.',
    explanation: 'Yes. Explicitly reversing the significant bits and comparing works. It takes O(n) time over n bits, and if you materialize the reversed form explicitly it can use O(n) extra space.',
    hints: ['Reversing the significant bits and comparing is one valid approach.', 'A two-pointer bit check avoids building the reversed form explicitly.'],
  },
  'q-pal-3': {
    question: 'In a fixed 32-bit representation, you can check bit-palindrome by comparing bits at positions i and 31 - i.',
    explanation: 'For a fixed 32-bit view, a palindrome means bit i must match bit 31 - i for every i. A two-pointer scan from both ends correctly checks that condition.',
    hints: ['This works only after you fix the representation width.', 'In a fixed 32-bit view, bit i must match bit 31 - i.'],
  },
  'q-pal-4': {
    question: 'Write isBitPalindrome(n) to check whether the significant-bit binary representation of n is a palindrome.',
    explanation: 'Start from the highest set bit, not automatically from bit 31. Then compare mirrored significant bits while moving inward until the pointers cross.',
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
    hints: ['Start from the highest set bit, not automatically from bit 31.', 'Compare mirrored significant bits while moving inward.'],
  },
  'q-dp-sc-2': {
    correctAnswer: 'false',
    explanation: 'There are 2^20 subsets and 20 possible ending cities, so the state count is 20 * 2^20 = 20,971,520, which is about 21 million, not 400 million.',
    hints: ['Count states as (visited subset, last city) pairs.', '2^20 is about one million, so multiplying by 20 gives about 21 million states.'],
  },
  'q-dp-sc-3': {
    options: ['Bitwise AND', 'Set / clear / test bit operations', 'Modulo arithmetic', 'Floating point ops'],
    correctAnswer: 1,
    explanation: 'Bitmask DP repeatedly tests membership with mask & (1 << i), sets bits with |, and clears bits with & ~ or XOR when appropriate. Those set / clear / test operations are the core transition tools.',
    hints: ['A subset state is just bits inside one integer.', 'Transitions need three primitives: set a bit, clear a bit, and test a bit.'],
  },
  'q-dp-sc-4': {
    question: 'Implement bitmask DP for the minimum-cost Hamiltonian path that starts at city 0.',
    explanation: 'Let dp[mask][i] be the minimum cost to start at city 0, visit exactly the cities in mask, and finish at city i. Transition from a previous city j in mask \\ {i}.',
    hints: ['Let dp[mask][i] be the best cost to end at city i after visiting exactly mask.', 'Decide up front whether the task is a path or a cycle, because the final return step changes the recurrence.'],
  },
  'q-dp-tree-3': {
    explanation: 'At each node, keep the two largest child heights. The best path through that node is their sum, and the recursive return value is the largest child height plus 1.',
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
    hints: ['At each node, only the two largest child depths matter.', 'Keep one unit throughout: either measure both height and diameter in edges, or both in nodes.'],
  },
  'q-dp-int-2': {
    options: ['dp[i][j] = min_k(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])', 'dp[i][j] = min(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = dp[i][j/2] * 2', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])'],
    explanation: 'For matrix chain A_i...A_j split at k, the cost is dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j]. The scalar multiplication term uses the outer dimensions of the two subchains.',
    hints: ['Split the chain at k, then pay left cost + right cost + one final matrix multiply.', 'That final multiply uses the outer dimensions of the two subchains.'],
  },
  'q-dp-int-3': {
    question: 'Implement DP to compute the minimum search cost of an optimal BST.',
    explanation: 'Let dp[i][j] be the minimum search cost for keys i..j. Try each key k as root, pay left cost + right cost + sum(freq[i..j]), and use dp[i][i] = freq[i] as the single-key base case.',
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
    hints: ['Define dp[i][j] as the minimum search cost for keys i..j.', 'Use prefix sums so the total frequency of an interval is O(1) to query.'],
  },
  'q-dp-graph-2': {
    question: 'Implement longest path from node 0 in a DAG using topological sort.',
    explanation: 'After topological sorting, process nodes in that order and relax outgoing edges. In this single-source version, initialize dp[0] = 0 and all other nodes to -Infinity.',
    hints: ['Topologically sort first so every predecessor is settled before you relax outgoing edges.', 'Be explicit about whether paths may start at any source or only at node 0.'],
  },
  'q-dp-prob-1': {
    correctAnswer: 2,
    explanation: 'Probability DP often uses expectation recurrences or probability-mass transitions between states. In problems like expected trials or coupon collector, the key recurrence is usually an expectation formula rather than Bayesian updating.',
    hints: ['Probability DP usually pushes mass across transitions weighted by their probabilities.', 'If the target is expected steps, write an expectation recurrence.'],
  },
  'q-dp-prob-3': {
    question: 'Implement the expected number of draws needed to collect all N coupons.',
    explanation: 'Let dp[i] be the expected draws needed to reach i distinct coupons. When you already have i - 1 distinct coupons, the probability the next draw is new is (n - (i - 1)) / n, so the expected waiting time for that next new coupon is n / (n - (i - 1)).',
    hints: ['The natural state is how many distinct coupons you already have.', 'The wait for the next new coupon is geometric with success probability (n - i) / n.'],
  },
  'q-dp-opt-3': {
    question: 'Implement one divide-and-conquer DP layer using a fixed previous DP row.',
    explanation: 'Divide-and-conquer optimization computes currDp[mid] from a fixed prevDp row by searching k in [optL, optR]. The monotone argmin property then narrows the candidate range for the left and right recursive calls.',
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
    hints: ['Divide-and-conquer DP optimization computes a new DP row from a fixed previous row.', 'Monotone argmins let you recurse left and right with narrower candidate ranges.'],
  },
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function ensureSentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function cleanExplanation(text: string): string {
  let normalized = normalizeText(text)

  for (const marker of [
    'Wait - let me reconsider:',
    'Wait, let me reconsider:',
    "Wait - let's recheck:",
    "Wait, let's recheck:",
    "Wait: let's recompute.",
    'Wait:',
    'Correction:',
    'Let me restate:',
  ]) {
    const markerIndex = normalized.lastIndexOf(marker)
    if (markerIndex !== -1) {
      normalized = normalized.slice(markerIndex + marker.length).trim()
    }
  }

  return normalized
}

function firstSentence(text: string): string {
  const normalized = normalizeText(text)
  const match = normalized.match(/^.*?[.!?](?=\s|$)/)
  return match ? match[0] : normalized
}

function clip(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}...`
}

function dedupeHints(hints: string[]): string[] {
  const seen = new Set<string>()
  const normalizedHints: string[] = []

  for (const hint of hints) {
    const normalizedHint = ensureSentence(normalizeText(hint))
    const key = normalizedHint.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      normalizedHints.push(normalizedHint)
    }
  }

  return normalizedHints
}

function hasConcreteExample(questionText: string): boolean {
  return /\[[^\]]+\]|"[^"]+"|\bgiven\b|\bfor input\b|\bfor nums\b|\bfor coins\b|\bfor tree\b|\bfor\s+[A-Za-z0-9_]+\s*=/.test(questionText)
}

function buildRecallHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase()

  if (question.type === 'true-false') {
    return 'Recall the exact rule the statement is claiming before you try to confirm or disprove it.'
  }

  if (/(dynamic programming|dp|recurrence|stairs|coin change|house robber|word break|subsequence)/i.test(haystack)) {
    return 'Define the state clearly first, then ask how the current answer depends on smaller subproblems.'
  }

  if (/(hash map|hash set|complement|duplicate)/i.test(haystack)) {
    return 'Ask what value must be remembered from earlier elements so each new element can be checked in O(1) time.'
  }

  if (/(stack|parentheses|bracket|queue)/i.test(haystack)) {
    return 'Track the order in which items must be matched or removed; that usually identifies the right data structure.'
  }

  if (/(linked list|pointer|cycle|node)/i.test(haystack)) {
    return 'Sketch the pointer positions before and after one move so you can see which references must be preserved.'
  }

  if (/(tree|bst|inorder|ancestor|level order|traversal)/i.test(haystack)) {
    return 'Start from the tree property or traversal order that must stay true at every node.'
  }

  if (/(binary search|sorted|pivot|divide and conquer|half)/i.test(haystack)) {
    return 'Identify the condition that lets you discard half of the remaining search space.'
  }

  if (/(prime|factor|gcd|lcm|mod|totient|fibonacci|binomial|catalan|logarithm)/i.test(haystack)) {
    return 'Recall the defining identity or recurrence first, then apply it to the specific numbers in the prompt.'
  }

  return 'Pin down the core invariant or rule first, then compare the answer choices against it.'
}

function buildWorkHint(question: Question, explanation: string): string {
  const haystack = `${question.question} ${explanation}`.toLowerCase()

  if (question.type === 'true-false') {
    return 'Test the claim on the smallest confirming example or counterexample you can build.'
  }

  if (hasConcreteExample(question.question)) {
    return 'Work the exact example in the prompt step by step before you choose an answer.'
  }

  if (/time complexity|space complexity|optimal/i.test(haystack)) {
    return 'Count how many elements, states, or levels the best-known approach has to process.'
  }

  return 'Write down one intermediate step by hand; the right choice should match that state change.'
}

function buildConceptHint(question: Question, explanation: string): string {
  const summary = clip(
    firstSentence(explanation).replace(/\boption\s+[0-9A-D]+\b/gi, 'the correct choice'),
    160
  )
  const prefix = question.difficulty === 'hard' ? 'Key checkpoint' : 'Core idea'
  return `${prefix}: ${summary}`
}

function normalizeHints(question: Question, explanation: string): string[] {
  const authoredHints = question.hints ? dedupeHints(question.hints) : []
  const fallbackHints = dedupeHints([
    buildRecallHint(question, explanation),
    buildWorkHint(question, explanation),
    buildConceptHint(question, explanation),
  ])

  if (authoredHints.length === 0) {
    return fallbackHints
  }

  const combinedHints = dedupeHints([...authoredHints, ...fallbackHints])
  return combinedHints.slice(0, Math.max(3, authoredHints.length))
}

function normalizeQuestion(question: Question): Question {
  const overriddenQuestion = questionOverrides[question.id]
    ? { ...question, ...questionOverrides[question.id] }
    : question
  const explanation = ensureSentence(cleanExplanation(overriddenQuestion.explanation))

  return {
    ...overriddenQuestion,
    explanation,
    hints: normalizeHints(overriddenQuestion, explanation),
  }
}

function normalizeQuestionSet(questions: Question[]): Question[] {
  return questions
    .map((question, index) => ({ question: normalizeQuestion(question), index }))
    .sort((a, b) => {
      const difficultyDelta = difficultyRank[a.question.difficulty] - difficultyRank[b.question.difficulty]
      return difficultyDelta !== 0 ? difficultyDelta : a.index - b.index
    })
    .map(({ question }) => question)
}

export function registerQuestions(map: QuestionsMap) {
  const normalizedEntries = Object.fromEntries(
    Object.entries(map).map(([kpSlug, questions]) => [kpSlug, normalizeQuestionSet(questions)])
  )

  Object.assign(registry, normalizedEntries)
}

export function getQuestions(kpSlug: string): Question[] {
  return registry[kpSlug] ?? []
}

export function getAllQuestions(): QuestionsMap {
  return registry
}

// ── Course question files ─────────────────────────────────────────────────
import './rl-fundamentals'
import './rl-applications'
import './math-for-ml'
import './rlhf-alignment'
import './nlp-fundamentals'
import './computer-vision'
import './agentic-ai'
import './deep-learning-fundamentals'
import './ml-systems'
import './transformers-llms'
import './financial-ml'
import './production-ml-engineering'
import './speech-audio'
import './quantum-ml'
import './ai-climate'
import './robotics-embodied'
import './vision-3d'
import './ai-healthcare'
import './scientific-ml'
import './generative-adversarial-networks'
import './domain-adaptation-advanced'
import './ml-system-design'
import './linear-algebra-deep-dive'
import './tabular-ml'
import './ml-evaluation-benchmarking'
import './data-centric-ai'
import './advanced-optimization-ml'
import './meta-learning'
import './self-supervised-learning'
import './coding-interviews-1'
import './coding-interviews-2'
import './coding-interviews-3'
import './gemini-multimodal'
import './karpathy-nn-zero-to-hero'
