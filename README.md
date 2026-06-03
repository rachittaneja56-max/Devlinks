# DevLinks - A Next.js Resource Directory

## Project Overview
DevLinks is a curated directory for developers to discover, share, and upvote the most impactful engineering articles, tools, and repositories across the web. This project was built to demonstrate proficiency in Next.js App Router, combining multiple rendering strategies, API routes, and Server Actions into a single cohesive application.

## Tech Stack Used
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Notifications**: react-hot-toast

## Features Implemented
- **Public Directory**: A public facing list of developer resources.
- **Upvoting System**: Users can upvote resources (powered by Server Actions).
- **Search**: Built-in search functionality to filter resources by title or description.
- **Admin Dashboard**: A protected area to view live database records and manage (delete) resources.
- **Resource Submission**: A form for users to submit new resources.

## How to Run Locally

1. **Clone the repository** and install dependencies:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory based on the provided `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   *Make sure to add your actual MongoDB connection string to `.env.local`.*

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables Required
- `MONGODB_URI`: The connection string for your MongoDB cluster.

## Database Setup Instructions
This project uses MongoDB. You only need a single collection.
1. Create a free cluster on MongoDB Atlas.
2. Get your connection string and replace `<username>`, `<password>`, and `<database>` with your credentials.
3. The application will automatically create the `resources` collection when you add your first link.

## Routes/Pages Included
- `/` - Landing Page
- `/resources` - Public directory listing (ISR)
- `/about` - About page (SSG)
- `/add` - Submit a new resource
- `/admin` - Admin dashboard to manage resources (SSR)

## API Routes Included
- `GET /api/resources` - Fetches all resources.
- `POST /api/resources` - Creates a new resource.
- `DELETE /api/resources/[id]` - Deletes a specific resource.
- `PUT/PATCH /api/resources/[id]` - Updates a specific resource.

## Server Actions Used
- `upvoteaction.ts`: Contains the `upvoteResource` Server Action. This increments the upvote count of a resource directly from the Server and triggers `revalidatePath('/resources')` to instantly update the UI.

## Rendering Strategies Used

### SSR (Server-Side Rendering)
- **Where**: `/admin` (Admin Dashboard)
- **Why**: The admin dashboard requires the absolute most up-to-date, live database records to prevent an admin from managing stale data. We force dynamic rendering here using `export const dynamic = 'force-dynamic'`.

### SSG (Static Site Generation)
- **Where**: `/about` (About Page)
- **Why**: The about page contains static text that rarely changes. Statically generating this page at build time ensures it loads instantly and saves server resources.

### ISR (Incremental Static Regeneration)
- **Where**: `/resources` (Resources Directory)
- **Why**: The resources list needs to be fast and SEO friendly (like SSG), but it also updates frequently as new resources are added. Using ISR (`export const revalidate = 60`) ensures the page is fast but regenerates every 60 seconds with fresh data.

## Concepts from Class Covered
- Next.js Project Setup & App Router
- File-based routing & Route Groups (`(public)`, `(admin)`)
- Layouts (Nested layouts for Admin and Public)
- MongoDB integration (Mongoose)
- RESTful API design (GET, POST, PUT, DELETE)
- Server Actions vs API Routes
- SSR, SSG, and ISR
- Basic Authentication Middleware (protecting `/admin`)
