#!/bin/bash
set -euo pipefail

cd /home/arvind/mathacademy

# Count knowledge points (lines with full definition)
KP_COUNT=$(grep -cE "^\s+\{ id: '[^']+', slug: '[^']+', name: '[^']+' \}," src/lib/curriculum.ts)

# Count topics with empty knowledgePoints (need to be filled)
TOPICS_EMPTY=$(grep -c "knowledgePoints: \[\]" src/lib/curriculum.ts || true)
TOPICS_EMPTY=${TOPICS_EMPTY:-0}

# Count topics with non-empty knowledgePoints (total topics = 73)
TOPICS_FILLED=$((73 - TOPICS_EMPTY))

# Target: 73 total topics, 0 empty means 100% coverage
echo "METRIC knowledge_points_count=$KP_COUNT"
echo "METRIC topics_empty=$TOPICS_EMPTY"
echo "METRIC topics_filled=$TOPICS_FILLED"
python3 -c "print(f'coverage_percent={round(($TOPICS_FILLED * 100) / 73, 1)}')"

python3 - <<'PY'
from pathlib import Path
import re

index_text = Path('src/lib/questions/index.ts').read_text()
question_imports = re.findall(r"^import './([^']+)'", index_text, re.M)
question_files = [Path('src/lib/questions') / f'{name}.ts' for name in question_imports]

questions_count = 0
authored_hints_count = 0
suspicious_explanations = 0
question_sets_total = 0
question_sets_full_difficulty_span = 0

for path in question_files:
  if not path.exists():
    continue

  text = path.read_text()
  questions_count += len(re.findall(r"\bid:\s*'q-", text))
  authored_hints_count += len(re.findall(r"\bhints:\s*\[", text))
  suspicious_explanations += len(re.findall(r"Wait\b|reconsider|TODO|FIXME|On second thought", text))

  for _, body in re.findall(r"'([^']+)': \[(.*?)\n  \],", text, re.S):
    difficulties = set(re.findall(r"difficulty: '(easy|medium|hard)'", body))
    if difficulties:
      question_sets_total += 1
      if {'easy', 'medium', 'hard'}.issubset(difficulties):
        question_sets_full_difficulty_span += 1

questions_missing_authored_hints = questions_count - authored_hints_count
question_sets_missing_full_difficulty_span = question_sets_total - question_sets_full_difficulty_span
difficulty_span_percent = round(
  (question_sets_full_difficulty_span * 100) / question_sets_total,
  1,
) if question_sets_total else 0.0

print(f"METRIC questions_count={questions_count}")
print(f"METRIC authored_hints_count={authored_hints_count}")
print(f"METRIC questions_missing_authored_hints={questions_missing_authored_hints}")
print(f"METRIC suspicious_explanations={suspicious_explanations}")
print(f"METRIC question_sets_total={question_sets_total}")
print(f"METRIC question_sets_full_difficulty_span={question_sets_full_difficulty_span}")
print(f"METRIC question_sets_missing_full_difficulty_span={question_sets_missing_full_difficulty_span}")
print(f"difficulty_span_percent={difficulty_span_percent}")
PY
