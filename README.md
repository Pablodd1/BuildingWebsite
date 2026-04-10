Building Innovation Website (Local Setup)
Overview
- This repository is a copy of the previous Unitec USA site, updated to present Building Innovation branding only. UnitecUSA content is removed or deprecated for local testing.

Prerequisites
- Node.js (>= 14) and npm
- Git

Quick Start (domain-free, local only)
1) Install dependencies
   npm install
2) Local environment configuration
   Create a local env file to enable correct base URL behavior:
   - Create: BIwebsite/.env.local
   - Add: NEXT_PUBLIC_BASE_URL=http://localhost:3000
3) Run the site
   npm run dev
   Open: http://localhost:3000

Optional: Run a second local instance for side-by-side testing
- Copy the BIWebsite project to another folder (or run a separate Next app) and expose it on port 3001
- In the second instance, set NEXT_PUBLIC_BASE_URL=http://localhost:3001

Pushing to Building Website (when domain/SSH access is available)
- Once you have a remote configured, you can push from this repo as a separate Git remote named buildingwebsite
- Example commands (adjust to your auth method):
  git -C BIwebsite remote add buildingwebsite git@github.com:Pablodd1/BuildingWebsite.git
  git -C BIwebsite push -u buildingwebsite master

- Branding/Verification checklist
- Ensure all main pages display Building Innovation branding (no UnitecUSA text)
- Verify terms/policies/about reflect Building Innovation in metadata
- Quick scan for any remaining UnitecUSA references:
  - Command: rg -n "Unitec|Unitec USA" BIwebsite -S || true
- If you see references, patch them to Building Innovation or neutral wording and re-run tests

Next steps (missing tasks to complete before going live)
- Remove any remaining direct UnitecUSA references from translation/data files beyond the pages touched (verify all branding strings).
- Create and configure a remote repository for the Building Website (BuildingWebsite) and verify SSH/HTTPS access works.
- Set up a push workflow: add remote (buildingwebsite) and push master/main. If using SSH, ensure SSH keys are registered with GitHub.
- Run a quick local validation: ensure Terms, Privacy Policy, About show Building Innovation branding in title/meta and that no UnitecUSA branding remains.
- Prepare a minimal PR plan (branch naming, commit messages) to document changes for the handover.

Local test commands (recap)
- npm install
- create .env.local with NEXT_PUBLIC_BASE_URL
- npm run dev
- Optionally, run a second instance on port 3001

Notes
- This README covers only local/domain-free development. When a domain and remote access are ready, we can finalize the push workflow to BuildingWebsite and set up CI checks.
