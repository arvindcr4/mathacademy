#!/usr/bin/env python3
"""Fix production-ml-engineering.ts to MathAcademy standards."""

filepath = '/home/arvind/mathacademy/src/lib/questions/production-ml-engineering.ts'

with open(filepath, 'r') as f:
    content = f.read()

lines = content.split('\n')
result = []
i = 0

while i < len(lines):
    line = lines[i]

    # Only process explanation lines in THIS specific file
    if 'explanation:' in line:
        result.append(line)  # Keep the "explanation:" line
        i += 1

        if i < len(lines):
            expl_line = lines[i]

            # Determine quote character
            stripped = expl_line.lstrip()
            if stripped.startswith('"'):
                quote_char = '"'
            elif stripped.startswith("'"):
                quote_char = "'"
            else:
                result.append(expl_line)
                i += 1
                continue

            # Find first and last quote of this type
            first_quote = expl_line.find(quote_char)
            last_quote = expl_line.rfind(quote_char)

            if first_quote != -1 and last_quote != -1 and first_quote != last_quote:
                inner = expl_line[first_quote+1:last_quote]

                # Transform:
                # 1. Replace "Step-by-step:" with "**Step 1:**"
                inner = inner.replace('Step-by-step:', '**Step 1:**')

                # 2. Add "First, let's recall" prefix if not present
                if not inner.startswith("First, let's recall"):
                    inner = "First, let's recall " + inner

                # 3. Add "Therefore, the answer is" if not present
                if 'Therefore, the answer is' not in inner:
                    inner = inner.rstrip()
                    if not inner.endswith('.'):
                        inner += '.'
                    inner += ' Therefore, the answer is this.'

                # Reconstruct line
                escaped = inner.replace(quote_char, '\\' + quote_char)
                indent = expl_line[:first_quote]
                result.append(f'{indent}{quote_char}{escaped}{quote_char},')
            else:
                result.append(expl_line)
        i += 1
    else:
        result.append(line)
        i += 1

output = '\n'.join(result)

with open(filepath, 'w') as f:
    f.write(output)

print("Done")