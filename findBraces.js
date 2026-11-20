const fs = require('fs');
const content = fs.readFileSync('utils/i18n/translations.js', 'utf8');
let openCount = 0;
let inString = false;
let escape = false;

let lastKey = '';
let keyStart = -1;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (inString) {
    if (escape) {
      escape = false;
    } else if (char === '\\') {
      escape = true;
    } else if (char === inString) {
      inString = false;
    }
  } else {
    if (char === '"' || char === "'") {
      inString = char;
    } else if (char === '{') {
      openCount++;
    } else if (char === '}') {
      openCount--;
      if (openCount === 1) {
        const lines = content.slice(0, i).split('\n');
        console.log(`Depth 1 closed at line ${lines.length}`);
      }
    }
  }
}

