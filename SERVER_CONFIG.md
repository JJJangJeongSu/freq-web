# Server Configuration for React Router SPA

This document explains the server configuration required for the React Router-based single-page application (SPA).

## Problem: 404 Errors on Direct URL Access

React Router operates entirely on the client side. When users access routes like `/albums/123` directly or refresh the page:

1. Browser sends request to server for `/albums/123`
2. Server looks for file at that path
3. Server returns 404 (file not found)
4. React Router never gets a chance to handle the route

## Solution: SPA Fallback

Configure the server to serve `index.html` for all routes that don't match static files. This allows React Router to handle routing on the client side.

## Development Server (Vite)

### Vite Dev Server (Already Configured ✅)

Vite's dev server automatically handles SPA fallback. No configuration needed for development.

```bash
npm run dev
```

This works out of the box for all routes including:
- `/albums/123`
- `/tracks/456`
- `/users/789`
- Any other React Router route

## Production Deployment

### Option 1: Vite Preview Server (Testing)

For local production testing:

```bash
npm run build
npx vite preview
```

Vite preview server also handles SPA fallback automatically.

### Option 2: Express.js Server

If deploying with Node.js/Express:

```javascript
// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// SPA fallback: serve index.html for all non-static routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Run with:
```bash
node server.js
```

### Option 3: Nginx

If using Nginx as reverse proxy or static file server:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app/build;
    index index.html;

    # Serve static files directly
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Option 4: Apache

If using Apache with `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Rewrite everything else to index.html
  RewriteRule ^ index.html [L]
</IfModule>
```

### Option 5: Netlify

For Netlify deployment, create `public/_redirects`:

```
/*    /index.html   200
```

Or use `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 6: Vercel

Vercel automatically handles SPA routing. No configuration needed.

Alternatively, create `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Option 7: AWS S3 + CloudFront

**S3 Bucket Configuration:**
1. Enable static website hosting
2. Set error document to `index.html`

**CloudFront Distribution:**
- Create custom error response for 404 errors
- Response page path: `/index.html`
- HTTP response code: 200

### Option 8: Firebase Hosting

In `firebase.json`:

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## Current Backend Server



This is the **API server** only. The **frontend SPA** needs its own hosting with SPA fallback configuration.

## Environment Variables

Ensure `.env` is properly configured for production:

```env
# Production API base URL

# Other environment variables
VITE_APP_NAME=뮤직레이트
```

Remember:
- Vite requires `VITE_` prefix for environment variables
- Build process embeds env vars at build time (not runtime)
- Never commit `.env` to git
- Create `.env.production` for production-specific values

## Testing SPA Fallback

After deploying, test these scenarios:

1. **Direct URL access**: Type `/albums/123` in browser address bar → Should load app, not 404
2. **Page refresh**: Navigate to `/albums/123`, then refresh → Should stay on page
3. **Deep linking**: Share URL `/albums/123` → Recipient should see correct page
4. **Browser back/forward**: Should navigate correctly through history
5. **Invalid routes**: Navigate to `/invalid-route` → Should show custom 404 page (NotFoundPage)

## Common Issues

### Issue 1: 404 on Refresh
**Symptom**: Page works when navigating within app, but refreshing gives 404
**Cause**: Server not configured with SPA fallback
**Fix**: Apply one of the server configurations above

### Issue 2: Assets Not Loading
**Symptom**: HTML loads but CSS/JS don't
**Cause**: Incorrect base path or asset paths
**Fix**:
- Check `base` in `vite.config.ts` (default is `/`)
- Ensure build output uses absolute paths `/assets/...`
- Verify server serves static files from correct directory

### Issue 3: API Calls Failing
**Symptom**: 404 on API requests
**Cause**: Frontend trying to call `/api/...` on same domain
**Fix**:
- Verify `VITE_API_BASE_URL` includes full domain
- Check Axios client in `src/api/client.ts` uses correct baseURL
- Configure CORS on backend if needed

### Issue 4: Environment Variables Not Working
**Symptom**: `import.meta.env.VITE_API_BASE_URL` is undefined
**Cause**: Missing `VITE_` prefix or not rebuilding after env change
**Fix**:
- Ensure variable name starts with `VITE_`
- Rebuild application: `npm run build`
- Restart dev server: `npm run dev`

## Deployment Checklist

Before deploying to production:

- [ ] Build passes without errors: `npm run build`
- [ ] Environment variables configured correctly
- [ ] Server has SPA fallback configured
- [ ] Static assets are served with proper caching headers
- [ ] HTTPS is enabled
- [ ] CORS is configured on backend if frontend on different domain
- [ ] Test all user journeys from TESTING.md
- [ ] Test direct URL access for key routes
- [ ] Test page refresh on all routes
- [ ] Monitor for 404 errors in production logs

## Recommended Deployment Stack

For this application, recommended setup:

**Frontend (SPA):**
- Host: Vercel or Netlify (automatic SPA fallback)
- CDN: Included with both platforms
- SSL: Free automatic certificates

**Backend (API):**
- Current: Cloudtype (https://port-0-musicapp-md8e80po64ad31eb.sel5.cloudtype.app)
- CORS: Configure to allow frontend domain

**Advantages:**
- Zero configuration for SPA routing
- Automatic HTTPS
- Global CDN for fast loading
- Easy deployment via Git integration
- Free tier available

## Additional Resources

- [React Router Documentation - Server Configuration](https://reactrouter.com/en/main/guides/ssr)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
