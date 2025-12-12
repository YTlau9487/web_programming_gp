# E-commerce Website Prototype

## Requirements

- **Node.js**
- **pnpm**

## Installation

Install dependencies:

```bash
pnpm i
```

or

```bash
pnpm install
```

## Setting Up the Database

1. Create a `.env` file in the project root:

```
DATABASE_URL=file:./local.db
```

**Note:** You cannot simply rename `.env.example` to `.env` for a local SQLite database setup. You must create a new `.env` file with the proper configuration.

2. Push the database schema:

```bash
pnpm drizzle-kit push
```

When prompted, select **"Yes, I want to execute all statements"** to initialize the database schema.

## Running the Application

Start the development web server (localhost):

```bash
pnpm dev
```

or

```bash
pnpm run dev
```
