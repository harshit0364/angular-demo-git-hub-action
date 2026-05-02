# Angular Demo Project

Multi-environment Angular application with GitHub Actions CI/CD pipelines for Azure Static Web Apps.

## 🚀 Features

- **Angular 18+** - Modern standalone components
- **TypeScript 5.4** - Type-safe development
- **GitHub Actions** - Automated CI/CD for dev and stage environments
- **Azure Static Web Apps** - Serverless hosting on Azure
- **Responsive Design** - Mobile-friendly interface
- **Multi-Environment** - Separate dev and stage deployments

## 📋 Prerequisites

- Node.js 20 LTS or higher
- npm or yarn package manager
- Git
- Azure subscription
- GitHub account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
angular-demo/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── home/
│   │   ├── shared/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── styles.scss
│   └── main.ts
├── .github/
│   └── workflows/
│       ├── build-test.yml
│       ├── deploy-dev.yml
│       └── deploy-stage.yml
├── .azure/
│   └── bicep/
│       ├── main.bicep
│       ├── static-web-app.bicep
│       └── resource-group.bicep
├── angular.json
├── package.json
└── tsconfig.json
```

## 🚀 Deployment

### Environments

- **Dev**: Automatically deployed on push to `main` branch
  - URL: `https://angular-demo-dev.staticwebsites.net`
  
- **Stage**: Manually triggered or deployed from `release` branch
  - URL: `https://angular-demo-stage.staticwebsites.net`

### GitHub Actions Workflows

1. **Build & Test** (`build-test.yml`)
   - Runs on: PR and push events
   - Steps: Install, lint, build, test

2. **Dev Deployment** (`deploy-dev.yml`)
   - Runs on: Push to main branch
   - Deploys to: Dev Static Web App

3. **Stage Deployment** (`deploy-stage.yml`)
   - Runs on: Manual workflow dispatch
   - Deploys to: Stage Static Web App
   - Requires: Environment protection rule approval

## 🔐 Environment Variables

Set the following secrets in GitHub:
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`
- `AZURE_RESOURCE_GROUP_DEV`
- `AZURE_RESOURCE_GROUP_STAGE`

## 📊 Architecture

```
GitHub Repository
├── main branch
│   └── Trigger: Deploy to Dev
├── release branch
│   └── Trigger: Deploy to Stage (manual)
└── Pull Requests
    └── Trigger: Build & Test

Azure Resources
├── Dev Resource Group
│   └── Static Web App (Dev)
├── Stage Resource Group
│   └── Static Web App (Stage)
└── Bicep Templates
    └── Infrastructure as Code
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run linting
npm run lint

# Build production bundle
npm run build
```

## 📝 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm test` - Run unit tests
- `npm run lint` - Run linting
- `npm run serve` - Serve and open in browser

## 🔧 Configuration

### Angular Configuration

Edit `angular.json` to customize:
- Build output paths
- Asset directories
- Style files
- Build budgets

### TypeScript Configuration

Edit `tsconfig.json` to customize:
- Compiler options
- Path aliases
- Strict mode settings

## 📚 Resources

- [Angular Documentation](https://angular.io)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions](https://docs.github.com/actions)
- [Azure Bicep](https://docs.microsoft.com/azure/azure-resource-manager/bicep/)

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please create a pull request with your changes.

## 📞 Support

For issues and questions, please open a GitHub issue or contact the development team.

---

**Last Updated**: May 2, 2026
