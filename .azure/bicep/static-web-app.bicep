metadata description = 'Bicep template for Azure Static Web App'
metadata author = 'Cloud Architecture Team'

@description('Environment name (dev or stage)')
param environment string

@description('Azure region for resources')
param location string

@description('Resource naming prefix')
param resourcePrefix string

@description('Tags to apply to resources')
param tags object

// Variables
var staticWebAppName = '${resourcePrefix}-${environment}'
var skuName = 'Free'
var skuTier = 'Free'

// Create Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

// Application Settings
resource staticWebAppConfig 'Microsoft.Web/staticSites/config@2023-01-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    environment: environment
    version: '1.0.0'
  }
}

// Outputs
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
output staticWebAppUrl string = 'https://${staticWebApp.properties.defaultHostname}'
output staticWebAppResourceId string = staticWebApp.id
