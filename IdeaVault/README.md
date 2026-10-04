# IdeaVault - Your Ideas. Your Vault.

IdeaVault is a MERN stack web app where you can save, organize, search, update and delete your ideas in one place (project, startup, app, business, college and personal ideas).

## Features

- Register and log in (JWT authentication, passwords hashed with bcryptjs)
- Each user sees and manages only their own ideas
- Dashboard with total ideas, favorites, in-progress count and ideas per category
- Add, view, edit and delete ideas (with a delete confirmation)
- Favorite / unfavorite ideas and a Favorites page
- Search by title, description or tags (updates as you type)
- Filter by category, status and favorite (search and filters work together)
- Profile page, loading states, friendly error messages, responsive design

## Technologies Used

- Frontend: React, React Router DOM, Axios, HTML, CSS, JavaScript (built with Vite)
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Auth: jsonwebtoken, bcryptjs

## Folder Structure

```
IdeaVault/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/   Navbar, IdeaCard, SearchBar, FilterBar,
│       │                 IdeaForm, ProtectedRoute, Loading, ErrorMessage
│       ├── pages/        Login, Register, Dashboard, AddIdea, EditIdea,
│       │                 ViewIdea, Favorites, Profile
│       ├── services/     api.js (all Axios calls)
│       ├── context/      AuthContext.jsx (login state)
│       ├── hooks/        useIdeas.js
│       └── utils/        formatDate.js, filterIdeas.js, constants.js
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/db.js
│   ├── models/           User.js, Idea.js
│   ├── controllers/      authController.js, ideaController.js
│   ├── routes/           authRoutes.js, ideaRoutes.js
│   └── middleware/       authMiddleware.js, errorMiddleware.js
├── .gitignore
└── README.md
```

## Installation Steps

You need Node.js 18 or newer and MongoDB (local or Atlas).

```bash
cd server
npm install

cd ../client
npm install
```

## How to Configure MongoDB

Choose ONE option.

**Option A - MongoDB installed on your computer**
1. Install MongoDB Community Server and start it.
2. Use this value in `server/.env`: `MONGO_URI=mongodb://127.0.0.1:27017/ideavault`

**Option B - MongoDB Atlas (free cloud database)**
1. Create a free account and a free cluster at https://www.mongodb.com/atlas
2. Database Access: create a database user (username + password).
3. Network Access: add your IP address (or `0.0.0.0/0` while learning).
4. Click Connect > Drivers and copy the connection string.
5. Put your password in it and add the database name before the `?`:
   `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ideavault?retryWrites=true&w=majority`

The `ideavault` database and its collections are created automatically on first use.

## How to Create `.env`

Copy `server/.env.example` to `server/.env` and fill it in:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

`JWT_SECRET` can be any long random text. To generate one:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

The client needs no `.env` unless your backend is not on `http://localhost:5000` (see `client/.env.example`).

## How to Start the Backend

```bash
cd server
npm run dev
```

You should see `MongoDB connected` and `Server running on http://localhost:5000`.

## How to Start the Frontend

```bash
cd client
npm run dev
```

Open http://localhost:5173

## API Endpoints

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | /api/auth/register | Create an account | No |
| POST | /api/auth/login | Log in, returns a JWT token | No |
| GET | /api/auth/me | Get the logged-in user | Yes |
| GET | /api/ideas | List your ideas (optional `search`, `category`, `status`, `favorite=true`) | Yes |
| GET | /api/ideas/:id | Get one idea | Yes |
| POST | /api/ideas | Create an idea | Yes |
| PUT | /api/ideas/:id | Update an idea | Yes |
| DELETE | /api/ideas/:id | Delete an idea | Yes |
| PATCH | /api/ideas/:id/favorite | Add/remove favorite | Yes |

Protected routes need the header `Authorization: Bearer <token>`.

## Testing Checklist

1. Register a new account, then log in.
2. Add two or three ideas with different categories and tags.
3. Search by a word from a title, description and tag.
4. Combine search with the category, status and favorite filters.
5. Star an idea and check the Favorites page.
6. Edit an idea, then view it (the Updated date changes).
7. Delete an idea and confirm the popup appears.
8. Register a second account and confirm it cannot see the first account's ideas.

## Common Errors and Fixes

- **Could not connect to MongoDB**: MongoDB is not running, or `MONGO_URI` is wrong. For Atlas, check the password, the database user and Network Access.
- **Missing MONGO_URI or JWT_SECRET**: `server/.env` does not exist. Copy it from `.env.example`.
- **Cannot reach the server (in the browser)**: the backend is not running, or it uses a different port. Match `PORT` with `VITE_API_URL`.
- **Port 5000 already in use**: change `PORT` in `server/.env` and set `VITE_API_URL=http://localhost:<port>/api` in `client/.env`.
- **Logged out unexpectedly**: the token lasts 7 days, or `JWT_SECRET` was changed. Log in again.

## Future Enhancements

- Edit profile and change password
- Pagination or infinite scroll for large vaults
- Sort options (newest, oldest, A-Z)
- Dark mode
- Export ideas to PDF/CSV
- Password reset by email
