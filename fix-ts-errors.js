#!/usr/bin/env node

/**
 * Fix TypeScript TS6133 errors (unused imports/variables)
 * This script parses build errors and generates JSON with all needed fixes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all TS6133 errors from build
const buildOutput = execSync('npm run build 2>&1', { cwd: process.cwd(), encoding: 'utf-8' });
const errors = buildOutput.split('\n').filter(line => line.includes('error TS6133'));

const fileErrors = {};

// Parse errors and group by file
errors.forEach(error => {
  const match = error.match(/^([^(]+)\((\d+),(\d+)\).*TS6133: '([^']+)'/);
  if (match) {
    const [, filePath, line, col, name] = match;
    if (!fileErrors[filePath]) {
      fileErrors[filePath] = [];
    }
    fileErrors[filePath].push({
      name,
      line: parseInt(line),
      col: parseInt(col),
      fullError: error
    });
  }
});

console.log(`Found errors in ${Object.keys(fileErrors).length} files:`);
console.log(JSON.stringify(fileErrors, null, 2));

// Analyze patterns
const importCounts = {};
Object.values(fileErrors).forEach(errors => {
  errors.forEach(({ name }) => {
    importCounts[name] = (importCounts[name] || 0) + 1;
  });
});

console.log('\n\nMost common unused imports:');
Object.entries(importCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .forEach(([name, count]) => {
    console.log(`${name}: ${count}`);
  });
