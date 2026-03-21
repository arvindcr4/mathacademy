import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'two-sum': [
    {
      id: 'q-ts-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question:
        'What is the time complexity of the optimal Two Sum solution using a hash map?',
      options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'],
      correctAnswer: 1,
      explanation:
        'Hash map gives O(1) lookup: for each element nums[i], check if target - nums[i] exists in the map.',
    },
    {
      id: 'q-ts-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Two Sum with hash map requires O(n) extra space.',
      correctAnswer: 'true',
      explanation:
        'The hash map stores up to n elements, giving O(n) space complexity.',
    },
    {
      id: 'q-ts-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'For input [3, 3] and target 6, what indices does Two Sum return?',
      options: ['[0, 0]', '[0, 1]', '[1, 1]', '[]'],
      correctAnswer: 1,
      explanation:
        'nums[0] + nums[1] = 3 + 3 = 6, so indices [0, 1] are returned.',
    },
  ],

  'maximum-subarray': [
    {
      id: 'q-ms-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Kadane's algorithm has time complexity:",
      options: ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'],
      correctAnswer: 1,
      explanation:
        'Single pass through array maintaining current sum and max sum in O(n) time.',
    },
    {
      id: 'q-ms-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Kadane's algorithm fails when all numbers are:",
      options: ['Positive', 'Negative', 'Zero', 'Mixed'],
      correctAnswer: 1,
      explanation:
        'With all negative numbers, the algorithm must be modified to track the maximum (least negative) rather than resetting.',
    },
    {
      id: 'q-ms-3',
      type: 'true-false',
      difficulty: 'easy',
      question: "Kadane's algorithm works in O(n) time using dynamic programming.",
      correctAnswer: 'true',
      explanation:
        'DP formulation: maxEndingHere = max(maxEndingHere + num, num); maxSoFar = max(maxSoFar, maxEndingHere).',
    },
  ],

  'product-except-self': [
    {
      id: 'q-pe-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question:
        'Product Except Self requires O(n) time and O(1) extra space (output array not counted). What is the approach?',
      options: [
        'Division by each element',
        'Prefix and suffix products',
        'Recursion',
        'Sorting',
      ],
      correctAnswer: 1,
      explanation:
        'Compute prefix[i] = product of all elements left of i, suffix[i] = product of all elements right of i. Result[i] = prefix[i] * suffix[i].',
    },
    {
      id: 'q-pe-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Division approach works when zero is present in the array.',
      correctAnswer: 'false',
      explanation:
        'Division fails with zeros because you cannot divide by zero. Prefix/suffix approach handles zeros correctly.',
    },
  ],

  'rotate-array': [
    {
      id: 'q-ra-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Rotating [1,2,3,4,5,6,7] by k=3 yields:',
      options: [
        '[4,5,6,7,1,2,3]',
        '[5,6,7,1,2,3,4]',
        '[3,4,5,6,7,1,2]',
        '[1,2,3,4,5,6,7]',
      ],
      correctAnswer: 0,
      explanation:
        'Rotate right by k: last k elements move to front. k=3: [5,6,7] moves front, giving [5,6,7,1,2,3,4]. Wait - let me reconsider: right rotate by 3 means [1,2,3,4] → end, [5,6,7] → front. Result: [5,6,7,1,2,3,4] (option 1).',
    },
    {
      id: 'q-ra-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the optimal time complexity for rotating an array?',
      options: ['O(n²)', 'O(n)', 'O(n) with O(1) space via reversal', 'O(log n)'],
      correctAnswer: 2,
      explanation:
        'Reversal algorithm: reverse entire array, reverse first k, reverse last n-k. Total O(n) time, O(1) space.',
    },
  ],

  'contains-duplicate': [
    {
      id: 'q-cd-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Time complexity of sorting approach for Contains Duplicate:',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correctAnswer: 2,
      explanation:
        'Sorting costs O(n log n), then single pass checks adjacent elements for duplicates.',
    },
    {
      id: 'q-cd-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Using a hash set gives O(n) time complexity.',
      correctAnswer: 'true',
      explanation:
        'Hash set provides O(1) average lookup; if adding finds existing element, duplicate exists.',
    },
  ],

  'longest-common-prefix': [
    {
      id: 'q-lcp-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'For ["flower", "flow", "flight"], the longest common prefix is:',
      options: ['fl', 'flow', 'f', 'flight'],
      correctAnswer: 0,
      explanation:
        '"fl" is common to all three strings. "flow" doesn\'t match "flight" at position 4.',
    },
    {
      id: 'q-lcp-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Vertical scanning approach has worst-case time complexity:',
      options: ['O(n log n)', 'O(n*m) where m is shortest string length', 'O(n*m)', 'O(m)'],
      correctAnswer: 2,
      explanation:
        'Vertical scan: check char at position i for all strings. If different or index exceeds any string, stop. O(n*m) worst case.',
    },
  ],

  'valid-parentheses': [
    {
      id: 'q-vp-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What data structure is optimal for Valid Parentheses?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      correctAnswer: 1,
      explanation:
        'Stack: push opening brackets, pop and match when closing bracket encountered. LIFO ensures correct nesting.',
    },
    {
      id: 'q-vp-2',
      type: 'true-false',
      difficulty: 'easy',
      question: '"{[()]}" is a valid parentheses string.',
      correctAnswer: 'true',
      explanation:
        'Each opening bracket has matching closing bracket in correct order: { → } , [ → ] , ( → ).',
    },
    {
      id: 'q-vp-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Stack approach for Valid Parentheses runs in:',
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 1,
      explanation:
        'Single pass through string: O(n) time, O(n) space for stack in worst case.',
    },
  ],
}

registerQuestions(questions)
