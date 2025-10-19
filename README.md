Vite React frontend that connects to the events backend API.

Prerequisites
Node 18+
npm 9+

1. Install: npm i

2. Environment: create .env.development
example:
VITE_API=http://localhost:4000

3. Run: npm run dev

4. Production:
Add folder (public)in the root of frontend repo and file (_redirects)in the folder public/_redirects.
inside the file write /*  /index.html  200

connect repo to netify 
build = npm run build
publish = dist
Environment variable in Netlify:
VITE_API = https://<your-api>.onrender.com (hosted backend)
Ensure backend CORS env matches your Netlify origin:
FRONTEND_BASE_URL = https://<your-site>.netlify.app


