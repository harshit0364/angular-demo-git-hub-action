# Angular Demo Project - Deployment Plan

## Project Overview
- **Project Type**: Angular SPA (Single Page Application)
- **Environments**: Dev, Stage
- **CI/CD**: GitHub Actions
- **Cloud Platform**: Azure Cloud
- **Infrastructure**: Azure Static Web Apps (or App Service)

---

## Phase 1: Planning

### Step 1: Workspace Analysis
- **Mode**: NEW project
- **Stack**: Angular + TypeScript + GitHub Actions + Azure

### Step 2: Service Requirements
- **Frontend**: Angular 18+ SPA
- **Hosting**: Azure Static Web Apps (recommended for SPA) or Azure App Service
- **CI/CD**: GitHub Actions workflows for:
  - Dev environment (auto-deploy on push to main)
  - Stage environment (manual trigger or PR-based)
- **Build**: Node.js 20 LTS
- **Package Manager**: npm

### Step 3: Infrastructure Components
- **Resource Group**: Dev (dev-rg) and Stage (stage-rg)
- **Static Web Apps**: One per environment OR shared with slots
- **Build Artifacts**: Output to `dist/` directory
- **Environment Variables**: Managed via Azure Key Vault and GitHub Secrets

### Step 4: Selected Recipe
- **Template**: Angular + Static Web Apps + GitHub Actions
- **IaC**: Bicep (Terraform alternative available)
- **Authentication**: GitHub Actions with Azure credentials (Workload Identity)

---

## Phase 2: Implementation

### Step 5: Generate Artifacts
- [ ] Angular project scaffolding (src/, components, modules)
- [ ] Dockerfile (if using App Service)
- [ ] azure.yaml (azd configuration)
- [ ] Bicep templates:
  - `main.bicep` (orchestrator)
  - `static-web-app.bicep` (Azure Static Web Apps)
  - `resource-group.bicep`
- [ ] GitHub Actions workflows:
  - `dev.yml` (dev environment CI/CD)
  - `stage.yml` (stage environment CI/CD)
  - `build-and-test.yml` (shared build steps)
- [ ] Configuration files:
  - `angular.json` (Angular build config)
  - `tsconfig.json`
  - `package.json` with build scripts
  - `.github/workflows/` directory structure

### Step 6: Finalize Plan
- **Artifacts Ready**: ✓ All files listed above
- **User Approval**: [ ] Awaiting approval
- **Next Phase**: Execute Phase 2 implementation

---

## Phase 3: Validation & Deployment

### Azure Context (To Be Confirmed)
- **Subscription ID**: [ ] User to provide
- **Region**: [ ] Default: East US (user preference)
- **Resource Groups**: 
  - Dev: `angular-demo-dev-rg`
  - Stage: `angular-demo-stage-rg`

---

## Implementation Details

### GitHub Actions Workflows
1. **Build & Test** (Shared)
   - Trigger: On push/PR
   - Steps: Install deps, lint, build, test

2. **Dev Deployment**
   - Trigger: On push to `main` branch
   - Deploy to: Dev Static Web App
   - Auto-approve

3. **Stage Deployment**
   - Trigger: Manual workflow dispatch OR PR to `release` branch
   - Deploy to: Stage Static Web App
   - Environment protection: Requires approval

### Project Structure
```
angular-demo/
├── src/
│   ├── app/
│   ├── assets/
│   ├── index.html
│   └── main.ts
├── .github/
│   └── workflows/
│       ├── build-test.yml
│       ├── deploy-dev.yml
│       └── deploy-stage.yml
├── .azure/
│   ├── bicep/
│   │   ├── main.bicep
│   │   ├── static-web-app.bicep
│   │   └── resource-group.bicep
│   └── deployment-plan.md
├── angular.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## Status
- [x] Plan created and presented
- [x] Phase 2 implementation COMPLETE
- [x] All artifacts generated
- [ ] Azure resources deployed
- [ ] GitHub secrets configured
- [ ] Ready for first deployment

## Next Steps (Quick Start)

1. **Initialize Git Repository**
   ```bash
   cd angular-demo
   git init
   git add .
   git commit -m "Initial Angular demo project with GitHub Actions & Azure"
   git remote add origin https://github.com/<your-username>/angular-demo.git
   git push -u origin main
   ```

2. **Setup Azure Resources**
   - Follow [AZURE_SETUP.md](../AZURE_SETUP.md)
   - Create service principal
   - Deploy Bicep templates

3. **Configure GitHub**
   - Follow [GITHUB_SETUP.md](../GITHUB_SETUP.md)
   - Add repository secrets
   - Setup environment protection rules

4. **Deploy**
   - Push to `main` branch → triggers Dev deployment
   - Push to `release` branch → triggers Stage deployment
