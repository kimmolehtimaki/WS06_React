# Workshop06, React

This repository contains the WS06 full stack blog exercise and reference solution for the WS06 React + REST API workshop.

In a workshop, both parts have been completed:

- `backend/` for the API and MongoDB logic
- `frontend/` for the React app and CRUD user interface

## Current Structure

```text
WS06_React/
├─ README.md
├─ requirements.md
├─ frontend/
│  ├─ README.md
│  ├─ package.json
│  ├─ vite.config.js
│  └─ src/
├─ backend/
│  ├─ README.md
│  ├─ package.json
│  ├─ server.js
│  ├─ models/
│  └─ routes/
```
## Run Instructions

### Backend starter

```bash
cd Starter/backend
npm install
cp .env.example .env
npm run dev
```

### Frontend starter

```bash
cd Starter/frontend
npm install
npm run dev
```

The frontend uses `/api/posts` and expects the backend to run on `http://localhost:3000`.

## ToDos

## Part 1 — Backend
Brief tasks:

- install dependencies and start the server
- connect the app to MongoDB
- complete the `Post` model validation rules
- finish the missing `PUT` and `DELETE` routes
- verify that all API responses return valid JSON
See the detailed instructions in `backend/README.md`.

### Task 1 - Set up the Express server
**File:** `server.js`

**Requirements**
- Load environment variables using `dotenv`
- Create an Express application instance
- Enable JSON body parsing with `express.json()`
- Mount `routes/posts.js` at `/api/posts`
- Add a 404 handler for unmatched routes
- Add a 500 error handler
- Connect to MongoDB using Mongoose and the `MONGODB_URI` environment variable
- Start the server with `app.listen()` after a successful database connection

---

### Task 2 - Complete the Post model
**File:** `models/Post.js`

**Requirements**
- Add these fields to the existing schema:
  - `title` — String, required, trimmed, minlength 3
  - `content` — String, required, trimmed, minlength 10
  - `author` — String, required, trimmed
- Enable automatic timestamps (`createdAt`, `updatedAt`)

---

### Task 3 - Implement Update
**File:** `routes/posts.js`

The file already contains working `POST /`, `GET /`, and `GET /:id` handlers.

**Requirements**
- Implement `PUT /:id`
  - Validate the `id` with `isValidObjectId` (already provided)
  - Update the matching post using `Post.findByIdAndUpdate()`
  - Use `{ new: true, runValidators: true }` options
  - Return `404` if no post with that id exists
  - Return `400` for validation errors and `500` for other errors

---

### Task 4 - Implement Delete
**File:** `routes/posts.js`

**Requirements**
- Implement `DELETE /:id`
  - Validate the `id` with `isValidObjectId` (already provided)
  - Delete the matching post using `Post.findByIdAndDelete()`
  - Return `404` if no post with that id exists
  - Return a JSON success message on deletion
  - Return `500` for unexpected errors

---

## Part 2 — Frontend
Brief tasks:

- install dependencies and run the Vite app
- complete the React Router setup
- build navigation links in the header
- fetch and render all blog posts
- create a new post with the reusable form
- show a single post page
- edit an existing post
- delete a post and redirect back to the blog list
See the detailed instructions in `frontend/README.md`.

### Task 5 - Verify routing
**File:** `src/App.jsx`

**Requirements**
- Confirm each route maps to the expected page component:
  - `/` → `LandingPage`
  - `/about` → `AboutPage`
  - `/contact` → `ContactPage`
  - `/blog` → `HomePage`
  - `/posts/new` → `NewPostPage`
  - `/posts/:id` → `PostPage`
  - `/posts/:id/edit` → `EditPostPage`
  - `*` → `NotFoundPage`

---

### Task 6 - Complete the navigation
**File:** `src/components/Header.jsx`

The file already has `Home` and `Blog` links.

**Requirements**
- Add `NavLink` entries for `/about`, `/contact`, and `/posts/new`

---

### Task 7 - Fetch and display all posts
**File:** `src/pages/HomePage.jsx`

**Requirements**
- In `useEffect`, fetch all posts from `GET /api/posts`
- Store the result in `posts` state
- Handle loading and error states
- The post list already renders `PostCard` components when `posts` is non-empty

---

### Task 8 - Create a new post
**File:** `src/pages/NewPostPage.jsx`

**Requirements**
- In `handleSubmit`, read form values from the submitted form
- Send a `POST /api/posts` request with a JSON body containing `title`, `content`, and `author`
- On success, navigate to `/posts/:id` using the returned post's `_id`
- Display a user-visible error message on failure

---

### Task 9 - View a single post
**File:** `src/pages/PostPage.jsx`

**Requirements**
- In `useEffect`, fetch the post from `GET /api/posts/:id` using the `id` from `useParams()`
- Store the post in state and render title, author, date, and content
- The delete button and Edit link are already in the template
- Implement `handleDelete` to call `DELETE /api/posts/:id` and navigate to `/blog` on success

---

### Task 10 - Edit a post
**File:** `src/pages/EditPostPage.jsx`

**Requirements**
- In `useEffect`, fetch the existing post from `GET /api/posts/:id`
- Pass the fetched post as `initialData` to `PostForm`
- In `handleSubmit`, read form values and send a `PUT /api/posts/:id` request
- Navigate to `/posts/:id` after a successful update
- Show an error message on failure

---

## Validation / Acceptance Criteria
Your solution is complete when:
- The backend starts without errors and connects to MongoDB
- `POST /api/posts` creates and returns a new post
- `GET /api/posts` returns all posts
- `GET /api/posts/:id` returns a single post or `404`
- `PUT /api/posts/:id` updates and returns a post or `404`
- `DELETE /api/posts/:id` deletes a post or returns `404`
- The React app renders without errors
- The blog page loads and lists posts from the API
- Creating a new post redirects to the post detail page
- The post detail page shows the post and allows deletion
- The edit page loads the existing post and saves changes

---

## Optional Tasks (Bonus)
- Add pagination to `GET /api/posts` (e.g. `?page=1&limit=10`)
- Add filtering by author (`?author=name`)
- Add a search field to `HomePage`
- Add schema validation rules such as `maxlength`
- Add request logging middleware
- Create a Postman collection covering all routes

---

## Submission Checklist
- [X] Backend starts and connects to MongoDB
- [X] All six CRUD endpoints are implemented and tested
- [X] React app renders without console errors
- [X] Blog listing page fetches and displays posts
- [ ] New post form creates a post and redirects
- [ ] Post detail page shows a post and supports deletion
- [ ] Edit page loads existing post data and saves changes
- [X] Navigation links work for all routes
- [X] Code is pushed to GitHub
- [X] Repository does not contain `node_modules`, `.env`, or `dist/`
