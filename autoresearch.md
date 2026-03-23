# Autoresearch: MathAcademy Design Quality

## Objective
Apply the impeccable frontend-design skill to MathAcademy and measure design quality improvements through automated compliance scoring against the skill's guidelines.

## Metrics
- **Primary**: design_compliance_score (0-100, higher is better)
- **Secondary**: oklch_usage_count, custom_fonts_present, a11y_score, anti_patterns_found

## How to Run
`./autoresearch.sh` — outputs `METRIC name=number` lines.

## Design Compliance Checks
The scoring script evaluates:

| Check | Points | Description |
|-------|--------|-------------|
| OKLCH Colors | 20 | Uses oklch() instead of HSL/RGB |
| Custom Fonts | 15 | Uses distinctive fonts (not Inter/Roboto/system) |
| Focus States | 10 | Has :focus-visible styles |
| Skip Links | 10 | Includes skip-link for accessibility |
| Reduced Motion | 10 | Supports prefers-reduced-motion |
| CSS Variables | 15 | Uses design tokens (CSS custom properties) |
| No Anti-Patterns | 20 | No pure black (#000), no gray on color |

## Files in Scope
- `src/app/globals.css` — Design tokens and global styles
- `src/app/layout.tsx` — Font loading and metadata
- `src/components/ui/*.tsx` — UI component library

## Off Limits
- Database schema
- Content/curriculum files
- API routes

## Constraints
- All checks must pass without errors
- Design tokens must remain semantically named
- No regression in existing functionality

## What's Been Tried
_(empty — fresh start)_
