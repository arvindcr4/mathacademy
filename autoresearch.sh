#!/bin/bash
set -euo pipefail

SCORE=0
BONUS=0

echo "=== Design Compliance Audit ==="

# Check 1: OKLCH Colors in globals.css (20 points)
oklch_count=$(grep -c "oklch(" src/app/globals.css 2>/dev/null || true)
oklch_count=${oklch_count:-0}
if [ "$oklch_count" -gt 10 ]; then
    SCORE=$((SCORE + 20))
    echo "✓ OKLCH Colors: ${oklch_count} usages (+20)"
else
    echo "✗ OKLCH Colors: only ${oklch_count} usages (need >10)"
fi

# Check 2: Custom Fonts (15 points)
has_fraunces=$(grep -c "Fraunces" src/app/layout.tsx 2>/dev/null || true)
has_figtree=$(grep -c "Figtree" src/app/layout.tsx 2>/dev/null || true)
has_generic=$(grep -cE "Inter|Roboto|Arial|OpenSans" src/app/globals.css 2>/dev/null || true)
has_fraunces=${has_fraunces:-0}
has_figtree=${has_figtree:-0}
has_generic=${has_generic:-0}
if [ "$has_fraunces" -gt 0 ] && [ "$has_figtree" -gt 0 ] && [ "$has_generic" -eq 0 ]; then
    SCORE=$((SCORE + 15))
    echo "✓ Custom Fonts: Fraunces + Figtree (+15)"
elif [ "$has_fraunces" -gt 0 ] || [ "$has_figtree" -gt 0 ]; then
    SCORE=$((SCORE + 8))
    echo "~ Custom Fonts: Some custom fonts (+8)"
else
    echo "✗ Custom Fonts: Using generic fonts"
fi

# Check 3: Focus States (10 points)
has_focus=$(grep -c "focus-visible" src/app/globals.css 2>/dev/null || true)
has_focus=${has_focus:-0}
if [ "$has_focus" -gt 0 ]; then
    SCORE=$((SCORE + 10))
    echo "✓ Focus States: focus-visible present (+10)"
else
    echo "✗ Focus States: missing"
fi

# Check 4: Skip Links (10 points)
has_skiplink=$(grep -c "skip-link" src/app/globals.css 2>/dev/null || true)
has_skiplink=${has_skiplink:-0}
if [ "$has_skiplink" -gt 0 ]; then
    SCORE=$((SCORE + 10))
    echo "✓ Skip Links: accessibility skip-link (+10)"
else
    echo "✗ Skip Links: missing"
fi

# Check 5: Reduced Motion (10 points)
has_reduced_motion=$(grep -c "prefers-reduced-motion" src/app/globals.css 2>/dev/null || true)
has_reduced_motion=${has_reduced_motion:-0}
if [ "$has_reduced_motion" -gt 0 ]; then
    SCORE=$((SCORE + 10))
    echo "✓ Reduced Motion: prefers-reduced-motion (+10)"
else
    echo "✗ Reduced Motion: missing"
fi

# Check 6: CSS Variables/Tokens (15 points)
css_var_count=$(grep -cE "^[[:space:]]*--[a-z]" src/app/globals.css 2>/dev/null || true)
css_var_count=${css_var_count:-0}
if [ "$css_var_count" -gt 20 ]; then
    SCORE=$((SCORE + 15))
    echo "✓ CSS Tokens: ${css_var_count} design tokens (+15)"
elif [ "$css_var_count" -gt 10 ]; then
    SCORE=$((SCORE + 10))
    echo "~ CSS Tokens: ${css_var_count} tokens (+10)"
else
    echo "✗ CSS Tokens: only ${css_var_count} tokens"
fi

# Check 7: Anti-Patterns (20 points)
pure_black=$(grep -cE "#000000|#000[^a-fA-F0-9]" src/app/globals.css 2>/dev/null || true)
pure_white=$(grep -cE "#FFFFFF|#FFF[^a-fA-F0-9]" src/app/globals.css 2>/dev/null || true)
pure_black=${pure_black:-0}
pure_white=${pure_white:-0}
anti_patterns=$((pure_black + pure_white))
if [ "$anti_patterns" -eq 0 ]; then
    SCORE=$((SCORE + 20))
    echo "✓ Anti-Patterns: No pure black/white (+20)"
else
    deduction=$((anti_patterns * 5))
    SCORE=$((SCORE - deduction))
    echo "✗ Anti-Patterns: Found ${anti_patterns} pure color usages (-${deduction})"
fi

# Check 8: Component Quality - forwardRef usage (10 bonus points)
forwardref_count=$(grep -l "forwardRef" src/components/ui/*.tsx 2>/dev/null | wc -l || echo 0)
if [ "${forwardref_count:-0}" -ge 4 ]; then
    BONUS=$((BONUS + 10))
    echo "✓ Components: ${forwardref_count} use forwardRef (+10)"
fi

# Check 9: Component proper ARIA roles (5 bonus points)
aria_count=$(grep -l "role=" src/components/ui/*.tsx 2>/dev/null | wc -l || echo 0)
if [ "${aria_count:-0}" -gt 0 ]; then
    BONUS=$((BONUS + 5))
    echo "✓ Components: ${aria_count} have ARIA roles (+5)"
fi

# Check 10: Micro-interactions (5 bonus points)
animation_count=$(grep -c "@keyframes" src/app/globals.css 2>/dev/null || true)
animation_count=${animation_count:-0}
if [ "$animation_count" -ge 8 ]; then
    BONUS=$((BONUS + 5))
    echo "✓ Micro-interactions: ${animation_count} keyframe animations (+5)"
fi

# Check 11: Responsive breakpoints (5 bonus points)
media_count=$(grep -c "@media" src/app/globals.css 2>/dev/null || true)
media_count=${media_count:-0}
if [ "$media_count" -ge 5 ]; then
    BONUS=$((BONUS + 5))
    echo "✓ Responsive: ${media_count} media queries (+5)"
fi

# Check 12: Container queries (5 bonus points)
container_count=$(grep -c "container-type\|@container" src/app/globals.css 2>/dev/null || true)
container_count=${container_count:-0}
if [ "$container_count" -gt 0 ]; then
    BONUS=$((BONUS + 5))
    echo "✓ Container Queries: ${container_count} present (+5)"
fi

# Calculate total
TOTAL=$((SCORE + BONUS))

# Bound score
if [ "$TOTAL" -lt 0 ]; then TOTAL=0; fi

echo ""
echo "=== Design Compliance Score: ${SCORE}/115 ==="
echo "=== Bonus Points: +${BONUS} ==="
echo "=== Total Score: ${TOTAL}/135 ==="

echo "METRIC design_compliance_score=${SCORE}"
echo "METRIC total_score=${TOTAL}"
echo "METRIC oklch_usage_count=${oklch_count:-0}"
echo "METRIC css_token_count=${css_var_count:-0}"
echo "METRIC anti_patterns_found=${anti_patterns:-0}"
echo "METRIC component_forwardref_count=${forwardref_count:-0}"
echo "METRIC component_aria_count=${aria_count:-0}"
echo "METRIC animation_count=${animation_count:-0}"
echo "METRIC media_query_count=${media_count:-0}"
echo "METRIC container_query_count=${container_count:-0}"
