# Azure Bicep Deployment Guide

This directory contains Azure Bicep templates for infrastructure as code (IaC) deployment.

## Files

- `main.bicep` - Main orchestrator template (subscription scope)
- `static-web-app.bicep` - Static Web App resource template
- `parameters.dev.json` - Parameter values for dev environment
- `parameters.stage.json` - Parameter values for stage environment

## Deployment Instructions

### Prerequisites
- Azure CLI installed
- Azure subscription
- Logged in to Azure: `az login`

### Deploy Dev Environment

```bash
az deployment sub create \
  --name angular-demo-dev-deployment \
  --template-file .azure/bicep/main.bicep \
  --parameters \
    environment=dev \
    location=eastus \
    resourcePrefix=angular-demo \
  --location eastus
```

### Deploy Stage Environment

```bash
az deployment sub create \
  --name angular-demo-stage-deployment \
  --template-file .azure/bicep/main.bicep \
  --parameters \
    environment=stage \
    location=eastus \
    resourcePrefix=angular-demo \
  --location eastus
```

### Using Parameter Files

```bash
az deployment sub create \
  --name angular-demo-dev \
  --template-file .azure/bicep/main.bicep \
  --parameters .azure/bicep/parameters.dev.json \
  --location eastus
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| environment | string | 'dev' | Environment name (dev/stage) |
| location | string | 'eastus' | Azure region |
| resourcePrefix | string | 'angular-demo' | Resource naming prefix |
| tags | object | {...} | Resource tags |

## Outputs

The deployment will output:
- `resourceGroupId` - Resource group ID
- `resourceGroupName` - Resource group name
- `staticWebAppId` - Static Web App ID
- `staticWebAppName` - Static Web App name
- `staticWebAppUrl` - Static Web App URL

## References

- [Azure Bicep Documentation](https://docs.microsoft.com/azure/azure-resource-manager/bicep/)
- [Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Resource naming conventions](https://docs.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/naming-and-tagging)
