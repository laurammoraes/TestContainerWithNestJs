CREATE TABLE IF NOT EXISTS "user" (
    "id" serial PRIMARY KEY,
    "name" text,
    "email" text,
    "password" text,
    "role" text,
    "createdAt" timestamp DEFAULT current_timestamp,
    "updatedAt" timestamp DEFAULT current_timestamp,
    "deletedAt" timestamp
);

