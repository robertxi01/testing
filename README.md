# Team17 Bookstore

This repository contains a Spring Boot backend and a Next.js frontend.

## Backend

Requirements: Java 17 and Maven. The backend expects a MySQL database called `bookstore` running on `localhost`.

```
cd backend
./mvnw spring-boot:run
```

## Frontend

Requirements: Node.js 18.

```
cd frontend
npm install
npm run dev
```

Create a `.env.local` file inside `frontend/` to configure the API base URL:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Database

Sample data can be loaded using the SQL script in `backend/src/main/resources/schema.sql`.
 k48e5h-codex/implement-registration-and-login-features

User accounts are stored with hashed passwords. Use `/users/register` to create a new account and `/users/{id}` with PUT to edit profile data.
main
