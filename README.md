🚀 Rendering Strategies Used

SSG: Used on the /about page because the content is static and does not require database calls.

ISR: Used on the public / homepage (revalidate: 60). It provides the speed of static pages but ensures newly added resources appear for users without rebuilding the whole app.

SSR: Used on the /admin page. The admin needs real-time, strongly consistent data fetched at request-time to manage inventory accurately.

⚡ Server Actions vs API Routes

API Routes (/api/resources): Used for standard RESTful CRUD operations (Create, Read, Update, Delete) to manage the resources from the admin panel. They provide structured JSON responses and error handling.

Server Actions (actions/upvoteAction.js): Used specifically for the "Upvote" button on the frontend. Since this is a simple, single-field mutation tied directly to a user click, a Server Action avoids the boilerplate of writing a custom API route and client-side fetch logic.
