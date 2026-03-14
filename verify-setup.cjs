#!/usr/bin/env node

const fs = require('fs');

console.log('\nNEWS ROBO - Verifying Android Build Setup...\n');

let allGood = true;
const checks = [];

const check1 = fs.existsSync('package.json');
checks.push({ name: 'package.json', status: check1 });
if (!check1) allGood = false;

const check2 = fs.existsSync('capacitor.config.ts');
checks.push({ name: 'capacitor.config.ts', status: check2 });
if (!check2) allGood = false;

const check3 = fs.existsSync('vite.config.ts');
checks.push({ name: 'vite.config.ts', status: check3 });
if (!check3) allGood = false;

const check4 = fs.existsSync('tsconfig.json');
checks.push({ name: 'tsconfig.json', status: check4 });
if (!check4) allGood = false;

const check5 = fs.existsSync('index.html');
checks.push({ name: 'index.html', status: check5 });
if (!check5) allGood = false;

const check6 = fs.existsSync('src/main.tsx');
checks.push({ name: 'src/main.tsx', status: check6 });
if (!check6) allGood = false;

const check7 = fs.existsSync('src/app/App.tsx');
checks.push({ name: 'src/app/App.tsx', status: check7 });
if (!check7) allGood = false;

const check8 = fs.existsSync('node_modules');
checks.push({ name: 'Dependencies installed', status: check8 });
if (!check8) allGood = false;

let check9 = false;
if (check7) {
  const appContent = fs.readFileSync('src/app/App.tsx', 'utf8');
  check9 = appContent.includes('HashRouter') || appContent.includes('RouterProvider');
  checks.push({ name: 'Router configured', status: check9 });
  if (!check9) allGood = false;
}

let check10 = false;
if (check1) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  check10 = packageJson.dependencies['@capacitor/core'] && packageJson.dependencies['@capacitor/android'];
  checks.push({ name: 'Capacitor dependencies', status: check10 });
  if (!check10) allGood = false;
}

console.log('Configuration Checks:\n');
checks.forEach((check, index) => {
  const icon = check.status ? 'OK' : 'MISSING';
  console.log(`${icon.padEnd(8)} ${index + 1}. ${check.name}`);
});

console.log('\n' + '='.repeat(50) + '\n');

if (allGood) {
  console.log('All checks passed. Setup is ready.\n');
  console.log('Next steps:');
  console.log('1. npm run android:build');
  console.log('2. npm run android:open');
  console.log('3. Build APK in Android Studio\n');
} else {
  console.log('Some checks failed. Please fix the items above.\n');
  console.log('Common solutions:');
  console.log('- Run: npm install');
  console.log('- Ensure required files exist\n');
}

process.exit(allGood ? 0 : 1);
