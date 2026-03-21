#!/bin/bash
set -euo pipefail

cd /home/arvind/mathacademy

# Count knowledge points (lines with full definition)
KP_COUNT=$(grep -cE "^\s+\{ id: '[^']+', slug: '[^']+', name: '[^']+' \}," src/lib/curriculum.ts)

# Count topics with empty knowledgePoints (need to be filled)
TOPICS_EMPTY=$(grep -c "knowledgePoints: \[\]" src/lib/curriculum.ts || true)
TOPICS_EMPTY=${TOPICS_EMPTY:-0}

# Count topics with non-empty knowledgePoints (total topics = 66)
TOPICS_FILLED=$((66 - TOPICS_EMPTY))

# Target: 66 total topics, 0 empty means 100% coverage
echo "METRIC knowledge_points_count=$KP_COUNT"
echo "METRIC topics_empty=$TOPICS_EMPTY"
echo "METRIC topics_filled=$TOPICS_FILLED"
python3 -c "print(f'coverage_percent={round(($TOPICS_FILLED * 100) / 66, 1)}')"
