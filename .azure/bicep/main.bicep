metadata description = 'Main Bicep template for Angular Demo project'
metadata author = 'Cloud Architecture Team'
metadata version = '1.0.0'

targetScope = 'subscription'

@description('Environment name (dev or stage)')
param environment string = 'dev'

@description('Azure region for resources')
param location string = 'eastus'

@description('Resource naming prefix')
param resourcePrefix string = 'angular-demo'

@description('Tags to apply to all resources')
param tags object = {
  environment: environment
  project: 'angular-demo'
  createdDate: utcNow('u')
  managedBy: 'Bicep'
}

// Create resource group
var resourceGroupName = '${resourcePrefix}-${environment}-rg'
resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
  tags: tags
}

// Deploy Static Web App
module staticWebApp 'static-web-app.bicep' = {
  name: 'staticWebAppDeployment'
  scope: resourceGroup
  params: {
    environment: environment
    location: location
    resourcePrefix: resourcePrefix
    tags: tags
  }
}

// Outputs
output resourceGroupId string = resourceGroup.id
output resourceGroupName string = resourceGroup.name
output staticWebAppId string = staticWebApp.outputs.staticWebAppId
output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output staticWebAppUrl string = staticWebApp.outputs.staticWebAppUrl
