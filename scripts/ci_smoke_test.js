// Lightweight end-to-end smoke test for MegaMenu product population
const { spawn, execSync } = require('child_process');
const path = require('path');
const os = require('os');

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function run() {
  const repoRoot = path.resolve(__dirname, '..');
  // Start standalone server (production build)
  const server = spawn('node', ['.next/standalone/server.js'], {
    cwd: repoRoot,
    stdio: 'ignore',
    detached: true
  });
  const pid = server.pid;
  console.log(`Started server (pid ${pid})...`);
  // Give time to boot
  await sleep(4000);

  function curl(cmd) {
    try {
      const out = execSync(cmd, { encoding: 'utf8' });
      return out;
    } catch (e) {
      return e.stdout || e.message;
    }
  }

  const endpoints = [
    'http://localhost:3000/API/collections?nopaginate=true',
    'http://localhost:3000/api/collections?nopaginate=true',
    'http://localhost:3000/API/products?nopaginate=true',
    'http://localhost:3000/api/products?nopaginate=true'
  ];

  let ok = true;
  for (const url of endpoints) {
    const res = curl(`curl -s -H "Accept: application/json" ${url}`);
    let isJson = false;
    try {
      const parsed = JSON.parse(res);
      isJson = typeof parsed === 'object' && parsed !== null;
      if (isJson) {
        if (!(parsed.currentPage !== undefined || parsed.items !== undefined)) {
          console.error(`Endpoint JSON missing expected fields: ${url}`);
          ok = false;
        }
      } else {
        isJson = false;
      }
    } catch {
      isJson = false;
    }
    if (!isJson) {
      console.error(`Endpoint failed or did not return valid JSON: ${url}`);
      ok = false;
    }
  }

  // Cleanup
  try { process.kill(pid); } catch(_) { /* ignore */ }

  if (ok) {
    console.log('\nSMOKE TEST PASSED: MegaMenu endpoints responded with JSON payloads.');
    process.exit(0);
  } else {
    console.error('\nSMOKE TEST FAILED: See logs for details.');
    process.exit(1);
  }
}

run();
