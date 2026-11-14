# Atlas Mabati website

## Deploying to GitHub Pages

The site must be built before it is published—GitHub Pages cannot serve Vite source files directly.

1. Push this project to the `main` or `master` branch.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Open the repository's **Actions** tab and wait for **Deploy website to GitHub Pages** to finish.

The workflow publishes the generated `dist` folder. Do not upload the project root or `src` folder as the Pages site.

