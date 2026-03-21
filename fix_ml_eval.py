import re

filepath = "/home/arvind/mathacademy/src/lib/questions/ml-evaluation-benchmarking.ts"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find lines with explanation containing the problematic pattern
lines = content.split('\n')
for i, line in enumerate(lines):
    if "explanation:" in line and "A←a" in line and "'" in line:
        print(f"Line {i+1}: {line[:200]}")

# Now fix it - replace single-quoted string containing ←a'} with double-quoted
# The problem: explanation: '...←a'}=y...' - the ←a' breaks the single-quoted string
# Solution: change outer single quotes to double quotes

# Find the specific substring
search = "←a'}="
replace = "←a'}="
if search in content:
    count = content.count(search)
    print(f"\nFound {count} occurrences of the problematic pattern")
    # We need to change outer quotes from ' to "
    # This is tricky - let's just use a regex approach
    # Match explanation: ' ... ' where ... contains ←a'}
    pattern = r"(explanation: ')((?:[^'\\]|\\.)*?←a'}(?:[^'\\]|\\.)*?)',"
    def replacer(m):
        return 'explanation: "' + m.group(2) + '",'
    new_content, count = re.subn(pattern, replacer, content)
    if count > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed {count} occurrences!")
    else:
        print("Regex didn't match")
else:
    print("Pattern not found")