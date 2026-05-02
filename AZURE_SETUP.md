# Azure Cloud Setup Instructions

## Prerequisites

- Azure CLI installed: https://docs.microsoft.com/cli/azure/install-azure-cli
- Logged in to Azure: `az login`
- Azure subscription (your "Azure subscription 1")
- Bicep CLI: `az bicep install`

## 1. Create Resource Groups

### Dev Environment
```bash
az group create \
  --name angular-demo-dev-rg \
  --location eastus \
  --tags environment=dev project=angular-demo owner=dev-team
```

### Stage Environment
```bash
az group create \
  --name angular-demo-stage-rg \
  --location eastus \
  --tags environment=stage project=angular-demo owner=dev-team
```

## 2. Deploy Infrastructure with Bicep

### Deploy Dev Environment
```bash
az deployment sub create \
  --name angular-demo-dev \
  --template-file .azure/bicep/main.bicep \
  --parameters \
    environment=dev \
    location=eastus \
    resourcePrefix=angular-demo \
  --location eastus \
  --subscription "Azure subscription 1"
```

### Deploy Stage Environment
```bash
az deployment sub create \
  --name angular-demo-stage \
  --template-file .azure/bicep/main.bicep \
  --parameters \
    environment=stage \
    location=eastus \
    resourcePrefix=angular-demo \
  --location eastus \
  --subscription "Azure subscription 1"
```

## 3. Create Service Principal for GitHub Actions

```bash
# Create service principal
az ad sp create-for-rbac \
  --name "angular-demo-github-actions" \
  --role contributor \
  --scopes /subscriptions/$(az account show --query id -o tsv) \
  --json-auth
```

Save the output JSON - you'll need it for GitHub secrets.

## 4. Get Static Web App Deployment Tokens

### Dev Deployment Token
```bash
az staticwebapp secrets list \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg \
  --query "properties.apiKey" -o tsv
```

### Stage Deployment Token
```bash
az staticwebapp secrets list \
  --name angular-demo-stage \
  --resource-group angular-demo-stage-rg \
  --query "properties.apiKey" -o tsv
```

## 5. Configure Azure Static Web Apps

### Dev Configuration
```bash
az staticwebapp update \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg \
  --source https://github.com/<your-username>/angular-demo \
  --branch main \
  --app-location dist/angular-demo \
  --app-build-command "npm run build" \
  --skip-github-action-workflow-generation
```

### Stage Configuration
```bash
az staticwebapp update \
  --name angular-demo-stage \
  --resource-group angular-demo-stage-rg \
  --source https://github.com/<your-username>/angular-demo \
  --branch release \
  --app-location dist/angular-demo \
  --app-build-command "npm run build" \
  --skip-github-action-workflow-generation
```

## 6. View Deployment Status

### Get Static Web Apps Details
```bash
# Dev
az staticwebapp show \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg

# Stage
az staticwebapp show \
  --name angular-demo-stage \
  --resource-group angular-demo-stage-rg
```

### Get URLs
```bash
# Dev URL
az staticwebapp show \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg \
  --query "defaultHostname" -o tsv

# Stage URL
az staticwebapp show \
  --name angular-demo-stage \
  --resource-group angular-demo-stage-rg \
  --query "defaultHostname" -o tsv
```

## 7. Enable Custom Domain (Optional)

### Add Custom Domain
```bash
# Dev
az staticwebapp custom-domain add \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg \
  --domain-name dev.yourdomain.com

# Stage
az staticwebapp custom-domain add \
  --name angular-demo-stage \
  --resource-group angular-demo-stage-rg \
  --domain-name stage.yourdomain.com
```

## 8. Monitor Deployments

### View Deployment History
```bash
az deployment operation group list \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg
```

### View Application Logs
```bash
az staticwebapp logs show \
  --name angular-demo-dev \
  --resource-group angular-demo-dev-rg
```

## 9. Pricing and Cost Optimization

Azure Static Web Apps Free tier includes:
- ✅ 100 GB bandwidth/month
- ✅ 1 custom domain
- ✅ Standard HTTPS
- ✅ Integrated CI/CD

Standard tier available if more features needed.

## 10. Security Best Practices

1. **Enable Authentication** (if needed)
   ```bash
   az staticwebapp auth update \
     --name angular-demo-dev \
     --resource-group angular-demo-dev-rg \
     --provider aad
   ```

2. **Configure WAF** (optional, requires Standard tier)
   ```bash
   az staticwebapp config set-api-configuration \
     --name angular-demo-dev \
     --resource-group angular-demo-dev-rg
   ```

3. **Enable managed TLS**
   - Automatically enabled for default domain
   - Use custom domains with managed certificates

## Troubleshooting

### Deployment fails with permission error
- Verify service principal has contributor role
- Check subscription ID

### Static Web App not found
- Verify resource group exists
- Check resource group name and region

### GitHub Actions authentication fails
- Regenerate deployment tokens
- Update GitHub secrets

### Build fails during deployment
- Check GitHub Actions logs
- Verify build command: `npm run build`
- Confirm dist output path

## Cleanup (if needed)

```bash
# Delete resource groups
az group delete --name angular-demo-dev-rg --yes
az group delete --name angular-demo-stage-rg --yes
```

## References

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/reference-index)
- [Bicep Language Reference](https://docs.microsoft.com/azure/azure-resource-manager/bicep/file)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)
