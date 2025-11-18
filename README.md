Events Platform – Frontend (Vite + React)

A responsive React frontend built with Vite, designed to connect to the Events API backend.
The application allows users to browse community events, apply detailed filters, sign up for events, manage their own events list, and (optionally) add events to Google Calendar.

Staff users have access to admin tools for creating and managing events.


Features

Event Browsing & Search
Browse all upcoming events on the homepage.
Dynamic filtering:
Categories (Music, Sport, Arts, Family, City Events)
Location search with live city suggestions
Keyword search (artist, venue, event name)
Loading states and graceful error handling


Event Details Page

Each event has its own dedicated page showing:
Title, description, date/time range
Location
Price type (free / paid)
Placeholder image (picseed) or a real image if provided
Sign-up button (requires login)
“Signed up” state with duplicate protection


Authentication

Login and Register pages
Access tokens stored securely in memory/localStorage
Protected routes using React Router
Auto-logout on expired or invalid token


My Events

/me/events
Displays all events the logged-in user has signed up for
Uses the /signups/me endpoint


Google Calendar Integration

From any event page:
If Google calendar is not connected, users are redirected to the Google OAuth consent screen.
If connected to calendar already, the event is added directly to their Google Calendar.


Staff-Only Admin Tools

Visible only when the logged-in user’s JWT contains is_staff: true.
Admin features include:
Create new event (/admin/events/new)
Edit existing event (/admin/events/:id/edit)
Quick links added to the top bar:
"Create event"
"Edit event" (only shown when viewing a specific event)


Tech Stack

React 18

Vite

React Router

Axios API client

Tailwind-style utility classes (custom theme)

Google OAuth (through backend integration)

Prerequisites

Node.js ≥ 18

npm ≥ 9

Local Development Setup
1. Install dependencies - npm install

2. Create your environment file - VITE_API=http://localhost:4000
The frontend uses VITE_API as the base URL for all backend requests.

3. Start the dev server - npm run dev

Frontend runs at: http://localhost:5173

Routing Guide

| Route                          | Description                       |
| ------------------------------ | --------------------------------- |
| `/`                            | Event list + filters              |
| `/events/:id`                  | Event details (sign up, calendar) |
| `/login`                       | Login                             |
| `/register`                    | Register                          |
| `/me/events`                   | User’s signed-up events           |
| `/admin/events/new`            | Create an event (staff only)      |
| `/admin/events/:id/edit`       | Edit an event (staff only)        |
| `/admin`                       | Admin dashboard overview          |
| `/help`                        | FAQ & help                        |
| `/contact`                     | Contact information               |
| `/integrations/google/success` | Google OAuth redirect handler     |
