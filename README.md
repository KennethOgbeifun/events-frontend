Vite React frontend that connects to the events backend API for browsing community events, searching & filtering, signing up, and adding events to your Google Calendar.

Browse events on the home page with filtering.
Categories (Music, Sport, Arts, Family, Cities)
Location (type to get city suggestions)
Keyword search (artist / event / venue)
View event details on a separate page.
Sign up for events (requires login). Shows “Signed up” when done and prevents duplicate signups.
My Events page lists everything you’ve signed up for.
Add to Google Calendar from an event page:
If not connected, you’ll be taken through Google OAuth and returned.
If connected, the event is created in your Google Calendar.

Staff-only tools (visible when your JWT says is_staff: true):
Create new events
Edit existing events (link appear in the top bar when viewing an event)

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

Routing:
/ – Events list (with filters)
/events/:id – Event details (Sign up, Add to calendar)
/login, /register – Auth pages
/me/events – My events (requires login)
/admin/events/new – Create event (requires staff)
/admin/events/:id/edit – Edit event (requires staff)
/help and /contact – faqs and placeholder info
/integrations/google/success – Return path after Google OAuth


