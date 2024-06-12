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

INSERT INTO "user" ("name", "email", "password", "role", "createdAt") 
VALUES ( 'John Doe', 'laurammoraes2@gmail.com', 'teste', 'admin', '2021-12-14 00:00:00');
