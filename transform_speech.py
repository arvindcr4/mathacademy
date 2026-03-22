import re

filepath = "/home/arvind/mathacademy/src/lib/questions/speech-audio.ts"

with open(filepath, "r") as f:
    content = f.read()

print("Original file length:", len(content))

first_pattern = "First, let's recall"

# Transform 1: Add First, lets recall before **Step
content = re.sub(
    r'(explanation:\s*")(\*\*Step)',
    r"\g<1>First, let's recall \g<2>",
    content
)

first_count = content.count(first_pattern)
print("After transform 1:", first_count, "First recalls")

# Transform 2: Process line by line
lines = content.split('\n')
result = []
i = 0
n = len(lines)

while i < n:
    line = lines[i]
    result.append(line)

    if 'explanation:' in line and i + 1 < n:
        next_line = lines[i+1]
        if '**Step' in next_line:
            if next_line.strip().endswith('",') or next_line.strip().endswith('"'):
                expl_text = line + '\n' + next_line

                if 'Therefore' not in expl_text:
                    idx = expl_text.rfind('."')
                    if idx != -1:
                        expl_text = expl_text[:idx+1] + '\n\nTherefore, the answer is"' + expl_text[idx+2:]

                result.pop()
                result.append(expl_text)
                i += 2
                continue

            j = i + 2
            while j < n:
                if lines[j].strip().startswith('hints:'):
                    break
                if lines[j].strip().endswith('",') or lines[j].strip().endswith('"'):
                    break
                j += 1

            expl_lines = [line, next_line]
            for k in range(i+2, j+1):
                expl_lines.append(lines[k])

            expl_text = '\n'.join(expl_lines)

            if 'Therefore' not in expl_text:
                idx = expl_text.rfind('."')
                if idx != -1:
                    expl_text = expl_text[:idx+1] + '\n\nTherefore, the answer is"' + expl_text[idx+2:]

            result = result[:-len(expl_lines)]
            result.append(expl_text)
            i = j + 1
            continue

    i += 1

content = '\n'.join(result)

therefore_count = content.count("Therefore")
print("After transform 2:", therefore_count, "Therefores")

with open(filepath, "w") as f:
    f.write(content)

print("Final file length:", len(content))