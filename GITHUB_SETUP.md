# GitHub Setup Instructions

## 1. Create GitHub Secrets

Add the following secrets to your GitHub repository:

### For Azure Authentication

1. **AZURE_CREDENTIALS**
   - Go to `Settings > Secrets and variables > Actions`
   - Click `New repository secret`
   - Name: `AZURE_CREDENTIALS`
   - Value: (Paste the JSON from service principal setup, see below)

2. **AZURE_STATIC_WEB_APPS_API_TOKEN_DEV**
   - Get this from Azure Static Web App properties (Dev)
   - In Azure Portal: Resource > Settings > Manage deployment tokens

3. **AZURE_STATIC_WEB_APPS_API_TOKEN_STAGE**
   - Get this from Azure Static Web App properties (Stage)
   - In Azure Portal: Resource > Settings > Manage deployment tokens

### Create Azure Service Principal

```bash
# Login to Azure
az login

# Create service principal
az ad sp create-for-rbac --name "github-actions-angular-demo" \
  --role contributor \
  --scopes /subscriptions/<subscription-id> \
  --json-auth
```

Copy the output and add it as `AZURE_CREDENTIALS` secret.

## 2. Configure Environment Protection Rules

### For Stage Deployment

1. Go to `Settings > Environments`
2. Create new environment: `stage`
3. Add protection rule: `Required reviewers`
4. Select reviewers who must approve deployments

## 3. Branch Protection Rules

### Protect main branch
1. Go to `Settings > Branches`
2. Click `Add rule` under Branch protection rules
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require code reviews

### Release branch
1. Branch name pattern: `release`
2. Enable similar rules

## 4. Update Workflow Secrets

Edit the deployment workflows to add your values:

### In `.github/workflows/deploy-dev.yml`
```yaml
with:
  azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_DEV }}
```

### In `.github/workflows/deploy-stage.yml`
```yaml
with:
  azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_STAGE }}
```

## 5. Repository Settings

### General
- ✅ Enable "Discussions"
- ✅ Enable "Sponsorships"

### Actions and Variables
- Workflow permissions: `Read and write permissions`
- Allow creation and approval of self-hosted runners: `No`

## 6. Deploy Keys (Optional)

For additional security, add deploy keys:
```bash
ssh-keygen -t ed25519 -f deploy_key -C "github-actions-angular-demo"
```

Add public key to `Settings > Deploy keys` with write access.

## 7. Branch Naming Convention

- Development: `main`
- Staging: `release/v*` or `staging`
- Feature branches: `feature/*, bugfix/*, enhancement/*`

## Testing the Workflows

### Manual Trigger
```bash
# Trigger dev deployment
gh workflow run deploy-dev.yml

# Trigger stage deployment
gh workflow run deploy-stage.yml
```

### View Workflow Runs
```bash
# List workflow runs
gh run list

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

## Troubleshooting

### Deployment fails with authentication error
1. Verify `AZURE_CREDENTIALS` secret is correctly set
2. Check service principal permissions
3. Ensure subscription ID is correct

### Static Web App token expired
1. Go to Azure Portal > Static Web App > Settings > Manage deployment tokens
2. Regenerate token
3. Update GitHub secret

### Build fails
1. Check build logs in GitHub Actions
2. Verify Node.js version (should be 20.x)
3. Check npm dependencies: `npm ci`

### Deploy fails but build succeeds
1. Check `azure_static_web_apps_api_token` is correct
2. Verify resource group exists in Azure
3. Check Azure Static Web App configuration

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Static Web Apps GitHub Actions](https://github.com/marketplace/actions/azure-static-web-apps-deploy)
- [Azure Service Principal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)
