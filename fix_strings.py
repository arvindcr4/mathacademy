#!/usr/bin/env python3
"""Fix string literals in TypeScript question files."""

import re
import sys

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Fix patterns:
    # 1. Replace " inside single-quoted strings with \"
    # 2. Replace ' inside double-quoted strings with \'

    lines = content.split('\n')
    new_lines = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check if this line starts a multi-line string concatenation
        # Pattern: explanation: or question: followed by string that ends with +
        if ('explanation:' in line or 'question:' in line) and (' +' in line or line.rstrip().endswith('" +') or line.rstrip().endswith("' +")):
            # Collect the full multi-line string
            full_text = line
            i += 1
            while i < len(lines):
                next_line = lines[i]
                full_text += '\n' + next_line
                # Check if this is the end of the string (no + at end)
                if not (next_line.rstrip().endswith(' +') or next_line.rstrip().endswith('" +') or next_line.rstrip().endswith("' +")):
                    i += 1
                    break
                i += 1

            # Now fix the multi-line string
            # Replace unescaped " inside the string parts
            fixed = full_text
            # Fix double quotes inside single-quoted strings
            fixed = re.sub(r"'([^']*)\"([^\"]*)\"([^']*)' \+", r"'\1\\\"\2\\\"\3' +", fixed)
            # Fix double quotes inside double-quoted strings (that aren't already escaped)
            # This is tricky - we need to find " that aren't preceded by \
            fixed_lines = []
            for l in fixed.split('\n'):
                if ' +' in l or l.rstrip().endswith('",') or l.rstrip().endswith("',"):
                    # This is part of a string concatenation
                    # Find unescaped quotes and escape them
                    if l.strip().startswith('"') and not l.strip().startswith('\\"'):
                        # Double-quoted string - escape internal double quotes
                        # Find the content between the opening and closing quotes
                        match = re.match(r'^(\s*)"(.*)"[,\s]*\+?\s*$', l)
                        if match:
                            indent = match.group(1)
                            content = match.group(2)
                            # Escape any unescaped " in content
                            content = re.sub(r'(?<!\\)"', r'\\"', content)
                            if l.rstrip().endswith(' +'):
                                l = f'{indent}"{content}" +'
                            else:
                                l = f'{indent}"{content}",'
                    elif l.strip().startswith("'") and not l.strip().startswith("\\'"):
                        # Single-quoted string - escape internal single quotes
                        match = re.match(r"^(\s*)'(.*)'[,\s]*\+?\s*$", l)
                        if match:
                            indent = match.group(1)
                            content = match.group(2)
                            # Escape any unescaped ' in content
                            content = re.sub(r"(?<!\\)'", r"\\'", content)
                            if l.rstrip().endswith(' +'):
                                l = f"{indent}'{content}' +"
                            else:
                                l = f"{indent}'{content}',"
                fixed_lines.append(l)
            new_lines.append('\n'.join(fixed_lines))
        else:
            new_lines.append(line)
            i += 1

    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines))

    print(f"Fixed {filepath}")

if __name__ == '__main__':
    for filepath in sys.argv[1:]:
        fix_file(filepath)
