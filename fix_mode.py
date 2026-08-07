import re

with open('public/game/js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace boss start call (after updateBossHud())
old1 = "            updateBossHud();\r\n            generateCurriculumQuestion();\r\n"
new1 = "            updateBossHud();\r\n            generateCurriculumQuestion('boss');\r\n"
content = content.replace(old1, new1, 1)

# Replace farm task call (after activeTask = {...})
old2 = "                questionText: \"\"\r\n            };\r\n\r\n            generateCurriculumQuestion();\r\n"
new2 = "                questionText: \"\"\r\n            };\r\n\r\n            generateCurriculumQuestion('farm');\r\n"
content = content.replace(old2, new2, 1)

with open('public/game/js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. Replaced call sites.")
