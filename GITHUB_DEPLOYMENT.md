# LYK Designs — GitHub Pages deployment

This project is prepared for deployment to the custom domain `lykdesigns.com`.

## GitHub setup
1. Create a GitHub repository and upload/push the contents of this folder.
2. Ensure the default branch is named `main`.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Push/commit to `main`. The workflow `.github/workflows/deploy-pages.yml` will build and publish the site.
6. In **Settings → Pages → Custom domain**, enter `lykdesigns.com`.
7. Configure the domain DNS for GitHub Pages, then enable **Enforce HTTPS** after DNS verification.

## Included deployment files
- `vite.config.ts` uses `base: '/'` for a root custom domain.
- `public/CNAME` contains `lykdesigns.com`.
- `.github/workflows/deploy-pages.yml` builds `dist` and deploys it using GitHub Pages Actions.

## Form integration
The existing Google Apps Script form submission code in `src/components/StartProjectModal.tsx` was preserved unchanged. Test one submission after switching the live domain.
