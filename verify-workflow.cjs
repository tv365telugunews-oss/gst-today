#!/usr/bin/env node

const fs = require('fs');

console.log('\nNEWS ROBO - Workflow Verification\n');
console.log('=' .repeat(60));

let allGood = true;

const requiredFiles = [
  { path: 'package.json', name: 'Package.json' },
  { path: 'vite.config.ts', name: 'Vite config' },
  { path: 'capacitor.config.ts', name: 'Capacitor config' },
  { path: 'netlify.toml', name: 'Netlify config' },
  { path: 'firebase.json', name: 'Firebase config' },
  { path: 'src/main.tsx', name: 'Main entry point' },
  { path: 'src/app/App.tsx', name: 'App component' },
  { path: 'public/manifest.json', name: 'PWA manifest' },
  { path: 'public/sw.js', name: 'Service Worker' },
];

console.log('\nChecking Required Files:\n');

requiredFiles.forEach(({ path: filePath, name }) => {
  const exists = fs.existsSync(filePath);
  const icon = exists ? 'OK' : 'MISSING';
  console.log(`${icon.padEnd(8)} ${name.padEnd(30)} ${exists ? 'Found' : 'MISSING'}`);
  if (!exists) allGood = false;
});

console.log('\nChecking NPM Scripts:\n');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = [
  'build',
  'dev',
  'fix-crash',
  'android:open',
  'netlify:deploy',
  'firebase:deploy',
  'workflow:complete',
];

requiredScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  const icon = exists ? 'OK' : 'MISSING';
  console.log(`${icon.padEnd(8)} ${script.padEnd(30)} ${exists ? 'Configured' : 'MISSING'}`);
  if (!exists) allGood = false;
});

console.log('\nChecking Key Dependencies:\n');

const requiredDeps = [
  '@capacitor/core',
  '@capacitor/android',
  'react',
  'react-dom',
  'react-router-dom',
];

requiredDeps.forEach(dep => {
  const exists =
    (packageJson.dependencies && packageJson.dependencies[dep]) ||
    (packageJson.peerDependencies && packageJson.peerDependencies[dep]);
  const icon = exists ? 'OK' : 'MISSING';
  console.log(`${icon.padEnd(8)} ${dep.padEnd(30)} ${exists ? 'Installed' : 'MISSING'}`);
  if (!exists) allGood = false;
});

console.log('\nChecking Directories:\n');

const requiredDirs = [
  { path: 'src', name: 'Source directory' },
  { path: 'src/app', name: 'App directory' },
  { path: 'src/styles', name: 'Styles directory' },
  { path: 'public', name: 'Public directory' },
];

requiredDirs.forEach(({ path: dirPath, name }) => {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  const icon = exists ? 'OK' : 'MISSING';
  console.log(`${icon.padEnd(8)} ${name.padEnd(30)} ${exists ? 'Found' : 'MISSING'}`);
  if (!exists) allGood = false;
});

console.log('\nChecking Configuration:\n');

try {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  const hasBase = viteConfig.includes("base: './'");
  const hasAlias = viteConfig.includes('@');

  console.log(`${hasBase ? 'OK' : 'MISSING'}      Vite base URL configured      ${hasBase ? 'Correct' : 'NEEDS FIX'}`);
  console.log(`${hasAlias ? 'OK' : 'MISSING'}      Vite @ alias configured      ${hasAlias ? 'Correct' : 'NEEDS FIX'}`);

  if (!hasBase || !hasAlias) allGood = false;
} catch {
  console.log('MISSING  Error reading vite.config.ts');
  allGood = false;
}

try {
  const capConfig = fs.readFileSync('capacitor.config.ts', 'utf8');
  const hasWebDir = capConfig.includes("webDir: 'dist'");
  const hasAppId = capConfig.includes('com.newsrobo.app');

  console.log(`${hasWebDir ? 'OK' : 'MISSING'}      Capacitor webDir set          ${hasWebDir ? 'Correct' : 'NEEDS FIX'}`);
  console.log(`${hasAppId ? 'OK' : 'MISSING'}      Capacitor appId set           ${hasAppId ? 'Correct' : 'NEEDS FIX'}`);

  if (!hasWebDir || !hasAppId) allGood = false;
} catch {
  console.log('MISSING  Error reading capacitor.config.ts');
  allGood = false;
}

console.log('\nChecking Android Setup:\n');

const androidExists = fs.existsSync('android');
if (androidExists) {
  console.log('OK       Android folder exists');
} else {
  console.log('WARN     Android folder not found');
}

console.log('\nChecking Build Output:\n');

const distExists = fs.existsSync('dist');
if (distExists) {
  console.log('OK       Dist folder exists');
  const indexExists = fs.existsSync('dist/index.html');
  console.log(`${indexExists ? 'OK' : 'WARN'}       ${indexExists ? 'index.html found' : 'index.html not found - run: npm run build'}`);
} else {
  console.log('WARN     Dist folder not found');
}

console.log('\nChecking Documentation:\n');

const docs = [
  '🚀_WORKFLOW_START_HERE.md',
  'COMPLETE_WORKFLOW_GUIDE.md',
  'ASSET_FIX_COMPLETE.md',
  '🔧_APK_CRASH_FIX_START_HERE.md',
];

docs.forEach(doc => {
  const exists = fs.existsSync(doc);
  const icon = exists ? 'OK' : 'WARN';
  console.log(`${icon.padEnd(8)} ${doc}`);
});

console.log('\n' + '='.repeat(60));
console.log('\nVERIFICATION SUMMARY:\n');

if (allGood) {
  console.log('All critical checks passed.');
  console.log('\nNext steps:');
  console.log('  1. Start dev: npm run dev');
  console.log('  2. Build APK: npm run android:open');
} else {
  console.log('Some checks failed.');
  console.log('\nFix tips:');
  console.log('  1. Run: npm install');
  console.log('  2. Run: npm run build');
  console.log('  3. Check missing items above');
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(allGood ? 0 : 1);
