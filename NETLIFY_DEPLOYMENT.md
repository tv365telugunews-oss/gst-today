# GST Admin Panel - Netlify Deployment Guide

## Overview
This guide will help you deploy your React Vite admin panel to Netlify with a separate admin panel structure.

## Prerequisites
- Node.js (v16 or higher)
- Git repository
- Netlify account (free at https://app.netlify.com)
- GitHub, GitLab, or Bitbucket account

## Setup Steps

### Step 1: Prepare Your Repository
```bash
cd c:\Users\MY PC\Desktop\GST\gst-admin
```

Ensure your `.gitignore` includes:
```
node_modules
dist
.env.local
.DS_Store
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Build Locally (Test)
```bash
npm run build
```

Verify that `dist` folder is created with your built files.

### Step 4: Deploy to Netlify

#### Option A: Using Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Authenticate with Netlify:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

#### Option B: Using Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to https://app.netlify.com
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Deploy

#### Option C: Manual Deploy (Drag & Drop)
1. Build your project: `npm run build`
2. Go to https://app.netlify.com
3. Drag and drop the `dist` folder to deploy

### Step 5: Configure Environment Variables (if needed)
1. In Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. Add environment variables:
   ```
   VITE_API_URL = https://your-backend-api.com
   VITE_FIREBASE_CONFIG = your-firebase-config
   ```

### Step 6: Configure Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Add your custom domain or use the auto-generated Netlify domain

## Project Structure

```
gst-admin/
├── netlify.toml          # Netlify configuration
├── _redirects            # URL redirect rules
├── .netlifyignore        # Files to exclude
├── .netlify/
│   └── functions/        # Serverless functions (optional)
├── public/               # Static assets
├── src/
│   ├── pages/
│   │   ├── Login.jsx     # Admin login page
│   │   └── Dashboard.jsx # Admin dashboard
│   └── App.jsx           # Main router
└── package.json
```

## Configuration Files Explained

### netlify.toml
- **Build command:** Runs `npm run build`
- **Publish directory:** Serves from `dist` folder
- **Redirects:** All requests route to `index.html` for React Router
- **Headers:** Security and caching headers
- **Environment variables:** Production, preview, and branch-specific settings

### _redirects
- Enables single-page app routing by forwarding all requests to `index.html`
- Prevents 404 errors on route navigation

### vite.config.js Updates
- Optimized build output
- Code splitting for better performance
- Terser minification with console removal

## Deployment Checklist

- [ ] All dependencies installed (`npm install`)
- [ ] Local build successful (`npm run build`)
- [ ] Environment variables configured
- [ ] Custom domain setup (if using custom domain)
- [ ] SSL certificate enabled (automatic with Netlify)
- [ ] Build cache cleared if needed

## Common Issues & Solutions

### Issue: 404 errors on page refresh
**Solution:** Already handled by `netlify.toml` redirects. Ensure it's in root directory.

### Issue: Environment variables not loading
**Solution:** 
- Use `VITE_` prefix for frontend variables
- Rebuild after adding variables: `netlify deploy --prod`

### Issue: Build fails
**Solution:**
- Check build logs in Netlify dashboard
- Ensure `package.json` scripts are correct
- Verify Node version: `node --version`

### Issue: Large bundle size
**Solution:**
- Check `vite.config.js` code splitting settings
- Analyze bundle: `npm run build -- --analyze`
- Remove unused dependencies

## Continuous Integration/Deployment

Every time you push to your repository:
1. Netlify automatically detects changes
2. Runs the build command
3. Deploys to staging if configured
4. You can manually promote to production

## Accessing Your Admin Panel

After deployment:
- Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
- Login with credentials: **admin** / **gst123** (Update these in App.jsx)
- Access admin dashboard

## Security Recommendations

1. **Change default credentials:**
   - Update hardcoded credentials in `src/App.jsx`
   - Implement proper authentication with backend

2. **Enable Netlify analytics** for monitoring

3. **Configure backup locations** for important data

4. **Use environment-specific configs** for API endpoints

## Next Steps

1. Connect your main application to this admin panel
2. Implement backend API integration
3. Add Firebase configuration for real-time database
4. Set up monitoring and error tracking (Sentry, LogRocket)
5. Configure CI/CD pipelines for automated testing

## Support Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Router Documentation](https://reactrouter.com)
- [Netlify CLI Reference](https://docs.netlify.com/cli/get-started)

---

**Current Setup:** GST Admin Panel with Netlify deployment configured
**Status:** Ready for deployment
**Last Updated:** 2026-06-18
