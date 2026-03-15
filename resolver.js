const fs = require('fs');
const path = require('path');

function resolveConflicts(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            resolveConflicts(fullPath);
        } else {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Regex to match conflict block and capture the HEAD part
            const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n?=======\r?\n[\s\S]*?\r?\n?>>>>>>> [a-z0-9]+\r?\n?/g;
            if (regex.test(content)) {
                content = content.replace(regex, (match, p1) => {
                    return p1 ? p1 + '\n' : '';
                });
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Resolved conflicts in ' + fullPath);
            }
        }
    }
}

resolveConflicts(path.join(__dirname, 'src'));
