# Deployment Guide: Alqadr Webpage

This document details the configuration and troubleshooting steps for deploying the Laylat al-Qadr webpage to the cPanel-hosted server.

## Server Environment
- **Host**: `hostingangle.com`
- **User**: `hangle`
- **Subdomain**: `http://alqadr.hussainsulais.com/`
- **Document Root**: `/home1/hangle/alqadr.hussainsulais.com/`
- **Git Repo**: `/home1/hangle/repositories/alqadr`

## 403 Forbidden Error Resolution
The 403 error occurred because cPanel Git Version Control pulls code into a private repository folder, while the subdomain was expecting files in a dedicated document root.

### The Fix: .cpanel.yml
We added a `.cpanel.yml` file to the root of the repository. This file tells cPanel to automatically copy files from the repository to the live document root whenever a "Deploy" action is triggered.

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home1/hangle/alqadr.hussainsulais.com/
    - /usr/bin/rsync -avz --exclude='.git' --exclude='.github' * $DEPLOYPATH
```

### Manual Sync Command
If changes are not appearing, you can manually sync the files via the cPanel Terminal:
```bash
rsync -avz --exclude='.git' ~/repositories/alqadr/ ~/alqadr.hussainsulais.com/
```

## Future Updates
1.  **Local Changes**: Make your edits in `index.html` or `assets/`.
2.  **Push**: Run `git push origin main`.
3.  **Deploy**: 
    - Log in to **cPanel**.
    - Go to **Git™ Version Control**.
    - Click **Pull** (to get the latest code).
    - Click **Deploy** (to sync files to the live site).

## SSH Configuration
To connect without a password, ensure your public key (`id_ed25519.pub`) is added to `~/.ssh/authorized_keys` on the server.
