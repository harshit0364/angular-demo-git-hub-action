# 🚀 Angular Demo - Quick Start Guide

Welcome! Your Angular project with GitHub Actions CI/CD and Azure Static Web Apps is ready.

## 📁 Project Structure

```
angular-demo/
├── .github/workflows/              # GitHub Actions CI/CD
│   ├── build-test.yml             # Build & test pipeline
│   ├── deploy-dev.yml             # Deploy to dev environment
│   └── deploy-stage.yml           # Deploy to stage environment
├── .azure/
│   ├── bicep/                      # Infrastructure as Code
│   │   ├── main.bicep
│   │   ├── static-web-app.bicep
│   │   ├── parameters.dev.json
│   │   └── parameters.stage.json
│   └── deployment-plan.md          # Deployment strategy
├── src/
│   ├── app/                        # Angular components
│   │   ├── pages/home/            # Home page component
│   │   ├── shared/                # Shared components
│   │   ├── app.component.ts       # Root component
│   │   ├── app.routes.ts          # Routes
│   │   └── app.config.ts          # App configuration
│   ├── styles.scss                # Global styles
│   ├── main.ts                    # Entry point
│   └── index.html                 # HTML template
├── package.json                    # Dependencies & scripts
├── angular.json                    # Angular CLI config
├── tsconfig.json                   # TypeScript config
├── staticwebapp.config.json       # Static Web App config
├── azure.yaml                      # Azure configuration
├── GITHUB_SETUP.md                # GitHub setup instructions
├── AZURE_SETUP.md                 # Azure setup instructions
└── README.md                       # Project documentation
```

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Development server
npm start
# Open http://localhost:4200

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## 🔧 Setup Steps (5 minutes)

### Step 1: Initialize Git Repository
```bash
cd angular-demo
git init
git add .
git commit -m "Initial commit: Angular demo with GitHub Actions & Azure"
```

### Step 2: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Create repository: `angular-demo`
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/angular-demo.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy Azure Resources (10 minutes)
```bash
# Make sure you're logged into Azure
az login --subscription "Azure subscription 1"

# Create dev resource group
az group create \
  --name angular-demo-dev-rg \
  --location eastus

# Deploy dev environment
az deployment sub create \
  --name angular-demo-dev \
  --template-file .azure/bicep/main.bicep \
  --parameters environment=dev \
  --location eastus

# Repeat for stage...
az group create --name angular-demo-stage-rg --location eastus
az deployment sub create \
  --name angular-demo-stage \
  --template-file .azure/bicep/main.bicep \
  --parameters environment=stage \
  --location eastus
```

### Step 4: Configure GitHub Secrets
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `AZURE_CREDENTIALS` - JSON from service principal
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV` - From dev Static Web App
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGE` - From stage Static Web App

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions.

## 📊 Deployment Workflow

```
GitHub Push
    ↓
main branch → Build & Test → Deploy to Dev ✅
release branch → Build & Test → Deploy to Stage (requires approval) ✅
```

### Dev Environment
- **Branch**: `main`
- **Trigger**: Auto-deploy on push
- **URL**: https://angular-demo-dev.staticwebsites.net

### Stage Environment
- **Branch**: `release`
- **Trigger**: Manual workflow dispatch or push to release
- **Approval**: Requires reviewer approval before deployment
- **URL**: https://angular-demo-stage.staticwebsites.net

## 🎯 Environment-Specific Features

The app automatically detects the environment and shows:
- **Dev**: Red badge, development mode
- **Stage**: Orange badge, staging mode
- **Production**: Green badge

Edit `src/app/shared/header/header.component.ts` to customize.

## 📚 Features Included

✅ **Angular 18+** - Modern, standalone components  
✅ **TypeScript** - Type-safe development  
✅ **Responsive Design** - Mobile-friendly UI  
✅ **GitHub Actions** - Automated CI/CD  
✅ **Azure Static Web Apps** - Serverless hosting  
✅ **Multi-Environment** - Dev/Stage/Prod support  
✅ **Infrastructure as Code** - Bicep templates  
✅ **Production Ready** - Security headers, optimizations  

## 🔒 Security Features

- HTTPS/TLS enabled by default
- Security headers configured:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection`
  - `Referrer-Policy`
- Environment-based access control
- Service principal authentication for Azure

## 📖 Full Documentation

- [README.md](./README.md) - Project overview
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - GitHub configuration
- [AZURE_SETUP.md](./AZURE_SETUP.md) - Azure setup guide
- [.azure/deployment-plan.md](./.azure/deployment-plan.md) - Deployment strategy
- [.azure/bicep/README.md](./.azure/bicep/README.md) - Infrastructure documentation

## 🐛 Troubleshooting

### Local development not working
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm start
```

### GitHub Actions failing
- Check action logs in GitHub → Actions tab
- Verify secrets are set correctly
- Check Azure subscription quota

### Deployment not showing updates
- Clear browser cache
- Check Static Web App build logs in Azure Portal
- Verify branch is correct (main/release)

## 🚀 Next Steps

1. **Customize** - Edit components in `src/app/pages/`
2. **Add Features** - Create new components with Angular CLI
3. **Configure** - Update `angular.json`, `tsconfig.json` as needed
4. **Monitor** - Check deployments in GitHub Actions & Azure Portal
5. **Scale** - Upgrade Static Web Apps tier if needed

## 📞 Support Resources

- [Angular Docs](https://angular.io/docs)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Bicep Documentation](https://docs.microsoft.com/azure/azure-resource-manager/bicep/)

## 💡 Tips

- Use `npm test` to run tests before pushing
- Check GitHub Actions logs for deployment details
- Use Azure CLI to manage resources: `az staticwebapp show ...`
- Create feature branches and submit PRs for code review

---

**Ready to deploy?** Follow the setup steps above, then push to GitHub!

Questions? Check the documentation files or the resource links above.

Happy coding! 🎉
