const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir('app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    // Replace text colors
    content = content.replace(/text-gray-800/g, 'text-slate-100');
    content = content.replace(/text-gray-700/g, 'text-slate-200');
    content = content.replace(/text-gray-900/g, 'text-white');
    content = content.replace(/text-gray-600/g, 'text-slate-300');
    
    // Replace light backgrounds that might have been used in light theme
    content = content.replace(/bg-white\/40/g, 'bg-white/10');
    content = content.replace(/bg-white\/60/g, 'bg-white/20');
    content = content.replace(/bg-white\/20/g, 'bg-white/5');
    
    // Replace specific borders
    content = content.replace(/border-white\/50/g, 'border-white/10');
    content = content.replace(/border-white\/60/g, 'border-white/20');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
});
